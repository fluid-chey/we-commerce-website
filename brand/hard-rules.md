# Fluid Brand Hard Rules (Weight 81-100)

Non-negotiable brand constraints. Every rule here was extracted from the pattern seed files and voice guide. Agents read this first for quick compliance checks.

Source files: `brand/patterns/*.md`, `brand/voice-guide/voice-and-style.md`

---

## Colors

### One Accent Color Per Design (Weight: 95)
Every design uses exactly ONE accent color. Pick from the fixed palette:
- Orange `#FF8B58` -- urgency, pain, warning, CTAs
- Blue `#42b1ff` -- technical, intelligence, trust, links
- Green `#44b574` -- success, solution, proof
- Purple `#c985e5` -- premium, financial, analytical

Never mix multiple accent colors in a single design.

### Neutral Palette (Weight: 90)
Fixed neutral values -- no substitutions:
- `#000000` -- social post backgrounds (pure black)
- `#050505` -- website backgrounds (near-black)
- `#111` / `#161616` -- section fills
- `#ffffff` -- primary text
- `#f5f0e8` -- body text (warm off-white)
- `#888888` -- supporting text

### Social and Website Palettes Never Cross-Pollinate (Weight: 95)
Social uses its palette. Website uses its palette. Never mix them.

---

## Typography

### One Font System (Weight: 95)
FLFont + NeueHaas + Inter across all deliverables. One font system, no exceptions.

### FLFont Bold for Taglines Only (Weight: 95)
`flfontbold` is exclusively for taglines and emphasis across all deliverables. Never use it for body text or headlines.

### NeueHaasDisplay for Headlines (Weight: 90)
`NeueHaas` (Inter variable as proxy, font-weight: 900) is the headline font across all deliverables.

### Inter for Body Copy (Weight: 90)
`Inter` (font-weight: 300-400) is the body copy font across all deliverables.

### Font Fallback Rule (Weight: 90)
The ONLY acceptable generic fallback is `sans-serif`. Never use `cursive`, `Georgia`, `Times New Roman`, `serif`, or `"Inter"` as fallback values. Example: `font-family: 'flfontbold', sans-serif;`

### FLFont Tagline Must Be Visually Prominent (Weight: 85)
Instagram: 36-48px. LinkedIn: 28-32px. If it reads as fine print, it is too small.

### Canvas Fill for Social Posts (Weight: 85)
Content must fill at least 60% of the canvas area. Vast empty black space with tiny centered text is a design failure.

### Minimum Headline Sizes for Social (Weight: 85)
- Instagram: 72px minimum, 88-128px preferred
- LinkedIn: 52px minimum, 62-82px preferred

### Archetype Font Sizes Are Minimums (Weight: 85)
For social posts, the archetype's font sizes are MINIMUMS, not maximums. Scale UP to fill the frame.

### Photo Sizing (Weight: 85)
Photos must fill their container completely (`object-fit: cover`). If an archetype has a photo slot, USE IT -- do not leave it empty.

---

## Decorative Elements

### Brushstrokes Use mix-blend-mode: screen (Weight: 95)
Every brushstroke element MUST use `mix-blend-mode: screen`. No exceptions.

### Every Social Post MUST Have 2+ Brushstrokes (Weight: 95)
At least 2 brushstrokes in the background layer. A post with ZERO brushstrokes is a brand failure. Maximum 3 (manifesto posts only).

### Zero Decorative Elements Is Never Acceptable (Weight: 95)
Every social post requires minimum decorative treatment. A post with zero decorative elements is NEVER acceptable.

### Brushstroke Opacity Range (Weight: 90)
Opacity must be `0.10-0.25`. Subtle at 0.10-0.15, dramatic at 0.20-0.25. No values outside this range.

### Brushstroke Count (Weight: 90)
2 per post standard, 3 max for manifesto posts only.

### Circle/Underline Emphasis Is Functional, Not Decorative (Weight: 90)
Every circle or underline MUST wrap a specific word or data point. Use white PNG masks + backgroundColor. Never use hue-rotate or tinted PNGs.

### Underline Placement Must Match Text (Weight: 90)
Every underline MUST sit directly beneath a specific word or phrase. NEVER place an underline floating in empty space or as a decorative border. The underline's horizontal position must MATCH the text it emphasizes.

### Decorative Anti-Patterns (Weight: 90)
These are brand failures:
- Text on a solid black background with NO textures, brushstrokes, or emphasis marks
- Using only text and a colored accent line with nothing else
- Empty `.background-layer` / `.decorative-zone` div with no children

### Brushstroke Edges Must Bleed Off Canvas (Weight: 85)
Edges must bleed off canvas, never cut mid-frame. Position brushstrokes so they extend past the visible area.

### Minimum One Circle/Underline Emphasis Per Social Post (Weight: 85)
At least one circle (`circle-1` through `circle-6`) or underline (`underline-1` through `underline-3`) emphasis MUST appear on every social post, wrapping a keyword in the headline or a key stat.

### Circle Sketch Opacity (Weight: 85)
Circle sketches use opacity `0.5-0.7`. Not the same range as brushstrokes.

### FLFont Tagline Uses Post Accent Color (Weight: 90)
The FLFont tagline color is always the post's accent color. Sentence case only (NOT uppercase).

---

## Layout

### Layout Archetypes Are Brand-Agnostic Skeletons (Weight: 90)
Archetypes define structural positioning only -- no brand styling, fonts, or decorative elements baked in. Brand styling is applied as a separate layer.

### Instagram Dimensions: 1080x1080 (Weight: 90)
All Instagram posts are 1080x1080px. No exceptions.

### LinkedIn Dimensions: 1200x627 (Weight: 90)
All LinkedIn posts are 1200x627px. No exceptions.

### One-Pager Dimensions: 816x1056 (Weight: 90)
All one-pagers are 816x1056px.

### Archetype Selection Guide (Weight: 85)
- Has a big stat? Use `stat-hero-single` (IG) or `hero-stat-li` (LI)
- Has multiple stats? Use `hero-stat`, `data-dashboard`, or `-li` variants
- Has a photo? Use `photo-bg-overlay`, `split-photo-text`, `hero-stat-split`, `minimal-photo-top`
- Client testimonial? Use `quote-testimonial` (IG) or `quote-testimonial-li` (LI)
- Pure text/statement? Use `minimal-statement` (IG) or `minimal-statement-li` (LI)
- Uncertain? Default to `minimal-statement`

---

## Footer

### Fixed Footer Structure on Every Social Post (Weight: 95)
Three elements, always the same, on every social post:
- **Left:** WeCommerce flag icon + separator bar + WeCommerce wordmark
- **Right:** Fluid dots mark
- Footer is subtle, never competing with content.

### Footer Platform Sizing (Weight: 85)
- Instagram: `padding: 22px 68px`
- LinkedIn: `padding: 18px 72px`

### Footer Asset Sizes (Weight: 95)
- Flag icon: height 18px
- Wordmark: height 18px
- Dots mark: height 22px
- Separator: 1px wide, 14px tall, `rgba(255,255,255,0.15)`

---

## Voice

### Problem Before Solution (Weight: 95)
Always name the problem before naming the solution. Pattern: "Here's what's actually happening -> Here's why -> Here's what we built." Never lead with a feature or solution.

### No Hype Words (Weight: 95)
These words are banned in all Fluid marketing content:
- industry-leading, best-in-class, game-changing, revolutionary, innovative
- seamless, solutions, leverage, robust, empower, utilize, synergy

### Short Sentences, Declarative, No Hedging (Weight: 90)
The voice is confident. No qualifications. Not "we believe we can help you" -- say "we built this to fix that." When in doubt, make the sentence shorter.

### Say "You" and "We" (Weight: 90)
Talk directly to the reader. The company is "you." Fluid is "we." Not "companies" and "platforms."

### Present Tense, Active Voice, Always (Weight: 90)
Never past tense for ongoing truths. Never passive voice. "When a transaction fails" not "Failed transactions have historically been."

### Not Corporate, Not Cautious (Weight: 90)
Willing to name what's broken -- including by name. Bold, specific, verifiable claims stated directly.

### Not Informal Either (Weight: 85)
Human, not casual. No slang, emoji-speak, or try-hard relatability. The voice of someone who has thought deeply about a problem.

### Ground Everything in a Specific Moment (Weight: 85)
Abstract claims die. Specific moments live. Find the person, find the moment, find what changes when the system actually works.

### Social Visual Headlines: 5-8 Words (Weight: 85)
Text on graphics must be readable in a glance. Three formats that work: the reframe, the direct statement of belief, the named contrast.

### The Insider Test (Weight: 85)
Would a direct selling executive who has never heard of Fluid read this and think "that's written for me"? If it could apply to any SaaS company or any industry, rewrite it.

### Words to Use (Weight: 85)
Prefer: people (not "users"), trust, credit, effort, share/sharing, journey (not "funnel"), relationship, the system, fix, confidence.

### Words to Avoid (Weight: 85)
Also avoid: users, merchants (in brand voice), platform (as filler), journey (as buzzword). Use specific alternatives.
