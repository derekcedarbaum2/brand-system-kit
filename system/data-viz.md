# Data Visualization

Charts, graphs, and structured data treatments. The system is color-restrained; data viz follows suit. No rainbow palettes, no 3D, no chart junk.

## Core principle

> Each chart should make one point. If the argument is about one number changing over time, don't put five lines on the chart to make it look important. Put the one line. Emphasize what matters.

## Color sequence (ordered)

When you need multiple series, use the role tokens in this order. The roles resolve per profile, so the same chart re-skins to either register:

| Order | Role | Use when |
|---|---|---|
| 1 | `--text-primary` | The focal series, the thing the chart is about |
| 2 | `--accent` | The comparison series |
| 3 | `--text-secondary` | Additional context series |
| 4 | `--border` | Deemphasized / background series |

**Never use more than 4 series in one chart.** If the data demands more, split into small multiples.

## Emphasis color

For the ONE decisive data point (the final quarter's number, the threshold line, the outcome):

- Screen: `--text-primary` at full weight
- Print (document mode): `--emphasis`, used only once per chart

## Chart type → when

| Chart type | Use when |
|---|---|
| Line chart | Change over time |
| Bar chart | Comparing discrete categories |
| Stacked bar | Composition over time (use sparingly; often a table does better) |
| Area chart | Cumulative totals, rarely |
| Scatter plot | Relationship between two variables |
| Small multiples | Same chart repeated across categories (use often) |
| Table | When precise values matter more than shape |

**Avoid:** pie charts (humans read angle poorly), donut charts (worse than pie), 3D anything, stacked area with 5+ series.

## Grid and axes

- Grid lines: hairline `--border`, almost invisible
- Axis lines: same as grid; suppress the chart frame
- Ticks: mono (`--font-mono`), 0.42em screen / 9px print, `--text-dim`
- Labels: mono, uppercase, letter-spaced 1–2px

## Annotations

Label series directly, not via legend:
```
<line at end of series, label right next to the endpoint>
```

Annotations should read like prose: "Q3 cutover, costs drop 62%." Not: "Event A."

Always annotate the emphasis point in the chart title OR directly on the chart.

## Numbers on charts

- Use the metric, not the ratio, when the scale matters: "$2.4M" not "2.4" with an implicit unit
- Prefer SI units: "12K" not "12,000" for chart labels (but "12,000" in body copy)
- Align number formats: if one axis is thousands, the whole axis is thousands
- Round to the decision point: 62.387% becomes 62%

## Fonts in charts

- Chart title: sans, 0.9em screen / 14px print, weight 700, `--text-primary`
- Axis labels: mono, uppercase
- Data labels: mono
- Annotations: sans, same size as body

## Captions and source

Always attribute the data. Place under the chart in `--text-dim` at `src` class sizing.

```
<div class="src">Source: [dataset], [period], [retrieved date]</div>
```

If the data is derived or estimated, say so: "[Brand] analysis. Estimates in italics." No unattributed numbers in decks or one-pagers.

## Dashboards

Dashboards are screen-mode surfaces, same tokens as any other screen output (see `tokens-screen.md`): `--bg` background, `--text-body` text, `--accent` accents.

- Tables > charts for most operational dashboards; they read cleanest
- Prefer one-glance readability over dense info. A dashboard that takes 30 seconds to read is failed design

## What NOT to do

- No gradients in chart fills
- No drop shadows on bars / lines
- No "floating" 3D perspective views
- No color gradients across ordinal data (use intensity of one color for ordinal, distinct hues only for categorical)
- No rotated axis labels beyond 45°; if labels are too long, the chart type is wrong
- No overlapping legends; always label directly when feasible
