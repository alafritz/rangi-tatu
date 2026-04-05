---
name: agent-browser
description: >-
  Browser automation CLI for AI agents. Use when the user needs to interact
  with websites: navigating pages, filling forms, clicking buttons, taking
  screenshots, extracting data, testing web apps, or automating browser
  tasks. Triggers on "open a website", "fill out a form", "click a button",
  "take a screenshot", "scrape data", "test this web app", "login to a
  site", or any task requiring programmatic web interaction.
---

# Browser Automation with agent-browser

## Core Workflow

1. **Navigate**: `agent-browser open <url>`
2. **Snapshot**: `agent-browser snapshot -i` (get refs like `@e1`, `@e2`)
3. **Interact**: Use refs to click, fill, select
4. **Re-snapshot**: After navigation or DOM changes, get fresh refs

```bash
agent-browser open https://example.com/form
agent-browser snapshot -i
agent-browser fill @e1 "user@example.com"
agent-browser fill @e2 "password123"
agent-browser click @e3
agent-browser wait --load networkidle
agent-browser snapshot -i
```

## Command Chaining

Chain commands with `&&` — the browser persists via a background daemon:

```bash
agent-browser open https://example.com && agent-browser wait --load networkidle && agent-browser snapshot -i
```

Chain when you don't need intermediate output. Run separately when you need to
parse snapshot refs before interacting.

## Essential Commands

```bash
# Navigation
agent-browser open <url>
agent-browser close

# Snapshot
agent-browser snapshot -i             # Interactive elements with refs
agent-browser snapshot -i -C          # Include cursor-interactive elements
agent-browser snapshot -s "#selector" # Scope to CSS selector

# Interaction (use @refs from snapshot)
agent-browser click @e1
agent-browser fill @e2 "text"         # Clear and type
agent-browser type @e2 "text"         # Type without clearing
agent-browser select @e1 "option"
agent-browser check @e1
agent-browser press Enter
agent-browser scroll down 500

# Get information
agent-browser get text @e1
agent-browser get url
agent-browser get title

# Wait
agent-browser wait @e1                # For element
agent-browser wait --load networkidle # For network idle
agent-browser wait --url "**/page"    # For URL pattern
agent-browser wait 2000               # Milliseconds

# Capture
agent-browser screenshot              # To temp dir
agent-browser screenshot --full       # Full page
agent-browser screenshot --annotate   # With numbered labels
agent-browser pdf output.pdf

# Diff
agent-browser diff snapshot           # Compare current vs last snapshot
agent-browser diff screenshot --baseline before.png
```

## Common Patterns

### Form Submission
```bash
agent-browser open https://example.com/signup
agent-browser snapshot -i
agent-browser fill @e1 "Jane Doe"
agent-browser fill @e2 "jane@example.com"
agent-browser select @e3 "California"
agent-browser check @e4
agent-browser click @e5
agent-browser wait --load networkidle
```

### Auth Vault
```bash
echo "pass" | agent-browser auth save github --url https://github.com/login --username user --password-stdin
agent-browser auth login github
```

### State Persistence
```bash
agent-browser state save auth.json
agent-browser state load auth.json
```

### Sessions
```bash
agent-browser --session site1 open https://site-a.com
agent-browser --session site2 open https://site-b.com
agent-browser session list
```

### Data Extraction
```bash
agent-browser get text @e5
agent-browser get text body > page.txt
agent-browser snapshot -i --json
```

### Annotated Screenshots
```bash
agent-browser screenshot --annotate
# Labels [N] map to refs @eN — interact immediately without separate snapshot
```

### JavaScript Evaluation
```bash
agent-browser eval 'document.title'

# Complex JS — use --stdin to avoid shell quoting issues
agent-browser eval --stdin <<'EVALEOF'
JSON.stringify(Array.from(document.querySelectorAll("a")).map(a => a.href))
EVALEOF
```

## Ref Lifecycle

Refs are invalidated when the page changes. **Always re-snapshot after:**
- Clicking links/buttons that navigate
- Form submissions
- Dynamic content loading (dropdowns, modals)

## Timeouts

Default timeout: 25s. Override with `AGENT_BROWSER_DEFAULT_TIMEOUT` (ms).
For slow pages, use `agent-browser wait --load networkidle` after `open`.

## Cleanup

Always close sessions when done:
```bash
agent-browser close
```

For detailed documentation, see [references/commands.md](references/commands.md).
