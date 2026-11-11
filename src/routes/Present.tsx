import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { byId, adjacent } from '../content';
import { BlockList } from '../components/Blocks';
import { I } from '../components/icons';
import { useProgress } from '../lib/useProgress';
import { NotFound } from './NotFound';
import type { Slide } from '../content/types';

/* Presentation mode — a full-screen slide player for projection and
   self-study. The chrome recedes while teaching; keyboard and visible
   controls drive it; each slide has a shareable URL. Slide shortcuts
   never fire while the user is typing or operating a control. */
export function Present() {
  const { id, slide } = useParams();
  const session = id ? byId(id) : undefined;
  const nav = useNavigate();
  const { patch, setComplete, progress } = useProgress();

  const total = session?.slides.length ?? 0;
  const parsed = Math.max(1, Math.min(parseInt(slide ?? '1', 10) || 1, total));
  const idx = parsed - 1;

  const [overview, setOverview] = useState(false);
  const [help, setHelp] = useState(false);
  const [fs, setFs] = useState(false);
  const [idle, setIdle] = useState(false);
  const idleTimer = useRef<number | undefined>(undefined);
  const stageRef = useRef<HTMLDivElement>(null);

  const goto = useCallback((n: number) => {
    if (!session) return;
    const clamped = Math.max(1, Math.min(n, session.slides.length));
    nav(`/present/${session.id}/${clamped}`, { replace: true });
  }, [session, nav]);

  // remember resume point
  useEffect(() => { if (session) patch({ lastSession: session.id, lastSlide: idx, mode: 'present' }); }, [session, idx, patch]);

  // mark complete on reaching the last slide
  useEffect(() => { if (session && idx === session.slides.length - 1) setComplete(session.id, true); }, [session, idx, setComplete]);

  // fullscreen state
  useEffect(() => {
    const onFs = () => setFs(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  const toggleFs = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else document.documentElement.requestFullscreen?.().catch(() => {});
  }, []);

  // idle-hide the chrome while teaching
  const wake = useCallback(() => {
    setIdle(false);
    window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => setIdle(true), 3200);
  }, []);
  useEffect(() => { wake(); return () => window.clearTimeout(idleTimer.current); }, [wake, idx]);

  // keyboard
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = document.activeElement as HTMLElement | null;
      const typing = el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
      if (typing) return;
      if (help || overview) {
        if (e.key === 'Escape') { e.preventDefault(); setHelp(false); setOverview(false); }
        if (overview && (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'Enter')) return;
        return;
      }
      switch (e.key) {
        case 'ArrowRight': case ' ': case 'PageDown': e.preventDefault(); goto(idx + 2); break;
        case 'ArrowLeft': case 'PageUp': e.preventDefault(); goto(idx); break;
        case 'Home': e.preventDefault(); goto(1); break;
        case 'End': e.preventDefault(); goto(total); break;
        case 'f': case 'F': e.preventDefault(); toggleFs(); break;
        case 'o': case 'O': e.preventDefault(); setOverview(true); break;
        case '?': e.preventDefault(); setHelp(true); break;
        case 'Escape': if (document.fullscreenElement) toggleFs(); break;
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [idx, total, goto, toggleFs, help, overview]);

  if (!session) return <NotFound />;
  const cur = session.slides[idx];
  const { next } = adjacent(session.id);
  const pct = ((idx + 1) / total) * 100;

  const copyLink = () => {
    const url = `${location.origin}${location.pathname}#/present/${session.id}/${idx + 1}`;
    navigator.clipboard?.writeText(url).catch(() => {});
  };

  return (
    <div className={`present ${fs ? 'is-fs' : ''} ${idle ? 'is-idle' : ''}`} onMouseMove={wake} onClick={wake}>
      {/* top bar */}
      <header className="present__bar present__top">
        <Link to={`/session/${session.id}`} className="present__exit" aria-label="Exit to study mode"><I.arrowL /> <span>Study</span></Link>
        <div className="present__meta">
          <span className="brandmark__logo">CODED</span>
          <span className="present__sess">{session.title}</span>
          <span className={`chip ${session.kind === 'practical' ? 'chip--practical' : 'chip--theory'}`}>{session.kind === 'practical' ? 'Practical' : 'Theory'}</span>
        </div>
        <div className="present__tools">
          <span className="present__count mono">{String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          <button className="present__tool" onClick={copyLink} aria-label="Copy link to this slide" title="Copy link to this slide"><I.link /></button>
          <button className="present__tool" onClick={() => setOverview(true)} aria-label="Slide overview (O)" title="Slide overview (O)"><I.grid /></button>
          <button className="present__tool" onClick={() => setHelp(true)} aria-label="Keyboard shortcuts (?)" title="Keyboard shortcuts (?)"><I.keyboard /></button>
          <button className="present__tool" onClick={toggleFs} aria-label={fs ? 'Exit fullscreen (F)' : 'Fullscreen (F)'} title="Fullscreen (F)">{fs ? <I.shrink /> : <I.expand />}</button>
        </div>
      </header>

      {/* stage */}
      <div className="present__stage" ref={stageRef}>
        <SlideView slide={cur} index={idx} total={total} sessionNo={session.number} />
      </div>

      {/* bottom bar */}
      <footer className="present__bar present__bottom">
        <button className="btn btn--ghost present__nav" onClick={() => goto(idx)} disabled={idx === 0} aria-label="Previous slide"><I.arrowL /> Prev</button>
        <div className="present__progress" role="group" aria-label="Slide progress">
          <div className="present__track"><span style={{ width: `${pct}%` }} /></div>
          <div className="present__dots">
            {session.slides.map((s, i) => (
              <button key={s.id} className={`present__dot ${i === idx ? 'is-on' : ''} ${i < idx ? 'is-done' : ''}`} onClick={() => goto(i + 1)} aria-label={`Go to slide ${i + 1}: ${s.title}`} aria-current={i === idx ? 'true' : undefined} />
            ))}
          </div>
        </div>
        {idx < total - 1 ? (
          <button className="btn btn--primary present__nav" onClick={() => goto(idx + 2)} aria-label="Next slide">Next <I.arrowR /></button>
        ) : next ? (
          <Link className="btn btn--primary present__nav" to={`/present/${next.id}/1`} aria-label={`Next session: ${next.title}`}>Next session <I.arrowR /></Link>
        ) : (
          <Link className="btn btn--primary present__nav" to="/" aria-label="Finish — back to roadmap">Finish <I.valid /></Link>
        )}
      </footer>

      {/* slide overview (signature) */}
      {overview && (
        <div className="ovl" role="dialog" aria-modal="true" aria-label="Slide overview" onClick={() => setOverview(false)}>
          <div className="ovl__panel" onClick={(e) => e.stopPropagation()}>
            <div className="ovl__hd">
              <span className="readout readout--blue">SLIDE OVERVIEW · {session.title}</span>
              <button className="present__tool" onClick={() => setOverview(false)} aria-label="Close overview"><I.close /></button>
            </div>
            <div className="ovl__grid">
              {session.slides.map((s, i) => (
                <button key={s.id} className={`ovl__card ${i === idx ? 'is-current' : ''}`} onClick={() => { goto(i + 1); setOverview(false); }}>
                  <div className="ovl__card-top">
                    <span className="ovl__card-n mono">{String(i + 1).padStart(2, '0')}</span>
                    {s.tag && <span className="ovl__card-tag mono">{s.tag.split('·')[0].trim()}</span>}
                  </div>
                  <span className="ovl__card-title">{s.title}</span>
                  {i < progress.completed.length && null}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* shortcuts help */}
      {help && (
        <div className="ovl" role="dialog" aria-modal="true" aria-label="Keyboard shortcuts" onClick={() => setHelp(false)}>
          <div className="ovl__panel ovl__panel--sm" onClick={(e) => e.stopPropagation()}>
            <div className="ovl__hd">
              <span className="readout readout--blue">KEYBOARD SHORTCUTS</span>
              <button className="present__tool" onClick={() => setHelp(false)} aria-label="Close"><I.close /></button>
            </div>
            <dl className="keys">
              {[
                ['→ · Space', 'Next slide'], ['←', 'Previous slide'],
                ['Home · End', 'First · last slide'], ['O', 'Slide overview'],
                ['F', 'Toggle fullscreen'], ['?', 'This help'], ['Esc', 'Close / exit fullscreen'],
              ].map(([k, v]) => (
                <div key={k} className="keys__row"><dt>{k.split(' · ').map((x) => <kbd key={x} className="kbd">{x}</kbd>)}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}

function SlideView({ slide, index, total, sessionNo }: { slide: Slide; index: number; total: number; sessionNo: number }) {
  const isTitle = slide.kind === 'title';
  return (
    <div className={`pslide pslide--${slide.kind} ${isTitle ? 'pslide--hero' : ''}`} key={slide.id}>
      <div className="pslide__head">
        {slide.tag && <span className="pslide__tag readout readout--blue">{slide.tag}</span>}
        {!isTitle && <span className="pslide__crumb mono">S{String(sessionNo).padStart(2, '0')} · {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}</span>}
      </div>
      <h2 className={`pslide__title ${isTitle ? 'display' : 'h-xl'}`}>{slide.title}</h2>
      {slide.subtitle && <p className="pslide__sub lede">{slide.subtitle}</p>}
      {slide.lead && <p className="pslide__lead">{slide.lead}</p>}
      <div className="pslide__body blockflow">
        <BlockList blocks={slide.blocks} />
      </div>
    </div>
  );
}
