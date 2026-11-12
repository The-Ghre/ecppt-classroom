# Outline → site map

How every part of [`ecppt-five-week-teaching-outline.md`](ecppt-five-week-teaching-outline.md)
appears on the live site. Every link opens the exact slide in study mode.
This map is checked by script: every outline slide topic points to a slide that exists,
and no two topics share one slide.

**Live site:** https://the-ghre.github.io/ecppt-classroom/

## Course level

| Outline section | On the site |
|---|---|
| Course purpose | Course board — “By 16 December, you will be able to” (verbatim) |
| Seven course outcomes | Course board — numbered list, verbatim |
| Entry requirements | Course board — “Before you start” (first sentence verbatim; the preparatory-exercise note is rephrased for students) |
| Course calendar (15 sessions, dates, Sun/Tue theory, Wed lab) | Course board — five week courtyards, one part per session |
| Weekly outcomes | Course board — one note under each week, verbatim |
| Exam domains and weights (INE) | Course board — Table 1, kept separate from grading |
| Suggested course assessment | Course board — Table 2 |
| Questions to repeat throughout the course | Course board — five test points; every theory session has a five-question slide |
| Exit check (each theory session) | Each session’s opening slide, row “Exit check” (verbatim) |
| Teaching activity (each theory session) | Discussion, worked-example, and demonstration slides; instructor notes |
| Independent study and reading | Each datasheet — “Bench exercise” and “References” |
| Teaching delivery guide, instructor preparation checklist | Not published — instructor-only, kept out of the student site on purpose |

## Sessions

### Session 1 · Sunday 15 November · Theory
**Topic:** How to approach a penetration test · **Site:** [17 slides](https://the-ghre.github.io/ecppt-classroom/#/session/s1)

| # | Outline slide topic | Taught on |
|---|---|---|
| 1 | Engagement scope and objectives | [Scope is the contract — and the safety rail](https://the-ghre.github.io/ecppt-classroom/#/session/s1#s1-scope) · [A new engagement lands on your desk](https://the-ghre.github.io/ecppt-classroom/#/session/s1#s1-scenario) |
| 2 | The testing lifecycle | [The testing lifecycle is a loop, not a line](https://the-ghre.github.io/ecppt-classroom/#/session/s1#s1-lifecycle) |
| 3 | Network foundations refresher | [Network foundations you will lean on](https://the-ghre.github.io/ecppt-classroom/#/session/s1#s1-netfound) |
| 4 | Host discovery and scanning | [Host discovery: who is alive?](https://the-ghre.github.io/ecppt-classroom/#/session/s1#s1-discovery) · [Service identification: what is listening?](https://the-ghre.github.io/ecppt-classroom/#/session/s1#s1-portscan) |
| 5 | Evidence organization | [Organise evidence from the first command](https://the-ghre.github.io/ecppt-classroom/#/session/s1#s1-evidence) |
| 6 | Observation versus confirmed finding | [Observation vs confirmed finding](https://the-ghre.github.io/ecppt-classroom/#/session/s1#s1-observation) |
| 7 | Worked network example | [Building the service matrix](https://the-ghre.github.io/ecppt-classroom/#/session/s1#s1-matrix) · [Turning the matrix into a plan](https://the-ghre.github.io/ecppt-classroom/#/session/s1#s1-prioritise) |
| 8 | Knowledge check | [Check your understanding](https://the-ghre.github.io/ecppt-classroom/#/session/s1#s1-check) · [Defend your next move](https://the-ghre.github.io/ecppt-classroom/#/session/s1#s1-discuss) |

### Session 2 · Tuesday 17 November · Theory
**Topic:** From an exposed service to initial access · **Site:** [18 slides](https://the-ghre.github.io/ecppt-classroom/#/session/s2)

| # | Outline slide topic | Taught on |
|---|---|---|
| 1 | Service-specific enumeration | [Each service speaks its own language](https://the-ghre.github.io/ecppt-classroom/#/session/s2#s2-services) · [Enumerating SMB](https://the-ghre.github.io/ecppt-classroom/#/session/s2#s2-smb) |
| 2 | Users, shares, and credentials | [Usernames, shares, and the credential you already have](https://the-ghre.github.io/ecppt-classroom/#/session/s2#s2-creds) |
| 3 | Authentication testing | [Spraying vs brute force — and lockout](https://the-ghre.github.io/ecppt-classroom/#/session/s2#s2-auth) |
| 4 | Vulnerability research | [Vulnerability research: matching the lock to the key](https://the-ghre.github.io/ecppt-classroom/#/session/s2#s2-research) |
| 5 | Exploit selection | [Choosing the Tomcat path](https://the-ghre.github.io/ecppt-classroom/#/session/s2#s2-select) · [Landing the foothold](https://the-ghre.github.io/ecppt-classroom/#/session/s2#s2-tomcat) |
| 6 | Sessions and shells | [Shells, sessions, and context](https://the-ghre.github.io/ecppt-classroom/#/session/s2#s2-shells) · [Metasploit, used deliberately](https://the-ghre.github.io/ecppt-classroom/#/session/s2#s2-metasploit) |
| 7 | Compare two targets | [Two hosts, same scan, different path](https://the-ghre.github.io/ecppt-classroom/#/session/s2#s2-compare) |
| 8 | Evidence and decision review | [Evidence and decision review](https://the-ghre.github.io/ecppt-classroom/#/session/s2#s2-review) |

### Session 3 · Wednesday 18 November · Practical
**Topic:** Discover and establish access · **Site:** [7 slides](https://the-ghre.github.io/ecppt-classroom/#/session/s3)

| Outline component | Taught on |
|---|---|
| Scenario & scope | [Discover & establish access](https://the-ghre.github.io/ecppt-classroom/#/session/s3#s3-title) · [Rules of engagement](https://the-ghre.github.io/ecppt-classroom/#/session/s3#s3-scope) |
| Student tasks (6) | [Your tasks](https://the-ghre.github.io/ecppt-classroom/#/session/s3#s3-tasks) |
| Submission | [What to submit](https://the-ghre.github.io/ecppt-classroom/#/session/s3#s3-submission) |
| Debrief prompts | [Debrief & reflection](https://the-ghre.github.io/ecppt-classroom/#/session/s3#s3-debrief) |
| Independent study | [Debrief & reflection](https://the-ghre.github.io/ecppt-classroom/#/session/s3#s3-debrief) |

### Session 4 · Sunday 22 November · Theory
**Topic:** Understand the application before testing it · **Site:** [15 slides](https://the-ghre.github.io/ecppt-classroom/#/session/s4)

| # | Outline slide topic | Taught on |
|---|---|---|
| 1 | HTTP foundations | [HTTP is the whole attack surface](https://the-ghre.github.io/ecppt-classroom/#/session/s4#s4-http) |
| 2 | Application mapping | [Build the application map](https://the-ghre.github.io/ecppt-classroom/#/session/s4#s4-map) |
| 3 | Content discovery | [Content discovery](https://the-ghre.github.io/ecppt-classroom/#/session/s4#s4-content) |
| 4 | Technology identification | [Identify the technology](https://the-ghre.github.io/ecppt-classroom/#/session/s4#s4-tech) |
| 5 | Intercepting proxy workflow | [The intercepting proxy](https://the-ghre.github.io/ecppt-classroom/#/session/s4#s4-proxy) |
| 6 | Scanner interpretation | [Reading scanners without being fooled](https://the-ghre.github.io/ecppt-classroom/#/session/s4#s4-scanners) |
| 7 | Misleading results | [Misleading results](https://the-ghre.github.io/ecppt-classroom/#/session/s4#s4-misleading) |
| 8 | Application mapping exercise | [From map to prioritised tests](https://the-ghre.github.io/ecppt-classroom/#/session/s4#s4-prioritise) · [Which three inputs, and why?](https://the-ghre.github.io/ecppt-classroom/#/session/s4#s4-discuss) |

### Session 5 · Tuesday 24 November · Theory
**Topic:** Validate vulnerabilities and explain impact · **Site:** [16 slides](https://the-ghre.github.io/ecppt-classroom/#/session/s5)

| # | Outline slide topic | Taught on |
|---|---|---|
| 1 | SQL injection | [SQL injection](https://the-ghre.github.io/ecppt-classroom/#/session/s5#s5-sqli) |
| 2 | Command injection | [Command injection](https://the-ghre.github.io/ecppt-classroom/#/session/s5#s5-cmdi) |
| 3 | Cross-site scripting | [Cross-site scripting](https://the-ghre.github.io/ecppt-classroom/#/session/s5#s5-xss) |
| 4 | Authentication weaknesses | [Authentication & access-control weaknesses](https://the-ghre.github.io/ecppt-classroom/#/session/s5#s5-auth) |
| 5 | Components and configuration | [Components and configuration](https://the-ghre.github.io/ecppt-classroom/#/session/s5#s5-components) |
| 6 | Supplementary file weaknesses | [File upload & file inclusion](https://the-ghre.github.io/ecppt-classroom/#/session/s5#s5-files) |
| 7 | Evidence of impact | [Evidence of impact](https://the-ghre.github.io/ecppt-classroom/#/session/s5#s5-impact) |
| 8 | Root-cause remediation | [Root-cause remediation, and how to retest it](https://the-ghre.github.io/ecppt-classroom/#/session/s5#s5-remediation) |

### Session 6 · Wednesday 25 November · Practical
**Topic:** Assess a vulnerable web application · **Site:** [7 slides](https://the-ghre.github.io/ecppt-classroom/#/session/s6)

| Outline component | Taught on |
|---|---|
| Scenario & scope | [Assess a vulnerable web application](https://the-ghre.github.io/ecppt-classroom/#/session/s6#s6-title) · [Rules of engagement](https://the-ghre.github.io/ecppt-classroom/#/session/s6#s6-scope) |
| Student tasks (5) | [Your tasks](https://the-ghre.github.io/ecppt-classroom/#/session/s6#s6-tasks) |
| Submission | [What to submit](https://the-ghre.github.io/ecppt-classroom/#/session/s6#s6-submission) |
| Debrief prompts | [Debrief & reflection](https://the-ghre.github.io/ecppt-classroom/#/session/s6#s6-debrief) |
| Independent study | [Debrief & reflection](https://the-ghre.github.io/ecppt-classroom/#/session/s6#s6-debrief) |

### Session 7 · Sunday 29 November · Theory
**Topic:** Linux privilege escalation · **Site:** [16 slides](https://the-ghre.github.io/ecppt-classroom/#/session/s7)

| # | Outline slide topic | Taught on |
|---|---|---|
| 1 | Local context | [Establish local context](https://the-ghre.github.io/ecppt-classroom/#/session/s7#s7-context) |
| 2 | Permissions and ownership | [Permissions and ownership](https://the-ghre.github.io/ecppt-classroom/#/session/s7#s7-perms) |
| 3 | SUID, SGID, and sudo | [SUID, SGID, and sudo](https://the-ghre.github.io/ecppt-classroom/#/session/s7#s7-suid) |
| 4 | Tasks and services | [Scheduled tasks and services](https://the-ghre.github.io/ecppt-classroom/#/session/s7#s7-tasks) |
| 5 | Locally stored credentials | [Locally stored credentials](https://the-ghre.github.io/ecppt-classroom/#/session/s7#s7-creds) |
| 6 | Prioritizing candidates | [Triage: which candidate first?](https://the-ghre.github.io/ecppt-classroom/#/session/s7#s7-triage) |
| 7 | Manual validation | [Manual validation: from flagged to proven](https://the-ghre.github.io/ecppt-classroom/#/session/s7#s7-validate) |
| 8 | Remediation and restoration | [Remediation and restoration](https://the-ghre.github.io/ecppt-classroom/#/session/s7#s7-restore) |

### Session 8 · Tuesday 1 December · Theory
**Topic:** Windows privilege escalation and exploit development foundations · **Site:** [15 slides](https://the-ghre.github.io/ecppt-classroom/#/session/s8)

| # | Outline slide topic | Taught on |
|---|---|---|
| 1 | Windows security context | [The Windows security context](https://the-ghre.github.io/ecppt-classroom/#/session/s8#s8-half1) |
| 2 | PowerShell for enumeration | [PowerShell for enumeration](https://the-ghre.github.io/ecppt-classroom/#/session/s8#s8-ps) |
| 3 | Escalation candidates | [Windows escalation candidates](https://the-ghre.github.io/ecppt-classroom/#/session/s8#s8-candidates) |
| 4 | Credentials and compatibility | [Credentials and compatibility](https://the-ghre.github.io/ecppt-classroom/#/session/s8#s8-compat) |
| 5 | Reading a proof of concept | [Reading a proof of concept](https://the-ghre.github.io/ecppt-classroom/#/session/s8#s8-half2) |
| 6 | Memory corruption fundamentals | [Memory corruption, at a glance](https://the-ghre.github.io/ecppt-classroom/#/session/s8#s8-memory) |
| 7 | Debugger demonstration | [A prepared crash under a debugger](https://the-ghre.github.io/ecppt-classroom/#/session/s8#s8-debugger) |
| 8 | Failure analysis | [Why a supplied exploit fails](https://the-ghre.github.io/ecppt-classroom/#/session/s8#s8-failure) |

### Session 9 · Wednesday 2 December · Practical
**Topic:** Escalate and explain · **Site:** [7 slides](https://the-ghre.github.io/ecppt-classroom/#/session/s9)

| Outline component | Taught on |
|---|---|
| Format & scope | [Escalate & explain](https://the-ghre.github.io/ecppt-classroom/#/session/s9#s9-title) · [Rules of engagement](https://the-ghre.github.io/ecppt-classroom/#/session/s9#s9-scope) |
| Student tasks (5) | [Your tasks](https://the-ghre.github.io/ecppt-classroom/#/session/s9#s9-tasks) |
| Submission | [What to submit](https://the-ghre.github.io/ecppt-classroom/#/session/s9#s9-submission) |
| Debrief prompts | [Debrief & reflection](https://the-ghre.github.io/ecppt-classroom/#/session/s9#s9-debrief) |
| Independent study | [Debrief & reflection](https://the-ghre.github.io/ecppt-classroom/#/session/s9#s9-debrief) |

### Session 10 · Sunday 6 December · Theory
**Topic:** Reach the internal network and understand AD · **Site:** [15 slides](https://the-ghre.github.io/ecppt-classroom/#/session/s10)

| # | Outline slide topic | Taught on |
|---|---|---|
| 1 | Pivoting and lateral movement | [Pivoting vs lateral movement](https://the-ghre.github.io/ecppt-classroom/#/session/s10#s10-pivot) |
| 2 | Traffic flow | [Moving traffic through the foothold](https://the-ghre.github.io/ecppt-classroom/#/session/s10#s10-traffic) |
| 3 | Tool compatibility | [Not every tool survives a proxy](https://the-ghre.github.io/ecppt-classroom/#/session/s10#s10-toolcompat) |
| 4 | Connectivity troubleshooting | [Connectivity troubleshooting, in layers](https://the-ghre.github.io/ecppt-classroom/#/session/s10#s10-troubleshoot) |
| 5 | AD building blocks | [Active Directory building blocks](https://the-ghre.github.io/ecppt-classroom/#/session/s10#s10-adblocks) |
| 6 | Account context | [Local vs domain accounts](https://the-ghre.github.io/ecppt-classroom/#/session/s10#s10-context) |
| 7 | Domain protocols | [The protocols that hold a domain together](https://the-ghre.github.io/ecppt-classroom/#/session/s10#s10-protocols) |
| 8 | Topology exercise | [Draw the path](https://the-ghre.github.io/ecppt-classroom/#/session/s10#s10-discuss) |

### Session 11 · Tuesday 8 December · Theory
**Topic:** AD enumeration and Kerberos weaknesses · **Site:** [16 slides](https://the-ghre.github.io/ecppt-classroom/#/session/s11)

| # | Outline slide topic | Taught on |
|---|---|---|
| 1 | Domain enumeration | [Domain enumeration](https://the-ghre.github.io/ecppt-classroom/#/session/s11#s11-enum) |
| 2 | Enumeration tools | [PowerView and BloodHound](https://the-ghre.github.io/ecppt-classroom/#/session/s11#s11-tools) |
| 3 | Attack-path reasoning | [From relationships to a hypothesis](https://the-ghre.github.io/ecppt-classroom/#/session/s11#s11-hypothesis) |
| 4 | Credential and permission weaknesses | [Weak credentials and excessive access](https://the-ghre.github.io/ecppt-classroom/#/session/s11#s11-weak) |
| 5 | Kerberos authentication | [Kerberos: the normal flow first](https://the-ghre.github.io/ecppt-classroom/#/session/s11#s11-kerberos) |
| 6 | AS-REP roasting and Kerberoasting | [AS-REP roasting vs Kerberoasting](https://the-ghre.github.io/ecppt-classroom/#/session/s11#s11-roasting) |
| 7 | Offline password auditing | [Offline auditing and what it proves](https://the-ghre.github.io/ecppt-classroom/#/session/s11#s11-audit) |
| 8 | Access validation | [Access validation: does the credential matter?](https://the-ghre.github.io/ecppt-classroom/#/session/s11#s11-access) |

### Session 12 · Wednesday 9 December · Practical
**Topic:** Investigate an internal domain · **Site:** [7 slides](https://the-ghre.github.io/ecppt-classroom/#/session/s12)

| Outline component | Taught on |
|---|---|
| Scenario & scope | [Investigate an internal domain](https://the-ghre.github.io/ecppt-classroom/#/session/s12#s12-title) · [Rules of engagement](https://the-ghre.github.io/ecppt-classroom/#/session/s12#s12-scope) |
| Student tasks (6) | [Your tasks](https://the-ghre.github.io/ecppt-classroom/#/session/s12#s12-tasks) |
| Submission | [What to submit](https://the-ghre.github.io/ecppt-classroom/#/session/s12#s12-submission) |
| Debrief prompts | [Debrief & reflection](https://the-ghre.github.io/ecppt-classroom/#/session/s12#s12-debrief) |
| Independent study | [Debrief & reflection](https://the-ghre.github.io/ecppt-classroom/#/session/s12#s12-debrief) |

### Session 13 · Sunday 13 December · Theory
**Topic:** From domain access to higher privileges · **Site:** [16 slides](https://the-ghre.github.io/ecppt-classroom/#/session/s13)

| # | Outline slide topic | Taught on |
|---|---|---|
| 1 | Authentication material | [Three kinds of authentication material](https://the-ghre.github.io/ecppt-classroom/#/session/s13#s13-material) |
| 2 | Pass-the-hash | [Pass-the-hash](https://the-ghre.github.io/ecppt-classroom/#/session/s13#s13-pth) |
| 3 | Pass-the-ticket | [Pass-the-ticket](https://the-ghre.github.io/ecppt-classroom/#/session/s13#s13-ptt) |
| 4 | Remote administration methods | [Remote administration methods](https://the-ghre.github.io/ecppt-classroom/#/session/s13#s13-remote) |
| 5 | Credential reuse and administrator relationships | [Credential reuse and admin relationships](https://the-ghre.github.io/ecppt-classroom/#/session/s13#s13-reuse) |
| 6 | Privilege boundaries | [Local admin is not Domain Admin](https://the-ghre.github.io/ecppt-classroom/#/session/s13#s13-boundaries) |
| 7 | Validate the privileged objective | [Validate the privileged objective](https://the-ghre.github.io/ecppt-classroom/#/session/s13#s13-objective) |
| 8 | Break the attack path | [The complete path — and where it breaks](https://the-ghre.github.io/ecppt-classroom/#/session/s13#s13-chain) |

### Session 14 · Tuesday 15 December · Theory
**Topic:** Integrate the workflow and prepare for assessment · **Site:** [14 slides](https://the-ghre.github.io/ecppt-classroom/#/session/s14)

| # | Outline slide topic | Taught on |
|---|---|---|
| 1 | The complete workflow | [The complete workflow, as one loop](https://the-ghre.github.io/ecppt-classroom/#/session/s14#s14-workflow) |
| 2 | Prioritization and time management | [Prioritisation and time management](https://the-ghre.github.io/ecppt-classroom/#/session/s14#s14-time) |
| 3 | Systematic troubleshooting | [Systematic troubleshooting](https://the-ghre.github.io/ecppt-classroom/#/session/s14#s14-troubleshoot) |
| 4 | Assessment records | [Assessment records](https://the-ghre.github.io/ecppt-classroom/#/session/s14#s14-records) |
| 5 | Technical findings | [Writing a technical finding](https://the-ghre.github.io/ecppt-classroom/#/session/s14#s14-findings) |
| 6 | Executive communication | [Executive communication](https://the-ghre.github.io/ecppt-classroom/#/session/s14#s14-exec) |
| 7 | Objective coverage review | [Objective coverage review](https://the-ghre.github.io/ecppt-classroom/#/session/s14#s14-coverage) |
| 8 | Capstone preparation | [Capstone preparation](https://the-ghre.github.io/ecppt-classroom/#/session/s14#s14-prep) |

### Session 15 · Wednesday 16 December · Practical
**Topic:** Integrated capstone · **Site:** [8 slides](https://the-ghre.github.io/ecppt-classroom/#/session/s15)

| Outline component | Taught on |
|---|---|
| Scenario | [Integrated capstone assessment](https://the-ghre.github.io/ecppt-classroom/#/session/s15#s15-title) · [The engagement](https://the-ghre.github.io/ecppt-classroom/#/session/s15#s15-scenario) |
| Timing table | [How to spend the four hours](https://the-ghre.github.io/ecppt-classroom/#/session/s15#s15-timing) |
| Required outcomes (6) | [What you must demonstrate](https://the-ghre.github.io/ecppt-classroom/#/session/s15#s15-tasks) |
| Checkpoint support | [Checkpoint support](https://the-ghre.github.io/ecppt-classroom/#/session/s15#s15-checkpoint) |
| Submission (report) | [The report](https://the-ghre.github.io/ecppt-classroom/#/session/s15#s15-submission) |
| Debrief prompts | [Technical debrief & where to go next](https://the-ghre.github.io/ecppt-classroom/#/session/s15#s15-debrief) |