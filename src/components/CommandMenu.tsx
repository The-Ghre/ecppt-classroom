import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { search, type SearchHit } from '../lib/search';
import { I } from './icons';

/* A search palette opened with "/" or Cmd/Ctrl-K. Searches titles and
   teaching content across all sessions. Never steals keystrokes while the
   user is typing in another field. */

let opener: (() => void) | null = null;
export function openCommandMenu() { opener?.(); }

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const nav = useNavigate();

  const hits = q.trim() ? search(q, 30) : [];

  const close = useCallback(() => { setOpen(false); setQ(''); setSel(0); }, []);

  useEffect(() => { opener = () => setOpen(true); return () => { opener = null; }; }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = document.activeElement as HTMLElement | null;
      const typing = el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
      if ((e.key === '/' && !typing) || ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 10); }, [open]);
  useEffect(() => { setSel(0); }, [q]);

  const goto = useCallback((h: SearchHit) => {
    close();
    nav(`/session/${h.sessionId}#${h.slideId}`);
  }, [close, nav]);

  if (!open) return null;

  return (
    <div className="cmdk" role="dialog" aria-modal="true" aria-label="Search the course" onMouseDown={close}>
      <div className="cmdk__panel" onMouseDown={(e) => e.stopPropagation()}>
        <div className="cmdk__input">
          <I.search />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search titles and teaching content…"
            aria-label="Search query"
            onKeyDown={(e) => {
              if (e.key === 'Escape') close();
              else if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, hits.length - 1)); }
              else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
              else if (e.key === 'Enter' && hits[sel]) { e.preventDefault(); goto(hits[sel]); }
            }}
          />
          <kbd className="kbd">Esc</kbd>
        </div>
        <div className="cmdk__results" role="listbox" aria-label="Search results">
          {q.trim() && hits.length === 0 && (
            <div className="cmdk__empty">
              <I.search />
              <p>No matches for <strong>“{q}”</strong>.</p>
              <span className="dimmer">Try a tool, technique, or concept — “kerberoast”, “SUID”, “pivot”, “evidence”.</span>
            </div>
          )}
          {!q.trim() && (
            <div className="cmdk__hint">
              <span className="readout">Try</span>
              <div className="cmdk__chips">
                {['SQL injection', 'privilege escalation', 'Kerberos', 'pivoting', 'evidence', 'reverse shell'].map((t) => (
                  <button key={t} className="cmdk__chip" onClick={() => setQ(t)}>{t}</button>
                ))}
              </div>
            </div>
          )}
          {hits.map((h, i) => (
            <button
              key={h.slideId}
              role="option"
              aria-selected={i === sel}
              className={`cmdk__hit ${i === sel ? 'is-sel' : ''}`}
              onMouseEnter={() => setSel(i)}
              onClick={() => goto(h)}
            >
              <span className={`cmdk__kind chip chip--${h.kind === 'practical' ? 'practical' : 'theory'}`}>
                S{String(h.sessionNo).padStart(2, '0')}
              </span>
              <span className="cmdk__hit-body">
                <span className="cmdk__hit-title">{h.slideTitle}</span>
                <span className="cmdk__hit-snip">{h.snippet}</span>
              </span>
              <span className="cmdk__hit-sess dimmer">{h.sessionTitle}</span>
            </button>
          ))}
        </div>
        <div className="cmdk__foot">
          <span><kbd className="kbd">↑</kbd><kbd className="kbd">↓</kbd> navigate</span>
          <span><kbd className="kbd">↵</kbd> open</span>
          <span><kbd className="kbd">esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
