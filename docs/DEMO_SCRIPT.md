# PUENTE - 3:30 demo script

## 0:00-0:25 - The vacuum

"Luis is 20, lives in Ecatepec, left high school to help at home, and sells candy near a Mexibus route. A formal job may pay MXN 9,500 per month, but that number hides the dangerous part: transport and transition costs begin today while the first paycheck may arrive in 14 days. PUENTE answers whether Luis can cross that gap without leaving his household short."

**On screen:** Show the PUENTE landing screen and the phrase `TU DINERO PRIMERO`.

## 0:25-1:00 - Protect the base

"PUENTE starts with cash, not a personality or employability score. Luis records five to seven selling days: sales, restocking, transport, other costs, and hours. PUENTE calculates weekly net income and preserves both the 14-day household floor and the lowest net selling day as an emergency reserve."

**On screen:** Show the prefilled invented seven-day log. Point to daily net, MXN 1,795 weekly net, 36 hours, the MXN 205 reserve, and the MXN 2,605 protected total.

## 1:00-1:50 - Compare without ranking

"The two simulated routes have equal visual weight and no best-route badge. Every card exposes its source, evidence date, responsible party, requirements, schedule, missing evidence, first-payment treatment, transition costs, opportunity cost, and margin above the floor plus reserve. The formal test route is verified and currently safe; the education route is provisional and counts zero unconfirmed support."

**On screen:** Open one cost breakdown, compare both cards, select a route, switch routes, and use `RECHAZAR AMBAS RUTAS` to prove reversibility.

## 1:50-2:20 - One next action and a protected fallback

"After Luis chooses, PUENTE gives one sequence: validate the school schedule, confirm that the option is free, retain candy-selling hours, and review the route on day 14. If a schedule, vacancy, or payment changes, the fallback restores seven days of candy sales in less than 24 hours."

**On screen:** Show `SIGUIENTE PASO` and the fallback panel.

## 2:20-3:00 - Explainability and LLM boundary

"The arithmetic is deterministic. When I press REESCRIBIR CON LLM, a real server-side Groq model receives only the calculated numbers and route states and returns a plain-Spanish explanation. It cannot verify evidence, score Luis, recommend a route, send a message, or change any status. The key remains secret and no personal fields are transmitted."

**On screen:** Press `REESCRIBIR CON LLM`, wait for `LLM OUTPUT · GROQ · GPT-OSS-20B`, then point to `Sin score` and `Borrar datos`. The successful live call was verified on September 6, 2026.

## 3:00-3:30 - What changed my mind this week

"What changed my mind this week was testing the product as Luis instead of defending the first design. I found that a verified-looking route could still leave the household short before payday, so I changed the rule, added the emergency reserve, removed automatic selection, and kept the candy-selling fallback visible. I also learned that the explanation layer had to make a real LLM call while leaving the decision core deterministic. The final build passes 16 tests and keeps that boundary explicit."

**On screen:** Show the before/after persona screenshots, point to the corrected `NO DISPONIBLE` state and protected fallback, then end on the live URL.

## Recording checklist

- Record at 360-430 px mobile width or use a phone-sized browser window.
- Keep the cursor slow and visible; do not rush the arithmetic.
- Use invented data only.
- Show the live URL at the beginning and end.
- Target exactly 3:00 of walkthrough plus 0:30 of reflection: 3:30 total.
- Export as `DEMO_Rodrigo_Pena_de_Leon.mp4`.
