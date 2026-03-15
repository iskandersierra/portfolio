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

const MARKDOWN_EXTENSIONS = new Set([
  '.md',
  '.mdx',
  '.markdown',
  '.mdown',
  '.mkd',
  '.mkdn',
  '.mdwn'
]);

const TOOL_NAME_ALLOWLIST = new Set([
  'create_file',
  'apply_patch',
  'editFiles',
  'replace_string_in_file'
]);

function runMarkdownlint(files, cwd) {
  const relativeFiles = toRelativePaths(files, cwd);
  const result = runCommand(
    'pnpm',
    ['exec', 'markdownlint-cli2', '--fix', ...files],
    { cwd }
  );

  if (result.status !== 0) {
    const details = (result.stderr || result.stdout || 'markdownlint-cli2 failed').trim();

    writeHookFeedback({
      hookEventName: 'PostToolUse',
      systemMessage: `markdownlint-cli2 fixed what it could in ${relativeFiles.join(', ')}. Remaining markdownlint errors were sent back to the agent.`,
      additionalContext: [
        `markdownlint-cli2 --fix ran on: ${relativeFiles.join(', ')}`,
        'Some markdownlint errors remain and need manual edits.',
        'Fix these remaining errors in the edited Markdown file(s):',
        details
      ].join('\n\n')
    });

    return;
  }

  writeHookSuccess({
    hookEventName: 'PostToolUse',
    additionalContext: `Ran markdownlint-cli2 --fix on: ${relativeFiles.join(', ')}`
  });
}

async function main() {
  const payload = await readHookPayload();
  if (!payload) {
    writeHookSuccess();
    return;
  }

  const cwd = getPayloadCwd(payload);
  const files = findToolFiles(payload, {
    toolNames: TOOL_NAME_ALLOWLIST,
    extensions: MARKDOWN_EXTENSIONS
  });

  if (files.length === 0) {
    writeHookSuccess();
    return;
  }

  runMarkdownlint(files, cwd);
}

try {
  await main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);

  blockHook({
    hookEventName: 'PostToolUse',
    reason: `Markdown hook failed: ${message}`,
    additionalContext: message
  });
}
