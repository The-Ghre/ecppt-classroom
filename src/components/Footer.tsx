import { Link } from 'react-router-dom';
import { COURSE } from '../content/course';

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="spread wrap-flex gap-5">
          <div className="stack gap-2">
            <div className="row gap-3">
              <span className="brandmark__logo">CODED</span>
              <span className="readout">eCPPT CLASSROOM · {COURSE.cohort}</span>
            </div>
            <p className="dimmer" style={{ maxWidth: '44ch', margin: 0 }}>
              A teaching resource. All targets, hosts, and data are synthetic and used in instructor-controlled lab scenarios.
            </p>
          </div>
          <div className="stack gap-2" style={{ fontSize: '0.88rem' }}>
            <span className="readout readout--dim">Reference</span>
            <a href={COURSE.repo} target="_blank" rel="noreferrer">Course material repository</a>
            <a href={COURSE.objectivesUrl} target="_blank" rel="noreferrer">INE eCPPT objectives</a>
            <Link to="/reference">Attack-chain &amp; topology explorer</Link>
          </div>
          <div className="stack gap-2" style={{ fontSize: '0.88rem' }}>
            <span className="readout readout--dim">Course</span>
            <span className="dim">{COURSE.dateRange}</span>
            <span className="dim">{COURSE.sessions} sessions · {COURSE.theoryHours} theory + {COURSE.practicalHours} practical hours</span>
            <span className="dimmer mono" style={{ fontSize: '0.72rem' }}>Source checked {COURSE.sourceChecked}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
