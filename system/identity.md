# Identity: the style system

This is the **generic** identity for the whole system. It carries the design philosophy every style inherits. Style-specific identity (names, taglines, wordmarks, positioning, palette) lives in a profile, such as `profiles/northwind/` or `profiles/graphite/`, never here.

## What this is

The kit is built around one job: making the content do the work. Layout, color, and type serve the argument on the page. None of it is there just to decorate.

That discipline holds across every style. Only the *register* changes with the reader (see the meta-thesis below).

## The meta-thesis

> **Match the visual register to your reader.**

The system has one philosophy and two registers, because two kinds of reader judge a document by opposite signals:

| Register | Reader | Reads as wrong when | Trust comes from | Profile |
|---|---|---|---|---|
| **Restraint** | Technical or expert reviewer (engineers, evaluators, program reviews) | It looks polished or salesy | Near-black, no extra color, mono labels. The work speaks for itself. | the `graphite` demo |
| **Warmth** | Executive, stakeholder, or customer | It looks cold or hard to scan | Light background, serif headlines, one editorial accent. Clear and credible. | the `northwind` demo |

Restraint and warmth share one discipline. They differ only in what the reader is primed to distrust. The two demo profiles (`graphite`, `northwind`) show each.

## Design philosophy (universal)

**Strip everything that doesn't serve the argument.** Whether the canvas is near-black or bone, the rule holds: remove anything that competes with the content.

**Hierarchy through restraint.** Two to three type families and three brightness or weight levels do all the work. If you need more, the content isn't structured right.

**Evidence over assertion.** Stat blocks, source citations, before and after, concrete figures. Every layout pushes toward "show, don't tell." If a layout leans on decoration, the argument underneath is usually thin.

**Confidence through quiet.** No gradients. No animation beyond a fade. No superlatives. Hierarchy through weight and whitespace.

**Stand-alone by default.** Every surface works without a presenter narrating it.

## The core test

> If a surface needs someone to explain it, the content isn't working hard enough. Every page should make its point without narration.

## Universal constants (style-agnostic)

| Element | Value |
|---|---|
| Mono label font | JetBrains Mono: uppercase, letter-spaced, used as seasoning |
| Emphasis discipline | One decisive figure per section, maximum |
| Forbidden everywhere | Gradients, stock photos, decorative icons, AI-shimmer, color-as-hierarchy-crutch |

**Per-style constants** (headline font, palette, accent, company name, tagline, URL, wordmark) live in each profile's `tokens.json`. See `README.md` for the profile map.
