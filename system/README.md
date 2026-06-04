# the author — Brand System

Canonical brand reference. **This is the universal default for every branded artifact** — presentations, one-pagers, PRDs, meeting summaries, proposals, briefs, decks, PDFs, HTML pages, social, and marketing copy. Auto-apply without being asked. If an artifact has visual styling, it should come from this folder unless the user explicitly says otherwise.

**Generic core + profiles.** This folder is the **generic** system — visual mechanics (color, typography, spacing, components, tokens, motion, accessibility), the meta-thesis, universal voice, and the executable `_tooling/`. It carries **no venture's positioning**; example copy uses `{{COMPANY}}` / `{{URL}}` / `{{CONTACT}}` placeholders. Each venture's identity, boilerplate, messaging, and palette live in a sibling profile — `<your-profile>/`, `<your-profile>/`, `<your-profile>/`. Load the generic core always; load one profile only when the artifact is for that venture. See **Content profiles** below.

> **The one rule.** If it requires the presenter to explain it, the content isn't working hard enough. Every surface should communicate its point without narration.

---

## File index

### Core design system (load for any branded output)

| File | Covers |
|---|---|
| `identity.md` | Design philosophy, brand constants, logo rules, the "why" behind everything |
| `color-system.md` | Full palette — screen + print + document modes |
| `typography.md` | Font stack, hierarchy, sizing rules by medium |
| `spacing.md` | Padding, grids, density tiers, layout rules |
| `components.md` | Cards, callouts, tables, stages, bio, timeline, footers, stat blocks |
| `logo-assets.md` | Signature logo files, wordmark rules, sizing guide |

### Medium-specific tokens (load one per output type)

| File | When to load |
|---|---|
| `tokens-screen.md` | Presentations (reveal.js), dashboards, dark-bg web |
| `tokens-print.md` | One-pagers, meeting summaries, PRDs, briefs, proposals (all 3 print modes) |
| `tokens-email.md` | Email templates with web-safe fallbacks |
| `medium-guide.md` | Quick-reference decision table — which tokens for which output |

### Content & messaging

| File | Covers |
|---|---|
| `voice-and-tone.md` | **Generic** writing voice, banned words, your personal voice (venture register shifts live in profiles) |
| `boilerplate.md` | → moved to profiles (`<your-profile>/`, `<your-profile>/`). Per-venture descriptions, stats, legal |
| `messaging.md` | → moved to profiles. Per-venture elevator pitches + audience messaging |

### Specialized reference

| File | Covers |
|---|---|
| `data-viz.md` | Chart color sequences, labeling conventions |
| `imagery.md` | Photography / icon / background approach (mostly: don't use any) |
| `motion.md` | Transition timing, easing, reveal.js config |
| `accessibility.md` | WCAG contrast ratios for every color pairing |
| `slide-layouts.md` | 15 slide layout patterns with HTML snippets |

### Quality assurance (validate every output)

| File | Purpose |
|---|---|
| `golden-examples.md` | → moved to profiles. Venture-branded exemplar outputs |
| `lint-rules.md` | Compliance checklist — now backed by executable `_tooling/lint.mjs` |
| `anti-patterns.md` | Specific brand mistakes with fixes |
| `_tooling/` | Executable build (`build-tokens.mjs`) + gate (`lint.mjs`) |

---

## Loading order by output type

**Presentation (reveal.js, HTML):**
1. `identity.md` (philosophy)
2. `color-system.md` + `typography.md` + `spacing.md`
3. `tokens-screen.md`
4. `components.md` + `slide-layouts.md`
5. `motion.md`
6. Validate: `lint-rules.md` + `anti-patterns.md`

**One-pager / PDF / print (dark mode):**
1. `identity.md`
2. `color-system.md` + `typography.md`
3. `tokens-print.md` (Dark Mode section)
4. `components.md`
5. Validate: `lint-rules.md` + `anti-patterns.md`

**Meeting summary / internal doc (light mode):**
1. `tokens-print.md` (Light Mode section)
2. `typography.md` + `voice-and-tone.md`
3. Validate: `lint-rules.md`

**PRD / strategy brief / long-form memo (document mode):**
1. `tokens-print.md` (Document Mode section)
2. `voice-and-tone.md` (Strategy / PRD section)
3. Rule: full-width prose, no callout boxes around body content. Tables encouraged.

**Proposal / SOW (document mode):**
1. Start from `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/Vault/Design/brand reference/proposal-template.html`
2. `tokens-print.md` (Document Mode) + `voice-and-tone.md`

**Website / dark-bg static HTML:**
1. `identity.md` + `color-system.md` + `typography.md`
2. `tokens-screen.md` + `tokens-print.md` (Dark) — mix as needed

**Social / Twitter:**
1. `voice-and-tone.md` (Social section)

**Marketing copy:**
1. `voice-and-tone.md` (Marketing section)
2. `boilerplate.md` + `messaging.md`

**Written as Derek personally:**
1. `voice-and-tone.md` (your Personal Voice section)

**QA / review only:**
1. `lint-rules.md` → `anti-patterns.md` → `accessibility.md`

---

## HTML templates

Deliverable-ready HTML templates live in the vault at `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/Vault/Design/brand reference/`:

- `starter-template.html` — reveal.js deck skeleton
- `proposal-template.html` — proposal / SOW skeleton

These are the starting HTML — the tokens and rules in this folder govern everything inside them.

---

## Content profiles (generic core + sibling profiles)

**As of 2026-06-04** this folder is the **generic** system. Per-venture positioning content lives in sibling profile folders, not here. (Before this date, UL content squatted in this folder as the unstated default — it was extracted into `<your-profile>/`.)

`identity.md` and `voice-and-tone.md` here are now **generic** (philosophy + meta-thesis + universal voice/banned-words). `boilerplate.md`, `messaging.md`, `golden-examples.md`, `logo-assets.md` have **moved out** to the profiles.

| Profile | Register | Holds |
|---|---|---|
| `profiles/northwind/` (demo) | Warmth (light) | `tokens.json` + generated CSS/table + sample |
| `profiles/<your-restraint-brand>/` | Restraint (dark) | `tokens.json` + identity, boilerplate, messaging, voice register |
| `profiles/<your-warmth-brand>/` | Warmth (light) | `tokens.json` + the same content set |

**For any artifact:**

1. Load the generic visual system from this folder. Always.
2. Load the matching profile **only when the artifact is for that venture.**
3. If the venture has no profile, write neutral positioning (no other venture's name/boilerplate). Note the gap once; don't block.

**Never** apply one venture's boilerplate / messaging / identity to another silently. The linter (`_tooling/lint.mjs`) now catches foreign-name leakage automatically.

---

## Executable layer

`_tooling/` holds the build + gate that the prose always pointed at:

- `build-tokens.mjs <tokens.json> <target.css>` — DTCG token source → generated CSS `:root{}` block.
- `lint.mjs <artifact> <profile-dir>` — banned words, gradients, hex-vs-palette, foreign-name leakage. Exit 1 = MUST failed. See `_tooling/README.md`.

---

## Source of truth

If tokens diverge between this folder and a skill's local `reference/`, **this folder wins**. Update skill-specific references from here, never the reverse. Within a profile, `tokens.json` is the source of truth — generated CSS is downstream.
