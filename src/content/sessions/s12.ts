import type { Session } from '../types';

export const s12: Session = {
  id: 's12', number: 12, week: 4, kind: 'practical', day: 'Wednesday',
  dateISO: '2026-12-09', dateLabel: '9 Dec', durationHours: 4,
  topic: 'Investigate an internal domain',
  title: 'Lab · Investigate the Domain',
  outcome: 'Pivot into the internal segment, enumerate the domain, and validate a Kerberos or credential weakness.',
  summary: 'From a foothold, reach the internal network, discover AD, enumerate relationships, validate a path.',
  stages: ['pivot', 'ad'], domains: ['ad', 'exploit'],
  sources: [
    { label: 'Linux pivoting notes', url: 'https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_LatMovement_Pivoting_Linux.pdf' },
    { label: 'Windows lateral movement notes', url: 'https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_LatMovement_Pivoting_Windows.pdf' },
    { label: 'Active Directory notes', url: 'https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_ADPentest.pdf' },
  ],
  independentStudy: 'Explain, in writing, how changing one account setting or one permission would break the path you demonstrated — and how a defender would detect the attack.',
  slides: [
    {
      id: 's12-title', kind: 'brief', tag: 'WEEK 4 · SESSION 12 · PRACTICAL',
      title: 'Investigate an internal domain',
      subtitle: 'Pivot, enumerate, validate a path',
      lead: 'Start on a foothold with a line into the internal network. Reach the domain, read its relationships, and prove one path works.',
      blocks: [
        { type: 'figure', title: 'LAB BRIEF', rows: [
          { k: 'DURATION', v: '4 hours (practical)' },
          { k: 'OUTCOME', v: 'A validated AD finding with the internal map and identity path to support it.', tone: 'valid' },
          { k: 'STAGES', v: 'Pivoting → Active Directory', tone: 'violet' },
          { k: 'ENVIRONMENT', v: 'Instructor-controlled domain lab; all accounts and data synthetic.', tone: 'caution' },
        ] },
      ],
      notes: 'The first hour is often pivot plumbing. Help the room get tunnels working so the AD time is not lost to setup.',
    },
    {
      id: 's12-scope', kind: 'brief', tag: 'AUTHORISED SCOPE',
      title: 'Rules of engagement',
      blocks: [
        { type: 'list', style: 'check', items: [
          { text: 'In scope: your foothold host, the internal subnet behind it, and the lab domain.', tone: 'valid' },
          { text: 'Permitted: pivoting, authenticated enumeration, and roasting of DESIGNATED lab accounts only.', tone: 'valid' },
          { text: 'Out of scope: any identity or host not part of your assigned domain, and other students’ environments.', tone: 'attacker' },
          { text: 'Do not change passwords, disable accounts, or alter directory objects.', tone: 'attacker' },
        ] },
        { type: 'callout', tone: 'caution', title: 'Roast only what you are told to', md: 'Only the designated accounts are in scope for offline auditing. Roasting arbitrary identities — even in a lab — is out of scope and, in a real engagement, a serious misstep.' },
      ],
      notes: 'Name the designated roastable accounts verbally. Keep directory modifications firmly out of scope.',
    },
    {
      id: 's12-prereq', kind: 'brief', tag: 'PREREQUISITES',
      title: 'Before you start',
      blocks: [
        { type: 'list', items: [
          { text: 'A working foothold shell on the dual-homed pivot host.' },
          { text: 'Your tunnelling toolkit and proxychains configured; DNS forced through the tunnel.' },
          { text: 'AD enumeration tools staged for use over the pivot.' },
          { text: 'Your attack-path hypothesis template from Session 11.' },
        ] },
      ],
      notes: 'Confirm each student can resolve an internal name through the tunnel before they start enumerating.',
    },
    {
      id: 's12-tasks', kind: 'tasks', tag: 'OBJECTIVES',
      title: 'Your tasks',
      blocks: [
        { type: 'steps', items: [
          { label: 'Establish internal access', text: 'Tunnel into the internal segment; confirm reachability and name resolution.', tone: 'cyan' },
          { label: 'Discover domain infrastructure', text: 'Find the DC and the key services; confirm you can query the directory.', tone: 'evidence' },
          { label: 'Enumerate relationships', text: 'Users, groups, computers, shares, SPNs, and privileged edges.', tone: 'violet' },
          { label: 'Identify the intended weakness', text: 'A Kerberos-roastable account or an exposed credential that opens a path.', tone: 'attacker' },
          { label: 'Validate the resulting access', text: 'Prove the recovered credential reaches what the path claims.', tone: 'valid' },
          { label: 'Update the diagram', text: 'Extend the network + identity attack-path diagram with your evidence.', tone: 'valid' },
        ] },
      ],
      notes: 'Keep them tying each enumeration result to the hypothesis. The diagram update is where understanding shows.',
    },
    {
      id: 's12-hints', kind: 'brief', tag: 'IF YOU STALL',
      title: 'Progressive hints',
      lead: 'Reveal the next only. Hints teach the method; they do not name the account or path.',
      blocks: [
        { type: 'hints', items: [
          { label: 'My tools hang over the pivot.', md: 'Isolate the layer: can you reach the port (TCP connect, -Pn)? Does the name resolve on the internal DNS, not your local resolver? Only then is it an auth problem.' },
          { label: 'I can reach the DC but cannot enumerate.', md: 'Authenticated enumeration needs a valid domain credential in the right form. Confirm you are querying as a domain user, and that your tool is sending that identity.' },
          { label: 'I have lots of data but no path.', md: 'Work backwards from the objective. What accounts/groups reach it, and which of those can you plausibly compromise? Look for SPNs on users and pre-auth-disabled accounts.' },
          { label: 'I cracked a credential but it seems useless.', md: 'Close the loop: where is that account actually privileged? Authenticate with it and enumerate what it can reach. A credential is only a finding if it advances the path.' },
        ] },
      ],
      notes: 'Hints map to the three-layer troubleshooting and the hypothesis method. They never reveal the planted account.',
    },
    {
      id: 's12-submission', kind: 'brief', tag: 'DELIVERABLES',
      title: 'What to submit',
      blocks: [
        { type: 'list', style: 'check', items: [
          'An internal network map (hosts, services, the pivot route).',
          'An AD relationship diagram highlighting the path you validated.',
          'The validated finding: the weakness, the prerequisites you confirmed, and the access achieved.',
          'Supporting evidence for each step — enumeration output, the crack, the authenticated access.',
        ] },
        { type: 'callout', tone: 'valid', md: 'The strongest submissions read as a chain: each step names its prerequisite, shows the evidence it was met, and leads to the next. That chain is the backbone of the capstone report.' },
      ],
      notes: 'Reward the chained, evidenced narrative. It is exactly what Week 5 asks them to produce at full scale.',
    },
    {
      id: 's12-debrief', kind: 'debrief', tag: 'DEBRIEF',
      title: 'Debrief & reflection',
      blocks: [
        { type: 'list', style: 'plain', items: [
          'What made the path possible — which single misconfiguration?',
          'Which relationship required manual confirmation beyond the graph?',
          'Where could a defender have interrupted the path?',
          'What did you have to troubleshoot, and which layer was the problem?',
        ] },
        { type: 'callout', tone: 'violet', title: 'Independent study', md: 'Explain how changing one account setting or permission would break your demonstrated path — and how a defender would detect the attack.' },
      ],
      notes: 'The "where could a defender interrupt this" question builds the remediation mindset the capstone report needs. Preview Week 5: lateral movement to the objective, then the whole chain.',
    },
  ],
};
