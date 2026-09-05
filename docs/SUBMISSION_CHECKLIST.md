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

- **LLM live proof / professor clarification:** `OPENAI_API_KEY` is stored as a Sites secret and the constrained endpoint is deployed. The provider currently returns `insufficient_quota`, so the interface safely keeps the deterministic explanation instead of displaying a real generated rewrite. Capture one successful live rewrite if the professor confirms that a live LLM call is mandatory.
- **DEMO:** `DEMO_Rodrigo_Pena_de_Leon.mp4` does not exist yet.
- **BUILDCHAT:** `BUILDCHAT_Rodrigo_Pena_de_Leon.pdf` does not exist yet and must be exported from the authentic conversation.
- **Future Bending:** the separate reflection-video deliverable is not present in the Week 4 folder.

## Requires Rodrigo

- Record the narrated walkthrough and export it as `DEMO_Rodrigo_Pena_de_Leon.mp4`. The exact script is in `DEMO_SCRIPT.md`.
- Export this build conversation as `BUILDCHAT_Rodrigo_Pena_de_Leon.pdf`. It must remain the real conversation rather than a reconstructed transcript.
- Share the professor's answer about whether the Week 4 LLM must complete a live provider call. If yes, add minimal API credit and capture one successful bounded rewrite; if simulated behavior is explicitly accepted, retain the clearly labeled deterministic fallback.

## Final upload set

1. Live prototype URL.
2. GitHub repository URL.
3. `DEMO_Rodrigo_Pena_de_Leon.mp4`.
4. `PACKET_Rodrigo_Pena_de_Leon.pdf`.
5. `PERSONA_Rodrigo_Pena_de_Leon.pdf`.
6. `BUILDCHAT_Rodrigo_Pena_de_Leon.pdf`.

**Current verdict:** do not submit yet. The live site and GitHub repository are public, the hosted secret is configured, and the constrained LLM architecture is deployed. Remaining blockers are the professor-dependent live LLM proof and the required media/transcript files.
