import { useState } from 'react';
import { TOPO_NODES } from './data';
import { I } from '../components/icons';

/* Signature #3 — the lab network as a two-layer board.
   Top layer (copper) is the DMZ you can reach; the inner layer (blue) is
   corp.local, reachable only through WEB01's via — that via IS the pivot.
   Select a host to read reachability, name resolution, and credentials. */

const LINKS: { a: string; b: string; top?: string; inner?: string; member?: string; label?: string; lx: number; ly: number; anchor?: 'start' | 'middle' | 'end' }[] = [
  { a: 'kali', b: 'web01', top: 'M102 150H268', label: '10.10.24.0/24', lx: 160, ly: 141, anchor: 'start' },
  { a: 'web01', b: 'file02', top: 'M332 150H400', inner: 'M400 150H418L440 128V92L462 70H508', lx: 0, ly: 0 },
  { a: 'web01', b: 'dc01', top: 'M332 150H400', inner: 'M400 150H418L440 172V208L462 230H508', lx: 0, ly: 0 },
  { a: 'file02', b: 'dc01', member: 'M540 120V206', lx: 0, ly: 0 },
];

export function Topology({ compact = false }: { compact?: boolean }) {
  const [sel, setSel] = useState('web01');
  const node = TOPO_NODES.find((n) => n.id === sel)!;
  const layer: Record<string, string> = { attacker: 'Off-board · attacker', dmz: 'L1 top · DMZ', internal: 'L2 inner · corp.local' };

  return (
    <div className={`topo ${compact ? 'topo--compact' : ''}`}>
      <div className="topo__stage">
        <svg viewBox="0 0 640 300" className="topo__svg" role="img" aria-label="Two-layer network board: attacker, WEB01 pivot via, FILE02 and DC01 on the inner layer">
          <rect x="150" y="22" width="262" height="256" rx="10" className="topo__layer" />
          <rect x="424" y="22" width="206" height="256" rx="10" className="topo__layer topo__layer--inner" />
          <text x="160" y="40" className="topo__layerlbl">L1 top · DMZ</text>
          <text x="434" y="40" className="topo__layerlbl topo__layerlbl--inner">L2 inner · corp.local</text>

          {LINKS.map((l, i) => {
            const on = sel === l.a || sel === l.b;
            return (
              <g key={i} className={`topo__net ${on ? 'is-on' : ''}`}>
                {l.top && <path d={l.top} className="topo__t topo__t--top" />}
                {l.inner && <path d={l.inner} className="topo__t topo__t--inner" />}
                {l.member && <path d={l.member} className="topo__t topo__t--member" />}
                {on && l.label && <text x={l.lx} y={l.ly} className="topo__netlbl" textAnchor={l.anchor ?? 'middle'}>{l.label}</text>}
              </g>
            );
          })}

          <g className="topo__via" aria-hidden>
            <circle cx="400" cy="150" r="7.5" />
            <circle cx="400" cy="150" r="2.6" className="topo__drill" />
            <text x="392" y="174" className="topo__vialbl" textAnchor="end">VIA</text>
          </g>

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
              <rect x="-32" y="-20" width="64" height="40" rx="5" className="topo__body" />
              <text y="5" className="topo__lbl">{n.label}</text>
              <text y="38" className="topo__sub">{n.sub}</text>
            </g>
          ))}
        </svg>
      </div>

      <aside className="topo__read" aria-live="polite">
        <div className="topo__read-hd">
          <span className="probe__tip" aria-hidden />
          <strong>{node.label}</strong>
          <span className="silk silk--dim">{layer[node.seg]}</span>
        </div>
        <p className="topo__note">{node.note}</p>
        <dl className="topo__facts">
          <div><dt className="silk silk--signal"><I.network /> Reachability</dt><dd>{node.reach}</dd></div>
          <div><dt className="silk silk--copper"><I.server /> Name resolution</dt><dd>{node.name}</dd></div>
          <div><dt className="silk" style={{ color: 'var(--violet)' }}><I.lock /> Credentials</dt><dd>{node.creds}</dd></div>
        </dl>
        <div className="topo__pick" role="group" aria-label="Select host">
          {TOPO_NODES.map((n) => (
            <button key={n.id} className={`topo__pickbtn ${sel === n.id ? 'is-active' : ''}`} aria-pressed={sel === n.id} onClick={() => setSel(n.id)}>{n.label}</button>
          ))}
        </div>
      </aside>
    </div>
  );
}
