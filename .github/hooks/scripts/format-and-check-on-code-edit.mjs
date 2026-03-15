import fs from 'node:fs';
import path from 'node:path';
import {
  blockHook,
  findToolFiles,
  getPayloadCwd,
  readHookPayload,
  runCommand,
  toRelativePaths,
  writeHookFeedback,
  writeHookSuccess
} from './hook-utils.mjs';

const TOOL_NAME_ALLOWLIST = new Set([
  'create_file',
  'apply_patch',
  'editFiles',
  'replace_string_in_file'
]);

const MARKDOWN_EXTENSIONS = new Set([
  '.md',
  '.mdx',
  '.markdown',
  '.mdown',
  '.mkd',
  '.mkdn',
  '.mdwn'
]);

const PRETTIER_EXTENSIONS = new Set([
  '.astro',
  '.css',
  '.html',
  '.js',
  '.json',
  '.jsx',
  '.md',
  '.mdx',
  '.mjs',
  '.scss',
  '.ts',
  '.tsx',
  '.yaml',
  '.yml'
]);

const ESLINT_EXTENSIONS = new Set([
  '.astro',
  '.js',
  '.jsx',
  '.mjs',
  '.ts',
  '.tsx'
]);

const ASTRO_CHECK_EXTENSIONS = new Set([
  '.astro',
  '.js',
  '.jsx',
  '.mjs',
  '.ts',
  '.tsx'
]);

const ASTRO_CHECK_BASENAMES = new Set([
  'astro.config.mjs',
  'tsconfig.json'
]);

// Directories under the repo root that are owned by the Astro project.
// Only files within these dirs (plus explicit ASTRO_CHECK_BASENAMES) should
// trigger `astro check` — prevents non-Astro tooling (e.g. hook scripts
// under .github/) from being mis-classified as Astro-relevant.
const ASTRO_SOURCE_DIRS = new Set(['src', 'public']);

const HOOK_FILE_EXTENSIONS = new Set([
  ...MARKDOWN_EXTENSIONS,
  ...PRETTIER_EXTENSIONS
]);

function filterExistingFiles(files) {
  return files.filter((file) => fs.existsSync(file) && fs.statSync(file).isFile());
}

function filterByExtensions(files, extensions) {
  return files.filter((file) => extensions.has(path.extname(file).toLowerCase()));
}

function isAstroOwnedPath(file, cwd) {
  const rel = path.relative(cwd, file);
  const firstSegment = rel.split(path.sep)[0];
  return ASTRO_SOURCE_DIRS.has(firstSegment);
}

function shouldRunAstroCheck(files, cwd) {
  return files.some((file) => {
    const baseName = path.basename(file);
    if (ASTRO_CHECK_BASENAMES.has(baseName)) {
      return true;
    }

    const extension = path.extname(file).toLowerCase();
    return ASTRO_CHECK_EXTENSIONS.has(extension) && isAstroOwnedPath(file, cwd);
  });
}

function runPrettier(files, cwd) {
  if (files.length === 0) {
    return null;
  }

  return runCommand('pnpm', ['exec', 'prettier', '--write', ...files], { cwd });
}

function runMarkdownlint(files, cwd) {
  if (files.length === 0) {
    return null;
  }

  return runCommand(
    'pnpm',
    ['exec', 'markdownlint-cli2', '--fix', ...files],
    { cwd }
  );
}

function runEslint(files, cwd) {
  if (files.length === 0) {
    return null;
  }

  return runCommand('pnpm', ['exec', 'eslint', '--fix', ...files], { cwd });
}

function runAstroCheck(cwd) {
  return runCommand('pnpm', ['astro', 'check'], { cwd });
}

function summarizeResult(title, result, fallbackMessage) {
  if (!result || result.status === 0) {
    return null;
  }

  const details = (result.stderr || result.stdout || fallbackMessage).trim();
  return `${title}\n\n${details}`;
}

function collectFailures({ markdownlintResult, prettierResult, eslintResult, astroResult }) {
  return [
    summarizeResult('markdownlint-cli2 still reports issues after --fix:', markdownlintResult, 'markdownlint-cli2 --fix failed'),
    summarizeResult('Prettier failed:', prettierResult, 'prettier --write failed'),
    summarizeResult('ESLint still reports issues after --fix:', eslintResult, 'eslint --fix failed'),
    summarizeResult('Astro check reports issues:', astroResult, 'astro check failed')
  ].filter(Boolean);
}

function buildStepMessages({ markdownFiles, prettierFiles, eslintFiles, astroResult, cwd }) {
  return [
    markdownFiles.length > 0
      ? `Ran markdownlint-cli2 --fix on: ${toRelativePaths(markdownFiles, cwd).join(', ')}`
      : 'Skipped markdownlint-cli2 --fix because none of the edited files are Markdown.',
    prettierFiles.length > 0
      ? `Ran Prettier on: ${toRelativePaths(prettierFiles, cwd).join(', ')}`
      : 'Skipped Prettier because none of the edited files match the configured formatter file types.',
    eslintFiles.length > 0
      ? `Ran ESLint --fix on: ${toRelativePaths(eslintFiles, cwd).join(', ')}`
      : 'Skipped ESLint --fix because none of the edited files are lintable.',
    astroResult
      ? 'Ran astro check.'
      : 'Skipped astro check because the edited files are not Astro-relevant.'
  ];
}

function buildFeedbackMessages({ markdownFiles, prettierFiles, eslintFiles, astroResult, failures, cwd }) {
  return [
    markdownFiles.length > 0
      ? `markdownlint-cli2 --fix ran on: ${toRelativePaths(markdownFiles, cwd).join(', ')}`
      : 'markdownlint-cli2 --fix was skipped because none of the edited files are Markdown.',
    prettierFiles.length > 0
      ? `Prettier ran on: ${toRelativePaths(prettierFiles, cwd).join(', ')}`
      : 'Prettier was skipped because none of the edited files match the configured formatter file types.',
    eslintFiles.length > 0
      ? `ESLint --fix ran on: ${toRelativePaths(eslintFiles, cwd).join(', ')}`
      : 'ESLint --fix was skipped because none of the edited files are lintable.',
    astroResult
      ? 'Astro check ran for the current workspace.'
      : 'Astro check was skipped because the edited files do not affect Astro type checking.',
    ...failures
  ];
}

async function main() {
  const payload = await readHookPayload();
  if (!payload) {
    writeHookSuccess();
    return;
  }

  const cwd = getPayloadCwd(payload);
  const files = filterExistingFiles(
    findToolFiles(payload, {
      toolNames: TOOL_NAME_ALLOWLIST,
      extensions: HOOK_FILE_EXTENSIONS
    })
  );

  if (files.length === 0) {
    writeHookSuccess();
    return;
  }

  const relativeFiles = toRelativePaths(files, cwd);
  const markdownFiles = filterByExtensions(files, MARKDOWN_EXTENSIONS);
  const prettierFiles = filterByExtensions(files, PRETTIER_EXTENSIONS);
  const eslintFiles = filterByExtensions(files, ESLINT_EXTENSIONS);

  const markdownlintResult = runMarkdownlint(markdownFiles, cwd);
  const prettierResult = runPrettier(prettierFiles, cwd);
  const eslintResult = runEslint(eslintFiles, cwd);
  const astroResult = shouldRunAstroCheck(files, cwd) ? runAstroCheck(cwd) : null;

  const failures = collectFailures({ markdownlintResult, prettierResult, eslintResult, astroResult });

  if (failures.length > 0) {
    writeHookFeedback({
      hookEventName: 'PostToolUse',
      systemMessage: `Auto-fix and validation ran on ${relativeFiles.join(', ')}. Remaining issues were sent back to the agent.`,
      additionalContext: buildFeedbackMessages({
        markdownFiles,
        prettierFiles,
        eslintFiles,
        astroResult,
        failures,
        cwd
      }).join('\n\n')
    });

    return;
  }

  const completedSteps = buildStepMessages({ markdownFiles, prettierFiles, eslintFiles, astroResult, cwd });

  writeHookSuccess({
    hookEventName: 'PostToolUse',
    additionalContext: completedSteps.join('\n')
  });
}

try {
  await main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);

  blockHook({
    hookEventName: 'PostToolUse',
    reason: `Format/check hook failed: ${message}`,
    additionalContext: message
  });
}
