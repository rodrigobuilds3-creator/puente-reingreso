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
