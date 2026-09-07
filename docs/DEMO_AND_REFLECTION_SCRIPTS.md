# PUENTE - Demo and reflection scripts

## What to submit for Business Bending

Brightspace asks for a 3 minute 30 second demo. The final 30 seconds must answer: **what changed my mind this week?** Use the demo script below as the required recording. The separate two-minute reflection is included only in case the course opens a different Future Bending activity.

## Script 1 - Live demo, 3:30 total

### 0:00-0:25 - The vacuum

**Say:**

"Luis is 20, lives in Ecatepec, left high school to help at home, and sells candy near a Mexibus route. A formal job may pay MXN 9,500 per month, but that number hides the dangerous part: transport and transition costs begin today while the first paycheck may arrive in 14 days. PUENTE answers whether Luis can cross that gap without leaving his household short."

**On screen:** Open the live URL and keep the browser address visible for two seconds. Show the PUENTE landing screen and the phrase `TU DINERO PRIMERO`. Do not change the prefilled invented scenario.

### 0:25-1:00 - Protect the base

**Say:**

"PUENTE starts with cash, not a personality or employability score. Luis records five to seven selling days: sales, restocking, transport, other costs, and hours. PUENTE calculates weekly net income and preserves both the 14-day household floor and the lowest net selling day as an emergency reserve."

**On screen:** Click `CALCULAR MI BASE` or scroll to `MI BASE`. Confirm `14 DIAS` is active. Show the seven-day log and point to `7/7` valid days, MXN 1,795 weekly net, 36 hours, MXN 205 reserve, and MXN 2,605 total protected. Do not edit the values.

### 1:00-1:50 - Compare without ranking

**Say:**

"The two simulated routes have equal visual weight and no best-route badge. Every card exposes its source, evidence date, responsible party, requirements, schedule, missing evidence, first-payment treatment, transition costs, opportunity cost, and margin above the floor plus reserve. The formal test route is verified and currently safe; the education route is provisional and counts zero unconfirmed support."

**On screen:** Scroll to `RUTAS`. Open `VER DESGLOSE DE COSTOS` on one card. Point to the evidence fields, transition costs, opportunity cost, and bridge margin. Click `EXPLORAR ESTA RUTA` once, then click the other route to show that the user can switch. Do not call either route the best one.

### 1:50-2:20 - One next action and a protected fallback

**Say:**

"After Luis chooses, PUENTE gives one sequence: validate the school schedule, confirm that the option is free, retain candy-selling hours, and review the route on day 14. If a schedule, vacancy, or payment changes, the fallback restores seven days of candy sales in less than 24 hours."

**On screen:** Scroll to `SIGUIENTE PASO`. Click `RECHAZAR AMBAS RUTAS`. Show that the alternative remains visible and point to `PLAN B - EN MENOS DE 24 H` and `Volver a venta de dulces por 7 días`.

### 2:20-3:00 - Explainability and the real LLM boundary

**Say:**

"The arithmetic is deterministic. When I press REESCRIBIR CON LLM, a real server-side Groq model receives only the calculated numbers and route states and returns a plain-Spanish explanation. It cannot verify evidence, score Luis, recommend a route, send a message, or change any status. The key remains secret and no personal fields are transmitted."

**On screen:** Scroll to the AI panel and click `REESCRIBIR CON LLM`. Wait for `LLM OUTPUT - GROQ - GPT-OSS-20B`. Point to the explanation, the line that says the LLM does not verify or score, and the `Borrar datos` control. If the panel shows the protected deterministic fallback instead of Groq, do not record that take; retry later when the real provider response appears.

### 3:00-3:30 - What changed my mind this week

**Say:**

"What changed my mind this week was testing the product as Luis instead of defending the first design. I found that a verified-looking route could still leave the household short before payday, so I changed the rule, added the emergency reserve, removed automatic selection, and kept the candy-selling fallback visible. I also learned that the explanation layer had to make a real LLM call while leaving the decision core deterministic. The final build passes 16 tests and keeps that boundary explicit."

**On screen:** Show the before and after persona screenshots, point to the corrected `NO DISPONIBLE` state and protected fallback, then end on the live URL.

## Recording checklist

- Use a 360-430 px mobile-width browser window.
- Keep the cursor slow and visible.
- Use only the invented Luis data.
- Show the live URL at the beginning and end.
- Do not expose environment variables, API keys, real names, or personal data.
- Record exactly 3:00 of walkthrough plus 0:30 of reflection.
- Export as `DEMO_Rodrigo_Pena_de_Leon.mp4`.

## Script 2 - Optional two-minute Future Bending reflection

Use this only if a separate Future Bending activity asks for an individual reflection. For the Business Bending Dropbox, the required reflection is the final 30 seconds above.

**0:00-0:20:** "I am Rodrigo Pena de Leon, Team 6, working from the User role. I focused on the unstable informal-work vacuum: a 20-year-old in Ecatepec who sells packaged candy and cannot safely move into formal work if the first paycheck arrives after the household's cash runs out."

**0:20-0:55:** "I initially considered a proof-of-skill product, but the Team 6 Blueprint made the immediate constraint clearer: the scarce resource is not only direction; it is the ability to cross a transition without losing today's income. That led me to Puente, a re-entry navigator that starts with cash, not a personality or employability score."

**0:55-1:25:** "The most important learning came from testing. An early version could show a route as verified even when the bridge before the first paycheck was negative. That was a safety failure, not a copy problem. I changed the deterministic rule, added the lowest-day reserve, removed automatic route selection, and preserved a seven-day fallback through candy sales."

**1:25-1:50:** "The calculations, validation, evidence states, and route decision remain deterministic. The required LLM interaction is a constrained server-side Groq call that receives only structured observations and rewrites them in plain Spanish. It cannot score, verify, recommend approval, or change the result."

**1:50-2:00:** "The next responsible step is to test the language and cash assumptions with real participants using consent, then validate route evidence with an actual institution. If Puente ever stores personal information, authentication, retention controls, and Row Level Security must come before expansion."
