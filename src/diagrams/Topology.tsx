import { useState } from 'react';
import { TOPO_NODES, TOPO_LINKS } from './data';
import { I } from '../components/icons';

/* Signature interaction #2 — explorable network topology.
   Click a node (or tab to it) to read its reachability, name resolution,
   and credential requirements on the measuring grid. */
export function Topology({ compact = false }: { compact?: boolean }) {
  const [sel, setSel] = useState('web01');
  const node = TOPO_NODES.find((n) => n.id === sel)!;
  const byId = (id: string) => TOPO_NODES.find((n) => n.id === id)!;

  const segLabel: Record<string, string> = {
    attacker: 'Attacker side', dmz: 'DMZ · 10.10.24.0/24', internal: 'Internal · 172.16.8.0/24',
  };

  return (
    <div className={`topo ${compact ? 'topo--compact' : ''}`}>
      <div className="topo__stage">
        {/* segment bands */}
        <svg viewBox="0 0 640 300" className="topo__svg" role="img" aria-label="Network topology from attacker to domain controller">
          <defs>
            <marker id="topo-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10z" fill="currentColor" />
            </marker>
          </defs>
          <g className="topo__bands">
            <rect x="12" y="20" width="180" height="260" rx="10" className="topo__band" />
            <rect x="212" y="20" width="180" height="260" rx="10" className="topo__band" />
            <rect x="412" y="20" width="216" height="260" rx="10" className="topo__band" />
            <text x="102" y="40" className="topo__bandlbl">DMZ boundary</text>
            <text x="302" y="40" className="topo__bandlbl">Pivot</text>
            <text x="520" y="40" className="topo__bandlbl">Internal · corp.local</text>
          </g>
          {TOPO_LINKS.map(([a, b, lbl], idx) => {
            const na = byId(a), nb = byId(b);
            const on = sel === a || sel === b;
            return (
              <g key={idx} className={`topo__link ${on ? 'is-on' : ''}`}>
                <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} markerEnd="url(#topo-arrow)" />
                {on && <text x={(na.x + nb.x) / 2} y={(na.y + nb.y) / 2 - 6} className="topo__linklbl">{lbl}</text>}
              </g>
            );
          })}
          {TOPO_NODES.map((n) => (
            <g
              key={n.id}
              className={`topo__node tone-${n.tone} ${sel === n.id ? 'is-sel' : ''}`}
              transform={`translate(${n.x},${n.y})`}
              role="button"
              tabIndex={0}
              aria-pressed={sel === n.id}
              aria-label={`${n.label}, ${n.sub}`}
              onClick={() => setSel(n.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(n.id); } }}
            >
              <circle r="26" className="topo__ring" />
              <circle r="17" className="topo__core" />
              <text y="48" className="topo__lbl">{n.label}</text>
              <text y="63" className="topo__sub">{n.sub}</text>
            </g>
          ))}
        </svg>
      </div>

      <aside className={`topo__read tone-${node.tone}`} aria-live="polite">
        <div className="topo__read-hd">
          <span className="chip" style={{ color: 'var(--ink)' }}><I.dot /> {node.label}</span>
          <span className="mono dimmer">{segLabel[node.seg]}</span>
        </div>
        <p className="topo__note">{node.note}</p>
        <dl className="topo__facts">
          <div className="tone-cyan"><dt className="mono"><I.network /> REACHABILITY</dt><dd>{node.reach}</dd></div>
          <div className="tone-evidence"><dt className="mono"><I.server /> NAME RESOLUTION</dt><dd>{node.name}</dd></div>
          <div className="tone-violet"><dt className="mono"><I.lock /> CREDENTIALS</dt><dd>{node.creds}</dd></div>
        </dl>
        <div className="topo__pick">
          {TOPO_NODES.map((n) => (
            <button key={n.id} className={`topo__pickbtn ${sel === n.id ? 'is-active' : ''}`} onClick={() => setSel(n.id)}>{n.label}</button>
          ))}
        </div>
      </aside>
    </div>
  );
}
