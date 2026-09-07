# PUENTE - Demo and reflection scripts

## Qué entregar en Business Bending

Brightspace pide una demo de 3 minutos 30 segundos. Los últimos 30 segundos deben responder: **what changed my mind this week?** Usa el guion de demo como grabación requerida. La reflexión de dos minutos solo sirve si el curso abre otra actividad de Future Bending.

## Script 1 - Live demo, 3:30 total

### 0:00-0:25 - The vacuum

**Say:**

"Luis is 20, lives in Ecatepec, and sells candy after leaving school to help at home. A formal job can pay MXN 9,500 monthly, but transport and transition costs start before the first paycheck. PUENTE checks whether he can cross that gap safely."

**En pantalla:** Abre la URL en vivo. Muestra la dirección y la pantalla inicial durante dos segundos. Señala `TU DINERO PRIMERO`. No cambies los datos inventados.

### 0:25-1:00 - Protect the base

**Say:**

"PUENTE starts with cash, not a personality score. Luis records sales, restocking, transport, other costs, and hours for seven days. The app calculates net income, protects the 14-day household floor, and reserves his lowest net day."

**En pantalla:** Pulsa `CALCULAR MI BASE` y confirma `14 DIAS`. Muestra 7/7 días válidos, MXN 1,795 netos, 36 horas, MXN 205 de reserva y MXN 2,605 protegidos. No edites los datos.

### 1:00-1:50 - Compare without ranking

**Say:**

"Both simulated routes have equal weight; neither is called best. Each card shows evidence, schedule, first payment, transition costs, opportunity cost, and bridge margin. The formal route is verified for this test; the education route stays provisional because support is unconfirmed."

**En pantalla:** Ve a `RUTAS`. Abre `VER DESGLOSE DE COSTOS` y señala evidencia, costos y margen. Pulsa `EXPLORAR ESTA RUTA` y después cambia a la otra. No llames mejor a ninguna.

### 1:50-2:20 - One next action and a protected fallback

**Say:**

"After a choice, PUENTE gives one sequence: confirm the schedule, confirm the option is free, preserve selling hours, and review on day 14. If terms change, the fallback restores seven days of candy sales."

**En pantalla:** Ve a `SIGUIENTE PASO`. Pulsa `RECHAZAR AMBAS RUTAS`. Muestra `PLAN B - EN MENOS DE 24 H` y `Volver a venta de dulces por 7 días`.

### 2:20-3:00 - Explainability and the real LLM boundary

**Say:**

"The arithmetic and decision are deterministic. REESCRIBIR CON LLM sends only structured numbers and route states to a real server-side Groq model for a plain-Spanish rewrite. It cannot verify, score, recommend, send, or change a status. The key stays server-side."

**En pantalla:** Ve al panel de IA y pulsa `REESCRIBIR CON LLM`. Espera `LLM OUTPUT - GROQ - GPT-OSS-20B`. Señala la explicación, el aviso de límites y `Borrar datos`. Si aparece el fallback, repite la toma después.

### 3:00-3:30 - What changed my mind this week

**Say:**

"What changed my mind this week was testing as Luis. A verified-looking route could still leave the household short before payday, so I changed the rule, added the emergency reserve, removed automatic selection, and kept the fallback visible. I also learned the LLM must explain, not decide. The final build passes 16 tests."

**En pantalla:** Muestra el antes y después de la prueba de persona. Señala `NO DISPONIBLE` y el fallback protegido. Termina mostrando la URL en vivo.

## Lista de grabación

- Usa una ventana de 360-430 px.
- Mueve el cursor lentamente.
- Usa solo los datos inventados de Luis.
- Muestra la URL en vivo al inicio y al final.
- No expongas variables de entorno, claves API, nombres reales ni datos personales.
- Graba 3:00 de recorrido y 0:30 de reflexión.
- Exporta como `DEMO_Rodrigo_Pena_de_Leon.mp4`.

## Script 2 - Optional two-minute Future Bending reflection

Úsalo solo si otra actividad de Future Bending pide una reflexión individual. Para Business Bending, la reflexión requerida son los últimos 30 segundos de arriba.

**0:00-0:20:** "I am Rodrigo Pena de Leon, Team 6, working from the User role. I focused on unstable informal work: a 20-year-old in Ecatepec who sells candy and cannot move safely into formal work if the first paycheck arrives after the household's cash runs out."

**0:20-0:55:** "I first considered a proof-of-skill product, but the Blueprint clarified the immediate constraint: the scarce resource is the ability to cross a transition without losing today's income. That led to Puente, a re-entry navigator that starts with cash, not an employability score."

**0:55-1:25:** "Testing showed that a verified-looking route could still leave the household short before payday. That was a safety failure. I changed the rule, added the lowest-day reserve, removed automatic route selection, and preserved a seven-day fallback through candy sales."

**1:25-1:50:** "The calculations, validation, evidence states, and route decision remain deterministic. The required LLM interaction is a constrained server-side Groq call that rewrites structured observations in plain Spanish. It cannot score, verify, recommend approval, or change the result."

**1:50-2:00:** "The next step is to test the language and cash assumptions with real participants using consent, then validate route evidence with an institution. If Puente stores personal information, authentication, retention controls, and Row Level Security come before expansion."
