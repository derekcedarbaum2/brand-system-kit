---
name: brand-init
description: Interview a user in ~6 questions and scaffold a complete brand profile — a DTCG tokens.json, generated CSS + palette table, a WCAG-AA check, and a rendered sample. Turns the "register → palette → tokens" idea into a working profile in minutes. Trigger phrases: "brand init", "scaffold a brand", "new brand profile", "/brand-init".
---

# brand-init — scaffold a brand profile

Builds one profile for the brand-system-kit: an executable, single-source-of-truth brand definition. The output is a folder under `profiles/<name>/` with a `tokens.json`, generated `brand.css` + `color-system.md`, and a rendered `sample.qa.png`.

> **Working directory:** run every `node tooling/...` command from the cloned **brand-system-kit repo root** (that's where `tooling/`, `profiles/`, `diagrams/` are). If the kit isn't cloned yet, clone it first (see `AGENTS.md`).

## Core idea (state this once, up front)

> Match the visual register to the buyer's trust model.

Two buyers grant trust for opposite reasons. A **technical / skeptical-of-polish** buyer trusts **restraint** (near-black, no brand color, monospace labels — "we're not selling you"). A **non-technical / skeptical-of-hype** buyer trusts **warmth** (light, serif headlines, one editorial accent — "advisor, not vendor"). The register is a *consequence* of the audience, not a taste call. Establish the audience first; the palette follows.

## Workflow

**One question per turn.** Use AskUserQuestion for the structured choices.

1. **Audience** — "Who is the primary buyer/reader of your branded artifacts?" (free text)
2. **Trust model → register** — AskUserQuestion: `Restraint (skeptical of polish/sales)` · `Warmth (skeptical of hype/vendors)` · `Neutral/institutional`. Explain the consequence as you ask.
3. **Base surface** — AskUserQuestion for default mode: `Light (paper / off-white bg)` · `Dark (near-black bg)`. (Restraint→often dark; warmth→light. Recommend per register but let them choose.)
4. **Accent** — "One word for the accent feel?" then propose 1–2 concrete hexes (e.g. warmth→rust / teal / amber; restraint→slate / graphite). Confirm or adjust.
5. **Type** — AskUserQuestion: headline family `Serif (firm/advisor)` · `Neo-grotesque sans (product/tech)`; body is Inter-class sans; labels are monospace. (Serif headline is the strongest "firm not app" signal.)
6. **Identity** — "Brand name, URL, contact?" and "Names of any *other* brands you run (so this profile flags cross-leakage)?"

Then:

7. **Write `profiles/<slug>/tokens.json`** in DTCG format with the full role set: `bg, bg-card, bg-dark, text-primary, text-body, text-secondary, text-dim, text-on-dark, border, accent, accent-2, accent-on-dark, emphasis`, the three `fontFamily` roles, and the `lint` block (`company-name`, `url`, `contact`, `max-accents`, `forbidden-bg`, `forbidden-text`, `foreign-names`). Model the structure on `profiles/northwind/tokens.json`.
8. **Run the gate and ITERATE until it passes:**
   ```
   node tooling/contrast-check.mjs profiles/<slug>
   ```
   If any text/large pairing fails AA, darken/lighten the offending token and re-run. Do not hand the user an inaccessible palette.
9. **Generate derived files:**
   ```
   node tooling/build-tokens.mjs profiles/<slug>/tokens.json profiles/<slug>/brand.css --md profiles/<slug>/color-system.md
   ```
   (Start `brand.css` from a copy of `profiles/northwind/brand.css` — the component layer is generic; only the `:root` block is regenerated.)
10. **Render a sample** (copy + retheme `profiles/northwind/sample.html`) and view it:
    ```
    node tooling/render.mjs profiles/<slug>/sample.html
    ```
    Confirm the register reads right (advisor vs. vendor / restraint vs. hype). Fix and re-render if not.
11. **Report**: the profile path, the contrast result, and the one-line register rationale.

## Rules

- The register is derived from the audience — don't let the user pick a palette before naming who it's for.
- Every palette must pass `contrast-check` before you call it done.
- `tokens.json` is the source of truth. Never hand-edit the generated `:root` block or the palette table.
- Keep `emphasis` for one decisive figure per section — never decorative.
