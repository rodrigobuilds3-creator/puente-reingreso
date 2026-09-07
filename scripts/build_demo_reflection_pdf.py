from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "DEMO_AND_REFLECTION_SCRIPTS_Rodrigo_Pena_de_Leon.pdf"

BLACK = colors.HexColor("#080908")
GRAPHITE = colors.HexColor("#252724")
GRAY = colors.HexColor("#737570")
LIGHT = colors.HexColor("#E3E3DE")
IVORY = colors.HexColor("#F3F0E8")
YELLOW = colors.HexColor("#E6F100")

styles = getSampleStyleSheet()
TITLE = ParagraphStyle("TitleCustom", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=25, leading=28, textColor=BLACK, spaceAfter=8)
SUBTITLE = ParagraphStyle("Subtitle", parent=styles["Normal"], fontName="Helvetica", fontSize=11, leading=15, textColor=GRAPHITE, spaceAfter=8)
H1 = ParagraphStyle("H1Custom", parent=styles["Heading1"], fontName="Helvetica-Bold", fontSize=19, leading=23, textColor=BLACK, spaceBefore=4, spaceAfter=9)
H2 = ParagraphStyle("H2Custom", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=13, leading=16, textColor=BLACK, spaceBefore=8, spaceAfter=5, keepWithNext=True)
BODY = ParagraphStyle("BodyCustom", parent=styles["BodyText"], fontName="Helvetica", fontSize=10.5, leading=14.2, textColor=GRAPHITE, spaceAfter=6)
SMALL = ParagraphStyle("SmallCustom", parent=styles["BodyText"], fontName="Helvetica", fontSize=7.8, leading=10, textColor=GRAY, spaceAfter=3)
SAY = ParagraphStyle("Say", parent=BODY, fontName="Helvetica-Oblique", fontSize=10.5, leading=14.5, textColor=BLACK)
SCREEN = ParagraphStyle("Screen", parent=BODY, fontSize=10.2, leading=14, textColor=GRAPHITE)
TIME = ParagraphStyle("Time", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=10.5, leading=13, textColor=BLACK, alignment=TA_CENTER)
FOOT = ParagraphStyle("Foot", parent=styles["Normal"], fontName="Helvetica", fontSize=7, leading=9, textColor=GRAY)


def P(text, style=BODY):
    return Paragraph(text, style)


def header_footer(canvas, doc):
    canvas.saveState()
    width, height = LETTER
    canvas.setFillColor(BLACK)
    canvas.rect(0, height - 0.38 * inch, width, 0.38 * inch, fill=1, stroke=0)
    canvas.setFillColor(YELLOW)
    path = canvas.beginPath()
    path.moveTo(0.45 * inch, height - 0.14 * inch)
    path.lineTo(0.78 * inch, height - 0.14 * inch)
    path.lineTo(0.70 * inch, height - 0.24 * inch)
    path.lineTo(0.37 * inch, height - 0.24 * inch)
    path.close()
    canvas.drawPath(path, fill=1, stroke=0)
    path = canvas.beginPath()
    path.moveTo(0.58 * inch, height - 0.25 * inch)
    path.lineTo(0.91 * inch, height - 0.25 * inch)
    path.lineTo(0.83 * inch, height - 0.35 * inch)
    path.lineTo(0.50 * inch, height - 0.35 * inch)
    path.close()
    canvas.drawPath(path, fill=1, stroke=0)
    canvas.setFillColor(colors.white)
    canvas.setFont("Helvetica-Bold", 9)
    canvas.drawString(1.05 * inch, height - 0.26 * inch, "PUENTE")
    canvas.setFont("Helvetica", 5.5)
    canvas.setFillColor(LIGHT)
    canvas.drawString(1.62 * inch, height - 0.26 * inch, "WEEK 4 RECORDING SCRIPTS")
    canvas.setStrokeColor(LIGHT)
    canvas.line(0.6 * inch, 0.42 * inch, width - 0.6 * inch, 0.42 * inch)
    canvas.setFillColor(GRAY)
    canvas.setFont("Helvetica", 7)
    canvas.drawString(0.6 * inch, 0.23 * inch, "Team 6 | Rodrigo Pena de Leon")
    canvas.drawRightString(width - 0.6 * inch, 0.23 * inch, f"Page {doc.page}")
    canvas.restoreState()


def block(time, title, say, screen):
    content = Table(
        [[P(time, TIME), P(f"<b>{title}</b>", H2)],
         [P("<b>LEE</b><br/>" + say, SAY), P("<b>EN PANTALLA</b><br/>" + screen, SCREEN)]],
        colWidths=[3.35 * inch, 3.35 * inch],
        rowHeights=[None, None],
    )
    content.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, 1), YELLOW),
        ("BACKGROUND", (1, 0), (1, 0), IVORY),
        ("BACKGROUND", (1, 1), (1, 1), colors.white),
        ("BOX", (0, 0), (-1, -1), 0.7, BLACK),
        ("INNERGRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#B5B6B0")),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 9),
        ("RIGHTPADDING", (0, 0), (-1, -1), 9),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    return KeepTogether([content, Spacer(1, 8)])


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUTPUT), pagesize=LETTER, rightMargin=0.6 * inch, leftMargin=0.6 * inch,
        topMargin=0.62 * inch, bottomMargin=0.58 * inch,
        title="PUENTE - Demo and Reflection Scripts",
        author="Rodrigo Pena de Leon - Team 6",
    )
    story = [
        Spacer(1, 0.18 * inch),
        P("PUENTE", TITLE),
        P("Week 4 demo and reflection scripts", H1),
        P("Guía de lectura para grabar la entrega de Brightspace Business Bending.", SUBTITLE),
        HRFlowable(width="100%", thickness=2, color=YELLOW, spaceBefore=4, spaceAfter=13),
        P("<b>Entrega requerida:</b> una demo de 3:30. Los últimos 0:30 deben responder <i>what changed my mind this week?</i> La reflexión de dos minutos es opcional y aparece al final solo si otra actividad la solicita.", BODY),
        P("<b>Live URL:</b> https://puente-reingreso-rodrigo.j6x567qt8g.chatgpt.site", BODY),
        P("<b>Regla de grabación:</b> lee el texto de LEE, realiza la acción de EN PANTALLA y usa únicamente los datos inventados de Luis. Las etiquetas de la app están en español.", BODY),
        Spacer(1, 0.1 * inch),
        P("Before recording", H1),
        P("Abre la URL en vivo en Chrome con una ventana de 360-430 px de ancho. Deja visible la dirección al inicio, conserva los valores inventados y desplázate lentamente. No actualices durante la grabación.", BODY),
        P("<b>Revisión crítica:</b> después de pulsar el botón de reescritura, el panel debe mostrar <b>LLM OUTPUT - GROQ - GPT-OSS-20B</b>. Si aparece el fallback determinista, no uses esa toma como evidencia del LLM real.", BODY),
        PageBreak(),
        P("Script 1 - Live demo", H1),
        P("Walkthrough: 3:00 + reflection: 0:30 = 3:30 total", SUBTITLE),
        block("0:00-0:25", "The vacuum", "Luis is 20, lives in Ecatepec, and sells candy after leaving school to help at home. A formal job can pay MXN 9,500 monthly, but transport and transition costs start before the first paycheck. PUENTE checks whether he can cross that gap safely.", "Abre la URL en vivo. Muestra la dirección y la pantalla inicial durante dos segundos. Señala <font name='Courier'>TU DINERO PRIMERO</font>. No cambies los datos inventados."),
        block("0:25-1:00", "Protect the base", "PUENTE starts with cash, not a personality score. Luis records sales, restocking, transport, other costs, and hours for seven days. The app calculates net income, protects the 14-day household floor, and reserves his lowest net day.", "Pulsa <font name='Courier'>CALCULAR MI BASE</font> y confirma <font name='Courier'>14 DIAS</font>. Muestra 7/7 días válidos, MXN 1,795 netos, 36 horas, MXN 205 de reserva y MXN 2,605 protegidos. No edites los datos."),
        block("1:00-1:50", "Compare without ranking", "Both simulated routes have equal weight; neither is called best. Each card shows evidence, schedule, first payment, transition costs, opportunity cost, and bridge margin. The formal route is verified for this test; the education route stays provisional because support is unconfirmed.", "Ve a <font name='Courier'>RUTAS</font>. Abre <font name='Courier'>VER DESGLOSE DE COSTOS</font> y señala evidencia, costos y margen. Pulsa <font name='Courier'>EXPLORAR ESTA RUTA</font> y después cambia a la otra. No llames mejor a ninguna."),
        block("1:50-2:20", "One next action and a protected fallback", "After a choice, PUENTE gives one sequence: confirm the schedule, confirm the option is free, preserve selling hours, and review on day 14. If terms change, the fallback restores seven days of candy sales.", "Ve a <font name='Courier'>SIGUIENTE PASO</font>. Pulsa <font name='Courier'>RECHAZAR AMBAS RUTAS</font>. Muestra <font name='Courier'>PLAN B - EN MENOS DE 24 H</font> y <font name='Courier'>Volver a venta de dulces por 7 días</font>."),
        P("Script 1 - Live demo (continued)", H1),
        block("2:20-3:00", "Explainability and the real LLM boundary", "The arithmetic and decision are deterministic. REESCRIBIR CON LLM sends only structured numbers and route states to a real server-side Groq model for a plain-Spanish rewrite. It cannot verify, score, recommend, send, or change a status. The key stays server-side.", "Ve al panel de IA y pulsa <font name='Courier'>REESCRIBIR CON LLM</font>. Espera <font name='Courier'>LLM OUTPUT - GROQ - GPT-OSS-20B</font>. Señala la explicación, el aviso de límites y <font name='Courier'>Borrar datos</font>. Si aparece el fallback, repite la toma después."),
        block("3:00-3:30", "What changed my mind this week", "What changed my mind this week was testing as Luis. A verified-looking route could still leave the household short before payday, so I changed the rule, added the emergency reserve, removed automatic selection, and kept the fallback visible. I also learned the LLM must explain, not decide. The final build passes 16 tests.", "Muestra el antes y después de la prueba de persona. Señala <font name='Courier'>NO DISPONIBLE</font> y el fallback protegido. Termina mostrando la URL en vivo."),
        Spacer(1, 4),
        P("Recording checklist", H1),
        P("Usa una ventana de 360-430 px; mueve el cursor lentamente; usa solo datos inventados; muestra la URL al inicio y al final; nunca expongas variables de entorno ni claves; exporta como <font name='Courier'>DEMO_Rodrigo_Pena_de_Leon.mp4</font>.", BODY),
        PageBreak(),
        P("Script 2 - Optional two-minute Future Bending reflection", H1),
        P("Para Business Bending, usa la reflexión de 30 segundos dentro de Script 1. Usa esta versión solo si otra actividad de Future Bending pide una reflexión individual.", SUBTITLE),
        block("0:00-0:20", "Context", "I am Rodrigo Pena de Leon, Team 6, working from the User role. I focused on unstable informal work: a 20-year-old in Ecatepec who sells candy and cannot move safely into formal work if the first paycheck arrives after the household's cash runs out.", "Opcional: muestra la pantalla inicial de PUENTE."),
        block("0:20-0:55", "What changed in my thinking", "I first considered a proof-of-skill product, but the Blueprint clarified the immediate constraint: the scarce resource is the ability to cross a transition without losing today's income. That led to Puente, a re-entry navigator that starts with cash, not an employability score.", "Muestra el Blueprint o la promesa del producto solo si la consigna pide evidencia."),
        block("0:55-1:25", "The failure and fix", "Testing showed that a verified-looking route could still leave the household short before payday. That was a safety failure. I changed the rule, added the lowest-day reserve, removed automatic route selection, and preserved a seven-day fallback through candy sales.", "Muestra la evidencia de persona antes/después si está permitido."),
        block("1:25-1:50", "The LLM boundary", "The calculations, validation, evidence states, and route decision remain deterministic. The required LLM interaction is a constrained server-side Groq call that rewrites structured observations in plain Spanish. It cannot score, verify, recommend approval, or change the result.", "Muestra la etiqueta del resultado LLM; nunca la clave API."),
        block("1:50-2:00", "Next responsible step", "The next step is to test the language and cash assumptions with real participants using consent, then validate route evidence with an institution. If Puente stores personal information, authentication, retention controls, and Row Level Security come before expansion.", "Termina con la URL en vivo o una pantalla de cierre."),
    ]
    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
    print(OUTPUT)


if __name__ == "__main__":
    build()
