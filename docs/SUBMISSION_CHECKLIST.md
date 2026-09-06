# PUENTE - Week 4 submission checklist

## Internally validated

- Public live prototype: `https://puente-reingreso-rodrigo.j6x567qt8g.chatgpt.site`
- Public GitHub repository: `https://github.com/rodrigobuilds3-creator/puente-reingreso`
- `PACKET_Rodrigo_Pena_de_Leon.pdf`
- `PERSONA_Rodrigo_Pena_de_Leon.pdf`
- Persona before/after screenshots and confusion log
- Sixteen deterministic and LLM-boundary tests passing
- Lint, production build, and 360 px interaction pass
- Complete five-to-seven-day log, reserve, itemized costs, route evidence metadata, user controls, and protected fallback
- 3:30 demo narration and recording checklist

## Blocking before submission

- **LLM live proof:** complete. The professor confirmed that the interaction must be real. The deployed endpoint used Groq's free-compatible API with model `openai/gpt-oss-20b`; `GROQ_API_KEY` remains a Sites secret. A public POST returned `source: groq` with generated Spanish text. The deterministic fallback remains only for provider failure or prohibited output.
- **DEMO:** `DEMO_Rodrigo_Pena_de_Leon.mp4` does not exist yet.
- **BUILDCHAT:** `BUILDCHAT_Rodrigo_Pena_de_Leon.pdf` does not exist yet and must be exported from the authentic conversation.
- **Future Bending:** the separate reflection-video deliverable is not present in the Week 4 folder.

## Requires Rodrigo

- Record the narrated walkthrough and export it as `DEMO_Rodrigo_Pena_de_Leon.mp4`. The exact script is in `DEMO_SCRIPT.md`.
- Export this build conversation as `BUILDCHAT_Rodrigo_Pena_de_Leon.pdf`. It must remain the real conversation rather than a reconstructed transcript.
- Keep the Groq key private; the bounded rewrite has already been captured from the deployed endpoint.

## Final upload set

1. Live prototype URL.
2. GitHub repository URL.
3. `DEMO_Rodrigo_Pena_de_Leon.mp4`.
4. `PACKET_Rodrigo_Pena_de_Leon.pdf`.
5. `PERSONA_Rodrigo_Pena_de_Leon.pdf`.
6. `BUILDCHAT_Rodrigo_Pena_de_Leon.pdf`.

**Current verdict:** the Business Bending implementation is ready except for the demo MP4 and authentic Build Chat PDF. The live site, GitHub repository, constrained Groq architecture, secret isolation, and successful real LLM rewrite are complete.
