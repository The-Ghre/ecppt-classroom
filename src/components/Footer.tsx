import { Link } from 'react-router-dom';
import { COURSE } from '../content/course';

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__grid">
          <div>
            <span className="brandmark__logo">CODED</span>
            <p className="foot__note">A teaching resource for the five-week eCPPT course. Every target, host, and dataset is synthetic and used in instructor-controlled labs.</p>
          </div>
          <div>
            <span className="foot__h silk silk--dim">References</span>
            <div className="foot__links">
              <a href={COURSE.repo} target="_blank" rel="noreferrer">Course material repository</a>
              <a href={COURSE.objectivesUrl} target="_blank" rel="noreferrer">INE eCPPT objectives</a>
              <Link to="/reference">Attack path &amp; network board</Link>
            </div>
          </div>
          <div>
            <span className="foot__h silk silk--dim">Course</span>
            <div className="foot__links">
              <span>{COURSE.dateRange}</span>
              <span>{COURSE.sessions} sessions · {COURSE.theoryHours}h theory · {COURSE.practicalHours}h lab</span>
            </div>
          </div>
        </div>
        <div className="foot__edge">
          <span className="silk silk--dim">CODED-ECPPT-01 · rev 26.11 · made in Kuwait</span>
          <span className="silk silk--dim">Source checked {COURSE.sourceChecked}</span>
        </div>
      </div>
    </footer>
  );
}
