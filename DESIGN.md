---
name: CODED eCPPT Classroom
description: The five-week eCPPT course as one circuit board; a penetration test is a signal routed through it.
colors:
  desk: "#00081c"
  solder-mask: "#00112f"
  component-body: "#14243f"
  component-body-lit: "#1b3055"
  navy-2: "#16294a"
  copper: "#e0b45c"
  copper-unpowered: "#c89a45"
  silkscreen: "#ffffff"
  silkscreen-soft: "rgba(255, 255, 255, 0.72)"
  silkscreen-line: "rgba(255, 255, 255, 0.42)"
  silkscreen-faint: "rgba(255, 255, 255, 0.14)"
  signal: "#79e2ec"
  ink-1: "#e6edff"
  ink-2: "#cdd9f5"
  muted: "#9fb2d4"
  muted-2: "#6f83a8"
  line: "rgba(255, 255, 255, 0.12)"
  line-soft: "rgba(255, 255, 255, 0.07)"
  inner-layer: "#6f9ce8"
  evidence-text: "#9cc0ff"
  attacker: "#f84b4b"
  attacker-soft: "#ff6b6b"
  valid: "#5ad0a0"
  identity: "#c8adff"
  print-blue: "#004aa3"
  print-red: "#c23030"
  print-green: "#37a06a"
  print-mauve: "#a85a66"
  print-indigo: "#3e50dd"
typography:
  display:
    fontFamily: "IBM Plex Sans, Helvetica Neue, Arial, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 5.6vw, 4.6rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "IBM Plex Sans, Helvetica Neue, Arial, system-ui, sans-serif"
    fontSize: "clamp(1.8rem, 3.6vw, 2.8rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  title:
    fontFamily: "IBM Plex Sans, Helvetica Neue, Arial, system-ui, sans-serif"
    fontSize: "clamp(1.35rem, 2.4vw, 1.8rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  section:
    fontFamily: "IBM Plex Sans, Helvetica Neue, Arial, system-ui, sans-serif"
    fontSize: "1.36rem"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  lede:
    fontFamily: "IBM Plex Sans, Helvetica Neue, Arial, system-ui, sans-serif"
    fontSize: "clamp(1.04rem, 1.5vw, 1.18rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "IBM Plex Sans, Helvetica Neue, Arial, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "IBM Plex Sans, Helvetica Neue, Arial, system-ui, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 600
    letterSpacing: "0.005em"
  silkscreen:
    fontFamily: "IBM Plex Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.12em"
  designator:
    fontFamily: "IBM Plex Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "1.15rem"
    fontWeight: 600
    letterSpacing: "0.04em"
  instrument-digits:
    fontFamily: "IBM Plex Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "1.45rem"
    fontWeight: 600
    lineHeight: 1
    fontFeature: "tnum"
  console:
    fontFamily: "IBM Plex Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.84rem"
    fontWeight: 400
    lineHeight: 1.75
rounded:
  pin: "2px"
  pad: "4px"
  part: "6px"
  option: "8px"
  courtyard: "10px"
  panel: "12px"
  overlay: "14px"
  board: "18px"
spacing:
  s-1: "4px"
  s-2: "8px"
  s-3: "12px"
  s-4: "16px"
  s-5: "24px"
  s-6: "32px"
  s-7: "48px"
  s-8: "64px"
  s-9: "96px"
components:
  button-primary:
    backgroundColor: "{colors.copper}"
    textColor: "{colors.solder-mask}"
    typography: "{typography.button}"
    rounded: "{rounded.part}"
    padding: "10px 16px"
  button-primary-hover:
    backgroundColor: "{colors.copper-unpowered}"
    textColor: "{colors.solder-mask}"
  button-silk:
    backgroundColor: "transparent"
    textColor: "{colors.ink-1}"
    typography: "{typography.button}"
    rounded: "{rounded.part}"
    padding: "10px 16px"
  button-silk-hover:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    textColor: "{colors.silkscreen}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.silkscreen-soft}"
    typography: "{typography.silkscreen}"
    rounded: "{rounded.pad}"
    padding: "4px 9px"
  part-ic:
    backgroundColor: "{colors.component-body}"
    textColor: "{colors.ink-1}"
    rounded: "{rounded.part}"
    padding: "12px 14px 12px 16px"
  part-ic-hover:
    backgroundColor: "{colors.component-body-lit}"
  part-header:
    backgroundColor: "{colors.solder-mask}"
    textColor: "{colors.copper}"
    rounded: "{rounded.part}"
    padding: "12px 14px 12px 16px"
  panel:
    backgroundColor: "{colors.solder-mask}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.panel}"
    padding: "18px 20px"
  console:
    backgroundColor: "{colors.desk}"
    textColor: "{colors.ink-2}"
    typography: "{typography.console}"
    rounded: "{rounded.courtyard}"
    padding: "14px 16px"
  board:
    backgroundColor: "{colors.solder-mask}"
    rounded: "{rounded.board}"
    padding: "clamp(18px, 2.4vw, 30px)"
---

# Design System: CODED eCPPT Classroom

## Overview

**Creative North Star: "The Signal Board"**

The course is one circuit board, and a penetration test is a signal routed through it. Every session is a component soldered onto a single bus; pivoting is a via down to an inner layer; validating a claim is probing a test point; a path that has not been proven yet is a thin ratsnest line until it becomes routed copper. The student reads their own progress as how far the signal has travelled. This world replaces the retired Blueprint Console in full: there is no ruled grid background, no corner ticks, no gradient text and no mono eyebrow above headings.

Three inks own the page, all taken from the CODED reference (https://coded-reels-playbook.vercel.app/): navy solder mask, gold copper and white silkscreen. Cyan is the fourth ink and the rarest. On the board, the diagrams and the chrome it means only "live signal": the powered trace, the travelling pulse, the active probe, the focus ring. The board sits on a darker desk (#00081c), so the solder mask reads as a physical object with mounting holes, edge connectors and a silkscreened part number. The world stays recognisable with all content removed: orthogonal traces with 45-degree chamfers, gold pad rows on chip bodies, round vias with a dark drill hole, mounting holes and silkscreen outlines.

Density is a working instrument, not a poster. A compact headline band (one claim, two actions, one probe readout) sits above a board that fills the rest of the first viewport. Study mode reads as a component datasheet. Presenter mode gives the slide the whole screen and shows progress as a trace with one via per slide. The print path swaps to white stock with navy ink. The world refuses the hacker-terminal costume (phosphor green, Matrix rain, fake CLI chrome) and the generic dark dashboard.

**Key Characteristics:**
- Three inks (navy mask, gold copper, white silkscreen); cyan is reserved for the live signal on the board and in the chrome.
- Every connection is drawn in one of three states: proven (solid cyan), probing (dotted cyan) or ratsnest (thin dashed copper, or dashed blue on the inner layer).
- Theory sessions are IC chips with designator `U#`; labs are test headers with designator `J#`.
- Silkscreen type (IBM Plex Mono, uppercase, tracked) carries functional data only and always sits on the same row as what it labels.
- Semantic colour lives inside the teaching content and is always paired with an icon and a word.
- One ambient motion, the signal pulse, turned off under `prefers-reduced-motion`.

## Colors

A navy-gold-white palette with one cyan signal, plus the CODED reference's semantic reds, greens and violets kept inside the teaching content. Every value below is a CODED reference value; the frontmatter is normative.

### Primary
- **Gold Copper** (copper, reference rendered gold): pads, the primary button, the console prompt, inline code, datasheet section numbers, instrument digits, routed segments in the attack-path net, the copper ring of every pad and test point. It is the "this is metal you can act on" ink.
- **Unpowered Copper** (copper-unpowered, reference `--gold`): copper that carries no signal yet. Ratsnest lines, chip pins, unlit vias and pads, the trace joining numbered steps, the primary button's hover state.

### Secondary
- **Live Signal Cyan** (signal, reference cyan): proven bus segments, the probing segment, the travelling pulse's glow, live vias and pads, the probe tip in the readout, the live LED, the focus ring, the current slide via, the active item in the contents rail and the selected search result. Its tints `rgba(121, 226, 236, 0.22)` (halo) and `rgba(121, 226, 236, 0.09)` (selected-row wash) are the only glows in the system.
- **Inner Layer Blue** (inner-layer, reference `--blue-soft`): layer 2. Ratsnest segments into weeks 4 and 5, the "L2" pivot via and its label, the "L2 · inner layer" silkscreen on weeks 4 and 5, inner-layer links in the attack-path net and topology. It is also the Evidence channel colour.

### Tertiary (semantic channels: always icon + word)
- **Attacker Red** (attacker, reference `--red`): fills and borders for the attacker channel: list pads, the wrong-answer border, Kerberos weakness marks. Never the dominant colour, never alone.
- **Attacker Text** (attacker-soft, reference `--no`): the readable red for attacker text on navy: chip text, callout icon and label, console lines, cross marks, Kerberos weakness notes, attacker-toned step numbers.
- **Validated Green** (valid, reference `--ok`): completed parts (pad rings and state word), the "on" LED, correct answers, the response pane label, check marks.
- **Caution Gold** (copper value): the Caution channel. It shares the copper hex, so it is told apart by its warning icon and the word "Caution".
- **Network Cyan** (signal value): inside teaching content only, the Network channel (network icon + "Network"), used for pivot hops, internal hosts, TGS messages and the "investigate next" test point.
- **Identity Violet** (identity, reference violet): Active Directory and identity content, credential facts in the topology readout, domain-membership links.
- **Evidence Text** (evidence-text, reference accent text): evidence-toned console lines.

### Neutral
- **Desk** (desk, reference body background): the surface the board sits on. Page background, mounting-hole and via drill holes, test-point centres, console and HTTP wells, presenter bars, the masthead at 86% opacity.
- **Solder Mask** (solder-mask, reference `--navy-deep`): the board itself and every panel that lies flat on it (probe readout, datasheet tables, callout columns, overlays, the presenter stage). Also the ink colour on gold buttons.
- **Component Body** (component-body, reference `--navy`): raised IC chip bodies and other parts that cast a shadow. The direction contract named a darker, non-reference body navy; the build uses the reference navy instead, and the build is what is recorded here.
- **Lit Component Body** (component-body-lit, reference `--navy-3`): a hovered or probed chip, the selected topology node, the unlit LED.
- **Navy 2** (navy-2, reference `--navy-2`): the scrollbar thumb.
- **Silkscreen White** (silkscreen, reference `--white`): headings, designators, connector outlines; `silkscreen-soft`, `silkscreen-line` and `silkscreen-faint` are its 72%, 42% and 14% strengths for silk text, part outlines and courtyard borders.
- **Ink 1 / Ink 2** (ink-1, ink-2, reference light values): part titles and strong text; body text.
- **Muted / Muted 2** (muted, muted-2, reference `--muted`, `--muted-2`): ledes and secondary copy; dim silkscreen and table heads.
- **Line / Line Soft** (line, line-soft, reference `--line` and its softer strength): panel borders and row dividers.

### Print stock
In print the page becomes white stock with navy ink: ink becomes solder-mask navy, body text component-body navy, muted text navy-3 and navy-2, and all copper and signal become **Print Blue** (print-blue, reference `--blue`). Semantic channels move to print-safe reference values: attacker **Print Red** (reference `--red-deep`), valid **Print Green** (reference `--green`), caution **Print Mauve** (reference `--mauve`), evidence and network Print Blue, identity **Print Indigo** (reference `--indigo`).

### Named Rules
**The Three Inks Rule.** Navy solder mask, gold copper and white silkscreen own every surface. Any other colour on screen is either the live signal or a labelled semantic channel inside teaching content.

**The Live Signal Rule.** On the board, the diagrams' state and the chrome, cyan means only "the signal has reached here" or "you are here": proven trace, probing segment, pulse, active probe, focus, current slide. Never use it as decoration, as a heading colour or as a background fill.

**The Icon-and-Word Rule.** A semantic channel is never carried by colour alone. Callouts pair the channel's icon with its word (Evidence, Attacker, Validated, Caution, Network, Identity); list items, steps and pinout rows pair a coloured pad or ring with text; LEDs always sit next to a state word.

**The Reference-Only Rule.** Every colour comes from the CODED reference palette. Do not invent navies, panel tints or in-between values; if a surface needs a navy, it is one of the reference navies.

## Typography

**Display Font:** IBM Plex Sans (with Helvetica Neue, Arial, system-ui)
**Body Font:** IBM Plex Sans
**Label/Mono Font:** IBM Plex Mono (with ui-monospace, SF Mono, Menlo)

**Character:** A plain, heavy sans for claims and a tracked uppercase mono for silkscreen. The sans states the idea; the mono is printed on the board: designators, net names, part lines, table heads, instrument readouts. Both load from Google Fonts: Sans 400/500/600/700 (and 400 italic), Mono 400/500/600.

### Hierarchy
- **Display** (700, clamp(2.4rem, 5.6vw, 4.6rem), 0.98, -0.035em): one per page. The overview claim, the reference page claim, and hero slides (scaled up to clamp(2.6rem, 6.4vw, 5.2rem)).
- **Headline** (700, clamp(1.8rem, 3.6vw, 2.8rem), 1.02, -0.035em): section heads below the board, the datasheet title, standard slide titles.
- **Title** (700, clamp(1.35rem, 2.4vw, 1.8rem), 1.08, -0.025em): reference-page blocks; the probe readout title is 1.4rem.
- **Section** (700, 1.36rem, 1.08, -0.025em): numbered datasheet sections; 1.22rem under 640px.
- **Lede** (400, clamp(1.04rem, 1.5vw, 1.18rem), 1.55, max 52ch, muted): the sentence under a display or headline.
- **Body** (400, 16px, 1.6, max 68ch in prose): teaching prose. Slide body 1.08rem (1rem under 560px). Print 10.5pt.
- **Button** (600, 0.92rem): sm 0.8rem, lg 1rem.
- **Silkscreen** (Mono 500, 0.75rem, 0.12em, uppercase): designators in running text, net names, part lines, date ranges, table heads, legend, footer edge. Variants by colour only: soft white, dim (muted-2), copper, signal, inner-layer blue.
- **Designator** (Mono 600, 1.15rem, 0.04em): week numbers `WK1` to `WK5`; in the datasheet part graphic, 1.5rem; on a part's top row, 0.75rem.
- **Instrument Digits** (Mono 600, 1.45rem, line-height 1, tabular figures, copper): the board's signal count and the presenter's slide count (1.15rem there), always zero-padded to two digits.
- **Console** (Mono 400, 0.84rem, 1.75): console wells and HTTP panes (0.79rem).

### Named Rules
**The Silkscreen Rule.** Mono uppercase text is functional data printed on the part, never a kicker. Designators and tags sit on the heading row (probe title row, datasheet section row, reference stage heading) or in a slide's silkscreen footer. Never stack a label above a heading.

**The Legibility Floor Rule.** No HTML text below 0.75rem and no SVG text below 12px. Silkscreen gets small by being 0.75rem and tracked, never by going smaller.

**The Plain Claim Rule.** Headlines are plain, bold, tightly tracked sans: no gradient fill, no outline type, no glow, no mono display.

## Layout

The page is a 1360px maximum container with clamp(16px, 3.5vw, 40px) side gutters on a 4px-based spacing scale (4, 8, 12, 16, 24, 32, 48, 64, 96). Prose is capped at 68ch, ledes at 52ch.

**Overview.** A compact top band in a two-column grid (1.35fr and min 300px): the display claim, lede, gold primary button and silk secondary button on the left; the probe readout on the right, bottom-aligned. The board fills the rest of the first viewport. Its inside is a five-column grid of week courtyards with a 46px gap, each holding three parts stacked with 30px between them. Each courtyard has a 24px left padding that serves as the routing gutter for the incoming bus. The edge connectors J1 Start and J2 Objective, the silkscreen board name `CODED-ECPPT-01 · REV 26.11` and the signal counter sit on the board's top and bottom edges. Sections below the board start 64 to 104px apart.

**Routing.** The bus is measured from the real DOM on every resize and font load and routed orthogonally with 12px 45-degree chamfers. Side-by-side parts join through the channel between them. When the bus opens a new week it drops down that week's left gutter and enters the first part's side pin, so it never crosses the week legend. Stacked parts join top to bottom. The same router handles five columns or one.

**Responsive.** At 1180px and below, weeks stack into one column and each week's three parts sit side by side. At 960px the top band, the scorecard tables and the five test points go to one column; the test-point trace turns vertical. At 680px parts stack, the board name and the "Signal" word hide, and mounting holes shrink to 12px. The datasheet drops its contents rail at 960px and goes single-column at 640px. The presenter hides the session title and "up next" line at 760px.

**Datasheet.** A three-part header (part graphic, title block, pin configuration), then a 230px sticky contents rail beside numbered sections with a 48px number gutter, and references, a bench exercise and a pager aligned to that gutter.

**Presenter.** A fixed full-screen grid: top bar, stage, bottom bar. The slide is max 1120px wide, centred, with clamp padding. Bars hide when the presenter is idle in fullscreen.

## Elevation & Depth

Depth is physical: parts sit on the board, the board sits on the desk. Raised components (IC chip bodies, schematic parts, the datasheet part graphic) cast a short downward shadow tinted near-black navy. Flat things on the mask (panels, tables, callouts, test headers) use a 1px line border and no shadow. The board and overlays cast the deep ambient shadow that lifts them off the desk. The only glows are the cyan signal halos and the soft gold glow under the primary button.

### Shadow Vocabulary
- **Part on board** (`box-shadow: 0 6px 14px -6px rgba(0, 8, 28, 0.85), 0 2px 3px rgba(0, 8, 28, 0.5)`): IC chip bodies, the probe readout, the net panel, schematic parts.
- **Part lifted** (`box-shadow: 0 12px 24px -12px rgba(0, 8, 28, 0.95), 0 2px 3px rgba(0, 8, 28, 0.5)`): a hovered or probed chip, together with `translateY(-2px)`.
- **Board on desk** (`box-shadow: 0 30px 70px -28px rgba(0, 8, 28, 0.9)`): the board (plus a 5% white inset top highlight), the search palette, overlays, lone panels.
- **Gold pad glow** (`box-shadow: inset 0 -2px 0 rgba(0, 17, 47, 0.18), 0 6px 18px -10px rgba(224, 180, 92, 0.9)`): the primary button only.
- **Signal halo** (`box-shadow: 0 0 0 2px–5px rgba(121, 226, 236, 0.22)`): live LED, probe tip, live net pad, current slide via.

### Named Rules
**The Parts Sit On The Board Rule.** A shadow means "this component is soldered on top". Chips get it; test headers, panels and tables do not. Shadows always fall downward and are tinted navy-black, never grey and never zero-offset.

**The One Glow Rule.** Only the signal glows. Apart from the gold pad under the primary button, no element gets a coloured halo.

## Shapes

The form language is a printed circuit board. Corners stay small on metal and grow with the size of the object: 2px pins, LEDs and legend keys; 3 to 4px pads, chips and stage tags; 6px buttons and parts; 8px answer options; 10px week courtyards, callouts and consoles; 12px panels and tables; 14px overlays and the search palette; 18px the board. Circles are only for through-hole things: vias (copper ring, dark drill), mounting holes (desk fill, 3px copper ring), test points, ring pads on headers and connectors, and numbered step pads.

Traces are straight and orthogonal with 45-degree chamfers, never curves. Bus traces are 2.5px; ratsnest lines are 1.5px. Silkscreen outlines are 1px. Dividers inside a datasheet or slide footer are dashed silk at 14% (`1px dashed`), the silkscreen's own way to draw a rule.

### Named Rules
**The Chamfer Rule.** Every routed line is orthogonal with 45-degree corner cuts. No bezier curves and no free diagonals.

**The Through-Hole Rule.** A circle on this board is a hole or a pad: it has a copper ring and a dark centre, or it is a solid copper or signal dot. Never use a circle as a generic avatar or decoration.

## Components

### Buttons (copper pads)
- **Shape:** gently squared (6px), 10px 16px padding, Plex Sans 600 at 0.92rem, 16px icon with 9px gap.
- **Primary:** solid gold copper with solder-mask navy text and the gold pad glow. One per decision area ("Resume U5", "Present", "Next").
- **Hover / Focus / Active:** primary hover drops to unpowered copper; every button presses down 1px on active; focus is a 2px cyan outline offset 3px.
- **Silk (default):** transparent with a 42% white silkscreen outline and ink-1 text; hover brightens the outline to white with a 4% white wash. Ghost uses the 12% line. Pressed toggles (`aria-pressed`) turn green.
- **Sizes:** sm 0.8rem / 7px 11px; lg 1rem / 13px 22px; icon-only 9px.

### Chips and LEDs
- **Chip:** Mono 0.75rem uppercase, 0.08em tracking, 4px radius, 1px outline at 14% white; channel variants change only text and outline colour. Theory chips are silk white; lab chips are copper.
- **LED:** a 7px square with 2px corners. Off is lit navy with a faint ring; on is green with a soft green halo; live is cyan with a cyan halo. It always sits next to a state word (Done, Live, Queued).

### Panels (flat on the mask)
- **Corner Style:** 12px.
- **Background:** solder mask on the desk; desk wells for console and HTTP panes.
- **Border:** 1px line; internal dividers line-soft; datasheet and footer edges dashed silk.
- **Internal Padding:** 16 to 20px.

### The Board (signature)
The whole course on one solder-mask board with four mounting holes, a J1 Start connector and a J2 Objective connector, and a silkscreen part number and revision. Five week courtyards hold fifteen parts. **Theory sessions are IC chips** (`U#`): a raised navy body with four copper pins down each side and a pin-1 dot. **Labs are test headers** (`J#`): a flat outline with a row of seven copper ring pads, title in copper. Each part's top row reads designator, LED, state word; its bottom line reads date, day, length (and "Lab") in silkscreen. Completed parts turn their header pad rings green.

**Bus states.** *Proven:* the target session is complete; solid 2.5px cyan over an 8px cyan glow at 12%. *Probing:* the one segment into the current session; 2.5px cyan dotted (1 6, round caps). *Ratsnest:* everything unproven; 1.5px dashed unpowered copper (5 5) at 70%, and in blue at 60% for the inner layer (weeks 4 and 5). Each segment ends in 7px square pads, copper or cyan.

**Vias.** Where the bus crosses into a new week it drops a via: a 6.5px-radius copper disc with a 2.4px desk drill hole, cyan once the signal passes. The WK3 to WK4 crossing is the **pivot via**, blue and labelled "L2" in 12px mono: the course moves from the top layer to the inner layer, as a pivot moves into the internal network.

**Probe.** Hovering or tabbing to a part lifts it 2px, lights a chip body (or turns a header's outline copper), adds a dashed cyan outline offset 4px, and promotes the part face-out into the probe readout: a cyan probe tip, its designator in cyan mono and its title on one heading row, then outcome, a four-pin data list, stage tags and Present / Read datasheet actions. The current session also gets a 1px cyan ring.

**Legend.** The bottom edge carries a silkscreen key for every glyph: U theory chip, J lab header, proven, probing, ratsnest, via, "L2 = inner layer".

### Instrument digits
Counts (signal 01/15, slide 02/15) are zero-padded copper mono with tabular figures. Each digit is keyed by its value, so a change remounts that digit and it rolls in from above (0.42s, ease-out). The roll happens only when the value changes; nothing loops.

### Attack-path net
Six hops as square pads joined by links. Routed hops are copper-filled pads with copper status; the active hop is a cyan pad with a cyan halo; open hops are outlined. Links behind are copper; the live link is cyan; links ahead are a 1px dashed silk ratsnest; links after the pivot run blue. The pivot link carries a labelled copper via. A flat panel under the track reads out the active hop, with channel-coloured `dt` labels that each carry an icon.

### Topology (two-layer board)
The lab network drawn as a two-layer board: a dashed silk top layer "L1 top · DMZ" and a blue-washed inner layer "L2 inner · corp.local", joined through a labelled VIA at WEB01. Hosts are navy part bodies stroked in their channel colour; the selected host's nets turn cyan with labelled net names. SVG labels are 12px mono (13px for host names). A readout panel and a row of host buttons repeat the selection in text.

### Datasheet (study mode)
Each session reads as a component datasheet. Breadcrumb silkscreen: "Datasheet · U# · week · rev 26.11". The header shows a 104px part graphic (chip with copper pins, or header with ring pads, plus its designator), the title with lede, a "Learning outcome" box and actions, and a "Pin configuration" table of five numbered pins (date, length, slides, stage, status). The body is numbered sections (copper mono numbers in a 48px gutter) with the section's silkscreen tag on its title row, "Application note" boxes (dashed silk, copper icon header) for study-only depth, collapsible instructor notes, references, a dashed-copper "Bench exercise" and a previous/next pager.

### Presenter
The slide owns the screen on the solder mask, with bars on the desk. The top bar holds exit, a silk-outlined designator, the session title, instrument digits and icon tools (copy link, placement view, shortcuts, fullscreen). Each slide ends in a **silkscreen footer** above a dashed silk rule: designator and slide number left, slide tag right. **Progress is a via trace:** one 14px via per slide joined by short copper wires. Wires and vias behind turn cyan; the current via is cyan with a white drill ring, a cyan halo and 1.2x scale. The placement view (O) lays every slide out as a footprint with four pads on its top edge.

### Semantic content blocks
Callouts, steps, lists, compare columns, console lines, HTTP notes, pinout figures and the five-question reasoning block all take a tone class that sets one channel colour, its 40–45% border and a 6–7% wash. Callouts lead with the channel icon and its word in mono. Lists hang each item off an 8px copper pad. Steps are numbered 30px pads joined by an unpowered-copper trace. The reasoning block is five test points (TP1 to TP5) on one trace. Knowledge checks mark the picked option cyan, the correct option green with a "Correct" word and the wrong pick red with "Your pick".

### Navigation
A sticky 60px masthead on the desk at 86% with a 12px backdrop blur and a soft bottom line. A silk-outlined "CODED" logotype, then "eCPPT · rev 26.11" silkscreen. Nav links are Plex Sans 500 0.88rem muted; hover adds a 5% white wash; the active link is white with a 2px copper underline inset. The search button is outlined with a `/` key cap. On mobile the subtitle and search label hide. The footer is the board's bottom edge: a three-column grid and a dashed silk edge carrying the board number and source date.

### Motion
**The One Pulse Rule.** The only authored ambient motion is the signal pulse: a 46px white dash that travels the live trace once every max(1.8s, 2.2ms per px) on a linear loop with a pause at the end. It is checked against `prefers-reduced-motion` before it starts and never runs when the user reduces motion. Everything else is a response to a state change: digit roll (0.42s), slide entrance (0.35s, 8px rise), palette and overlay entrance (0.16 to 0.18s), hover lifts and colour transitions (0.15 to 0.2s) on `cubic-bezier(0.22, 0.61, 0.36, 1)`. A global reduced-motion rule cuts all of these to near zero.

## Do's and Don'ts

### Do:
- **Do** build every surface from the three inks: solder mask #00112f on desk #00081c, gold copper #e0b45c / #c89a45, silkscreen #ffffff.
- **Do** spend cyan #79e2ec only where the signal is live or where the user is now (on the board, diagrams and chrome); inside teaching content it is the Network channel, with icon and word.
- **Do** draw every connection in one of the three states (proven solid cyan, probing dotted cyan, ratsnest dashed copper or inner-layer blue) and drop a via at each layer or week crossing.
- **Do** designate theory as `U#` chips and labs as `J#` headers wherever a session is named (board, probe, datasheet, presenter, pager).
- **Do** put silkscreen designators and tags on the heading row or in the slide's silkscreen footer.
- **Do** pair every semantic colour with its icon and its word (Evidence, Attacker, Validated, Caution, Network, Identity).
- **Do** keep HTML text at 0.75rem or larger and SVG text at 12px or larger.
- **Do** keep muted-2 #6f83a8 text on the solder mask or the desk; on raised component bodies use muted #9fb2d4.
- **Do** show counts as zero-padded copper instrument digits that roll only when the value changes.
- **Do** keep the print path as white stock and navy ink, with the print-safe reference values for each channel.

### Don't:
- **Don't** bring back the Blueprint Console: no ruled grid or graticule background, no corner tick marks, no mono eyebrow stacked above a heading.
- **Don't** set any text in a gradient, including a single hero word.
- **Don't** dress the page in the hacker-terminal costume: phosphor green, Matrix rain, scanlines, blinking cursors. Console wells are teaching content showing real commands, not a page style.
- **Don't** introduce colours outside the CODED reference palette; no invented in-between navies.
- **Don't** use cyan as decoration, for headings or as a large fill; don't let red become the dominant colour or carry meaning alone.
- **Don't** route lines with curves or free diagonals; corners are 45-degree chamfers.
- **Don't** add looping or ambient motion beyond the signal pulse, and never run the pulse under `prefers-reduced-motion`.
- **Don't** give flat panels, tables or test headers a drop shadow; only raised parts cast one.
