import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Session } from '../content/types';
import { WEEKS } from '../content/course';

/* ============================================================
   THE BOARD — signature #1.
   The whole course as one circuit board. Five silkscreened week blocks,
   fifteen components on a single routed bus. Theory sessions are IC
   chips (pins on both sides); labs are test headers (a row of through-
   hole pads). The bus is gold copper; the segment the student's signal
   has reached is live cyan, with one travelling pulse.
   Traces are measured from the real DOM and routed orthogonally with
   45° chamfers, so the same router works for 5 columns or 1.
   ============================================================ */

type Rect = { left: number; right: number; top: number; bottom: number; cx: number; cy: number };

function rel(el: HTMLElement, host: HTMLElement): Rect {
  const a = el.getBoundingClientRect();
  const h = host.getBoundingClientRect();
  const left = a.left - h.left, top = a.top - h.top;
  return { left, top, right: left + a.width, bottom: top + a.height, cx: left + a.width / 2, cy: top + a.height / 2 };
}

type Pt = [number, number];

/* A polyline with every corner cut at 45° — the way copper is routed. */
function poly(pts: Pt[], c = 12): string {
  const r = (n: number) => Math.round(n * 10) / 10;
  let d = `M${r(pts[0][0])} ${r(pts[0][1])}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1], [x, y] = pts[i], [nx, ny] = pts[i + 1];
    const d1 = Math.hypot(x - px, y - py), d2 = Math.hypot(nx - x, ny - y);
    const k = Math.min(c, d1 / 2, d2 / 2);
    d += `L${r(x + ((px - x) / d1) * k)} ${r(y + ((py - y) / d1) * k)}L${r(x + ((nx - x) / d2) * k)} ${r(y + ((ny - y) / d2) * k)}`;
  }
  const [lx, ly] = pts[pts.length - 1];
  return `${d}L${r(lx)} ${r(ly)}`;
}

function clean(pts: Pt[]): Pt[] {
  const out: Pt[] = [];
  for (const p of pts) {
    const q = out[out.length - 1];
    if (!q || Math.hypot(p[0] - q[0], p[1] - q[1]) > 0.5) out.push(p);
  }
  return out;
}

/* Route A → B. Side-by-side parts join through the channel between them.
   When B opens a new week courtyard and sits below A, the trace runs down
   the courtyard's left gutter and enters B's side pin — it never crosses
   the week's silkscreen legend. Stacked parts join top to bottom. */
function route(a: Rect, b: Rect, court?: Rect, crossing = false): { d: string; p0: Pt; p1: Pt; via?: Pt } {
  let pts: Pt[];
  let via: Pt | undefined;
  if (b.left >= a.right - 2) {
    const mx = (a.right + b.left) / 2;
    pts = [[a.right, a.cy], [mx, a.cy], [mx, b.cy], [b.left, b.cy]];
    if (crossing) via = [mx, (a.cy + b.cy) / 2];
  } else if (court && b.top >= a.bottom - 2) {
    const gx = court.left + 10;
    const ya = a.bottom < court.top ? (a.bottom + court.top) / 2 : court.top - 10;
    pts = [[a.cx, a.bottom], [a.cx, ya], [gx, ya], [gx, b.cy], [b.left, b.cy]];
    if (crossing) via = [gx, (ya + b.cy) / 2];
  } else if (b.top >= a.bottom - 2) {
    const my = (a.bottom + b.top) / 2;
    pts = [[a.cx, a.bottom], [a.cx, my], [b.cx, my], [b.cx, b.top]];
  } else {
    pts = [[a.cx, a.cy], [b.cx, b.cy]];
  }
  pts = clean(pts);
  return { d: poly(pts), p0: pts[0], p1: pts[pts.length - 1], via };
}

/* proven: the target session is complete — routed copper carrying the signal.
   probe: the single segment into the session you are on now.
   rats: everything not yet proven — a thin dashed ratsnest line. */
type SegState = 'proven' | 'probe' | 'rats';
interface Seg { d: string; p0: Pt; p1: Pt; via?: Pt; state: SegState; inner: boolean; pivot: boolean }

export function Board({
  sessions, completed, current, probe, onProbe,
}: {
  sessions: Session[];
  completed: string[];
  current: string;
  probe: string;
  onProbe: (id: string) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const partRefs = useRef<Record<string, HTMLElement | null>>({});
  const weekRefs = useRef<Record<number, HTMLElement | null>>({});
  const pulseRef = useRef<SVGPathElement>(null);
  const [segs, setSegs] = useState<Seg[]>([]);
  const [live, setLive] = useState('');
  const [size, setSize] = useState({ w: 0, h: 0 });

  const order = ['J1', ...sessions.map((s) => s.id), 'J2'];
  const idx = (id: string) => sessions.findIndex((s) => s.id === id);
  const lastDone = Math.max(-1, ...completed.map(idx));
  const cur = idx(current);
  const allDone = completed.length >= sessions.length;

  const measure = useCallback(() => {
    const h = host.current;
    if (!h) return;
    const out: Seg[] = [];
    for (let i = 0; i < order.length - 1; i++) {
      const a = partRefs.current[order[i]], b = partRefs.current[order[i + 1]];
      if (!a || !b) continue;
      // does the target open a new week courtyard?
      const target = sessions.find((s) => s.id === order[i + 1]);
      const prevS = sessions.find((s) => s.id === order[i]);
      const opensWeek = target && (!prevS || prevS.week !== target.week);
      const courtEl = opensWeek ? weekRefs.current[target!.week] : null;
      const crossing = !!(opensWeek && prevS);
      const seg = route(rel(a, h), rel(b, h), courtEl ? rel(courtEl, h) : undefined, crossing);
      // segment i joins order[i] → order[i+1]; the target's session index is i (J2 at the end)
      const isExit = i === order.length - 2;
      const state: SegState = isExit ? (allDone ? 'proven' : 'rats') : i <= lastDone ? 'proven' : i === cur ? 'probe' : 'rats';
      const tWeek = target ? target.week : 5;
      out.push({ ...seg, state, inner: tWeek >= 4, pivot: crossing && target?.week === 4 });
    }
    setSegs(out);
    setLive(out.filter((s) => s.state !== 'rats').map((s) => s.d).join(''));
    setSize({ w: h.scrollWidth, h: h.scrollHeight });
  }, [order.join(','), lastDone, cur, allDone]); // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (host.current) ro.observe(host.current);
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, [measure]);

  // the one authored motion: a signal pulse travelling the live trace
  useLayoutEffect(() => {
    const p = pulseRef.current;
    if (!p || !live) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const len = p.getTotalLength();
    p.style.strokeDasharray = `46 ${len + 46}`;
    const anim = p.animate(
      [{ strokeDashoffset: 46 }, { offset: 0.78, strokeDashoffset: -len }, { strokeDashoffset: -len }],
      { duration: Math.max(1800, len * 2.2), iterations: Infinity, easing: 'linear' },
    );
    return () => anim.cancel();
  }, [live]);

  const setRef = (id: string) => (el: HTMLElement | null) => { partRefs.current[id] = el; };
  const doneCount = completed.length;

  return (
    <div className="board" aria-label="Course board: fifteen sessions routed in order">
      <span className="board__hole board__hole--tl" aria-hidden />
      <span className="board__hole board__hole--tr" aria-hidden />
      <span className="board__hole board__hole--bl" aria-hidden />
      <span className="board__hole board__hole--br" aria-hidden />

      <div className="board__in" ref={host}>
        <svg className="board__traces" width={size.w} height={size.h} aria-hidden>
          {segs.map((s, i) => (
            <path key={i} d={s.d} className={`trace trace--${s.state} ${s.inner ? 'trace--inner' : ''}`} />
          ))}
          {live && <path d={live} className="trace-glow" />}
          {live && <path ref={pulseRef} d={live} className="trace-pulse" />}
          {segs.map((s, i) => (
            <g key={`p${i}`} className={s.state === 'rats' ? 'pad' : 'pad pad--live'}>
              <rect x={s.p0[0] - 3.5} y={s.p0[1] - 3.5} width="7" height="7" rx="1.5" />
              <rect x={s.p1[0] - 3.5} y={s.p1[1] - 3.5} width="7" height="7" rx="1.5" />
            </g>
          ))}
          {segs.filter((s) => s.via).map((s, i) => (
            <g key={`v${i}`} className={`via ${s.state !== 'rats' ? 'via--live' : ''} ${s.pivot ? 'via--pivot' : ''}`}>
              <circle cx={s.via![0]} cy={s.via![1]} r="6.5" />
              <circle cx={s.via![0]} cy={s.via![1]} r="2.4" className="via__drill" />
              {s.pivot && <text x={s.via![0]} y={s.via![1] - 12} className="via__lbl">L2</text>}
            </g>
          ))}
        </svg>

        <div className="board__edge">
          <span className="conn" ref={setRef('J1')}>
            <span className="conn__pads" aria-hidden><i /><i /><i /></span>
            <span className="silk">J1 · Start</span>
          </span>
          <span className="board__name silk silk--dim">CODED-ECPPT-01 · REV 26.11 · {sessions.length} parts · {sessions.reduce((n, s) => n + s.slides.length, 0)} slides</span>
          <span className="board__count" aria-label={`${doneCount} of ${sessions.length} sessions completed`}>
            <span className="silk silk--dim">Signal</span>
            <Digits value={doneCount} /><span className="board__of">/{sessions.length}</span>
          </span>
        </div>

        <div className="board__weeks">
          {WEEKS.map((w) => (
            <section key={w.n} className="wk" ref={(el) => { weekRefs.current[w.n] = el; }} aria-label={`Week ${w.n}: ${w.title}`}>
              <header className="wk__hd">
                <span className="wk__n">WK{w.n}</span>
                <span className="wk__dates silk silk--dim">{w.dateRange}</span>
                <span className="wk__title">{w.title}</span>
                {w.n >= 4 && <span className="wk__layer silk silk--blue">L2 · inner layer</span>}
              </header>
              <div className="wk__parts">
                {sessions.filter((s) => s.week === w.n).map((s) => {
                  const done = completed.includes(s.id);
                  const isCurrent = s.id === current && !done;
                  const lab = s.kind === 'practical';
                  const state = done ? 'Done' : isCurrent ? 'Live' : 'Queued';
                  return (
                    <Link
                      key={s.id}
                      to={`/session/${s.id}`}
                      ref={setRef(s.id)}
                      className={`part ${lab ? 'part--hdr' : 'part--ic'} ${done ? 'is-done' : ''} ${isCurrent ? 'is-live' : ''} ${probe === s.id ? 'is-probed' : ''}`}
                      onMouseEnter={() => onProbe(s.id)}
                      onFocus={() => onProbe(s.id)}
                      aria-label={`Session ${s.number}, ${lab ? 'lab' : 'theory'}: ${s.title}. ${s.day} ${s.dateLabel}. ${state}.`}
                    >
                      {lab ? (
                        <span className="part__pads" aria-hidden>{Array.from({ length: 7 }).map((_, i) => <i key={i} />)}</span>
                      ) : (
                        <>
                          <span className="part__pins part__pins--l" aria-hidden><i /><i /><i /><i /></span>
                          <span className="part__pins part__pins--r" aria-hidden><i /><i /><i /><i /></span>
                          <span className="part__dot" aria-hidden />
                        </>
                      )}
                      <span className="part__top">
                        <span className="part__des">{lab ? `J${s.number}` : `U${s.number}`}</span>
                        <span className={`led ${done ? 'led--on' : isCurrent ? 'led--live' : ''}`} aria-hidden />
                        <span className="part__state">{state}</span>
                      </span>
                      <span className="part__title">{s.title}</span>
                      <span className="part__line">{s.dateLabel} · {s.day.slice(0, 3)} · {s.durationHours}h{lab ? ' · Lab' : ''}</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="board__edge board__edge--bottom">
          <span className="board__key silk silk--dim">
            <span className="key key--ic" aria-hidden /> U · theory chip
            <span className="key key--hdr" aria-hidden /> J · lab header
            <span className="key key--live" aria-hidden /> proven
            <span className="key key--probe" aria-hidden /> probing
            <span className="key key--rats" aria-hidden /> ratsnest
            <span className="key key--via" aria-hidden /> via · L2 = inner layer
          </span>
          <span className="conn conn--out" ref={setRef('J2')}>
            <span className="silk">J2 · Objective</span>
            <span className="conn__pads" aria-hidden><i /><i /><i /></span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* Instrument digits: a count change rolls in as a visible event. */
export function Digits({ value, pad = 2 }: { value: number; pad?: number }) {
  const s = String(value).padStart(pad, '0');
  return (
    <span className="digits" aria-hidden>
      {s.split('').map((ch, i) => (
        <span key={`${i}-${ch}`} className="digits__d">{ch}</span>
      ))}
    </span>
  );
}
