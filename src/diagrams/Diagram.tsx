import { useState } from 'react';
import type { DiagramKind } from '../content/types';
import { KERBEROS } from './data';
import { I } from '../components/icons';
import { AttackChain } from './AttackChain';
import { Topology } from './Topology';

/* Dispatcher for the `diagram` content block. Every figure is drawn in the
   board language: parts, copper traces, vias, silkscreen labels. */
export function Diagram({ kind, caption, active }: { kind: DiagramKind; caption?: string; active?: number }) {
  let body: React.ReactNode = null;
  switch (kind) {
    case 'attack-chain': body = <AttackChain initial={active ?? 0} compact />; break;
    case 'topology': body = <Topology compact />; break;
    case 'kerberos': body = <Kerberos />; break;
    case 'lifecycle': body = <Lifecycle />; break;
    case 'adtree': body = <Tree root="corp.local" kind="Domain" rows={AD_ROWS} />; break;
    case 'webmap': body = <Tree root="https://shop.lab" kind="Application map" rows={WEB_ROWS} />; break;
    case 'pivot': body = <PivotSchematic />; break;
    case 'shell': body = <ShellSchematic />; break;
  }
  return (
    <figure className="dgm">
      {body}
      {caption && <figcaption className="b-cap"><span className="silk silk--copper">Fig.</span> {caption}</figcaption>}
    </figure>
  );
}

/* ---- Kerberos message flow ---- */
function Kerberos() {
  const [step, setStep] = useState(KERBEROS.length - 1);
  const lanes = { client: 70, kdc: 300, service: 530 } as const;
  const m = KERBEROS[step];
  return (
    <div className="krb">
      <svg viewBox="0 0 600 320" className="krb__svg" role="img" aria-label="Kerberos authentication message flow between client, KDC, and service">
        <defs>
          <marker id="krb-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" fill="currentColor" />
          </marker>
        </defs>
        {Object.entries(lanes).map(([k, x]) => (
          <g key={k}>
            <rect x={x - 56} y={14} width={112} height={32} rx={5} className="krb__actor" />
            <text x={x} y={35} className="krb__actorlbl">{k === 'kdc' ? 'KDC · DC01' : k === 'client' ? 'Client' : 'Service'}</text>
            <line x1={x} y1={50} x2={x} y2={300} className="krb__life" />
          </g>
        ))}
        {KERBEROS.map((msg, i) => {
          const y = 80 + i * 44;
          const x1 = lanes[msg.from as keyof typeof lanes];
          const x2 = lanes[msg.to as keyof typeof lanes];
          const on = i <= step;
          return (
            <g key={msg.n} className={`krb__msg tone-${msg.tone} ${on ? 'is-on' : 'is-off'} ${i === step ? 'is-active' : ''}`}
               role="button" tabIndex={0} aria-label={`Message ${msg.n}: ${msg.msg}`}
               onClick={() => setStep(i)}
               onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStep(i); } }}>
              <line x1={x1} y1={y} x2={x2} y2={y} markerEnd="url(#krb-arrow)" className="krb__line" />
              <text x={(x1 + x2) / 2} y={y - 8} className="krb__lbl">{msg.n} · {msg.msg}</text>
              {msg.weak && on && <rect x={x2 - 5} y={y - 5} width={10} height={10} className="krb__weak" />}
            </g>
          );
        })}
      </svg>
      <div className="krb__read" aria-live="polite">
        <span className="silk silk--signal">Message {m.n} · {m.msg}</span>
        <p>{m.note}</p>
        {m.weak && (
          <p className="krb__weaknote"><I.attacker /> <span><strong>Weakness.</strong> {m.weak}</span></p>
        )}
        <div className="krb__steps" role="group" aria-label="Select a message">
          {KERBEROS.map((x, i) => (
            <button key={x.n} className={`krb__chip ${i === step ? 'is-active' : ''}`} aria-pressed={i === step} onClick={() => setStep(i)}>{x.msg}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- Testing lifecycle: six test points on one looping trace ---- */
function Lifecycle() {
  const phases = ['Discovery', 'Enumeration', 'Validation', 'Exploitation', 'Post-exploitation', 'Reporting'];
  return (
    <div className="loop">
      <ol className="loop__track">
        {phases.map((p, i) => (
          <li key={p} className="loop__tp">
            <span className="loop__pad" aria-hidden />
            <span className="silk silk--copper">TP{i + 1}</span>
            <span className="loop__k">{p}</span>
          </li>
        ))}
      </ol>
      <div className="loop__return" aria-hidden><span className="silk silk--dim">findings route back to enumeration</span></div>
    </div>
  );
}

/* ---- Silkscreen trees (AD, web map) ---- */
type Row = { icon: keyof typeof I; label: string; note: string; tone?: string };
const AD_ROWS: Row[] = [
  { icon: 'server', label: 'DC01', note: 'Domain controller · DNS · KDC', tone: 'violet' },
  { icon: 'grid', label: 'OU=Servers', note: 'FILE02, SQL01' },
  { icon: 'grid', label: 'OU=Workstations', note: 'WS01–WS40' },
  { icon: 'identity', label: 'Groups', note: 'Domain Admins, IT-Support, Service Accounts', tone: 'cyan' },
  { icon: 'identity', label: 'Users', note: 'svc_sql (SPN), j.doe, admins…', tone: 'caution' },
];
const WEB_ROWS: Row[] = [
  { icon: 'grid', label: '/login', note: 'auth form · session cookie' },
  { icon: 'grid', label: '/search?q=', note: 'reflected input → test XSS / SQLi', tone: 'caution' },
  { icon: 'grid', label: '/product?id=', note: 'numeric param → test SQLi', tone: 'caution' },
  { icon: 'grid', label: '/admin/upload', note: 'file upload → test type bypass', tone: 'attacker' },
  { icon: 'grid', label: '/api/v1', note: 'JSON endpoints · auth scope' },
];

function Tree({ root, kind, rows }: { root: string; kind: string; rows: Row[] }) {
  return (
    <div className="tree">
      <div className="tree__root"><I.server /> <span className="mono">{root}</span> <span className="silk silk--dim">{kind}</span></div>
      <ul className="tree__rows">
        {rows.map((r) => {
          const Icon = I[r.icon];
          return (
            <li key={r.label} className={`tree__row ${r.tone ? `tone-${r.tone}` : ''}`}>
              <Icon /> <span className="tree__label">{r.label}</span> <span className="tree__note">{r.note}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function PivotSchematic() {
  return (
    <div className="schem" role="img" aria-label="Attacker connects through a SOCKS or SSH tunnel to a dual-homed pivot host, then through proxychains to the internal network">
      <div className="schem__part tone-attacker"><I.terminal /><strong>Attacker</strong><span className="silk silk--dim">10.10.24.5</span></div>
      <div className="schem__trace"><span className="silk">SOCKS / SSH tunnel</span></div>
      <div className="schem__part tone-evidence"><I.server /><strong>Pivot host</strong><span className="silk silk--dim">dual-homed</span></div>
      <div className="schem__trace schem__trace--inner"><span className="schem__via" aria-hidden /><span className="silk">proxychains · via</span></div>
      <div className="schem__part tone-violet"><I.server /><strong>Internal</strong><span className="silk silk--dim">172.16.8.0/24</span></div>
    </div>
  );
}

function ShellSchematic() {
  const rows = [
    { t: 'caution', k: 'Bind', d: 'Target opens a port; attacker connects in. Blocked by inbound firewalls.' },
    { t: 'valid', k: 'Reverse', d: 'Target connects out to the attacker’s listener. Survives most egress-permissive firewalls.' },
    { t: 'evidence', k: 'Interactive', d: 'A full TTY: job control, sudo, and interactive programs work.' },
  ];
  return (
    <ul className="shells">
      {rows.map((r) => (
        <li key={r.k} className={`shells__row tone-${r.t}`}>
          <span className="shells__k mono">{r.k}</span>
          <span>{r.d}</span>
        </li>
      ))}
    </ul>
  );
}
