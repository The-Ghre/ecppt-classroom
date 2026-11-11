import type { Session } from '../types';

export const s6: Session = {
  id: 's6', number: 6, week: 2, kind: 'practical', day: 'Wednesday',
  dateISO: '2026-11-25', dateLabel: '25 Nov', durationHours: 4,
  topic: 'Assess a vulnerable web application',
  title: 'Lab · Web Assessment',
  outcome: 'Map an app, validate a vulnerability, and demonstrate impact with evidence.',
  summary: 'A lab application with suspicious behaviours, false leads, and an intended route to access.',
  stages: ['access'], domains: ['web', 'access'],
  sources: [
    { label: 'Web Application Penetration Testing notes', url: 'https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_WebAppPentest.pdf' },
  ],
  independentStudy: 'Retest one finding after a simulated fix and explain, in writing, whether the remediation is effective and how you verified it.',
  slides: [
    {
      id: 's6-title', kind: 'brief', tag: 'WEEK 2 · SESSION 06 · PRACTICAL',
      title: 'Assess a vulnerable web application',
      subtitle: 'Map, validate, demonstrate impact',
      lead: 'One app, several suspicious behaviours, a few false leads, and one intended route to initial access. Prove what is real.',
      blocks: [
        { type: 'figure', title: 'LAB BRIEF', rows: [
          { k: 'DURATION', v: '4 hours (practical)' },
          { k: 'OUTCOME', v: 'Two assessed findings with evidence, plus the intended foothold.', tone: 'valid' },
          { k: 'STAGE', v: 'Web → Initial Access', tone: 'attacker' },
          { k: 'ENVIRONMENT', v: 'Instructor-hosted lab application with synthetic data only.', tone: 'caution' },
        ] },
      ],
      notes: 'The false leads are deliberate. Students who validate carefully will separate them from the real path. Reward that discrimination.',
    },
    {
      id: 's6-scope', kind: 'brief', tag: 'AUTHORISED SCOPE',
      title: 'Rules of engagement',
      blocks: [
        { type: 'list', style: 'check', items: [
          { text: 'In scope: the assigned lab application and its discovered virtual hosts.', tone: 'valid' },
          { text: 'Permitted: mapping, manual validation, and controlled automation of discovered inputs.', tone: 'valid' },
          { text: 'Out of scope: the hosting infrastructure, other students\' instances, and the instructor console.', tone: 'attacker' },
          { text: 'Minimise data exposure: prove access to a record; do not exfiltrate the dataset.', tone: 'caution' },
        ] },
        { type: 'callout', tone: 'caution', title: 'Professional restraint is graded', md: 'Demonstrate the minimum necessary impact. Dumping an entire synthetic database is not extra credit — it is a note that you did not understand restraint.' },
      ],
      notes: 'Set the professional tone early: minimum necessary impact. It is assessed.',
    },
    {
      id: 's6-prereq', kind: 'brief', tag: 'PREREQUISITES',
      title: 'Before you start',
      blocks: [
        { type: 'list', items: [
          { text: 'Intercepting proxy configured and trusting the lab certificate.' },
          { text: 'Content-discovery wordlists ready; a known-bad path to calibrate soft-404s.' },
          { text: 'Your application-map template from Session 04.' },
          { text: 'An out-of-band callback host ready, for blind-injection proof.' },
        ] },
      ],
      notes: 'Verify proxies and callback setup before the clock starts. These eat time if left to mid-lab.',
    },
    {
      id: 's6-tasks', kind: 'tasks', tag: 'OBJECTIVES',
      title: 'Your tasks',
      blocks: [
        { type: 'steps', items: [
          { label: 'Map the application', text: 'Pages, endpoints, parameters, roles. Capture the requests that matter.', tone: 'evidence' },
          { label: 'Identify & validate manually', text: 'Pick promising inputs; confirm a vulnerability by hand before automating.', tone: 'caution' },
          { label: 'Extend with automation where justified', text: 'Only on a proven lead, to scale what you already demonstrated.', tone: 'evidence' },
          { label: 'Reach the intended foothold', text: 'Retrieve a designated synthetic record, or obtain the intended shell.', tone: 'attacker' },
          { label: 'Document impact & remediation', text: 'For each finding: reproduction, evidence, impact, and a root-cause fix.', tone: 'valid' },
        ] },
      ],
      notes: 'Keep them manual-first. The students who scan-first will produce findings they cannot defend in the debrief.',
    },
    {
      id: 's6-hints', kind: 'brief', tag: 'IF YOU STALL',
      title: 'Progressive hints',
      lead: 'Reveal only the next one. Hints guide method; they are not the route.',
      blocks: [
        { type: 'hints', items: [
          { label: 'Everything looks vulnerable.', md: 'Some behaviours are false leads. Calibrate: does the "error" change controllably with your input, or does it appear regardless? Only controllable differences are evidence.' },
          { label: 'I found an error but cannot prove impact.', md: 'Move from "it errored" to "I controlled it": boolean true/false pairs for SQL, an out-of-band callback for blind command injection, a reflection in an executing context for XSS.' },
          { label: 'I have a file upload but my file will not run.', md: 'Validate the filter first: what does it check — extension, content-type, magic bytes? Then find the minimum benign bypass. Where does an uploaded file actually land?' },
          { label: 'I am stuck on access control.', md: 'Compare what two different roles can reach for the same function. Try a lower-privileged session against a higher-privileged endpoint or another user\'s object id.' },
        ] },
      ],
      notes: 'Hints never name the specific vulnerable parameter or the intended CVE. They teach the discrimination skill.',
    },
    {
      id: 's6-submission', kind: 'brief', tag: 'DELIVERABLES',
      title: 'What to submit',
      blocks: [
        { type: 'list', style: 'check', items: [
          'Two assessed findings, each with request-and-response evidence and a clear impact statement.',
          'A note identifying at least one false lead and why you dismissed it.',
          'An updated attack-path diagram showing the route to the foothold.',
          'A root-cause remediation and a retest plan for each finding.',
        ] },
        { type: 'callout', tone: 'valid', title: 'Evidence is request/response', md: 'For web findings, the evidence is the captured request and the server\'s response. A screenshot of a browser is weaker than the raw exchange that proves the server\'s behaviour.' },
      ],
      notes: 'Insist on request/response evidence. It is the reproducible artefact an assessor can re-run.',
    },
    {
      id: 's6-debrief', kind: 'debrief', tag: 'DEBRIEF',
      title: 'Debrief & reflection',
      blocks: [
        { type: 'list', style: 'plain', items: [
          'Which result turned out to be a false lead — and what finally revealed it?',
          'What was the single piece of evidence that proved impact?',
          'How would you verify that a proposed fix actually works?',
          'Which finding would most alarm the business, and why?',
        ] },
        { type: 'callout', tone: 'evidence', title: 'Independent study', md: 'Retest one finding after a simulated fix. Explain in writing whether the remediation is effective and exactly how you verified it.' },
      ],
      notes: 'Draw out the false-lead discrimination and the retest skill. Preview Week 3: once you are on the host, how do you become root?',
    },
  ],
};
