# Medium Guide

Quick-reference decision table. Given a task, which files to load.

## By output type

| Task | Load |
|---|---|
| Build a reveal.js presentation | `identity.md` → `tokens-screen.md` → `typography.md` + `components.md` + `slide-layouts.md` → `motion.md` |
| Build a one-pager / sales PDF (dark) | `identity.md` → `tokens-print.md` (Dark Mode) → `typography.md` + `components.md` |
| Build a meeting summary PDF | `tokens-print.md` (Light Mode) → `typography.md` + `voice-and-tone.md` |
| Write a PRD / strategy brief / long-form memo | `tokens-print.md` (Document Mode) → `voice-and-tone.md` (Strategy section) — full-width prose rule |
| Draft a proposal / SOW | Fork `brand reference/proposal-template.html` → `tokens-print.md` (Document Mode) + `voice-and-tone.md` |
| Build the website / dark-bg HTML | `identity.md` → `tokens-screen.md` + `tokens-print.md` (Dark) — mix as needed |
| Write an HTML email | `tokens-email.md` |
| Draft a social post / tweet | `voice-and-tone.md` (Social section) |
| Draft marketing copy | `voice-and-tone.md` (Marketing section) + `boilerplate.md` + `messaging.md` |
| Write as Derek personally | `voice-and-tone.md` (your Personal Voice) |
| Design a chart / data viz | `data-viz.md` + `color-system.md` |
| Validate a finished artifact | `lint-rules.md` → `anti-patterns.md` → `accessibility.md` |

## By question

| Question | Answer |
|---|---|
| What's the accent color? | Screen `#9FC7CD`, Print-Dark `#9FC7CD`, Print-Light/Doc `#3E5C8A`. See `color-system.md` |
| What's the body font? | Inter, for everything. See `typography.md` |
| Why no brand color? | "Color is a crutch" — see `identity.md` Design Philosophy |
| Can I use a pull quote in a PRD? | No — document mode is prose-only. See `tokens-print.md` Document Mode |
| Should this slide have bullets or cards? | Bullets if < 5 equal-weight points. Cards if you need visual grouping. See `components.md` |
| Is "leverage" banned? | Yes. See `voice-and-tone.md` banned words |
| What are the logo clear-space rules? | 50% of logo height on all sides. See `logo-assets.md` |
| Can I use a gradient? | No. See `anti-patterns.md` |
| What slide dimensions? | 1280×720 (16:9 compact). Never change. See `spacing.md` |
| What are the reveal.js settings? | See `motion.md` / `tokens-screen.md` |

## By surface

| Surface | Primary reference |
|---|---|
| Presentations | `tokens-screen.md` + `slide-layouts.md` |
| Sales one-pagers | `tokens-print.md` (Dark Mode) |
| Meeting summaries | `tokens-print.md` (Light Mode) |
| PRDs / strategy briefs | `tokens-print.md` (Document Mode) |
| Proposals / SOWs | `tokens-print.md` (Document Mode) + vault's `proposal-template.html` |
| Website | `tokens-screen.md` + `tokens-print.md` (Dark) |
| Email | `tokens-email.md` |
| Social / Twitter | `voice-and-tone.md` (Social) |
| Marketing copy | `voice-and-tone.md` (Marketing) + `boilerplate.md` + `messaging.md` |

## The three modes in one line

- **Screen:** dark, 1280×720, rounded cards, fragments
- **Print:** letter, dark OR light OR document, rigid sizing
- **Document:** letter, light, full-width prose, no containers

Pick one per artifact. Never mix modes in a single file.
