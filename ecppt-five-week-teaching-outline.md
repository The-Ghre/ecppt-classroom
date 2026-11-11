# eCPPT Five-Week Teaching Outline

> **Slide development source**  
> **Course dates:** 15 November–16 December 2026  
> **Schedule:** Sunday and Tuesday — theory; Wednesday — practical  
> **Suggested contact time:** 3 hours per theory session; 4 hours per practical session  
> **Total:** 15 sessions · 30 theory hours · 20 practical hours  
> **Independent study:** 3–5 hours per week

## How to use this document for slides

Each session contains a learning outcome, a suggested slide sequence, and an assessment or deliverable. Use each numbered slide topic as a starting point for one slide or a short group of slides. Put detailed demonstrations, commands, expected results, and troubleshooting guidance in speaker notes or companion lab sheets.

Suggested slide pattern:

1. **Explain:** Introduce the concept and its purpose.
2. **Demonstrate:** Show a worked example and interpret the evidence.
3. **Discuss:** Ask students to choose the next action and justify it.
4. **Check:** Assess whether students can explain and apply the concept.

Practical-session slides should cover the scenario, scope, objectives, submission requirements, and debrief. Keep instructor solutions in a separate document.

## Course purpose

Prepare students to assess a small network methodically: discover systems, identify entry points, validate vulnerabilities, escalate privileges, move between systems, assess Active Directory, and communicate findings.

By the end of the course, students should be able to:

- Turn discovery results into a prioritized testing plan.
- Validate an initial-access path through a service or web application.
- Identify and demonstrate Linux and Windows privilege escalation.
- Explain basic exploit behavior and adapt a supplied proof of concept.
- Investigate an internal segment through an existing foothold.
- Enumerate Active Directory and validate an identity-based attack path.
- Produce reproducible findings with evidence, impact, and remediation.

### Entry requirements

This accelerated course assumes familiarity with TCP/IP, common network services, basic Linux and Windows administration, and introductory penetration testing. Use a short preparatory exercise to identify gaps before the first class.

### Source and scope decisions

The primary reference is [Dragkob’s eCPPT repository](https://github.com/Dragkob/eCPPT). Its notes are mainly concise command references; supplement them with conceptual explanations, demonstrations, and structured lab worksheets.

The repository README excludes buffer overflows, while [INE’s published eCPPT objectives](https://ine.com/security/certifications/ecppt-certification) include exploit development. This outline therefore includes a focused exploit-development component. Network enumeration, manual web validation, and professional reporting also receive supplementary instruction.

| Published exam domain | Weight | Main teaching coverage |
|---|---:|---|
| Information Gathering and Reconnaissance | 10% | Week 1; reinforced in later labs |
| Initial Access | 15% | Weeks 1–2; reinforced in the capstone |
| Web Application Penetration Testing | 15% | Week 2 |
| Exploitation and Post-Exploitation | 25% | Weeks 1–3; integrated in Weeks 4–5 |
| Exploit Development | 5% | Week 3 and independent study |
| Active Directory Penetration Testing | 30% | Weeks 4–5 |

**Source check:** 11 November 2026. Exam weights describe INE’s published domains, not the course grading scheme. Reporting is included as a professional skill.

## Course calendar

| Week | Sunday — Theory | Tuesday — Theory | Wednesday — Practical |
|---|---|---|---|
| 1 | **15 Nov:** Methodology and reconnaissance | **17 Nov:** Enumeration and initial access | **18 Nov:** Discover, enumerate, and obtain a foothold |
| 2 | **22 Nov:** Web application enumeration | **24 Nov:** Web vulnerabilities and exploitation | **25 Nov:** Web assessment and initial access |
| 3 | **29 Nov:** Linux privilege escalation | **1 Dec:** Windows privilege escalation and exploit fundamentals | **2 Dec:** Local escalation and exploit analysis |
| 4 | **6 Dec:** Pivoting and AD foundations | **8 Dec:** AD enumeration and Kerberos weaknesses | **9 Dec:** Internal network and AD investigation |
| 5 | **13 Dec:** AD lateral movement and privilege escalation | **15 Dec:** Integrated methodology and assessment preparation | **16 Dec:** Capstone and technical debrief |

---

## Week 1 — Methodology, reconnaissance, and initial access

**Weekly outcome:** Turn discovery results into a justified testing plan and establish a documented foothold.

### Session 1 · Sunday 15 November · Theory

**Topic:** How to approach a penetration test  
**Duration:** 3 hours  
**Learning outcome:** Build a host-and-service inventory and justify the next enumeration steps.

#### Suggested slide sequence

1. **Engagement scope and objectives** — Permitted targets and actions, success criteria, and stop conditions.
2. **The testing lifecycle** — Discovery, enumeration, validation, exploitation, post-exploitation, and reporting.
3. **Network foundations refresher** — Ports, protocols, routing, DNS, and exposed services.
4. **Host discovery and scanning** — TCP and UDP coverage, service identification, and interpretation of results.
5. **Evidence organization** — Host inventory, service matrix, timestamps, screenshots, and test notes.
6. **Observation versus confirmed finding** — What a scan suggests and what further validation must establish.
7. **Worked network example** — Interpret a fictional company network and propose the next questions.
8. **Knowledge check** — Select three next steps and explain the evidence supporting each.

**Teaching activity:** Walk through a small fictional company network. Pause at each result and ask what it establishes and what remains unknown.

**Exit check:** A host-and-service matrix with three justified next steps.

### Session 2 · Tuesday 17 November · Theory

**Topic:** From an exposed service to initial access  
**Duration:** 3 hours  
**Learning outcome:** Select a plausible entry point and explain its prerequisites and success indicators.

#### Suggested slide sequence

1. **Service-specific enumeration** — SMB, SSH, FTP, HTTP, and remote administration services.
2. **Users, shares, and credentials** — Username discovery, exposed shares, configuration weaknesses, and credential reuse.
3. **Authentication testing** — Password spraying versus brute force; account lockout considerations.
4. **Vulnerability research** — Match product, version, configuration, and exploit prerequisites.
5. **Exploit selection** — Check assumptions and define what successful validation would prove.
6. **Sessions and shells** — Basic Metasploit workflow, shell types, session context, and connection troubleshooting.
7. **Compare two targets** — Similar scan results with different exploitation prerequisites.
8. **Evidence and decision review** — Record successful and unsuccessful tests and justify the selected path.

**Teaching activity:** Compare two hosts and have students explain which path they would test first.

**Exit check:** A chosen entry point, supporting evidence, and a plan to confirm success.

### Session 3 · Wednesday 18 November · Practical

**Topic:** Discover and establish access  
**Duration:** 4 hours

**Scenario:** A small lab subnet contains several services and one intended initial-access path.

#### Student tasks

1. Identify live hosts and exposed services.
2. Perform service-specific enumeration.
3. Select and validate a likely weakness.
4. Obtain a low-privilege foothold.
5. Confirm the host, account, and access level.
6. Document the finding and recommend remediation.

**Submission:** Network inventory, annotated test log, and one reproducible finding.

**Debrief prompts:** Which evidence changed your plan? What failed, and why? What configuration change would prevent the demonstrated access?

**Independent study:** Repeat enumeration without the worksheet and build a personal service-enumeration checklist.

**Reading:** [Network testing material linked by the repository](https://github.com/Dragkob/eJPT), plus instructor methodology and evidence templates.

---

## Week 2 — Web application penetration testing

**Weekly outcome:** Map an application, validate a web vulnerability, and distinguish scanner output from demonstrated impact.

### Session 4 · Sunday 22 November · Theory

**Topic:** Understand the application before testing it  
**Duration:** 3 hours  
**Learning outcome:** Produce an application map and prioritize likely input points.

#### Suggested slide sequence

1. **HTTP foundations** — Requests, responses, parameters, cookies, sessions, and authentication.
2. **Application mapping** — Pages, functions, endpoints, and user roles.
3. **Content discovery** — Directories, files, virtual hosts, and exposed resources.
4. **Technology identification** — Frameworks, CMS components, and potentially outdated software.
5. **Intercepting proxy workflow** — Inspecting, modifying, and replaying requests.
6. **Scanner interpretation** — Using Nikto, Gobuster, and WPScan results to guide investigation.
7. **Misleading results** — False positives, redirects, custom error pages, and status codes.
8. **Application mapping exercise** — Select and prioritize tests before exploitation.

**Teaching activity:** Map one application together before running automated checks.

**Exit check:** An application map with likely input points and prioritized tests.

### Session 5 · Tuesday 24 November · Theory

**Topic:** Validate vulnerabilities and explain impact  
**Duration:** 3 hours  
**Learning outcome:** Explain why an observed response supports—or fails to support—a vulnerability claim.

#### Suggested slide sequence

1. **SQL injection** — Underlying cause, manual validation, and controlled automation.
2. **Command injection** — Distinguishing application behavior from operating-system execution.
3. **Cross-site scripting** — Execution context, validation, and realistic impact.
4. **Authentication weaknesses** — Controlled login testing and interpretation of outcomes.
5. **Components and configuration** — Outdated software, exposed settings, and credentials.
6. **Supplementary file weaknesses** — File upload and file inclusion concepts.
7. **Evidence of impact** — Demonstrate the finding with the minimum necessary evidence.
8. **Root-cause remediation** — Explain what must change and how to retest it.

**Teaching activity:** Demonstrate manual validation first, then show where automation saves time.

**Exit check:** Interpret a suspicious response and state what additional evidence is needed.

### Session 6 · Wednesday 25 November · Practical

**Topic:** Assess a vulnerable web application  
**Duration:** 4 hours

**Scenario:** A lab application contains suspicious behaviors, false leads, and an intended route to initial access.

#### Student tasks

1. Map the application and capture relevant requests.
2. Identify and manually validate a vulnerability.
3. Use automation to confirm or extend the finding where appropriate.
4. Retrieve a designated synthetic record or obtain the intended foothold.
5. Document impact, reproduction steps, and remediation.

**Submission:** Two assessed findings, request-and-response evidence, and an updated attack-path diagram.

**Debrief prompts:** Which result was a false lead? What proved impact? How would you verify the fix?

**Independent study:** Retest one finding after a simulated fix and explain whether remediation is effective.

**Reading:** [Web Application Penetration Testing notes](https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_WebAppPentest.pdf).

---

## Week 3 — Privilege escalation and exploit fundamentals

**Weekly outcome:** Identify a plausible local escalation path, validate its prerequisites, and explain basic exploit behavior.

### Session 7 · Sunday 29 November · Theory

**Topic:** Linux privilege escalation  
**Duration:** 3 hours  
**Learning outcome:** Explain an escalation path, the conditions it requires, and its remediation.

#### Suggested slide sequence

1. **Local context** — Identity, groups, processes, services, interfaces, and installed software.
2. **Permissions and ownership** — Writable resources and their security implications.
3. **SUID, SGID, and sudo** — Identify permissions and execution conditions that warrant investigation.
4. **Tasks and services** — Writable scripts, scheduled tasks, and service configuration.
5. **Locally stored credentials** — Configuration files, shell history, and application directories.
6. **Prioritizing candidates** — Investigate misconfigurations before considering kernel exploits.
7. **Manual validation** — Confirm automated findings and demonstrate the resulting access level.
8. **Remediation and restoration** — Address the root cause and restore lab changes.

**Teaching activity:** Rank several enumeration findings by feasibility and impact.

**Exit check:** Describe one escalation path, its prerequisites, and its remediation.

### Session 8 · Tuesday 1 December · Theory

**Topic:** Windows privilege escalation and exploit development foundations  
**Duration:** 3 hours  
**Learning outcome:** Explain a Windows escalation opportunity and identify assumptions in a supplied exploit.

#### First half — Windows privilege escalation

1. **Windows security context** — Users, groups, privileges, integrity levels, and UAC.
2. **PowerShell for enumeration** — Essential commands and interpretation of results.
3. **Escalation candidates** — Service permissions, executable paths, scheduled tasks, and autoruns.
4. **Credentials and compatibility** — Saved credentials, PowerShell history, and operating-system prerequisites.

#### Second half — Exploit development foundations

5. **Reading a proof of concept** — Identify assumptions and environment-specific settings.
6. **Memory corruption fundamentals** — Stack behavior and buffer-overflow concepts.
7. **Debugger demonstration** — Examine a prepared crash and recognize DEP and ASLR.
8. **Failure analysis** — Troubleshoot incompatible assumptions and unsuccessful exploitation.

**Teaching activity:** Annotate a short exploit example, then inspect a prepared debugger exercise.

**Exit check:** Explain one Windows escalation opportunity and annotate the exploit’s assumptions.

### Session 9 · Wednesday 2 December · Practical

**Topic:** Escalate and explain  
**Duration:** 4 hours

**Format:** Two host exercises and one short exploit-analysis exercise.

#### Student tasks

1. Enumerate a Linux host and validate an intended escalation path.
2. Enumerate a Windows host and validate a different escalation path.
3. Identify a misleading automated finding.
4. Inspect a prepared crash or modify a supplied proof of concept in the lab.
5. Record root causes and corrective actions for successful paths.

**Submission:** Two escalation findings and a brief exploit-analysis worksheet.

**Debrief prompts:** Which prerequisites mattered? Why did an automated finding fail validation? How did you confirm elevated access?

**Independent study:** Complete the debugger exercise and refine separate Linux and Windows enumeration checklists.

**Reading:** [Linux privilege escalation](https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_Privesc_Linux.pdf), [Windows privilege escalation](https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_Privesc_Windows.pdf), and [PowerShell notes](https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_PowerShell.pdf). Supply an additional exploit-development handout.

---

## Week 4 — Pivoting and Active Directory enumeration

**Weekly outcome:** Investigate an internal segment through an existing foothold and identify an evidenced AD attack path.

### Session 10 · Sunday 6 December · Theory

**Topic:** Reach the internal network and understand AD  
**Duration:** 3 hours  
**Learning outcome:** Draw an access path and explain its routing, name-resolution, and credential requirements.

#### Suggested slide sequence

1. **Pivoting and lateral movement** — Different purposes and prerequisites.
2. **Traffic flow** — Routing, port forwarding, SOCKS proxies, and SSH tunneling.
3. **Tool compatibility** — Proxy limitations and appropriate testing methods.
4. **Connectivity troubleshooting** — Separate reachability, name resolution, and authentication problems.
5. **AD building blocks** — Domains, domain controllers, users, groups, computers, and service accounts.
6. **Account context** — Local accounts versus domain accounts.
7. **Domain protocols** — Roles of DNS, LDAP, SMB, NTLM, and Kerberos.
8. **Topology exercise** — Draw the path from the attacker to an internal domain resource.

**Teaching activity:** Draw packet flow before demonstrating a tunnel; introduce the domain behind the pivot host.

**Exit check:** An access-path diagram with required routes and credentials.

### Session 11 · Tuesday 8 December · Theory

**Topic:** AD enumeration and Kerberos weaknesses  
**Duration:** 3 hours  
**Learning outcome:** Select a candidate AD attack path and explain the conditions required for it to work.

#### Suggested slide sequence

1. **Domain enumeration** — Users, groups, computers, shares, and privileged relationships.
2. **Enumeration tools** — PowerView and BloodHound concepts.
3. **Attack-path reasoning** — Convert collected relationships into a testable hypothesis.
4. **Credential and permission weaknesses** — Weak credentials and excessive access.
5. **Kerberos authentication** — Explain the normal workflow before introducing weaknesses.
6. **AS-REP roasting and Kerberoasting** — Prerequisites, differences, and implications.
7. **Offline password auditing** — Designated lab accounts and interpretation of results.
8. **Access validation** — Determine whether recovered credentials provide useful access.

**Teaching activity:** Present several possible paths and require supporting evidence before selection.

**Exit check:** One candidate AD path with its prerequisites and validation plan.

### Session 12 · Wednesday 9 December · Practical

**Topic:** Investigate an internal domain  
**Duration:** 4 hours

**Scenario:** Students begin with a foothold on a host connected to an internal AD environment.

#### Student tasks

1. Establish access to the internal segment.
2. Discover domain infrastructure.
3. Enumerate users, groups, shares, and relevant relationships.
4. Identify an intended Kerberos or credential weakness.
5. Validate the resulting access.
6. Update the network and identity attack-path diagram.

**Submission:** Internal network map, AD relationship diagram, validated finding, and supporting evidence.

**Debrief prompts:** What made the path possible? Which relationship required manual confirmation? Where could a defender interrupt the path?

**Independent study:** Explain how changing one account setting or permission would break the demonstrated path.

**Reading:** [Linux pivoting notes](https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_LatMovement_Pivoting_Linux.pdf), [Windows lateral movement notes](https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_LatMovement_Pivoting_Windows.pdf), and the enumeration and Kerberos sections of the [AD notes](https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_ADPentest.pdf).

---

## Week 5 — AD lateral movement and integrated assessment

**Weekly outcome:** Connect individual findings into a complete, evidenced attack path and explain its business impact.

### Session 13 · Sunday 13 December · Theory

**Topic:** From domain access to higher privileges  
**Duration:** 3 hours  
**Learning outcome:** Explain a complete AD attack path and identify controls that would interrupt it.

#### Suggested slide sequence

1. **Authentication material** — Compare passwords, password hashes, and Kerberos tickets.
2. **Pass-the-hash** — Prerequisites, limitations, and interpretation of access.
3. **Pass-the-ticket** — Prerequisites, limitations, and interpretation of access.
4. **Remote administration methods** — SMB, WMI, PowerShell remoting, and RDP.
5. **Credential reuse and administrator relationships** — Identify where access can extend.
6. **Privilege boundaries** — Distinguish local administrative control from domain privileges.
7. **Validate the privileged objective** — Confirm access and preserve supporting evidence.
8. **Break the attack path** — Identify root causes and effective remediation points.

**Teaching activity:** Compare access methods and select one based on authentication, privileges, and reachability.

**Exit check:** A complete AD path with two points where remediation could stop it.

### Session 14 · Tuesday 15 December · Theory

**Topic:** Integrate the workflow and prepare for assessment  
**Duration:** 3 hours  
**Learning outcome:** Produce an assessment plan and identify remaining preparation gaps.

#### Suggested slide sequence

1. **The complete workflow** — From discovery to privileged access.
2. **Prioritization and time management** — Select promising paths and limit unproductive tests.
3. **Systematic troubleshooting** — Separate network, authentication, exploit, and privilege failures.
4. **Assessment records** — Maintain host, credential, and evidence ledgers.
5. **Technical findings** — Clear reproduction, demonstrated impact, and actionable remediation.
6. **Executive communication** — Summarize risk and explain the attack narrative.
7. **Objective coverage review** — Compare demonstrated skills with published exam domains.
8. **Capstone preparation** — Personal plan, weakest domain, and submission expectations.

**Teaching activity:** Run a tabletop scenario with incomplete evidence; students choose and justify their next actions.

**Exit check:** A personal assessment plan and an identified priority for further practice.

### Session 15 · Wednesday 16 December · Practical

**Topic:** Integrated capstone  
**Duration:** 4 hours

**Scenario:** A small enterprise lab contains an exposed application or service, a foothold opportunity, a local escalation path, and an internal AD objective.

#### Timing

| Activity | Minutes |
|---|---:|
| Scope briefing and planning | 15 |
| Independent assessment | 150 |
| Evidence organization and concise report | 45 |
| Technical debrief and instructor feedback | 30 |
| **Total** | **240** |

#### Required outcomes

1. Discover and enumerate the assigned environment.
2. Validate an initial-access route.
3. Demonstrate local escalation where required by the intended path.
4. Investigate the domain and demonstrate lateral movement.
5. Reach the designated privileged objective.
6. Explain the complete path, supporting evidence, and remediation.

**Checkpoint support:** Provide a foothold to students who stall early so later skills can still be assessed. Record the assistance given.

**Submission:** A concise report containing an executive summary, network diagram, attack narrative, technical findings, evidence, and prioritized remediation.

**Debrief prompts:** Which decisions saved time? Which assumptions were wrong? What was the most effective remediation point? What should the student practice next?

**Reading:** Revisit the lateral-movement sections of the [AD notes](https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_ADPentest.pdf) and personal checklists.

---

## Teaching delivery guide

### Suggested theory-session rhythm

| Segment | Minutes | Purpose |
|---|---:|---|
| Retrieval quiz and recap | 15 | Connect the session to previous learning |
| Concept explanation | 40 | Establish the model and prerequisites |
| Instructor demonstration | 35 | Interpret evidence and decisions |
| Break | 10 | Pause |
| Second teaching block | 35 | Extend or apply the concept |
| Student analysis exercise | 30 | Require independent reasoning |
| Exit check and study briefing | 15 | Identify gaps and set follow-up work |
| **Total** | **180** | |

Adapt this rhythm for Session 8 to preserve its two teaching halves.

### Questions to repeat throughout the course

- What evidence supports this test?
- What conditions must be true for it to work?
- What does the result prove?
- What should we investigate next?
- What change would address the root cause?

### Progression of student independence

| Stage | Support level |
|---|---|
| Week 1 | Guided worksheet and instructor checkpoints |
| Weeks 2–3 | Partial guidance with independent validation |
| Week 4 | Objective-based tasks and limited prompts |
| Week 5 | Independent assessment with recorded checkpoint assistance |

## Suggested course assessment

| Component | Weight |
|---|---:|
| Weekly quizzes and reasoning exercises | 10% |
| Practical submissions from Weeks 1–4 | 40% |
| Capstone technical execution | 30% |
| Capstone evidence, explanation, and remediation | 20% |
| **Total** | **100%** |

Assess reasoning and evidence alongside technical success. These are instructor-selected course weights, separate from INE’s exam-domain weights.

## Instructor preparation checklist

### Lab environment

- [ ] Attacker workstation with tested tools.
- [ ] Linux and Windows targets.
- [ ] Vulnerable web application with synthetic data.
- [ ] Small AD environment with a domain controller and member hosts.
- [ ] Separate internal segment for pivoting.
- [ ] Defined scope and permitted actions for each practical.
- [ ] Snapshots, reset instructions, and checkpoint access.
- [ ] Tested intended paths on the exact lab images.

### Teaching materials

- [ ] Session slides derived from the suggested sequences.
- [ ] Student worksheets and separate instructor solutions.
- [ ] Demonstration notes with expected results and troubleshooting prompts.
- [ ] Evidence, finding, and report templates.
- [ ] Supplementary network enumeration and manual web-testing material.
- [ ] Exploit-development handout and prepared debugger exercise.
- [ ] Exit questions, quizzes, and marking guidance.
- [ ] Extension tasks for faster students.

### Final preparation

- [ ] Check tool syntax and compatibility before demonstrations.
- [ ] Confirm that findings require evidence rather than tool output alone.
- [ ] Confirm that practical submissions match the stated learning outcomes.
- [ ] Use final assessment results to recommend further individual practice.

## Source index

- [Primary eCPPT repository and README](https://github.com/Dragkob/eCPPT)
- [INE eCPPT objectives](https://ine.com/security/certifications/ecppt-certification)
- [Linked eJPT network-testing resources](https://github.com/Dragkob/eJPT)
- [PowerShell](https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_PowerShell.pdf)
- [Web application penetration testing](https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_WebAppPentest.pdf)
- [Linux privilege escalation](https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_Privesc_Linux.pdf)
- [Windows privilege escalation](https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_Privesc_Windows.pdf)
- [Linux lateral movement and pivoting](https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_LatMovement_Pivoting_Linux.pdf)
- [Windows lateral movement and pivoting](https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_LatMovement_Pivoting_Windows.pdf)
- [Active Directory penetration testing](https://github.com/Dragkob/eCPPT/blob/main/PDFs%20(Section%20Split)/Dragkob_eCPPT_ADPentest.pdf)
