# Tokens: Print Mode

Token usage for print/PDF surfaces. Three distinct modes; pick one per document.

| Mode | Use for |
|---|---|
| **Light Mode** | Meeting summaries, scannable internal deliverables, formal client reports |
| **Document Mode** | PRDs, hypothesis briefs, strategy briefs, long-form memos, research synthesis |
| **Dark Mode** | A deliberate dark-register piece only. Never the default. |

**PDFs default to the light/document mode.** `print-layout.md` §6 is the canonical rule: don't ship a dark PDF without intent. A restraint profile's near-black is a register choice, not a default to reach for in print.

All modes share typography (the profile's `sans` + `mono` font tokens) and structural patterns with the deck system, but are optimized for 8.5×11 letter at print resolution.

> **Values come from the profile.** A brand's binding values live in its `profiles/<name>/tokens.json` and the generated `brand.css`. Use this file for *which roles and structural rules apply per print mode*, not for literal colors. Page mechanics (full-bleed background, sheet pagination) live in `print-layout.md` §1–2.

---

## Shared base

```css
@page { size: letter; margin: 0; }

html, body {
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
  -webkit-font-smoothing: antialiased;
  font-family: var(--font-sans);
}
```

---

## Light Mode: meeting summaries & internal documents

### Roles

Link the profile's generated `brand.css`. The roles that carry light print: `--bg` (page), `--bg-card` (cards), `--border`, `--accent` (section bars, links), `--accent-2` (secondary marks, bullet markers), `--text-primary` (headings, strong), `--text-body`, `--text-secondary`, `--text-dim` (labels, footers).

### Page setup

Visual inset of ~0.75in, applied as `.sheet` (or single-page `body`) padding. Never as `@page` margin; see `print-layout.md` §1. Body: 11px, line-height 1.65, `var(--text-body)`, content column ~7in.

### Key components

**Section headings:** accent bar (3px wide `--accent`) + uppercase sans heading + optional subtitle.

**Bullet markers:** horizontal dash (8px × 2px), `--accent-2` color.

**Table headers:** mono (`--font-mono`), 10px, uppercase, `--accent` color.

**CTA table:** 2px solid `--accent` border, `--bg-card` header background.

**Decision table:** use the `table.decision` class from the profile's `brand.css` (both shipped profiles define it).

**Cover page:**
- Thin accent stripe (4px)
- Brand wordmark (the profile's `lint.company-name`) in mono, uppercase, 4px letter-spacing
- Title in the profile's sans, 800 weight, 26px
- Metadata grid below
- "Brand name &mdash; Confidential" footer

### Color application (light)

- 80% page background: clean, professional
- 15% card surfaces and borders
- 5% accent on section bars, CTA borders, time bars

---

## Document Mode: PRDs, strategy briefs, long-form

**How Document Mode differs from Light Mode.** Meeting summaries are scannable. PRDs and strategy briefs are **read linearly**, usually end-to-end. That changes the design rules.

### Roles

Same roles as Light Mode, plus `--emphasis`: reserved for decisive figures only, never decorative.

### Page setup

Visual inset of ~0.85in, applied as `.sheet` padding (`print-layout.md` §1–2). Body: 11px, line-height 1.7, `var(--text-body)` on `var(--bg)`, full content width (no narrow reading column).

```css
@media print {
  .page-break { page-break-before: always; }
  .no-break   { page-break-inside: avoid; }
}
```

### Typography rules

- **H1 (doc title):** sans 800, 26px, `--text-primary`, -0.5px letter-spacing, margin-bottom 8px
- **Subtitle:** 13px, `--text-secondary`, margin-bottom 4px
- **Metadata line:** mono, 9px, uppercase, 2px letter-spacing, `--text-secondary`, margin-bottom 18px
- **H2:** 17px, 700, `--text-primary`, margin `26px 0 10px`, **left border 3px solid `--accent`**, padding-left 12px, line-height 1.3
- **H3:** 13px, 700, `--text-primary`, margin `16px 0 5px`
- **Body paragraph:** 11px, 400, `--text-body`, line-height 1.7, margin `7px 0`
- **Strong:** `--text-primary`, 600 weight
- **Lists:** 20px left padding, 3px between items, inherits body size

### Tables (document mode)

Same as light mode: mono uppercase headers in `--accent`, 2px bottom border in `--accent` under the header row, alternating row striping in `--bg-card`.

### The core document-mode rule: full-width prose, no text boxes

- Body copy runs the **full content width**, margins only. No 7in narrow column.
- **No callout boxes around body paragraphs.** No cards, no bordered containers, no background-tinted panels wrapping prose. If an argument is important, write a paragraph; don't visually cage it.
- Tables are fine and encouraged for structured data.
- Accent-bar H2s are fine (left border on the heading only, not on the prose underneath).
- Bullet / numbered lists are fine.
- Inline `<strong>` and `<em>` emphasis are fine.
- Footnotes / source citations as inline mono text are fine.

### What's banned in document mode

- `max-width: 7in` or any narrow reading column
- `.callout`, `.card`, `.insight-box`, or any bordered container wrapping body prose
- Two-column body text layouts
- Card grids for content that is actually a list or table
- Drop caps, pull quotes, sidebars, magazine-style layouts
- Full-color emphasis. The `--emphasis` red is reserved for ONE decisive figure per section, max

### What's encouraged in document mode

- Dense, confident prose with short declarative sentences
- Numerical claims as part of sentences, not giant stat blocks
- Tables for comparisons, cost breakdowns, roadmaps, requirements matrices
- Inline `<code>` (mono) for API fields, filenames, flags
- One emphasis figure per major section, maximum

### Reference exemplar

A long-form hypothesis or strategy brief is the canonical example of document mode: full-width prose, accent-bar H2s, dense tables, mono metadata line, no boxed body content.

---

## Dark Mode: deliberate dark-register pieces

Only when the artifact is explicitly a dark-register piece (`print-layout.md` §6). Same components as Light Mode, dark surfaces.

### Roles

`--bg` (page), `--bg-dark` (header/footer band, the deepest surface), `--bg-card` (cards), `--border`, `--accent`, `--text-primary`, `--text-body` / `--text-on-dark`, `--text-secondary`, `--text-dim` (labels, sources).

### Key components

**Header:**
```css
.header {
  background: var(--bg-dark);   /* deepest surface */
  padding: 0.4in 0.55in 0.35in;
}
```

**Footer:**
```css
.footer {
  background: var(--bg-dark);
  padding: 0.16in 0.55in;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

**Service / feature items:**
```css
.service-item {
  padding: 12px 14px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  border-left: 2px solid var(--accent-2);
}
```

**Stat card:**
```css
.stat-card {
  flex: 1;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-top: 2px solid var(--accent);
  border-radius: 6px;
  padding: 12px 14px;
  text-align: center;
}
```

### Color application (dark)

- 70% near-black (`--bg`, `--bg-dark`)
- 20% card surfaces and borders
- 10% accent on stat tops, callout lefts, section labels

---

## PDF export

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --no-pdf-header-footer \
  --print-to-pdf="output.pdf" "input.html"
```

Always use `--no-pdf-header-footer` to suppress Chrome's default file path / timestamp headers. (`tooling/render.mjs` produces PNG previews for visual critique; PDFs come from Chrome's `--print-to-pdf` directly.)
