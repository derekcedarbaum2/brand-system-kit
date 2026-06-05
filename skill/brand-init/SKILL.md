---
name: brand-init
description: Interview the user end-to-end and scaffold a complete brand profile for brand-system-kit — a DTCG tokens.json, generated CSS + palette table, a passing WCAG-AA check, and a rendered sample. Grills one question at a time (each with a recommended answer), walking the design-decision tree from audience down to every token, then builds and verifies. Trigger phrases: "brand init", "scaffold a brand", "new brand profile", "/brand-init".
---

# brand-init

This skill is the Claude Code entry point for the kit's brand-scaffolding interview. The interview method, decision tree, and build/verify steps are tool-agnostic and live in one canonical file:

**→ Follow [`docs/brand-interview.md`](../../docs/brand-interview.md) from the repo root.**

Conduct that interview with the user (use **AskUserQuestion** for the structured choices — register, surface, typography, lint guardrails — and plain prose for the open ones like audience and accent feel), then run its build → WCAG-verify → render → report steps. Don't duplicate the logic here; that file is the source of truth so Claude Code and other agents (Codex, Cursor) stay in sync.

> **Working directory:** run every `node tooling/…` command from the cloned **brand-system-kit repo root**. If the kit isn't cloned yet, clone it first (see `AGENTS.md`).
