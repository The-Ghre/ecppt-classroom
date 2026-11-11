import { Link } from 'react-router-dom';
import { AttackChain } from '../diagrams/AttackChain';
import { Topology } from '../diagrams/Topology';
import { Diagram } from '../diagrams/Diagram';
import { I } from '../components/icons';
import { STAGES } from '../content/course';

/* The three explorers on one page: the attack path net, the two-layer
   network board, and the Kerberos exchange. All hosts are synthetic. */
export function Reference() {
  return (
    <div className="ref wrap">
      <header className="ref-hero">
        <h1 className="display">Trace one path<br />end to end.</h1>
        <p className="lede">Every session is one hop on this net. Step from an unknown subnet to a domain objective,
          then open the board it runs on. All hosts are synthetic lab assets.</p>
      </header>

      <section className="ref-block" aria-labelledby="rc-h">
        <div className="ref-block__hd">
          <h2 id="rc-h" className="h-lg">The attack path net</h2>
          <p className="dim">Click a hop or use ← →. Proven hops are copper, the active hop carries the signal, unproven hops stay ratsnest.</p>
        </div>
        <AttackChain initial={0} />
      </section>

      <section className="ref-block" aria-labelledby="rt-h">
        <div className="ref-block__hd">
          <h2 id="rt-h" className="h-lg">The lab network, as a two-layer board</h2>
          <p className="dim">The DMZ is the top layer. corp.local is the inner layer — reachable only through WEB01’s via. Select a host for its reachability, name resolution, and credentials.</p>
        </div>
        <Topology />
      </section>

      <section className="ref-block" aria-labelledby="rk-h">
        <div className="ref-block__hd">
          <h2 id="rk-h" className="h-lg">Kerberos, and where it breaks</h2>
          <p className="dim">The normal exchange, with the two weaknesses you validate in Week 4 marked in red.</p>
        </div>
        <Diagram kind="kerberos" caption="AS-REP roasting and Kerberoasting both abuse legitimate messages in this exchange." />
      </section>

      <section className="ref-stages" aria-labelledby="rs-h">
        <h2 id="rs-h" className="h-lg">The six hops</h2>
        <div className="ref-stages__grid">
          {STAGES.map((s) => (
            <div key={s.id} className={`ref-stage tone-${s.tone}`}>
              <h3><span className="led" aria-hidden /><span className="silk silk--dim">Hop {String(s.n).padStart(2, '0')}</span> {s.full}</h3>
              <p>{s.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="ref-cta">
        <Link to="/" className="btn btn--primary btn--lg"><I.map /> Back to the course board</Link>
      </div>
    </div>
  );
}
