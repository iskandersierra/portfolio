import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const DEFAULT_FILE_INPUT_KEYS = [
  'filePath',
  'targetFile',
  'path',
  'file',
  'uri',
  'file_path' // Claude Code (Write, Edit)
];

export const DEFAULT_FILE_LIST_KEYS = [
  'files',
  'filePaths',
  'paths',
  'uris'
];

export function readStdin() {
  return new Promise((resolve, reject) => {
    let input = '';

    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => {
      input += chunk;
    });
    process.stdin.on('end', () => resolve(input));
    process.stdin.on('error', reject);
  });
}

export async function readHookPayload() {
  const rawInput = await readStdin();

  if (!rawInput.trim()) {
    return null;
  }

  return JSON.parse(rawInput);
}

export function getPayloadCwd(payload) {
  return typeof payload?.cwd === 'string' && payload.cwd.length > 0
    ? payload.cwd
    : process.cwd();
}

export function normalizeHookPath(rawPath, cwd) {
  if (typeof rawPath !== 'string' || rawPath.length === 0) {
    return null;
  }

  if (rawPath.startsWith('file://')) {
    try {
      rawPath = fileURLToPath(rawPath);
    } catch {
      return null;
    }
  }

  const normalizedInput = rawPath.replace(/^\/([A-Za-z]:\/)/, '$1');
  return path.isAbsolute(normalizedInput)
    ? path.normalize(normalizedInput)
    : path.resolve(cwd, normalizedInput);
}

export function collectApplyPatchFiles(patchInput) {
  if (typeof patchInput !== 'string' || patchInput.length === 0) {
    return [];
  }

  const matches = patchInput.matchAll(/^\*\*\* (?:Add|Update|Delete) File: (.+)$/gm);
  const files = [];

  for (const match of matches) {
    const rawPath = match[1]?.trim();
    if (!rawPath) {
      continue;
    }

    files.push(rawPath.replace(/\s+->\s+.+$/, ''));
  }

  return files;
}

export function collectToolInputFiles(
  toolInput,
  {
    fileInputKeys = DEFAULT_FILE_INPUT_KEYS,
    fileListKeys = DEFAULT_FILE_LIST_KEYS
  } = {}
) {
  if (!toolInput || typeof toolInput !== 'object') {
    return [];
  }

  const candidates = [];

  for (const key of fileInputKeys) {
    if (key in toolInput) {
      candidates.push(toolInput[key]);
    }
  }

  for (const key of fileListKeys) {
    const value = toolInput[key];
    if (Array.isArray(value)) {
      candidates.push(...value);
    }
  }

  candidates.push(...collectApplyPatchFiles(toolInput.input));

  return candidates;
}

export function findToolFiles(
  payload,
  {
    toolNames,
    extensions,
    fileInputKeys,
    fileListKeys
  } = {}
) {
  if (toolNames && !toolNames.has(payload.tool_name)) {
    return [];
  }

  const cwd = getPayloadCwd(payload);

  return [...new Set(
    collectToolInputFiles(payload.tool_input, { fileInputKeys, fileListKeys })
      .map((candidate) => normalizeHookPath(candidate, cwd))
      .filter((candidate) => {
        if (!candidate) {
          return false;
        }

        if (!extensions) {
          return true;
        }

        return extensions.has(path.extname(candidate).toLowerCase());
      })
  )];
}

export function runCommand(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: 'utf8',
    shell: process.platform === 'win32',
    ...options
  });

  if (result.error) {
    throw result.error;
  }

  return result;
}

export function toRelativePaths(files, cwd) {
  return files.map((file) => path.relative(cwd, file) || path.basename(file));
}

export function writeHookOutput(output = {}) {
  console.log(JSON.stringify(output));
}

export function writeHookSuccess({ hookEventName, additionalContext, systemMessage } = {}) {
  if (!hookEventName && !additionalContext && !systemMessage) {
    writeHookOutput({});
    return;
  }

  writeHookOutput({
    ...(systemMessage ? { systemMessage } : {}),
    hookSpecificOutput: {
      hookEventName,
      ...(additionalContext ? { additionalContext } : {})
    }
  });
}

export function writeHookFeedback({
  hookEventName,
  additionalContext,
  systemMessage
}) {
  writeHookSuccess({
    hookEventName,
    additionalContext,
    systemMessage
  });
}

export function blockHook({
  hookEventName,
  reason,
  additionalContext,
  exitCode = 2
}) {
  // Write to stderr so Claude Code shows the reason (exit 2 causes JSON stdout to be ignored).
  // Also write JSON to stdout for agents that parse it regardless of exit code (e.g. Copilot).
  process.stderr.write(reason + '\n');
  writeHookOutput({
    decision: 'block',
    reason,
    hookSpecificOutput: {
      hookEventName,
      ...(additionalContext ? { additionalContext } : {})
    }
  });
  process.exit(exitCode);
}
