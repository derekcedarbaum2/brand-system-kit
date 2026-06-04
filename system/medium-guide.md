# Medium Guide

Quick reference: for a given output, which guides to read. Values always come from your `profiles/<name>/tokens.json`.

## By output type

| Task | Read |
|---|---|
| Presentation / deck | `identity.md` → `tokens-screen.md` → `typography.md` + `components.md` + `slide-layouts.md` → `motion.md` |
| One-pager / sales PDF | `identity.md` → `tokens-print.md` → `typography.md` + `components.md` |
| Meeting summary PDF | `tokens-print.md` → `typography.md` + `voice-and-tone.md` |
| PRD / strategy brief / long-form memo | `tokens-print.md` → `voice-and-tone.md` — full-width prose, no boxed body |
| Proposal / SOW | start from your own proposal template → `tokens-print.md` + `voice-and-tone.md` |
| Website / dark-bg HTML | `identity.md` → `tokens-screen.md` |
| HTML email | `tokens-email.md` |
| Social post | `voice-and-tone.md` |
| Marketing copy | `voice-and-tone.md` + your profile's positioning content |
| Principal's first-person voice | `voice-and-tone.md` (Personal voice template) |
| Chart / data viz | `data-viz.md` + `color-system.md` |
| Validate a finished artifact | `node tooling/brand-qa.mjs <file> profiles/<name> --render`, then `lint-rules.md` + `anti-patterns.md` |

## By question

| Question | Answer |
|---|---|
| What's the accent color? | Whatever `--accent` is in your profile's `tokens.json`. See `color-system.md` for roles. |
| What's the body font? | Your profile's `--font-sans`. See `typography.md`. |
| Should I use a brand color? | Depends on register — restraint says no, warmth says one. See `identity.md`. |
| Can I use a gradient? | No. Flat fills only. `lint.mjs` flags gradients. See `anti-patterns.md`. |
| Is "leverage" banned? | Yes — see the `BANNED` list in `tooling/lint.mjs` (`voice-and-tone.md` explains why). |
| Bullets or cards on a slide? | Bullets if < 5 equal-weight points; cards to group. See `components.md`. |

## Before shipping anything

```
node tooling/brand-qa.mjs <artifact>.html profiles/<name> --render
```

Pick one register/mode per artifact; don't mix them in a single file.
