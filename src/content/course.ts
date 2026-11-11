/* Structural metadata for the course — weeks, exam domains, grading,
   the attack-chain stages, and headline facts. Kept distinct from the
   session content so the roadmap and legend render from one source. */

import type { Week } from './types';

export const COURSE = {
  code: 'eCPPT',
  title: 'Certified Professional Penetration Tester',
  org: 'CODED',
  cohort: '2026',
  startLabel: '15 Nov 2026',
  endLabel: '16 Dec 2026',
  dateRange: '15 November – 16 December 2026',
  sessions: 15,
  theoryHours: 30,
  practicalHours: 20,
  independentStudy: '3–5 hours per week',
  sourceChecked: '11 November 2026',
  repo: 'https://github.com/Dragkob/eCPPT',
  objectivesUrl: 'https://ine.com/security/certifications/ecppt-certification',
};

export const WEEKS: Week[] = [
  { n: 1, title: 'Methodology, Reconnaissance & Initial Access', outcome: 'Turn discovery results into a justified testing plan and establish a documented foothold.', dateRange: '15–18 Nov' },
  { n: 2, title: 'Web Application Penetration Testing', outcome: 'Map an application, validate a web vulnerability, and separate scanner output from demonstrated impact.', dateRange: '22–25 Nov' },
  { n: 3, title: 'Privilege Escalation & Exploit Fundamentals', outcome: 'Identify a plausible local escalation path, validate its prerequisites, and explain basic exploit behaviour.', dateRange: '29 Nov–2 Dec' },
  { n: 4, title: 'Pivoting & Active Directory Enumeration', outcome: 'Investigate an internal segment through an existing foothold and identify an evidenced AD attack path.', dateRange: '6–9 Dec' },
  { n: 5, title: 'AD Lateral Movement & Integrated Assessment', outcome: 'Connect individual findings into a complete, evidenced attack path and explain its business impact.', dateRange: '13–16 Dec' },
];

/* INE's published exam domains — these are exam weights, NOT the course
   grading scheme (kept explicitly separate per the brief). */
export const EXAM_DOMAINS = [
  { id: 'recon', label: 'Information Gathering & Reconnaissance', weight: 10, coverage: 'Week 1; reinforced in later labs' },
  { id: 'access', label: 'Initial Access', weight: 15, coverage: 'Weeks 1–2; reinforced in the capstone' },
  { id: 'web', label: 'Web Application Penetration Testing', weight: 15, coverage: 'Week 2' },
  { id: 'exploit', label: 'Exploitation & Post-Exploitation', weight: 25, coverage: 'Weeks 1–3; integrated in Weeks 4–5' },
  { id: 'devel', label: 'Exploit Development', weight: 5, coverage: 'Week 3 and independent study' },
  { id: 'ad', label: 'Active Directory Penetration Testing', weight: 30, coverage: 'Weeks 4–5' },
] as const;

/* Instructor-selected course assessment weights (distinct from exam domains). */
export const GRADING = [
  { id: 'quiz', label: 'Weekly quizzes & reasoning exercises', weight: 10 },
  { id: 'labs', label: 'Practical submissions (Weeks 1–4)', weight: 40 },
  { id: 'cap-exec', label: 'Capstone technical execution', weight: 30 },
  { id: 'cap-report', label: 'Capstone evidence, explanation & remediation', weight: 20 },
] as const;

/* The attack chain — the organising spine of the console. */
export const STAGES = [
  { id: 'recon', n: 1, label: 'Recon', full: 'Reconnaissance', tone: 'evidence', blurb: 'Discover hosts and exposed services; build the inventory.' },
  { id: 'access', n: 2, label: 'Access', full: 'Initial Access', tone: 'attacker', blurb: 'Validate an entry point and land a low-privilege foothold.' },
  { id: 'escalate', n: 3, label: 'Escalate', full: 'Privilege Escalation', tone: 'attacker', blurb: 'Turn a foothold into administrative control of the host.' },
  { id: 'pivot', n: 4, label: 'Pivot', full: 'Pivoting', tone: 'cyan', blurb: 'Reach the internal segment through the compromised host.' },
  { id: 'ad', n: 5, label: 'Directory', full: 'Active Directory', tone: 'violet', blurb: 'Enumerate the domain and validate an identity-based path.' },
  { id: 'impact', n: 6, label: 'Impact', full: 'Objective & Impact', tone: 'valid', blurb: 'Reach the privileged objective; evidence the business impact.' },
] as const;

export const TONE_META: Record<string, { label: string; color: string }> = {
  evidence: { label: 'Evidence', color: 'var(--evidence)' },
  attacker: { label: 'Attacker', color: 'var(--attacker)' },
  valid: { label: 'Validated', color: 'var(--valid)' },
  caution: { label: 'Caution', color: 'var(--caution)' },
  cyan: { label: 'Network', color: 'var(--cyan)' },
  violet: { label: 'Identity', color: 'var(--violet)' },
  neutral: { label: 'Note', color: 'var(--muted)' },
};

/* The five questions repeated throughout the course. */
export const FIVE_QUESTIONS = [
  'What evidence supports this test?',
  'What conditions must be true for it to work?',
  'What does the result prove?',
  'What should we investigate next?',
  'What change would address the root cause?',
];
