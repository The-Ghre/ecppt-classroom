import type { Session } from '../types';

export const s7: Session = {
  id: 's7', number: 7, week: 3, kind: 'theory', day: 'Sunday',
  dateISO: '2026-11-29', dateLabel: '29 Nov', durationHours: 3,
  topic: 'Linux privilege escalation',
  title: 'Linux Privilege Escalation',
  outcome: 'Explain an escalation path, the conditions it requires, and its remediation.',
  summary: 'Local context, permissions, SUID/sudo, scheduled tasks, stored credentials, and triage.',
  stages: ['escalate'], domains: ['exploit'],
  sources: [
    { label: 'Linux privilege escalation notes', url: 'https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_Privesc_Linux.pdf' },
  ],
  independentStudy: 'Build a Linux enumeration checklist ordered by likelihood and effort. For your top five checks, write what a positive result would look like and which escalation it would enable.',
  slides: [
    {
      id: 's7-title', kind: 'title', tag: 'WEEK 3 · SESSION 07 · THEORY',
      title: 'Linux privilege escalation',
      subtitle: 'From a foothold to root — by evidence, not luck',
      lead: 'You landed as a low-privilege service account. Escalation is reading the system\'s own misconfigurations back to it.',
      blocks: [
        { type: 'figure', title: 'SESSION BRIEF', rows: [
          { k: 'OUTCOME', v: 'Explain an escalation path, the conditions it requires, and its remediation.', tone: 'evidence' },
          { k: 'STAGE', v: 'Privilege Escalation — stage 03 of the attack chain', tone: 'attacker' },
          { k: 'STARTS FROM', v: 'The foothold from Week 1/2: a shell as a non-root user.' },
          { k: 'EXIT CHECK', v: 'Describe one escalation path, its prerequisites, and its remediation.', tone: 'valid' },
        ] },
      ],
      notes: 'Frame escalation as reading, not attacking. The system tells you how to escalate if you enumerate carefully.',
    },
    {
      id: 's7-scenario', kind: 'scenario', tag: 'SCENARIO',
      title: 'You are www-data. Now what?',
      lead: 'A shell on WEB01, running as the Tomcat service account. No root, no sudo password, no obvious door.',
      blocks: [
        { type: 'prose', md: 'Escalation is rarely a single magic exploit. It is systematic enumeration of the local context — identity, files, services, scheduled tasks, stored secrets — looking for one misconfiguration that grants more than it should.' },
        { type: 'callout', tone: 'caution', title: 'Misconfiguration before kernel exploit', md: 'Reach for a mis-set permission, a writable service, or a stored credential long before a kernel exploit. Kernel exploits are fragile, can crash the host, and are the noisy last resort — not the first move.' },
      ],
      notes: 'Set the priority order now: enumerate misconfigs first, kernel exploits last. It recurs all session.',
    },
    {
      id: 's7-objectives', kind: 'objectives', tag: 'OBJECTIVES',
      title: 'What you will be able to do',
      blocks: [
        { type: 'list', style: 'check', items: [
          'Establish local context: identity, groups, processes, services, and software.',
          'Reason about file permissions and ownership as escalation opportunities.',
          'Identify SUID/SGID binaries and sudo rules worth investigating.',
          'Find writable scripts, scheduled tasks, and service configurations.',
          'Locate stored credentials in configs, history, and application directories.',
          'Prioritise candidates by feasibility and impact, and validate one by hand.',
        ] },
      ],
    },
    {
      id: 's7-context', kind: 'demo', tag: 'DEMONSTRATE · 01',
      title: 'Establish local context',
      lead: 'Before hunting vulnerabilities, learn who and where you are.',
      blocks: [
        { type: 'terminal', title: 'The opening enumeration', lines: [
          { text: 'id', kind: 'cmd' },
          { text: 'uid=997(tomcat) gid=997(tomcat) groups=997(tomcat),4(adm)', kind: 'out', tone: 'caution' },
          { text: 'sudo -l', kind: 'cmd' },
          { text: 'Sorry, user tomcat may not run sudo.', kind: 'out' },
          { text: 'ps aux | grep root', kind: 'cmd' },
          { text: 'root   /opt/backup/run.sh   (runs every 5 min)', kind: 'out', tone: 'caution' },
        ] },
        { type: 'callout', tone: 'evidence', title: 'Reading the evidence', md: 'Membership of `adm` (log access) and a root-owned script running on a schedule are both leads. No single command escalates — the *combination* of findings points at a path.' },
      ],
      study: [
        { type: 'prose', md: 'Run a structured sweep: identity and groups, network interfaces and listening ports, running processes (especially those owned by root), installed software and versions, writable locations, and the contents of your own home and the web root. Automated scripts (LinPEAS and similar) accelerate this, but you must be able to read their output critically — they flag *possibilities*, and most are noise. The skill is triage.' },
      ],
      notes: 'The adm group + root cron is the planted path. Let students connect the two findings rather than handing it over.',
    },
    {
      id: 's7-perms', kind: 'concept', tag: 'CONCEPT · 02',
      title: 'Permissions and ownership',
      lead: 'A writable thing that a higher-privileged process trusts is an escalation waiting to happen.',
      blocks: [
        { type: 'list', items: [
          { text: '**World-writable files** that a root process reads or executes.' },
          { text: '**Weak ownership** — a config or script you can edit that runs as someone else.' },
          { text: '**Writable PATH directories** that let you shadow a command a privileged script calls.' },
          { text: '**Group membership** (e.g. `docker`, `lxd`, `disk`) that grants an indirect route to root.' },
        ] },
        { type: 'callout', tone: 'evidence', md: 'The recurring question: *who trusts this resource, and can I change it?* A root cron that runs a script you can write is a direct path to root.' },
      ],
      notes: 'The "who trusts this, can I change it" question generalises every Linux privesc. Repeat it.',
    },
    {
      id: 's7-suid', kind: 'demo', tag: 'DEMONSTRATE · 03',
      title: 'SUID, SGID, and sudo',
      lead: 'Programs that run with elevated privilege — and the rules that let you invoke them.',
      blocks: [
        { type: 'terminal', title: 'Finding elevated execution', lines: [
          { text: 'find / -perm -4000 -type f 2>/dev/null', kind: 'cmd' },
          { text: '/usr/bin/passwd', kind: 'out' },
          { text: '/usr/bin/find', kind: 'out', tone: 'attacker' },
          { text: '# find with SUID can run commands as its owner (root)', kind: 'comment' },
          { text: 'sudo -l', kind: 'cmd' },
          { text: '(root) NOPASSWD: /usr/bin/vim /etc/app.conf', kind: 'out', tone: 'attacker' },
        ] },
        { type: 'callout', tone: 'attacker', title: 'Legitimate tools, illegitimate privilege', md: 'A SUID `find`, or a `sudo` rule letting you run `vim` as root, both allow a shell as root through the program\'s own features. The binary is not "hacked" — it is trusted with power it should not have in this configuration.' },
      ],
      study: [
        { type: 'prose', md: 'Many standard binaries, when given SUID or allowed via sudo, can be made to spawn a shell or read/write arbitrary files as root — this is what the community catalogues as "living off the land" binaries. The lesson for a tester is to check each elevated binary against what it can be *made* to do; the lesson for a defender is to grant the narrowest possible sudo rule and to audit SUID bits. Validate by actually obtaining the elevated shell in the lab and recording the exact steps.' },
      ],
      notes: 'Reference GTFOBins conceptually without turning the slide into a payload dump. The teaching point is trust + capability.',
    },
    {
      id: 's7-tasks', kind: 'concept', tag: 'CONCEPT · 04',
      title: 'Scheduled tasks and services',
      lead: 'Anything root runs automatically is a target — if any part of it is writable by you.',
      blocks: [
        { type: 'steps', items: [
          { label: 'Find the automation', text: 'Cron jobs, systemd timers, and services that run as root.', tone: 'evidence' },
          { label: 'Trace what it touches', text: 'The script it runs, the files it reads, the PATH it uses, the wildcard it expands.', tone: 'caution' },
          { label: 'Find your writable foothold', text: 'If any link in that chain is writable by you, you can make root run your code.', tone: 'attacker' },
        ] },
        { type: 'callout', tone: 'caution', title: 'Restore what you change', md: 'If you modify a script to prove escalation, record the original and restore it. In a lab you keep it usable for others; in an engagement you leave the system as you found it.' },
      ],
      notes: 'Restoration and clean-up is a professional habit worth teaching from the start.',
    },
    {
      id: 's7-creds', kind: 'concept', tag: 'CONCEPT · 05',
      title: 'Locally stored credentials',
      lead: 'The easiest escalation is a password someone left lying around.',
      blocks: [
        { type: 'list', columns: 2, items: [
          { text: 'Config files (`.env`, `config.php`, connection strings).' },
          { text: 'Shell history (`~/.bash_history`).' },
          { text: 'Application and backup directories.' },
          { text: 'SSH keys and known_hosts.' },
          { text: 'Database dumps and log files.' },
          { text: 'Credential managers and cached tokens.' },
        ] },
        { type: 'callout', tone: 'evidence', md: 'A found credential sends you straight back to enumeration — now as a different, possibly privileged, user. The lifecycle loop from Session 01, in action on a single host.' },
      ],
      notes: 'Tie the found credential back to the lifecycle loop and to credential reuse from Session 02.',
    },
    {
      id: 's7-triage', kind: 'concept', tag: 'CONCEPT · 06',
      title: 'Triage: which candidate first?',
      lead: 'Enumeration produces a list of maybes. Rank them before you spend time.',
      blocks: [
        { type: 'table', head: ['Candidate', 'Feasibility', 'Impact', 'Noise', 'Order'], rows: [
          ['Writable root cron script', 'High', 'Root', 'Low', '1'],
          ['sudo NOPASSWD on an editor', 'High', 'Root', 'Low', '2'],
          ['Stored DB credential', 'Medium', 'Lateral', 'Low', '3'],
          ['Kernel exploit (known CVE)', 'Low', 'Root', 'High (crash risk)', 'Last'],
        ] },
        { type: 'callout', tone: 'caution', md: 'Misconfigurations before kernel exploits, every time. The kernel exploit is last not because it is hard, but because it is fragile and can take the host down with it.' },
      ],
      notes: 'This triage table is the escalation equivalent of Session 01\'s prioritisation. Same discipline, new stage.',
    },
    {
      id: 's7-reasoning', kind: 'concept', tag: 'THE METHOD',
      title: 'Five questions for your chosen path',
      blocks: [
        { type: 'reasoning',
          evidence: 'A root-owned script in /opt/backup runs every five minutes, and the script file is group-writable by a group I belong to.',
          conditions: 'I must have write access to a file the scheduled root process executes, and the schedule must fire within my window.',
          proves: 'Writing a command into that script and waiting for the next run proves code execution as root — demonstrated by a new root-owned artefact.',
          next: 'With root on WEB01, enumerate for stored credentials and the second network interface that leads to the internal segment.',
          rootcause: 'Make privileged scripts non-writable by unprivileged users, and run scheduled jobs with least privilege.',
        },
      ],
      notes: 'The reasoning block doubles as the exit-check. Have a student narrate it for a different candidate.',
    },
    {
      id: 's7-mistakes', kind: 'mistakes', tag: 'COMMON MISTAKES',
      title: 'How Linux privesc goes wrong',
      blocks: [
        { type: 'list', style: 'cross', items: [
          { text: 'Reaching for a kernel exploit first and crashing the host.', tone: 'attacker' },
          { text: 'Running LinPEAS and acting on every flag without triage.', tone: 'attacker' },
          { text: 'Finding a SUID binary but not checking what it can actually be made to do.', tone: 'attacker' },
          { text: 'Editing a root script to escalate and never restoring it.', tone: 'attacker' },
          { text: 'Missing a credential in plain sight in a config file or shell history.', tone: 'attacker' },
        ] },
      ],
      notes: 'The kernel-first mistake is the most dangerous in a real engagement. Emphasise the crash risk.',
    },
    {
      id: 's7-discuss', kind: 'discuss', tag: 'DISCUSS',
      title: 'Rank the candidates',
      lead: 'In pairs, five minutes, using an enumeration dump the instructor provides.',
      blocks: [
        { type: 'prose', md: 'You are handed a list of enumeration findings on a Linux host. Rank your top three escalation candidates and defend the order against the other pair.' },
        { type: 'list', style: 'plain', items: [
          'Which candidate is most feasible, and what single piece of evidence tells you so?',
          'Which has the highest impact, and which the lowest noise/risk?',
          'Where does a kernel exploit sit in your ranking — and why there?',
        ] },
      ],
      notes: 'Reward the ranking reasoning, not just the right answer. The kernel-exploit-last placement is the key judgement to surface.',
    },
    {
      id: 's7-check', kind: 'check', tag: 'KNOWLEDGE CHECK',
      title: 'Check your understanding',
      blocks: [
        { type: 'check',
          q: '`sudo -l` shows: `(root) NOPASSWD: /usr/bin/find`. Why is this an escalation path?',
          options: [
            { text: 'It is not — find only searches for files.' },
            { text: 'find can execute commands via its own options, so running it as root yields a root shell.', correct: true },
            { text: 'Only because find is SUID.' },
            { text: 'It lets you read /etc/passwd, nothing more.' },
          ],
          answer: '`find` has an `-exec` option that runs arbitrary commands. When sudo lets you run `find` as root with no password, you can have it execute a shell — giving you root. The binary is not broken; it is trusted with a capability (running commands) that, combined with root, becomes an escalation. The fix is a far narrower sudo rule.',
        },
      ],
      notes: 'If students miss this, revisit the "trusted with a capability it should not have" framing.',
    },
    {
      id: 's7-recap', kind: 'recap', tag: 'RECAP & STUDY',
      title: 'What to carry into the lab',
      blocks: [
        { type: 'list', style: 'check', items: [
          'Escalation is systematic enumeration, not one magic exploit.',
          'Ask of every resource: who trusts this, and can I change it?',
          'SUID/sudo give ordinary binaries extraordinary, abusable capability.',
          'Misconfigurations before kernel exploits — always.',
          'A found credential restarts the loop as a new user.',
        ] },
        { type: 'callout', tone: 'evidence', title: 'Independent study', md: 'Build a Linux enumeration checklist ordered by likelihood and effort. For your top five checks, write what a positive result looks like and which escalation it enables.' },
      ],
      notes: 'Next session: the same discipline on Windows, plus the start of exploit-development foundations.',
    },
  ],
};
