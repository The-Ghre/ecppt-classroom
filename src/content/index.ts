import type { Session } from './types';
import { s1 } from './sessions/s1';
import { s2 } from './sessions/s2';
import { s3 } from './sessions/s3';
import { s4 } from './sessions/s4';
import { s5 } from './sessions/s5';
import { s6 } from './sessions/s6';
import { s7 } from './sessions/s7';
import { s8 } from './sessions/s8';
import { s9 } from './sessions/s9';
import { s10 } from './sessions/s10';
import { s11 } from './sessions/s11';
import { s12 } from './sessions/s12';
import { s13 } from './sessions/s13';
import { s14 } from './sessions/s14';
import { s15 } from './sessions/s15';

export const SESSIONS: Session[] = [
  s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15,
];

export const byId = (id: string): Session | undefined => SESSIONS.find((s) => s.id === id);
export const byNumber = (n: number): Session | undefined => SESSIONS.find((s) => s.number === n);

export function sessionsInWeek(week: number): Session[] {
  return SESSIONS.filter((s) => s.week === week);
}

export function adjacent(id: string): { prev?: Session; next?: Session } {
  const i = SESSIONS.findIndex((s) => s.id === id);
  return { prev: i > 0 ? SESSIONS[i - 1] : undefined, next: i < SESSIONS.length - 1 ? SESSIONS[i + 1] : undefined };
}

export function totalSlides(): number {
  return SESSIONS.reduce((n, s) => n + s.slides.length, 0);
}
