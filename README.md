# CODED · eCPPT Classroom

An interactive teaching website for CODED's five-week **eCPPT** (Certified
Professional Penetration Tester) course. It presents all fifteen sessions as
polished slide decks for classroom projection, a readable study companion for
independent revision, and two interactive explorers (the attack chain and the
network topology).

- **Live site:** https://The-Ghre.github.io/ecppt-classroom/
- **Course dates:** 15 November – 16 December 2026 · 15 sessions · 30 theory + 20 practical hours
- **Built with:** React + TypeScript + Vite. Content is a typed data model,
  kept separate from the presentation components.

> All targets, hosts, credentials, and data in the course are **synthetic** and
> used only in instructor-controlled lab scenarios. No instructor solutions,
> real credentials, or full capstone walkthroughs are shipped in this bundle.

## Three student modes
- **Roadmap** (`/`) — the five-week course map with dates, outcomes, the attack
  chain, and the exam-domain vs course-grading scorecards (kept distinct).
- **Presentation** (`/present/:id/:slide`) — a full-screen slide player:
  keyboard + visible navigation, fullscreen, a slide-overview grid, per-slide
  shareable links, a shortcuts panel, and reliable back/forward/refresh.
- **Study** (`/session/:id`) — a continuous, readable version of each session
  with expanded explanations, sources, and revision questions; prints cleanly to PDF.

Plus: course-wide search (press `/` or `⌘/Ctrl-K`), local progress & resume
(no accounts), and the **Attack chain** reference (`/reference`).

## Keyboard shortcuts (presentation)
`→` / `Space` next · `←` previous · `Home` / `End` first / last ·
`O` slide overview · `F` fullscreen · `?` help · `Esc` close / exit fullscreen.
Shortcuts never fire while you are typing in a field or operating a control.

## Develop

```bash
npm install
npm run dev        # http://localhost:5319
```

Other scripts:

```bash
npm run build      # type-check + production build to dist/
npm run preview    # preview the production build
npm run typecheck  # type-check only
```

Node 18+ is required.

## Edit the course content

All teaching content lives in [`src/content/`](src/content/), separate from the
UI. You do not need to touch any component to edit, add, or reorder sessions.

- **Course structure** — `src/content/course.ts`: weeks, exam domains, grading
  weights, the attack-chain stages, and headline facts.
- **A session** — `src/content/sessions/sN.ts`: one file per session. Each is a
  typed `Session` with an ordered array of `slides`.
- **The content model** — `src/content/types.ts`: the `Session`, `Slide`, and
  `Block` types. Every slide is a list of blocks (prose, lists, steps, callouts,
  comparisons, terminals, annotated HTTP, tables, diagrams, knowledge checks,
  the five-question "reasoning" block, figures, progressive hints, and more).

### Add or change a slide
Edit the relevant `sN.ts` and add a slide object to its `slides` array:

```ts
{
  id: 's4-newidea',            // unique within the session
  kind: 'concept',             // layout hint (title | concept | demo | check | …)
  tag: 'CONCEPT · 09',         // the mono kicker shown on the slide
  title: 'Your slide title',
  lead: 'One framing sentence.',
  blocks: [
    { type: 'prose', md: 'Supports **bold**, `code`, *italics*, and [links](https://example.com).' },
    { type: 'callout', tone: 'evidence', title: 'Note', md: 'An evidence-toned callout.' },
    { type: 'check', q: 'A question?', options: [{ text: 'A' }, { text: 'B', correct: true }], answer: 'Why B is right.' },
  ],
  study: [ /* extra blocks shown only in Study mode */ ],
  notes: 'Student-safe instructor notes.',
}
```

Presentation mode shows `blocks`; Study mode shows `blocks` **and** `study`, so
keep slide text concise and put the depth in `study`.

### Add a whole session
1. Create `src/content/sessions/s16.ts` exporting a `Session`.
2. Import it in `src/content/index.ts` and add it to the `SESSIONS` array.

The roadmap, search index, progress, and navigation all update automatically.

## Brand tokens
Colours and typography come **only** from the CODED reference and are recorded
in [`DESIGN.md`](DESIGN.md), [`src/styles/tokens.css`](src/styles/tokens.css),
and [`.impeccable/design.json`](.impeccable/design.json). Do not substitute a
different palette.

## Deploy (GitHub Pages)
A workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
builds the site and publishes it to GitHub Pages on every push to `main`.

1. Push to GitHub.
2. In the repository, **Settings → Pages → Build and deployment → Source:
   GitHub Actions**.
3. The site publishes to `https://<owner>.github.io/ecppt-classroom/`.

The Vite `base` is `/ecppt-classroom/`; the app uses hash routing so deep links,
refreshes, and browser back/forward all work on the project subpath with no
server configuration. To host elsewhere, set `BASE_PATH` (e.g. `BASE_PATH=/ npm run build`).

## Source material
The authoritative course brief is
[`ecppt-five-week-teaching-outline.md`](ecppt-five-week-teaching-outline.md).
Reference links come from the
[Dragkob eCPPT repository](https://github.com/Dragkob/eCPPT) and
[INE's published eCPPT objectives](https://ine.com/security/certifications/ecppt-certification).
