import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { byId, adjacent } from '../content';
import { STAGES } from '../content/course';
import { BlockList } from '../components/Blocks';
import { I } from '../components/icons';
import { useProgress } from '../lib/useProgress';
import { NotFound } from './NotFound';

/* Study mode — each session reads as a component datasheet: a part
   graphic and pin configuration up top, then numbered sections, figures,
   application notes (the study-only depth), and references. */
export function SessionView() {
  const { id } = useParams();
  const session = id ? byId(id) : undefined;
  const { progress, setComplete, patch } = useProgress();
  const { hash } = useLocation();
  const [active, setActive] = useState('');

  useEffect(() => { if (session) patch({ lastSession: session.id }); }, [session, patch]);

  useEffect(() => {
    if (!hash) return;
    const target = hash.slice(1);
    const el = document.getElementById(target) ?? document.getElementById(`sv-${target}`);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }, [hash, session]);

  useEffect(() => {
    if (!session) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: '-15% 0px -70% 0px' },
    );
    session.slides.forEach((s) => { const el = document.getElementById(`sv-${s.id}`); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [session]);

  if (!session) return <NotFound />;
  const done = progress.completed.includes(session.id);
  const { prev, next } = adjacent(session.id);
  const lab = session.kind === 'practical';
  const des = `${lab ? 'J' : 'U'}${session.number}`;
  const stages = STAGES.filter((s) => session.stages.includes(s.id));

  return (
    <div className="ds">
      <div className="wrap">
        <nav className="ds-crumb" aria-label="Breadcrumb">
          <Link to="/" className="ds-crumb__back"><I.arrowL /> Course board</Link>
          <span className="silk silk--dim">Datasheet · {des} · week {session.week} · rev 26.11</span>
        </nav>

        <header className="ds-head">
          <div className={`ds-part ${lab ? 'ds-part--hdr' : ''}`} aria-hidden>
            {lab ? (
              <span className="ds-part__pads">{Array.from({ length: 5 }).map((_, i) => <i key={i} />)}</span>
            ) : (
              <>
                <span className="ds-part__pins ds-part__pins--l"><i /><i /><i /><i /><i /></span>
                <span className="ds-part__pins ds-part__pins--r"><i /><i /><i /><i /><i /></span>
              </>
            )}
            <span className="ds-part__des">{des}</span>
            <span className="ds-part__kind">{lab ? 'Lab header' : 'Theory'}</span>
          </div>

          <div className="ds-head__main">
            <h1 className="h-xl ds-title">{session.title}</h1>
            <p className="lede">{session.topic}.</p>
            <dl className="ds-desc">
              <dt className="silk silk--copper">Learning outcome</dt>
              <dd>{session.outcome}</dd>
            </dl>
            <div className="ds-actions">
              <Link to={`/present/${session.id}`} className="btn btn--primary"><I.play /> Present</Link>
              <button className="btn" onClick={() => setComplete(session.id, !done)} aria-pressed={done}>
                {done ? <><I.valid /> Completed</> : 'Mark complete'}
              </button>
              <button className="btn btn--icon" onClick={() => window.print()} aria-label="Print or save as PDF" title="Print or save as PDF"><I.print /></button>
            </div>
          </div>

          <figure className="ds-pins">
            <figcaption className="silk silk--dim">Pin configuration</figcaption>
            <dl>
              {[
                ['Date', `${session.day} ${session.dateLabel} 2026`],
                ['Length', `${session.durationHours} hours ${lab ? 'lab' : 'theory'}`],
                ['Slides', String(session.slides.length)],
                ['Stage', stages.map((s) => s.full).join(' · ')],
                ['Status', done ? 'Completed' : 'Open'],
              ].map(([k, v], i) => (
                <div key={k} className="ds-pins__row">
                  <span className="ds-pins__n" aria-hidden>{i + 1}</span>
                  <dt>{k}</dt>
                  <dd className={k === 'Status' && done ? 'is-done' : ''}>{v}</dd>
                </div>
              ))}
            </dl>
          </figure>
        </header>

        <div className="ds-body">
          <aside className="ds-rail" aria-label="Contents">
            <div className="ds-rail__sticky">
              <span className="silk silk--dim">Contents</span>
              <nav className="ds-rail__nav">
                {session.slides.map((s, i) => (
                  <a key={s.id} href={`#sv-${s.id}`} className={`ds-rail__item ${active === `sv-${s.id}` ? 'is-active' : ''}`}
                     onClick={(e) => { e.preventDefault(); document.getElementById(`sv-${s.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
                    <span className="ds-rail__n">{i + 1}</span>
                    <span>{s.title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className="ds-read">
            {session.slides.map((s, i) => {
              return (
                <section key={s.id} id={`sv-${s.id}`} className="ds-sec" aria-labelledby={`h-${s.id}`}>
                  <span className="ds-sec__n" aria-hidden>{i + 1}</span>
                  <div className="ds-sec__body">
                    <div className="ds-sec__row">
                      <h2 id={`h-${s.id}`} className="ds-sec__title">{s.title}</h2>
                      {s.tag && <span className="ds-sec__tag silk silk--dim">{s.tag.split('·').slice(-2).join('·').trim()}</span>}
                    </div>
                    {s.subtitle && <p className="ds-sec__sub dim">{s.subtitle}</p>}
                    {s.lead && <p className="ds-sec__lead">{s.lead}</p>}
                    <div className="blockflow">
                      <BlockList blocks={s.blocks} />
                      {s.study && s.study.length > 0 && (
                        <div className="ds-appnote">
                          <span className="ds-appnote__hd"><I.book /> Application note</span>
                          <div className="blockflow"><BlockList blocks={s.study} /></div>
                        </div>
                      )}
                      {s.notes && (
                        <details className="ds-notes">
                          <summary>Instructor notes</summary>
                          <p>{s.notes}</p>
                        </details>
                      )}
                    </div>
                  </div>
                </section>
              );
            })}

            <section className="ds-refs" aria-labelledby="refs-h">
              <h2 id="refs-h" className="ds-sec__title">References</h2>
              <ol>
                {[...session.sources, ...(session.reading ?? [])].map((src, i) => (
                  <li key={i}>
                    <a href={src.url} target="_blank" rel="noreferrer">{src.label}</a>
                    {src.note && <span className="dim"> — {src.note}</span>}
                  </li>
                ))}
              </ol>
            </section>

            {session.independentStudy && (
              <aside className="ds-bench">
                <span className="ds-appnote__hd"><I.target /> Bench exercise · independent study</span>
                <p>{session.independentStudy}</p>
              </aside>
            )}

            <nav className="ds-pager" aria-label="Session navigation">
              {prev ? (
                <Link to={`/session/${prev.id}`} className="ds-pager__link">
                  <I.arrowL />
                  <span><span className="silk silk--dim">Previous · {prev.kind === 'practical' ? 'J' : 'U'}{prev.number}</span><strong>{prev.title}</strong></span>
                </Link>
              ) : <span />}
              {next ? (
                <Link to={`/session/${next.id}`} className="ds-pager__link ds-pager__link--next">
                  <span><span className="silk silk--dim">Next · {next.kind === 'practical' ? 'J' : 'U'}{next.number}</span><strong>{next.title}</strong></span>
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
