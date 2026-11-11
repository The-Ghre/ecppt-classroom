import { useState } from 'react';
import type { Block, Tone } from '../content/types';
import { inline, Prose } from '../lib/md';
import { I } from './icons';
import { Diagram } from '../diagrams/Diagram';

const toneIcon: Record<Tone, keyof typeof I> = {
  evidence: 'evidence', attacker: 'attacker', valid: 'valid',
  caution: 'caution', cyan: 'network', violet: 'identity', neutral: 'dot',
};
const toneLabel: Record<Tone, string> = {
  evidence: 'Evidence', attacker: 'Attacker', valid: 'Validated',
  caution: 'Caution', cyan: 'Network', violet: 'Identity', neutral: 'Note',
};

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'prose':
      return <div className="b-prose"><Prose md={block.md} /></div>;

    case 'list':
      return (
        <ul className={`b-list b-list--${block.style ?? 'bullet'} ${block.columns === 2 ? 'b-list--2col' : ''}`}>
          {block.items.map((it, i) => {
            const text = typeof it === 'string' ? it : it.text;
            const tone = typeof it === 'string' ? undefined : it.tone;
            const Mark = block.style === 'check' ? I.valid : block.style === 'cross' ? I.cross : null;
            return (
              <li key={i} className={tone ? `tone-${tone}` : ''}>
                {Mark ? <Mark className="b-list__mark" /> : <span className="b-list__pad" aria-hidden />}
                <span>{inline(text)}</span>
              </li>
            );
          })}
        </ul>
      );

    case 'steps':
      return (
        <ol className="b-steps">
          {block.items.map((it, i) => (
            <li key={i} className={it.tone ? `tone-${it.tone}` : ''}>
              <span className="b-steps__n mono" aria-hidden>{i + 1}</span>
              <span className="b-steps__body">
                <strong className="b-steps__label">{inline(it.label)}</strong>
                <span className="b-steps__text">{inline(it.text)}</span>
              </span>
            </li>
          ))}
        </ol>
      );

    case 'callout': {
      const Icon = I[toneIcon[block.tone]];
      return (
        <aside className={`b-callout tone-${block.tone}`} role="note">
          <div className="b-callout__hd">
            <Icon className="b-callout__ic" />
            <span className="b-callout__label">{block.label ?? toneLabel[block.tone]}</span>
            {block.title && <strong className="b-callout__title">{inline(block.title)}</strong>}
          </div>
          <div className="b-callout__md"><Prose md={block.md} /></div>
        </aside>
      );
    }

    case 'compare':
      return (
        <div className="b-compare" style={{ ['--cols' as string]: block.columns.length }}>
          {block.columns.map((col, i) => (
            <div key={i} className={`b-compare__col ${col.tone ? `tone-${col.tone}` : ''}`}>
              <div className="b-compare__hd">
                <span className="led" aria-hidden />
                <strong>{inline(col.title)}</strong>
                {col.sub && <span className="b-compare__sub">{col.sub}</span>}
              </div>
              <ul>{col.items.map((it, j) => <li key={j}>{inline(it)}</li>)}</ul>
            </div>
          ))}
        </div>
      );

    case 'terminal':
      return (
        <figure className="b-term">
          <div className="b-term__bar"><I.terminal /><span>{block.title ?? 'console'}</span></div>
          <pre className="b-term__body" tabIndex={0}>
            {block.lines.map((ln, i) => (
              <div key={i} className={`b-term__ln ${ln.kind ? `is-${ln.kind}` : ''} ${ln.tone ? `tone-${ln.tone}` : ''}`}>
                {ln.kind === 'cmd' && <span className="b-term__p" aria-hidden>$ </span>}
                {ln.kind === 'comment' && <span aria-hidden># </span>}
                <span>{ln.text}</span>
              </div>
            ))}
          </pre>
          {block.caption && <figcaption className="b-cap">{inline(block.caption)}</figcaption>}
        </figure>
      );

    case 'http':
      return (
        <figure className="b-http">
          <div className="b-http__grid">
            <div className="b-http__pane">
              <span className="b-http__tab">Request</span>
              <pre tabIndex={0}>{block.request.map((l, i) => <div key={i}>{l || ' '}</div>)}</pre>
            </div>
            {block.response && (
              <div className="b-http__pane b-http__pane--res">
                <span className="b-http__tab">Response</span>
                <pre tabIndex={0}>{block.response.map((l, i) => <div key={i}>{l || ' '}</div>)}</pre>
              </div>
            )}
          </div>
          {block.notes && (
            <ul className="b-http__notes">
              {block.notes.map((n, i) => (
                <li key={i} className={n.tone ? `tone-${n.tone}` : ''}>
                  <code className="icode">{n.line}</code>
                  <span>{inline(n.note)}</span>
                </li>
              ))}
            </ul>
          )}
          {block.title && <figcaption className="b-cap">{inline(block.title)}</figcaption>}
        </figure>
      );

    case 'table':
      return (
        <figure className="b-table-wrap">
          <div className="b-table-scroll">
            <table className="b-table">
              <thead><tr>{block.head.map((h, i) => <th key={i} scope="col" style={{ textAlign: block.align?.[i] ?? 'left' }}>{inline(h)}</th>)}</tr></thead>
              <tbody>
                {block.rows.map((r, i) => (
                  <tr key={i}>{r.map((c, j) => <td key={j} style={{ textAlign: block.align?.[j] ?? 'left' }}>{inline(c)}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && <figcaption className="b-cap">{inline(block.caption)}</figcaption>}
        </figure>
      );

    case 'diagram':
      return <Diagram kind={block.kind} caption={block.caption} active={block.active} />;

    case 'check':
      return <CheckView block={block} />;

    case 'reasoning': {
      const rows: [string, string, string][] = [
        ['What evidence supports this test?', block.evidence, 'evidence'],
        ['What conditions must be true?', block.conditions, 'caution'],
        ['What does the result prove?', block.proves, 'valid'],
        ['What should we investigate next?', block.next, 'cyan'],
        ['What change addresses the root cause?', block.rootcause, 'violet'],
      ];
      return (
        <div className="b-reason">
          <div className="b-reason__hd"><I.reasoning /><span>Test procedure · five probe points</span></div>
          <ol className="b-reason__list">
            {rows.map(([q, a, tone], i) => (
              <li key={i} className={`b-reason__row tone-${tone}`}>
                <span className="b-reason__tp" aria-hidden><span /></span>
                <span className="b-reason__id">TP{i + 1}</span>
                <span className="b-reason__q">{q}</span>
                <span className="b-reason__a">{inline(a)}</span>
              </li>
            ))}
          </ol>
        </div>
      );
    }

    case 'define':
      return (
        <div className="b-define">
          <span className="b-define__term">{block.term}</span>
          <div className="b-define__body"><Prose md={block.md} /></div>
        </div>
      );

    case 'hints':
      return <HintsView items={block.items} />;

    case 'figure':
      return (
        <figure className="b-figure">
          <figcaption className="b-figure__hd"><span>{block.title}</span><span className="b-figure__cols" aria-hidden>Pin · Signal</span></figcaption>
          <dl className="b-figure__rows">
            {block.rows.map((r, i) => (
              <div key={i} className={`b-figure__row ${r.tone ? `tone-${r.tone}` : ''}`}>
                <span className="b-figure__pin" aria-hidden>{i + 1}</span>
                <dt>{r.k}</dt>
                <dd>{inline(r.v)}</dd>
              </div>
            ))}
          </dl>
        </figure>
      );
  }
}

function CheckView({ block }: { block: Extract<Block, { type: 'check' }> }) {
  const [revealed, setRevealed] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <div className="b-check">
      <div className="b-check__q"><I.question /><strong>{inline(block.q)}</strong></div>
      {block.options && (
        <ul className="b-check__opts" role="group" aria-label="Answer options">
          {block.options.map((o, i) => {
            const state = revealed ? (o.correct ? 'correct' : picked === i ? 'wrong' : '') : (picked === i ? 'picked' : '');
            return (
              <li key={i}>
                <button type="button" className={`b-check__opt ${state}`} aria-pressed={picked === i} onClick={() => setPicked(i)}>
                  <span className="b-check__mk">{String.fromCharCode(65 + i)}</span>
                  <span>{inline(o.text)}</span>
                  {revealed && o.correct && <span className="b-check__verdict tone-valid"><I.valid /> Correct</span>}
                  {revealed && !o.correct && picked === i && <span className="b-check__verdict tone-attacker"><I.cross /> Your pick</span>}
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <button type="button" className="btn btn--sm b-check__reveal" aria-expanded={revealed} onClick={() => setRevealed((v) => !v)}>
        {revealed ? 'Hide answer' : 'Reveal answer'}
      </button>
      {revealed && (
        <div className="b-check__ans">
          <span className="b-check__ans-label">Answer</span>
          <Prose md={block.answer} />
        </div>
      )}
    </div>
  );
}

function HintsView({ items }: { items: { label: string; md: string }[] }) {
  const [open, setOpen] = useState<number>(-1);
  return (
    <div className="b-hints">
      <div className="b-hints__hd">Progressive hints · reveal only the next one you need</div>
      {items.map((h, i) => {
        const shown = i <= open;
        return (
          <div key={i} className={`b-hints__item ${shown ? 'is-open' : ''}`}>
            <button type="button" className="b-hints__trigger" aria-expanded={shown} onClick={() => setOpen((o) => (o >= i ? i - 1 : i))}>
              <span className="b-hints__n">Probe {i + 1}</span>
              <span className="b-hints__label">{h.label}</span>
              <I.chevronD className="b-hints__chev" />
            </button>
            {shown && <div className="b-hints__body"><Prose md={h.md} /></div>}
          </div>
        );
      })}
    </div>
  );
}

export function BlockList({ blocks }: { blocks: Block[] }) {
  return <>{blocks.map((b, i) => <BlockView key={i} block={b} />)}</>;
}
