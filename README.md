# MiMo Code Review Bot

MiMo Code Review Bot is an open-source GitHub pull request reviewer powered by Xiaomi MiMo API. It reads changed files in a pull request, sends the diff to MiMo, and posts actionable review comments back to GitHub.

## Problem
Independent developers often merge code without proper review because human review is slow or unavailable. Existing AI review tools are expensive and not optimized for small open-source projects.

## Solution
This bot provides low-cost automated pull request review using Xiaomi MiMo. It focuses on concise feedback: bugs, risky logic, security issues, missing error handling, and maintainability problems.

## Core Features
- Pull request diff collection through GitHub API
- MiMo-powered review generation
- Automatic GitHub comment posting
- Configurable model and API endpoint
- Minimal Node.js runtime

## Architecture
1. User passes GitHub PR reference: `owner/repo/pr_number`
2. Bot fetches changed files through GitHub REST API
3. Bot builds a compact diff prompt
4. MiMo API reviews the diff
5. Bot posts review result as a PR comment

## Example Use Case
A developer opens a pull request. The bot checks the code and comments:
- possible bug
- unsafe input handling
- missing tests
- suggested refactor

## Files
- `index.js` — main review bot
- `package.json` — Node.js dependencies
- `.env.example` — safe config template

## Roadmap
- GitHub webhook server
- Inline review comments
- Severity labels
- Language-specific review prompts
- GitHub Actions integration

## Why Xiaomi MiMo
MiMo can be used as an API-based reasoning model for code review workflows. This project demonstrates practical integration with real developer tools.

## Project Maturity
- MVP code available
- Architecture documented
- Roadmap documented
- CI configured
- MIT licensed

## Links
- [Architecture](ARCHITECTURE.md)
- [Roadmap](ROADMAP.md)
- [Examples](examples/basic.md)
