# PUENTE - 3:30 demo script

## 0:00-0:25 - The vacuum

"Luis is 20, lives in Ecatepec, left high school to help at home, and sells candy near a Mexibus route. A formal job may pay MXN 9,500 per month, but that number hides the dangerous part: transport and transition costs begin today while the first paycheck may arrive in 14 days. PUENTE answers whether Luis can cross that gap without leaving his household short."

**On screen:** Show the PUENTE landing screen and the phrase `TU DINERO PRIMERO`.

## 0:25-1:05 - Protect the base

"PUENTE starts with cash, not a personality or employability score. Luis records five to seven selling days: sales, restocking, transport, other costs, and hours. PUENTE calculates weekly net income and preserves both the 14-day household floor and the lowest net selling day as an emergency reserve."

**On screen:** Show the prefilled invented seven-day log. Point to daily net, MXN 1,795 weekly net, 36 hours, the MXN 205 reserve, and the MXN 2,605 protected total.

## 1:05-2:05 - Compare without ranking

"The two simulated routes have equal visual weight and no best-route badge. Every card exposes its source, evidence date, responsible party, requirements, schedule, missing evidence, first-payment treatment, transition costs, opportunity cost, and margin above the floor plus reserve. The formal test route is verified and currently safe; the education route is provisional and counts zero unconfirmed support."

**On screen:** Open one cost breakdown, compare both cards, select a route, switch routes, and use `RECHAZAR AMBAS RUTAS` to prove reversibility.

## 2:05-2:45 - One next action and a protected fallback

"After Luis chooses, PUENTE gives one sequence: validate the school schedule, confirm that the option is free, retain candy-selling hours, and review the route on day 14. If a schedule, vacancy, or payment changes, the fallback restores seven days of candy sales in less than 24 hours."

**On screen:** Show `SIGUIENTE PASO` and the fallback panel.

## 2:45-3:10 - Explainability and LLM boundary

"The arithmetic is deterministic. When I press REESCRIBIR CON LLM, a real server-side Groq model receives only the calculated numbers and route states and returns a plain-Spanish explanation. It cannot verify evidence, score Luis, recommend a route, send a message, or change any status. The key remains secret and no personal fields are transmitted."

**On screen:** Press `REESCRIBIR CON LLM`, wait for `LLM OUTPUT · GROQ · GPT-OSS-20B`, then point to `Sin score` and `Borrar datos`. The successful live call was verified on September 6, 2026.

## 3:10-3:30 - Test, fix, outcome

"Testing produced four real fixes. Retained selling hours could exceed reported hours; a verified route could remain selectable with a negative bridge; the specification audit exposed a missing reserve and evidence fields; and the final rubric audit caught that a simulation did not satisfy the LLM requirement. The build now passes 16 tests and keeps the LLM outside the decision core."

**On screen:** Show the before and after screenshots from the persona log, then end on the live URL.

## Recording checklist

- Record at 360-430 px mobile width or use a phone-sized browser window.
- Keep the cursor slow and visible; do not rush the arithmetic.
- Use invented data only.
- Show the live URL at the beginning and end.
- Target 3:15-3:45 total duration.
- Export as `DEMO_Rodrigo_Pena_de_Leon.mp4`.
