# Identity — Brand System

This is the **generic** identity for the whole system. It carries the design philosophy every brand inherits. Brand-specific identity (names, taglines, wordmarks, positioning, palette) lives in a profile — e.g. `profiles/northwind/` or `profiles/graphite/` — never here.

## What this is

The kit is built around one job: making the content do the work. Layout, color, and type serve the argument on the page; none of it is there just to decorate.

That discipline holds across every brand. Only the *register* changes with the audience (see the meta-thesis below).

## The meta-thesis

> **Match the visual register to the buyer's trust model.**

The system has one philosophy and two registers, because two different buyers grant trust for opposite reasons:

| Register | Buyer | Trust comes from | Profile |
|---|---|---|---|
| **Restraint** | Technical operator who distrusts polish | Near-black, no color, mono labels — "we don't need to charm you" | the `graphite` demo |
| **Warmth** | Non-technical exec who distrusts hype/vendors | Warm-light, serif headlines, editorial accent — "advisor, not vendor" | the `northwind` demo |

Restraint and warmth share one discipline; they differ only in what the audience distrusts. The two demo profiles (`graphite`, `northwind`) show each.

## Design philosophy (universal)

**Strip everything that doesn't serve the argument.** Whether the canvas is near-black or bone, the rule holds: remove anything that competes with the content.

**Hierarchy through restraint.** Two-to-three type families and three brightness/weight levels do all the work. If you need more, the content isn't structured right.

**Evidence over assertion.** Stat blocks, source citations, before/after, concrete figures. Every layout pushes toward "show, don't tell." If a layout leans on decoration, the argument underneath is usually thin.

**Confidence through quiet.** No gradients. No animation beyond a fade. No superlatives. Hierarchy through weight and whitespace.

**Stand-alone by default.** Every surface works without a presenter narrating it.

## The core test

> If a surface needs someone to explain it, the content isn't working hard enough. Every page should make its point without narration.

## Universal constants (brand-agnostic)

| Element | Value |
|---|---|
| Mono label font | JetBrains Mono — uppercase, letter-spaced, used as seasoning |
| Emphasis discipline | One decisive figure per section, maximum |
| Forbidden everywhere | Gradients, stock photos, decorative icons, AI-shimmer, color-as-hierarchy-crutch |

**Per-brand constants** (headline font, palette, accent, company name, tagline, URL, wordmark) live in each profile's `tokens.json`. See `README.md` for the profile map.
