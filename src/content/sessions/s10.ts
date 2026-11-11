import type { Session } from '../types';

export const s10: Session = {
  id: 's10', number: 10, week: 4, kind: 'theory', day: 'Sunday',
  dateISO: '2026-12-06', dateLabel: '6 Dec', durationHours: 3,
  topic: 'Reach the internal network and understand AD',
  title: 'Pivoting & AD Foundations',
  outcome: 'Draw an access path and explain its routing, name-resolution, and credential requirements.',
  summary: 'Pivoting, tunnelling, connectivity troubleshooting, and the building blocks of Active Directory.',
  stages: ['pivot', 'ad'], domains: ['exploit', 'ad'],
  sources: [
    { label: 'Linux pivoting notes', url: 'https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_LatMovement_Pivoting_Linux.pdf' },
    { label: 'Windows lateral movement notes', url: 'https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_LatMovement_Pivoting_Windows.pdf' },
    { label: 'Active Directory notes', url: 'https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_ADPentest.pdf' },
  ],
  independentStudy: 'Draw, from memory, the packet path from your attacker host to an internal domain controller through a pivot. Label every hop with the route, the name resolution, and the credential each step needs.',
  slides: [
    {
      id: 's10-title', kind: 'title', tag: 'WEEK 4 · SESSION 10 · THEORY',
      title: 'Reach the internal network and understand AD',
      subtitle: 'Pivoting, tunnelling, and the shape of a domain',
      lead: 'Your foothold has a second network interface. Behind it is the domain. Pivoting is how your tools follow you through.',
      blocks: [
        { type: 'figure', title: 'SESSION BRIEF', rows: [
          { k: 'OUTCOME', v: 'Draw an access path and explain its routing, name-resolution, and credential requirements.', tone: 'evidence' },
          { k: 'STAGE', v: 'Pivoting → Active Directory — stages 04–05', tone: 'cyan' },
          { k: 'EXIT CHECK', v: 'An access-path diagram with required routes and credentials.', tone: 'valid' },
        ] },
      ],
      notes: 'Two topics joined: how to reach the internal net, and what you will find there. Draw packet flow before demoing a tunnel.',
    },
    {
      id: 's10-scenario', kind: 'scenario', tag: 'SCENARIO',
      title: 'A door you can see but cannot reach',
      lead: 'From root on WEB01 you can ping 172.16.8.10 — a domain controller. From your own laptop, you cannot. Why, and what now?',
      blocks: [
        { type: 'prose', md: 'WEB01 is dual-homed: one interface in the DMZ you came from, another on the internal network. Your tools run on your laptop, which has no route to 172.16.8.0/24. Pivoting makes WEB01 carry your traffic into that network so your tools can reach the domain.' },
        { type: 'callout', tone: 'cyan', title: 'Reachability is not the same as a route', md: 'The DC is reachable *from WEB01*, not from you. The whole session is about bridging that gap — and then understanding the identity system waiting on the other side.' },
      ],
      notes: 'The dual-homed pivot host is the central image. Make the "reachable from there, not from here" distinction vivid.',
    },
    {
      id: 's10-objectives', kind: 'objectives', tag: 'OBJECTIVES',
      title: 'What you will be able to do',
      blocks: [
        { type: 'list', style: 'check', items: [
          'Distinguish pivoting from lateral movement, and state what each requires.',
          'Route traffic through a foothold using port forwarding, SOCKS, and SSH tunnels.',
          'Reason about which tools work over a proxy and which do not.',
          'Separate reachability, name-resolution, and authentication problems when troubleshooting.',
          'Name the core AD objects and the protocols that hold a domain together.',
        ] },
      ],
    },
    {
      id: 's10-pivot', kind: 'concept', tag: 'CONCEPT · 01',
      title: 'Pivoting vs lateral movement',
      lead: 'Related but distinct — and often confused.',
      blocks: [
        { type: 'compare', columns: [
          { title: 'Pivoting', tone: 'cyan', sub: 'routing', items: ['Using a foothold to reach networks you otherwise cannot', 'About traffic and routes', 'Prerequisite: a host with a second interface'] },
          { title: 'Lateral movement', tone: 'violet', sub: 'access', items: ['Using credentials/trust to access other hosts', 'About identity and authentication', 'Prerequisite: a usable credential or token'] },
        ] },
        { type: 'callout', tone: 'evidence', md: 'You often pivot *and then* move laterally: tunnel into the internal network (pivot), then authenticate to a server with a found credential (lateral movement).' },
      ],
      notes: 'Keep the two concepts cleanly separated. Students conflate them constantly; the distinction clarifies later AD work.',
    },
    {
      id: 's10-traffic', kind: 'demo', tag: 'DEMONSTRATE · 02',
      title: 'Moving traffic through the foothold',
      lead: 'Three common mechanisms, from a single port to a full proxy.',
      blocks: [
        { type: 'diagram', kind: 'pivot', caption: 'The foothold carries your tools into a network your own host cannot route to.' },
        { type: 'terminal', title: 'A SOCKS proxy over SSH, then tools over it', lines: [
          { text: 'ssh -D 1080 -N tomcat@10.10.24.15', kind: 'cmd' },
          { text: '# opens a local SOCKS proxy on 1080, tunnelled through WEB01', kind: 'comment' },
          { text: 'proxychains nmap -sT -Pn 172.16.8.10 -p 88,389,445', kind: 'cmd' },
          { text: '88/tcp open kerberos-sec', kind: 'out', tone: 'violet' },
          { text: '389/tcp open ldap', kind: 'out', tone: 'violet' },
        ] },
        { type: 'callout', tone: 'cyan', title: 'What the output tells you', md: 'Kerberos (88) and LDAP (389) answering through the tunnel means 172.16.8.10 is a domain controller — and your tools can now reach it. The pivot is working.' },
      ],
      study: [
        { type: 'prose', md: 'Three mechanisms cover most situations. **Local port forwarding** exposes one remote service on a local port — simple, limited to one destination. **A SOCKS proxy** (via SSH `-D`, or a tool like Chisel/Ligolo) routes many destinations, letting you run whole toolchains through the foothold. **Dynamic/reverse tunnels** help when the foothold cannot accept inbound connections. Match the mechanism to the task: one service vs a whole subnet, and inbound vs outbound reachability.' },
      ],
      notes: 'Draw the packet path on the board before showing the commands. The diagram should precede the demo.',
    },
    {
      id: 's10-toolcompat', kind: 'concept', tag: 'CONCEPT · 03',
      title: 'Not every tool survives a proxy',
      lead: 'SOCKS carries TCP cleanly; other things need care.',
      blocks: [
        { type: 'list', items: [
          { text: 'TCP connect scans and most clients work over SOCKS; raw/SYN scans and ICMP do not.' },
          { text: 'UDP-based services need a tunnel that supports UDP, not a plain SOCKS TCP proxy.' },
          { text: 'Tools that spawn their own connections may ignore the proxy unless wrapped (proxychains) or configured.' },
          { text: 'DNS resolution may still leak to your local resolver unless you force it through the tunnel.' },
        ] },
        { type: 'callout', tone: 'caution', md: 'When a tool "hangs" over a pivot, suspect a protocol the proxy cannot carry, or DNS resolving on the wrong side. Diagnose before blaming the target.' },
      ],
      notes: 'Tool-over-proxy quirks are a huge source of lab frustration. Naming them here saves hours later.',
    },
    {
      id: 's10-troubleshoot', kind: 'concept', tag: 'CONCEPT · 04',
      title: 'Connectivity troubleshooting, in layers',
      lead: 'When something fails, isolate which of three problems you actually have.',
      blocks: [
        { type: 'steps', items: [
          { label: 'Reachability', text: 'Can packets get there at all? Test the route/port through the pivot first.', tone: 'cyan' },
          { label: 'Name resolution', text: 'Does the name resolve — and on the correct (internal) resolver?', tone: 'evidence' },
          { label: 'Authentication', text: 'Only once you can reach and resolve: does the credential work?', tone: 'violet' },
        ] },
        { type: 'callout', tone: 'evidence', title: 'One problem at a time', md: 'Most "it won\'t connect" failures are solved by asking, in order: can I reach it, can I resolve it, can I authenticate? Conflating the three is how an hour disappears.' },
      ],
      notes: 'This three-layer isolation is the single most useful troubleshooting habit in the back half of the course.',
    },
    {
      id: 's10-adblocks', kind: 'diagram', tag: 'CONCEPT · 05',
      title: 'Active Directory building blocks',
      lead: 'The identity system you have just reached. Learn its objects before attacking it.',
      blocks: [
        { type: 'diagram', kind: 'adtree', caption: 'A domain is a directory of users, groups, computers, and the controllers that vouch for them.' },
        { type: 'list', columns: 2, items: [
          { text: '**Domain** — a boundary of shared identity and policy.' },
          { text: '**Domain controller (DC)** — authenticates and holds the directory.' },
          { text: '**Users & computers** — accounts; computers are accounts too.' },
          { text: '**Groups** — grants of access; nesting matters.' },
          { text: '**Service accounts** — run services, often over-privileged.' },
          { text: '**OUs** — organise objects and apply policy.' },
        ] },
      ],
      notes: 'Ground AD in objects before protocols. The service-account point foreshadows Kerberoasting next session.',
    },
    {
      id: 's10-context', kind: 'concept', tag: 'CONCEPT · 06',
      title: 'Local vs domain accounts',
      lead: 'Where an account lives decides what it can reach.',
      blocks: [
        { type: 'compare', columns: [
          { title: 'Local account', tone: 'caution', items: ['Exists on one machine only', 'Authenticated by that machine', 'Local admin ≠ domain privilege'] },
          { title: 'Domain account', tone: 'violet', items: ['Exists in the directory', 'Authenticated by a DC', 'Can reach many hosts across the domain'] },
        ] },
        { type: 'callout', tone: 'evidence', md: 'Local administrator on one box is powerful locally but may be invisible to the domain. A single domain *user*, by contrast, can often enumerate the entire directory. Knowing which you hold shapes every next step.' },
      ],
      notes: 'The local-admin-is-not-domain-admin point prevents a very common misunderstanding in the AD labs.',
    },
    {
      id: 's10-protocols', kind: 'concept', tag: 'CONCEPT · 07',
      title: 'The protocols that hold a domain together',
      blocks: [
        { type: 'table', head: ['Protocol', 'Port', 'Role', 'Why a tester cares'], rows: [
          ['DNS', '53', 'Finds the DC and services', 'Locate domain infrastructure'],
          ['LDAP', '389/636', 'Queries the directory', 'Enumerate users, groups, SPNs'],
          ['SMB', '445', 'Files, named pipes, admin', 'Shares, lateral movement, relay'],
          ['NTLM', '—', 'Challenge/response auth', 'Hashes, pass-the-hash, relay'],
          ['Kerberos', '88', 'Ticket-based auth', 'Roasting, pass-the-ticket'],
        ] },
        { type: 'callout', tone: 'evidence', md: 'Each protocol is both how the domain functions and where it can be abused. Next session turns LDAP and Kerberos from infrastructure into attack surface.' },
      ],
      notes: 'This table seeds the entire AD enumeration + Kerberos session. Keep it; students will refer back to it.',
    },
    {
      id: 's10-reasoning', kind: 'concept', tag: 'THE METHOD',
      title: 'Five questions for your access path',
      blocks: [
        { type: 'reasoning',
          evidence: 'WEB01 holds a second interface on 172.16.8.0/24, and through a SOCKS tunnel the host 172.16.8.10 answers on Kerberos (88) and LDAP (389).',
          conditions: 'The pivot must carry TCP to the internal subnet, internal DNS must resolve domain names, and a domain credential must exist for authenticated enumeration.',
          proves: 'It proves a working route to a domain controller and that the internal domain is now reachable for enumeration — not yet that any account is compromised.',
          next: 'Enumerate the domain over LDAP and look for weak service accounts and credential exposures.',
          rootcause: 'Segment the DMZ from internal networks and avoid dual-homed hosts that bridge trust boundaries.',
        },
      ],
      notes: 'The reasoning block is the exit check: an access path with routes and credentials spelled out.',
    },
    {
      id: 's10-mistakes', kind: 'mistakes', tag: 'COMMON MISTAKES',
      title: 'How pivoting goes wrong',
      blocks: [
        { type: 'list', style: 'cross', items: [
          { text: 'Running a SYN or ICMP scan through a SOCKS proxy, which only carries TCP connect traffic.', tone: 'attacker' },
          { text: 'Letting DNS resolve on your local machine, so internal names never resolve correctly.', tone: 'attacker' },
          { text: 'Confusing pivoting with lateral movement, and hunting for an exploit when you need a credential.', tone: 'attacker' },
          { text: 'Bridging a DMZ host into the internal net without realising you are crossing a trust boundary.', tone: 'attacker' },
          { text: 'Blaming the target when a tool "hangs", instead of isolating reachability vs resolution vs auth.', tone: 'attacker' },
        ] },
      ],
      notes: 'The SOCKS-only-carries-TCP and DNS-leak mistakes will happen in tomorrow’s lab. Pre-empt them here.',
    },
    {
      id: 's10-discuss', kind: 'discuss', tag: 'DISCUSS',
      title: 'Draw the path',
      lead: 'In pairs, five minutes, at the whiteboard.',
      blocks: [
        { type: 'prose', md: 'Draw the full packet path from your attacker host to the internal domain controller through the pivot. Label every hop, then have the other pair find the one place your diagram is wrong or incomplete.' },
        { type: 'list', style: 'plain', items: [
          'Where does name resolution happen, and on which resolver?',
          'Which hops carry which protocols — and which would break over SOCKS?',
          'What credential does each step require, and do you hold it yet?',
        ] },
      ],
      notes: 'The act of drawing the path is the exit check. Common error: resolving on the wrong resolver. Let the peer pair catch it.',
    },
    {
      id: 's10-check', kind: 'check', tag: 'KNOWLEDGE CHECK',
      title: 'Check your understanding',
      blocks: [
        { type: 'check',
          q: 'Through your SOCKS pivot, `proxychains nmap` reports a host as down, but you are sure it is up. What should you suspect first?',
          options: [
            { text: 'The host is genuinely offline.' },
            { text: 'A reachability/protocol issue — e.g. an ICMP or SYN scan that SOCKS cannot carry; use a TCP connect scan with -Pn.', correct: true },
            { text: 'Your credential is wrong.' },
            { text: 'Active Directory is blocking you.' },
          ],
          answer: 'Suspect a **protocol the proxy cannot carry**. SOCKS forwards TCP connections, not ICMP pings or raw SYN scans, so a default nmap "host down" through a proxy is usually a scan-type problem, not a dead host. Use a TCP connect scan (`-sT`) with `-Pn` (skip ping) through proxychains. This is a reachability problem, which comes before name resolution and authentication in the troubleshooting order.',
        },
      ],
      notes: 'This exact failure will happen in the lab. Pre-loading the answer saves the whole room time.',
    },
    {
      id: 's10-recap', kind: 'recap', tag: 'RECAP & STUDY',
      title: 'What to carry into the lab',
      blocks: [
        { type: 'list', style: 'check', items: [
          'Pivoting moves traffic; lateral movement uses identity. Often both in sequence.',
          'Match the tunnel to the task: one service vs a subnet, inbound vs outbound.',
          'Troubleshoot in order: reachability, then name resolution, then authentication.',
          'Know your AD objects before you attack them; learn which account you hold.',
          'DNS, LDAP, SMB, NTLM, Kerberos — infrastructure and attack surface at once.',
        ] },
        { type: 'callout', tone: 'cyan', title: 'Independent study', md: 'Draw the packet path from your attacker host to an internal DC through a pivot. Label every hop with its route, name resolution, and the credential it needs.' },
      ],
      notes: 'Next session: enumerate the domain you can now reach, and meet Kerberos’s roastable weaknesses.',
    },
  ],
};
