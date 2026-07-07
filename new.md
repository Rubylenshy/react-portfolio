Ah, the classic GitHub Actions interpolation gotcha! This is exactly the kind of obscure, momentum-killing blocker we just talked about. It is the perfect example of a tiny syntax detail that completely halts your "digital canvas" deployment pipeline.

This happens to almost every developer working with CI/CD, and the root cause comes down to who is doing the reading and when.

Here is the straightforward breakdown of why this happened and how to master it.

The Core Difference: GitHub vs. The Shell
The difference between ${{ }} and ${ } is about which system is evaluating the variable.

1. The Double Curly Braces: ${{ }} (GitHub Actions Expression)

Who evaluates it: The GitHub Actions engine.

When: Before the script is ever sent to the runner machine.

How it works: GitHub reads your YAML file, looks for ${{ ... }}, injects the exact value directly into the code as plain text, and then hands that code to the runner to execute.

Contexts used: ${{ secrets.MY_KEY }}, ${{ env.MY_ENV }}, ${{ github.event_name }}.

2. The Single Curly Braces: ${ } or $VAR (Shell Interpolation)

Who evaluates it: The operating system's shell (like Bash on Linux/macOS) running on the runner machine.

When: During the execution of your run steps.

How it works: The shell looks at its own local environment variables and swaps the value in at runtime.

Why Your Specific Scenario Happened
You mentioned you tried ${{ vars.NEW_ENV }} and it failed, but the single brace ${NEW_ENV} worked. Here is exactly why:

Why ${{ vars.NEW_ENV }} failed: In GitHub Actions, the vars context is strictly reserved for Repository Configuration Variables (variables you manually set in the GitHub UI under Settings > Secrets and variables > Actions > Variables). If NEW_ENV was defined inside your YAML file under an env: block, GitHub's vars context would not know it exists. If it was an environment variable, the correct GitHub expression would have been ${{ env.NEW_ENV }}.

Why ${NEW_ENV} worked: Because you used standard Bash syntax inside a run block. The runner machine's shell saw that NEW_ENV was loaded in its local environment (likely passed down from an env: block in your YAML) and successfully resolved it at runtime!

The Golden Rule for the Future (And a Security Tip!)
To prevent blockers and security vulnerabilities in the future, follow this industry best practice:

Avoid using ${{ }} directly inside run blocks if the variable comes from a user input, secret, or dynamic data. Because ${{ }} does a blind text-replacement before the script runs, it is highly vulnerable to script injection. Instead, map your GitHub contexts to an environment variable first, and then use the single brace shell syntax (${ }) to call it.

The "Right" Way:

YAML
steps:
  - name: Print my variable safely
    env:
      SAFE_ENV: ${{ vars.MY_REPO_VAR }} # Map GitHub context to shell environment
    run: |
      echo "My variable is ${SAFE_ENV}" # Let the shell handle it securely