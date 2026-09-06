# Puente Week 4 - Decisions

## Session close - September 2, 2026

- Adopted the Team 6 Blueprint's primary vacuum: an unranked, verified, user-controlled, cash-protected Trajectory Navigator.
- Scoped Rodrigo's slice to Condition 4: 7/14-day cash protection, route cards, evidence states, and protected fallback.
- Chose an invented 20-year-old candy seller in Ecatepec as the one exact test user.
- Kept MXN 1,200 per week and MXN 2,400 over 14 days as test assumptions, not population facts.
- Defined the reserve as the lowest net selling day in the seven-day record.
- Initially chose deterministic TypeScript for route decisions and a labeled simulation for plain-Spanish summaries; the later Brightspace audit superseded only the simulation choice.
- Chose no persistence, database, or auth for this slice so no personal data is stored.
- Generated the mockup before code and saved it under `docs/assets/puente-mobile-mockup.png`.
- Preserved the Open-Future firewall: no best-route label, ranking, destiny score, or AI override.

## Design exploration - September 2, 2026

- Rejected the first blue/green card mockup as a generic fintech baseline.
- Generated three materially different directions: Living Route, Survival Ledger, and Open Passport.
- Recommended a B+A hybrid: Survival Ledger information architecture with Living Route navigation and brand behavior.
- Rodrigo selected the B+A hybrid: Survival Ledger information architecture with Living Route navigation.
- Replaced every blue accent after review. The locked palette is matte black, graphite/cement gray, warm ivory, and acid yellow; yellow is the only chromatic accent.
- Adopted `PUENTE` as the user-facing name with `by TRAJECTORY` as a quiet endorsement.
- Adopted an original two-span bridge/route mark implemented with CSS geometry rather than copied artwork.
- Built the first responsive slice with editable cash inputs, 7/14-day calculations, equal-weight routes, explicit opportunity cost, a protected 12-hour candy-sales bridge, and a 24-hour fallback.
- Completed deploy 1, then used the mechanical pass to find and fix an overstatement bug when reported candy-selling hours were below the route's retained-hours assumption.
- Completed the 360 px synthetic-persona pass with Luis using MXN 1,800 available, MXN 1,500 weekly candy income, 42 selling hours, and a MXN 9,500 formal salary anchor.
- Fixed the persona pass's critical contradiction: a route with a negative pre-paycheck bridge can no longer remain verified or selected. It is now `NO DISPONIBLE`, its action is disabled, and no route is preselected.
- Documented all team-locked decisions, adjustable slice decisions, hypotheses, and security constraints in `docs/DESIGN_OPTIONS_AND_CRITICAL_DECISIONS.md`.

## Final specification audit - September 4, 2026

- Replaced the weekly aggregate with seven editable daily records for gross sales, restocking, transport, other costs, and hours. Fewer than five valid days blocks both routes.
- Added the Blueprint Condition 4 emergency reserve: the lowest positive net selling day. The protected amount is now the 14-day household floor plus this reserve.
- Itemized transport, phone/data, documents, equipment or uniform, meals, bank/onboarding/unpaid training, and lost candy income instead of hiding them in a lump sum.
- Counted all unconfirmed future income or support as MXN 0.
- Added route source, evidence date, responsible party, requirements, schedule, first-payment/support treatment, and missing-evidence fields.
- Added select, switch, reject-all, reset-with-confirmation, local JSON export, deterministic summary, and user-approved verification draft controls.
- Fixed a boundary case so any route shown as `NO DISPONIBLE` is also mechanically disabled.
- Re-ran 13 deterministic tests, lint, production build, and mobile interaction tests before the later LLM compliance pass. The final Luis scenario leaves both routes unavailable: formal margin MXN -1,073; education margin MXN -144.
- Initially treated the Blueprint's optional-AI language as sufficient. The later Brightspace audit proved that assumption incomplete and triggered the constrained real-LLM endpoint recorded below.
- External delivery remains blocked until the live site is shared with the instructor, a reachable GitHub repository exists, the narrated MP4 is recorded, and the authentic build conversation is exported.

## Brightspace correction - September 4, 2026

- Verified the exact Business Bending page after re-authentication. Its stack floor is explicitly **LLM + structured data**; skill assessments may be simulated, but the LLM itself may not.
- Replaced the simulation-only claim with a real server-side GPT-5 mini rewrite endpoint.
- Kept every route and cash decision deterministic. The LLM sees only validated numbers, allowed route states, period, and user choice; it cannot score, verify, infer, rank, or recommend. After instructor clarification, the provider was switched to the free Groq-compatible API using `openai/gpt-oss-20b`; `GROQ_API_KEY` remains server-side.
- Added `store: false`, a 4 KB request limit, no free-text input, no personal fields, output-length enforcement, and a prohibited-language guard with deterministic fallback.
- Changed the live site to public access after Rodrigo explicitly authorized it.
