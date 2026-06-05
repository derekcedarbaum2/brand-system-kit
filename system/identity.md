# Identity — Brand System

This is the **generic** identity for the whole system. It carries the design philosophy every brand inherits. Brand-specific identity (names, taglines, wordmarks, positioning, palette) lives in a profile — e.g. `profiles/northwind/` or `profiles/graphite/` — never here.

## What this brand is

Not a brand identity system. An **argument delivery system**.

Every design choice exists to make the content do the work. No decoration, no distraction, no filler. This is the through-line across every brand — the *register* changes per audience (see the meta-thesis below), but the discipline never does.

## The meta-thesis

> **Match the visual register to the buyer's trust model.**

The system has one philosophy and two registers, because two different buyers grant trust for opposite reasons:

| Register | Buyer | Trust comes from | Profile |
|---|---|---|---|
| **Restraint** | Technical operator who distrusts polish | Near-black, no color, mono labels — "we don't need to charm you" | the `graphite` demo |
| **Warmth** | Non-technical exec who distrusts hype/vendors | Warm-light, serif headlines, editorial accent — "advisor, not vendor" | the `northwind` demo |

Both are the same argument-delivery discipline. Restraint and warmth are not opposite *philosophies* — they're the same philosophy pointed at different fears. The two demo profiles (`graphite`, `northwind`) are worked examples of each.

## Design philosophy (universal)

**Strip everything that doesn't serve the argument.** Whether the canvas is near-black or bone, the rule holds: remove anything that competes with the content.

**Hierarchy through restraint.** Two-to-three type families and three brightness/weight levels do all the work. If you need more, the content isn't structured right.

**Evidence over assertion.** Stat blocks, source citations, before/after, dollarized outcomes. Every layout pushes toward "show, don't tell." Decoration is a tell that the argument is weak.

**Confidence through quiet.** No gradients. No animation beyond a fade. No superlatives. Hierarchy through weight and whitespace.

**Stand-alone by default.** Every surface works without a presenter narrating it.

## The one rule

> If it requires the presenter to explain it, the content isn't working hard enough. Every surface should communicate its point without narration.

## Universal constants (brand-agnostic)

| Element | Value |
|---|---|
| Mono label font | JetBrains Mono — uppercase, letter-spaced, used as seasoning |
| Emphasis discipline | One decisive figure per section, maximum |
| Forbidden everywhere | Gradients, stock photos, decorative icons, AI-shimmer, color-as-hierarchy-crutch |

**Per-brand constants** (headline font, palette, accent, company name, tagline, URL, wordmark) live in each profile's `tokens.json`. See `README.md` for the profile map.
