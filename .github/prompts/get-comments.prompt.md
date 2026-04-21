---
name: get-comments
description: "Fetch unresolved PR comments, classify by severity and type, and save to docs/inbox/ for local resolution."
argument-hint: "PR number or branch name (defaults to current branch PR)"
agent: agent
tools: [github/pull-request_*, edit, execute, read, search, todo, agent]
---

Fetch unresolved comments from the GitHub pull request associated with the current branch (or the PR number/branch provided as an argument) and save a structured review file to `docs/inbox/`.

## Workflow

1. **Identify the PR**
   - If an argument is provided, treat it as the PR number or branch name.
   - Otherwise, detect the PR from the current branch using #tool:github-pull-request_currentActivePullRequest
   - Stop with a clear message if no PR is found.

2. **Collect unresolved feedback** using #tool:mcp_github_pull_request_read:
   - Call with `method: "get_review_comments"` to fetch review threads; each thread includes `isResolved`, `isOutdated`, and `isCollapsed` metadata — keep only threads where `isResolved` is `false` (unless the argument includes `--all`)
   - Call with `method: "get_comments"` to fetch top-level PR comments (non-review, general discussion)
   - Use cursor-based pagination (`perPage`, `after`) if the response is truncated
   - For each comment capture: author, file path + line number (when available), the quoted code snippet, the full comment text, and the thread URL

3. **Classify each comment**
   - **Severity**: `blocking` | `major` | `minor` | `nit`
   - **Type**: `correctness` | `security` | `performance` | `readability` | `test-coverage` | `architecture` | `style` | `question`
   - When a comment covers multiple types, pick the dominant one.

4. **Determine output filename**
   - Date: today's date as `YYYY-MM-DD`
   - Slug: PR title lowercased, spaces replaced with `-`, non-alphanumeric stripped, max 50 chars
   - Path: `docs/inbox/<date>-<slug>-comments.md`

5. **Write the output file** with the structure below and save it via #tool:create_file
   - **NEVER** use `mcp_github_create_or_update_file`, `mcp_github_push_files`, or any other GitHub API write tool to save this file — it must be written to the local workspace only
   - The file is a working scratchpad for local resolution; it must not appear in any git commit

---

## Output File Structure

```markdown
# PR Comments: <PR title>

**PR**: [#<number> <title>](<url>)  
**Branch**: `<branch>`  
**Fetched**: <YYYY-MM-DD>  
**Unresolved**: <count>

## Summary

| # | File | Type | Severity | Status | Thread |
|---|------|------|----------|--------|--------|
| 1 | `path/to/file.ts:42` | correctness | blocking | [ ] open | [link](...) |
| 2 | `path/to/other.ts` | readability | nit | [ ] open | [link](...) |

> **Status legend**: `[ ] open` → `[~] in-progress` → `[x] done`

---

## Blocking

### 1. <First few words of the comment as title>

- **File**: [`path/to/file.ts:42`](<repo-url>/blob/<sha>/path/to/file.ts#L42)
- **Author**: @<author>
- **Type**: correctness
- **Thread**: [View on GitHub](<thread-url>)

**Code context**:
```<lang>
<quoted snippet — include enough surrounding lines to understand the issue>
```

**Comment**:
> <full comment text>

**Resolution notes**: <!-- fill in locally -->

---

## Major

<!-- same structure -->

## Minor

<!-- same structure -->

## Nit

<!-- same structure -->
```

---

## Additional Requirements

- If a comment references code, fetch the relevant file snippet (±5 lines around the flagged line) using #tool:read_file to include as context so the issue can be resolved without switching to GitHub.
- Group comments within each severity section by file path so related items are co-located.
- Emit a short console summary at the end: total comments fetched, breakdown by severity and type.
- Do **not** modify any source files — this prompt is read-only data collection only.

## Hard Constraints

- **Local write only**: The output file MUST be created with #tool:create_file at the absolute local workspace path (e.g. `e:\repos\portfolio\docs\inbox\<filename>.md`). Using any GitHub API write tool (`mcp_github_create_or_update_file`, `mcp_github_push_files`, etc.) to save the output is strictly forbidden.
- **No base64 content**: Pass the file content as plain UTF-8 text to #tool:create_file — never encode it as base64.
- **No commits**: Do not stage, commit, or push the output file. It is a local inbox artifact.
