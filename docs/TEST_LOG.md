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
