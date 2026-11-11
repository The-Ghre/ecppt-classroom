/* Local-only progress + resume. No accounts, no network. Every read/write
   is guarded: private windows and cleared storage must not break the app. */

const KEY = 'coded-ecppt:v1';

export interface Progress {
  completed: string[];            // completed session ids
  lastSession?: string;           // for resume
  lastSlide?: number;             // slide index within lastSession
  seenIntro?: boolean;            // first-use experience
  mode?: 'present' | 'study';     // preferred mode
}

const empty: Progress = { completed: [] };

export function read(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...empty };
    const p = JSON.parse(raw) as Progress;
    return { ...empty, ...p, completed: Array.isArray(p.completed) ? p.completed : [] };
  } catch {
    return { ...empty };
  }
}

export function write(p: Progress): void {
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* ignore */ }
}

export function patch(partial: Partial<Progress>): Progress {
  const next = { ...read(), ...partial };
  write(next);
  return next;
}

export function toggleComplete(id: string): Progress {
  const p = read();
  const has = p.completed.includes(id);
  p.completed = has ? p.completed.filter((x) => x !== id) : [...p.completed, id];
  write(p);
  return p;
}

export function setComplete(id: string, done: boolean): Progress {
  const p = read();
  const has = p.completed.includes(id);
  if (done && !has) p.completed = [...p.completed, id];
  if (!done && has) p.completed = p.completed.filter((x) => x !== id);
  write(p);
  return p;
}

export function markResume(sessionId: string, slide: number): void {
  patch({ lastSession: sessionId, lastSlide: slide });
}

export function reset(): void {
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
}
