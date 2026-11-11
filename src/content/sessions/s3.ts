import type { Session } from '../types';

export const s3: Session = {
  id: 's3', number: 3, week: 1, kind: 'practical', day: 'Wednesday',
  dateISO: '2026-11-18', dateLabel: '18 Nov', durationHours: 4,
  topic: 'Discover and establish access',
  title: 'Lab · Discover & Establish Access',
  outcome: 'Discover services, validate a weakness, and obtain a documented low-privilege foothold.',
  summary: 'A small lab subnet with several services and one intended initial-access path.',
  stages: ['recon', 'access'], domains: ['recon', 'access'],
  sources: [
    { label: 'Network testing material (eJPT)', url: 'https://github.com/Dragkob/eJPT', note: 'plus instructor methodology and evidence templates' },
    { label: 'Primary eCPPT repository', url: 'https://github.com/Dragkob/eCPPT' },
  ],
  independentStudy: 'Repeat the enumeration without the worksheet and finalise your personal service-enumeration checklist.',
  slides: [
    {
      id: 's3-title', kind: 'brief', tag: 'WEEK 1 · SESSION 03 · PRACTICAL',
      title: 'Discover & establish access',
      subtitle: 'Your first foothold, end to end',
      lead: 'Four hours, one subnet, one intended way in. Everything you proved on paper this week, now on live (synthetic) targets.',
      blocks: [
        { type: 'figure', title: 'LAB BRIEF', rows: [
          { k: 'DURATION', v: '4 hours (practical)' },
          { k: 'OUTCOME', v: 'Obtain and document one reproducible low-privilege foothold.', tone: 'valid' },
          { k: 'STAGES', v: 'Reconnaissance → Initial Access', tone: 'attacker' },
          { k: 'ENVIRONMENT', v: 'Instructor-controlled lab subnet. All hosts and data are synthetic.', tone: 'caution' },
        ] },
      ],
      notes: 'Keep the room calm and methodical. Reward evidence discipline over speed. The one who documents well beats the one who roots fast with no notes.',
    },
    {
      id: 's3-scope', kind: 'brief', tag: 'AUTHORISED SCOPE',
      title: 'Rules of engagement',
      lead: 'Read this before you touch a keyboard. Scope is your permission and your protection.',
      blocks: [
        { type: 'list', style: 'check', items: [
          { text: 'In scope: the assigned lab subnet only (your instructor will give the range).', tone: 'valid' },
          { text: 'Permitted: discovery, enumeration, validation, and exploitation of the intended path.', tone: 'valid' },
          { text: 'Out of scope: any address outside the range, the instructor host, and other students\' sessions.', tone: 'attacker' },
          { text: 'Prohibited: denial-of-service, destructive actions, and lockout of lab accounts by reckless brute force.', tone: 'attacker' },
        ] },
        { type: 'callout', tone: 'caution', title: 'Stop condition', md: 'If a target becomes unresponsive, stop and tell the instructor. A broken lab target teaches no-one — and in a real engagement, a downed host is an incident.' },
      ],
      notes: 'State the subnet verbally; do not bake ranges into the deployed material. Enforce the stop condition.',
    },
    {
      id: 's3-prereq', kind: 'brief', tag: 'PREREQUISITES',
      title: 'Before you start',
      blocks: [
        { type: 'list', items: [
          { text: 'Your attacker workstation reachable to the lab subnet, tools tested (`nmap`, `smbclient`, `enum4linux-ng`, a listener).' },
          { text: 'Your evidence template open: host inventory, service matrix, command log, screenshots folder.' },
          { text: 'Your personal service-enumeration checklist from Session 02\'s independent study.' },
          { text: 'A listener ready for a reverse connection, and your attacker IP noted.' },
        ] },
      ],
      notes: 'Check everyone can reach the subnet and has a listener before the clock starts. Lost setup time is the biggest killer of lab outcomes.',
    },
    {
      id: 's3-tasks', kind: 'tasks', tag: 'OBJECTIVES',
      title: 'Your tasks',
      lead: 'Work the lifecycle in order. Each task produces a piece of evidence.',
      blocks: [
        { type: 'steps', items: [
          { label: 'Identify live hosts & services', text: 'Host discovery, then targeted service/version scans. Produce the service matrix.', tone: 'evidence' },
          { label: 'Service-specific enumeration', text: 'Interrogate the most promising services. Harvest users, shares, versions.', tone: 'evidence' },
          { label: 'Select & validate a weakness', text: 'Choose one path, state its prerequisites, and confirm them before exploiting.', tone: 'caution' },
          { label: 'Obtain a low-privilege foothold', text: 'Land a shell. Then run id, hostname, uname before anything else.', tone: 'attacker' },
          { label: 'Confirm context', text: 'Record the host, the account, and the privilege level you hold.', tone: 'valid' },
          { label: 'Document & recommend', text: 'Write one reproducible finding with evidence, impact, and a remediation.', tone: 'valid' },
        ] },
      ],
      notes: 'Discourage jumping to task 4. The matrix (task 1) is what makes the foothold targeted instead of lucky.',
    },
    {
      id: 's3-hints', kind: 'brief', tag: 'IF YOU STALL',
      title: 'Progressive hints',
      lead: 'Reveal only the next one you need. Hints point at method — they are not the answer.',
      blocks: [
        { type: 'hints', items: [
          { label: 'My scans feel empty.', md: 'Did you scan all ports (`-p-`), not just the top 1,000? Did you consider UDP for SNMP/DNS? Re-check your interface and route to the subnet.' },
          { label: 'I have services but no lead.', md: 'Enumerate each one *as its protocol*. For SMB, try a null session and list shares/users. For HTTP, discover content and identify the technology and version.' },
          { label: 'I have a lead but no access.', md: 'A username is not access; a readable share might be. Look inside anything you can read for credentials or configuration. Then ask: where else might that credential work?' },
          { label: 'I think I found the path but the exploit fails.', md: 'List the exploit\'s prerequisites and verify each one against your evidence. Most failures are an unmet prerequisite, not broken code.' },
        ] },
      ],
      notes: 'Encourage students to spend real effort before each reveal. The struggle is where the learning is. Hints never contain credentials or the intended CVE.',
    },
    {
      id: 's3-submission', kind: 'brief', tag: 'DELIVERABLES',
      title: 'What to submit',
      blocks: [
        { type: 'list', style: 'check', items: [
          'Network inventory and service matrix (host × port × service × version).',
          'An annotated test log — what you ran, what it returned, and what you concluded.',
          'One reproducible finding: the path, the evidence, the demonstrated access, and a remediation.',
          'A note of what failed and why — your dead ends are evidence too.',
        ] },
        { type: 'callout', tone: 'valid', title: 'Grading leans on reasoning', md: 'A clean, reproducible finding with honest evidence scores higher than an undocumented root. If an assessor cannot reproduce it from your notes, it is not yet a finding.' },
      ],
      notes: 'Remind them the submission is assessed on reproducibility and reasoning, not just success.',
    },
    {
      id: 's3-debrief', kind: 'debrief', tag: 'DEBRIEF',
      title: 'Debrief & reflection',
      lead: 'We regroup for the last 30 minutes. Come ready to answer these.',
      blocks: [
        { type: 'list', style: 'plain', items: [
          'Which single piece of evidence changed your plan — and when?',
          'What failed, and what did the failure tell you?',
          'What configuration change would have prevented the access you demonstrated?',
          'If you had one more hour, what would you investigate next, and why?',
        ] },
        { type: 'callout', tone: 'evidence', title: 'Independent study', md: 'Repeat the enumeration without this worksheet and finalise your personal checklist. You will reuse it every week — and in the capstone.' },
      ],
      notes: 'Draw out the remediation question especially. Tie every demonstrated access back to a root cause. End by previewing Week 2: web applications.',
    },
  ],
};
