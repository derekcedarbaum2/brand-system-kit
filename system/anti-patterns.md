# Anti-Patterns

Specific brand mistakes with descriptions and fixes. If you're about to do one of these, stop.

---

## Voice anti-patterns

### 1. "Empower your business with our next-generation platform"

**What's wrong:** Every vendor opens with a line like this. It communicates nothing except "we don't have a specific thing to say."

**Fix:** Say what the product does. "Imports your spreadsheets and flags the rows that don't reconcile."

### 2. Starting with "We"

**What's wrong:** "We build tools for..." leads with you, not the reader's problem.

**Fix:** Reverse the order. "Your team spends 40% of its time on manual data entry. This does it for them."

### 3. Vague adjectives instead of numbers

**What's wrong:** "Significant cost reduction," "fast implementation," "robust solution." These are filler.

**Fix:** Concrete numbers or honest admission. "Cuts review time from 3 days to 4 hours." Or: "We'll measure this in week 1 and baseline against it."

### 4. Superlatives

**What's wrong:** "World-class team," "industry-leading," "best-in-class." If they were true, you wouldn't have to say them.

**Fix:** State what you've done. "We cut our own build from 25 minutes to 8 before recommending it to anyone."

### 5. Banned words

**What's wrong:** Using words from the banned list (leverage, synergy, holistic, seamless, etc.).

**Fix:** See `voice-and-tone.md` banned words list. Rewrite the sentence with concrete language.

### 6. "In this document I will argue..."

**What's wrong:** Meta-commentary about what the document does. The document should just do it.

**Fix:** Start with the first argument, not the description of arguments.

### 7. Throat-clearing opens

**What's wrong:** "It is important to note that...", "The fact of the matter is...", "As we all know..."

**Fix:** Start with the claim. Delete the setup.

---

## Writing that sounds like AI

Generated text has tells. They show up in brand copy, READMEs, and decks, and they read as machine-written. Each one comes from reaching for rhythm, contrast, or grandeur instead of saying the specific thing. Concrete fixes:

| ❌ Sounds like AI | ✅ Plain |
|---|---|
| "It's not a brand guide. It's a system." (the "not X — it's Y" antithesis) | "It's a system for keeping a brand consistent." |
| "This isn't just a linter — it's a philosophy." | "This is a linter." |
| "Does it scale? Absolutely." (rhetorical question, then answer) | "It handles up to 10,000 records." |
| "Fast. Simple. Done." (three fragments for rhythm) | "It's fast, and there's nothing to configure." |
| "At its core, the tool simply works." (filler: at its core / simply / fundamentally / essentially) | "The tool imports your data and validates it." |
| "We don't just build software — we craft experiences." | "We build software." |
| "Unlock the full potential of your team." | "Your team stops re-keying data by hand." |
| An em-dash for drama in every other sentence | One claim, ended with a period. |

**The test:** if a sentence feels punchy but you can't point to a concrete claim inside it, rewrite it until you can.

---

## Design anti-patterns

### 8. Blue gradients

**What's wrong:** Every SaaS and vendor uses the same blue-to-purple gradient. It screams generic.

**Fix:** Flat `--bg` (near-black). Zero gradients. Ever.

### 9. Hero images with text overlays

**What's wrong:** Stock photo of diverse professionals at a whiteboard, with headline text overlaid. Vendor-grade generic.

**Fix:** No hero image. Headline on near-black background, mono label above, supporting pull quote below.

### 10. Rainbow color sequences in charts

**What's wrong:** 7 series in 7 different colors. Impossible to read, screams "I had data, now you deal with it."

**Fix:** Max 4 series. Use brightness / weight for hierarchy, not hue. See `data-viz.md`.

### 11. Decorative icons

**What's wrong:** Lightbulb for "ideas," gears for "process," rockets for "growth." Icons that don't communicate information, they just decorate.

**Fix:** Delete the icon. If the sentence needs an icon to be understood, the sentence is weak.

### 12. Bullet slides with 8 equal-weight points

**What's wrong:** A bullet slide with no hierarchy is a document, not a presentation.

**Fix:** Use cards, stat blocks, pull quotes, or a table. If you truly have 8 points, split into two slides or use a `.g2 + .g3` card grid.

### 13. Jargon headers

**What's wrong:** "Next-Generation Workflow Optimization" is a header that says nothing.

**Fix:** Headers are assertions. "Reports that took a day now take ten minutes."

### 14. Gradient text

**What's wrong:** CSS background-clip text gradients on headlines. Screams 2021 SaaS hero.

**Fix:** Flat white (screen) or flat charcoal (print) on all headline text.

### 15. Drop shadows

**What's wrong:** Soft shadows under cards, text, or images. Adds fake depth.

**Fix:** `border: 1px solid var(--border)` is the only depth cue. Avoid box-shadows (the linter flags them on content components).

### 16. 3D transforms

**What's wrong:** Hover tilts, rotating cards, perspective transforms. Feels like a design-agency portfolio site.

**Fix:** Hover should change color or opacity only. No transforms.

### 17. Laptop / phone mockup frames

**What's wrong:** Screenshots wrapped in rendered laptop bezels. Signals "we couldn't just show the software."

**Fix:** Show the screenshot with a 1px border. Done.

### 18. Slide numbers > 30

**What's wrong:** A deck with 50 slides isn't a deck, it's a document. Every vendor makes this mistake.

**Fix:** Cap a presentation around 15 slides; if you have more, it belongs in a document or PDF.

### 19. Logo on every slide

**What's wrong:** The logo appears as a watermark or repeated brand mark on every slide. Over-signed, under-confident.

**Fix:** Logo on the cover only. The footer's "{{COMPANY}}" mono text carries attribution throughout.

---

## Layout anti-patterns

### 20. Cards wrapping body prose in a PRD

**What's wrong:** A paragraph of analysis wrapped in a `.card` container. Document mode specifically bans this.

**Fix:** Delete the container. The paragraph is the argument. A border doesn't make a paragraph important; the argument does.

### 21. Narrow reading column in a PRD

**What's wrong:** `max-width: 7in` or centered body text in document mode. Looks like a blog post.

**Fix:** Full-page-width prose. Margins only.

### 22. Two card grids on one slide

**What's wrong:** A `.g2` followed by a `.g3` on the same slide. Overcrowded.

**Fix:** Split into two slides. One grid per slide.

### 23. Floating stat blocks

**What's wrong:** `.stat-big` without a card container. Looks broken.

**Fix:** Wrap the stat in a card. Always.

### 24. Mixing modes in one file

**What's wrong:** Screen-mode tokens and document-mode rules in the same HTML file.

**Fix:** Pick one mode per artifact. See `medium-guide.md`.

---

## Motion anti-patterns

### 25. Every element is a fragment

**What's wrong:** Building in every element one by one. The slide takes 12 clicks to read.

**Fix:** One or two fragments per slide max. The label and h2 are never fragments.

### 26. Slide transitions other than `fade`

**What's wrong:** `slide`, `concave`, `cube`, `zoom` — any reveal.js default beyond fade. Dates the deck.

**Fix:** `transition: 'fade'`, `transitionSpeed: 'fast'`. That's it.

### 27. Typewriter headline animations

**What's wrong:** Headline that types itself out character by character on slide load. Hero-landing-page cliché.

**Fix:** Just render the text.

---

## Structural anti-patterns

### 28. "Overview / Background / Details / Appendix"

**What's wrong:** Generic document structure that signals the writer didn't have a specific argument.

**Fix:** Structure mirrors how the decision gets made: problem → evidence → hypothesis → what ships → what this costs → what could kill it → what comes next.

### 29. Executive summary that just lists what's in the doc

**What's wrong:** "This document covers X, Y, and Z." That's a table of contents, not a summary.

**Fix:** Executive summary states the conclusion. Lead with the decision you're asking them to make.

### 30. Sources listed in a "Sources" section at the end

**What's wrong:** Pulling citations into a bulk section. Makes it look like a school paper.

**Fix:** Inline citations in mono, small, under each claim. Reader can check as they go.

---

## How to use this file

When you catch yourself about to do any of these, stop. Apply the fix. If the fix feels worse than the anti-pattern, something else in the brief is wrong — ask.

When a new anti-pattern emerges in practice, add it here. This file grows.
