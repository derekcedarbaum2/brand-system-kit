# Slide Layouts Catalog

Reusable layout patterns for {{COMPANY}} branded presentations. Each layout includes the HTML structure and CSS class names. All styles are pre-defined in the starter template — just use the class names.

**Build animations:** Add `class="fragment"` to any element to make it build in progressively. Elements without `fragment` appear immediately when the slide loads.

---

## 1. Cover Slide

Opening slide. Centered logo on deep black. Minimal.

```html
<section class="cover">
  <div class="cover-inner">
    <!-- Logo: use inline base64 PNG or <img> tag -->
    <img src="[LOGO_SRC]" alt="{{COMPANY}}" style="width:200px; margin-bottom:20px;">
  </div>
  <div class="foot"><span>{{COMPANY}}</span><span>{{URL}}</span></div>
</section>
```

**When to use:** First slide. Always.

**Customization:**
- Logo only is the default — clean and confident
- For leave-behinds and forwarded decks, add a context line below the logo: `<p style="font-size:0.5em; color:var(--dim); margin-top:12px;">Client Name — Topic — Month Year</p>`. This ensures someone opening the file without context knows what they're looking at.
- Optionally add a tagline below the logo as a `.label`
- The cover uses `--bg` (deepest black), not `--bg2`

---

## 2. Content + Bullets

The workhorse layout. Section label, headline, bullet list.

```html
<section>
  <span class="label">Section Category</span>
  <h2>Headline that frames<br>the content below.</h2>
  <ul>
    <li><strong>Key term</strong> — explanation of the point</li>
    <li><strong>Key term</strong> — another point</li>
    <li>Plain bullet without emphasis</li>
  </ul>
  <div class="foot"><span>{{COMPANY}}</span><span>{{CONTEXT}}</span></div>
</section>
```

**When to use:** Most content slides. Positioning, key points, status updates.

**Rules:**
- Max 5-6 bullets per slide for readability
- Bullets auto-styled with accent dash marker (no list-style)
- Use `<strong>` for terms you want to pop (renders white)
- Always include the `.label` for section context

---

## 3. Content + Pull Quote

Headline with a larger-format body paragraph for narrative slides.

```html
<section>
  <span class="label">Section Category</span>
  <h2>Headline.</h2>
  <p class="pull">Body text at larger size for <strong>narrative-heavy slides</strong> where you need the audience to read, not skim bullets. Strong tags render white for emphasis.</p>
  <div class="foot"><span>{{COMPANY}}</span><span>{{CONTEXT}}</span></div>
</section>
```

**When to use:** Thesis slides, opening arguments, single-point slides where one idea needs room.

---

## 4. Two-Column Cards

Side-by-side content using the `.g2` grid with cards.

```html
<section>
  <span class="label">Section Category</span>
  <h2>Headline comparing<br>two concepts.</h2>
  <div class="g2">
    <div class="card card-a">
      <h3>Left Column Heading</h3>
      <p>Description or explanation text.</p>
    </div>
    <div class="card card-a">
      <h3>Right Column Heading</h3>
      <p>Description or explanation text.</p>
    </div>
  </div>
  <div class="foot"><span>{{COMPANY}}</span><span>{{CONTEXT}}</span></div>
</section>
```

**When to use:** Comparisons, two-sided arguments, "your workflows" vs "the technology", two proof points.

**Variants:**
- `.card-a` — accent left border (default, most common)
- `.card-t` — accent top border (for metrics-heavy cards)
- `.card-glow` — add glow shadow for emphasis
- Cards can contain stat blocks (`.stat-big` + `.stat-label`) and source citations (`.src`)

---

## 5. Two-Column Cards + Insight

Same as above, with an insight callout below for synthesis.

```html
<section>
  <span class="label">Section Category</span>
  <h2>Headline.</h2>
  <div class="g2">
    <div class="card card-a card-glow">
      <h3>Card Title</h3>
      <p>Card content.</p>
      <div style="margin-top:10px; padding-top:8px; border-top:1px solid var(--border);">
        <div class="stat-big" style="font-size:1.8em;">5x</div>
        <div class="stat-label">Metric label</div>
      </div>
      <div class="src">Source attribution</div>
    </div>
    <div class="card card-a card-glow">
      <h3>Card Title</h3>
      <p>Card content.</p>
    </div>
  </div>
  <div class="insight">
    <p>Synthesis statement connecting the two cards. <strong>The key takeaway bolded.</strong></p>
  </div>
  <div class="foot"><span>{{COMPANY}}</span><span>{{CONTEXT}}</span></div>
</section>
```

**When to use:** Proof points, case studies, any paired content that needs a "so what" conclusion.

**Rules:**
- Insight box always goes below the card grid
- Keep insight text to 2-3 sentences max
- Bold the single most important phrase

---

## 6. Three-Column Cards

Triple-column layout using `.g3`.

```html
<section>
  <span class="label">Section Category</span>
  <h2>Headline.</h2>
  <div class="g3">
    <div class="card card-t">
      <h3>Column 1</h3>
      <p>Content.</p>
    </div>
    <div class="card card-t">
      <h3>Column 2</h3>
      <p>Content.</p>
    </div>
    <div class="card card-t">
      <h3>Column 3</h3>
      <p>Content.</p>
    </div>
  </div>
  <div class="foot"><span>{{COMPANY}}</span><span>{{CONTEXT}}</span></div>
</section>
```

**When to use:** Service offerings, three pillars, capability overviews.

---

## 7. Stages (Process Flow)

Horizontal process steps — the "how it works" layout.

```html
<section>
  <span class="label">How It Works</span>
  <h2>Headline describing<br>the process.</h2>
  <div class="stages">
    <div class="stage">
      <div class="stage-num">Weeks 1–4</div>
      <h3>Stage Title</h3>
      <p>What happens in this stage.</p>
      <p class="out">Outcome statement.</p>
    </div>
    <div class="stage">
      <div class="stage-num">Months 2–4</div>
      <h3>Stage Title</h3>
      <p>What happens in this stage.</p>
      <p class="out">Outcome statement.</p>
    </div>
    <div class="stage">
      <div class="stage-num">Months 4–12</div>
      <h3>Stage Title</h3>
      <p>What happens in this stage.</p>
      <p class="out">Outcome statement.</p>
    </div>
  </div>
  <div class="foot"><span>{{COMPANY}}</span><span>{{CONTEXT}}</span></div>
</section>
```

**When to use:** Engagement models, project phases, onboarding flows.

**Rules:**
- 2-4 stages per row
- Each stage has a timeline label (`.stage-num`), title, description, and outcome (`.out`)
- Outcome line has a top border separator for visual weight

---

## 8. Bio Cards (Team)

Two-column bios for team introductions.

```html
<section>
  <span class="label">Who We Are</span>
  <h2>Headline about<br>the team.</h2>
  <div class="g2" style="margin-top:10px;">
    <div class="bio">
      <h3>Person Name</h3>
      <div class="title">Role &middot; Focus Area</div>
      <p>Background and expertise. First paragraph.</p>
      <p style="margin-top:5px;">Second paragraph with <strong style="color:var(--white);">key credential bolded</strong>.</p>
    </div>
    <div class="bio">
      <h3>Person Name</h3>
      <div class="title">Role &middot; Focus Area</div>
      <p>Background and expertise.</p>
    </div>
  </div>
  <div class="insight">
    <p>Synthesis — what the team brings together. <strong>Key differentiator.</strong></p>
  </div>
  <div class="foot"><span>{{COMPANY}}</span><span>{{CONTEXT}}</span></div>
</section>
```

**When to use:** About us slides, team introductions, credibility establishment.

---

## 9. Question Cards (Discussion)

Stacked prompt cards for Q&A or discovery slides.

```html
<section>
  <span class="label">Questions for Discussion</span>
  <h2>What we'd want to understand.</h2>
  <div style="margin-top:8px;">
    <div class="q-card">
      <p>Primary question text?</p>
      <span class="q-sub">Context explaining why this question matters.</span>
    </div>
    <div class="q-card">
      <p>Second question?</p>
      <span class="q-sub">Context.</span>
    </div>
    <div class="q-card">
      <p>Third question?</p>
      <span class="q-sub">Context.</span>
    </div>
  </div>
  <div class="foot"><span>{{COMPANY}}</span><span>{{CONTEXT}}</span></div>
</section>
```

**When to use:** Discovery meetings, leave-behind discussion prompts, stakeholder alignment.

**Rules:**
- 3-5 question cards max
- Each card has a bold question and a dim sub-text explanation
- Cards stack vertically with 8px gap

---

## 10. Before / After

Two-column comparison with distinct visual treatment for each side.

```html
<section>
  <span class="label">The Shift</span>
  <h2>Headline framing<br>the transformation.</h2>
  <div class="ba">
    <div class="ba-col" style="background:var(--card); border:1px solid var(--border); border-radius:10px 0 0 10px;">
      <div class="ba-label" style="color:var(--dim);">Before</div>
      <p>Description of current state.</p>
      <p class="ba-result" style="color:var(--dim);">Result or metric</p>
    </div>
    <div class="ba-col" style="background:rgba(208,216,232,0.04); border:1px solid rgba(208,216,232,0.15); border-radius:0 10px 10px 0;">
      <div class="ba-label" style="color:var(--accent);">After</div>
      <p>Description of future state.</p>
      <p class="ba-result" style="color:var(--accent);">Result or metric</p>
    </div>
  </div>
  <div class="foot"><span>{{COMPANY}}</span><span>{{CONTEXT}}</span></div>
</section>
```

**When to use:** Value propositions, workflow improvements, ROI arguments.

---

## 11. CTA (Call to Action)

Centered closing slide with a clear next step.

```html
<section class="cta">
  <span class="label" style="text-align:center;">Next Step</span>
  <h2>Bold statement about<br>what to do next.</h2>
  <p style="font-size:0.68em;">Supporting paragraph — one to two sentences explaining the offer.</p>
  <p style="font-family:'JetBrains Mono',monospace; font-size:0.45em; color:var(--dim); margin-top:18px;">Fine print or additional context in monospace.</p>
  <p style="font-size:0.65em; color:var(--white); font-weight:600; margin-top:20px;">{{CONTACT}}</p>
  <div class="foot"><span>{{COMPANY}}</span><span>{{URL}}</span></div>
</section>
```

**When to use:** Final slide. Always end with a clear action.

---

## 12. Data Table

Structured tabular data with branded styling.

```html
<section>
  <span class="label">Section Category</span>
  <h2>Headline.</h2>
  <div class="table-wrap">
    <table>
      <tr><th>Column 1</th><th>Column 2</th><th>Column 3</th></tr>
      <tr><td>Row Label</td><td>Data cell</td><td>Data cell</td></tr>
      <tr><td>Row Label</td><td>Data cell</td><td>Data cell</td></tr>
    </table>
  </div>
  <div class="foot"><span>{{COMPANY}}</span><span>{{CONTEXT}}</span></div>
</section>
```

**When to use:** Feature matrices, comparison tables, program alignment, pricing breakdowns.

**Rules:**
- Wrap in `.table-wrap` for rounded container
- Headers auto-styled (JetBrains Mono, accent, uppercase)
- First column auto-bolds
- Max 5-6 rows

---

## 13. Timeline / Roadmap

Horizontal milestone progression.

```html
<section>
  <span class="label">Roadmap</span>
  <h2>Headline.</h2>
  <div class="timeline">
    <div class="tl-item active">
      <div class="tl-date">Month Year</div>
      <div class="tl-label">Milestone Name</div>
      <p class="tl-desc">Brief description.</p>
    </div>
    <div class="tl-item">
      <div class="tl-date">Month Year</div>
      <div class="tl-label">Milestone Name</div>
      <p class="tl-desc">Brief description.</p>
    </div>
    <div class="tl-item">
      <div class="tl-date">Month Year</div>
      <div class="tl-label">Milestone Name</div>
      <p class="tl-desc">Brief description.</p>
    </div>
  </div>
  <div class="foot"><span>{{COMPANY}}</span><span>{{CONTEXT}}</span></div>
</section>
```

**When to use:** Engagement timelines, implementation roadmaps, project milestones.

**Rules:**
- Add `.active` to current/completed milestones
- 3-5 items max
- Connector line runs across the top

---

## 14. Metric Dashboard

Grid of stat blocks for ROI/impact slides.

```html
<section>
  <span class="label">Impact</span>
  <h2>Headline about results.</h2>
  <div class="g2" style="margin-top:16px;">
    <div class="card card-t">
      <div class="stat-big">60%</div>
      <div class="stat-label">Cost reduction</div>
      <p style="font-size:0.44em; color:var(--muted); margin-top:6px;">From $X to $Y per quarter</p>
    </div>
    <div class="card card-t">
      <div class="stat-big">3 weeks</div>
      <div class="stat-label">Time to deploy</div>
      <p style="font-size:0.44em; color:var(--muted); margin-top:6px;">From audit to production</p>
    </div>
  </div>
  <div class="insight">
    <p>Synthesis connecting the metrics to business value. <strong>The punchline.</strong></p>
  </div>
  <div class="foot"><span>{{COMPANY}}</span><span>{{CONTEXT}}</span></div>
</section>
```

**When to use:** ROI slides, impact summaries, KPI overviews. This is the money slide — the one that gets the deal.

**Rules:**
- 2-4 metrics
- Each card has `.stat-big` + `.stat-label` + optional context line
- Always pair with insight box for the "so what"

---

## 15. Testimonial / Social Proof

Client quote or third-party validation.

```html
<section>
  <span class="label">What They Said</span>
  <h2>Headline.</h2>
  <div class="card card-a card-glow" style="margin-top:14px;">
    <p class="pull" style="font-size:0.78em; font-style:italic;">&ldquo;Quote from client or third-party source that validates the point you're making. Should be specific and concrete, not generic praise.&rdquo;</p>
    <div style="margin-top:10px; padding-top:8px; border-top:1px solid var(--border); display:flex; justify-content:space-between; align-items:baseline;">
      <div>
        <div style="font-size:0.55em; font-weight:600; color:var(--white);">Person Name</div>
        <div class="stat-label">Title, Company</div>
      </div>
      <div class="src">Publication or context</div>
    </div>
  </div>
  <div class="foot"><span>{{COMPANY}}</span><span>{{CONTEXT}}</span></div>
</section>
```

**When to use:** After making a claim, when you have third-party validation.

**Rules:**
- One quote per slide for impact
- Always attribute with name + title + source
- The quote should be specific and concrete — never generic praise

---

## Combining Layouts

Layouts can be combined on a single slide. Common combinations:

- **Cards + Insight** — Paired content with a synthesis takeaway (the most common pattern)
- **Pull Quote + Cards** — Thesis statement above, evidence cards below
- **Stages + Insight** — Process flow with a concluding statement
- **Label + Heading + Content** — Always use `.label` above `h2` for section category context
- **Stats inside Cards** — Embed `.stat-big` + `.stat-label` inside any card variant

### What NOT to do

- **Never put two card grids on one slide.** One `.g2` or `.g3` per slide. If you need more cards, make another slide.
- **Never use more than one insight box per slide.** One "so what" per slide. If you have two takeaways, you have two slides.
- **Stat blocks should always be inside cards, never floating.** Naked `.stat-big` elements without a card container look broken.
- **Pull quotes and bullet lists don't mix on the same slide.** A pull quote is for narrative emphasis. Bullets are for structured points. Pick one.
- **If a slide has more than 3 components (label + h2 + content = 3), split it.** A slide with label + h2 + cards + insight = 4 components is the absolute max. Anything beyond that is overcrowded.

---

## Content Writing Guidelines

- **Headlines are assertions, not descriptions.** Write "Your team spends 40% of its time on manual assembly" not "Time Analysis." The headline should be the slide's argument. If your headline could be a tab label in a spreadsheet, rewrite it.
- **Every slide answers "so what?"** If you can't articulate why this slide moves the audience closer to a decision, cut it.
- **Use concrete numbers from the prospect's world.** "You process 12,000 invoices/month" hits harder than "significant volume." Abstract percentages without context are meaningless.
- **When describing AI: say what the system does, not what it is.** Never write "leverage AI" or "AI-powered solution." Write "reads incoming invoices, extracts line items, and flags mismatches against the PO." Plain English, specific actions.
- **Write for a smart person who doesn't know AI but knows their business cold.** They'll catch bullshit jargon instantly. They won't be impressed by "machine learning" — they'll be impressed by "cuts review time from 3 days to 4 hours."
- **Headlines:** Mixed case (NOT uppercase), conversational, often use line breaks (`<br>`) for pacing
- **Bullets:** Lead with bold key terms, use em-dashes for structure
- **Pull quotes:** Narrative tone, bold the single key phrase
- **Insight boxes:** Always a synthesis — connect the content above to a "so what"
- **No filler.** Every sentence earns its place.
- **Use `&mdash;`, `&rsquo;`, `&ldquo;`/`&rdquo;`** for proper typography

### What This System Should NEVER Produce

These are the failure modes that make AI consultancy decks look like everyone else's. If you catch yourself generating any of these, rewrite.

- **"Leverage AI to transform your business"** — or any variation. This is the phrase that makes executives stop reading. Say what the system does instead.
- **Blue gradient hero slides** — We are not a SaaS company. No gradients, no hero images, no "the future of AI" imagery.
- **Bullet slides with no hierarchy** — A slide with 8 bullets of equal weight is a document, not a presentation. Use cards, stat blocks, or pull quotes instead.
- **Generic process diagrams** — "Discovery → Design → Build → Deploy" is every consultancy's slide. Our stages have specific timelines, specific outputs, and an outcome line that says what the client gets.
- **Slides that require narration to make sense** — If you remove the presenter, the slide should still communicate its point. The leave-behind test: would this make sense at 11pm when the VP opens it on their laptop?
- **Jargon headers** — "AI-Powered Workflow Optimization" is a header that says nothing. "Your invoices get processed in 4 hours instead of 3 days" is a header that closes deals.
- **Slides without a "so what"** — If the slide presents information without an insight box, pull quote, or assertive headline that tells the audience what it means, the slide is incomplete.

---

## AI Consultancy Slide Playbook

Recommended slide sequences for common presentation scenarios. These are starting points — adapt based on the audience and what you know going in.

### First Meeting / Discovery

The goal is to establish credibility, frame the problem, and open a conversation. Don't sell — diagnose.

1. **Cover**
2. **Pull Quote** (thesis — the one sentence that frames why you're here)
3. **Before/After** (the problem in their world, not abstract)
4. **Stages** (how we work — show process, not magic)
5. **Question Cards** (turn it into a conversation)
6. **CTA** (specific next step — not "let's stay in touch")

### Leave-Behind / Follow-Up

The deck that gets forwarded to the person who wasn't in the room. Needs to stand on its own without you narrating.

1. **Cover**
2. **Pull Quote** (thesis — remind them what this is about)
3. **Cards + Insight** (proof points with the "so what" spelled out)
4. **Stages** (process — what working together actually looks like)
5. **Metric Dashboard** (results — what they can expect)
6. **Bio Cards** (who they'd be working with)
7. **CTA** (clear next step with contact info)

### ROI / Business Case

The deck that gets the budget approved. Every slide should make the financial case tighter.

1. **Cover**
2. **Before/After** (current state pain, quantified)
3. **Metric Dashboard** (the headline numbers)
4. **Data Table** (detailed breakdown — where the savings come from)
5. **Timeline** (implementation plan — when they see results)
6. **Testimonial** (someone else who did this and won)
7. **CTA** (the ask)

### Technical Deep-Dive

For the technical stakeholders who need to understand architecture and implementation, not just outcomes.

1. **Cover**
2. **Bullets** (architecture overview — what the system does)
3. **Three-Column Cards** (components — how the pieces fit together)
4. **Data Table** (comparison — why this approach vs. alternatives)
5. **Stages** (implementation — how it gets built and deployed)
6. **CTA** (next step — usually a technical workshop or proof of concept)

---

## Build Animation Tips

- Add `class="fragment"` to each major content block for progressive reveal
- Cards in a `.g2` or `.g3` work well as individual fragments
- Insight boxes work well as the final fragment on a slide
- The `.label` and `h2` should NOT be fragments — they anchor the slide
- Fragments advance on click/arrow, same as slide transitions
