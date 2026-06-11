# templates/

Ready-to-fill HTML for the business documents teams ship most. They're the fastest path from a style profile to a finished, on-style deliverable.

## How to use one

1. **Copy** the template you want.
2. **Point it at your style.** Change the one `<link rel="stylesheet" ...>` line to your profile's `brand.css` (the templates ship pointed at the `northwind` demo so they render immediately).
3. **Fill the placeholders.** Replace every `{{...}}` with your content.
4. **Gate it (lint + contrast + PNG preview), then print the final PDF with headless Chrome:**
   ```
   node tooling/brand-qa.mjs templates/<name>.html profiles/<your-profile> --render

   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
     --headless --no-pdf-header-footer \
     --print-to-pdf="out.pdf" templates/<name>.html
   ```
   (`tooling/render.mjs` produces PNG previews, not PDFs. Use Chrome's `--print-to-pdf` for the final document.)

The templates use only the component classes defined in every profile's `brand.css` (`doc-header`, `stat-row`, `callout`, `table`, `table.decision`, `pull`, `attribution`, `doc-footer`, and the rest), so they re-skin with the profile, the same way the diagrams do.

## What's here

| File | Document | Mode it shows off |
|---|---|---|
| `prd.html` | Product requirements | Long-form doc: sections, requirement and milestone tables, a stat row |
| `strategy-brief.html` | A position and its reasoning | Long-form doc: options table, pull quote, the ask |
| `program-schedule.html` | Phases, milestones, timeline | Table-heavy, with a pointer to the roadmap diagrams |
| `status-report.html` | Period status | Bottom-line callout, health table, metric stat row, risk table |
| `one-pager.html` | Single-page overview or capability statement | Compact: stat row, capability table, next-step callout |
| `decision-memo.html` | A recommendation and the options | Recommendation-first, options table, rationale |

## Building more

These cover the common cases. Others follow the same pattern: copy the closest template, keep `doc-header` / `doc-body` / `doc-footer`, and reuse the component classes. Good next ones to add for your work: CONOPS, trade study or analysis of alternatives, test plan, risk register, RFI/RFP response section.
