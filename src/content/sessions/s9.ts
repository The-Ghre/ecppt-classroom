import type { Session } from '../types';

export const s9: Session = {
  id: 's9', number: 9, week: 3, kind: 'practical', day: 'Wednesday',
  dateISO: '2026-12-02', dateLabel: '2 Dec', durationHours: 4,
  topic: 'Escalate and explain',
  title: 'Lab · Escalate & Explain',
  outcome: 'Validate Linux and Windows escalation paths and analyse a supplied exploit.',
  summary: 'Two host exercises and one short exploit-analysis exercise, with root-cause recording.',
  stages: ['escalate'], domains: ['exploit', 'devel'],
  sources: [
    { label: 'Linux privilege escalation', url: 'https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_Privesc_Linux.pdf' },
    { label: 'Windows privilege escalation', url: 'https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_Privesc_Windows.pdf' },
    { label: 'PowerShell notes', url: 'https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_PowerShell.pdf' },
  ],
  independentStudy: 'Complete the debugger exercise, and refine your separate Linux and Windows enumeration checklists so each check names the escalation it would enable.',
  slides: [
    {
      id: 's9-title', kind: 'brief', tag: 'WEEK 3 · SESSION 09 · PRACTICAL',
      title: 'Escalate & explain',
      subtitle: 'Two hosts, one exploit analysis',
      lead: 'Become root on a Linux host, SYSTEM on a Windows host, and explain a supplied exploit’s assumptions. Then record the root cause of each.',
      blocks: [
        { type: 'figure', title: 'LAB BRIEF', rows: [
          { k: 'DURATION', v: '4 hours (practical)' },
          { k: 'OUTCOME', v: 'Two validated escalation findings and a short exploit-analysis worksheet.', tone: 'valid' },
          { k: 'STAGE', v: 'Privilege Escalation + exploit foundations', tone: 'attacker' },
          { k: 'FORMAT', v: 'Linux host · Windows host · exploit analysis.', tone: 'caution' },
        ] },
      ],
      notes: 'Three distinct exercises. Budget time so nobody spends all four hours on the Linux box. Root cause is as important as root.',
    },
    {
      id: 's9-scope', kind: 'brief', tag: 'AUTHORISED SCOPE',
      title: 'Rules of engagement',
      blocks: [
        { type: 'list', style: 'check', items: [
          { text: 'In scope: your two assigned hosts and the supplied exploit sample only.', tone: 'valid' },
          { text: 'Permitted: local enumeration, validated escalation, and reading/annotating the PoC.', tone: 'valid' },
          { text: 'Out of scope: other students\' hosts, the network beyond your assigned hosts, and the instructor console.', tone: 'attacker' },
          { text: 'Restore any privileged script or file you modify to its original state.', tone: 'caution' },
        ] },
        { type: 'callout', tone: 'caution', title: 'Run the supplied exploit only in the lab', md: 'The exploit-analysis sample is for reading and, if directed, running against the instructor\'s prepared target only. Analysis is the objective — not weaponisation.' },
      ],
      notes: 'Keep the exploit sample contained to the prepared target. The exercise is comprehension, not deployment.',
    },
    {
      id: 's9-prereq', kind: 'brief', tag: 'PREREQUISITES',
      title: 'Before you start',
      blocks: [
        { type: 'list', items: [
          { text: 'A foothold shell on each assigned host (provided or carried from an earlier lab).' },
          { text: 'Your Linux and Windows enumeration checklists from Sessions 07–08.' },
          { text: 'A debugger set up for the prepared crash, if attempting the optional deeper analysis.' },
          { text: 'Your evidence template with a "root cause" field per finding.' },
        ] },
      ],
      notes: 'Everyone needs a starting shell on both hosts. Hand out footholds if needed so the time is spent on escalation.',
    },
    {
      id: 's9-tasks', kind: 'tasks', tag: 'OBJECTIVES',
      title: 'Your tasks',
      blocks: [
        { type: 'steps', items: [
          { label: 'Linux: enumerate & escalate', text: 'Find the intended path, validate its prerequisites, and obtain root.', tone: 'attacker' },
          { label: 'Windows: enumerate & escalate', text: 'Find a different intended path, validate it, and obtain SYSTEM.', tone: 'attacker' },
          { label: 'Spot the misleading finding', text: 'Each host has at least one flagged candidate that does not validate. Identify it.', tone: 'caution' },
          { label: 'Analyse the supplied exploit', text: 'List its assumptions; if directed, run it against the prepared target and explain the result.', tone: 'evidence' },
          { label: 'Record root causes', text: 'For each successful path, the misconfiguration and the corrective action.', tone: 'valid' },
        ] },
      ],
      notes: 'The misleading-finding task trains triage. The students who act on every scanner flag will waste the session.',
    },
    {
      id: 's9-hints', kind: 'brief', tag: 'IF YOU STALL',
      title: 'Progressive hints',
      lead: 'Reveal the next one only. Hints point at method, never the specific binary or CVE.',
      blocks: [
        { type: 'hints', items: [
          { label: 'My enumeration script flags dozens of things.', md: 'Triage by feasibility and impact. For each flag, ask: can I actually act on this, and what would it give me? Validate one before touching the next.' },
          { label: 'Linux: I see a promising file but cannot use it.', md: 'Ask the recurring question: who trusts this resource, and can I change it? Check write access along the whole chain a privileged process depends on.' },
          { label: 'Windows: I have a privilege/service lead but no SYSTEM.', md: 'Confirm the whole chain: can you modify the binary/path the SYSTEM service runs, and can you restart it (or wait for a restart)? Check permissions with icacls.' },
          { label: 'The supplied exploit does nothing.', md: 'Work the assumptions list in order: version/patch level, hardcoded environment values, payload match, mitigations, delivery. Which one have you not matched?' },
        ] },
      ],
      notes: 'Hints reinforce the frameworks from Sessions 07–08 without giving away the planted path on either host.',
    },
    {
      id: 's9-submission', kind: 'brief', tag: 'DELIVERABLES',
      title: 'What to submit',
      blocks: [
        { type: 'list', style: 'check', items: [
          'Two escalation findings (Linux root, Windows SYSTEM) each with validated prerequisites and evidence.',
          'The misleading finding on each host, and why it failed validation.',
          'A brief exploit-analysis worksheet: the assumptions you identified and the observed result.',
          'A root cause and corrective action for each successful escalation.',
        ] },
        { type: 'callout', tone: 'valid', md: 'Evidence of escalation is the before/after context: `id` as the low-privilege user, then as root; `whoami` as the user, then as SYSTEM. Capture both.' },
      ],
      notes: 'Before/after context is the cleanest escalation evidence. Insist on it.',
    },
    {
      id: 's9-debrief', kind: 'debrief', tag: 'DEBRIEF',
      title: 'Debrief & reflection',
      blocks: [
        { type: 'list', style: 'plain', items: [
          'Which prerequisite mattered most on each host?',
          'Why did the misleading finding fail to validate?',
          'How did you confirm you had truly elevated — what was the evidence?',
          'For the supplied exploit: which assumption was hardest to match, and why?',
        ] },
        { type: 'callout', tone: 'evidence', title: 'Independent study', md: 'Complete the debugger exercise, and refine your checklists so each check names the escalation it would enable.' },
      ],
      notes: 'Draw out the triage and assumption-matching lessons. Preview Week 4: now you are root — how do you reach the internal network and the domain?',
    },
  ],
};
