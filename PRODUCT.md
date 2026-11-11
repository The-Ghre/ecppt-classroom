# PRODUCT.md — CODED eCPPT Classroom

## What it is
An interactive teaching website that presents CODED's five-week eCPPT (Certified Professional Penetration Tester) course as polished slide decks plus a readable study companion. It is both a classroom projection tool for the instructor and an independent-study resource for students. No student accounts; all state is local.

## The unique mechanism
It turns a terse command-reference outline into a *taught* course: every session is authored as a sequence of teaching slides (explain → demonstrate → discuss → check) with expanded study-mode prose, worked evidence, attack-path storytelling, and knowledge checks. The product's spine is a repeatable reasoning loop students apply to every test: (1) What evidence supports this test? (2) What conditions must be true? (3) What does the result prove? (4) What should we investigate next? (5) What change addresses the root cause?

## Audience & scene
Accelerated-track penetration-testing students who already know TCP/IP, common services, and basic Linux/Windows admin. Two scenes: (a) a dim classroom with the deck on a projector/widescreen while the instructor teaches; (b) a student alone on a laptop/tablet/phone revising in study mode. Dark-first, because both scenes are screen-based and the subject is a security field manual.

## Surfaces
1. **Course overview** — a five-week roadmap: dates (15 Nov–16 Dec 2026), 15 sessions, theory/practical distinction, learning outcomes, entry points.
2. **Presentation mode** — a slide player for projection and self-study: keyboard + visible nav, fullscreen, progress, slide overview grid, shareable per-slide links, shortcuts help, reliable back/forward/refresh.
3. **Study mode** — a continuous, readable version of each session with expanded explanations, examples, source links, and revision questions.
Cross-cutting: search across titles + teaching content, local progress/resume, print-to-PDF layouts, first-use experience, empty states.

## Signature moments (must be fully implemented, must aid understanding)
- An interactive **attack-chain** diagram (recon → access → escalation → pivot → AD → impact) students can step through.
- An explorable **network topology** (attacker → pivot host → internal segment → domain) showing routes, name resolution, credentials.
- An elegant **slide overview** for jumping between topics within a session.

## Content scope (authoritative: the attached outline)
- 10 theory sessions (~16–22 slides each) + 5 practical sessions (~6–10 briefing/debrief slides each). All 15 complete.
- Exam-domain weights (INE's published domains) kept distinct from course grading weights.
- Supplementary exploit-development component preserved (Week 3 + independent study).
- Repository links from the outline used as references; added technical claims verified against primary sources.

## Constraints & commitments
- **Brand is mandatory and fixed:** colors and typography come only from https://coded-reels-playbook.vercel.app/ (IBM Plex Sans/Mono; CODED navy palette with semantic red/green/gold). Do not invent or substitute a palette. Red appears in the reference, so it may be used as a semantic accent (attacker/exploit) — never as the dominant brand color, and never meaning-by-color-alone.
- Accessible: WCAG-level contrast, full keyboard access, visible focus, reduced-motion support, semantic structure, touch targets, diagrams with textual explanations.
- **Instructor-only content (solutions, credentials, full capstone walkthroughs) must NOT ship in the client bundle** — not even hidden in the UI.
- Stack: React + TypeScript + Vite; content separated from presentation as a typed content model. Deployed (GitHub repo `ecppt-classroom` + public URL). Deep links, base paths, and refresh handled correctly.

## Assumptions (labeled; brief did not state)
- Deploy via GitHub Pages using HashRouter for bulletproof deep-link/refresh on a project subpath.
- Instructor contact hours and independent-study hours are shown as published in the outline, not re-derived.
- Synthetic lab data and instructor-controlled scenarios throughout; no real targets.
