# Components

Component library shared across presentation and print. For CSS tokens see `tokens-screen.md` / `tokens-print.md`. For slide-level layout patterns see `slide-layouts.md`.

---

## Cards

Base component — most content lives in one.

**Screen:**
```css
.card {
  background: var(--card);          /* #20302E */
  border: 1px solid var(--border);  /* #2A3A38 */
  border-radius: 10px;
  padding: 20px 24px;
}
```

**Print (dark / light):**
```css
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 14px 16px;
}
```

### Variants

- `.card-a` — accent left border (3px solid `--accent`)
- `.card-t` — accent top border (2px solid `--accent`) — use for metrics-heavy cards
- `.card-glow` — adds `box-shadow: 0 4px 24px var(--glow)` for emphasis

---

## Insight boxes

Callout panel for the "so what" synthesis. Always goes below a card grid.

```css
.insight {
  background: var(--card);
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
  border-radius: 10px;
  padding: 14px 22px;
  margin-top: 12px;
}
.insight { font-size: 0.58em; color: var(--body); }
.insight strong { color: var(--white); }
```

Rules:
- One insight box per slide, maximum. Two takeaways = two slides.
- 2–3 sentences max.
- Always bold the single most important phrase.

---

## Callouts (print)

Same spirit as insight boxes, sized for print:

```css
.callout {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
  border-radius: 6px;
  padding: 14px 18px;
}
```

**Not used in Document Mode (PRDs).** Prose only, no containers around body content.

---

## Stat blocks

Large metric display inside cards.

- `.stat-big` — 2.2em, 900 weight, white, line-height 1, -2px letter-spacing
- `.stat-label` — JetBrains Mono, 0.42em, dim, uppercase, 1px letter-spacing

**Print:**
- Stat number: Inter 22–26px, 800 weight, white / charcoal
- Stat label: JetBrains Mono 9px uppercase
- Stat card: flex 1, `--bg-card`, border + **top 2px accent**, 6px radius, `12px 14px` padding, centered text

Rules:
- Stat blocks always live inside cards. Naked `.stat-big` looks broken.
- Pair with context line below in `--muted`: "From $X to $Y per quarter"
- Never reduce stat number size to fit — cut other content first.

---

## Stages (horizontal process flow)

"How it works" layout — 2–4 stages per row.

```css
.stages { display: flex; gap: 12px; }
.stage  {
  flex: 1;
  background: var(--card);
  border: 1px solid var(--border);
  border-top: 2px solid var(--accent);
  border-radius: 10px;
  padding: 16px 14px;
}
.stage-num { font-family: 'JetBrains Mono'; font-size: 0.36em; font-weight: 600; color: var(--dim); letter-spacing: 2px; text-transform: uppercase; }
.stage h3  { font-size: 0.65em; color: var(--white); }
.stage p   { font-size: 0.48em; color: var(--muted); line-height: 1.55; }
.stage .out { font-size: 0.44em; font-weight: 600; color: var(--white); border-top: 1px solid var(--border); padding-top: 8px; margin-top: 8px; }
```

Structure per stage: timeline label (`.stage-num`) → title → description → outcome line (`.out`). Outcome has a top-border separator for visual weight.

---

## Bio cards (team)

```css
.bio {
  background: var(--card);
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
  border-radius: 10px;
  padding: 18px 22px;
}
.bio h3    { font-size: 0.72em; color: var(--white); }
.bio .title { font-family: 'JetBrains Mono'; font-size: 0.34em; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; color: var(--dim); }
.bio p     { font-size: 0.5em; line-height: 1.6; }
```

---

## Question cards (discovery)

Stacked prompt cards for Q&A or discovery slides.

```css
.q-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
  border-radius: 10px;
  padding: 12px 20px;
  margin-bottom: 8px;
}
.q-card p { font-size: 0.65em; color: var(--body); font-weight: 500; line-height: 1.4; }
.q-sub    { font-size: 0.44em; color: var(--dim); font-weight: 400; }
```

3–5 question cards max per slide.

---

## Before / After

Two-column comparison with distinct visual treatment.

```css
.ba        { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
.ba-col    { padding: 20px 22px; }
.ba-col.before { background: var(--card); border: 1px solid var(--border); border-radius: 10px 0 0 10px; }
.ba-col.after  { background: rgba(208,216,232,0.04); border: 1px solid rgba(208,216,232,0.15); border-radius: 0 10px 10px 0; }

.ba-label      { font-family: 'JetBrains Mono'; font-size: 0.38em; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; }
.before .ba-label { color: var(--dim); }
.after  .ba-label { color: var(--accent); }

.ba-result     { font-family: 'JetBrains Mono'; font-size: 0.44em; font-weight: 600; border-top: 1px solid var(--border); padding-top: 8px; margin-top: 8px; }
.before .ba-result { color: var(--dim); }
.after  .ba-result { color: var(--accent); }
```

---

## Tables

Data tables for structured info — metrics, comparisons, feature matrices.

```css
.table-wrap   { background: var(--card); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
.table-wrap table { width: 100%; border-collapse: collapse; }

.table-wrap th {
  font-family: 'JetBrains Mono';
  font-size: 0.5em;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--accent);
  letter-spacing: 1px;
  padding: 10px 16px;
}

.table-wrap td              { font-size: 0.5em; color: var(--muted); padding: 10px 16px; border: 1px solid var(--border); }
.table-wrap td:first-child  { color: var(--white); font-weight: 600; }   /* row label */
.table-wrap tr:hover td     { background: rgba(208,216,232,0.03); }
```

- Max 5–6 rows per table slide
- First column auto-bolds (row label treatment)
- Headers auto-styled (mono, accent, uppercase)

---

## Timeline

Horizontal milestone progression.

```css
.timeline {
  display: flex;
  position: relative;
  margin-top: 28px;
  padding-top: 20px;
}
.timeline::before {
  content: '';
  position: absolute;
  top: 24px; left: 0; right: 0;
  height: 2px;
  background: var(--accent);
}

.tl-item {
  flex: 1;
  position: relative;
  padding-right: 16px;
}
.tl-item::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 10px; height: 10px;
  background: var(--accent);
  border-radius: 50%;
}
.tl-item.active::before { background: var(--white); }

.tl-date  { font-family: 'JetBrains Mono'; font-size: 0.42em; text-transform: uppercase; color: var(--accent); }
.tl-label { font-size: 0.65em; font-weight: 600; color: var(--white); }
.tl-desc  { font-size: 0.48em; color: var(--muted); line-height: 1.5; }
```

3–5 items max. Mark `.active` on current / completed milestones.

---

## Bullet lists

- `list-style: none`
- 20px left padding on `<ul>`
- Marker: horizontal dash (8px × 2px), `--accent`, absolute position (left 0, top 12px)
- Item font: 0.6em, muted, line-height 1.65
- Padding: `3px 0 3px 20px`
- Strong in items: white, 600 weight

**Print (light mode):** same dash marker but in `--accent-light`. Never the red `>` marker from presentations.

---

## Separator

```css
.sep { width: 48px; height: 2px; background: var(--accent); margin: 12px 0; }
```

---

## Source citation

```css
.src {
  font-family: 'JetBrains Mono';
  font-size: 0.32em;
  color: rgba(80,90,112,0.4);
}
```

Always attribute claims. Always inline or at the bottom of the card — never a separate "Sources" box.

---

## Footer (presentation)

```css
.foot {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 8px 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg);
  font-family: 'JetBrains Mono';
  font-size: 8px;
  color: rgba(255,255,255,0.2);
  letter-spacing: 2px;
  text-transform: uppercase;
}
```

- Left span: "{{COMPANY}}"
- Right span: context-specific ("AEI — PSO", "{{URL}}", client name + date)

---

## Footer (print)

```css
.footer {
  background: var(--bg-deep);            /* dark mode */
  padding: 0.16in 0.55in;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

Light-mode footer uses white bg + `--text-secondary` text + `--border` top line.

---

## Cover slide

- Class: `.cover`
- Alignment: centered (flex column, center / center)
- Background: `--bg` (deepest black)
- Content wrapper: `.cover-inner`
- Logo: inline base64 PNG of {{COMPANY}} signature logo
- No text on cover — logo only, OR logo + minimal context line (`client — topic — month year`)

---

## CTA slide

- Class: `.cta`
- Alignment: centered
- Headline: h2, max-width 720px, centered
- Body text: max-width 600px, centered
- Contact line: white, 600 weight, 0.65em (`{{CONTACT}}`)
- Fine print: JetBrains Mono, 0.45em, dim

---

## When to use which component

| Slide need | Components |
|---|---|
| Proving ROI | stat blocks + before/after |
| Showing process | stages |
| Establishing credibility | bio cards + insight |
| Presenting case studies | cards + insight + stat blocks + source |
| Discovery meeting | question cards |
| Closing the deal | CTA slide |
| Comparing options | `.g2` + `.card-a` two-column |
| Explaining the problem | pull quote + bullet lists |
| Data-heavy slide | table (`.table-wrap`) |
| Project timeline | timeline |
