import { useState } from 'react';
import { CHAIN } from './data';
import { I } from '../components/icons';

/* Signature #2 — the attack path as a routed net.
   Hops you have stepped past are routed copper; the active hop carries the
   live signal; hops ahead are thin dashed ratsnest — unproven connections.
   The pivot is a real via: after it the trace runs on the inner layer.
   Keyboard: ← → step, Home/End jump. `compact` is the in-slide variant. */
const PIVOT_LINK = 2; // link index Escalate → Pivot carries the via

export function AttackChain({ initial = 0, compact = false }: { initial?: number; compact?: boolean }) {
  const [i, setI] = useState(Math.min(Math.max(initial, 0), CHAIN.length - 1));
  const step = CHAIN[i];
  const go = (n: number) => setI(Math.min(Math.max(n, 0), CHAIN.length - 1));

  return (
    <div className={`net ${compact ? 'net--compact' : ''}`}>
      <div
        className="net__track"
        role="group"
        aria-label="Attack path hops"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); go(i + 1); }
          else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(i - 1); }
          else if (e.key === 'Home') { e.preventDefault(); go(0); }
          else if (e.key === 'End') { e.preventDefault(); go(CHAIN.length - 1); }
        }}
      >
        {CHAIN.map((s, n) => {
          const state = n < i ? 'routed' : n === i ? 'live' : 'open';
          const linkState = n < i - 1 ? 'routed' : n === i - 1 ? 'live' : 'rats';
          const inner = n >= PIVOT_LINK;
          return (
            <div key={s.id} className="net__cell">
              <button
                type="button"
                className={`net__node is-${state}`}
                aria-current={n === i ? 'step' : undefined}
                aria-label={`Hop ${s.n}: ${s.stage}${state === 'routed' ? ', proven' : state === 'live' ? ', active' : ', not yet proven'}`}
                onClick={() => go(n)}
                tabIndex={n === i ? 0 : -1}
              >
                <span className="net__pad" aria-hidden />
                <span className="net__des">HOP {String(s.n).padStart(2, '0')}</span>
                <span className="net__stage">{s.stage}</span>
                <span className="net__status">{state === 'routed' ? 'Proven' : state === 'live' ? 'Probing' : 'Ratsnest'}</span>
              </button>
              {n < CHAIN.length - 1 && (
                <span className={`net__link is-${linkState} ${inner ? 'is-inner' : ''}`} aria-hidden>
                  {n === PIVOT_LINK && <span className="net__via"><span>via</span></span>}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="net__panel" aria-live="polite">
        <div className="net__head">
          <span className="silk silk--signal">Hop {String(step.n).padStart(2, '0')} / 06 · {i >= 3 ? 'inner layer' : 'top layer'}</span>
          <span className="silk silk--dim">Week {step.week}</span>
        </div>
        <h3 className="net__title">{step.title}</h3>
        <div className="net__host"><I.server /> {step.host}</div>
        <dl className="net__rows">
          <div className="net__row"><dt className="silk silk--dim">Action</dt><dd>{step.action}</dd></div>
          <div className="net__row tone-evidence"><dt><I.evidence /> Evidence</dt><dd>{step.evidence}</dd></div>
          <div className="net__row tone-valid"><dt><I.valid /> Proves</dt><dd>{step.proves}</dd></div>
        </dl>
        <div className="net__nav">
          <button className="btn btn--sm btn--ghost" onClick={() => go(i - 1)} disabled={i === 0}><I.arrowL /> Prev hop</button>
          <span className="silk silk--dim">{i + 1} of {CHAIN.length} · ← → to step</span>
          <button className="btn btn--sm" onClick={() => go(i + 1)} disabled={i === CHAIN.length - 1}>Next hop <I.arrowR /></button>
        </div>
      </div>
    </div>
  );
}
