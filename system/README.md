# system/ — the brand framework (the "why")

The prose half of the kit: the thinking a brand system encodes, written to be venture-neutral. The *values* (palettes, fonts, positioning) live in each `profiles/<name>/tokens.json`; these guides describe the **roles, rules, and reasoning** the tooling enforces.

Read `identity.md` first — it carries the meta-thesis (*match the visual register to the buyer's trust model*). Everything else elaborates one facet.

## The guides

| File | Covers |
|---|---|
| `identity.md` | Design philosophy + the meta-thesis (restraint vs. warmth) |
| `color-system.md` | Token **roles** (bg / text / accent / emphasis…) and how palettes are applied; values come from `tokens.json` |
| `typography.md` | Type roles, hierarchy, sizing by medium |
| `spacing.md` | Padding, grids, density |
| `components.md` | Cards, callouts, tables, stat blocks, footers |
| `motion.md` | Transition timing, easing, reduced-motion |
| `accessibility.md` | Contrast targets and semantic-HTML rules (enforced by `contrast-check.mjs`) |
| `data-viz.md` | Chart color sequences and labeling |
| `imagery.md` | Photography / icon / background approach (mostly: don't) |
| `slide-layouts.md` | Reusable deck layout patterns |
| `voice-and-tone.md` | Universal voice, "words we use / never use," a personal-voice template |
| `anti-patterns.md` | Specific mistakes with fixes |
| `lint-rules.md` | The MUST/SHOULD rules `lint.mjs` enforces |
| `medium-guide.md` | Which guide to read for which output type |
| `tokens-screen.md` · `tokens-print.md` · `tokens-email.md` | Per-medium token usage notes |
| `print-layout.md` | HTML→PDF mechanics (headless Chrome): full-bleed background, sheet pagination, tinted panels vs. white, no-split cards, landscape decks |

## How it fits with the rest of the kit

- `system/` = the framework (this folder).
- `tooling/` = the executable enforcement (see `tooling/README.md`).
- `profiles/<name>/tokens.json` = one brand's actual values (the source of truth).
- `diagrams/` = token-driven templates.

A profile *overrides values*; these guides *stay the same* across brands. When a guide shows a hex or a token name, treat it as illustrative — the binding values are always in `tokens.json`.
