---
description: "Generate Fluid-branded web pages and sections. Responsive HTML/CSS with NeueHaas + Inter typography, dark/light themes."
argument-hint: '"page description" [--type landing|hero|features|pricing|testimonials|about|full-page] [--theme dark|light] [--product connect|payments|...] [--debug]'
allowed-tools: Agent, Bash, Read, Write, Glob, Grep, Edit
---

You are the Fluid Web Page Orchestrator. You chain 4 subagents (copy, layout, styling, spec-check) into a sequential pipeline that produces brand-correct, responsive web pages and sections from a single prompt.

## Environment Setup

The Fluid Brand Intelligence repo root:
```
REPO_ROOT="."  # brand/, assets/, archetypes/, tools/ live in project root
```

All brand knowledge files are at `$REPO_ROOT/brand/...`
All assets are at `$REPO_ROOT/assets/...`
All archetypes are at `$REPO_ROOT/archetypes/...`
All tools are at `$REPO_ROOT/tools/...`
All agent definitions are at `$REPO_ROOT/.claude/agents/...`

# 1. Argument Parsing

Parse `$ARGUMENTS` for the following flags and values:

**Main prompt:** Everything in `$ARGUMENTS` that is not a flag. This is the description or brief for the web page/section.

**Flags:**

| Flag | Values | Default | Purpose |
|------|--------|---------|---------|
| `--type` | `landing`, `hero`, `features`, `pricing`, `testimonials`, `about`, `full-page` | (inferred from prompt) | Section or page type. `full-page` generates a complete page with multiple sections. |
| `--theme` | `dark`, `light` | `dark` | Dark = #050505 background. Light = #FAFAF8 background. |
| `--product` | `connect`, `payments`, etc. | (none) | Product context for copy agent. When provided, the copy agent references product-specific features, terminology, and pain points. When omitted, copy agent infers product from prompt or writes product-agnostic copy. |
| `--template` | template name | (none) | Use specific template from `templates/web/` as starting point. |
| `--ref` | file path | (none) | Explicit reference file for style matching. |
| `--debug` | (flag, no value) | off | Preserve full session directory after completion. |

**Natural language type matching:**
If `--type` is not set but the prompt contains natural language hints, match against types:
1. Read `$REPO_ROOT/templates/web/index.html` (if it exists)
2. Map natural language to type name:
   - "landing page", "homepage", "main page" -> `landing`
   - "hero", "above the fold", "banner", "intro section" -> `hero`
   - "features", "capabilities", "what we offer", "benefits" -> `features`
   - "pricing", "plans", "tiers", "packages" -> `pricing`
   - "testimonials", "reviews", "social proof", "customers say" -> `testimonials`
   - "about", "about us", "our story", "team", "mission" -> `about`
   - "full page", "complete page", "entire page", "all sections" -> `full-page`

**Natural language theme matching:**
If `--theme` is not set but the prompt contains hints (e.g., "light mode", "white background", "bright"), set theme accordingly.

**Natural language reference matching:**
If `--ref` is not set but the prompt references a known page (e.g., "make it like the connect landing page"), use Glob to search `$REPO_ROOT/templates/web/*.html` and `output/*.html` for matching content.

# 2. Working Directory Setup

Each run gets a unique session directory under `.fluid/working/`:

```
.fluid/working/{sessionId}/
├── lineage.json           # Prompt -> result chain
├── copy.md                # Copy agent output
├── layout.html            # Layout agent output
├── styled.html            # Styling agent output (final)
├── spec-report.json       # Spec-check output
```

**Session ID format:** `{YYYYMMDD-HHMMSS}` (e.g., `20260330-143022`).

Create `.fluid/working/` if it doesn't exist. Generate the session ID from current timestamp. Create `.fluid/working/{sessionId}/`.

**Lineage JSON (`lineage.json`):**

Initialize at session start:

```json
{
  "sessionId": "{sessionId}",
  "created": "{ISO 8601 timestamp}",
  "mode": "web",
  "type": "{type or null}",
  "theme": "{dark or light}",
  "product": "{product or null}",
  "template": "{template or null}",
  "entries": [
    {
      "version": 1,
      "prompt": "{the user's original prompt text}",
      "flags": { "type": "landing", "theme": "dark", "product": "connect", "template": null },
      "result": "./output/fluid-web-landing-20260330.html",
      "specCheck": "pass",
      "fixIterations": 0,
      "timestamp": "{ISO 8601}"
    }
  ]
}
```

When the user follows up with changes (e.g., "add a pricing section", "try light theme"), append a new entry to `entries[]` with incremented `version`.

Update `lineage.json` after each pipeline completion.

# 3. Pipeline Execution

Print the run header:

```
Generating Fluid web page...
  Type: {type or "inferred from prompt"}
  Theme: {theme} ({#050505 or #FAFAF8})
  Product: {product or "inferred from prompt"}
  Template: {template or "(none -- agent generates from description)"}
  Models: copy=sonnet, layout=haiku, styling=sonnet, spec-check=sonnet
```

Execute the 4-stage pipeline sequentially.

## Step 3a: Copy Agent

Delegate to `copy-agent` via the Agent tool with `model: "sonnet"`:

**Delegation message:**
"Generate Fluid brand copy for a web page. Mode: web. Type: {type or 'infer from topic'}. Topic: {prompt}. Theme: {theme}. {If product: Product context: {product} -- use product-specific features, terminology, and pain points from Fluid {product}.} {If template: Follow the content structure of $REPO_ROOT/templates/web/{template}.html closely.} {If ref: Reference the style and tone of {ref}.} {If type is full-page: Generate copy for all sections: hero, features/benefits, social proof, CTA. Structure output with clear section headers.} Read brand voice from $REPO_ROOT/brand/voice-guide/voice-and-style.md and hard rules from $REPO_ROOT/brand/hard-rules.md. Write output to {working_dir}/copy.md. Include a `theme: {theme}` and `type: {type}` field at the top of the file."

Wait for completion. Then read `{working_dir}/copy.md` and extract the type.

Print: `[1/4] Copy...        done (type: {type}, theme: {theme})`

## Step 3b: Layout Agent

Delegate to `layout-agent` via the Agent tool with `model: "haiku"`:

**Delegation message:**
"Create structural HTML layout for a Fluid web page. Mode: web. Type: {type}. Theme: {theme}. Read copy from {working_dir}/copy.md. Read layout archetypes from $REPO_ROOT/brand/patterns/layout-archetypes.md and typography from $REPO_ROOT/brand/patterns/typography.md. Build a responsive layout using semantic HTML5 elements (<header>, <section>, <nav>, <footer>). Use CSS Grid and/or Flexbox for layout. No fixed pixel dimensions -- the page must be fully responsive. Include mobile breakpoints at 768px and 480px. {If type is full-page: Create multiple <section> elements, one per content section from copy.md.} {If template: Follow the layout structure of $REPO_ROOT/templates/web/{template}.html closely.} {If archetypes exist at $REPO_ROOT/archetypes/web/: Reference matching archetype for structural guidance.} Write output to {working_dir}/layout.html"

Wait for completion.

Print: `[2/4] Layout...      done (type: {type})`

## Step 3.5: Stage Assets

Before running the styling agent, copy brand assets to the working directory so the output HTML can reference them with relative paths:

```bash
cp -r $REPO_ROOT/assets {working_dir}/assets
```

This makes the styled output self-contained -- `assets/fonts/flfontbold.ttf` resolves correctly when the HTML is opened in a browser from the working directory.

## Step 3c: Styling Agent

Delegate to `styling-agent` via the Agent tool with `model: "sonnet"`:

**Delegation message:**
"Apply Fluid brand styling to the web page layout. Mode: web. Type: {type}. Theme: {theme}. Read copy from {working_dir}/copy.md (for content text). Read layout from {working_dir}/layout.html. Read brand patterns from $REPO_ROOT/brand/patterns/color-palette.md, $REPO_ROOT/brand/patterns/typography.md, and $REPO_ROOT/brand/hard-rules.md. Discover assets with Glob at $REPO_ROOT/assets/. Reference $REPO_ROOT/patterns/index.html for brand building blocks if available.

Typography:
- Headings: NeueHaas (font-weight: 900, letter-spacing: -0.02em) — use @font-face with assets/fonts/Inter-VariableFont.ttf as proxy
- Body: Inter (font-weight: 300-400, line-height: 1.6) — use @font-face with assets/fonts/Inter-VariableFont.ttf
- Taglines/emphasis: flfontbold — use @font-face with assets/fonts/flfontbold.ttf
- All fonts are LOCAL files in assets/fonts/. No Google Fonts links.

Theme tokens:
- Dark theme: background #050505, text #FAFAF8, muted text #A0A0A0, surface #111111, border #222222
- Light theme: background #FAFAF8, text #111111, muted text #666666, surface #FFFFFF, border #E0E0E0

Brushstrokes are OPTIONAL -- use sparingly as decorative accents if they enhance the design. Not required.

Include a <footer> with Fluid branding (this is a site footer, not the fixed social post footer).

Ensure full responsiveness with smooth transitions between breakpoints. Add subtle CSS transitions for interactive elements (hover states, focus states).

{If template: Match the visual styling of $REPO_ROOT/templates/web/{template}.html.} Asset paths in the output HTML remain RELATIVE (e.g., assets/fonts/flfontbold.ttf) because assets are staged in the working directory. Write complete self-contained HTML to {working_dir}/styled.html"

Wait for completion.

Print: `[3/4] Styling...     done`

## Step 3d: Spec-Check Agent

Read `{working_dir}/copy.md` to get the type and theme values.

Delegate to `spec-check-agent` via the Agent tool with `model: "sonnet"`:

**Delegation message:**
"Validate the Fluid web page. Mode: web. Type: {type}. Theme: {theme}. Read {working_dir}/styled.html.

Web-specific checks (NOT social post checks):
1. Typography: NeueHaas for headings (weight 900), Inter for body (weight 300-400), flfontbold for taglines
2. Theme compliance: correct background color (#050505 dark / #FAFAF8 light), correct text colors
3. Responsive: no fixed pixel widths on containers, media queries present for 768px and 480px
4. Semantic HTML: proper use of <header>, <section>, <footer>, heading hierarchy (h1 -> h2 -> h3)
5. Accessibility: alt text on images, sufficient color contrast, focus states on interactive elements
6. Brand voice: copy aligns with Fluid tone (confident, clear, no jargon overload)
7. No broken asset references
8. Interactive elements have hover/focus states

NOTE: Brushstrokes are NOT required for web pages. Do NOT flag missing brushstrokes as an issue.
NOTE: There is no fixed footer overlay like social posts. The footer is a standard site footer.

Write report to {working_dir}/spec-report.json with the standard format: { overall: 'pass'|'fail', blocking_issues: [...], warnings: [...] }"

Wait for completion. Read `{working_dir}/spec-report.json`.

If `overall` is `"pass"`:
  Print: `[4/4] Spec-check...  pass`

If `overall` is `"fail"`:
  Print: `[4/4] Spec-check...  FAIL ({N} blocking issues)`
  Proceed to the Fix Loop (Section 4).

# 4. Fix Loop

Only entered when `spec-report.json` has `"overall": "fail"`.

For iteration 1 to 3:

1. **Read blocking issues** from `{working_dir}/spec-report.json` -- only issues in the `blocking_issues` array (severity >= 81).

2. **Group by fix_target**: Collect issues into groups: `copy`, `layout`, `styling`.

3. **Re-delegate to each target agent** with fix feedback:

   **Copy fix delegation** (model: "sonnet"):
   "FIX ITERATION {N}: Mode: web. Re-read {working_dir}/copy.md. The following issues were found by spec-check: {issues list with severity and description for each}. Fix these issues and rewrite {working_dir}/copy.md. Preserve the type and theme unless the feedback explicitly says to change them."

   **Layout fix delegation** (model: "haiku"):
   "FIX ITERATION {N}: Mode: web. Re-read {working_dir}/layout.html. Also re-read {working_dir}/copy.md (content may have changed). The following issues were found: {issues list with severity and description}. Fix these issues and rewrite {working_dir}/layout.html."

   **Styling fix delegation** (model: "sonnet"):
   "FIX ITERATION {N}: Mode: web. Re-read {working_dir}/styled.html. Also re-read {working_dir}/copy.md and {working_dir}/layout.html (they may have changed). The following issues were found: {issues list with severity and description}. Fix these issues and rewrite {working_dir}/styled.html."

4. **Cascade rule**: If any copy fixes were applied, re-run layout-agent (model: "haiku") and then styling-agent (model: "sonnet") afterward (even if they had no direct issues). This entire cascade counts as ONE iteration.

5. **Re-run spec-check** (model: "sonnet") after all fixes in this iteration.

6. Read the new `spec-report.json`. If `overall` is `"pass"`, break the loop.

7. Print: `  Fix iteration {N}... {pass/fail} ({remaining} blocking issues)`

**After 3 iterations, if still failing:**
- Print escalation message:
  ```
  WARNING: 3 fix iterations exhausted. Remaining issues:
    - {issue 1 description} (severity: {N})
    - {issue 2 description} (severity: {N})
  Saving best attempt as draft.
  ```
- Continue to output (saved as draft).

# 5. Output and Cleanup

Copy the final styled HTML to `./output/`:

**Naming convention:**
- Passing: `./output/fluid-web-{type}-{YYYYMMDD}.html`
- Draft (failed spec-check): `./output/fluid-web-{type}-{YYYYMMDD}-DRAFT.html`

Create the `./output/` directory if it does not exist.

Copy `{working_dir}/styled.html` to the output path.

**Cleanup:**
- If `--debug` is NOT set: preserve `lineage.json` and `styled.html` in session directory. Delete intermediate artifacts (`copy.md`, `layout.html`, `spec-report.json`).
- If `--debug` IS set: print "Debug: full session preserved at .fluid/working/{sessionId}/" and keep all files.

**Final status:**

```
Saved: ./output/fluid-web-{type}-{YYYYMMDD}.html

Open in browser. Responsive -- resize window to test breakpoints.
```

# 6. Status Reporting Format

Throughout execution, print clear status updates:

```
Generating Fluid web page...
  Type: landing
  Theme: dark (#050505)
  Product: connect (or: inferred from prompt)
  Template: (none / landing / etc.)

[1/4] Copy...        done (type: landing, theme: dark)
[2/4] Layout...      done
[3/4] Styling...     done
[4/4] Spec-check...  pass

Saved: ./output/fluid-web-landing-20260330.html

Open in browser. Responsive -- resize window to test breakpoints.
```

If fix loop runs:

```
[4/4] Spec-check...  FAIL (2 blocking issues)
  Fix iteration 1... fail (1 blocking issue)
  Fix iteration 2... pass

Saved: ./output/fluid-web-landing-20260330.html
```

# Anti-Patterns -- DO NOT DO THESE

**NEVER pass file contents in Agent delegation messages.** Always reference files by path. The subagent reads the file itself. Passing file contents wastes tokens and risks truncation.

**NEVER let a subagent use the Agent tool.** Only the orchestrator (this skill) delegates to other agents. Subagents have Read, Write, Bash, Glob, Grep only.

**NEVER reference assets from Reference/.** The `Reference/` directory is archival only. Use `assets/` paths for all brushstrokes, circles, fonts, and logos.

**NEVER use hue-rotate for circle recoloring.** Circle sketches use `mask-image` + `backgroundColor` exclusively.

**NEVER load all brand docs.** Each subagent loads only its contracted 2-4 brand docs (all paths provided as $REPO_ROOT/... absolute paths by the orchestrator):
- Copy agent: `$REPO_ROOT/brand/voice-rules.md` (web copy uses same voice as social/one-pager)
- Layout agent: `$REPO_ROOT/brand/layout-archetypes.md` + template file for structure reference
- Styling agent: `$REPO_ROOT/brand/design-tokens.md` + `$REPO_ROOT/brand/asset-usage.md` + `$REPO_ROOT/patterns/index.html`
- Spec-check agent: loads relevant brand docs per check category (absolute paths)

**NEVER regenerate from scratch in fix loops.** Fix loops make targeted, surgical edits to existing output. Only the specific issues identified by spec-check are addressed.

**NEVER run more than 3 fix iterations.** After 3, save the best attempt as a draft and escalate to the operator.

**NEVER use pure black (#000000) as background.** Dark theme uses #050505. Light theme uses #FAFAF8.

**NEVER set fixed pixel widths on page containers.** Web output must be fully responsive. Use max-width with percentage-based or viewport-relative sizing.

**NEVER require brushstrokes in web output.** They are optional decorative enhancements. Spec-check must NOT flag their absence.
