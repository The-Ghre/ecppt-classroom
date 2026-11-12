import type { Session } from '../types';

export const s4: Session = {
  id: 's4', number: 4, week: 2, kind: 'theory', day: 'Sunday',
  dateISO: '2026-11-22', dateLabel: '22 Nov', durationHours: 3,
  topic: 'Understand the application before testing it',
  title: 'Web Application Mapping',
  outcome: 'Produce an application map and prioritize likely input points.',
  summary: 'HTTP foundations, application mapping, content discovery, proxies, and reading scanners.',
  stages: ['access'], domains: ['web', 'access'],
  sources: [
    { label: 'Web Application Penetration Testing notes', url: 'https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_WebAppPentest.pdf' },
    { label: 'INE eCPPT objectives', url: 'https://ine.com/security/certifications/ecppt-certification' },
  ],
  independentStudy: 'Map a deliberately-vulnerable practice application end to end: list every page, parameter, and role, and mark the three inputs you would test first and why.',
  slides: [
    {
      id: 's4-title', kind: 'title', tag: 'WEEK 2 · SESSION 04 · THEORY',
      title: 'Understand the application before you test it',
      subtitle: 'HTTP, mapping, content discovery, and the intercepting proxy',
      lead: 'You cannot test what you have not mapped. Today we turn a web app from a wall of pages into a labelled list of inputs.',
      blocks: [
        { type: 'figure', title: 'SESSION BRIEF', rows: [
          { k: 'OUTCOME', v: 'Produce an application map and prioritise likely input points.', tone: 'evidence' },
          { k: 'STAGE', v: 'Initial Access via the web — stage 02 of the attack chain', tone: 'attacker' },
          { k: 'EXIT CHECK', v: 'An application map with likely input points and prioritized tests.', tone: 'valid' },
        ] },
      ],
      notes: 'Set the frame: mapping is 60% of a good web test. We map together before anyone touches a scanner.',
    },
    {
      id: 's4-scenario', kind: 'scenario', tag: 'SCENARIO',
      title: 'A login box and a thousand unknowns',
      lead: 'You are given one URL: https://shop.lab. No documentation, no account, no map.',
      blocks: [
        { type: 'prose', md: 'Behind that single page sit dozens of endpoints, several user roles, a shopping cart, an admin panel, and an API. Where are the inputs that reach code or data? Which ones are worth your limited time?' },
        { type: 'callout', tone: 'caution', title: 'Scanners do not map; they poke', md: 'An automated scanner fires payloads at whatever it can crawl. If it never discovers `/admin/upload`, it never tests it. Mapping is how you make sure the scanner — and you — see the whole surface.' },
      ],
      notes: 'Resist the urge to launch tools. The scenario is about building a mental model first.',
    },
    {
      id: 's4-objectives', kind: 'objectives', tag: 'OBJECTIVES',
      title: 'What you will be able to do',
      blocks: [
        { type: 'list', style: 'check', items: [
          'Read an HTTP request and response and name every part that carries input.',
          'Build an application map: pages, functions, endpoints, parameters, and roles.',
          'Run content discovery for hidden directories, files, and virtual hosts.',
          'Identify the technology stack and flag potentially outdated components.',
          'Use an intercepting proxy to inspect, modify, and replay requests.',
          'Read Nikto, Gobuster, and WPScan output as leads, not verdicts.',
        ] },
      ],
    },
    {
      id: 's4-http', kind: 'concept', tag: 'CONCEPT · 01',
      title: 'HTTP is the whole attack surface',
      lead: 'Every web test is a conversation of requests and responses. Learn where input lives.',
      blocks: [
        { type: 'http', title: 'Anatomy of a request — every highlighted part can carry attacker input',
          request: ['POST /product?id=42 HTTP/1.1', 'Host: shop.lab', 'Cookie: session=a1b2c3; role=user', 'Content-Type: application/x-www-form-urlencoded', '', 'qty=1&coupon=SAVE10'],
          response: ['HTTP/1.1 200 OK', 'Set-Cookie: session=a1b2c3', 'Server: nginx/1.18.0', '', '<h1>Widget — 12.00 KWD</h1>'],
          notes: [
            { line: '/product?id=42', note: 'Path + query parameter — a classic injection point.', tone: 'caution' },
            { line: 'Cookie: role=user', note: 'Client-controlled state — never trust it server-side.', tone: 'attacker' },
            { line: 'qty / coupon', note: 'Body parameters — reach business logic and data.', tone: 'caution' },
            { line: 'Server: nginx/1.18.0', note: 'Tech fingerprint — a lead for version research.', tone: 'evidence' },
          ],
        },
      ],
      notes: 'Walk every input location. The point: input is everywhere — path, query, cookies, headers, body. All of it is suspect.',
    },
    {
      id: 's4-map', kind: 'diagram', tag: 'CONCEPT · 02',
      title: 'Build the application map',
      lead: 'Pages, functions, endpoints, parameters, and the roles that can reach them.',
      blocks: [
        { type: 'diagram', kind: 'webmap', caption: 'A map turns a web app into a prioritised list of inputs to test — and which role each needs.' },
        { type: 'list', items: [
          { text: '**Pages & functions** — what the app lets a user *do* (search, buy, upload, admin).' },
          { text: '**Endpoints & parameters** — the concrete URLs and inputs behind each function.' },
          { text: '**Roles** — anonymous, user, admin — and what each can reach. Role boundaries are testable.' },
        ] },
      ],
      notes: 'Emphasise roles. Many web findings are access-control failures: a user reaching an admin endpoint.',
    },
    {
      id: 's4-content', kind: 'demo', tag: 'DEMONSTRATE · 03',
      title: 'Content discovery',
      lead: 'Find the directories, files, and virtual hosts the navigation never links to.',
      blocks: [
        { type: 'terminal', title: 'Directory & vhost discovery', lines: [
          { text: 'gobuster dir -u https://shop.lab -w common.txt -x php,bak', kind: 'cmd' },
          { text: '/admin                (Status: 301)', kind: 'out', tone: 'caution' },
          { text: '/backup.bak           (Status: 200)', kind: 'out', tone: 'caution' },
          { text: '/api                  (Status: 200)', kind: 'out' },
          { text: 'gobuster vhost -u https://shop.lab -w vhosts.txt', kind: 'cmd' },
          { text: 'Found: dev.shop.lab    (Status: 200)', kind: 'out', tone: 'attacker' },
        ] },
        { type: 'callout', tone: 'caution', title: 'Interpretation', md: '`/admin` and a stray `/backup.bak` are high-value leads. `dev.shop.lab` is a virtual host the main site never links — development environments are frequently less hardened. None is a finding yet; each is a place to look.' },
      ],
      study: [
        { type: 'prose', md: 'Content discovery is noisy and wordlist-dependent. Start with a small, high-quality list and expand. Pay attention to status codes: `301/302` redirects can reveal structure, `403` means "exists but forbidden" (interesting!), and a custom `404` page can make everything look like it exists — calibrate against a known-bad path first.' },
      ],
      notes: 'The custom-404 trap is worth a minute: show how a soft-404 fools a scanner into reporting everything as found.',
    },
    {
      id: 's4-tech', kind: 'concept', tag: 'CONCEPT · 04',
      title: 'Identify the technology',
      lead: 'Framework, CMS, and component versions turn a generic app into specific research.',
      blocks: [
        { type: 'list', columns: 2, items: [
          { text: 'Response headers (`Server`, `X-Powered-By`).' },
          { text: 'Cookie names (`PHPSESSID`, `JSESSIONID`, `laravel_session`).' },
          { text: 'Paths and assets (`/wp-content/`, `/_next/`).' },
          { text: 'Error pages and framework signatures.' },
          { text: 'JavaScript bundles and source maps.' },
          { text: 'Login-page branding (WordPress, Joomla, custom).' },
        ] },
        { type: 'callout', tone: 'evidence', md: 'A CMS with a version is a research goldmine — but the version in a banner can be back-ported or spoofed. Treat it as a lead to confirm, exactly like a service banner in Session 01.' },
      ],
      notes: 'Connect back to Session 1: same observation-vs-finding discipline, now on the web.',
    },
    {
      id: 's4-proxy', kind: 'demo', tag: 'DEMONSTRATE · 05',
      title: 'The intercepting proxy',
      lead: 'Inspect, modify, and replay any request. This is the web tester\'s core instrument.',
      blocks: [
        { type: 'steps', items: [
          { label: 'Intercept', text: 'Capture the exact request the browser sends — including headers you cannot see in the URL bar.', tone: 'evidence' },
          { label: 'Modify', text: 'Change a parameter, a cookie, or a header and send it on. Test what the server actually checks.', tone: 'attacker' },
          { label: 'Replay', text: 'Resend a request dozens of times with variations, without re-driving the browser.', tone: 'caution' },
        ] },
        { type: 'callout', tone: 'attacker', title: 'Why it matters', md: 'The browser enforces client-side rules — a maxlength, a hidden field, a disabled button. The proxy lets you bypass all of them and ask the only question that matters: *what does the server check?*' },
      ],
      notes: 'The core insight of web testing: client-side controls are suggestions. The proxy is how you test the server directly.',
    },
    {
      id: 's4-scanners', kind: 'concept', tag: 'CONCEPT · 06',
      title: 'Reading scanners without being fooled',
      lead: 'Nikto, Gobuster, and WPScan generate leads. You decide which are real.',
      blocks: [
        { type: 'table', head: ['Tool', 'What it is good for', 'What it cannot tell you'], rows: [
          ['Nikto', 'Known files, misconfig, headers', 'Whether a flagged issue is exploitable here'],
          ['Gobuster', 'Hidden paths and vhosts', 'Whether a found path is actually interesting'],
          ['WPScan', 'WordPress plugins/versions/users', 'Whether a listed CVE applies to this config'],
        ] },
        { type: 'callout', tone: 'caution', title: 'False positives are the norm', md: 'Redirects, custom error pages, and odd status codes make scanners report things that are not there. Every scanner line is an observation. Your job is to confirm or dismiss it.' },
      ],
      notes: 'Reinforce the course spine again on the web. A scanner "finding" is an observation until you reproduce it.',
    },
    {
      id: 's4-misleading', kind: 'concept', tag: 'CONCEPT · 07',
      title: 'Misleading results',
      lead: 'Status codes, redirects and error pages fool tools — and people — every day.',
      blocks: [
        { type: 'table', head: ['Signal', 'Why it misleads', 'Check'], rows: [
          ['`200 OK` on every path', 'A custom error page answers 200 for missing content (a "soft 404")', 'Request a path that certainly does not exist and compare size and body'],
          ['`301`/`302` redirect', 'A redirect to login can mean "exists but protected" or simply "not here"', 'Follow it, and compare with a known-missing path'],
          ['`403 Forbidden`', 'The resource exists but is blocked — interesting, not a finding', 'Note it, and look for another route to the same resource'],
          ['`500` server error', 'Your input broke something — a lead, not a vulnerability', 'Vary the input and look for a controllable difference'],
          ['Scanner says "vulnerable"', 'A version or pattern match only', 'Reproduce the condition yourself before you report it'],
        ] },
        { type: 'callout', tone: 'evidence', title: 'Calibrate first', md: 'Before trusting a discovery run, capture the response to one path you know exists and one you know does not. Judge every later result against that baseline.' },
      ],
      notes: 'Show a soft-404 live: a scanner reports dozens of "found" paths, and one known-bad request explains all of them.',
    },
    {
      id: 's4-prioritise', kind: 'evidence', tag: 'WORKED EXAMPLE · 08',
      title: 'From map to prioritised tests',
      lead: 'The map is built. Here is where you spend your time, and why.',
      blocks: [
        { type: 'table', head: ['Input', 'Why it is promising', 'Test to run', 'Priority'], rows: [
          ['/admin/upload', 'File upload reaching the server', 'Type/extension bypass', 'High'],
          ['/product?id=', 'Numeric param → database', 'SQL injection', 'High'],
          ['/search?q=', 'Reflected into the page', 'Cross-site scripting', 'Medium'],
          ['dev.shop.lab', 'Likely less hardened', 'Re-map separately', 'Medium'],
          ['/backup.bak', 'May leak source/creds', 'Download and read', 'High'],
        ] },
      ],
      notes: 'This table is the exit check. Each row = an input, a reason, a specific test. Priority is justified, not arbitrary.',
    },
    {
      id: 's4-mistakes', kind: 'mistakes', tag: 'COMMON MISTAKES',
      title: 'How web mapping goes wrong',
      blocks: [
        { type: 'list', style: 'cross', items: [
          { text: 'Running a scanner before mapping, so it never discovers the real attack surface.', tone: 'attacker' },
          { text: 'Trusting a soft-404 page and treating every path as "found".', tone: 'attacker' },
          { text: 'Ignoring roles, and missing that a normal user can reach an admin endpoint.', tone: 'attacker' },
          { text: 'Testing only what the browser shows, not what the proxy reveals.', tone: 'attacker' },
          { text: 'Reporting a scanner line as a finding without reproducing it.', tone: 'attacker' },
        ] },
      ],
      notes: 'Each mistake is a concept from today, inverted. Make the mapping explicit.',
    },
    {
      id: 's4-discuss', kind: 'discuss', tag: 'DISCUSS',
      title: 'Which three inputs, and why?',
      lead: 'In pairs, five minutes, using the worked map.',
      blocks: [
        { type: 'prose', md: 'Pick the **three** inputs you would test first on `shop.lab`. For each, name the test and the single piece of evidence that makes it promising. Defend your ordering against the other pair.' },
      ],
      notes: 'Push for justification by evidence. There is no single right answer — there is a right *way to decide*.',
    },
    {
      id: 's4-check', kind: 'check', tag: 'KNOWLEDGE CHECK',
      title: 'Check your understanding',
      blocks: [
        { type: 'check',
          q: 'A form has a hidden field `price=12.00` and a client-side script that blocks negative quantities. How do you test whether the server enforces these?',
          options: [
            { text: 'Trust the client-side checks; they protect the server.' },
            { text: 'Use an intercepting proxy to change price and send a negative quantity directly to the server.', correct: true },
            { text: 'Only test what the browser UI allows.' },
            { text: 'Report it as a vulnerability without testing.' },
          ],
          answer: 'Use the **intercepting proxy**. Client-side controls (hidden fields, validation scripts, disabled buttons) are not security — they are convenience. Intercept the request, set `price` to your value and quantity to a negative number, and observe what the *server* accepts. Only the server\'s behaviour is a finding.',
        },
      ],
      notes: 'The server-vs-client insight is the whole point of web testing. Make sure it lands.',
    },
    {
      id: 's4-recap', kind: 'recap', tag: 'RECAP & STUDY',
      title: 'What to carry forward',
      blocks: [
        { type: 'list', style: 'check', items: [
          'Input lives in the path, query, cookies, headers, and body — all of it.',
          'Map first: pages, functions, endpoints, parameters, roles.',
          'Content discovery finds the surface the navigation hides.',
          'The proxy tests the server directly, past every client-side control.',
          'Scanner output is leads to confirm, never findings to report.',
        ] },
        { type: 'callout', tone: 'evidence', title: 'Independent study', md: 'Map a deliberately-vulnerable practice app end to end. List every page, parameter, and role, and mark the three inputs you would test first, with your reason for each.' },
      ],
      notes: 'Next session: we validate the vulnerabilities these inputs invite — SQLi, command injection, XSS — and prove impact.',
    },
  ],
};
