# Week 4 Future Bending — two-minute reflection

**Use:** individual reflection video. This script is aligned to the Week 4 requirement recorded in the working folder. Confirm the exact Brightspace wording after signing in before recording.

## 0:00–0:20 — Context

"I am Rodrigo Peña de León, Team 6, working from the User role. For Week 4 I focused on the unstable informal-work vacuum: a 20-year-old in Ecatepec who sells packaged candy and cannot safely move into formal work if the first paycheck arrives after the household's cash runs out."

## 0:20–0:55 — What changed in my thinking

"I initially considered a proof-of-skill product, but the team Blueprint made the immediate constraint clearer: the scarce resource is not only direction; it is the ability to cross a transition without losing today's income. That led me to Puente, a re-entry navigator that starts with cash, not a personality or employability score. The working promise is deliberately small: calculate a seven- or fourteen-day cash bridge, show two routes with equal visual weight, and give the user one reversible next step."

## 0:55–1:25 — The most important failure and fix

"The most important learning came from testing. An early version could show a route as verified even when the bridge before the first paycheck was negative. That was a safety failure, not a copy problem. I changed the deterministic rule so a negative bridge makes the route unavailable, disabled its selection, removed automatic route selection, added the lowest-day reserve, and retested with the same synthetic persona. The product now explains why a route is unavailable and preserves a seven-day fallback through candy sales."

## 1:25–1:50 — What AI does and does not do

"The calculations, validation, evidence states, and route decision remain deterministic. The required LLM interaction is a constrained server-side Groq call that receives only structured observations and rewrites them in plain Spanish. It cannot score, verify, recommend approval, or change the result. The skill assessments are simulated and labeled as simulations; the explanation call itself is real, and the API key is kept out of the browser and repository."

## 1:50–2:00 — Next step

"The next responsible step is not to add more features. It is to test the language and cash assumptions with real participants using consent, then validate route evidence with an actual institution. If Puente ever stores personal information, authentication, retention controls, and Row Level Security must come before expansion."

## Recording notes

- Keep the video close to two minutes and speak naturally; do not read the headings aloud.
- Show the live Puente URL only if the prompt asks for product evidence.
- Use the invented Luis scenario only; do not show API keys, private environment variables, or real personal data.
