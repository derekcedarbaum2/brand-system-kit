# Diagram Library

37 reusable SVG diagram/template files. **Every diagram is token-driven** — fills are `var(--role)`, so a diagram renders in whatever palette is in scope. They ship on the demo palette; re-skin to any profile.

## Use a diagram in your brand

- **Re-skin to a profile** (writes the profile's palette into the SVG). Run from the repo root, and always give an explicit output path:
  ```
  node tooling/tokenize-svg.mjs diagrams/<name>.svg out.svg --palette profiles/<name>/tokens.json
  ```
- **Or inline it** into an HTML page that already defines the CSS variables (e.g. a page linking your `brand.css`) — the diagram inherits the host's `--accent`, `--ink`, etc. automatically.
- **Fill the content**: replace the `{PLACEHOLDER}` / `{{COMPANY}}` / `{{PROGRAM}}` text.

Token roles a diagram may reference: `--ink --body --secondary --dim --accent --accent-light --accent-2 --teal --warm --positive --emphasis --bg --card --card-accent --border`. A profile's `tokens.json` should define the ones its diagrams use (the demo `northwind` does).

## Catalog

**Roadmaps & planning** — `roadmap-single-product`, `roadmap-multi-product`, `roadmap-feature-mapping`, `roadmap-prd-index`, `roadmap-program-card`, `roadmap-timeline-overlay`, `backlog-now-next-later`, `story-map`

**Frameworks & prioritization** — `2x2-quadrant`, `perceptual-map`, `tier-ladder`, `tech-radar`, `jtbd-forces`, `funnel`, `mental-model-rings`

**Discovery & research** — `persona-card`, `empathy-map`, `user-journey`, `service-blueprint`, `storyboard`, `affinity-diagram`

**Process & flow** — `activity-flow-single`, `activity-flow-swimlanes`, `wireflow`, `prototype-map`, `state-diagram`, `v-model`, `animation-timing`

**Systems & architecture** — `c4-context`, `c4-container`, `software-architecture`, `network-topology`, `er-diagram`, `supply-chain-map`, `sankey`, `tree`, `grid`

## Note

These are templates — colors come from the active profile, content is placeholder. Nothing here is anyone's brand.
