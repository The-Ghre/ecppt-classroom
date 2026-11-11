/* Data for the two interactive signature diagrams.
   Kept separate so the inline slide blocks and the standalone explorers
   render from one source of truth. All hosts are synthetic lab assets. */

export interface ChainStep {
  id: string;
  n: number;
  stage: string;
  tone: 'evidence' | 'attacker' | 'valid' | 'cyan' | 'violet';
  title: string;
  host: string;
  action: string;
  evidence: string;
  proves: string;
  week: number;
}

/* A complete, evidenced attack path through the capstone-style lab. */
export const CHAIN: ChainStep[] = [
  { id: 'recon', n: 1, stage: 'Reconnaissance', tone: 'evidence', title: 'Discover & enumerate', host: '10.10.24.0/24',
    action: 'Sweep the subnet, identify live hosts, fingerprint services and versions.',
    evidence: 'A host-and-service matrix: 10.10.24.15 exposes SMB (445) and a web app (8080); versions recorded.',
    proves: 'An attack surface exists and is mapped — nothing is confirmed exploitable yet.', week: 1 },
  { id: 'access', n: 2, stage: 'Initial Access', tone: 'attacker', title: 'Land a foothold', host: 'WEB01 · 10.10.24.15',
    action: 'Validate a file-upload weakness in the web app and obtain a low-privilege shell as the service account.',
    evidence: 'A reverse shell as `www-data`; the uploaded handler returns command output.',
    proves: 'The entry point is real and reachable — we have code execution, not just a theory.', week: 2 },
  { id: 'escalate', n: 3, stage: 'Privilege Escalation', tone: 'attacker', title: 'Become root', host: 'WEB01 · 10.10.24.15',
    action: 'Enumerate the host; a mis-set SUID binary allows a shell with elevated privileges.',
    evidence: '`id` returns `uid=0(root)`; the SUID path and its exploitation are recorded.',
    proves: 'Full control of the first host — and a pivot point into whatever it can reach.', week: 3 },
  { id: 'pivot', n: 4, stage: 'Pivoting', tone: 'cyan', title: 'Reach the internal segment', host: '172.16.8.0/24',
    action: 'Route traffic through WEB01 into the internal network that hosts the domain.',
    evidence: 'A SOCKS proxy over the foothold; internal host 172.16.8.10 answers on 445 and 389.',
    proves: 'Reachability to the internal segment — the domain is now in scope.', week: 4 },
  { id: 'ad', n: 5, stage: 'Active Directory', tone: 'violet', title: 'Validate an identity path', host: 'DC01 · CORP.LOCAL',
    action: 'Enumerate the domain; a service account with a weak password is Kerberoastable.',
    evidence: 'A cracked service-account hash; BloodHound shows it has a path to Domain Admins.',
    proves: 'A credential-backed route toward domain privilege — tested, not assumed.', week: 5 },
  { id: 'impact', n: 6, stage: 'Objective & Impact', tone: 'valid', title: 'Reach the objective', host: 'DC01 · CORP.LOCAL',
    action: 'Use the validated path to authenticate to the domain controller and demonstrate control.',
    evidence: 'Administrative access to DC01; the designated synthetic objective is retrieved.',
    proves: 'Business impact is demonstrated end-to-end, with evidence and a remediation point at every hop.', week: 5 },
];

/* Explorable topology: attacker → pivot host → internal segment → domain. */
export interface TopoNode {
  id: string;
  label: string;
  sub: string;
  x: number; y: number;
  seg: 'attacker' | 'dmz' | 'internal';
  tone: 'evidence' | 'attacker' | 'cyan' | 'violet' | 'valid';
  reach: string;      // reachability
  name: string;       // name resolution
  creds: string;      // credentials required
  note: string;
}

export const TOPO_NODES: TopoNode[] = [
  { id: 'kali', label: 'Attacker', sub: 'kali · 10.10.24.5', x: 70, y: 150, seg: 'attacker', tone: 'attacker',
    reach: 'Direct line of sight to the DMZ subnet 10.10.24.0/24 only.',
    name: 'Resolves public/DMZ names; cannot resolve corp.local.',
    creds: 'None initially — this is where the engagement starts.',
    note: 'Your workstation. Everything beyond the DMZ must be reached through a foothold.' },
  { id: 'web01', label: 'WEB01', sub: 'DMZ · 10.10.24.15', x: 300, y: 150, seg: 'dmz', tone: 'evidence',
    reach: 'Dual-homed: faces the DMZ and holds a second NIC on 172.16.8.0/24.',
    name: 'Can resolve corp.local via the internal DNS at 172.16.8.10.',
    creds: 'Foothold as `www-data`, then root after local escalation.',
    note: 'The pivot host. Its second interface is the bridge into the internal network.' },
  { id: 'file02', label: 'FILE02', sub: 'Internal · 172.16.8.25', x: 540, y: 70, seg: 'internal', tone: 'cyan',
    reach: 'Reachable only from inside 172.16.8.0/24 — i.e. through WEB01.',
    name: 'Domain-joined; registered in corp.local DNS.',
    creds: 'Domain user to read shares; local admin via credential reuse.',
    note: 'A member server hosting shares — a common place to find stored credentials.' },
  { id: 'dc01', label: 'DC01', sub: 'corp.local · 172.16.8.10', x: 540, y: 230, seg: 'internal', tone: 'violet',
    reach: 'Reachable only through the pivot; exposes 445, 389, 88 (Kerberos).',
    name: 'The domain controller and internal DNS server for corp.local.',
    creds: 'Domain Admin (the objective) via a validated identity path.',
    note: 'The domain controller — the identity authority and the capstone objective.' },
];

export const TOPO_LINKS: [string, string, string][] = [
  ['kali', 'web01', 'DMZ link · 10.10.24.0/24'],
  ['web01', 'file02', 'Internal · 172.16.8.0/24'],
  ['web01', 'dc01', 'Internal · 172.16.8.0/24'],
  ['file02', 'dc01', 'Domain membership'],
];

/* Kerberos message flow for the auth-protocol diagram. */
export const KERBEROS = [
  { n: 1, from: 'client', to: 'kdc', msg: 'AS-REQ', note: 'Client requests a TGT (optionally pre-authenticated).', tone: 'evidence' },
  { n: 2, from: 'kdc', to: 'client', msg: 'AS-REP', note: 'KDC returns a TGT encrypted with the krbtgt key.', tone: 'evidence', weak: 'AS-REP roasting: accounts with pre-auth disabled leak a crackable blob here.' },
  { n: 3, from: 'client', to: 'kdc', msg: 'TGS-REQ', note: 'Client presents the TGT to request a service ticket (SPN).', tone: 'cyan' },
  { n: 4, from: 'kdc', to: 'client', msg: 'TGS-REP', note: 'KDC returns a service ticket encrypted with the service account key.', tone: 'cyan', weak: 'Kerberoasting: any domain user can request this ticket and crack the service account password offline.' },
  { n: 5, from: 'client', to: 'service', msg: 'AP-REQ', note: 'Client presents the service ticket to the target service.', tone: 'violet' },
];
