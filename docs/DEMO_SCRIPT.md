# PUENTE - 3:30 demo script

## 0:00-0:25 - The vacuum

"Luis is 20, lives in Ecatepec, left high school to help at home, and sells candy near a Mexibus route. A formal job may pay MXN 9,500 per month, but that number hides the dangerous part: transport and transition costs begin today while the first paycheck may arrive in 14 days. PUENTE answers whether Luis can cross that gap without leaving his household short."

**On screen:** Show the PUENTE landing screen and the phrase `TU DINERO PRIMERO`.

## 0:25-1:05 - Protect the base

"PUENTE starts with cash, not a personality or employability score. Luis enters what he has today, the minimum his household needs each week, his net candy income, his selling hours, and the formal salary offered. He can compare seven days or the full 14-day pay cycle."

**On screen:** Scroll to `MI BASE REAL`. Enter MXN 1,800 cash, MXN 1,200 weekly floor, MXN 1,500 candy income, 42 hours, and MXN 9,500 salary. Point to the MXN 600 gap.

## 1:05-2:05 - Compare without ranking

"The two routes have equal visual weight and no best-route badge. The formal job is evidence-verified, but with these numbers its bridge before payday is negative MXN 893. Evidence alone is not enough, so PUENTE marks the route unavailable and blocks selection. The education-plus-part-time route is provisional because its schedule still needs confirmation, but it preserves 18 selling hours and keeps a positive MXN 36 bridge."

**On screen:** Show both cards. Point to transition cost, opportunity cost, pre-paycheck bridge, and the disabled action on Route 1. Select Route 2.

## 2:05-2:45 - One next action and a protected fallback

"After Luis chooses, PUENTE gives one sequence: validate the school schedule, confirm that the option is free, retain candy-selling hours, and review the route on day 14. If a schedule, vacancy, or payment changes, the fallback restores seven days of candy sales in less than 24 hours."

**On screen:** Show `SIGUIENTE PASO` and the fallback panel.

## 2:45-3:10 - Explainability and AI boundary

"The arithmetic is deterministic. Simulated AI only explains information in plain Spanish; it cannot verify evidence, score Luis, or change a route status. Inputs stay in the session and can be erased."

**On screen:** Point to `IA SIMULADA`, `Sin score`, and `Borrar datos`.

## 3:10-3:30 - Test, fix, outcome

"The persona test exposed a critical contradiction: an earlier version showed a verified route even when the bridge was negative. We changed the decision rule, added a regression test, removed automatic route selection, and redeployed. PUENTE now protects the decision before presenting the opportunity."

**On screen:** Show the before and after screenshots from the persona log, then end on the live URL.

## Recording checklist

- Record at 360-430 px mobile width or use a phone-sized browser window.
- Keep the cursor slow and visible; do not rush the arithmetic.
- Use invented data only.
- Show the live URL at the beginning and end.
- Target 3:15-3:45 total duration.
- Export as `DEMO_Rodrigo_Pena_de_Leon.mp4`.
