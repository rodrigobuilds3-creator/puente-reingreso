# PUENTE

PUENTE is Team 6's Week 4 Business Bending prototype: a mobile-first re-entry navigator for a 20-year-old informal candy seller in Ecatepec who needs to protect household cash while considering formal work.

Live prototype: https://puente-reingreso-rodrigo.j6x567qt8g.chatgpt.site

The prototype accepts a five-to-seven-day informal-sales record, calculates daily and weekly net cash, protects a 14-day household floor plus the lowest positive selling-day reserve, itemizes transition and opportunity costs, and presents two equal-weight routes without scoring. Unconfirmed future income counts as MXN 0 and candy sales remain a temporary bridge to the first paycheck.

## Local validation

```bash
npm install
npm test
npm run build
npm run dev
```

The final audit passes 16 deterministic and LLM-boundary tests, lint, production build, and a 360 px interaction pass.

All data is invented and nothing is persisted. A server-side Groq endpoint using `openai/gpt-oss-20b` receives only closed numeric observations and route states, then rewrites them in plain Spanish. Deterministic rules alone control cash safety and route status; the LLM cannot score, verify, rank, infer eligibility, or recommend a route.

Deployment note: the hosted environment must contain `GROQ_API_KEY` as a secret. OpenAI remains a compatibility fallback, but its previous key exhausted its quota.
