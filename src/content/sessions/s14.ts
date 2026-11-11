import type { Session } from '../types';

export const s14: Session = {
  id: 's14', number: 14, week: 5, kind: 'theory', day: 'Tuesday',
  dateISO: '2026-12-15', dateLabel: '15 Dec', durationHours: 3,
  topic: 'Integrate the workflow and prepare for assessment',
  title: 'Integrated Methodology & Reporting',
  outcome: 'Produce an assessment plan and identify remaining preparation gaps.',
  summary: 'The complete workflow, prioritisation, systematic troubleshooting, records, findings, and reporting.',
  stages: ['recon', 'access', 'escalate', 'pivot', 'ad', 'impact'], domains: ['exploit', 'ad'],
  sources: [
    { label: 'Active Directory notes', url: 'https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_ADPentest.pdf' },
    { label: 'INE eCPPT objectives', url: 'https://ine.com/security/certifications/ecppt-certification' },
  ],
  independentStudy: 'Write your personal capstone plan: your intended order of operations, your weakest domain, the troubleshooting checklist you will keep open, and the three things you will do differently from your last lab.',
  slides: [
    {
      id: 's14-title', kind: 'title', tag: 'WEEK 5 · SESSION 14 · THEORY',
      title: 'Integrate the workflow and prepare for assessment',
      subtitle: 'The whole method, time management, and professional reporting',
      lead: 'You have the pieces. This session assembles them into one repeatable workflow — and into a report a client can act on.',
      blocks: [
        { type: 'figure', title: 'SESSION BRIEF', rows: [
          { k: 'OUTCOME', v: 'Produce an assessment plan and identify your remaining preparation gaps.', tone: 'evidence' },
          { k: 'STAGE', v: 'The complete chain — recon to impact to report', tone: 'valid' },
          { k: 'EXIT CHECK', v: 'A personal assessment plan and an identified priority for further practice.', tone: 'valid' },
        ] },
      ],
      notes: 'This is the integration session. Less new technique, more assembling and reporting. Set up the capstone mindset.',
    },
    {
      id: 's14-scenario', kind: 'scenario', tag: 'SCENARIO',
      title: 'Four hours, one network, a report at the end',
      lead: 'Tomorrow’s capstone gives you a whole enterprise lab and a clock. Where do you spend your time, and what do you leave with?',
      blocks: [
        { type: 'prose', md: 'Success is no longer a single root. It is a complete, evidenced path from the edge to the objective, explained so that a reader who was not there can understand the risk and act on it. That requires a plan, disciplined records, and the judgement to abandon unproductive paths quickly.' },
        { type: 'callout', tone: 'caution', title: 'The report is the deliverable', md: 'In a real engagement, the client never sees your terminal. They see your report. An unreported finding has no value; a well-reported medium finding can be worth more than an undocumented critical one.' },
      ],
      notes: 'Reframe success as a reported chain, not a root shell. This is the professional pivot of the whole course.',
    },
    {
      id: 's14-objectives', kind: 'objectives', tag: 'OBJECTIVES',
      title: 'What you will be able to do',
      blocks: [
        { type: 'list', style: 'check', items: [
          'Walk the full workflow from discovery to privileged access as one loop.',
          'Prioritise paths and cut losses on unproductive ones under time pressure.',
          'Troubleshoot systematically across network, auth, exploit, and privilege layers.',
          'Maintain host, credential, and evidence ledgers an assessor could follow.',
          'Write a technical finding: reproduction, impact, remediation.',
          'Summarise risk and the attack narrative for a non-technical reader.',
        ] },
      ],
    },
    {
      id: 's14-workflow', kind: 'diagram', tag: 'CONCEPT · 01',
      title: 'The complete workflow, as one loop',
      lead: 'Every stage feeds the next, and findings send you back. You have run each piece — now see the whole.',
      blocks: [
        { type: 'diagram', kind: 'attack-chain', active: 0, caption: 'Step through the full chain. Each stage produced evidence that justified the next — that trail is your report.' },
        { type: 'callout', tone: 'evidence', md: 'The chain is not linear in practice. A credential found at escalation reopens enumeration; a dead end at AD sends you back to look for another host. The loop from Session 01 operates at every scale.' },
      ],
      notes: 'Walk the full interactive chain once more, emphasising the loops back. This is the mental model for the capstone.',
    },
    {
      id: 's14-time', kind: 'concept', tag: 'CONCEPT · 02',
      title: 'Prioritisation and time management',
      lead: 'The capstone is won by what you choose not to do.',
      blocks: [
        { type: 'steps', items: [
          { label: 'Breadth before depth', text: 'Map the whole surface before committing to one path, so you choose the best, not the first.', tone: 'evidence' },
          { label: 'Timebox every path', text: 'Decide in advance how long a path gets before you abandon it. Respect the box.', tone: 'caution' },
          { label: 'Bank partial wins', text: 'Document each confirmed step as you go, so a later dead end does not erase your progress.', tone: 'valid' },
        ] },
        { type: 'callout', tone: 'caution', title: 'The sunk-cost trap', md: 'The most common capstone failure is spending two hours forcing one path because you already invested in it. Timebox, and move on. A documented foothold plus a pivot beats an undocumented obsession.' },
      ],
      notes: 'Timeboxing is the single most valuable exam skill. Make them pre-commit to limits in their plan.',
    },
    {
      id: 's14-troubleshoot', kind: 'concept', tag: 'CONCEPT · 03',
      title: 'Systematic troubleshooting',
      lead: 'When something fails, isolate the layer before you change anything.',
      blocks: [
        { type: 'table', head: ['Layer', 'Symptom', 'First check'], rows: [
          ['Network', 'No response at all', 'Route/port reachable (through the pivot)?'],
          ['Name resolution', 'Works by IP, not by name', 'Resolving on the correct resolver?'],
          ['Authentication', 'Reaches but rejects', 'Right credential, right form, right account?'],
          ['Exploit', 'Runs but no result', 'Assumptions matched (version, offsets, env)?'],
          ['Privilege', 'Access but not enough', 'Which boundary did I actually cross?'],
        ] },
        { type: 'callout', tone: 'evidence', md: 'Keep this table open during the capstone. Naming the layer first turns a panicked flail into a two-minute diagnosis.' },
      ],
      notes: 'This troubleshooting table consolidates every lab’s hard-won lessons. Encourage them to keep it literally open.',
    },
    {
      id: 's14-records', kind: 'concept', tag: 'CONCEPT · 04',
      title: 'Assessment records',
      lead: 'Three ledgers that make a report writable — and reproducible.',
      blocks: [
        { type: 'list', items: [
          { text: '**Host ledger** — every host: address, role, access achieved, OS, notes.' },
          { text: '**Credential ledger** — every secret: account, where found, where it works, privilege.' },
          { text: '**Evidence ledger** — every proof: timestamped commands, outputs, screenshots, linked to findings.' },
        ] },
        { type: 'callout', tone: 'valid', title: 'Write the report as you go', md: 'You cannot reconstruct a four-hour engagement from memory at the end. Capture evidence at the moment it happens — the ledgers *are* the draft report.' },
      ],
      notes: 'Record-as-you-go is the discipline that separates passing from failing capstones. The ledgers prevent the end-of-day amnesia.',
    },
    {
      id: 's14-findings', kind: 'concept', tag: 'CONCEPT · 05',
      title: 'Writing a technical finding',
      lead: 'Every finding answers: what, how bad, prove it, fix it.',
      blocks: [
        { type: 'figure', title: 'ANATOMY OF A FINDING', rows: [
          { k: 'TITLE', v: 'Specific and plain: "Default credentials on the Tomcat manager allow remote code execution."', tone: 'evidence' },
          { k: 'IMPACT', v: 'What it means for the business, in their terms — not just "high severity".', tone: 'attacker' },
          { k: 'REPRODUCTION', v: 'Exact, ordered steps a reader can follow to see it themselves.', tone: 'caution' },
          { k: 'EVIDENCE', v: 'The minimal proof: the request/response, the shell, the before/after.', tone: 'valid' },
          { k: 'REMEDIATION', v: 'The root-cause fix, and how to verify it afterwards.', tone: 'valid' },
        ] },
        { type: 'callout', tone: 'evidence', md: 'This is the same shape as the five-question method you have used all course. A finding is the method, written down for someone else to act on.' },
      ],
      notes: 'Connect the finding structure back to the five questions. It is the same reasoning, formatted for a reader.',
    },
    {
      id: 's14-exec', kind: 'concept', tag: 'CONCEPT · 06',
      title: 'Executive communication',
      lead: 'The person who funds the fix is not the person who reads the payloads.',
      blocks: [
        { type: 'compare', columns: [
          { title: 'Executive summary', tone: 'evidence', items: ['Risk in business terms', 'The attack narrative in a paragraph', 'What to prioritise and why'] },
          { title: 'Technical findings', tone: 'violet', items: ['Reproduction and evidence', 'Precise affected assets', 'Root-cause remediation'] },
        ] },
        { type: 'callout', tone: 'caution', title: 'One story, two depths', md: 'The executive summary and the technical detail describe the same engagement at different altitudes. The narrative — "an attacker reaching your DMZ could reach Domain Admin in these steps" — is what makes the risk real to a decision-maker.' },
      ],
      notes: 'The attack-narrative paragraph is the most persuasive artefact in a report. Have students practise writing one sentence of it.',
    },
    {
      id: 's14-coverage', kind: 'concept', tag: 'CONCEPT · 07',
      title: 'Objective coverage review',
      lead: 'Measure your demonstrated skills against the published domains — honestly.',
      blocks: [
        { type: 'prose', md: 'Walk the exam domains and mark, for each, whether you can *demonstrate* the skill with evidence — not just recognise it. Information gathering, initial access, web, exploitation and post-exploitation, exploit development, and Active Directory. Your weakest honest mark is where tonight’s study goes.' },
        { type: 'callout', tone: 'caution', md: 'These are INE’s published exam-domain weights, which remain distinct from this course’s grading. Use them to target practice, not to predict a score.' },
      ],
      notes: 'Keep the exam-vs-course-grading distinction explicit one last time. Use the domains for honest self-assessment.',
    },
    {
      id: 's14-prep', kind: 'concept', tag: 'CONCEPT · 08',
      title: 'Capstone preparation',
      lead: 'Build the plan you will actually follow tomorrow.',
      blocks: [
        { type: 'list', style: 'check', items: [
          'Your intended order of operations, with timeboxes per stage.',
          'Your weakest domain, and the one thing you will revise tonight.',
          'The troubleshooting table and your enumeration checklists, ready to open.',
          'Your evidence template and three ledgers, pre-created and empty.',
          'Submission expectations clear: a concise, evidenced, remediation-focused report.',
        ] },
        { type: 'callout', tone: 'valid', md: 'A plan you will follow beats a perfect plan you will abandon under pressure. Keep it short, keep it visible.' },
      ],
      notes: 'Have each student draft their plan in the session. The act of planning is most of the value.',
    },
    {
      id: 's14-discuss', kind: 'discuss', tag: 'TABLETOP',
      title: 'Tabletop: incomplete evidence',
      lead: 'A scenario with gaps. Decide and justify your next action.',
      blocks: [
        { type: 'prose', md: 'You are 90 minutes in. You have a foothold and a cracked service account, but your pivot keeps dropping and one promising host will not resolve. You have 30 minutes before you must start writing. In pairs: what do you do next, what do you abandon, and what do you make sure is documented before time runs out?' },
      ],
      notes: 'Run this as a real decision drill. Reward timeboxing and documentation discipline over heroics.',
    },
    {
      id: 's14-check', kind: 'check', tag: 'KNOWLEDGE CHECK',
      title: 'Check your understanding',
      blocks: [
        { type: 'check',
          q: 'With 30 minutes left in the capstone, you have a validated foothold and pivot but no domain compromise. What is the best use of the time?',
          options: [
            { text: 'Keep forcing the domain path — partial progress is worthless.' },
            { text: 'Consolidate and document what you have proven, with evidence and remediation, then attempt one more time-boxed step.', correct: true },
            { text: 'Delete your notes and start over cleanly.' },
            { text: 'Submit nothing until you reach Domain Admin.' },
          ],
          answer: 'Consolidate and **document the evidenced progress first** — a reproducible foothold and pivot, with impact and remediation, is real, reportable value. Then spend any remaining minutes on one time-boxed attempt at the next step. A well-reported partial chain scores; an undocumented obsession that runs out the clock does not. This is the time-management and reporting discipline the whole week builds toward.',
        },
      ],
      notes: 'This answer is the capstone strategy in miniature. Make sure every student internalises it before tomorrow.',
    },
    {
      id: 's14-recap', kind: 'recap', tag: 'RECAP & STUDY',
      title: 'What to carry into the capstone',
      blocks: [
        { type: 'list', style: 'check', items: [
          'Success is a reported, evidenced chain — not a single root shell.',
          'Map broadly, timebox paths, and bank partial wins as you go.',
          'Troubleshoot by isolating the layer before changing anything.',
          'Keep host, credential, and evidence ledgers — they are the draft report.',
          'A finding is the five-question method, written for someone else to act on.',
        ] },
        { type: 'callout', tone: 'valid', title: 'Independent study', md: 'Write your capstone plan: order of operations, weakest domain, the troubleshooting checklist you will keep open, and three things you will do differently from your last lab.' },
      ],
      notes: 'Tomorrow is the capstone. Confidence comes from the plan and the ledgers, not from hoping for a lucky root.',
    },
  ],
};
