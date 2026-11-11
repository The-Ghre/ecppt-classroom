import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { byId, adjacent } from '../content';
import { STAGES } from '../content/course';
import { BlockList } from '../components/Blocks';
import { I } from '../components/icons';
import { useProgress } from '../lib/useProgress';
import { NotFound } from './NotFound';

/* Study mode — a readable, continuous version of a session. Shows every
   slide's presentation blocks plus its study-only depth, with a sticky
   outline for jumping, source links, and a mark-complete control. */
export function SessionView() {
  const { id } = useParams();
  const session = id ? byId(id) : undefined;
  const { progress, setComplete, patch } = useProgress();
  const { hash } = useLocation();
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    if (session) patch({ lastSession: session.id });
  }, [session, patch]);

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    }
  }, [hash, session]);

  // scroll-spy for the outline
  useEffect(() => {
    if (!session) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    );
    session.slides.forEach((s) => { const el = document.getElementById(`sv-${s.id}`); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [session]);

  const stageMeta = useMemo(() => (session ? STAGES.filter((s) => session.stages.includes(s.id)) : []), [session]);

  if (!session) return <NotFound />;
  const done = progress.completed.includes(session.id);
  const { prev, next } = adjacent(session.id);

  return (
    <div className="sv">
      <div className="wrap">
        {/* breadcrumb + header */}
        <div className="sv-crumb">
          <Link to="/" className="sv-crumb__link"><I.arrowL /> Roadmap</Link>
          <span className="dimmer mono">WEEK {session.week} · SESSION {String(session.number).padStart(2, '0')}</span>
        </div>

        <header className="sv-head">
          <div className="sv-head__main">
            <div className="row gap-3 wrap-flex" style={{ marginBottom: 12 }}>
              <span className={`chip ${session.kind === 'practical' ? 'chip--practical' : 'chip--theory'}`}>
                {session.kind === 'practical' ? <I.flag /> : <I.book />} {session.kind === 'practical' ? 'Practical' : 'Theory'}
              </span>
              {stageMeta.map((s) => (
                <span key={s.id} className={`chip chip--${s.tone === 'cyan' ? 'cyan' : s.tone === 'violet' ? 'violet' : s.tone}`}>
                  <I.dot /> {s.full}
                </span>
              ))}
            </div>
            <h1 className="h-xl sv-title">{session.title}</h1>
            <p className="lede sv-topic">{session.topic}.</p>
            <div className="sv-outcome">
              <span className="readout readout--blue"><I.target /> LEARNING OUTCOME</span>
              <p>{session.outcome}</p>
            </div>
            <div className="sv-actions">
              <Link to={`/present/${session.id}`} className="btn btn--primary"><I.play /> Present this session</Link>
              <button className={`btn ${done ? 'btn--ghost' : ''}`} onClick={() => setComplete(session.id, !done)} aria-pressed={done}>
                {done ? <><I.valid /> Completed</> : <>Mark complete</>}
              </button>
              <button className="btn btn--ghost btn--icon" onClick={() => window.print()} aria-label="Print / save as PDF" title="Print / save as PDF"><I.print /></button>
            </div>
          </div>
          <div className="sv-head__facts">
            <Fact k="DATE" v={`${session.day} ${session.dateLabel}`} />
            <Fact k="DURATION" v={`${session.durationHours} hours`} />
            <Fact k="SLIDES" v={`${session.slides.length}`} />
            <Fact k="FORMAT" v={session.kind === 'practical' ? 'Lab exercise' : 'Theory + exercises'} />
          </div>
        </header>

        <div className="sv-body">
          {/* outline rail */}
          <aside className="sv-rail" aria-label="Session outline">
            <div className="sv-rail__sticky">
              <span className="readout readout--dim">ON THIS PAGE</span>
              <nav className="sv-rail__nav">
                {session.slides.map((s, i) => (
                  <a key={s.id} href={`#sv-${s.id}`} className={`sv-rail__item ${active === `sv-${s.id}` ? 'is-active' : ''}`}>
                    <span className="sv-rail__n mono">{String(i + 1).padStart(2, '0')}</span>
                    <span>{s.title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* reading column */}
          <article className="sv-read">
            {session.slides.map((s, i) => (
              <section key={s.id} id={`sv-${s.id}`} className="sv-slide" aria-label={`Slide ${i + 1}: ${s.title}`}>
                <div className="sv-slide__hd">
                  <span className="sv-slide__n mono">{String(i + 1).padStart(2, '0')} / {String(session.slides.length).padStart(2, '0')}</span>
                  {s.tag && <span className="sv-slide__tag mono">{s.tag}</span>}
                </div>
                <h2 className="sv-slide__title h-md">{s.title}</h2>
                {s.subtitle && <p className="sv-slide__sub dim">{s.subtitle}</p>}
                {s.lead && <p className="sv-slide__lead">{s.lead}</p>}
                <div className="blockflow sv-slide__blocks">
                  <BlockList blocks={s.blocks} />
                  {s.study && s.study.length > 0 && (
                    <div className="sv-study">
                      <span className="readout readout--dim"><I.book /> GOING DEEPER</span>
                      <div className="blockflow"><BlockList blocks={s.study} /></div>
                    </div>
                  )}
                  {s.notes && (
                    <details className="sv-notes">
                      <summary>Instructor notes</summary>
                      <p>{s.notes}</p>
                    </details>
                  )}
                </div>
              </section>
            ))}

            {/* sources */}
            <section className="sv-sources">
              <span className="readout readout--dim"><I.link /> SOURCES &amp; READING</span>
              <ul>
                {[...session.sources, ...(session.reading ?? [])].map((src, i) => (
                  <li key={i}>
                    <a href={src.url} target="_blank" rel="noreferrer">{src.label}</a>
                    {src.note && <span className="dimmer"> — {src.note}</span>}
                  </li>
                ))}
              </ul>
            </section>

            {session.independentStudy && (
              <aside className="sv-indep">
                <span className="readout readout--blue"><I.book /> INDEPENDENT STUDY</span>
                <p>{session.independentStudy}</p>
              </aside>
            )}

            {/* prev / next */}
            <nav className="sv-pager" aria-label="Session navigation">
              {prev ? (
                <Link to={`/session/${prev.id}`} className="sv-pager__link sv-pager__prev">
                  <I.arrowL />
                  <span><span className="dimmer mono">PREVIOUS · S{String(prev.number).padStart(2, '0')}</span><strong>{prev.title}</strong></span>
                </Link>
              ) : <span />}
              {next ? (
                <Link to={`/session/${next.id}`} className="sv-pager__link sv-pager__next">
                  <span><span className="dimmer mono">NEXT · S{String(next.number).padStart(2, '0')}</span><strong>{next.title}</strong></span>
                  <I.arrowR />
                </Link>
              ) : <span />}
            </nav>
          </article>
        </div>
      </div>
    </div>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return <div className="sv-fact"><span className="sv-fact__k mono">{k}</span><span className="sv-fact__v">{v}</span></div>;
}
