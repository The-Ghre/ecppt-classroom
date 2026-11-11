import { SESSIONS } from '../content';
import type { Block, Session, Slide } from '../content/types';
import { strip } from './md';

export interface SearchDoc {
  sessionId: string;
  sessionNo: number;
  sessionTitle: string;
  kind: Session['kind'];
  week: number;
  slideId: string;
  slideIndex: number;
  slideTitle: string;
  tag?: string;
  text: string;       // haystack (lowercased)
  preview: string;    // original-case snippet source
}

function blockText(b: Block): string {
  switch (b.type) {
    case 'prose': return strip(b.md);
    case 'list': return b.items.map((i) => (typeof i === 'string' ? i : i.text)).join(' ');
    case 'steps': return b.items.map((i) => `${i.label} ${i.text}`).join(' ');
    case 'callout': return `${b.title ?? ''} ${strip(b.md)}`;
    case 'compare': return b.columns.map((c) => `${c.title} ${c.items.join(' ')}`).join(' ');
    case 'terminal': return b.lines.map((l) => l.text).join(' ');
    case 'http': return [...b.request, ...(b.response ?? []), ...(b.notes ?? []).map((n) => `${n.line} ${n.note}`)].join(' ');
    case 'table': return `${b.head.join(' ')} ${b.rows.map((r) => r.join(' ')).join(' ')}`;
    case 'check': return `${b.q} ${strip(b.answer)} ${(b.options ?? []).map((o) => o.text).join(' ')}`;
    case 'reasoning': return [b.evidence, b.conditions, b.proves, b.next, b.rootcause].join(' ');
    case 'define': return `${b.term} ${strip(b.md)}`;
    case 'hints': return b.items.map((h) => `${h.label} ${strip(h.md)}`).join(' ');
    case 'figure': return b.rows.map((r) => `${r.k} ${r.v}`).join(' ');
    case 'diagram': return b.caption ?? '';
    default: return '';
  }
}

function slideText(s: Slide): string {
  const parts = [s.title, s.subtitle ?? '', s.lead ?? '', ...s.blocks.map(blockText), ...(s.study ?? []).map(blockText)];
  return parts.join(' ');
}

let INDEX: SearchDoc[] | null = null;

export function index(): SearchDoc[] {
  if (INDEX) return INDEX;
  const docs: SearchDoc[] = [];
  for (const s of SESSIONS) {
    s.slides.forEach((sl, i) => {
      const preview = slideText(sl);
      docs.push({
        sessionId: s.id, sessionNo: s.number, sessionTitle: s.title, kind: s.kind, week: s.week,
        slideId: sl.id, slideIndex: i, slideTitle: sl.title, tag: sl.tag,
        text: `${s.title} ${s.topic} ${preview}`.toLowerCase(), preview,
      });
    });
  }
  INDEX = docs;
  return docs;
}

export interface SearchHit extends SearchDoc { score: number; snippet: string }

export function search(query: string, limit = 24): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  const hits: SearchHit[] = [];
  for (const d of index()) {
    let score = 0;
    for (const t of terms) {
      if (!d.text.includes(t)) { score = -1; break; }
      if (d.slideTitle.toLowerCase().includes(t)) score += 6;
      if (d.sessionTitle.toLowerCase().includes(t)) score += 3;
      const occ = d.text.split(t).length - 1;
      score += Math.min(occ, 4);
    }
    if (score > 0) hits.push({ ...d, score, snippet: snippet(d.preview, terms) });
  }
  hits.sort((a, b) => b.score - a.score || a.sessionNo - b.sessionNo || a.slideIndex - b.slideIndex);
  return hits.slice(0, limit);
}

function snippet(text: string, terms: string[]): string {
  const lower = text.toLowerCase();
  let at = -1;
  for (const t of terms) { const i = lower.indexOf(t); if (i >= 0 && (at < 0 || i < at)) at = i; }
  if (at < 0) return text.slice(0, 150);
  const start = Math.max(0, at - 60);
  return (start > 0 ? '…' : '') + text.slice(start, start + 170).trim() + (text.length > start + 170 ? '…' : '');
}
