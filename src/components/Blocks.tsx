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

    case 'list': {
      const Tag = block.style === 'check' || block.style === 'cross' ? 'ul' : (block.style === 'plain' ? 'ul' : 'ul');
      return (
        <Tag className={`b-list b-list--${block.style ?? 'bullet'} ${block.columns === 2 ? 'b-list--2col' : ''}`}>
          {block.items.map((it, i) => {
            const text = typeof it === 'string' ? it : it.text;
            const tone = typeof it === 'string' ? undefined : it.tone;
            const Mark = block.style === 'check' ? I.valid : block.style === 'cross' ? I.cross : null;
            return (
              <li key={i} className={tone ? `tone-${tone}` : ''}>
                {Mark && <Mark className="b-list__mark" />}
                <span>{inline(text)}</span>
              </li>
            );
          })}
        </Tag>
      );
    }

    case 'steps':
      return (
        <ol className="b-steps">
          {block.items.map((it, i) => (
            <li key={i} className={it.tone ? `tone-${it.tone}` : ''}>
              <span className="b-steps__n mono">{String(i + 1).padStart(2, '0')}</span>
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
          <div className="b-callout__rail"><Icon /></div>
          <div className="b-callout__body">
            <span className="b-callout__label mono">{block.label ?? toneLabel[block.tone]}</span>
            {block.title && <strong className="b-callout__title">{inline(block.title)}</strong>}
            <div className="b-callout__md"><Prose md={block.md} /></div>
          </div>
        </aside>
      );
    }

    case 'compare':
      return (
        <div className="b-compare" style={{ ['--cols' as string]: block.columns.length }}>
          {block.columns.map((col, i) => (
            <div key={i} className={`b-compare__col ${col.tone ? `tone-${col.tone}` : ''}`}>
              <div className="b-compare__hd">
                {col.tone && <I.dot className="b-compare__dot" />}
                <strong>{inline(col.title)}</strong>
                {col.sub && <span className="b-compare__sub mono">{col.sub}</span>}
              </div>
              <ul>{col.items.map((it, j) => <li key={j}>{inline(it)}</li>)}</ul>
            </div>
          ))}
        </div>
      );

    case 'terminal':
      return (
        <figure className="b-term">
          <div className="b-term__bar">
            <I.terminal />
            <span className="mono">{block.title ?? 'console'}</span>
            <span className="b-term__dots"><i /><i /><i /></span>
          </div>
          <pre className="b-term__body" tabIndex={0}>
            {block.lines.map((ln, i) => (
              <div key={i} className={`b-term__ln ${ln.kind ? `is-${ln.kind}` : ''} ${ln.tone ? `tone-${ln.tone}` : ''}`}>
                {ln.kind === 'cmd' && <span className="b-term__p">$</span>}
                {ln.kind === 'comment' && <span className="b-term__hash"># </span>}
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
              <span className="b-http__tab mono">REQUEST</span>
              <pre tabIndex={0}>{block.request.map((l, i) => <div key={i}>{l}</div>)}</pre>
            </div>
            {block.response && (
              <div className="b-http__pane b-http__pane--res">
                <span className="b-http__tab mono">RESPONSE</span>
                <pre tabIndex={0}>{block.response.map((l, i) => <div key={i}>{l}</div>)}</pre>
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
          <table className="b-table">
            <thead>
              <tr>{block.head.map((h, i) => <th key={i} style={{ textAlign: block.align?.[i] ?? 'left' }}>{inline(h)}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((r, i) => (
                <tr key={i}>{r.map((c, j) => <td key={j} style={{ textAlign: block.align?.[j] ?? 'left' }}>{inline(c)}</td>)}</tr>
              ))}
            </tbody>
          </table>
          {block.caption && <figcaption className="b-cap">{inline(block.caption)}</figcaption>}
        </figure>
      );

    case 'diagram':
      return <Diagram kind={block.kind} caption={block.caption} active={block.active} />;

    case 'check':
      return <CheckView block={block} />;

    case 'reasoning':
      return (
        <div className="b-reason">
          <div className="b-reason__hd"><I.reasoning /><span className="mono">THE FIVE QUESTIONS</span></div>
          <dl>
            {[
              ['What evidence supports this test?', block.evidence, 'evidence'],
              ['What conditions must be true?', block.conditions, 'caution'],
              ['What does the result prove?', block.proves, 'valid'],
              ['What should we investigate next?', block.next, 'cyan'],
              ['What change addresses the root cause?', block.rootcause, 'violet'],
            ].map(([q, a, tone], i) => (
              <div key={i} className={`b-reason__row tone-${tone}`}>
                <dt><span className="b-reason__n mono">{i + 1}</span>{q}</dt>
                <dd>{inline(a as string)}</dd>
              </div>
            ))}
          </dl>
        </div>
      );

    case 'define':
      return (
        <div className="b-define">
          <span className="b-define__term mono">{block.term}</span>
          <div className="b-define__body"><Prose md={block.md} /></div>
        </div>
      );

    case 'hints':
      return <HintsView items={block.items} />;

    case 'figure':
      return (
        <div className="b-figure panel panel--inset ticked">
          <div className="b-figure__hd mono">{block.title}</div>
          <dl className="b-figure__rows">
            {block.rows.map((r, i) => (
              <div key={i} className={`b-figure__row ${r.tone ? `tone-${r.tone}` : ''}`}>
                <dt className="mono">{r.k}</dt>
                <dd>{inline(r.v)}</dd>
              </div>
            ))}
          </dl>
        </div>
      );
  }
}

function CheckView({ block }: { block: Extract<Block, { type: 'check' }> }) {
  const [revealed, setRevealed] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <div className="b-check">
      <div className="b-check__q">
        <I.question />
        <strong>{inline(block.q)}</strong>
      </div>
      {block.options && (
        <ul className="b-check__opts" role="group">
          {block.options.map((o, i) => {
            const state = revealed ? (o.correct ? 'correct' : picked === i ? 'wrong' : '') : (picked === i ? 'picked' : '');
            return (
              <li key={i}>
                <button
                  type="button"
                  className={`b-check__opt ${state}`}
                  aria-pressed={picked === i}
                  onClick={() => { setPicked(i); }}
                >
                  <span className="b-check__mk mono">{String.fromCharCode(65 + i)}</span>
                  <span>{inline(o.text)}</span>
                  {revealed && o.correct && <I.valid className="b-check__ok" />}
                  {revealed && !o.correct && picked === i && <I.cross className="b-check__no" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <button type="button" className="btn btn--sm btn--ghost b-check__reveal" aria-expanded={revealed} onClick={() => setRevealed(v => !v)}>
        {revealed ? 'Hide answer' : 'Reveal answer'}
      </button>
      {revealed && (
        <div className="b-check__ans tone-valid">
          <span className="b-check__ans-label mono">ANSWER</span>
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
      <div className="b-hints__hd mono">Progressive hints — reveal only what you need</div>
      {items.map((h, i) => {
        const shown = i <= open;
        return (
          <div key={i} className={`b-hints__item ${shown ? 'is-open' : ''}`}>
            <button
              type="button"
              className="b-hints__trigger"
              aria-expanded={shown}
              onClick={() => setOpen(o => (o >= i ? i - 1 : i))}
            >
              <span className="b-hints__n mono">HINT {i + 1}</span>
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
