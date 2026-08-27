# Visual Rebrand: Developer/Terminal Aesthetic

## Context

The site's glassmorphism styling (see prior token cleanup in this same
session) still read as generic/"AI-generated": indigo overused as a
decorative accent, a repeated glowing-dot section marker with no real
information value, and no single memorable visual signature. The user
wants a full visual rebrand — not just another polish pass — built
around a developer/terminal identity, applied site-wide (portfolio,
about, blog, editor, auth), with incremental review as it lands.

## Decisions

- **Direction:** developer/terminal aesthetic — monospace accents,
  code/terminal motifs, dark-first, restrained accent saturation.
- **Accent color:** replace indigo with a new `accent` token, IDE
  syntax-blue family (`#0EA5E9`-ish), same shade numbers as the
  current indigo usage (50/100/400/500/600/900 + opacity variants)
  so it's a mechanical rename, not a redesign of every shade.
- **Section marker:** replace the glowing bullet dot
  (`COMMON_STYLES.dot` + `sectionHeader`) with a monospace code-index
  marker — `01 // PROJECTS` — via a new shared `SectionMarker`
  component. Applies to static, ordered sections (home, about). Not
  forced onto dynamic list headers (e.g. blog post list) where a
  sequence number would be meaningless.
- **Signature moment:** a shared `WindowFrame` component — macOS-style
  traffic-light dots + a fake filename tab (e.g. `projects.ts`) — used
  to wrap the Projects card and the project detail Modal, giving the
  site one strong, on-theme visual identity instead of scattered
  decoration.
- **Priority projects:** the three CLAUDE.md-designated projects (IBK
  Continuous Monitoring, IBK ESG HUB, IBK Business Support System
  Reconstruction) get a left accent bar + "FEATURED" tag inside the
  WindowFrame list, addressing the earlier IA gap (all projects
  currently read as equal weight).
- **Scope:** site-wide. Color token rename covers all ~30 files with
  hardcoded `indigo-*` classes. Structural changes (WindowFrame,
  SectionMarker, featured tier, Hero terminal-cursor detail, Skills
  dependency-list styling) are scoped to portfolio/about only; blog,
  editor, and auth pages get the token-level rebrand (color + section
  marker where applicable) without structural rework.

## Migration Strategy (ordered, checkpoint after each)

1. **Color token.** Add `accent` scale to `tailwind.config.js`.
   Mechanically rename `indigo-` → `accent-` across `src/**/*.{ts,tsx}`
   with an exact-token regex (`\bindigo-(\d+)\b`, preserving any
   `/NN` opacity suffix) so red/emerald/other status colors are
   untouched. Diff-review the rename before moving on.
2. **SectionMarker component.** New shared component replacing
   `COMMON_STYLES.dot` + `sectionHeader` everywhere it's used (7
   files). Screenshot check.
3. **WindowFrame component + Projects tier.** New shared component;
   apply to Projects card and Modal; add featured-project treatment.
   Screenshot check.
4. **Portfolio detail touches.** Hero terminal-cursor detail, Skills
   dependency-list tag styling. Screenshot check.
5. **Site-wide sweep.** Spot-check blog, editor, login pages render
   correctly with the new accent token and, where they use
   `sectionHeader`/`dot`, the new marker. Screenshot check.

## Out of scope

- Restructuring blog/editor/auth layouts or components beyond
  color/marker token updates.
- Changing base neutrals (page background, gray scale) — only the
  accent color changes.
- Content/copy changes.

## Testing

Dev server + Playwright screenshots (light and dark) at each
checkpoint above: home, about, a project modal, blog list, and one
editor/login page. No automated test suite exists for visual
regressions in this repo, so screenshots are the verification method.
