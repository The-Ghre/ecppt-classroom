import { useState } from 'react';
import type { DiagramKind } from '../content/types';
import { KERBEROS } from './data';
import { I } from '../components/icons';
import { AttackChain } from './AttackChain';
import { Topology } from './Topology';

/* Dispatcher used by the `diagram` content block. The two signature
   explorers (attack-chain, topology) are full interactive components;
   the rest are schematic figures drawn on the measuring grid. */
export function Diagram({ kind, caption, active }: { kind: DiagramKind; caption?: string; active?: number }) {
  let body: React.ReactNode;
  switch (kind) {
    case 'attack-chain': body = <AttackChain initial={active ?? 0} compact />; break;
    case 'topology': body = <Topology compact />; break;
    case 'kerberos': body = <Kerberos />; break;
    case 'lifecycle': body = <Lifecycle />; break;
    case 'adtree': body = <AdTree />; break;
    case 'pivot': body = <PivotSchematic />; break;
    case 'shell': body = <ShellSchematic />; break;
    case 'webmap': body = <WebMap />; break;
    default: body = null;
  }
  return (
    <figure className="dgm">
      {body}
      {caption && <figcaption className="b-cap">{caption}</figcaption>}
    </figure>
  );
}

/* ---- Kerberos sequence ---- */
function Kerberos() {
  const [step, setStep] = useState(KERBEROS.length - 1);
  const lanes = { client: 70, kdc: 300, service: 530 };
  return (
    <div className="krb">
      <svg viewBox="0 0 600 320" className="krb__svg" role="img" aria-label="Kerberos authentication message flow">
        <defs>
          <marker id="krb-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" fill="currentColor" />
          </marker>
        </defs>
        {Object.entries(lanes).map(([k, x]) => (
          <g key={k}>
            <rect x={x - 54} y={14} width={108} height={30} rx={6} className="krb__actor" />
            <text x={x} y={33} className="krb__actorlbl">{k === 'kdc' ? 'KDC / DC' : k === 'client' ? 'Client' : 'Service'}</text>
            <line x1={x} y1={48} x2={x} y2={300} className="krb__life" />
          </g>
        ))}
        {KERBEROS.map((m, i) => {
          const y = 78 + i * 44;
          const x1 = lanes[m.from as keyof typeof lanes];
          const x2 = lanes[m.to as keyof typeof lanes];
          const on = i <= step;
          return (
            <g key={m.n} className={`krb__msg tone-${m.tone} ${on ? 'is-on' : 'is-off'} ${i === step ? 'is-active' : ''}`} onClick={() => setStep(i)} role="button" tabIndex={0}
               onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStep(i); } }}>
              <line x1={x1} y1={y} x2={x2} y2={y} markerEnd="url(#krb-arrow)" className="krb__line" />
              <text x={(x1 + x2) / 2} y={y - 7} className="krb__lbl">{m.msg}</text>
              {m.weak && on && <circle cx={x2} cy={y} r={5} className="krb__weak" />}
            </g>
          );
        })}
      </svg>
      <div className="krb__read">
        <div className="krb__reader">
          <span className="chip chip--evidence"><I.dot /> MSG {KERBEROS[step].n} · {KERBEROS[step].msg}</span>
          <p>{KERBEROS[step].note}</p>
          {KERBEROS[step].weak && (
            <p className="krb__weaknote tone-attacker"><I.attacker /> <strong>Weakness:</strong> {KERBEROS[step].weak}</p>
          )}
        </div>
        <div className="krb__steps">
          {KERBEROS.map((m, i) => (
            <button key={m.n} className={`krb__chip ${i === step ? 'is-active' : ''}`} onClick={() => setStep(i)}>{m.msg}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- Testing lifecycle (the loop) ---- */
function Lifecycle() {
  const phases = [
    { k: 'Discovery', t: 'evidence' }, { k: 'Enumeration', t: 'evidence' }, { k: 'Validation', t: 'caution' },
    { k: 'Exploitation', t: 'attacker' }, { k: 'Post-exploitation', t: 'violet' }, { k: 'Reporting', t: 'valid' },
  ];
  return (
    <div className="lifecycle">
      {phases.map((p, i) => (
        <div key={p.k} className={`lifecycle__node tone-${p.t}`}>
          <span className="lifecycle__n mono">{String(i + 1).padStart(2, '0')}</span>
          <span className="lifecycle__k">{p.k}</span>
          {i < phases.length - 1 && <I.arrowR className="lifecycle__arr" />}
        </div>
      ))}
    </div>
  );
}

/* ---- AD object tree ---- */
function AdTree() {
  return (
    <div className="adtree panel panel--inset ticked">
      <div className="adtree__root"><I.server /> <span className="mono">corp.local</span> <span className="dimmer mono">· Domain</span></div>
      <div className="adtree__branch">
        <div className="adtree__node tone-violet"><I.server /> DC01 <span className="dimmer">Domain Controller · DNS · KDC</span></div>
        <div className="adtree__node"><I.grid /> OU=Servers <span className="dimmer">FILE02, SQL01</span></div>
        <div className="adtree__node"><I.grid /> OU=Workstations <span className="dimmer">WS01–WS40</span></div>
        <div className="adtree__node tone-cyan"><I.identity /> Groups <span className="dimmer">Domain Admins, IT-Support, Service Accounts</span></div>
        <div className="adtree__node tone-caution"><I.identity /> Users <span className="dimmer">svc_sql (SPN), j.doe, admins…</span></div>
      </div>
    </div>
  );
}

function PivotSchematic() {
  return (
    <div className="schem">
      <div className="schem__node tone-attacker"><I.terminal /><span>Attacker</span><span className="mono dimmer">10.10.24.5</span></div>
      <div className="schem__link"><span className="mono">SOCKS / SSH tunnel</span><I.arrowR /></div>
      <div className="schem__node tone-evidence"><I.server /><span>Pivot host</span><span className="mono dimmer">dual-homed</span></div>
      <div className="schem__link"><span className="mono">proxychains</span><I.arrowR /></div>
      <div className="schem__node tone-violet"><I.server /><span>Internal</span><span className="mono dimmer">172.16.8.0/24</span></div>
    </div>
  );
}

function ShellSchematic() {
  return (
    <div className="schem schem--col">
      <div className="schem__row"><span className="chip chip--caution"><I.dot /> BIND</span><span>Target opens a port; attacker connects in. Blocked by inbound firewalls.</span></div>
      <div className="schem__row"><span className="chip chip--valid"><I.dot /> REVERSE</span><span>Target connects out to the attacker's listener. Survives most egress-permissive firewalls.</span></div>
      <div className="schem__row"><span className="chip chip--evidence"><I.dot /> INTERACTIVE</span><span>A full TTY: job control, `sudo`, and interactive programs work.</span></div>
    </div>
  );
}

function WebMap() {
  return (
    <div className="adtree panel panel--inset ticked">
      <div className="adtree__root"><I.network /> <span className="mono">https://shop.lab</span> <span className="dimmer mono">· Application map</span></div>
      <div className="adtree__branch">
        <div className="adtree__node"><I.grid /> /login <span className="dimmer">auth form · session cookie</span></div>
        <div className="adtree__node tone-caution"><I.grid /> /search?q= <span className="dimmer">reflected input → test XSS / SQLi</span></div>
        <div className="adtree__node tone-caution"><I.grid /> /product?id= <span className="dimmer">numeric param → test SQLi</span></div>
        <div className="adtree__node tone-attacker"><I.grid /> /admin/upload <span className="dimmer">file upload → test type bypass</span></div>
        <div className="adtree__node"><I.grid /> /api/v1 <span className="dimmer">JSON endpoints · auth scope</span></div>
      </div>
    </div>
  );
}
