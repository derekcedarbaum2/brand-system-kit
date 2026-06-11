# AGENTS.md: install & operate this kit

Instructions for any AI coding agent (**Codex, Cursor, Claude Code, Aider, and others**) to install and run **Brand System Kit** for a user. Follow these steps literally; the `node` commands below are safe to run to verify your work. The tooling is plain Node (no agent-specific dependency); the one Claude-specific piece (`skill/brand-init/`) is just a wrapper around the tool-neutral interview in `docs/brand-interview.md`, which any agent can follow directly.

## What this is
An executable style system for business documents: a DTCG token source-of-truth, generators, a lint gate, a WCAG contrast checker, an HTML→PNG render step, an SVG tokenizer, 37 diagram templates, ready-to-fill document templates, and a `/brand-init` skill that scaffolds a new style. Zero runtime dependencies (Node ≥18 stdlib only). Chrome/Chromium is needed only for `render.mjs`.

## Install

1. **Get the code.** Clone into the user's projects directory:
   ```bash
   git clone https://github.com/derekcedarbaum2/brand-system-kit.git
   cd brand-system-kit
   ```
2. **Check Node.** Require `node --version` ≥ 18. No `npm install` is needed (zero dependencies).
3. **(Optional) Chrome for rendering.** `render.mjs` auto-detects Chrome/Chromium on macOS/Linux/Windows; if not found, set `CHROME_PATH=/path/to/chrome`. Skip if the user doesn't need PNG previews.
4. **(Optional) Install the scaffolding skill** so the user can run `/brand-init` in Claude Code:
   ```bash
   cp -R skill/brand-init ~/.claude/skills/brand-init
   ```
   The skill's steps operate on the cloned repo: run them (and all `node tooling/...` commands) **from the brand-system-kit repo root**, where `tooling/`, `profiles/`, and `diagrams/` live. The installed copy lives away from the repo, so the skill locates the repo first (the protocol in `skill/brand-init/SKILL.md`): use the working directory if `./tooling/brand-qa.mjs` exists there, else ask the user or check the obvious clone spots, else clone `https://github.com/derekcedarbaum2/brand-system-kit.git` fresh.

## Verify the install works

Run the demo profile through the full gate; all should pass:
```bash
node tooling/contrast-check.mjs profiles/northwind          # WCAG AA, exit 0
node tooling/build-tokens.mjs profiles/northwind/tokens.json profiles/northwind/brand.css --md profiles/northwind/color-system.md
node tooling/lint.mjs profiles/northwind/sample.html profiles/northwind   # exit 0
node tooling/lint.mjs examples/bad.html profiles/northwind   # exit 1 (intended: proves the gate bites)
```

## Create a brand for the user

**Interview the user, then scaffold.** The full method, a one-question-at-a-time decision tree from audience down to every token plus the build/verify steps, is in **[`docs/brand-interview.md`](docs/brand-interview.md)**. It's tool-agnostic; follow it directly (Codex, Cursor, etc.). In Claude Code it's also available as the `/brand-init` skill, which just wraps that same file.

If you're scaffolding without the interview, the short version:

1. Derive the register from the audience: technical/skeptical-of-polish → restraint (dark, no brand color); non-technical exec → warmth (light, serif, one accent). See `system/identity.md` for the meta-thesis.
2. Copy the register-matched demo (the demo `brand.css` component layers are register-specific, not generic): `cp -R profiles/northwind profiles/<brand-slug>` for warmth, `cp -R profiles/graphite profiles/<brand-slug>` for restraint.
3. Edit `profiles/<brand-slug>/tokens.json`: set the `color`, `fontFamily`, and `lint` blocks (DTCG format; mirror the demo's structure). Keep `"Northwind"` and `"Graphite"` in `lint.foreign-names`.
4. Verify contrast first, then generate (iterate the palette until AA passes):
   ```bash
   node tooling/contrast-check.mjs profiles/<brand-slug>
   node tooling/build-tokens.mjs profiles/<brand-slug>/tokens.json profiles/<brand-slug>/brand.css --md profiles/<brand-slug>/color-system.md
   ```
5. Re-skin any diagram to the new brand:
   ```bash
   node tooling/tokenize-svg.mjs diagrams/<name>.svg out.svg --palette profiles/<brand-slug>/tokens.json
   ```

## Gate any artifact before it ships
```bash
node tooling/brand-qa.mjs <artifact.html> profiles/<brand-slug> --render
```
Exit 0 = ship. Exit 1 = fix the reported MUST violations first. With `--render`, also open the produced `.qa.png` and run the five-point eye-test in `docs/brand-interview.md` (register background, headline family, accent budget, demo-name leakage, one emphasis per section): the one check a script can't make. For `.md` artifacts brand-qa lints but skips the render; convert to HTML first if you want the visual check.

## Map of the repo
- `system/`: the prose framework (read `system/identity.md` first: the meta-thesis).
- `tooling/`: the executable scripts (see `tooling/README.md`).
- `profiles/`: one folder per brand; `tokens.json` is the source of truth.
- `diagrams/`: 37 token-driven SVG templates (`diagrams/index.md`).
- `skill/brand-init/`: the scaffolding skill.

## Rules
- `tokens.json` is the only place hex lives. Never hand-edit a generated `:root` block or palette table; regenerate.
- Every palette must pass `contrast-check` before use.
- Don't let one profile's brand name leak into another's artifact (the linter checks `lint.foreign-names`).
