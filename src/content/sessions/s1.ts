import type { Session } from '../types';

export const s1: Session = {
  id: 's1', number: 1, week: 1, kind: 'theory', day: 'Sunday',
  dateISO: '2026-11-15', dateLabel: '15 Nov', durationHours: 3,
  topic: 'How to approach a penetration test',
  title: 'Methodology & Reconnaissance',
  outcome: 'Build a host-and-service inventory and justify the next enumeration steps.',
  summary: 'The testing lifecycle, scope, host discovery, and turning scan output into a prioritised plan.',
  stages: ['recon'], domains: ['recon', 'access'],
  sources: [
    { label: 'Primary eCPPT repository', url: 'https://github.com/Dragkob/eCPPT' },
    { label: 'INE eCPPT objectives', url: 'https://ine.com/security/certifications/ecppt-certification' },
    { label: 'Linked eJPT network-testing resources', url: 'https://github.com/Dragkob/eJPT' },
  ],
  reading: [
    { label: 'Network testing material (eJPT)', url: 'https://github.com/Dragkob/eJPT', note: 'plus instructor methodology and evidence templates' },
  ],
  independentStudy: 'Repeat the enumeration of a practice host without a worksheet, and build a personal service-enumeration checklist you will reuse every week.',
  slides: [
    {
      id: 's1-title', kind: 'title', tag: 'WEEK 1 · SESSION 01 · THEORY',
      title: 'How to approach a penetration test',
      subtitle: 'Methodology, scope, and reconnaissance',
      lead: 'Before any exploit, a tester turns an unknown network into a mapped, prioritised list of questions.',
      blocks: [
        { type: 'figure', title: 'SESSION BRIEF', rows: [
          { k: 'DATE', v: 'Sunday 15 November 2026' },
          { k: 'DURATION', v: '3 hours (theory)' },
          { k: 'OUTCOME', v: 'Build a host-and-service inventory and justify the next enumeration steps.', tone: 'evidence' },
          { k: 'STAGE', v: 'Reconnaissance — stage 01 of the attack chain', tone: 'evidence' },
          { k: 'EXIT CHECK', v: 'A host-and-service matrix with three justified next steps.', tone: 'valid' },
        ] },
      ],
      notes: 'Open by framing the whole course as one disciplined loop. Today is about the first turn of that loop: discovery. Set the tone — we justify every step with evidence.',
    },
    {
      id: 's1-scenario', kind: 'scenario', tag: 'SCENARIO',
      title: 'A new engagement lands on your desk',
      lead: 'You have a signed authorisation, a target range, and a two-week window.',
      blocks: [
        { type: 'prose', md: 'A client hands you a single line of scope: *"Assess 10.10.24.0/24. Demonstrate what an attacker who reaches this subnet could do."* No credentials, no documentation, no map. The clock starts now.' },
        { type: 'callout', tone: 'caution', title: 'Where do you point your tools first?', md: 'The instinct is to launch everything at everything. Resist it. An unfocused scan wastes your window, floods you with noise, and can knock over fragile services. The first skill of a tester is **deciding what to look at next, and why.**' },
        { type: 'prose', md: 'By the end of today you will be able to take that one line of scope and produce a ranked list of concrete questions — each one backed by a piece of evidence you can point to.' },
      ],
      notes: 'Ask the room: "what is your very first command?" Collect answers. Most will name a tool. Redirect to: what question are you answering, and what would the result prove?',
    },
    {
      id: 's1-objectives', kind: 'objectives', tag: 'OBJECTIVES',
      title: 'What you will be able to do',
      blocks: [
        { type: 'list', style: 'check', items: [
          'Describe the testing lifecycle and name the phase you are in at any moment.',
          'Read a scope statement and state what is permitted, what is not, and when to stop.',
          'Run host discovery and service identification, and interpret the output.',
          'Separate an observation (what a scan suggests) from a confirmed finding (what validation establishes).',
          'Turn a host-and-service inventory into three prioritised, evidence-backed next steps.',
        ] },
      ],
      notes: 'Keep objectives visible. Return to them in the exit check.',
    },
    {
      id: 's1-scope', kind: 'concept', tag: 'CONCEPT · 01',
      title: 'Scope is the contract — and the safety rail',
      lead: 'Scope defines permitted targets and actions, success criteria, and stop conditions.',
      blocks: [
        { type: 'compare', columns: [
          { title: 'In scope', tone: 'valid', items: ['The authorised address range(s)', 'The named applications and hosts', 'The agreed testing window', 'The techniques the client approved'] },
          { title: 'Out of scope', tone: 'attacker', items: ['Anything outside the range — even if reachable', 'Denial-of-service unless explicitly allowed', 'Third-party / cloud assets you do not own', 'Social engineering unless contracted'] },
        ] },
        { type: 'callout', tone: 'attacker', title: 'Stop conditions are not optional', md: 'Know in advance what forces you to pause and call the client: a production outage, evidence of a prior breach, or discovery of sensitive personal data. Testing without agreed stop conditions is how an engagement becomes an incident.' },
      ],
      study: [
        { type: 'prose', md: 'Scope is usually recorded in a *rules of engagement* document agreed before testing. Treat it as both your permission and your protection: if a client later questions an action, the scope statement is your evidence that it was authorised. Keep it open in a tab throughout the engagement and re-read it whenever you are tempted to "just try one thing" against a host that looks interesting but was never listed.' },
      ],
      notes: 'Emphasise: reachable is not the same as in-scope. A dual-homed host may let you touch a network you were never authorised to test.',
    },
    {
      id: 's1-lifecycle', kind: 'diagram', tag: 'CONCEPT · 02',
      title: 'The testing lifecycle is a loop, not a line',
      lead: 'Each phase feeds the next — and sends you back when evidence changes the picture.',
      blocks: [
        { type: 'diagram', kind: 'lifecycle', caption: 'You will revisit earlier phases constantly: a post-exploitation finding often reopens enumeration.' },
        { type: 'steps', items: [
          { label: 'Discovery', text: 'Find what exists — live hosts, reachable networks.', tone: 'evidence' },
          { label: 'Enumeration', text: 'Interrogate what you found — services, versions, users, shares.', tone: 'evidence' },
          { label: 'Validation', text: 'Confirm a weakness is real before you rely on it.', tone: 'caution' },
          { label: 'Exploitation', text: 'Use a validated weakness to gain access.', tone: 'attacker' },
          { label: 'Post-exploitation', text: 'Establish context, escalate, and look for the next hop.', tone: 'violet' },
          { label: 'Reporting', text: 'Turn evidence into findings, impact, and remediation.', tone: 'valid' },
        ] },
      ],
      notes: 'Stress the loop. Walk through how a credential found in post-exploitation sends you straight back to enumeration on a new host.',
    },
    {
      id: 's1-netfound', kind: 'concept', tag: 'REFRESHER · 03',
      title: 'Network foundations you will lean on',
      lead: 'Reconnaissance is applied networking. A quick, honest refresher.',
      blocks: [
        { type: 'define', term: 'Port', md: 'A numbered endpoint on a host. An **open** port means a service is listening and willing to talk.' },
        { type: 'define', term: 'TCP vs UDP', md: 'TCP completes a handshake (easy to confirm open/closed). UDP is connectionless, so "no reply" is ambiguous — scanning it is slower and noisier.' },
        { type: 'define', term: 'Service & version', md: 'What software is behind the port, and which release. Version is what connects a host to a known vulnerability.' },
        { type: 'define', term: 'DNS', md: 'Maps names to addresses. Internal DNS often reveals host roles (e.g. `dc01`, `fileserver`) before you touch them.' },
      ],
      notes: 'Keep this tight — it is a refresher, not a lecture. The entry requirement assumes TCP/IP familiarity.',
    },
    {
      id: 's1-discovery', kind: 'demo', tag: 'DEMONSTRATE · 04',
      title: 'Host discovery: who is alive?',
      lead: 'Before you scan ports, learn which addresses answer at all.',
      blocks: [
        { type: 'terminal', title: 'nmap — host discovery sweep', lines: [
          { text: 'nmap -sn 10.10.24.0/24 -oA scans/discovery', kind: 'cmd' },
          { text: 'Nmap scan report for 10.10.24.15', kind: 'out' },
          { text: 'Host is up (0.0021s latency).', kind: 'out', tone: 'valid' },
          { text: 'Nmap scan report for 10.10.24.22', kind: 'out' },
          { text: 'Host is up (0.0019s latency).', kind: 'out', tone: 'valid' },
          { text: 'Nmap done: 256 IP addresses (2 hosts up) scanned', kind: 'out' },
        ] },
        { type: 'callout', tone: 'evidence', title: 'Interpretation', md: 'Two live hosts out of 256. `-sn` disables port scanning — this is a *ping sweep*. The `-oA` flag saves output in all formats: your evidence trail starts here, not after you find something interesting.' },
      ],
      study: [
        { type: 'prose', md: 'A host that does not answer a ping sweep is not necessarily down — a firewall may simply be dropping ICMP. In a tightly filtered environment, follow a silent sweep with a targeted TCP probe to common ports (`-PS22,80,445`) before concluding an address is dead. The point of host discovery is not certainty; it is to spend your detailed scanning time on the addresses most likely to answer.' },
      ],
      notes: 'Explain -oA every single time you demo a scan. Evidence discipline is a habit, and habits are taught by repetition.',
    },
    {
      id: 's1-portscan', kind: 'demo', tag: 'DEMONSTRATE · 05',
      title: 'Service identification: what is listening?',
      lead: 'Now interrogate the live hosts for open ports, services, and versions.',
      blocks: [
        { type: 'terminal', title: 'nmap — service & version scan', lines: [
          { text: 'nmap -sV -sC -p- 10.10.24.15 -oA scans/web01', kind: 'cmd' },
          { text: 'PORT     STATE SERVICE     VERSION', kind: 'out' },
          { text: '22/tcp   open  ssh         OpenSSH 8.2p1 Ubuntu', kind: 'out' },
          { text: '445/tcp  open  netbios-ssn Samba smbd 4.6.2', kind: 'out', tone: 'caution' },
          { text: '8080/tcp open  http        Apache Tomcat 9.0.30', kind: 'out', tone: 'caution' },
        ] },
        { type: 'figure', title: 'FLAGS, DECODED', rows: [
          { k: '-sV', v: 'Probe open ports to determine service and version.' },
          { k: '-sC', v: 'Run the default safe script set for extra detail.' },
          { k: '-p-', v: 'Scan all 65,535 TCP ports, not just the top 1,000.' },
        ] },
      ],
      notes: 'Point out the two caution-coloured lines: Samba and Tomcat with specific versions. Version + service is the hook for vulnerability research next session.',
    },
    {
      id: 's1-observation', kind: 'concept', tag: 'CONCEPT · 06',
      title: 'Observation vs confirmed finding',
      lead: 'The single most important distinction in this course.',
      blocks: [
        { type: 'compare', columns: [
          { title: 'Observation', tone: 'caution', sub: 'what a scan suggests', items: ['"Tomcat 9.0.30 is running on 8080."', 'A version banner — which can lie or be back-ported.', 'A script result flagging a possible issue.', 'Grounds to investigate, never to report.'] },
          { title: 'Confirmed finding', tone: 'valid', sub: 'what validation establishes', items: ['"I authenticated to the Tomcat manager and deployed a test app."', 'A reproducible action with captured evidence.', 'Demonstrated impact a client can act on.', 'The only thing that belongs in a report.'] },
        ] },
        { type: 'callout', tone: 'evidence', md: 'A scanner that says *"vulnerable"* has made an observation. Your job is to turn it into a finding — or to disprove it. Reporting unvalidated scanner output is the fastest way to lose a client\'s trust.' },
      ],
      notes: 'This slide is the spine of the whole course. Linger on it. Every practical will test whether students can tell the two apart.',
    },
    {
      id: 's1-evidence', kind: 'concept', tag: 'CONCEPT · 07',
      title: 'Organise evidence from the first command',
      lead: 'If it is not written down with a timestamp, it did not happen.',
      blocks: [
        { type: 'list', columns: 2, items: [
          { text: '**Host inventory** — address, hostname, role, OS guess.' },
          { text: '**Service matrix** — host × port × service × version.' },
          { text: '**Timestamps** — when each test ran, for the timeline.' },
          { text: '**Screenshots** — proof of each meaningful result.' },
          { text: '**Command log** — exactly what you ran, successes and failures.' },
          { text: '**Notes** — what you concluded and what you will try next.' },
        ] },
        { type: 'callout', tone: 'valid', title: 'Why failures matter', md: 'Record what did *not* work and why. A failed test is evidence too — it narrows the possibilities and stops you repeating dead ends. Your report\'s credibility rests on this trail.' },
      ],
      notes: 'Show your own note template briefly. Make evidence organisation feel like part of the craft, not paperwork.',
    },
    {
      id: 's1-matrix', kind: 'demo', tag: 'WORKED EXAMPLE · 08',
      title: 'Building the service matrix',
      lead: 'Two hosts, interrogated. Here is the inventory that drives every later decision.',
      blocks: [
        { type: 'table', head: ['Host', 'Port', 'Service', 'Version', 'Signal'], align: ['left', 'right', 'left', 'left', 'left'], rows: [
          ['10.10.24.15', '22', 'SSH', 'OpenSSH 8.2p1', 'Low — patched, no creds'],
          ['10.10.24.15', '445', 'SMB', 'Samba 4.6.2', 'Medium — enumerate shares/users'],
          ['10.10.24.15', '8080', 'HTTP', 'Tomcat 9.0.30', 'High — manager, known CVEs'],
          ['10.10.24.22', '3389', 'RDP', 'Windows Server 2019', 'Medium — check NLA, users'],
          ['10.10.24.22', '445', 'SMB', 'Windows SMB', 'Medium — null session?'],
        ] },
      ],
      notes: 'Walk the Signal column: this is prioritisation made visible. Ask students to defend the High rating on Tomcat.',
    },
    {
      id: 's1-prioritise', kind: 'concept', tag: 'CONCEPT · 09',
      title: 'Turning the matrix into a plan',
      lead: 'Prioritise by likely access, evidence strength, and effort — not by excitement.',
      blocks: [
        { type: 'steps', items: [
          { label: 'Rank by plausible access', text: 'Which service most plausibly leads to a foothold? Tomcat manager beats a patched SSH.', tone: 'attacker' },
          { label: 'Weigh the evidence', text: 'Prefer paths where a known version maps to a documented weakness you can test.', tone: 'evidence' },
          { label: 'Estimate effort', text: 'A ten-minute check that could open a door beats an hour of brute force that probably will not.', tone: 'caution' },
        ] },
        { type: 'callout', tone: 'evidence', title: 'Three next steps, each justified', md: '**1.** Enumerate the Tomcat manager (version has documented auth weaknesses). **2.** List SMB shares and users on .15 (cheap, often fruitful). **3.** Check RDP on .22 for NLA and valid usernames. Each names a test *and* the evidence that motivates it.' },
      ],
      notes: 'This is the exit-check rehearsal. Each next step = a test + its supporting evidence.',
    },
    {
      id: 's1-reasoning', kind: 'concept', tag: 'THE METHOD',
      title: 'Five questions you will ask all course long',
      lead: 'Apply them to your top next step: enumerating the Tomcat manager.',
      blocks: [
        { type: 'reasoning',
          evidence: 'nmap reports Apache Tomcat 9.0.30 on 8080 — a version with documented default-credential and manager-upload weaknesses.',
          conditions: 'The manager application must be reachable and either use weak/default credentials or be otherwise accessible.',
          proves: 'If I can authenticate and deploy, it proves code execution is possible — not merely that a banner exists.',
          next: 'If the manager is locked down, pivot to SMB enumeration on the same host before spending time on brute force.',
          rootcause: 'Remove or firewall the manager interface, and never ship default or weak credentials to production.',
        },
      ],
      notes: 'Model the five questions out loud. Students will internalise this rhythm by hearing it applied repeatedly.',
    },
    {
      id: 's1-mistakes', kind: 'mistakes', tag: 'COMMON MISTAKES',
      title: 'How reconnaissance goes wrong',
      blocks: [
        { type: 'list', style: 'cross', items: [
          { text: 'Scanning the whole range with `-A` at once — slow, loud, and it buries the signal.', tone: 'attacker' },
          { text: 'Trusting a version banner as fact instead of as a lead to validate.', tone: 'attacker' },
          { text: 'Skipping `-p-`, missing the service on a high port that was the real way in.', tone: 'attacker' },
          { text: 'Forgetting UDP entirely — SNMP and DNS on UDP are frequent footholds.', tone: 'attacker' },
          { text: 'Not saving output, so the evidence trail starts only once you get lucky.', tone: 'attacker' },
        ] },
        { type: 'callout', tone: 'caution', title: 'Troubleshooting a "dead" network', md: 'No hosts up? Separate the possibilities: wrong interface or route, ICMP filtered (try `-Pn` with a TCP probe), or genuinely empty. Diagnose before you conclude.' },
      ],
      notes: 'Invite war stories. Everyone has missed a service on a high port once.',
    },
    {
      id: 's1-discuss', kind: 'discuss', tag: 'DISCUSS',
      title: 'Defend your next move',
      lead: 'Work in pairs. You have five minutes.',
      blocks: [
        { type: 'prose', md: 'Using the service matrix from slide 08, each pair must choose **one** first action and defend it against the other pair\'s choice.' },
        { type: 'list', style: 'plain', items: [
          'Which single piece of evidence most supports your choice?',
          'What would a successful result prove — and what would it not prove?',
          'What is your fallback if the chosen path is a dead end?',
        ] },
      ],
      notes: 'Facilitate, do not resolve. Push students to cite evidence, not preference. Reward a good fallback plan as much as a good first move.',
    },
    {
      id: 's1-check', kind: 'check', tag: 'KNOWLEDGE CHECK',
      title: 'Check your understanding',
      blocks: [
        { type: 'check',
          q: 'A scan reports `445/tcp open Samba 4.6.2`. Is this a finding you can put in a report?',
          options: [
            { text: 'Yes — the version is known to be vulnerable, so it is a finding.' },
            { text: 'No — it is an observation; it becomes a finding only once I validate an actual weakness.', correct: true },
            { text: 'Yes, but only if the scanner also printed the word "vulnerable".' },
            { text: 'No — SMB is never reportable.' },
          ],
          answer: 'It is an **observation**. A version banner suggests a line of investigation; it does not establish impact. You must validate — enumerate shares, attempt a null session, or test a specific weakness — and capture reproducible evidence before it becomes a confirmed finding.',
        },
      ],
      notes: 'If the room splits, you have found exactly the misconception this course exists to fix. Spend time here.',
    },
    {
      id: 's1-recap', kind: 'recap', tag: 'RECAP & STUDY',
      title: 'What to carry into the lab',
      blocks: [
        { type: 'list', style: 'check', items: [
          'Scope defines what you may do and when to stop — reachable ≠ in scope.',
          'The lifecycle is a loop; name your current phase at all times.',
          'Discovery then enumeration: who is alive, then what is listening.',
          'An observation is a lead; a finding is validated and evidenced.',
          'A good plan is three next steps, each tied to a piece of evidence.',
        ] },
        { type: 'callout', tone: 'evidence', title: 'Independent study', md: 'Re-enumerate a practice host **without** a worksheet and build your own reusable service-enumeration checklist. You will refine it every week.' },
      ],
      notes: 'Close by connecting forward: next session turns an exposed service into a foothold. Today\'s matrix is what makes that targeted instead of random.',
    },
  ],
};
