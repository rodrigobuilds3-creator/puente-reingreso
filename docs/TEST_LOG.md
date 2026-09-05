# PUENTE — Mechanical test log

## Pass 1 — September 2, 2026

### Checks run

- Seven-day floor equals MXN 1,200.
- Fourteen-day floor equals MXN 2,400.
- The formal route preserves 12 weekly candy-selling hours for the baseline persona.
- Opportunity cost remains visible but is not deducted twice.
- Insufficient cash produces a negative pre-paycheck bridge.
- Negative and non-finite inputs are sanitized.

### Bug found

When a user entered fewer than 12 total candy-selling hours, the formal route still displayed 12 retained hours. That invented work and overstated retained candy income.

### Fix

The engine now caps retained hours at the user's reported weekly hours before calculating retained income and opportunity cost. A regression test uses an eight-hour baseline and requires eight retained hours with zero opportunity cost.

### Result

Seven engine tests pass after the fix. The corrected build is the second deployment candidate.

## Pass 2 - September 3, 2026

### Persona-test regression added

The synthetic persona test exposed a separate safety contradiction: Route 1 could remain `VERIFIED` while its bridge before the first paycheck was negative. The engine now keeps evidence status separate from cash safety. Any route with `bridge < 0` becomes `NO DISPONIBLE`, cannot be selected, and does not generate next steps.

### Final automated result

Eight engine tests pass, including the new regression test `keeps evidence status separate from cash safety`.

### Tooling note

The deployed version had already passed `npm run build` and `npm run lint`. A documentation-only final rerun on September 3 encountered a local dependency-runtime mismatch in the existing `node_modules`: ESLint reported `shouldUseFlatConfig is not a function`, while a concurrent Vinext build stalled without reporting an application error. No product source changed after the last successful deployment; the deterministic test suite still completed with 8/8 passing.

## Pass 3 - September 4, 2026 specification audit

### Gap found

The Packet promised a 5-7 day sales log, lowest-day reserve, cost-category breakdown, complete route evidence, unconfirmed-income exclusion, inline validation, rejection/export controls, and a labeled generated summary and draft. The interface still used one weekly aggregate and therefore could not prove those acceptance criteria.

### Fix

- Added seven editable daily records and a five-valid-day gate.
- Added daily net, weekly net, hours, and the lowest positive day as reserve.
- Changed the protected amount from floor alone to floor plus reserve.
- Added transition-cost categories and kept opportunity cost visible without deducting it twice.
- Counted no unconfirmed education-route income.
- Added source, evidence date, responsible party, requirements, schedule, first-payment/support treatment, and missing evidence to both routes.
- Added reject-all, confirmed reset, local JSON export, deterministic summary, and message preview controls.
- Tested the full interaction at 360 px.

### Final automated result

Thirteen engine tests pass. `npm run build` and `npm run lint` both complete successfully after restoring dependencies from the lockfile. The mobile interaction pass confirms that an incomplete log blocks both routes and that route selection and rejection remain reversible.

## Pass 4 - September 4, 2026 LLM floor audit

### Gap found

Brightspace explicitly requires `LLM + structured data`. The prior deterministic simulation was labeled honestly but did not satisfy the real-LLM floor, matching the instructor's Week 2 concern.

### Fix

- Added a server-only Responses API endpoint using GPT-5 mini.
- The endpoint accepts only a closed schema of numbers, route states, period, and user choice; it rejects free text, unexpected labels, oversized bodies, and invalid values.
- The LLM only rewrites deterministic observations in plain Spanish. It cannot alter route status, cash calculations, or the selected route.
- The API key remains a hosted secret and never reaches the browser or repository.
- Requests set `store: false` and contain no name, location, documents, identifiers, or employer messages.
- A post-generation guard blocks language that scores, labels aptitude, verifies, approves, or recommends a route; the deterministic text remains as fallback.

### Final automated result

Sixteen tests pass, including closed-schema validation, personal-data exclusion, and prohibited-language detection. Lint and the production build pass with the server route classified as `/api/plain-language`.

### Live-provider result

The Sites secret is configured and the deployed route reaches the provider. The final live request returned `insufficient_quota`, and the client showed the safe deterministic fallback. This proves the failure path and secret isolation, but it is not presented as evidence of a successful LLM generation. Successful live-output evidence remains pending the professor's clarification or minimal provider credit.
