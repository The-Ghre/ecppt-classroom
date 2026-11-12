import { useState } from 'react';
import { Link } from 'react-router-dom';
import { COURSE, EXAM_DOMAINS, GRADING, STAGES, FIVE_QUESTIONS, WEEKS, COURSE_PURPOSE, COURSE_OUTCOMES, ENTRY_REQUIREMENTS } from '../content/course';
import { SESSIONS } from '../content';
import { Board } from '../components/Board';
import { AttackChain } from '../diagrams/AttackChain';
import { I } from '../components/icons';
import { useProgress } from '../lib/useProgress';

const des = (s: { kind: string; number: number }) => `${s.kind === 'practical' ? 'J' : 'U'}${s.number}`;

export function Overview() {
  const { progress } = useProgress();
  const firstOpen = SESSIONS.find((s) => !progress.completed.includes(s.id))?.id ?? SESSIONS[SESSIONS.length - 1].id;
  const current = progress.lastSession && !progress.completed.includes(progress.lastSession) ? progress.lastSession : firstOpen;
  const started = progress.completed.length > 0 || !!progress.lastSession;
  const [probe, setProbe] = useState(current);
  const probed = SESSIONS.find((s) => s.id === probe) ?? SESSIONS[0];
  const resume = SESSIONS.find((s) => s.id === current)!;

  return (
    <div className="ov">
      {/* ---- Top band: the claim, the action, the probe ---- */}
      <section className="ov-top wrap">
        <div className="ov-top__claim">
          <h1 className="display ov-title">Route the signal.<br />Prove every hop.</h1>
          <p className="lede">
            CODED’s five-week eCPPT course, wired as one board. Fifteen sessions take you from an
            unknown subnet to a domain objective — and every connection has to carry evidence.
          </p>
          <div className="ov-cta">
            <Link to={`/session/${resume.id}`} className="btn btn--primary btn--lg">
              <I.play /> {started ? `Resume ${des(resume)}` : 'Start at U1'}
            </Link>
            <Link to="/reference" className="btn btn--lg"><I.target /> Trace the attack chain</Link>
          </div>
          <p className="ov-meta silk silk--dim">
            {COURSE.dateRange} · {COURSE.theoryHours}h theory · {COURSE.practicalHours}h lab · study {COURSE.independentStudy}
          </p>
        </div>

        <aside className="probe" aria-live="polite" aria-label="Probe readout for the selected session">
          <h2 className="probe__title">
            <span className="probe__tip" aria-hidden />
            <span className="probe__des">{des(probed)}</span>
            <span>{probed.title}</span>
          </h2>
          <p className="probe__outcome">{probed.outcome}</p>
          <dl className="probe__pins">
            <div><dt className="silk silk--dim">Date</dt><dd>{probed.day} {probed.dateLabel}</dd></div>
            <div><dt className="silk silk--dim">Length</dt><dd>{probed.durationHours} hours</dd></div>
            <div><dt className="silk silk--dim">Slides</dt><dd>{probed.slides.length}</dd></div>
            <div><dt className="silk silk--dim">Type</dt><dd>{probed.kind === 'practical' ? 'Lab header' : 'Theory chip'}</dd></div>
          </dl>
          <div className="probe__stages">
            {STAGES.filter((st) => probed.stages.includes(st.id)).map((st) => (
              <span key={st.id} className="probe__stage">{st.full}</span>
            ))}
          </div>
          <div className="probe__act">
            <Link to={`/present/${probed.id}`} className="btn btn--primary btn--sm"><I.play /> Present</Link>
            <Link to={`/session/${probed.id}`} className="btn btn--sm"><I.book /> Read datasheet</Link>
          </div>
          <p className="probe__hint silk silk--dim">Hover or tab across the board to probe a part</p>
        </aside>
      </section>

      {/* ---- The board ---- */}
      <section className="ov-board wrap" aria-labelledby="board-h">
        <h2 id="board-h" className="sr-only">The five-week course board</h2>
        <Board sessions={SESSIONS} completed={progress.completed} current={current} probe={probe} onProbe={setProbe} />
        <ol className="wk-notes" aria-label="Weekly outcomes">
          {WEEKS.map((w) => (
            <li key={w.n} className="wk-note">
              <span className="wk-note__n silk silk--copper">WK{w.n} outcome</span> {w.outcome}
            </li>
          ))}
        </ol>
        <p className="ov-board__note dim">
          Sunday and Tuesday are theory chips; Wednesday is the lab header where you prove them.
          Your progress powers the trace and is saved on this device only — no account.
        </p>
      </section>

      {/* ---- The attack chain net ---- */}
      <section className="ov-sec wrap" aria-labelledby="chain-h">
        <div className="ov-sec__hd">
          <h2 id="chain-h" className="h-xl">One path, six hops</h2>
          <p className="dim">The route every session teaches. Unproven hops are ratsnest; each one you validate becomes copper. Step through it.</p>
        </div>
        <AttackChain initial={0} />
      </section>

      {/* ---- Test procedure: the five questions ---- */}
      <section className="ov-sec wrap" aria-labelledby="tp-h">
        <div className="ov-sec__hd">
          <h2 id="tp-h" className="h-xl">Probe every test at five points</h2>
          <p className="dim">The same five questions, asked of every scan, exploit, and finding in the course.</p>
        </div>
        <ol className="tps">
          {FIVE_QUESTIONS.map((q, i) => (
            <li key={i} className="tp">
              <span className="tp__pad" aria-hidden><span /></span>
              <span className="tp__q"><span className="tp__id silk silk--copper">TP{i + 1}</span> {q}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* ---- Course outcomes + entry requirements (from the outline) ---- */}
      <section className="ov-sec wrap" aria-labelledby="outcomes-h">
        <div className="ov-sec__hd">
          <h2 id="outcomes-h" className="h-xl">By 16 December, you will be able to</h2>
          <p className="dim">{COURSE_PURPOSE}</p>
        </div>
        <div className="spec">
          <ol className="spec__list">
            {COURSE_OUTCOMES.map((o, i) => (
              <li key={i} className="spec__row">
                <span className="spec__pin" aria-hidden>{i + 1}</span>
                <span>{o}</span>
              </li>
            ))}
          </ol>
          <aside className="spec__entry" aria-labelledby="entry-h">
            <h3 id="entry-h" className="spec__entry-h"><I.caution /> Before you start</h3>
            <p>{ENTRY_REQUIREMENTS.split('. ')[0]}.</p>
            <p className="dim">Expect a short preparatory exercise before the first class to identify any gaps.</p>
          </aside>
        </div>
      </section>

      {/* ---- Two tables, kept apart on purpose ---- */}
      <section className="ov-sec wrap" aria-labelledby="tables-h">
        <div className="ov-sec__hd">
          <h2 id="tables-h" className="h-xl">Two scorecards, never mixed</h2>
          <p className="dim">INE’s exam weights describe the certification. CODED’s weights describe how this course grades you.</p>
        </div>
        <div className="dtables">
          <WeightTable
            n={1} title="INE exam domains" sub="Published weighting of the certification exam" col="Domain"
            rows={EXAM_DOMAINS.map((d) => ({ label: d.label, weight: d.weight, note: d.coverage }))}
          />
          <WeightTable
            n={2} title="Course assessment" sub="How CODED grades your work" col="Component"
            rows={GRADING.map((g) => ({ label: g.label, weight: g.weight }))}
          />
        </div>
        <p className="ov-src silk silk--dim">Source check {COURSE.sourceChecked} · exam weights are INE’s, not the course grading scheme</p>
      </section>
    </div>
  );
}

function WeightTable({ n, title, sub, col, rows }: { n: number; title: string; sub: string; col: string; rows: { label: string; weight: number; note?: string }[] }) {
  const max = Math.max(...rows.map((r) => r.weight));
  return (
    <figure className="dtable">
      <figcaption className="dtable__cap">
        <strong><span className="silk silk--copper">Table {n}</span> {title}</strong>
        <span className="dim">{sub}</span>
      </figcaption>
      <table>
        <thead><tr><th scope="col">{col}</th><th scope="col" className="num">Weight</th></tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>
                <span className="dtable__label">{r.label}</span>
                {r.note && <span className="dtable__note">{r.note}</span>}
                <span className="dtable__trace" aria-hidden><span style={{ transform: `scaleX(${r.weight / max})` }} /></span>
              </td>
              <td className="num mono">{r.weight}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
