# DESIGN.md — CODED eCPPT Classroom

> Direction: **Blueprint Console** (Impeccable's Pick, played straight). A navy
> operations console for teaching a penetration test — the interface is a
> precise instrument, not a slide theme. It refuses the two category defaults it
> sits between: the generic dark dashboard and the decorative hacker terminal.
> The course's own thesis — *measure, don't guess* — is rendered as the chrome.

Brand colours and typography are extracted **only** from the CODED reference at
<https://coded-reels-playbook.vercel.app/> and are fixed. This document records
the system as built; the authoritative tokens live in
[`src/styles/tokens.css`](src/styles/tokens.css) and [`.impeccable/design.json`](.impeccable/design.json).

## Colour tokens (observed from the CODED reference)

### Ground & console surfaces (navy)
| Token | Value | Use |
|---|---|---|
| `--bg` | `#00081c` | Deepest ground |
| `--bg-deep` | `#00112f` | Navy-deep |
| `--panel` / `--panel-2` | `#0c1c3a` / `#12294f` | Console panels (the reference `--panel`) |
| `--panel-3` / `--navy` / `--navy-3` | `#16294a` / `#14243f` / `#1b3055` | Raised / nested surfaces |
| `--inset` | `#081630` | Recessed wells (evidence, code) |

### Ink
`--ink #ffffff` · `--ink-1 #e6edff` · `--ink-2 #cdd9f5` · `--muted #9fb2d4` · `--muted-2 #6f83a8`

### Blue family (brand / evidence / method / defender)
`--blue #004aa3` · `--blue-bright #2f74d6` · `--blue-soft #6f9ce8` · `--blue-text #9cc0ff` · `--indigo #3e50dd`

### Semantic channels — never used on their own
Every channel is always paired with an icon **and** a text label (see `src/components/icons.tsx`, the `chip`/`callout` components). Colour is never the sole carrier of meaning.

| Channel | Token | Value | Meaning |
|---|---|---|---|
| Evidence | `--evidence` | `#6f9ce8` | Evidence, method, defender |
| Attacker | `--attacker` | `#f84b4b` | Attacker, exploit, finding |
| Validated | `--valid` | `#5ad0a0` | Confirmed / validated |
| Caution | `--caution` | `#e0b45c` | Caution, assumption, note |
| Network | `--cyan` | `#79e2ec` | Network / pivot |
| Identity | `--violet` | `#c8adff` | Identity / Active Directory |

> The reference palette contains red, so red is used as a **semantic accent**
> (attacker / exploit), never as the dominant brand colour, and never alone.

### Lines & the measuring graticule
`--line rgba(255,255,255,.12)` · `--line-soft rgba(255,255,255,.08)` ·
`--grid rgba(143,168,255,.055)` (the ruled blueprint grid — the direction's
measurement surface) · `--card rgba(255,255,255,.045)` · `--card-brd rgba(255,255,255,.10)`.

## Typography
- **IBM Plex Sans** (400/500/600/700) — display and body. Display is large and
  bold with tight negative tracking (`--track-tight -0.022em`, `--track-tighter -0.032em`),
  matching the reference hero.
- **IBM Plex Mono** (400/500/600) — tracked uppercase readouts, coordinates, and
  labels (`--track-label 0.18em`). This is the CODED signature "console voice".
- Loaded from Google Fonts (same source as the reference).

## Signature components & interactions
- **Attack chain** (`src/diagrams/AttackChain.tsx`) — stepped, keyboard-navigable;
  prior stages ghosted, the active stage bright with a leader into the readout.
- **Network topology** (`src/diagrams/Topology.tsx`) — explorable nodes on the
  ruled grid; selecting a host reads its reachability, name resolution, and
  credential requirements.
- **Slide overview** (in `src/routes/Present.tsx`) — a grid of slide cards for
  jumping within a session.
- **Measuring ticks & corner marks** (`.ticked`, 1px tone rules) — the instrument
  language; colour accents on cards are hairline (1px), never chunky side-tabs.

## Elevation, motion, surfaces
- Shadows carry an offset and a soft blur (`--sh-1/2/3`); no zero-offset halos.
- One authored entrance per surface; progress bars animate with `transform`,
  not layout properties. `prefers-reduced-motion` zeroes animation/transition.
- Browser surfaces are themed: selection, caret (`--blue-soft`), scrollbars,
  and focus rings all come from the palette.

## Deliberate, documented exceptions to generic-UI heuristics
These are earned by the direction and the brand mandate, not oversights:
1. **Ruled grid background** — the graticule is the Blueprint Console's
   measurement surface (the exact case the heuristic exempts). Kept very faint.
2. **One hero gradient word** — the CODED reference's own hero sets its emphasis
   word in a white→periwinkle gradient; we mirror that single treatment once on
   the overview hero and nowhere else.

## Accessibility
WCAG-oriented contrast on navy; full keyboard access and visible focus; semantic
landmarks and headings; touch targets ≥34px; diagrams have textual explanations
and are not colour-only; reduced-motion supported; a clean light print path
(`src/styles/print.css`).
