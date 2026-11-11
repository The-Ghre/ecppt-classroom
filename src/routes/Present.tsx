import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { byId, adjacent } from '../content';
import { BlockList } from '../components/Blocks';
import { Digits } from '../components/Board';
import { I } from '../components/icons';
import { useProgress } from '../lib/useProgress';
import { NotFound } from './NotFound';
import type { Slide } from '../content/types';

/* Presentation mode. The slide owns the screen; chrome recedes while
   teaching (fullscreen + idle). Progress is a trace with one via per
   slide. Shortcuts never fire while typing or inside an open dialog. */
export function Present() {
  const { id, slide } = useParams();
  const session = id ? byId(id) : undefined;
  const nav = useNavigate();
  const { patch, setComplete } = useProgress();

  const total = session?.slides.length ?? 0;
  const idx = Math.max(1, Math.min(parseInt(slide ?? '1', 10) || 1, total)) - 1;

  const [overview, setOverview] = useState(false);
  const [help, setHelp] = useState(false);
  const [fs, setFs] = useState(false);
  const [idle, setIdle] = useState(false);
  const [copied, setCopied] = useState(false);
  const idleTimer = useRef<number | undefined>(undefined);
  const stageRef = useRef<HTMLDivElement>(null);

  const goto = useCallback((n: number) => {
    if (!session) return;
    nav(`/present/${session.id}/${Math.max(1, Math.min(n, session.slides.length))}`, { replace: true });
  }, [session, nav]);

  useEffect(() => { if (session) patch({ lastSession: session.id, lastSlide: idx, mode: 'present' }); }, [session, idx, patch]);
  useEffect(() => { if (session && idx === session.slides.length - 1) setComplete(session.id, true); }, [session, idx, setComplete]);
  useEffect(() => { stageRef.current?.scrollTo({ top: 0 }); }, [idx]);

  useEffect(() => {
    const onFs = () => setFs(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);
  const toggleFs = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else document.documentElement.requestFullscreen?.().catch(() => {});
  }, []);

  const wake = useCallback(() => {
    setIdle(false);
    window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => setIdle(true), 3200);
  }, []);
  useEffect(() => { wake(); return () => window.clearTimeout(idleTimer.current); }, [wake, idx]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = document.activeElement as HTMLElement | null;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (help || overview) {
        if (e.key === 'Escape') { e.preventDefault(); setHelp(false); setOverview(false); }
        return;
      }
      // Let interactive diagrams own their arrow keys.
      if (el && el.closest('.net__track, .topo__svg, .krb__svg') && (e.key.startsWith('Arrow') || e.key === 'Home' || e.key === 'End')) return;
      switch (e.key) {
        case 'ArrowRight': case 'PageDown': e.preventDefault(); goto(idx + 2); break;
        case ' ': if (el && (el.tagName === 'BUTTON' || el.tagName === 'A' || el.tagName === 'SUMMARY')) return; e.preventDefault(); goto(idx + 2); break;
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
  const upcoming = session.slides[idx + 1];
  const { next } = adjacent(session.id);
  const lab = session.kind === 'practical';
  const des = `${lab ? 'J' : 'U'}${session.number}`;

  const copyLink = () => {
    const url = `${location.origin}${location.pathname}#/present/${session.id}/${idx + 1}`;
    navigator.clipboard?.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1600); }).catch(() => {});
  };

  return (
    <div className={`present ${fs ? 'is-fs' : ''} ${idle ? 'is-idle' : ''}`} onMouseMove={wake} onPointerDown={wake}>
      <header className="present__bar present__top">
        <Link to={`/session/${session.id}`} className="present__exit" aria-label="Exit to the datasheet"><I.arrowL /> <span>Datasheet</span></Link>
        <div className="present__meta">
          <span className="present__des">{des}</span>
          <span className="present__sess">{session.title}</span>
        </div>
        <div className="present__tools">
          <span className="present__count" aria-label={`Slide ${idx + 1} of ${total}`}>
            <Digits value={idx + 1} /><span className="present__of">/{String(total).padStart(2, '0')}</span>
          </span>
          <button className="present__tool" onClick={copyLink} aria-label="Copy link to this slide" title={copied ? 'Link copied' : 'Copy link to this slide'}>
            {copied ? <I.valid /> : <I.link />}
          </button>
          <button className="present__tool" onClick={() => setOverview(true)} aria-label="Placement view: all slides (O)" title="All slides (O)"><I.grid /></button>
          <button className="present__tool present__tool--keys" onClick={() => setHelp(true)} aria-label="Keyboard shortcuts (?)" title="Shortcuts (?)"><I.keyboard /></button>
          <button className="present__tool" onClick={toggleFs} aria-label={fs ? 'Exit fullscreen (F)' : 'Fullscreen (F)'} title="Fullscreen (F)">{fs ? <I.shrink /> : <I.expand />}</button>
        </div>
        <span className="sr-only" role="status">{copied ? 'Link copied to clipboard' : ''}</span>
      </header>

      <div className="present__stage" ref={stageRef}>
        <SlideView slide={cur} index={idx} des={des} />
      </div>

      <footer className="present__bar present__bottom">
        <button className="btn present__nav" onClick={() => goto(idx)} disabled={idx === 0} aria-label="Previous slide"><I.arrowL /> <span>Prev</span></button>
        <div className="present__mid">
          <div className="ptrace" role="group" aria-label="Slides">
            {session.slides.map((s, i) => (
              <span key={s.id} className="ptrace__cell">
                {i > 0 && <span className={`ptrace__wire ${i <= idx ? 'is-live' : ''}`} aria-hidden />}
                <button
                  className={`ptrace__via ${i === idx ? 'is-on' : ''} ${i < idx ? 'is-done' : ''}`}
                  onClick={() => goto(i + 1)}
                  aria-label={`Slide ${i + 1}: ${s.title}`}
                  aria-current={i === idx ? 'step' : undefined}
                />
              </span>
            ))}
          </div>
          <span className="present__upnext">
            {upcoming ? <><span className="silk silk--dim">Next</span> {upcoming.title}</> : next ? <><span className="silk silk--dim">Next session</span> {next.title}</> : <span className="silk silk--dim">End of course</span>}
          </span>
        </div>
        {idx < total - 1 ? (
          <button className="btn btn--primary present__nav" onClick={() => goto(idx + 2)} aria-label="Next slide"><span>Next</span> <I.arrowR /></button>
        ) : next ? (
          <Link className="btn btn--primary present__nav" to={`/present/${next.id}/1`} aria-label={`Next session: ${next.title}`}><span>Next session</span> <I.arrowR /></Link>
        ) : (
          <Link className="btn btn--primary present__nav" to="/" aria-label="Finish and return to the board"><span>Finish</span> <I.valid /></Link>
        )}
      </footer>

      {overview && (
        <div className="ovl" role="dialog" aria-modal="true" aria-label="Placement view: all slides" onClick={() => setOverview(false)}>
          <div className="ovl__panel" onClick={(e) => e.stopPropagation()}>
            <div className="ovl__hd">
              <span className="silk silk--copper">Placement · {des} · {session.title}</span>
              <button className="present__tool" onClick={() => setOverview(false)} aria-label="Close placement view" autoFocus><I.close /></button>
            </div>
            <div className="ovl__grid">
              {session.slides.map((s, i) => (
                <button key={s.id} className={`fp ${i === idx ? 'is-current' : ''} ${i < idx ? 'is-done' : ''}`} onClick={() => { goto(i + 1); setOverview(false); }}>
                  <span className="fp__pads" aria-hidden><i /><i /><i /><i /></span>
                  <span className="fp__n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="fp__title">{s.title}</span>
                  {s.tag && <span className="fp__tag">{(s.tag.startsWith('WEEK') ? s.tag.split('·').pop() : s.tag.split('·')[0])?.trim()}</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {help && (
        <div className="ovl" role="dialog" aria-modal="true" aria-label="Keyboard shortcuts" onClick={() => setHelp(false)}>
          <div className="ovl__panel ovl__panel--sm" onClick={(e) => e.stopPropagation()}>
            <div className="ovl__hd">
              <span className="silk silk--copper">Keyboard shortcuts</span>
              <button className="present__tool" onClick={() => setHelp(false)} aria-label="Close" autoFocus><I.close /></button>
            </div>
            <dl className="keys">
              {[
                ['→ · Space', 'Next slide'], ['←', 'Previous slide'], ['Home · End', 'First · last slide'],
                ['O', 'Placement view'], ['F', 'Fullscreen'], ['?', 'This panel'], ['Esc', 'Close · exit fullscreen'],
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

function SlideView({ slide, index, des }: { slide: Slide; index: number; des: string }) {
  const hero = slide.kind === 'title' || (slide.kind === 'brief' && index === 0);
  return (
    <article className={`pslide pslide--${slide.kind} ${hero ? 'pslide--hero' : ''}`} key={slide.id}>
      <h2 className={`pslide__title ${hero ? 'display' : 'h-xl'}`}>{slide.title}</h2>
      {slide.subtitle && <p className="pslide__sub">{slide.subtitle}</p>}
      {slide.lead && <p className="pslide__lead">{slide.lead}</p>}
      <div className="pslide__body blockflow">
        <BlockList blocks={slide.blocks} />
      </div>
      <footer className="pslide__silk">
        <span className="silk silk--dim">{des} · {String(index + 1).padStart(2, '0')}</span>
        {slide.tag && <span className="silk silk--dim">{slide.tag}</span>}
      </footer>
    </article>
  );
}
