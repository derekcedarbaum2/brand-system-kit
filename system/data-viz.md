# Data Visualization

Charts, graphs, and structured data treatments. The brand is color-restrained — data viz follows suit. No rainbow palettes, no 3D, no chart junk.

## Core principle

> A chart is an argument. If the argument is about one number changing over time, don't put five lines on the chart to make it look important. Put the one line. Emphasize what matters.

## Color sequence (ordered)

When you need multiple series, use in this order:

| Order | Screen | Print light | Use when |
|---|---|---|---|
| 1 | `#FFFFFF` (white) | `#1C1C1C` (charcoal) | The focal series — the thing the chart is about |
| 2 | `#9FC7CD` (accent) | `#3E5C8A` (accent) | The comparison series |
| 3 | `#8A9290` (muted) | `#666666` (secondary) | Additional context series |
| 4 | `#3E5C8A` (dim) | `#E5E5E5` (border) | Deemphasized / background series |

**Never use more than 4 series in one chart.** If the data demands more, split into small multiples.

## Emphasis color

For the ONE decisive data point — the final quarter's number, the threshold line, the outcome:

- Screen: `#FFFFFF` white at full weight
- Print (document mode): `#9A2D2D` emphasis red — use only once per chart

## Chart type → when

| Chart type | Use when |
|---|---|
| Line chart | Change over time |
| Bar chart | Comparing discrete categories |
| Stacked bar | Composition over time (use sparingly — often a table does better) |
| Area chart | Cumulative totals — rarely |
| Scatter plot | Relationship between two variables |
| Small multiples | Same chart repeated across categories (use often) |
| Table | When precise values matter more than shape |

**Avoid:** pie charts (humans read angle poorly), donut charts (worse than pie), 3D anything, stacked area with 5+ series.

## Grid and axes

- Grid lines: `rgba(127,127,127,0.06)` on screen, `#E5E5E5` on print — almost invisible
- Axis lines: same as grid — suppress the chart frame
- Ticks: JetBrains Mono, 0.42em screen / 9px print, `--text-dim` / `--text-dim`
- Labels: JetBrains Mono, uppercase, letter-spaced 1–2px

## Annotations

Label series directly, not via legend:
```
<line at end of series, label right next to the endpoint>
```

Annotations should read like prose: "Q3 cutover — costs drop 62%." Not: "Event A."

Always annotate the emphasis point in the chart title OR directly on the chart.

## Numbers on charts

- Use the metric, not the ratio, when the scale matters: "$2.4M" not "2.4" with an implicit unit
- Prefer SI units: "12K" not "12,000" for chart labels (but "12,000" in body copy)
- Align number formats: if one axis is thousands, the whole axis is thousands
- Round to the decision point — 62.387% becomes 62%

## Fonts in charts

- Chart title: Inter, 0.9em screen / 14px print, weight 700, white / charcoal
- Axis labels: JetBrains Mono, uppercase
- Data labels: JetBrains Mono
- Annotations: Inter, same size as body

## Captions and source

Always attribute the data. Place under the chart in `--text-dim` at `src` class sizing.

```
<div class="src">Source: [dataset], [period], [retrieved date]</div>
```

If the data is derived or estimated, say so: "{{COMPANY}} analysis — estimates in italics." No unattributed numbers in decks or one-pagers.

## Dashboards

For operational dashboards:

- Inherit the light-mode palette (background `--bg`, text `--text-body`, accent `--accent`)
- Tables > charts for most operational dashboards — they read cleanest
- Prefer one-glance readability over dense info — a dashboard that takes 30 seconds to read is failed design

## What NOT to do

- No gradients in chart fills
- No drop shadows on bars / lines
- No "floating" 3D perspective views
- No color gradients across ordinal data (use intensity of one color for ordinal, distinct hues only for categorical)
- No rotated axis labels beyond 45° — if labels are too long, the chart type is wrong
- No overlapping legends — always label directly when feasible
