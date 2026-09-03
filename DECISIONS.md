# Puente Week 4 - Decisions

## Session close - September 2, 2026

- Adopted the Team 6 Blueprint's primary vacuum: an unranked, verified, user-controlled, cash-protected Trajectory Navigator.
- Scoped Rodrigo's slice to Condition 4: 7/14-day cash protection, route cards, evidence states, and protected fallback.
- Chose an invented 20-year-old candy seller in Ecatepec as the one exact test user.
- Kept MXN 1,200 per week and MXN 2,400 over 14 days as test assumptions, not population facts.
- Defined the reserve as the lowest net selling day in the seven-day record.
- Chose deterministic TypeScript for route decisions and labeled simulated AI for plain-Spanish summaries and message drafts.
- Chose no persistence, database, auth, or external API for this slice so no personal data is stored or transmitted.
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
- Documented all team-locked decisions, adjustable slice decisions, hypotheses, and security constraints in `docs/DESIGN_OPTIONS_AND_CRITICAL_DECISIONS.md`.

## Tomorrow's first move

Run the first mechanical test pass against the deterministic cash-protection calculations, record the first bug, and deploy the corrected prototype.
