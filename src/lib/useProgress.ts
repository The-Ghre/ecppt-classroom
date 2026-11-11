import { useCallback, useEffect, useState } from 'react';
import type { Progress } from './progress';
import { read, setComplete as _setComplete, patch as _patch } from './progress';

/* A tiny store so progress stays in sync across the app without a library. */
const listeners = new Set<() => void>();
let snapshot: Progress = read();

function emit() { snapshot = read(); listeners.forEach((l) => l()); }

export function useProgress() {
  const [, force] = useState(0);
  useEffect(() => {
    const l = () => force((n) => n + 1);
    listeners.add(l);
    const onStorage = () => emit();
    window.addEventListener('storage', onStorage);
    return () => { listeners.delete(l); window.removeEventListener('storage', onStorage); };
  }, []);

  const setComplete = useCallback((id: string, done: boolean) => { _setComplete(id, done); emit(); }, []);
  const patch = useCallback((p: Partial<Progress>) => { _patch(p); emit(); }, []);

  return { progress: snapshot, setComplete, patch };
}
