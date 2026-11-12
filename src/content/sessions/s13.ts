import type { Session } from '../types';

export const s13: Session = {
  id: 's13', number: 13, week: 5, kind: 'theory', day: 'Sunday',
  dateISO: '2026-12-13', dateLabel: '13 Dec', durationHours: 3,
  topic: 'From domain access to higher privileges',
  title: 'AD Lateral Movement',
  outcome: 'Explain a complete AD attack path and identify controls that would interrupt it.',
  summary: 'Pass-the-hash and pass-the-ticket, remote administration, credential reuse, and privilege boundaries.',
  stages: ['ad', 'impact'], domains: ['ad', 'exploit'],
  sources: [
    { label: 'Active Directory notes', url: 'https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_ADPentest.pdf' },
    { label: 'Windows lateral movement notes', url: 'https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_LatMovement_Pivoting_Windows.pdf' },
  ],
  independentStudy: 'Take a complete attack path you have seen and identify the two single points where a defender’s control would most cheaply break it. Justify each choice.',
  slides: [
    {
      id: 's13-title', kind: 'title', tag: 'WEEK 5 · SESSION 13 · THEORY',
      title: 'From domain access to higher privileges',
      subtitle: 'Lateral movement, credential material, and privilege boundaries',
      lead: 'One validated credential becomes many hosts. This is how a foothold becomes the whole domain — and where it can be stopped.',
      blocks: [
        { type: 'figure', title: 'SESSION BRIEF', rows: [
          { k: 'OUTCOME', v: 'Explain a complete AD attack path and identify the controls that would interrupt it.', tone: 'evidence' },
          { k: 'STAGE', v: 'Active Directory → Objective & Impact — stages 05–06', tone: 'violet' },
          { k: 'EXIT CHECK', v: 'A complete AD path with two points where remediation could stop it.', tone: 'valid' },
        ] },
      ],
      notes: 'Theme: connect the whole chain, and — crucially — where it breaks. The defensive framing is a learning outcome, not an afterthought.',
    },
    {
      id: 's13-scenario', kind: 'scenario', tag: 'SCENARIO',
      title: 'One credential, many doors',
      lead: 'You cracked svc_sql and it is local admin on SQL01. From there, a Domain Admin once logged in. How far does that reach?',
      blocks: [
        { type: 'prose', md: 'Lateral movement is the art of turning access to one host into access to the next, using credential material rather than new exploits. The danger — and the lesson — is how quickly it compounds: a single admin who logged into the wrong box can hand an attacker the domain.' },
        { type: 'callout', tone: 'violet', title: 'Movement uses material, not exploits', md: 'You will rarely find a new vulnerability here. You will find passwords, hashes, and tickets — and reuse them. The defence is therefore about credential hygiene and boundaries, not patching.' },
      ],
      notes: 'Emphasise: lateral movement is a credential-hygiene problem. This frames the remediation outcome throughout.',
    },
    {
      id: 's13-objectives', kind: 'objectives', tag: 'OBJECTIVES',
      title: 'What you will be able to do',
      blocks: [
        { type: 'list', style: 'check', items: [
          'Compare passwords, NTLM hashes, and Kerberos tickets as authentication material.',
          'Explain pass-the-hash and pass-the-ticket: prerequisites, limits, and what access they give.',
          'Choose a remote-administration method based on what you hold and can reach.',
          'Trace credential reuse and administrator relationships across hosts.',
          'Distinguish local administrative control from domain privilege.',
          'Identify the two cheapest points to break a given attack path.',
        ] },
      ],
    },
    {
      id: 's13-material', kind: 'concept', tag: 'CONCEPT · 01',
      title: 'Three kinds of authentication material',
      lead: 'What you hold determines which technique applies.',
      blocks: [
        { type: 'table', head: ['Material', 'What it is', 'Technique it enables'], rows: [
          ['Password', 'The plaintext secret', 'Log in normally anywhere it is valid'],
          ['NTLM hash', 'A password-derived value', 'Pass-the-hash — authenticate without the plaintext'],
          ['Kerberos ticket', 'A time-bound proof of identity', 'Pass-the-ticket — reuse an existing ticket'],
        ] },
        { type: 'callout', tone: 'evidence', md: 'You do not always need the password. A hash or a ticket is often enough to authenticate — which is why dumping credential material from a compromised host is so valuable to an attacker, and so dangerous to a defender.' },
      ],
      notes: 'The "you do not need the plaintext" idea surprises students. It is the key to understanding PtH/PtT.',
    },
    {
      id: 's13-pth', kind: 'concept', tag: 'CONCEPT · 02',
      title: 'Pass-the-hash',
      lead: 'Authenticate with the hash itself, over protocols that accept it.',
      blocks: [
        { type: 'figure', title: 'PASS-THE-HASH', rows: [
          { k: 'PREREQ', v: 'An NTLM hash for a user that is valid on the target (often a local admin reused across hosts).', tone: 'caution' },
          { k: 'HOW', v: 'Supply the hash to an SMB/WMI client that authenticates with NTLM.', tone: 'attacker' },
          { k: 'GIVES', v: 'Access to hosts where that account is privileged — without ever cracking the password.', tone: 'violet' },
          { k: 'LIMIT', v: 'Needs NTLM authentication to be accepted; strong, unique local-admin passwords blunt it.', tone: 'evidence' },
        ] },
        { type: 'callout', tone: 'valid', title: 'The defensive lever', md: 'Reused local-administrator passwords are what make pass-the-hash spread. Unique per-host local-admin passwords (e.g. an automated password solution) break the technique’s reach.' },
      ],
      notes: 'Always pair the attack with its defensive lever. The reused-local-admin-password problem is the classic one.',
    },
    {
      id: 's13-ptt', kind: 'concept', tag: 'CONCEPT · 03',
      title: 'Pass-the-ticket',
      lead: 'Reuse a Kerberos ticket you obtained or forged, within its lifetime.',
      blocks: [
        { type: 'figure', title: 'PASS-THE-TICKET', rows: [
          { k: 'PREREQ', v: 'A valid Kerberos ticket (a TGT or service ticket) extracted from a compromised host.', tone: 'caution' },
          { k: 'HOW', v: 'Inject the ticket into your session and access the service it authorises.', tone: 'attacker' },
          { k: 'GIVES', v: 'The identity and access of the ticket’s owner, until it expires.', tone: 'violet' },
          { k: 'LIMIT', v: 'Time-bound; depends on which tickets are present on the host you control.', tone: 'evidence' },
        ] },
        { type: 'callout', tone: 'caution', md: 'Tickets live in memory on hosts where users authenticated. This is why a Domain Admin logging into an ordinary workstation is dangerous: their ticket (and reach) can be harvested from it.' },
      ],
      notes: 'The "DA logged into a workstation" scenario motivates tiered administration. It is the capstone’s usual win condition.',
    },
    {
      id: 's13-remote', kind: 'concept', tag: 'CONCEPT · 04',
      title: 'Remote administration methods',
      lead: 'Several ways to run commands on a remote host — pick by what you hold and can reach.',
      blocks: [
        { type: 'table', head: ['Method', 'Port', 'Needs', 'Note'], rows: [
          ['SMB (admin shares)', '445', 'Local admin + NTLM/hash', 'Classic; works with pass-the-hash'],
          ['WMI', '135+', 'Local admin creds', 'Quieter than some alternatives'],
          ['WinRM / PS Remoting', '5985/5986', 'Remote management rights', 'PowerShell-native'],
          ['RDP', '3389', 'Interactive logon rights', 'Full desktop; leaves a session'],
        ] },
        { type: 'callout', tone: 'evidence', md: 'The choice is driven by three things: the credential material you hold, the rights that account has on the target, and what is reachable through your pivot. Pick the method those three allow.' },
      ],
      notes: 'Decision by material + rights + reachability. This mirrors the exploit-selection discipline from Week 1.',
    },
    {
      id: 's13-reuse', kind: 'concept', tag: 'CONCEPT · 05',
      title: 'Credential reuse and admin relationships',
      lead: 'The map of who-is-admin-where is the map of how far you can go.',
      blocks: [
        { type: 'steps', items: [
          { label: 'Harvest on each new host', text: 'Cached credentials, tickets in memory, and stored secrets.', tone: 'attacker' },
          { label: 'Test reuse outward', text: 'Does this local-admin hash work on the next host? Reuse spreads here.', tone: 'violet' },
          { label: 'Follow the sessions', text: 'A privileged session on a reachable host is a direct step up.', tone: 'caution' },
        ] },
        { type: 'callout', tone: 'valid', md: 'Each hop is: harvest → reuse → harvest again. Defenders break this by limiting where privileged accounts log in and by making local-admin credentials unique per host.' },
      ],
      notes: 'The harvest-reuse-harvest loop is the engine of lateral movement. Keep tying it to the defensive breaks.',
    },
    {
      id: 's13-boundaries', kind: 'concept', tag: 'CONCEPT · 06',
      title: 'Local admin is not Domain Admin',
      lead: 'Know which boundary you have actually crossed.',
      blocks: [
        { type: 'compare', columns: [
          { title: 'Local administrative control', tone: 'caution', items: ['Full power on ONE host', 'Can harvest its secrets and sessions', 'Not inherently domain-wide'] },
          { title: 'Domain privilege', tone: 'violet', items: ['Power across the domain', 'Reached via a path, not by default', 'The usual objective of the engagement'] },
        ] },
        { type: 'callout', tone: 'evidence', md: 'Compromising a host gives you local control. Reaching Domain Admin requires a *path* — the chain of reuse and sessions you have been validating. Be precise in your report about which you achieved.' },
      ],
      notes: 'Precision about local vs domain privilege is a professionalism and reporting point. Students overclaim here constantly.',
    },

    {
      id: 's13-objective', kind: 'evidence', tag: 'CONCEPT · 07',
      title: 'Validate the privileged objective',
      lead: 'Reaching the goal is not the end. Prove it with the minimum evidence, then stop.',
      blocks: [
        { type: 'steps', items: [
          { label: 'Confirm the identity you hold', text: 'Show the account and its group memberships — for example `whoami /groups` — on the target.', tone: 'evidence' },
          { label: 'Show the access', text: 'Read the designated synthetic objective, or list a resource only that privilege can reach.', tone: 'violet' },
          { label: 'Capture and timestamp', text: 'The command, its output, the host and the time — enough for a reader to reproduce it.', tone: 'valid' },
          { label: 'Stop and do no harm', text: 'No new accounts, no password changes, no persistence unless the scope explicitly allows it.', tone: 'caution' },
        ] },
        { type: 'callout', tone: 'valid', title: 'Evidence that holds up', md: 'A screenshot of a shell is weaker than the exact command, its output and the time. Pair each piece of evidence with the hop that made it possible.' },
      ],
      notes: 'The capstone grades this step: the designated objective, evidenced and then left alone.',
    },
    {
      id: 's13-chain', kind: 'diagram', tag: 'SYNTHESIS · 08',
      title: 'The complete path — and where it breaks',
      lead: 'Step through the whole chain, then name the controls that would interrupt it.',
      blocks: [
        { type: 'diagram', kind: 'attack-chain', active: 4, caption: 'Every hop has a prerequisite — and therefore a control that removes it. That is the remediation story.' },
        { type: 'list', style: 'check', items: [
          { text: 'Break the roast: strong/managed service-account passwords (gMSA).', tone: 'valid' },
          { text: 'Break the reuse: unique local-admin passwords per host.', tone: 'valid' },
          { text: 'Break the ticket harvest: keep privileged logons off ordinary hosts (tiering).', tone: 'valid' },
        ] },
      ],
      notes: 'Walk the whole chain on the interactive diagram, then map each hop to its control. This is the exit check made visual.',
    },
    {
      id: 's13-reasoning', kind: 'concept', tag: 'THE METHOD',
      title: 'Five questions for the final hop',
      blocks: [
        { type: 'reasoning',
          evidence: 'svc_sql is local admin on SQL01, and memory on SQL01 holds a Domain Admin’s Kerberos ticket from a recent logon.',
          conditions: 'The DA ticket must still be valid, and I must be able to extract and reuse it from SQL01 where I hold admin.',
          proves: 'Injecting the ticket and authenticating to the DC as the DA proves domain compromise end to end, with evidence at each hop.',
          next: 'Reach the designated objective and capture the minimum evidence of impact; then stop.',
          rootcause: 'Enforce administrative tiering so Domain Admin credentials never land on member servers, and use managed service accounts.',
        },
      ],
      notes: 'The reasoning block is the exit check, with the remediation (tiering) made explicit.',
    },
    {
      id: 's13-mistakes', kind: 'mistakes', tag: 'COMMON MISTAKES',
      title: 'How lateral movement goes wrong',
      blocks: [
        { type: 'list', style: 'cross', items: [
          { text: 'Hunting for new exploits when the next hop needs a reused credential, not a vulnerability.', tone: 'attacker' },
          { text: 'Choosing a remote-admin method your credential/rights/reachability do not actually support.', tone: 'attacker' },
          { text: 'Claiming "Domain Admin" after only achieving local admin on one host.', tone: 'attacker' },
          { text: 'Reusing a ticket after it expired, then assuming the technique does not work.', tone: 'attacker' },
          { text: 'Reporting the attack without the remediation — leaving the client with no way to act.', tone: 'attacker' },
        ] },
      ],
      notes: 'The overclaiming (local vs domain) and the missing-remediation mistakes are the most damaging professionally.',
    },
    {
      id: 's13-discuss', kind: 'discuss', tag: 'DISCUSS',
      title: 'Pick the method, break the path',
      lead: 'In pairs, five minutes.',
      blocks: [
        { type: 'prose', md: 'Given a hash for a reused local-admin account and a reachable server, choose a remote-administration method and justify it by material, rights, and reachability. Then name the two cheapest controls that would break the whole path.' },
        { type: 'list', style: 'plain', items: [
          'Why that method over the alternatives, given what you hold?',
          'Which single control removes the most hops at once?',
          'How would a defender detect the movement you just described?',
        ] },
      ],
      notes: 'Tie attack choice to the three selection criteria, and drive the defensive framing the exit check requires.',
    },
    {
      id: 's13-check', kind: 'check', tag: 'KNOWLEDGE CHECK',
      title: 'Check your understanding',
      blocks: [
        { type: 'check',
          q: 'You have local admin on a member server and recover a Domain Admin’s Kerberos ticket from its memory. Which single control would most cheaply have prevented this?',
          options: [
            { text: 'Patching the server’s operating system.' },
            { text: 'Administrative tiering — ensuring Domain Admins never log on to member servers, so their tickets are never there to steal.', correct: true },
            { text: 'Disabling Kerberos entirely.' },
            { text: 'A stronger password on your svc_sql account.' },
          ],
          answer: 'The cheapest, highest-impact control is **administrative tiering**: Domain Admins should authenticate only to controlled, trusted systems, never to ordinary member servers. If the DA never logs on to that server, there is no DA ticket in its memory to steal — the whole final hop disappears. No patch fixes this, because no vulnerability was exploited; it is a credential-exposure problem solved by where privileged accounts are allowed to log in.',
        },
      ],
      notes: 'Tiering as the answer connects the attack to a concrete, inexpensive defensive control. This is the report’s punchline.',
    },
    {
      id: 's13-recap', kind: 'recap', tag: 'RECAP & STUDY',
      title: 'What to carry forward',
      blocks: [
        { type: 'list', style: 'check', items: [
          'Lateral movement uses credential material, not new exploits.',
          'You often need only a hash or a ticket, not the plaintext.',
          'Choose a remote-admin method by material + rights + reachability.',
          'Harvest → reuse → harvest is the engine; hygiene and tiering break it.',
          'Local admin is not Domain Admin — report precisely which you achieved.',
        ] },
        { type: 'callout', tone: 'violet', title: 'Independent study', md: 'Take a complete attack path and identify the two points where a defender’s control would most cheaply break it. Justify each.' },
      ],
      notes: 'Next session integrates the whole workflow and prepares for the capstone and professional reporting.',
    },
  ],
};
