import type { ReactNode } from 'react';

/* Tiny, safe inline formatter. Supports **bold**, *italic*, `code`,
   and [text](url). No raw HTML is ever injected — tokens become React
   nodes. Multi-paragraph prose splits on blank lines. */

let keySeed = 0;
const k = () => `md${keySeed++}`;

export function inline(src: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(`([^`]+)`)|(\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    if (m.index > last) out.push(src.slice(last, m.index));
    if (m[2] !== undefined) out.push(<strong key={k()}>{m[2]}</strong>);
    else if (m[4] !== undefined) out.push(<em key={k()}>{m[4]}</em>);
    else if (m[6] !== undefined) out.push(<code key={k()} className="icode">{m[6]}</code>);
    else if (m[8] !== undefined) {
      const url = m[9];
      const external = /^https?:/.test(url);
      out.push(
        <a key={k()} href={url} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
          {m[8]}
        </a>,
      );
    }
    last = re.lastIndex;
  }
  if (last < src.length) out.push(src.slice(last));
  return out;
}

export function Prose({ md }: { md: string }) {
  const paras = md.trim().split(/\n\s*\n/);
  return (
    <>
      {paras.map((p, i) => (
        <p key={i}>{inline(p.replace(/\n/g, ' '))}</p>
      ))}
    </>
  );
}

/* Plain-text extraction for search indexing. */
export function strip(src: string): string {
  return src
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/\n+/g, ' ')
    .trim();
}
