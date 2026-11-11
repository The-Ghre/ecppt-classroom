import type { Session } from '../types';

export const s15: Session = {
  id: 's15', number: 15, week: 5, kind: 'practical', day: 'Wednesday',
  dateISO: '2026-12-16', dateLabel: '16 Dec', durationHours: 4,
  topic: 'Integrated capstone',
  title: 'Capstone · Integrated Assessment',
  outcome: 'Complete a full assessment chain and communicate it with evidence.',
  summary: 'A small enterprise lab: an exposed service, a foothold, a local escalation, and an internal AD objective.',
  stages: ['recon', 'access', 'escalate', 'pivot', 'ad', 'impact'],
  domains: ['recon', 'access', 'web', 'exploit', 'devel', 'ad'],
  sources: [
    { label: 'Active Directory notes (lateral movement sections)', url: 'https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_ADPentest.pdf' },
    { label: 'INE eCPPT objectives', url: 'https://ine.com/security/certifications/ecppt-certification' },
  ],
  independentStudy: 'After the debrief, write a one-page retrospective: the decision that saved the most time, the assumption that cost you the most, and the single skill you will drill before a real engagement.',
  slides: [
    {
      id: 's15-title', kind: 'brief', tag: 'WEEK 5 · SESSION 15 · CAPSTONE',
      title: 'Integrated capstone assessment',
      subtitle: 'The whole chain, under the clock, with a report at the end',
      lead: 'One small enterprise lab. Discover, access, escalate, pivot, assess the domain, reach the objective — and write it up so a client could act on it.',
      blocks: [
        { type: 'figure', title: 'CAPSTONE BRIEF', rows: [
          { k: 'DURATION', v: '4 hours (practical), including reporting and debrief.' },
          { k: 'OUTCOME', v: 'A complete, evidenced attack path and a concise professional report.', tone: 'valid' },
          { k: 'STAGES', v: 'Recon → Access → Escalate → Pivot → Directory → Impact', tone: 'attacker' },
          { k: 'ENVIRONMENT', v: 'Instructor-controlled enterprise lab; everything synthetic.', tone: 'caution' },
        ] },
      ],
      notes: 'This is the integration of everything. Keep the room focused on evidence and time management. The report is assessed, not just the root.',
    },
    {
      id: 's15-scenario', kind: 'brief', tag: 'SCENARIO',
      title: 'The engagement',
      lead: 'A fictional company, one line of scope, and a designated objective inside the domain.',
      blocks: [
        { type: 'prose', md: 'The lab contains an exposed application or service at the edge, a foothold opportunity, at least one local escalation path, and an internal Active Directory environment with a designated objective. Your task is to connect them into one evidenced chain and demonstrate the business impact — then stop, and report.' },
        { type: 'callout', tone: 'caution', title: 'This is an assessment, not a race', md: 'Reaching the objective fast but undocumented is a weaker result than a clear, reproducible partial chain. Assessors grade the reasoning and evidence as much as the access.' },
      ],
      notes: 'Reiterate: documented reasoning and evidence are graded alongside technical success. Discourage the race mentality.',
    },
    {
      id: 's15-scope', kind: 'brief', tag: 'AUTHORISED SCOPE',
      title: 'Rules of engagement',
      blocks: [
        { type: 'list', style: 'check', items: [
          { text: 'In scope: the assigned enterprise lab environment only.', tone: 'valid' },
          { text: 'Permitted: the full chain — discovery through to the designated objective — with evidence at each step.', tone: 'valid' },
          { text: 'Out of scope: other students’ environments, the lab infrastructure, and any identity not part of your domain.', tone: 'attacker' },
          { text: 'Minimum necessary impact; restore anything you modify; respect the stop conditions.', tone: 'caution' },
        ] },
        { type: 'callout', tone: 'caution', title: 'Stop condition', md: 'If a target becomes unstable, stop and tell the instructor. Document what you had — a downed target ends your access and, in the real world, is an incident.' },
      ],
      notes: 'Enforce scope and stop conditions as in a real engagement. Professionalism is part of the assessment.',
    },
    {
      id: 's15-timing', kind: 'brief', tag: 'SUGGESTED TIMING',
      title: 'How to spend the four hours',
      lead: 'A guide, not a rule. Adjust to your plan — but protect the reporting time.',
      blocks: [
        { type: 'table', head: ['Activity', 'Minutes'], align: ['left', 'right'], rows: [
          ['Scope briefing and planning', '15'],
          ['Independent assessment', '150'],
          ['Evidence organisation and concise report', '45'],
          ['Technical debrief and instructor feedback', '30'],
          ['Total', '240'],
        ], caption: 'Protect the final 75 minutes. A great chain with no report is an incomplete assessment.' },
        { type: 'callout', tone: 'valid', md: 'Set a hard alarm for the start of reporting. The most common capstone failure is running assessment into the reporting window and submitting nothing coherent.' },
      ],
      notes: 'Hold the room to the reporting window. Announce it, and announce the alarm time. This single habit lifts pass rates.',
    },
    {
      id: 's15-tasks', kind: 'tasks', tag: 'REQUIRED OUTCOMES',
      title: 'What you must demonstrate',
      blocks: [
        { type: 'steps', items: [
          { label: 'Discover & enumerate', text: 'Map the environment; produce the service matrix that drives your plan.', tone: 'evidence' },
          { label: 'Validate initial access', text: 'Land a documented foothold through a validated weakness.', tone: 'attacker' },
          { label: 'Escalate where required', text: 'Demonstrate local escalation where the intended path needs it.', tone: 'attacker' },
          { label: 'Investigate the domain', text: 'Pivot in, enumerate AD, and demonstrate lateral movement.', tone: 'violet' },
          { label: 'Reach the objective', text: 'Achieve the designated privileged objective with minimum-necessary impact.', tone: 'valid' },
          { label: 'Explain the whole path', text: 'Evidence at each hop, business impact, and remediation.', tone: 'valid' },
        ] },
      ],
      notes: 'These map one-to-one onto the attack chain. Students should recognise every stage from the weekly labs.',
    },
    {
      id: 's15-checkpoint', kind: 'brief', tag: 'IF YOU STALL EARLY',
      title: 'Checkpoint support',
      lead: 'The assessment is of the whole chain — a single early blocker should not cost you every later skill.',
      blocks: [
        { type: 'hints', items: [
          { label: 'I cannot find the edge weakness.', md: 'Return to method: have you enumerated every service as its protocol, and prioritised by evidence? If you remain stuck past the planning budget, request the foothold checkpoint so the later stages can still be assessed.' },
          { label: 'I have a foothold but cannot escalate.', md: 'Re-run your enumeration checklist and triage by feasibility. Ask the recurring question of every writable resource. A checkpoint is available if you remain blocked — the escalation is only one of six outcomes.' },
          { label: 'I cannot get the pivot working.', md: 'Isolate the layer: reachability, then name resolution, then authentication. If the plumbing defeats you, request the internal-access checkpoint so your AD skills can still be demonstrated.' },
        ] },
        { type: 'callout', tone: 'caution', title: 'Checkpoints are recorded, not penalised to zero', md: 'Taking a checkpoint is noted and factored in, so the later skills can be assessed fairly. A fully self-directed chain scores highest, but a checkpoint-assisted demonstration of escalation and AD beats an early dead end with nothing after it.' },
      ],
      notes: 'Provide a foothold to students who stall early so later skills can still be assessed. Record the assistance given per the brief.',
    },
    {
      id: 's15-submission', kind: 'brief', tag: 'DELIVERABLE',
      title: 'The report',
      lead: 'One concise document. This is what is assessed.',
      blocks: [
        { type: 'list', style: 'check', items: [
          'Executive summary — risk and the attack narrative in plain business language.',
          'Network diagram — the environment and the route you took.',
          'Attack narrative — the chain, hop by hop, with the evidence for each.',
          'Technical findings — reproduction, impact, and root-cause remediation per issue.',
          'Prioritised remediation — what to fix first, and why.',
        ] },
        { type: 'callout', tone: 'valid', title: 'Concise beats comprehensive', md: 'A tight report that a reader can act on outscores a sprawling log dump. Every finding earns its place with evidence and a fix.' },
      ],
      notes: 'The report structure mirrors Session 14. Grade on clarity, evidence, and actionable remediation.',
    },
    {
      id: 's15-debrief', kind: 'debrief', tag: 'DEBRIEF',
      title: 'Technical debrief & where to go next',
      lead: 'The last 30 minutes. We walk the intended path together and reflect.',
      blocks: [
        { type: 'list', style: 'plain', items: [
          'Which decisions saved you the most time?',
          'Which assumption turned out to be wrong — and when did you notice?',
          'What was the single most effective remediation point in the whole chain?',
          'What is the one skill you will drill before a real engagement?',
        ] },
        { type: 'callout', tone: 'valid', title: 'After the course', md: 'Write a one-page retrospective: the decision that saved the most time, the assumption that cost the most, and the skill you will practise next. Keep your checklists and ledgers — they are the start of your professional toolkit.' },
      ],
      notes: 'Close the course on reflection and forward direction. Recommend individual further practice based on each student’s capstone and coverage review.',
    },
  ],
};
