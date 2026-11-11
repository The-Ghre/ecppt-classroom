import { AttackChain } from '../diagrams/AttackChain';
import { Topology } from '../diagrams/Topology';
import { Diagram } from '../diagrams/Diagram';
import { I } from '../components/icons';
import { STAGES } from '../content/course';
import { Link } from 'react-router-dom';

/* The signature explorers on one page: the attack chain and the network
   topology, both interactive, plus the Kerberos flow. A reference students
   return to as the course builds. */
export function Reference() {
  return (
    <div className="ref wrap">
      <header className="ref-hero">
        <span className="readout readout--blue">REFERENCE · THE ATTACK CHAIN</span>
        <h1 className="display">One evidenced path,<br />end to end.</h1>
        <p className="lede">Every session is a turn of this chain. Step through the complete capstone-style
          path — from an unknown subnet to a domain objective — then explore the network it runs on.
          All hosts are synthetic lab assets.</p>
      </header>

      <section className="ref-block" aria-labelledby="rc-h">
        <div className="ref-block__hd">
          <h2 id="rc-h" className="h-lg"><I.target /> Interactive attack chain</h2>
          <p className="dim">Click a stage, or use ← → to step. Prior stages stay on the board; the active one carries the evidence.</p>
        </div>
        <AttackChain initial={0} />
      </section>

      <section className="ref-block" aria-labelledby="rt-h">
        <div className="ref-block__hd">
          <h2 id="rt-h" className="h-lg"><I.network /> Explorable network topology</h2>
          <p className="dim">Select a host to read its reachability, name resolution, and the credentials each hop needs.</p>
        </div>
        <Topology />
      </section>

      <section className="ref-block" aria-labelledby="rk-h">
        <div className="ref-block__hd">
          <h2 id="rk-h" className="h-lg"><I.identity /> Kerberos, and where it breaks</h2>
          <p className="dim">The normal message flow — with the two weaknesses you will validate in Week 4.</p>
        </div>
        <Diagram kind="kerberos" caption="AS-REP roasting and Kerberoasting both abuse legitimate messages in this exchange." />
      </section>

      <section className="ref-stages">
        <span className="readout readout--dim">THE SIX STAGES</span>
        <div className="ref-stages__grid">
          {STAGES.map((s) => (
            <div key={s.id} className={`ref-stage tone-${s.tone}`}>
              <span className="ref-stage__n mono">{String(s.n).padStart(2, '0')}</span>
              <h3>{s.full}</h3>
              <p>{s.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="ref-cta">
        <Link to="/" className="btn btn--primary btn--lg"><I.map /> Back to the roadmap</Link>
      </div>
    </div>
  );
}
