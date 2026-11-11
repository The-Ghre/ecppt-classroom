import { Link } from 'react-router-dom';
import type { Session } from '../content/types';
import { I } from './icons';
import { useProgress } from '../lib/useProgress';

/* A session module in the roadmap: the "promise" (title, outcome) with a
   mono almanac strip (date · kind · duration) and a completion readout.
   Theory vs practical is marked by icon + label + border style, not colour
   alone. */
export function SessionCard({ session, resume }: { session: Session; resume?: boolean }) {
  const { progress } = useProgress();
  const done = progress.completed.includes(session.id);
  const practical = session.kind === 'practical';

  return (
    <Link
      to={`/session/${session.id}`}
      className={`scard ${practical ? 'scard--practical' : 'scard--theory'} ${done ? 'is-done' : ''}`}
      aria-label={`Session ${session.number}: ${session.title}${done ? ' — completed' : ''}`}
    >
      <div className="scard__top">
        <span className="scard__no mono">S{String(session.number).padStart(2, '0')}</span>
        <span className={`chip ${practical ? 'chip--practical' : 'chip--theory'}`}>
          {practical ? <I.flag /> : <I.book />} {practical ? 'Practical' : 'Theory'}
        </span>
        {done && <span className="scard__done" title="Completed"><I.valid /></span>}
        {resume && !done && <span className="chip chip--valid scard__resume"><I.play /> Resume</span>}
      </div>
      <h3 className="scard__title">{session.title}</h3>
      <p className="scard__outcome">{session.outcome}</p>
      <div className="scard__foot mono">
        <span>{session.dateLabel}</span>
        <span className="scard__dot" aria-hidden>·</span>
        <span>{session.day}</span>
        <span className="scard__dot" aria-hidden>·</span>
        <span>{session.durationHours}h</span>
        <I.arrowR className="scard__go" />
      </div>
    </Link>
  );
}
