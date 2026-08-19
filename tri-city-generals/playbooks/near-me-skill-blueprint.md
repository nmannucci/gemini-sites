# Skill Blueprint: `improve-near-me-visibility`

## Verdict

This is useful as a skill when it is treated as a repeatable audit-and-planning workflow, not as a frozen collection of ranking tactics.

The reusable value is the decision system:

- classify the business correctly
- check GBP eligibility and accuracy
- benchmark map, organic, and lead performance
- audit review acquisition and local site architecture
- reject policy-risk tactics
- produce a prioritized 30/60/90-day plan
- re-measure before expanding

The original document should not be embedded verbatim. It contains sales copy, duplicate passages, time-sensitive claims, unverified causal claims, and tactics that conflict with current Google guidance.

## Recommended Skill Shape

```text
improve-near-me-visibility/
├── SKILL.md
├── agents/
│   └── openai.yaml
└── references/
    ├── playbook.md
    ├── intake.md
    └── output-template.md
```

No script is required for version one. Add scripts only after a repeated deterministic task appears, such as normalizing rank-grid exports or generating a scorecard from a standard CSV.

## Trigger Examples

- “Create a near-me SEO plan for this plumber.”
- “Audit this company’s Google Business Profile and location pages.”
- “Why aren’t we appearing in the map pack?”
- “Build a 90-day local SEO playbook for this home-service client.”
- “Should we create pages for these 20 neighborhoods?”

## Proposed `SKILL.md`

```markdown
---
name: improve-near-me-visibility
description: Audit and improve near-me, map-pack, and local organic visibility for storefront, hybrid, and service-area businesses. Use when Codex needs to evaluate a Google Business Profile, local rankings, review acquisition, citations, or service/location page architecture; diagnose why a business is not appearing locally; decide whether proposed location pages deserve separate URLs; or produce a policy-compliant 30/60/90-day local SEO plan.
---

# Improve Near-Me Visibility

Use Google’s relevance, distance, and prominence framework. Optimize for qualified leads, not ranking claims.

## Workflow

1. Read `references/intake.md` and collect the required business facts.
2. Verify current Google Business Profile and Search policies from official Google sources when eligibility, reviews, locations, or automated tactics are involved.
3. Read `references/playbook.md`.
4. Classify the business as storefront, service-area, or hybrid before recommending profile or address changes.
5. Establish a baseline for map-grid visibility, organic visibility, indexed pages, GBP actions, and qualified leads. State all tracking gaps.
6. Audit profile accuracy, categories, services, hours, photos, reviews, citations, and website architecture.
7. Apply the page-deserves-a-page gate before recommending any service-area or neighborhood URL.
8. Reject fake locations, virtual-office shortcuts, manipulated engagement, scripted-keyword reviews, and thin doorway pages.
9. Produce findings ordered by impact, confidence, effort, and policy risk.
10. Produce a 30/60/90-day plan with owners, dependencies, measures, and stop/continue rules.

## Operating Rules

- Use read-only inspection by default. Do not edit GBP, websites, analytics, or third-party listings unless the user explicitly requests implementation.
- Distinguish Google-documented facts, credible inference, and experiments.
- Never guarantee rankings, lead volume, or a timeline.
- Do not treat geotagged EXIF data, GBP post frequency, map embeds, or review wording as confirmed ranking factors without current official evidence.
- Confirm every location is legitimate and genuinely served.
- Prefer improving existing pages before creating additional URLs.
- Require measurement before scaling.

## Output

Follow `references/output-template.md`. Include:

- executive diagnosis
- business-type and eligibility assessment
- baseline and measurement gaps
- prioritized findings
- page map and consolidation recommendations
- 30/60/90-day implementation plan
- KPI scorecard
- policy risks and excluded tactics
- evidence and source links
```

## Suggested Intake Reference

Ask for or discover:

- website and GBP URL
- business model and customer-facing locations
- services and priorities
- legitimate service areas
- customer type and travel pattern
- access to GBP Performance, Search Console, analytics, calls/forms, and CRM
- current rankings or map-grid export
- seasonality and capacity

Do not block an initial audit when some data is missing. Label the limitation and separate observable facts from unverified assumptions.

## Suggested Output Template

1. Executive diagnosis
2. What Google can verify today
3. Measurement baseline and gaps
4. Findings table: issue, evidence, impact, confidence, effort, policy risk
5. Recommended service/location architecture
6. 30/60/90-day plan
7. KPI scorecard and review cadence
8. Tests worth running
9. Tactics explicitly rejected
10. Sources

## Usefulness Test

The skill is successful if, given three different local businesses, it:

- classifies each business type correctly
- refuses mailbox, virtual-office, CTR manipulation, and scripted-review tactics
- does not recommend the same page count to every business
- separates map visibility, organic visibility, and leads
- produces different priorities from the supplied evidence
- identifies missing measurement rather than inventing certainty
- cites current official policy for eligibility and review-risk decisions

## Forward-Test Prompts

1. “Use this skill to create a near-me visibility plan for a plumber that works from home, visits customers, and wants to rent a mailbox to rank downtown.”
2. “Use this skill to audit a three-location dental group with legitimate staffed offices and strong reviews but weak organic location pages.”
3. “Use this skill to assess a landscaper asking for 30 neighborhood pages despite having no location-specific proof or tracking.”

Expected behavior should emerge from the skill, not be inserted into the test prompt beyond the raw business facts.

## Recommended Next Step

Run the three forward tests before installing the skill globally. If the outputs are consistently policy-safe, evidence-driven, and meaningfully different, initialize it as `improve-near-me-visibility`, place this playbook in `references/playbook.md`, generate `agents/openai.yaml`, and validate the folder with the skill-creator validator.

