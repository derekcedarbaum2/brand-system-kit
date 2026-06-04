# Tokens — Print Mode

CSS variables for print/PDF surfaces. Three distinct modes — pick one per document.

| Mode | Use for |
|---|---|
| **Dark Mode** | One-pagers, capability sheets, sales leave-behinds, prospect collateral |
| **Light Mode** | Meeting summaries, scannable internal deliverables, formal client reports |
| **Document Mode** | PRDs, hypothesis briefs, strategy briefs, long-form memos, research synthesis |

All three share typography (Inter + JetBrains Mono) and structural patterns with the presentation system, but are optimized for 8.5×11 letter at print resolution.

---

## Shared base

```css
@page { size: letter; margin: 0; }

html, body {
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
  -webkit-font-smoothing: antialiased;
  font-family: 'Inter', -apple-system, sans-serif;
}
```

---

## Dark Mode — one-pagers & sales collateral

### Variables

```css
:root {
  --bg-deep:        #14201F;
  --bg-page:        #1A2625;
  --bg-card:        #1F2C2A;
  --border:         #2C3C3A;
  --accent:         #9FC7CD;   /* silvery — same family as presentation accent */
  --text-primary:   #ffffff;
  --text-body:      #E6E9E7;
  --text-secondary: rgba(180,195,220,0.7);
  --text-dim:       rgba(180,195,220,0.5);
  --text-label:     #8A9290;
}
```

### Key components

**Header:**
```css
.header {
  background: var(--bg-deep);   /* #14201F — deepest black */
  padding: 0.4in 0.55in 0.35in;
}
```

**Footer:**
```css
.footer {
  background: var(--bg-deep);
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
  border-left: 2px solid #3A4E4C;  /* slightly lighter than border */
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

- 70% near-black (`--bg-page`, `--bg-deep`)
- 20% card surfaces and borders
- 10% accent on stat tops, callout lefts, section labels

---

## Light Mode — meeting summaries & internal documents

### Variables

```css
:root {
  --charcoal:       #1C1C1C;
  --text-body:      #333333;
  --text-secondary: #666666;
  --accent:         #3E5C8A;
  --accent-light:   #9FC7CD;
  --border:         #E5E5E5;
  --bg:             #FFFFFF;
  --bg-card:        #F0EEE8;
  --teal:           #2A7D8A;
}
```

### Page setup

```css
@page { size: letter; margin: 0.75in; }

body {
  font-family: 'Inter', -apple-system, sans-serif;
  font-size: 11px;
  line-height: 1.65;
  color: var(--text-body);
  max-width: 7in;
  margin: 0 auto;
}
```

### Key components

**Section headings:** accent bar (3px wide `--accent`) + Inter uppercase heading + optional subtitle.

**Bullet markers:** horizontal dash (8px × 2px), `--accent-light` color. Not the presentation's `>` marker.

**Table headers:** JetBrains Mono, 10px, uppercase, `--teal` color.

**CTA table:** 2px solid `--accent` border, `#E9EEEE` header background.

**Decision table:** 2px solid `--teal` border, `#E6EEF0` header background.

**Cover page:**
- Thin accent stripe (4px)
- "{{COMPANY}}" in JetBrains Mono, uppercase, 4px letter-spacing
- Title in Inter 800, 26px
- Metadata grid below
- "{{COMPANY}} — Confidential" footer

### Color application (light)

- 80% white — clean, professional
- 15% light-gray cards and borders
- 5% accent on section bars, CTA borders, time bars

---

## Document Mode — PRDs, strategy briefs, long-form

**The shift from Light Mode.** Meeting summaries are scannable. PRDs and strategy briefs are **read linearly**, usually end-to-end. That changes the design rules.

### Variables

```css
:root {
  --charcoal:       #1C1C1C;
  --text-body:      #333333;
  --text-secondary: #666666;
  --accent:         #3E5C8A;
  --accent-light:   #9FC7CD;
  --border:         #E5E5E5;
  --bg:             #FFFFFF;
  --teal:           #2A7D8A;
  --emphasis:       #9A2D2D;   /* reserved — decisive figures only, never decorative */
}
```

### Page setup

```css
@page { size: letter; margin: 0.85in; }

body {
  font-family: 'Inter', -apple-system, sans-serif;
  font-size: 11px;
  line-height: 1.7;
  color: var(--text-body);
  background: var(--bg);
  max-width: none;   /* full page width — no narrow reading column */
  margin: 0;
}

@media print {
  body { padding: 0; }
  .page-break { page-break-before: always; }
  .no-break   { page-break-inside: avoid; }
}
```

### Typography rules

- **H1 (doc title):** Inter 800, 26px, `--charcoal`, -0.5px letter-spacing, margin-bottom 8px
- **Subtitle:** 13px, `--text-secondary`, margin-bottom 4px
- **Metadata line:** JetBrains Mono, 9px, uppercase, 2px letter-spacing, `--text-secondary`, margin-bottom 18px
- **H2:** 17px, 700, `--charcoal`, margin `26px 0 10px`, **left border 3px solid `--accent`**, padding-left 12px, line-height 1.3
- **H3:** 13px, 700, `--charcoal`, margin `16px 0 5px`
- **Body paragraph:** 11px, 400, `--text-body`, line-height 1.7, margin `7px 0`
- **Strong:** `--charcoal`, 600 weight
- **Lists:** 20px left padding, 3px between items, inherits body size

### Tables (document mode)

Same as light mode — JetBrains Mono uppercase headers in `--teal`, 2px bottom border in `--accent` under header row, alternating row striping with `#FCFCFC`.

### The core document-mode rule: full-width prose, no text boxes

- Body copy runs the **full content width** — margins only. No 7in narrow column.
- **No callout boxes around body paragraphs.** No cards, no bordered containers, no background-tinted panels wrapping prose. If an argument is important, write a paragraph — don't visually cage it.
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
- Full-color emphasis — the red `--emphasis` is reserved for ONE decisive figure per section, max

### What's encouraged in document mode

- Dense, confident prose with short declarative sentences
- Numerical claims as part of sentences, not giant stat blocks
- Tables for comparisons, cost breakdowns, roadmaps, requirements matrices
- Inline `<code>` (JetBrains Mono) for API fields, filenames, flags
- One emphasis figure per major section, maximum

### Reference exemplar

A long-form hypothesis or strategy brief is the canonical example of document mode — full-width prose, accent-bar H2s, dense tables, mono metadata line, no boxed body content.

---

## PDF export

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --no-pdf-header-footer \
  --print-to-pdf="output.pdf" "input.html"
```

Always use `--no-pdf-header-footer` to suppress Chrome's default file path / timestamp headers.
