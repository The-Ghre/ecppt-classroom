import { Link } from 'react-router-dom';
import { COURSE, WEEKS, EXAM_DOMAINS, GRADING, STAGES, FIVE_QUESTIONS } from '../content/course';
import { SESSIONS, sessionsInWeek, totalSlides } from '../content';
import { SessionCard } from '../components/SessionCard';
import { I } from '../components/icons';
import { useProgress } from '../lib/useProgress';

export function Overview() {
  const { progress } = useProgress();
  const doneCount = progress.completed.length;
  const pct = Math.round((doneCount / SESSIONS.length) * 100);
  const resumeId = progress.lastSession ?? SESSIONS.find((s) => !progress.completed.includes(s.id))?.id ?? SESSIONS[0].id;
  const resume = SESSIONS.find((s) => s.id === resumeId)!;
  const started = doneCount > 0 || !!progress.lastSession;

  return (
    <div className="ov">
      {/* ---- Hero ---- */}
      <section className="ov-hero">
        <div className="wrap">
          <div className="ov-hero__grid">
            <div className="ov-hero__lead">
              <div className="ov-hero__kick">
                <span className="readout readout--blue">CODED · {COURSE.code} CLASSROOM</span>
                <span className="readout readout--dim">{COURSE.cohort}</span>
              </div>
              <h1 className="display ov-hero__title">
                A penetration test,<br />taught as a <em className="ov-em">disciplined chain</em>.
              </h1>
              <p className="lede ov-hero__lede">
                Five weeks, fifteen sessions. Discover a network, land a foothold, escalate, pivot,
                assess Active Directory, and communicate findings — every step justified by evidence.
              </p>
              <div className="ov-hero__cta">
                <Link to={`/session/${resume.id}`} className="btn btn--primary btn--lg">
                  <I.play /> {started ? `Resume · ${resume.title}` : 'Start the course'}
                </Link>
                <Link to="/reference" className="btn btn--ghost btn--lg">
                  <I.map /> Explore the attack chain
                </Link>
              </div>
            </div>

            <aside className="ov-hero__panel panel ticked" aria-label="Course readout">
              <div className="ov-readout">
                <Stat k="DATES" v={COURSE.dateRange} />
                <Stat k="SESSIONS" v={`${COURSE.sessions} · ${totalSlides()} slides`} />
                <Stat k="CONTACT" v={`${COURSE.theoryHours}h theory · ${COURSE.practicalHours}h practical`} />
                <Stat k="STUDY" v={COURSE.independentStudy} />
              </div>
              <div className="ov-prog">
                <div className="ov-prog__hd">
                  <span className="readout">YOUR PROGRESS</span>
                  <span className="mono ov-prog__pct">{doneCount}/{SESSIONS.length}</span>
                </div>
                <div className="ov-prog__bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Sessions completed">
                  <span style={{ transform: `scaleX(${pct / 100})` }} />
                </div>
                <p className="ov-prog__note dimmer">
                  {started ? 'Progress is saved on this device only — no account needed.' : 'Mark sessions complete as you go; your place is saved locally.'}
                </p>
              </div>
            </aside>
          </div>

          {/* The organising spine */}
          <div className="ov-spine" aria-label="The attack chain">
            <span className="ov-spine__label readout">THE ATTACK CHAIN</span>
            <ol className="ov-spine__track">
              {STAGES.map((s, i) => (
                <li key={s.id} className={`ov-spine__stage tone-${s.tone}`}>
                  <span className="ov-spine__n mono">{String(s.n).padStart(2, '0')}</span>
                  <span className="ov-spine__name">{s.label}</span>
                  {i < STAGES.length - 1 && <I.arrowR className="ov-spine__arr" />}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---- Roadmap ---- */}
      <section className="ov-map wrap" aria-labelledby="roadmap-h">
        <div className="ov-sec-hd">
          <h2 id="roadmap-h" className="h-xl">The five-week roadmap</h2>
          <p className="dim">Sunday &amp; Tuesday build the theory; Wednesday is the lab where you prove it.</p>
        </div>
        <div className="ov-weeks">
          {WEEKS.map((w) => (
            <div key={w.n} className="ov-week" id={`week-${w.n}`}>
              <div className="ov-week__hd">
                <div className="ov-week__badge">
                  <span className="readout readout--dim">WEEK</span>
                  <span className="ov-week__n">{w.n}</span>
                </div>
                <div className="ov-week__meta">
                  <h3 className="ov-week__title">{w.title}</h3>
                  <p className="ov-week__outcome">{w.outcome}</p>
                </div>
                <span className="ov-week__dates mono">{w.dateRange}</span>
              </div>
              <div className="ov-week__sessions">
                {sessionsInWeek(w.n).map((s) => (
                  <SessionCard key={s.id} session={s} resume={s.id === resume.id && started} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- The method ---- */}
      <section className="ov-method wrap">
        <div className="panel ov-method__panel ticked">
          <div className="ov-method__hd">
            <I.reasoning />
            <div>
              <span className="readout readout--blue">THE METHOD</span>
              <h2 className="h-lg">Five questions you ask of every test</h2>
            </div>
          </div>
          <ol className="ov-method__list">
            {FIVE_QUESTIONS.map((q, i) => (
              <li key={i}>
                <span className="ov-method__n mono">{i + 1}</span>
                <span>{q}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- Domains vs grading ---- */}
      <section className="ov-dual wrap" aria-labelledby="scheme-h">
        <div className="ov-sec-hd">
          <h2 id="scheme-h" className="h-xl">Two different scorecards</h2>
          <p className="dim">The published exam weights are not how this course is graded. We keep them separate on purpose.</p>
        </div>
        <div className="ov-dual__grid">
          <WeightPanel
            title="INE exam domains" sub="Published weighting of the certification exam"
            icon={<I.target />} tone="evidence"
            rows={EXAM_DOMAINS.map((d) => ({ label: d.label, weight: d.weight, note: d.coverage }))}
          />
          <WeightPanel
            title="Course assessment" sub="How CODED grades your work on this course"
            icon={<I.valid />} tone="valid"
            rows={GRADING.map((g) => ({ label: g.label, weight: g.weight }))}
          />
        </div>
        <p className="ov-dual__note dimmer">
          Source check: {COURSE.sourceChecked}. Exam weights describe INE’s published domains, not the course grading scheme.
        </p>
      </section>

      {/* ---- Legend ---- */}
      <section className="ov-legend wrap">
        <span className="readout readout--dim">READING THE CONSOLE</span>
        <div className="ov-legend__row">
          {[
            { t: 'evidence', i: <I.evidence />, l: 'Evidence / method' },
            { t: 'attacker', i: <I.attacker />, l: 'Attacker / exploit' },
            { t: 'valid', i: <I.valid />, l: 'Validated' },
            { t: 'caution', i: <I.caution />, l: 'Caution / assumption' },
            { t: 'cyan', i: <I.network />, l: 'Network / pivot' },
            { t: 'violet', i: <I.identity />, l: 'Identity / AD' },
          ].map((x) => (
            <span key={x.t} className={`chip chip--${x.t === 'cyan' ? 'cyan' : x.t === 'violet' ? 'violet' : x.t}`}>{x.i} {x.l}</span>
          ))}
        </div>
        <p className="dimmer" style={{ marginTop: 10, fontSize: '0.86rem' }}>
          Meaning is never carried by colour alone — each channel also has an icon and a label.
        </p>
      </section>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="ov-stat">
      <span className="ov-stat__k mono">{k}</span>
      <span className="ov-stat__v">{v}</span>
    </div>
  );
}

function WeightPanel({ title, sub, icon, tone, rows }: {
  title: string; sub: string; icon: React.ReactNode; tone: string;
  rows: { label: string; weight: number; note?: string }[];
}) {
  const max = Math.max(...rows.map((r) => r.weight));
  return (
    <div className={`panel ov-weight tone-${tone}`}>
      <div className="ov-weight__hd">
        <span className="ov-weight__ic">{icon}</span>
        <div>
          <h3 className="ov-weight__title">{title}</h3>
          <span className="dimmer" style={{ fontSize: '0.84rem' }}>{sub}</span>
        </div>
      </div>
      <ul className="ov-weight__list">
        {rows.map((r, i) => (
          <li key={i}>
            <div className="ov-weight__rowhd">
              <span className="ov-weight__label">{r.label}</span>
              <span className="ov-weight__pct mono">{r.weight}%</span>
            </div>
            <div className="ov-weight__bar"><span style={{ width: `${(r.weight / max) * 100}%` }} /></div>
            {r.note && <span className="ov-weight__note dimmer">{r.note}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
