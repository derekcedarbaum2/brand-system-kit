---
name: brand-init
description: 'Interview the user end-to-end and scaffold a complete brand profile for brand-system-kit: a DTCG tokens.json, a passing WCAG-AA check, generated CSS + palette table, and a rendered sample. Grills one question at a time (each with a recommended answer), walking the design-decision tree from audience down to every token, then verifies and builds. Trigger phrases: "brand init", "scaffold a brand", "new brand profile", "/brand-init", or when the user wants to set up a consistent visual style or brand profile for their documents.'
---

# brand-init

This skill is the Claude Code entry point for the kit's brand-scaffolding interview. The interview method, decision tree, and build/verify steps are tool-agnostic and live in one canonical file: **`docs/brand-interview.md` at the brand-system-kit repo root.**

## Locate the repo first

This skill is usually installed to `~/.claude/skills/brand-init/`, away from the repo it operates on. Before anything else, find the repo:

1. **Already in it?** If `./tooling/brand-qa.mjs` exists in the working directory, you're at the repo root. Work in place.
2. **Else ask or look.** Ask the user where brand-system-kit is cloned, or check the obvious spots: `~/projects/brand-system-kit`, `~/brand-system-kit`, `~/code/brand-system-kit`, `~/src/brand-system-kit`.
3. **Else clone it.** `git clone https://github.com/derekcedarbaum2/brand-system-kit.git` and work from the clone.

Run every `node tooling/…` command from that repo root.

## Run the interview

**Follow `docs/brand-interview.md` (in the repo you just located) end to end.** Conduct the interview, using **AskUserQuestion** for the structured choices (register, surface, typography, lint guardrails) and plain prose for the open ones (audience, accent feel). Then run its WCAG-verify → build → render → report steps in that order: the palette passes `contrast-check` *before* you generate CSS. Don't duplicate the logic here; that file is the source of truth so Claude Code and other agents (Codex, Cursor) stay in sync.

## Claude Code specifics

- **Look at the render before reporting done.** Open the produced `.qa.png` with the Read tool and judge it against the interview doc's register eye-test. That's the one check no script makes.
- **Lead every AskUserQuestion with your recommended option** and why, per the interview method.
