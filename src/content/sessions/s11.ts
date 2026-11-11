import type { Session } from '../types';

export const s11: Session = {
  id: 's11', number: 11, week: 4, kind: 'theory', day: 'Tuesday',
  dateISO: '2026-12-08', dateLabel: '8 Dec', durationHours: 3,
  topic: 'AD enumeration and Kerberos weaknesses',
  title: 'AD Enumeration & Kerberos',
  outcome: 'Select a candidate AD attack path and explain the conditions required for it to work.',
  summary: 'Domain enumeration, PowerView and BloodHound, Kerberos, roasting, and offline auditing.',
  stages: ['ad'], domains: ['ad'],
  sources: [
    { label: 'Active Directory notes', url: 'https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_ADPentest.pdf' },
  ],
  independentStudy: 'Given a small set of AD relationships (from a provided BloodHound export or table), write out one attack path as a hypothesis, list its prerequisites, and state exactly what evidence would confirm each step.',
  slides: [
    {
      id: 's11-title', kind: 'title', tag: 'WEEK 4 · SESSION 11 · THEORY',
      title: 'AD enumeration and Kerberos weaknesses',
      subtitle: 'Turning directory relationships into a tested hypothesis',
      lead: 'A domain is a graph of who-can-reach-whom. Enumeration reads the graph; Kerberos weaknesses give you the first edge.',
      blocks: [
        { type: 'figure', title: 'SESSION BRIEF', rows: [
          { k: 'OUTCOME', v: 'Select a candidate AD attack path and explain the conditions required for it to work.', tone: 'evidence' },
          { k: 'STAGE', v: 'Active Directory — stage 05 of the attack chain', tone: 'violet' },
          { k: 'EXIT CHECK', v: 'One candidate AD path with its prerequisites and a validation plan.', tone: 'valid' },
        ] },
      ],
      notes: 'Theme: convert enumeration into a testable hypothesis. BloodHound finds paths; your job is to validate the conditions.',
    },
    {
      id: 's11-scenario', kind: 'scenario', tag: 'SCENARIO',
      title: 'One domain user, a whole directory to read',
      lead: 'You pivoted in and have a single low-privileged domain account. That is enough to read almost the entire directory.',
      blocks: [
        { type: 'prose', md: 'Active Directory is designed to be queryable by authenticated users. A single domain account can enumerate users, groups, computers, and the relationships between them — and those relationships often reveal a path to Domain Admin that no one intended.' },
        { type: 'callout', tone: 'violet', title: 'The path is already there', md: 'You rarely "break into" AD. You enumerate the trust and permission relationships the organisation already created, and find the chain that leads where you want. The attack is reading, then validating.' },
      ],
      notes: 'The core AD idea: paths exist by design. Enumeration surfaces them; validation confirms them.',
    },
    {
      id: 's11-objectives', kind: 'objectives', tag: 'OBJECTIVES',
      title: 'What you will be able to do',
      blocks: [
        { type: 'list', style: 'check', items: [
          'Enumerate users, groups, computers, shares, and privileged relationships.',
          'Explain what PowerView and BloodHound collect and how to read a path.',
          'Convert collected relationships into a single testable attack hypothesis.',
          'Explain the normal Kerberos workflow before its weaknesses.',
          'Distinguish AS-REP roasting from Kerberoasting by their prerequisites.',
          'Audit recovered hashes offline and judge whether the result grants useful access.',
        ] },
      ],
    },
    {
      id: 's11-enum', kind: 'demo', tag: 'DEMONSTRATE · 01',
      title: 'Domain enumeration',
      lead: 'Ask the directory who exists, who is privileged, and who runs services.',
      blocks: [
        { type: 'terminal', title: 'Enumerating with a single domain user', lines: [
          { text: 'Get-NetUser | select samaccountname, serviceprincipalname', kind: 'cmd' },
          { text: 'svc_sql   MSSQLSvc/sql01.corp.local:1433', kind: 'out', tone: 'attacker' },
          { text: '# an SPN on a user account = Kerberoastable', kind: 'comment' },
          { text: 'Get-NetGroupMember "Domain Admins"', kind: 'cmd' },
          { text: 'Administrator, t.admin', kind: 'out', tone: 'violet' },
        ] },
        { type: 'callout', tone: 'evidence', title: 'Reading the result', md: 'A *user* account carrying a service principal name (`svc_sql`) is Kerberoastable — any domain user can request its ticket and attack its password offline. That single enumeration line is a candidate attack path.' },
      ],
      study: [
        { type: 'prose', md: 'Enumeration goes well beyond user lists: group memberships (especially nested privileged groups), computer accounts and their operating systems, shares and their permissions, delegation settings, and access-control relationships (who can reset whose password, who is local admin where). PowerView queries these over LDAP from a single domain context. The goal is not to collect everything — it is to find the one or two relationships that form a path to your objective.' },
      ],
      notes: 'The SPN-on-a-user line is the planted Kerberoast lead. Let students recognise it rather than pointing it out.',
    },
    {
      id: 's11-tools', kind: 'concept', tag: 'CONCEPT · 02',
      title: 'PowerView and BloodHound',
      lead: 'One queries; one maps. Together they turn relationships into a visible path.',
      blocks: [
        { type: 'compare', columns: [
          { title: 'PowerView', tone: 'evidence', items: ['Ad-hoc LDAP queries from a shell', 'Answers specific questions precisely', 'Great for validating one relationship'] },
          { title: 'BloodHound', tone: 'violet', items: ['Collects relationships in bulk', 'Graphs paths to high-value targets', 'Great for seeing the whole route at once'] },
        ] },
        { type: 'callout', tone: 'caution', title: 'A graph edge is still a hypothesis', md: 'BloodHound shows that a path *could* exist based on collected data. Each edge still has prerequisites you must validate — stale data and mis-collected ACLs produce paths that do not actually work.' },
      ],
      notes: 'BloodHound paths are hypotheses, not facts. This caveat prevents students trusting the graph blindly.',
    },
    {
      id: 's11-hypothesis', kind: 'concept', tag: 'CONCEPT · 03',
      title: 'From relationships to a hypothesis',
      lead: 'Enumeration gives you edges. A path is a claim you can test, step by step.',
      blocks: [
        { type: 'steps', items: [
          { label: 'State the goal', text: 'e.g. "reach Domain Admins from my current user."', tone: 'evidence' },
          { label: 'Chain the edges', text: 'svc_sql is Kerberoastable → svc_sql is admin on SQL01 → SQL01 stores a DA session.', tone: 'violet' },
          { label: 'List prerequisites per edge', text: 'A weak svc_sql password; admin rights that actually apply; a harvestable session.', tone: 'caution' },
          { label: 'Define confirming evidence', text: 'A cracked password; a shell on SQL01; a usable DA credential or ticket.', tone: 'valid' },
        ] },
        { type: 'callout', tone: 'evidence', md: 'A good AD attack path reads like a chain of IF-statements, each with evidence attached. That is exactly what the capstone report will need.' },
      ],
      notes: 'This chaining is the heart of the session and the exit check. Make students write one path as a hypothesis.',
    },
    {
      id: 's11-kerberos', kind: 'diagram', tag: 'CONCEPT · 04',
      title: 'Kerberos: the normal flow first',
      lead: 'Understand how authentication is supposed to work before you abuse it.',
      blocks: [
        { type: 'diagram', kind: 'kerberos', caption: 'Step through the exchange. The two weaknesses both abuse legitimate messages, not a broken protocol.' },
      ],
      notes: 'Walk the interactive diagram step by step. Normal flow first; the weaknesses land harder once the flow is clear.',
    },
    {
      id: 's11-roasting', kind: 'concept', tag: 'CONCEPT · 05',
      title: 'AS-REP roasting vs Kerberoasting',
      lead: 'Two attacks, two prerequisites, two different crackable blobs.',
      blocks: [
        { type: 'compare', columns: [
          { title: 'AS-REP roasting', tone: 'attacker', sub: 'AS-REP', items: ['Prereq: an account with pre-auth DISABLED', 'Request its AS-REP, which is crackable', 'Yields that user’s password if weak'] },
          { title: 'Kerberoasting', tone: 'attacker', sub: 'TGS-REP', items: ['Prereq: a service account with an SPN', 'Any domain user can request its service ticket', 'Crack the ticket for the service password'] },
        ] },
        { type: 'callout', tone: 'caution', title: 'Both need a weak password to pay off', md: 'Each attack hands you an encrypted blob you can attack *offline* — no lockout, no noise against the DC. But a strong service/user password defeats both. The vulnerability is weak passwords on exposed accounts, not Kerberos itself.' },
      ],
      notes: 'The prereq contrast (pre-auth disabled vs SPN present) is the examinable distinction. Both rely on weak passwords.',
    },
    {
      id: 's11-audit', kind: 'demo', tag: 'DEMONSTRATE · 06',
      title: 'Offline auditing and what it proves',
      lead: 'Crack the blob offline — then ask whether the result is actually useful.',
      blocks: [
        { type: 'terminal', title: 'Roast, crack, and assess', lines: [
          { text: 'Rubeus kerberoast /user:svc_sql /outfile:hash.txt', kind: 'cmd' },
          { text: '[+] Hash written for svc_sql', kind: 'out', tone: 'caution' },
          { text: 'hashcat -m 13100 hash.txt wordlist.txt', kind: 'cmd' },
          { text: 'svc_sql:Summer2026!', kind: 'out', tone: 'valid' },
          { text: '# now: WHERE is svc_sql actually privileged?', kind: 'comment' },
        ] },
        { type: 'callout', tone: 'valid', title: 'A cracked password is a lead, not a conquest', md: 'You recovered `svc_sql`’s password offline. The finding is only as strong as what that account can *do*: validate where it is admin and whether that advances your path to the objective.' },
      ],
      study: [
        { type: 'prose', md: 'Offline cracking is attractive because it is silent against the domain and immune to lockout. But a recovered credential is only useful if it grants access that advances your goal. Always close the loop: authenticate with it, enumerate what it can reach, and update your attack-path hypothesis. In the lab you will roast designated accounts only — never arbitrary production identities.' },
      ],
      notes: 'Insist on closing the loop: a cracked password must be tied back to access that matters. Only designated lab accounts.',
    },
    {
      id: 's11-reasoning', kind: 'concept', tag: 'THE METHOD',
      title: 'Five questions for your AD path',
      blocks: [
        { type: 'reasoning',
          evidence: 'Enumeration shows svc_sql is a user account with an SPN (Kerberoastable), and BloodHound shows svc_sql has an admin edge to SQL01.',
          conditions: 'svc_sql must have a crackable password, the admin edge must actually apply, and SQL01 must hold something that advances the path (a session or credential).',
          proves: 'Cracking the ticket proves the weak password; authenticating to SQL01 proves the admin edge is real — together, a validated step toward the objective.',
          next: 'On SQL01, hunt for cached credentials or a Domain Admin session to extend the path.',
          rootcause: 'Set strong, managed passwords on service accounts (or use gMSAs) and minimise where accounts hold admin rights.',
        },
      ],
      notes: 'The reasoning block is the exit check: a candidate path with prerequisites and a validation plan.',
    },
    {
      id: 's11-mistakes', kind: 'mistakes', tag: 'COMMON MISTAKES',
      title: 'How AD enumeration goes wrong',
      blocks: [
        { type: 'list', style: 'cross', items: [
          { text: 'Trusting a BloodHound edge as fact, without validating its prerequisites.', tone: 'attacker' },
          { text: 'Collecting the whole directory but never forming a single testable path.', tone: 'attacker' },
          { text: 'Confusing AS-REP roasting (pre-auth disabled) with Kerberoasting (SPN present).', tone: 'attacker' },
          { text: 'Cracking a credential and declaring victory, without proving what it can reach.', tone: 'attacker' },
          { text: 'Roasting arbitrary accounts instead of the designated ones — noisy and out of scope.', tone: 'attacker' },
        ] },
      ],
      notes: 'The graph-edge-as-fact and the AS-REP-vs-Kerberoast confusions are the two most common. Address both.',
    },
    {
      id: 's11-discuss', kind: 'discuss', tag: 'DISCUSS',
      title: 'Which path, and prove each edge',
      lead: 'In pairs, five minutes, with a small relationship set the instructor provides.',
      blocks: [
        { type: 'prose', md: 'From the supplied relationships, choose one path to the objective. For every edge in it, state the prerequisite and the exact evidence that would confirm the edge actually works.' },
        { type: 'list', style: 'plain', items: [
          'Which edge is the weakest link — the one most likely to fail validation?',
          'What is the cheapest edge to confirm first, to fail fast if the path is dead?',
          'Which single defensive change would break your chosen path?',
        ] },
      ],
      notes: 'Push "fail fast": confirm the cheapest/weakest edge first. This is the hypothesis method applied under the clock.',
    },
    {
      id: 's11-check', kind: 'check', tag: 'KNOWLEDGE CHECK',
      title: 'Check your understanding',
      blocks: [
        { type: 'check',
          q: 'You find a domain user account that has a service principal name (SPN) set. Which attack does this enable, and what does it require?',
          options: [
            { text: 'AS-REP roasting — it requires pre-authentication to be disabled.' },
            { text: 'Kerberoasting — any domain user can request its service ticket and crack the password offline if it is weak.', correct: true },
            { text: 'Pass-the-hash — it requires the user’s NTLM hash.' },
            { text: 'Nothing — an SPN is not a weakness.' },
          ],
          answer: 'A user account with an SPN enables **Kerberoasting**. Any authenticated domain user can request a service ticket for that SPN; the ticket is encrypted with the service account’s password, so it can be cracked offline. The prerequisite is simply the SPN being present — the payoff requires the password to be weak. (AS-REP roasting is the different attack, requiring pre-authentication to be *disabled* on the account.)',
        },
      ],
      notes: 'The SPN-vs-preauth distinction is the most commonly confused point. If the room splits, re-walk the two prereqs.',
    },
    {
      id: 's11-recap', kind: 'recap', tag: 'RECAP & STUDY',
      title: 'What to carry into the lab',
      blocks: [
        { type: 'list', style: 'check', items: [
          'A single domain user can read most of the directory — enumeration is the attack surface.',
          'BloodHound shows candidate paths; each edge is a hypothesis with prerequisites.',
          'Write an attack path as a chain of IF-statements, each with confirming evidence.',
          'AS-REP roasting needs pre-auth disabled; Kerberoasting needs an SPN. Both need weak passwords.',
          'A cracked credential is a lead — close the loop by proving what it can reach.',
        ] },
        { type: 'callout', tone: 'violet', title: 'Independent study', md: 'From a small set of AD relationships, write one attack path as a hypothesis: its prerequisites, and exactly what evidence would confirm each step.' },
      ],
      notes: 'Next is the Week 4 lab: pivot in, enumerate the domain, and validate a Kerberos or credential weakness end to end.',
    },
  ],
};
