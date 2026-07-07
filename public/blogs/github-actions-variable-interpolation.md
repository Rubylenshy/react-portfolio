# ${{ }} vs ${ } in GitHub Actions: The Variable Interpolation Trap

> One runs before the shell ever starts, the other runs inside it — here's why that difference broke your workflow and how to use each correctly.

Ah, the classic GitHub Actions interpolation gotcha. This is exactly the kind of obscure, momentum-killing blocker that halts a perfectly good deployment pipeline. It happens to almost every developer working with CI/CD, and the root cause comes down to **who is doing the reading** and **when**.

---

## The Core Difference: GitHub vs. The Shell

The difference between `${{ }}` and `${ }` is about which system is evaluating the variable.

### 1. Double Curly Braces: `${{ }}` (GitHub Actions Expression)

- **Who evaluates it:** The GitHub Actions engine.
- **When:** Before the script is ever sent to the runner machine.
- **How it works:** GitHub reads your YAML file, finds every `${{ ... }}`, injects the exact value directly as plain text, then hands the result to the runner.
- **Contexts:** `${{ secrets.MY_KEY }}`, `${{ env.MY_ENV }}`, `${{ github.event_name }}`, `${{ vars.MY_REPO_VAR }}`.

### 2. Single Curly Braces: `${ }` or `$VAR` (Shell Interpolation)

- **Who evaluates it:** The OS shell (Bash on Linux/macOS) running on the runner machine.
- **When:** During the execution of your `run` steps — at runtime.
- **How it works:** The shell looks at its own local environment variables and swaps the value in when the script actually executes.

---

## Why Your Specific Scenario Happened

You tried `${{ vars.NEW_ENV }}` — it failed. You tried `${NEW_ENV}` — it worked. Here's exactly why:

**Why `${{ vars.NEW_ENV }}` failed:** In GitHub Actions, the `vars` context is strictly reserved for **Repository Configuration Variables** — variables you manually set in the GitHub UI under *Settings → Secrets and variables → Actions → Variables*. If `NEW_ENV` was defined inside your YAML file under an `env:` block, the `vars` context has no knowledge of it. The correct GitHub expression for an `env:` block variable is `${{ env.NEW_ENV }}`.

**Why `${NEW_ENV}` worked:** Because you used standard Bash syntax inside a `run` block. The runner's shell saw that `NEW_ENV` was already loaded in its local environment (passed down from your YAML's `env:` block) and resolved it at runtime — no GitHub engine involved.

---

## The Golden Rule — And a Security Warning

Avoid using `${{ }}` directly inside `run` blocks when the value comes from user input, secrets, or dynamic data.

Because `${{ }}` performs a **blind text-replacement before the script runs**, it is vulnerable to script injection attacks. A malicious value could close the current command and execute arbitrary shell code.

**The safe pattern — map first, then use the shell:**

```yaml
steps:
  - name: Print my variable safely
    env:
      SAFE_ENV: ${{ vars.MY_REPO_VAR }}  # Map GitHub context to shell env
    run: |
      echo "My variable is ${SAFE_ENV}"  # Let the shell resolve it securely
```

This way, `${{ }}` never touches user-controlled data inside a script — it only assigns a shell variable. The shell then handles substitution safely, without risk of injection.

---

## Quick Reference

| Syntax | Evaluated by | Evaluated when | Safe in `run` blocks? |
|---|---|---|---|
| `${{ env.VAR }}` | GitHub Actions engine | Before runner receives script | ⚠️ Risky with dynamic data |
| `${{ vars.VAR }}` | GitHub Actions engine | Before runner receives script | ⚠️ Only for repo config vars |
| `${{ secrets.VAR }}` | GitHub Actions engine | Before runner receives script | ⚠️ Prefer mapping to shell env |
| `${VAR}` or `$VAR` | Bash / shell | At script runtime | ✅ Safe |

---

## Takeaway

The next time a GitHub Actions workflow fails with a variable that "should" be defined, ask: **which system am I expecting to resolve this?** If it's a value from the GitHub context tree, use `${{ }}` to map it to a shell variable first — then let Bash take it from there.

---

*Hit this same trap? Share this with the next developer who loses an hour to a missing curly brace.*
