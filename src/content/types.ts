/* ============================================================
   Typed course content model.
   Content is authored as data and kept separate from presentation.
   Each session is a sequence of slides; each slide carries concise
   presentation blocks plus optional expanded study-mode blocks.
   ============================================================ */

export type Tone =
  | 'evidence'   // blue  — evidence, method, defender
  | 'attacker'   // red   — attacker, exploit, finding
  | 'valid'      // green — validated / confirmed
  | 'caution'    // gold  — caution, assumption, note
  | 'cyan'       // network / pivot
  | 'violet'     // identity / AD
  | 'neutral';

export type DiagramKind =
  | 'attack-chain'
  | 'topology'
  | 'kerberos'
  | 'lifecycle'
  | 'pivot'
  | 'shell'
  | 'adtree'
  | 'webmap';

/* ---- Inline blocks ------------------------------------------------ */

export interface ProseBlock { type: 'prose'; md: string }

export interface ListBlock {
  type: 'list';
  style?: 'bullet' | 'check' | 'cross' | 'plain';
  items: (string | { text: string; tone?: Tone })[];
  columns?: 1 | 2;
}

export interface StepsBlock {
  type: 'steps';
  items: { label: string; text: string; tone?: Tone }[];
}

export interface CalloutBlock {
  type: 'callout';
  tone: Tone;
  title?: string;
  md: string;
  label?: string; // overrides the default tone label
}

export interface CompareBlock {
  type: 'compare';
  columns: { title: string; tone?: Tone; items: string[]; sub?: string }[];
}

export interface TerminalBlock {
  type: 'terminal';
  title?: string;
  caption?: string;
  lines: { text: string; tone?: Tone; kind?: 'cmd' | 'out' | 'comment' }[];
}

export interface HttpBlock {
  type: 'http';
  title?: string;
  request: string[];
  response?: string[];
  notes?: { line: string; note: string; tone?: Tone }[];
}

export interface TableBlock {
  type: 'table';
  head: string[];
  rows: string[][];
  caption?: string;
  align?: ('left' | 'right' | 'center')[];
}

export interface DiagramBlock {
  type: 'diagram';
  kind: DiagramKind;
  caption?: string;
  active?: number; // starting active step for stepped diagrams
}

export interface CheckBlock {
  type: 'check';
  q: string;
  options?: { text: string; correct?: boolean }[];
  answer: string;  // revealed explanation / model answer
}

export interface ReasoningBlock {
  type: 'reasoning';
  // The five course questions, answered for a specific test.
  evidence: string;
  conditions: string;
  proves: string;
  next: string;
  rootcause: string;
}

export interface DefineBlock { type: 'define'; term: string; md: string }

export interface HintsBlock {
  type: 'hints';
  items: { label: string; md: string }[]; // progressive disclosure
}

export interface FigureBlock {
  type: 'figure';
  title: string;
  rows: { k: string; v: string; tone?: Tone }[];
}

export type Block =
  | ProseBlock | ListBlock | StepsBlock | CalloutBlock | CompareBlock
  | TerminalBlock | HttpBlock | TableBlock | DiagramBlock | CheckBlock
  | ReasoningBlock | DefineBlock | HintsBlock | FigureBlock;

/* ---- Slides & sessions ------------------------------------------- */

export type SlideKind =
  | 'title' | 'objectives' | 'scenario' | 'concept' | 'demo'
  | 'compare' | 'evidence' | 'diagram' | 'mistakes' | 'discuss'
  | 'check' | 'recap' | 'brief' | 'tasks' | 'debrief';

export interface Slide {
  id: string;
  kind: SlideKind;
  tag?: string;        // mono kicker, e.g. "CONCEPT · 03"
  title: string;
  subtitle?: string;
  lead?: string;       // one framing line
  blocks: Block[];
  study?: Block[];     // expanded, study-mode-only depth
  notes?: string;      // instructor speaker notes (student-safe)
  layout?: 'default' | 'center' | 'wide';
}

export interface Source { label: string; url: string; note?: string }

export type Kind = 'theory' | 'practical';
export type Day = 'Sunday' | 'Tuesday' | 'Wednesday';

export interface Session {
  id: string;          // 's1'..'s15'
  number: number;      // 1..15
  week: number;        // 1..5
  kind: Kind;
  day: Day;
  dateISO: string;     // '2026-11-15'
  dateLabel: string;   // '15 Nov'
  durationHours: number;
  topic: string;       // short topic
  title: string;       // teaching title
  outcome: string;     // learning outcome
  summary: string;     // one line for cards
  stages: string[];    // attack-chain stages touched (ids)
  domains: string[];   // exam-domain ids touched
  slides: Slide[];
  sources: Source[];
  independentStudy?: string;
  reading?: Source[];
}

export interface Week {
  n: number;
  title: string;
  outcome: string;
  dateRange: string;
}
