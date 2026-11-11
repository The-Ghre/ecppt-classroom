import { useState } from 'react';
import { CHAIN } from './data';
import { I } from '../components/icons';

/* Signature interaction #1 — the attack chain as exploded build-steps.
   Prior stages render ghosted; the current stage is bright with a leader
   line seating it into the readout. Keyboard: ← → to step, Home/End.
   `compact` is the inline slide variant. */
export function AttackChain({ initial = 0, compact = false }: { initial?: number; compact?: boolean }) {
  const [i, setI] = useState(Math.min(Math.max(initial, 0), CHAIN.length - 1));
  const step = CHAIN[i];
  const go = (n: number) => setI(Math.min(Math.max(n, 0), CHAIN.length - 1));

  return (
    <div className={`chain ${compact ? 'chain--compact' : ''}`}>
      <div
        className="chain__track"
        role="group"
        aria-label="Attack chain stages"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); }
          else if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
          else if (e.key === 'Home') { e.preventDefault(); go(0); }
          else if (e.key === 'End') { e.preventDefault(); go(CHAIN.length - 1); }
        }}
      >
        {CHAIN.map((s, n) => {
          const state = n < i ? 'done' : n === i ? 'active' : 'ahead';
          return (
            <button
              key={s.id}
              type="button"
              className={`chain__node tone-${s.tone} is-${state}`}
              aria-current={n === i ? 'step' : undefined}
              aria-label={`Stage ${s.n}: ${s.stage}`}
              onClick={() => go(n)}
              tabIndex={n === i ? 0 : -1}
            >
              <span className="chain__n mono">{String(s.n).padStart(2, '0')}</span>
              <span className="chain__stage">{s.stage}</span>
              <span className="chain__dot" aria-hidden />
              {n < CHAIN.length - 1 && <I.arrowR className="chain__link" aria-hidden />}
            </button>
          );
        })}
      </div>

      <div className={`chain__panel tone-${step.tone}`} aria-live="polite">
        <div className="chain__leader" aria-hidden />
        <div className="chain__head">
          <span className="chain__badge mono">STAGE {String(step.n).padStart(2, '0')} / 06</span>
          <span className="chain__week mono">WEEK {step.week}</span>
        </div>
        <h4 className="chain__title">{step.title}</h4>
        <div className="chain__host mono"><I.server /> {step.host}</div>
        <dl className="chain__rows">
          <div className="chain__row">
            <dt className="mono">ACTION</dt><dd>{step.action}</dd>
          </div>
          <div className="chain__row tone-evidence">
            <dt className="mono"><I.evidence /> EVIDENCE</dt><dd>{step.evidence}</dd>
          </div>
          <div className="chain__row tone-valid">
            <dt className="mono"><I.valid /> PROVES</dt><dd>{step.proves}</dd>
          </div>
        </dl>
        <div className="chain__nav">
          <button className="btn btn--sm btn--ghost" onClick={() => go(i - 1)} disabled={i === 0}><I.arrowL /> Prev</button>
          <span className="chain__count mono">{i + 1} / {CHAIN.length}</span>
          <button className="btn btn--sm" onClick={() => go(i + 1)} disabled={i === CHAIN.length - 1}>Next <I.arrowR /></button>
        </div>
      </div>
    </div>
  );
}
