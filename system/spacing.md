# Spacing

## Presentation (1280×720)

### Slide dimensions

- Width: 1280px
- Height: 720px
- Aspect ratio: 16:9 (compact, optimized for screen share)
- Margin: 0

### Slide padding

- Top: 52px
- Left: 90px
- Right: 90px
- Bottom: accommodated by footer

### Text alignment

- **Default:** left-aligned
- **Exceptions:** cover slide (centered), CTA slide (centered)

### Component gaps

- `.g2`: 2-column grid, **16px gap**, 14px margin-top
- `.g3`: 3-column grid, **14px gap**, 14px margin-top
- `.stages`: flex container, **12px gap**
- Insight box: 12px margin-top from content above
- Separator: 12px vertical margin (`.sep` = 48×2px, `--accent`)

---

## Print: one-pager (8.5×11)

### Page setup

Page mechanics (full-bleed background, `@page { margin: 0 }`, insets as padding) are canonical in `print-layout.md` §1–2. Single-page artifacts apply the inset as `body` padding:

```css
@page { size: letter; margin: 0; }
html, body {
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
```

- Side padding: 0.55in
- Header padding: `0.4in 0.55in 0.35in`
- Footer padding: `0.16in 0.55in`
- Overflow: hidden (one page means one page)

### Height budget

- Header: ~1.2in
- Footer: ~0.4in
- Each card row: ~0.9–1.1in
- Stats row: ~0.7in
- Grid section: ~1.0–1.3in
- Callout: ~0.6–0.8in
- Team section: ~1.0–1.3in

### Overflow tightening (in order)

1. Reduce body font by 0.5px, tighten card padding by 2px
2. Reduce section gap from 0.2in to 0.15in
3. Cut lowest-value section (usually thesis / callout)
4. Never reduce stat number font size
5. Never cut team to fewer than 1 person

---

## Print: light / meeting summary

The margins here are **visual insets**, applied as `.sheet` (or single-page `body`) padding. Never as `@page` margins; a non-zero `@page` margin paints a white frame around any non-white page background. Page setup lives in `print-layout.md` §1–2.

- Inset: 0.75in on all sides
- Body: 11px, line-height 1.65, `var(--text-body)`
- Content column: ~7in. Formal, scannable, readable.

---

## Print: document mode (PRDs, strategy briefs)

Same page mechanics (`print-layout.md` §1–2). Inset of 0.85in as `.sheet` padding.

```css
body {
  font-family: var(--font-sans);
  font-size: 11px;
  line-height: 1.7;
  color: var(--text-body);
  background: var(--bg);
  max-width: none;   /* full-page width, no narrow reading column */
  margin: 0;
}

@media print {
  .page-break { page-break-before: always; }
  .no-break { page-break-inside: avoid; }
}
```

**The core rule:** full-width prose, no narrow reading column. Body runs edge-to-edge (insets only). No `max-width: 7in`, no centered column, no magazine layouts.

---

## Grid primitives (print)

```css
.two-cards  { display: flex;  gap: 0.22in; align-items: stretch; }
.two-cards .card { flex: 1; }

.grid-2col  { display: grid; grid-template-columns: 1fr 1fr;       gap: 10px; }
.grid-3col  { display: grid; grid-template-columns: 1fr 1fr 1fr;   gap: 10px; }

.stats-row  { display: flex; gap: 0.18in; }
.stats-row .stat-card { flex: 1; text-align: center; }
```

---

## Density tiers

When the same content needs to fit different space budgets:

| Tier | Body font | Card padding | Gap | Use for |
|---|---|---|---|---|
| Loose | 11px | 16px | 0.22in | First draft, breathing room |
| Standard | 10.5px | 14px | 0.18in | Default for most one-pagers |
| Tight | 10px | 12px | 0.14in | Content-heavy one-pager, last-resort fit |
| Dense | 9.5px | 10px | 0.12in | Reference sheets only, never marketing |

## Rules

- **Never less than 9px body text on print.** Below that it's unreadable.
- **Never less than 0.55in margins on print** (unless it's an internal reference sheet).
- **Always leave a footer.** Even on internal docs; it anchors the page.
- **Whitespace is content.** Filling every inch usually means too much content and not enough editing. A half-empty page with a single stat line that hits is stronger than a full page of middling evidence.
