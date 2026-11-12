import type { Session } from '../types';

export const s5: Session = {
  id: 's5', number: 5, week: 2, kind: 'theory', day: 'Tuesday',
  dateISO: '2026-11-24', dateLabel: '24 Nov', durationHours: 3,
  topic: 'Validate vulnerabilities and explain impact',
  title: 'Web Vulnerabilities & Impact',
  outcome: 'Explain why an observed response supports—or fails to support—a vulnerability claim.',
  summary: 'SQL injection, command injection, XSS, auth weaknesses, file issues, and evidence of impact.',
  stages: ['access'], domains: ['web', 'exploit'],
  sources: [
    { label: 'Web Application Penetration Testing notes', url: 'https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_WebAppPentest.pdf' },
  ],
  independentStudy: 'Take one vulnerability class from today and write the minimum evidence that would prove it, and the minimum change that would fix it. Keep it to five lines.',
  slides: [
    {
      id: 's5-title', kind: 'title', tag: 'WEEK 2 · SESSION 05 · THEORY',
      title: 'Validate vulnerabilities and explain impact',
      subtitle: 'From a suspicious response to a demonstrated finding',
      lead: 'A weird response is a question. A vulnerability is an answer you can reproduce, with evidence, and a reason.',
      blocks: [
        { type: 'figure', title: 'SESSION BRIEF', rows: [
          { k: 'OUTCOME', v: 'Explain why a response does — or does not — support a vulnerability claim.', tone: 'evidence' },
          { k: 'STAGE', v: 'Initial Access via the web — stage 02', tone: 'attacker' },
          { k: 'EXIT CHECK', v: 'Interpret a suspicious response and state what additional evidence is needed.', tone: 'valid' },
        ] },
      ],
      notes: 'Theme: validation and impact. We will demonstrate manual validation first, then show where automation helps.',
    },
    {
      id: 's5-scenario', kind: 'scenario', tag: 'SCENARIO',
      title: 'The page behaved strangely',
      lead: 'You added a single quote to ?id=42 and the page threw a database error. Exciting — but what have you actually proven?',
      blocks: [
        { type: 'prose', md: 'A database error on a malformed input *suggests* the parameter reaches a query. It does not yet prove you can read data, bypass auth, or execute code. The gap between "the app errored" and "I retrieved the admin password hash" is the entire craft of this session.' },
        { type: 'callout', tone: 'caution', title: 'An error is a lead, impact is the finding', md: 'You will validate carefully and demonstrate the *minimum* necessary impact. You do not need to dump the whole database to prove SQL injection — you need to prove you could.' },
      ],
      notes: 'Set the standard: minimum necessary evidence of impact. Over-exploiting a lab (or a client) is unprofessional and risky.',
    },
    {
      id: 's5-objectives', kind: 'objectives', tag: 'OBJECTIVES',
      title: 'What you will be able to do',
      blocks: [
        { type: 'list', style: 'check', items: [
          'Explain the cause of SQL injection, command injection, and XSS — not just the payload.',
          'Validate each manually before reaching for automation.',
          'Distinguish application behaviour from operating-system execution.',
          'Judge the real impact of a finding, and demonstrate it with minimum evidence.',
          'State the root-cause remediation and how you would retest it.',
        ] },
      ],
    },
    {
      id: 's5-sqli', kind: 'concept', tag: 'VULN CLASS · 01',
      title: 'SQL injection',
      lead: 'Untrusted input becomes part of a query. Validate by making the database behave differently on purpose.',
      blocks: [
        { type: 'http', title: 'From error to controlled proof',
          request: ["GET /product?id=42' HTTP/1.1", 'Host: shop.lab'],
          response: ['HTTP/1.1 500', '', 'SQL syntax error near "\'"'],
          notes: [
            { line: "id=42'", note: 'Breaks the query → the parameter reaches SQL (a lead).', tone: 'caution' },
            { line: 'id=42 AND 1=1  vs  id=42 AND 1=2', note: 'Same vs different response proves injection controllably.', tone: 'valid' },
          ],
        },
        { type: 'callout', tone: 'attacker', title: 'Cause, not payload', md: 'The root cause is **concatenating input into a query**. The fix is parameterised queries / prepared statements — not blocking the single-quote character. Teach the cause and the fix together.' },
      ],
      study: [
        { type: 'prose', md: 'Validate in stages: first confirm the input reaches SQL (an error, or a boolean difference between `1=1` and `1=2`). Then establish what you can extract (number of columns, then specific data). Prefer a controlled boolean or time-based proof over dumping data — it demonstrates the vulnerability with far less noise and risk. Automated tools like sqlmap are powerful but should *confirm* a manually-validated injection, not be your first and only evidence.' },
      ],
      notes: 'The 1=1 / 1=2 pair is the cleanest teaching device for injection. Make students see why it is conclusive.',
    },
    {
      id: 's5-cmdi', kind: 'concept', tag: 'VULN CLASS · 02',
      title: 'Command injection',
      lead: 'The difference between "the app did something" and "I ran a command on the server".',
      blocks: [
        { type: 'compare', columns: [
          { title: 'Application behaviour', tone: 'caution', items: ['App returns a custom error', 'Input changes a displayed value', 'Stays inside the application logic'] },
          { title: 'OS command execution', tone: 'attacker', items: ['`; id` returns `uid=…`', 'A `ping` to your host arrives', 'The server ran your command'] },
        ] },
        { type: 'callout', tone: 'valid', title: 'Prove execution unambiguously', md: 'A controlled out-of-band signal — a DNS/HTTP callback to a host you control, or a time delay (`; sleep 5`) — proves execution even when output is not reflected. That callback is your evidence.' },
      ],
      notes: 'The app-vs-OS distinction is the heart of this slide. A callback or delay is unambiguous proof.',
    },
    {
      id: 's5-xss', kind: 'concept', tag: 'VULN CLASS · 03',
      title: 'Cross-site scripting',
      lead: 'Context decides everything: where your input lands determines whether it executes.',
      blocks: [
        { type: 'steps', items: [
          { label: 'Find reflection', text: 'Input appears in the response. Note exactly where — HTML body, attribute, or script.', tone: 'evidence' },
          { label: 'Understand the context', text: 'The same payload executes in one context and is inert in another.', tone: 'caution' },
          { label: 'Demonstrate realistic impact', text: 'Session theft, action-on-behalf, or UI redress — not just an alert box.', tone: 'attacker' },
        ] },
        { type: 'callout', tone: 'caution', title: 'An alert() is a proof-of-concept, not an impact', md: 'Showing a popup proves execution. The *finding* is what that execution enables — stealing a session, performing an admin action as a victim. State the realistic impact for this app.' },
      ],
      notes: 'Push past alert(1). The impact is what a client cares about: what can an attacker actually do to a user?',
    },
    {
      id: 's5-auth', kind: 'concept', tag: 'VULN CLASS · 04',
      title: 'Authentication & access-control weaknesses',
      lead: 'Often the highest-impact and lowest-noise findings in a web app.',
      blocks: [
        { type: 'list', items: [
          { text: '**Broken access control** — a normal user reaches an admin endpoint, or `/account?id=` shows another user\'s data (IDOR).' },
          { text: '**Weak authentication** — predictable credentials, missing lockout, or guessable reset tokens.' },
          { text: '**Session flaws** — tokens that do not rotate, or a `role=user` cookie you can edit to `role=admin`.' },
        ] },
        { type: 'callout', tone: 'attacker', title: 'Test boundaries, carefully', md: 'Access-control testing means trying to cross a boundary with a lower-privileged account. Do it with controlled, synthetic accounts and minimal data exposure — enough to prove the boundary fails, no more.' },
      ],
      notes: 'IDOR is often the easiest high-impact finding. Tie back to roles from the mapping session.',
    },

    {
      id: 's5-components', kind: 'concept', tag: 'VULN CLASS · 05',
      title: 'Components and configuration',
      lead: 'Not every web weakness is in the code. Some ship in the components and settings around it.',
      blocks: [
        { type: 'table', head: ['Weakness', 'What you observe', 'How you validate it'], rows: [
          ['Outdated component', 'A plugin or framework version that a public advisory covers', 'Confirm the version from more than one source, then test the exact condition the advisory describes'],
          ['Exposed settings', 'Directory listing, verbose stack traces, a debug mode left on', 'Request the resource and capture what it reveals'],
          ['Exposed files', '`/.git/` or `/backup.bak` returns content', 'Retrieve only what proves the exposure, and check it for secrets'],
          ['Default or embedded credentials', 'Vendor defaults on an admin panel; a key inside a JavaScript bundle', 'One controlled login or one scoped call — no further use'],
        ] },
        { type: 'callout', tone: 'caution', title: 'A version string is an observation', md: 'Banners, meta tags and file names can be stale, back-ported, or deliberately misleading. A matched advisory is a lead until you have tested the condition it describes against this target.' },
      ],
      study: [
        { type: 'prose', md: 'Component and configuration findings are often the quickest wins in a web test, and the easiest to overstate. For an outdated component, the evidence is not the version number alone: it is the version confirmed by more than one signal (a changelog, a static file hash, a response header) plus a test of the specific vulnerable behaviour. For exposed settings and files, capture the minimum that proves the exposure — the directory listing, the first lines of the repository config — and never use a discovered secret beyond showing that it is live and in scope.' },
        { type: 'prose', md: 'Remediation follows the cause: upgrade or remove the component and track versions going forward; turn off debug and listing in the production configuration; remove stray files from the web root; rotate any credential that was exposed, because removing it from the page does not make it secret again.' },
      ],
      notes: 'Connect back to Session 04: content discovery and technology identification surface most of these. Today we turn those leads into validated findings or dismiss them.',
    },
    {
      id: 's5-files', kind: 'concept', tag: 'VULN CLASS · 06',
      title: 'File upload & file inclusion',
      lead: 'Where web vulnerabilities most often become a shell.',
      blocks: [
        { type: 'list', items: [
          { text: '**Unrestricted upload** — a server-executable file reaches a web-accessible path → code execution.' },
          { text: '**Type/extension bypass** — content-type spoofing, double extensions, or null bytes defeating a weak filter.' },
          { text: '**File inclusion** — an input that loads a path can read sensitive files (LFI) or execute attacker content (RFI).' },
        ] },
        { type: 'callout', tone: 'evidence', md: 'This is the classic web-to-foothold bridge, and the intended path in many labs: validate the upload filter, bypass it with a benign test, then demonstrate execution with the minimum payload.' },
      ],
      notes: 'This is the bridge from web to initial access. Keep the payload minimal and the evidence clean.',
    },
    {
      id: 's5-impact', kind: 'concept', tag: 'CONCEPT · 07',
      title: 'Evidence of impact',
      lead: 'The finding is not the payload — it is what you demonstrably could do, shown with the least mess.',
      blocks: [
        { type: 'reasoning',
          evidence: 'A single quote produces a SQL error, and the pair `AND 1=1` / `AND 1=2` returns different responses — the parameter is controllably inside a query.',
          conditions: 'The input must reach the query unparameterised, and the response must differ observably between true and false conditions.',
          proves: 'It proves injectable SQL and the ability to influence the query — demonstrated with a boolean proof, without dumping the whole database.',
          next: 'Determine what data is reachable (e.g. the users table) and whether the same flaw enables authentication bypass.',
          rootcause: 'Use parameterised queries / prepared statements so input can never change query structure.',
        },
      ],
      notes: 'Model minimum-evidence impact. This reasoning block is the exact shape of a good report finding.',
    },

    {
      id: 's5-remediation', kind: 'concept', tag: 'CONCEPT · 08',
      title: 'Root-cause remediation, and how to retest it',
      lead: 'A finding is finished when the reader knows what to change and how to prove the change worked.',
      blocks: [
        { type: 'table', head: ['Finding', 'Root-cause fix', 'Retest'], rows: [
          ['SQL injection', 'Parameterised queries for every query that takes input', 'Replay the true/false pair — the responses no longer differ'],
          ['Command injection', 'Avoid shell calls; use safe APIs or a strict allow-list', 'Replay the out-of-band probe — no callback arrives'],
          ['Cross-site scripting', 'Context-aware output encoding; a Content Security Policy as defence in depth', 'Replay the payload — it renders as text'],
          ['File upload', 'Allow-list types, store outside the web root, never execute uploads', 'Upload the benign test file — it cannot be reached or run'],
          ['Outdated component', 'Upgrade or remove it, and track versions', 'Confirm the fixed version and that the advisory condition no longer holds'],
        ] },
        { type: 'callout', tone: 'valid', title: 'Fix the cause, not the payload', md: 'Blocking the exact string you used — a filter for one quote character, say — is not remediation; a different payload reaches the same flaw. Name the cause, then retest with your original evidence **and** a variant.' },
      ],
      notes: 'This is the "root-cause remediation" item from the outline. Every finding students submit on Wednesday needs a row like these.',
    },
    {
      id: 's5-auto', kind: 'concept', tag: 'TOOLING · 09',
      title: 'Where automation earns its place',
      lead: 'Manual validation first; automation to extend what you have already proven.',
      blocks: [
        { type: 'compare', columns: [
          { title: 'Validate manually', tone: 'valid', items: ['Confirm the vulnerability exists', 'Understand the context and cause', 'Produce clean, minimal evidence'] },
          { title: 'Then automate', tone: 'evidence', items: ['Enumerate many columns/rows quickly', 'Fuzz many parameters for coverage', 'Save time once the path is proven'] },
        ] },
        { type: 'callout', tone: 'caution', title: 'Automation on an unproven lead wastes time and makes noise', md: 'Pointing sqlmap at every parameter "to see what sticks" generates traffic, false confidence, and findings you cannot explain. Prove it by hand, then let the tool scale it.' },
      ],
      notes: 'Order matters: manual first, automation to extend. The reverse produces unexplainable reports.',
    },
    {
      id: 's5-mistakes', kind: 'mistakes', tag: 'COMMON MISTAKES',
      title: 'How web exploitation goes wrong',
      blocks: [
        { type: 'list', style: 'cross', items: [
          { text: 'Calling a database error a finding, without proving controllable injection.', tone: 'attacker' },
          { text: 'Confusing an application error message with operating-system command execution.', tone: 'attacker' },
          { text: 'Stopping XSS at alert(1) and never stating the realistic impact.', tone: 'attacker' },
          { text: 'Dumping an entire database when a boolean proof would have sufficed.', tone: 'attacker' },
          { text: 'Running sqlmap/automation first, then being unable to explain the result.', tone: 'attacker' },
        ] },
      ],
      notes: 'Each maps to a slide. The over-exploitation mistake is also a professionalism point.',
    },
    {
      id: 's5-discuss', kind: 'discuss', tag: 'DISCUSS',
      title: 'Is it a finding yet?',
      lead: 'In pairs, five minutes. Judge each claim against the evidence.',
      blocks: [
        { type: 'prose', md: 'For each statement, decide: observation or confirmed finding — and name the single piece of evidence that would move it from one to the other.' },
        { type: 'list', style: 'plain', items: [
          '"The `?id=` parameter is SQL-injectable because a quote caused an error."',
          '"The search box is vulnerable to XSS because my payload appeared in the page source."',
          '"The server runs my commands because the page showed an error mentioning a shell."',
        ] },
      ],
      notes: 'Each statement is an observation dressed as a finding. Push students to name the exact confirming evidence: a boolean pair, an executing context, an out-of-band callback.',
    },
    {
      id: 's5-check', kind: 'check', tag: 'KNOWLEDGE CHECK',
      title: 'Check your understanding',
      blocks: [
        { type: 'check',
          q: 'Injecting `; id` into a parameter returns no visible output, but a DNS lookup for your unique subdomain arrives at your server. What have you proven?',
          options: [
            { text: 'Nothing — without visible output there is no vulnerability.' },
            { text: 'Blind OS command execution — the server ran your command and reached out to you.', correct: true },
            { text: 'Only that the app has a custom error page.' },
            { text: 'SQL injection.' },
          ],
          answer: 'You have proven **blind command injection**. The out-of-band DNS callback is unambiguous evidence that the server executed your injected command, even though the output is not reflected in the response. The callback *is* the impact evidence — capture it in your notes.',
        },
      ],
      notes: 'Out-of-band proof is a key professional technique. Make sure the callback-as-evidence idea is solid.',
    },
    {
      id: 's5-recap', kind: 'recap', tag: 'RECAP & STUDY',
      title: 'What to carry into the lab',
      blocks: [
        { type: 'list', style: 'check', items: [
          'Teach the cause, not the payload — and the root-cause fix with it.',
          'Validate manually and controllably before automating.',
          'Distinguish application behaviour from OS command execution.',
          'Demonstrate the minimum necessary evidence of impact.',
          'Every finding carries a root-cause remediation and a retest.',
        ] },
        { type: 'callout', tone: 'evidence', title: 'Independent study', md: 'For one vulnerability class, write the minimum evidence that would prove it and the minimum change that would fix it — five lines, no more.' },
      ],
      notes: 'Next is the Week 2 lab: map, validate, and exploit a real vulnerable app — with false leads mixed in.',
    },
  ],
};
