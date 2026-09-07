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
H1 = ParagraphStyle("H1Custom", parent=styles["Heading1"], fontName="Helvetica-Bold", fontSize=18, leading=22, textColor=BLACK, spaceBefore=4, spaceAfter=9)
H2 = ParagraphStyle("H2Custom", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=12, leading=15, textColor=BLACK, spaceBefore=8, spaceAfter=5, keepWithNext=True)
BODY = ParagraphStyle("BodyCustom", parent=styles["BodyText"], fontName="Helvetica", fontSize=9.5, leading=13.2, textColor=GRAPHITE, spaceAfter=6)
SMALL = ParagraphStyle("SmallCustom", parent=styles["BodyText"], fontName="Helvetica", fontSize=7.8, leading=10, textColor=GRAY, spaceAfter=3)
SAY = ParagraphStyle("Say", parent=BODY, fontName="Helvetica-Oblique", fontSize=9.4, leading=13.2, textColor=BLACK)
SCREEN = ParagraphStyle("Screen", parent=BODY, fontSize=8.8, leading=12, textColor=GRAPHITE)
TIME = ParagraphStyle("Time", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=10, leading=12, textColor=BLACK, alignment=TA_CENTER)
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
         [P("<b>SAY</b><br/>" + say, SAY), P("<b>ON SCREEN</b><br/>" + screen, SCREEN)]],
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
        P("A scan-friendly recording guide for the Brightspace Business Bending submission.", SUBTITLE),
        HRFlowable(width="100%", thickness=2, color=YELLOW, spaceBefore=4, spaceAfter=13),
        P("<b>Required for this Dropbox:</b> one 3:30 demo. The final 0:30 must answer <i>what changed my mind this week?</i> The optional two-minute reflection appears at the end only if a separate Future Bending activity requests it.", BODY),
        P("<b>Live URL:</b> https://puente-reingreso-rodrigo.j6x567qt8g.chatgpt.site", BODY),
        P("<b>Recording rule:</b> read the SAY text, perform the ON SCREEN action, and use only invented Luis data. UI labels remain in Spanish.", BODY),
        Spacer(1, 0.1 * inch),
        P("Before recording", H1),
        P("Open the live URL in Chrome at a 360-430 px mobile-width window. Keep the browser address visible at the beginning. Leave the initial invented values unchanged. Scroll slowly; do not refresh during the recording.", BODY),
        P("Critical check before you start: the AI panel must show <b>LLM OUTPUT - GROQ - GPT-OSS-20B</b> after clicking the rewrite button. If it shows the deterministic fallback, do not use that take as proof of the real LLM requirement.", BODY),
        PageBreak(),
        P("Script 1 - Live demo", H1),
        P("Walkthrough: 3:00 + reflection: 0:30 = 3:30 total", SUBTITLE),
        block("0:00-0:25", "The vacuum", "Luis is 20, lives in Ecatepec, left high school to help at home, and sells candy near a Mexibus route. A formal job may pay MXN 9,500 per month, but that number hides the dangerous part: transport and transition costs begin today while the first paycheck may arrive in 14 days. PUENTE answers whether Luis can cross that gap without leaving his household short.", "Open the live URL and keep the browser address visible for two seconds. Show the PUENTE landing screen and the phrase <font name='Courier'>TU DINERO PRIMERO</font>. Do not change the prefilled invented scenario."),
        block("0:25-1:00", "Protect the base", "PUENTE starts with cash, not a personality or employability score. Luis records five to seven selling days: sales, restocking, transport, other costs, and hours. PUENTE calculates weekly net income and preserves both the 14-day household floor and the lowest net selling day as an emergency reserve.", "Click <font name='Courier'>CALCULAR MI BASE</font> or scroll to <font name='Courier'>MI BASE</font>. Confirm <font name='Courier'>14 DIAS</font> is active. Show the seven-day log and point to 7/7 valid days, MXN 1,795 weekly net, 36 hours, MXN 205 reserve, and MXN 2,605 total protected. Do not edit the values."),
        block("1:00-1:50", "Compare without ranking", "The two simulated routes have equal visual weight and no best-route badge. Every card exposes its source, evidence date, responsible party, requirements, schedule, missing evidence, first-payment treatment, transition costs, opportunity cost, and margin above the floor plus reserve. The formal test route is verified and currently safe; the education route is provisional and counts zero unconfirmed support.", "Scroll to <font name='Courier'>RUTAS</font>. Open <font name='Courier'>VER DESGLOSE DE COSTOS</font> on one card. Point to the evidence fields, transition costs, opportunity cost, and bridge margin. Click <font name='Courier'>EXPLORAR ESTA RUTA</font> once, then click the other route to show that the user can switch. Do not call either route the best one."),
        block("1:50-2:20", "One next action and a protected fallback", "After Luis chooses, PUENTE gives one sequence: validate the school schedule, confirm that the option is free, retain candy-selling hours, and review the route on day 14. If a schedule, vacancy, or payment changes, the fallback restores seven days of candy sales in less than 24 hours.", "Scroll to <font name='Courier'>SIGUIENTE PASO</font>. Click <font name='Courier'>RECHAZAR AMBAS RUTAS</font>. Show that the alternative remains visible and point to <font name='Courier'>PLAN B - EN MENOS DE 24 H</font> and <font name='Courier'>Volver a venta de dulces por 7 días</font>."),
        P("Script 1 - Live demo (continued)", H1),
        block("2:20-3:00", "Explainability and the real LLM boundary", "The arithmetic is deterministic. When I press REESCRIBIR CON LLM, a real server-side Groq model receives only the calculated numbers and route states and returns a plain-Spanish explanation. It cannot verify evidence, score Luis, recommend a route, send a message, or change any status. The key remains secret and no personal fields are transmitted.", "Scroll to the AI panel and click <font name='Courier'>REESCRIBIR CON LLM</font>. Wait for <font name='Courier'>LLM OUTPUT - GROQ - GPT-OSS-20B</font>. Point to the explanation, the line that says the LLM does not verify or score, and the <font name='Courier'>Borrar datos</font> control. If the panel shows the protected deterministic fallback instead of Groq, do not record that take; retry later when the real provider response appears."),
        block("3:00-3:30", "What changed my mind this week", "What changed my mind this week was testing the product as Luis instead of defending the first design. I found that a verified-looking route could still leave the household short before payday, so I changed the rule, added the emergency reserve, removed automatic selection, and kept the candy-selling fallback visible. I also learned that the explanation layer had to make a real LLM call while leaving the decision core deterministic. The final build passes 16 tests and keeps that boundary explicit.", "Show the before and after persona screenshots, point to the corrected <font name='Courier'>NO DISPONIBLE</font> state and protected fallback, then end on the live URL."),
        Spacer(1, 4),
        P("Recording checklist", H1),
        P("Use a 360-430 px mobile-width window; keep the cursor slow; use only invented data; show the URL at the beginning and end; never expose environment variables or keys; export the file as <font name='Courier'>DEMO_Rodrigo_Pena_de_Leon.mp4</font>.", BODY),
        PageBreak(),
        P("Script 2 - Optional two-minute Future Bending reflection", H1),
        P("For the Business Bending Dropbox, use the 30-second reflection inside Script 1. Use this longer version only if a separate Future Bending activity asks for an individual reflection.", SUBTITLE),
        block("0:00-0:20", "Context", "I am Rodrigo Pena de Leon, Team 6, working from the User role. I focused on the unstable informal-work vacuum: a 20-year-old in Ecatepec who sells packaged candy and cannot safely move into formal work if the first paycheck arrives after the household's cash runs out.", "Optional: show the PUENTE landing screen."),
        block("0:20-0:55", "What changed in my thinking", "I initially considered a proof-of-skill product, but the Team 6 Blueprint made the immediate constraint clearer: the scarce resource is not only direction; it is the ability to cross a transition without losing today's income. That led me to Puente, a re-entry navigator that starts with cash, not a personality or employability score.", "Show the Blueprint or the product promise only if the prompt asks for evidence."),
        block("0:55-1:25", "The failure and fix", "The most important learning came from testing. An early version could show a route as verified even when the bridge before the first paycheck was negative. That was a safety failure, not a copy problem. I changed the deterministic rule, added the lowest-day reserve, removed automatic route selection, and preserved a seven-day fallback through candy sales.", "Show the persona before/after evidence if allowed."),
        block("1:25-1:50", "The LLM boundary", "The calculations, validation, evidence states, and route decision remain deterministic. The required LLM interaction is a constrained server-side Groq call that receives only structured observations and rewrites them in plain Spanish. It cannot score, verify, recommend approval, or change the result.", "Show the LLM output label, never the API key."),
        block("1:50-2:00", "Next responsible step", "The next responsible step is to test the language and cash assumptions with real participants using consent, then validate route evidence with an actual institution. If Puente ever stores personal information, authentication, retention controls, and Row Level Security must come before expansion.", "End on the live URL or a plain closing frame."),
    ]
    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
    print(OUTPUT)


if __name__ == "__main__":
    build()
