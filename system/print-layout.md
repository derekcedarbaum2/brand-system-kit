# Print Layout — HTML → PDF (headless Chrome)

Layout mechanics for any HTML rendered to PDF via headless Chrome (`chrome --headless --print-to-pdf`): reports, one-pagers, briefs, proposals, decks. These rules are register-neutral — they apply whether the page is a **warmth** brand (light/cream, like the Northwind demo) or **restraint** brand (near-black, like Graphite). Values shown are illustrative; the binding ones live in each `profiles/<name>/tokens.json`.

The rules exist because Chrome's print engine has non-obvious behavior that silently breaks branded output. Every failure below is **invisible in the browser** and only appears in the rendered PDF — so the last rule (§7) is the most important: render and *read the pages*.

---

## 1. The background must bleed to the page edge

Chrome paints the `@page { margin }` band **white**. The `html`/`body` background does **not** extend into it. So any non-white page background (a warmth brand's cream `--bg`, a restraint brand's near-black `--bg`) shows a white frame on every page if you use `@page` margins for the content inset.

- ✅ `@page { size: letter; margin: 0; }`, background on `html, body`, insets via padding (see §2).
- ❌ `@page { margin: 0.75in; }` with a colored `body` → white border framing every page.

## 2. Uniform per-page margins require "sheets"

With `@page { margin: 0 }` + `body { padding: … }`, the padding only insets the **top of page 1 and the bottom of the last page**. Interior pages hug the top/bottom edge, so margins look inconsistent. There is **no** pure-CSS way to both fill the background to the edge *and* get uniform per-page margins from a single flowing `body`.

Fix for any multi-page document: split the content into explicit **sheet** blocks, each its own padded page.

```css
@page { size: letter; margin: 0; }
html, body {
  background: var(--bg); margin: 0; padding: 0;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.sheet {
  padding: 0.8in 0.9in;       /* uniform margin on all four sides, every page */
  page-break-after: always;
  page-break-inside: avoid;   /* a sheet never splits */
  box-sizing: border-box;
}
.sheet:last-child { page-break-after: auto; }
```

Wrap each ≤1-page chunk of content in `<div class="sheet">…</div>`. The area below short content is the **brand background**, not white. Hard constraint: **each sheet's content must fit within one printable page** (~9.3in tall for US letter at 0.8in margins) — if it overflows, the spilled part hugs the top of the next page again. When unsure, split into more sheets and re-render.

Single-page artifacts (a one-pager) don't need sheets — plain `body { padding }` is fine.

## 3. Section boxes: tinted panels, never stark white

On a colored page (warmth cream *or* restraint near-black), a `background:#fff` box reads as a harsh hole punched in the page. Use panel **roles** a step off the page color:

| Role | Use | Warmth example | Restraint example |
|---|---|---|---|
| `--panel` | section cards, matrix cells, table rows | soft beige off the cream | soft charcoal off the near-black |
| `--panel-deep` | diagram containers (so inner chips pop) | deeper beige | deeper charcoal |
| `--chip` | inner chips (flow steps, Gantt cells, callouts) | warm near-white | a lighter slate |

White is only correct on a genuinely white page. Drive these from `tokens.json` so the same HTML re-skins per profile — never hard-code the hex.

## 4. Cards must not split across a page boundary

A bordered card that breaks across pages leaves an orphaned remnant — e.g. a lone footer/total row floating in a sliver of panel at the top of the next page.

- ✅ `page-break-inside: avoid` on the card **and** size content so N cards fit per page (tighten `line-height`/padding ~8–12% if two won't fit).
- ❌ Removing `page-break-inside: avoid` to kill a stranded-whitespace gap — that only trades the gap for an ugly split.

The two failure modes are a pair: a **stranded gap** (a no-break card jumps to the next page, leaving the current one half-empty) and a **split panel** (a card allowed to break mid-content). The fix for both is sheets (§2) plus cards sized to pack — not toggling one symptom into the other.

## 5. Decks are landscape 16:9, never portrait

A slide deck printed as portrait letter renders cramped. Size the page to the slide:

```css
@page { size: 13.333in 7.5in; margin: 0; }
.slide { width: 13.333in; height: 7.5in; page-break-after: always; box-sizing: border-box; }
```

One `.slide` per page. The panel-role rule (§3) still applies.

## 6. Default to the light/document mode for PDFs

Unless the artifact is explicitly a dark-register piece, PDFs default to the brand's light/document mode (white or a warmth brand's light background). Don't ship a dark PDF — including deck title/close slides — without intent. (A restraint brand's near-black is a deliberate register choice, not a default to reach for in print.)

## 7. Render and read the PDF every pass

After each batch of edits, render to PDF and **read the actual pages** — at minimum the cover, one interior page, and the densest page. The white-frame, edge-hug, split-card, and overflow bugs do not appear in the browser preview; they only show in the rendered PDF. When someone shares a screenshot of a layout problem, read the proportions (does the content sum exceed the page height?) before guessing at CSS.

---

## Minimal correct skeleton (multi-page, full-bleed, uniform margins)

```html
<style>
:root { /* roles resolved from tokens.json: --bg --panel --panel-deep --chip --border … */ }
@page { size: letter; margin: 0; }
html, body {
  background: var(--bg); margin: 0; padding: 0;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.sheet { padding: 0.8in 0.9in; page-break-after: always; page-break-inside: avoid; box-sizing: border-box; }
.sheet:last-child { page-break-after: auto; }
.card { background: var(--panel); border: 1px solid var(--border); page-break-inside: avoid; }
</style>
<body>
  <div class="sheet"><!-- cover + first section, ≤ 1 page --></div>
  <div class="sheet"><!-- next chunk, ≤ 1 page --></div>
  <!-- … -->
</body>
```

See also: `tokens-print.md` (per-medium token usage), `components.md` (card/table/callout patterns), `slide-layouts.md` (deck patterns).
