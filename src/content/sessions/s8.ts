import type { Session } from '../types';

export const s8: Session = {
  id: 's8', number: 8, week: 3, kind: 'theory', day: 'Tuesday',
  dateISO: '2026-12-01', dateLabel: '1 Dec', durationHours: 3,
  topic: 'Windows privilege escalation and exploit development foundations',
  title: 'Windows Privesc & Exploit Foundations',
  outcome: 'Explain a Windows escalation opportunity and identify assumptions in a supplied exploit.',
  summary: 'Windows security context, PowerShell enumeration, and reading a proof of concept.',
  stages: ['escalate'], domains: ['exploit', 'devel'],
  sources: [
    { label: 'Windows privilege escalation notes', url: 'https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_Privesc_Windows.pdf' },
    { label: 'PowerShell notes', url: 'https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_PowerShell.pdf' },
    { label: 'INE eCPPT objectives (Exploit Development)', url: 'https://ine.com/security/certifications/ecppt-certification' },
  ],
  independentStudy: 'Complete the prepared debugger exercise: identify where the crash occurs, and write two sentences on why DEP and ASLR complicate turning that crash into execution. Refine your separate Linux and Windows enumeration checklists.',
  slides: [
    {
      id: 's8-title', kind: 'title', tag: 'WEEK 3 · SESSION 08 · THEORY',
      title: 'Windows escalation & exploit foundations',
      subtitle: 'Two halves: becoming SYSTEM, and reading the exploit you run',
      lead: 'First, the same escalation discipline on Windows. Then the beginnings of understanding what an exploit actually does.',
      blocks: [
        { type: 'figure', title: 'SESSION BRIEF', rows: [
          { k: 'OUTCOME', v: 'Explain a Windows escalation opportunity and identify the assumptions in a supplied exploit.', tone: 'evidence' },
          { k: 'STAGE', v: 'Privilege Escalation — stage 03, plus exploit-development foundations', tone: 'attacker' },
          { k: 'STRUCTURE', v: 'Half 1 — Windows privesc. Half 2 — exploit fundamentals.', tone: 'caution' },
          { k: 'EXIT CHECK', v: 'Explain one Windows escalation opportunity and annotate the exploit\u2019s assumptions.', tone: 'valid' },
        ] },
      ],
      notes: 'Flag the two-half structure. Keep a clear break between them. Exploit dev is conceptual — understanding, not weaponisation.',
    },
    {
      id: 's8-scenario', kind: 'scenario', tag: 'SCENARIO',
      title: 'A low-privilege shell on a Windows host',
      lead: 'You have a shell as a standard domain user on APP02. SYSTEM is the goal. And the only public exploit you can find "doesn\'t work".',
      blocks: [
        { type: 'prose', md: 'Two problems, one session. The Windows host needs methodical escalation enumeration — different objects, same discipline as Linux. And that "broken" exploit is almost certainly fine; it simply assumes an environment you have not matched yet. Learning to read its assumptions is the second half.' },
        { type: 'callout', tone: 'caution', title: 'Why exploit foundations matter here', md: 'The eCPPT objectives include exploit development. You will not write exploits from scratch in this course — but you must be able to read a proof of concept, see its assumptions, and adapt it. That is the realistic, professional skill.' },
      ],
      notes: 'Set expectations on exploit dev: we build the reading-and-adapting skill, not from-scratch 0-day development.',
    },
    {
      id: 's8-objectives', kind: 'objectives', tag: 'OBJECTIVES',
      title: 'What you will be able to do',
      blocks: [
        { type: 'list', style: 'check', items: [
          'Describe the Windows security context: users, groups, privileges, integrity, UAC.',
          'Use PowerShell to enumerate escalation candidates and read the results.',
          'Identify service, path, scheduled-task, and autorun misconfigurations.',
          'Read a proof of concept and list its environment-specific assumptions.',
          'Explain, at a high level, how a buffer overflow works and what DEP/ASLR do.',
          'Troubleshoot why a supplied exploit fails against your target.',
        ] },
      ],
    },
    {
      id: 's8-half1', kind: 'concept', tag: 'HALF 1 · WINDOWS PRIVESC',
      title: 'The Windows security context',
      lead: 'Different vocabulary from Linux, same question: what am I trusted with that I should not be?',
      blocks: [
        { type: 'list', items: [
          { text: '**Users & groups** — local vs domain; membership of privileged groups.' },
          { text: '**Privileges** — tokens like `SeImpersonatePrivilege` that enable specific escalations.' },
          { text: '**Integrity levels** — Low/Medium/High/System; what a process may touch.' },
          { text: '**UAC** — the boundary between a filtered admin token and a full one.' },
        ] },
        { type: 'callout', tone: 'evidence', md: 'On Windows, a *privilege* held by your token can be worth more than group membership. `SeImpersonatePrivilege` on a service account, for instance, is a well-known route to SYSTEM.' },
      ],
      notes: 'Map Windows concepts back to the Linux question. The privilege-token idea is the big new concept.',
    },
    {
      id: 's8-ps', kind: 'demo', tag: 'HALF 1 · DEMONSTRATE',
      title: 'PowerShell for enumeration',
      lead: 'One language to read identity, services, and the misconfigurations that escalate.',
      blocks: [
        { type: 'terminal', title: 'Reading the Windows context', lines: [
          { text: 'whoami /priv', kind: 'cmd' },
          { text: 'SeImpersonatePrivilege            Enabled', kind: 'out', tone: 'attacker' },
          { text: 'Get-CimInstance Win32_Service | ? { $_.StartName -eq "LocalSystem" }', kind: 'cmd' },
          { text: 'AppUpdater   Path: C:\\Program Files\\App Updater\\up.exe', kind: 'out', tone: 'caution' },
          { text: 'icacls "C:\\Program Files\\App Updater\\up.exe"', kind: 'cmd' },
          { text: 'BUILTIN\\Users:(F)', kind: 'out', tone: 'attacker' },
        ] },
        { type: 'callout', tone: 'attacker', title: 'The chain, visible', md: 'A SYSTEM service runs a binary (`up.exe`) that ordinary users can fully modify (`Users:(F)` = full control). Replace the binary, restart the service, and your code runs as SYSTEM. Three findings, one path.' },
      ],
      study: [
        { type: 'prose', md: 'Windows escalation candidates cluster into a few families: insecure service binaries and paths (including unquoted service paths), weak service permissions, scheduled tasks and autoruns pointing at writable locations, always-install-elevated policies, and abusable token privileges. Tools such as WinPEAS or PowerUp automate the discovery, but — as on Linux — they report possibilities, and your job is to validate one and record the exact steps. Note the OS build too: some escalations depend on a patch level, which is the bridge to the exploit half of this session.' },
      ],
      notes: 'The writable SYSTEM-service binary is the planted path. Let students assemble the three findings into a chain.',
    },
    {
      id: 's8-candidates', kind: 'concept', tag: 'HALF 1 · CONCEPT',
      title: 'Windows escalation candidates',
      blocks: [
        { type: 'table', head: ['Candidate', 'What to check', 'Why it escalates'], rows: [
          ['Weak service permissions', 'Can you change the binary or config?', 'Service runs your code as its (SYSTEM) account'],
          ['Unquoted service path', 'Spaces in path + writable dir', 'Windows may run your planted executable'],
          ['Scheduled tasks / autoruns', 'Writable target or path', 'Runs as the task owner on trigger'],
          ['Token privileges', 'whoami /priv (e.g. SeImpersonate)', 'Specific, well-documented SYSTEM routes'],
          ['Stored credentials', 'Saved creds, PowerShell history', 'Reuse as a higher-privileged user'],
        ] },
        { type: 'callout', tone: 'caution', md: 'Compatibility matters: a credential or exploit only helps if the OS version and patch level match its prerequisites. Record the build number early.' },
      ],
      notes: 'Compatibility (build/patch level) is the natural bridge into the exploit half. Flag it here.',
    },
    {
      id: 's8-compat', kind: 'concept', tag: 'HALF 1 · CONCEPT',
      title: 'Credentials and compatibility',
      lead: 'Two quieter routes: secrets Windows has already stored, and exploits that match the exact build.',
      blocks: [
        { type: 'compare', columns: [
          { title: 'Stored credentials', tone: 'attacker', items: [
            '`cmdkey /list` shows credentials saved for other targets',
            'PowerShell history — path from `(Get-PSReadLineOption).HistorySavePath` — can hold typed passwords',
            'Configuration and unattended-setup files may contain admin passwords',
            'Test any credential you find for reuse, within scope',
          ] },
          { title: 'Compatibility', tone: 'caution', items: [
            'Record the OS edition, build and installed patches (`systeminfo`)',
            'Kernel and service exploits apply to specific builds only',
            'The payload architecture (x86 or x64) must match the target',
            'A mismatch fails silently — or crashes the host',
          ] },
        ] },
        { type: 'callout', tone: 'evidence', title: 'Compatibility is evidence too', md: 'Before choosing an exploit, write down the build and patch level you observed. That record is what justifies — or rules out — the exploit, and it is the bridge to the second half of this session.' },
      ],
      notes: 'This is the outline\'s "credentials and compatibility" item. The build number recorded here is reused when students annotate the PoC\'s assumptions.',
    },
    {
      id: 's8-half2', kind: 'concept', tag: 'HALF 2 · EXPLOIT FOUNDATIONS',
      title: 'Reading a proof of concept',
      lead: 'Most "the exploit is broken" problems are unmet assumptions. Learn to find them before you run it.',
      blocks: [
        { type: 'list', items: [
          { text: '**Target assumptions** — exact version, architecture, language/locale, patch level.' },
          { text: '**Environment values** — hardcoded IPs, ports, offsets, and file paths to change.' },
          { text: '**Payload assumptions** — what shellcode it uses and what it expects to connect back to.' },
          { text: '**Delivery assumptions** — how the exploit reaches the target, and what must be reachable.' },
        ] },
        { type: 'callout', tone: 'evidence', title: 'Annotate before you run', md: 'Read the PoC top to bottom and mark every value that is specific to *its* lab. Each is an assumption you must match to *your* target — or the exploit will "fail" while being perfectly correct.' },
      ],
      notes: 'This is the core exploit-dev skill for this course: read, annotate assumptions, adapt. Model it on a real (safe) PoC.',
    },
    {
      id: 's8-memory', kind: 'concept', tag: 'HALF 2 · CONCEPT',
      title: 'Memory corruption, at a glance',
      lead: 'Enough of the mechanism to understand why an exploit exists and why it is fragile.',
      blocks: [
        { type: 'steps', items: [
          { label: 'The stack holds control data', text: 'Including the return address — where execution goes when a function finishes.', tone: 'evidence' },
          { label: 'A buffer overflow overwrites it', text: 'Input larger than its buffer can spill over and change that return address.', tone: 'attacker' },
          { label: 'Control of EIP/RIP = control of flow', text: 'Redirecting execution to attacker-chosen instructions is the goal.', tone: 'attacker' },
        ] },
        { type: 'callout', tone: 'caution', title: 'Why it is fragile', md: 'The exact overflow length and target address depend on the precise build. Change the binary version and the offsets shift — which is exactly why PoCs are so version-specific.' },
      ],
      notes: 'Keep this conceptual. The goal is understanding why exploits are version-specific and fragile, not writing one.',
    },
    {
      id: 's8-debugger', kind: 'demo', tag: 'HALF 2 · DEMONSTRATE',
      title: 'A prepared crash under a debugger',
      lead: 'We examine a crash the instructor has set up — and meet the defences that make it hard to weaponise.',
      blocks: [
        { type: 'figure', title: 'WHAT THE DEBUGGER SHOWS', rows: [
          { k: 'CRASH', v: 'The instruction pointer holds attacker-supplied bytes — flow is controllable in principle.', tone: 'attacker' },
          { k: 'DEP', v: 'Data Execution Prevention: the stack is non-executable, so injected shellcode will not simply run.', tone: 'caution' },
          { k: 'ASLR', v: 'Address Space Layout Randomisation: addresses move each run, so hardcoded targets break.', tone: 'caution' },
          { k: 'TAKEAWAY', v: 'A crash is not yet an exploit. Modern mitigations are why reliable exploitation is hard.', tone: 'evidence' },
        ] },
        { type: 'callout', tone: 'evidence', md: 'You will complete this prepared exercise in independent study: locate the crash and explain, in two sentences, why DEP and ASLR complicate turning it into execution.' },
      ],
      notes: 'Use the prepared, instructor-controlled crash only. The learning outcome is recognising DEP/ASLR and reading a crash — not bypassing them.',
    },
    {
      id: 's8-failure', kind: 'concept', tag: 'HALF 2 · TROUBLESHOOTING',
      title: 'Why a supplied exploit fails',
      lead: 'Diagnose methodically instead of concluding "it is broken".',
      blocks: [
        { type: 'list', style: 'cross', items: [
          { text: 'Version mismatch — the PoC targets a different build or patch level.', tone: 'caution' },
          { text: 'Unchanged environment values — IP, port, path, or offset still set to the author\'s lab.', tone: 'caution' },
          { text: 'Wrong payload — architecture, encoding, or a reverse/bind mismatch.', tone: 'caution' },
          { text: 'A mitigation (DEP/ASLR) the PoC never accounted for.', tone: 'caution' },
          { text: 'Delivery — the vulnerable endpoint is not actually reachable from where you are.', tone: 'caution' },
        ] },
        { type: 'callout', tone: 'valid', md: 'Work the list in order. Each is an assumption you can check against your target. "It is broken" is almost never the answer — "I have not matched an assumption yet" almost always is.' },
      ],
      notes: 'Turn "broken exploit" frustration into a diagnostic checklist. This is a genuinely useful professional habit.',
    },
    {
      id: 's8-mistakes', kind: 'mistakes', tag: 'COMMON MISTAKES',
      title: 'How Windows privesc & exploit work go wrong',
      blocks: [
        { type: 'list', style: 'cross', items: [
          { text: 'Checking group membership but ignoring token privileges like SeImpersonate.', tone: 'attacker' },
          { text: 'Finding a weak service but not confirming you can actually restart it (or wait for a restart).', tone: 'attacker' },
          { text: 'Running a public exploit unchanged, with the author’s IP, port, and offsets still hardcoded.', tone: 'attacker' },
          { text: 'Treating a crash as an exploit, forgetting DEP and ASLR stand in the way.', tone: 'attacker' },
          { text: 'Concluding "the exploit is broken" before checking the version and patch level.', tone: 'attacker' },
        ] },
      ],
      notes: 'Each maps directly to a slide. The unchanged-hardcoded-values mistake is the single most common exploit-dev failure.',
    },
    {
      id: 's8-discuss', kind: 'discuss', tag: 'DISCUSS',
      title: 'Annotate the assumptions',
      lead: 'In pairs, five minutes, with a short PoC the instructor provides.',
      blocks: [
        { type: 'prose', md: 'Read the supplied proof of concept and mark every value or condition that is specific to the author’s environment. For each, state what you would need to change or match for your target.' },
        { type: 'list', style: 'plain', items: [
          'Which assumptions are about the target (version, architecture, patch)?',
          'Which are environment values you must edit (IP, port, path, offset)?',
          'Which would you check first if it "did nothing", and why?',
        ] },
      ],
      notes: 'This is the core exploit-reading drill. Insist they distinguish target assumptions from editable environment values.',
    },
    {
      id: 's8-check', kind: 'check', tag: 'KNOWLEDGE CHECK',
      title: 'Check your understanding',
      blocks: [
        { type: 'check',
          q: 'A public exploit for a service "does nothing" against your target, which runs a slightly different patch level. What is the most likely cause?',
          options: [
            { text: 'The exploit code is corrupt and must be rewritten.' },
            { text: 'An unmet assumption — most likely the version/offset or an environment value the PoC hardcoded.', correct: true },
            { text: 'Your target is not vulnerable to anything.' },
            { text: 'DEP and ASLR are disabled.' },
          ],
          answer: 'The most likely cause is an **unmet assumption**. PoCs hardcode version-specific offsets and environment values (IPs, ports, paths). A different patch level shifts those offsets, so the exploit runs correctly but misses. The fix is to read the PoC, identify each assumption, and match it to your target — not to assume the code is broken.',
        },
      ],
      notes: 'Reinforce: unmet assumption, not broken code. This is the session\'s central professional lesson.',
    },
    {
      id: 's8-recap', kind: 'recap', tag: 'RECAP & STUDY',
      title: 'What to carry into the lab',
      blocks: [
        { type: 'list', style: 'check', items: [
          'Windows escalation: same question as Linux, different objects — services, tasks, token privileges.',
          'A privilege held by your token can outweigh group membership.',
          'Read a PoC and annotate every environment-specific assumption before running it.',
          'A crash is not an exploit; DEP and ASLR are why reliable exploitation is hard.',
          '"Broken exploit" is almost always an unmet assumption — diagnose in order.',
        ] },
        { type: 'callout', tone: 'evidence', title: 'Independent study', md: 'Complete the prepared debugger exercise: find the crash and explain in two sentences why DEP and ASLR complicate execution. Refine your separate Linux and Windows checklists.' },
      ],
      notes: 'Next is the Week 3 lab: escalate on both a Linux and a Windows host, and analyse a supplied exploit.',
    },
  ],
};
