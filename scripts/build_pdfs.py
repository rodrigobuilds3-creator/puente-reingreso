from __future__ import annotations

import html
import re
from pathlib import Path

from PIL import Image as PILImage
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    Image,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    Preformatted,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf"
OUTPUT.mkdir(parents=True, exist_ok=True)

BLACK = colors.HexColor("#080908")
GRAPHITE = colors.HexColor("#252724")
GRAY = colors.HexColor("#737570")
LIGHT = colors.HexColor("#E3E3DE")
IVORY = colors.HexColor("#F3F0E8")
YELLOW = colors.HexColor("#E6F100")


def normalize(text: str) -> str:
    replacements = {
        "\u2010": "-",
        "\u2011": "-",
        "\u2012": "-",
        "\u2013": "-",
        "\u2014": "-",
        "\u2212": "-",
        "✓": "OK",
        "×": "X",
        "→": "->",
        "↓": "down",
        "●": "[verified]",
        "○": "[pending]",
        "✦": "AI",
    }
    for source, target in replacements.items():
        text = text.replace(source, target)
    return text


def inline(text: str) -> str:
    text = normalize(text.strip())
    text = re.sub(r"!\[[^]]*\]\([^)]+\)", "", text)
    text = html.escape(text)
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"`([^`]+)`", r"<font name='Courier'>\1</font>", text)
    text = re.sub(r"\[(.+?)\]\((https?://[^)]+)\)", r"<a href='\2' color='#555555'>\1</a>", text)
    text = re.sub(r"(?<!['\">])(https?://[^\s<]+)", r"<a href='\1' color='#555555'>\1</a>", text)
    return text


def styles():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle("Title", parent=base["Title"], fontName="Helvetica-Bold", fontSize=25, leading=27, textColor=BLACK, spaceAfter=14, alignment=TA_LEFT),
        "h2": ParagraphStyle("H2", parent=base["Heading2"], fontName="Helvetica-Bold", fontSize=16, leading=19, textColor=BLACK, spaceBefore=16, spaceAfter=8, keepWithNext=True),
        "h3": ParagraphStyle("H3", parent=base["Heading3"], fontName="Helvetica-Bold", fontSize=11, leading=14, textColor=GRAPHITE, spaceBefore=11, spaceAfter=5, keepWithNext=True),
        "body": ParagraphStyle("Body", parent=base["BodyText"], fontName="Helvetica", fontSize=9.2, leading=13, textColor=GRAPHITE, spaceAfter=7),
        "small": ParagraphStyle("Small", parent=base["BodyText"], fontName="Helvetica", fontSize=7.2, leading=9.2, textColor=GRAPHITE),
        "bullet": ParagraphStyle("Bullet", parent=base["BodyText"], fontName="Helvetica", fontSize=8.8, leading=12, leftIndent=4, textColor=GRAPHITE),
        "code": ParagraphStyle("Code", parent=base["Code"], fontName="Courier", fontSize=5.8, leading=7.1, textColor=GRAPHITE, backColor=IVORY, borderPadding=7, spaceAfter=8),
        "caption": ParagraphStyle("Caption", parent=base["BodyText"], fontName="Helvetica-Oblique", fontSize=7.5, leading=9, textColor=GRAY, alignment=TA_CENTER, spaceAfter=9),
    }


STYLES = styles()


def draw_header_footer(canvas, doc):
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
    canvas.drawString(1.62 * inch, height - 0.26 * inch, "BY TRAJECTORY")
    canvas.setStrokeColor(LIGHT)
    canvas.line(0.6 * inch, 0.42 * inch, width - 0.6 * inch, 0.42 * inch)
    canvas.setFillColor(GRAY)
    canvas.setFont("Helvetica", 7)
    canvas.drawString(0.6 * inch, 0.23 * inch, "Team 6 | Business Bending Week 4 | September 2026")
    canvas.drawRightString(width - 0.6 * inch, 0.23 * inch, f"Page {doc.page}")
    canvas.restoreState()


def image_flowable(source: Path, rel_path: str, alt: str):
    image_path = (source.parent / rel_path).resolve()
    if not image_path.exists():
        return Paragraph(f"[Missing image: {html.escape(rel_path)}]", STYLES["small"])
    with PILImage.open(image_path) as picture:
        px_w, px_h = picture.size
    if px_h > px_w * 1.25:
        max_w, max_h = 2.45 * inch, 5.35 * inch
    else:
        max_w, max_h = 6.35 * inch, 4.45 * inch
    scale = min(max_w / px_w, max_h / px_h)
    rendered = Image(str(image_path), width=px_w * scale, height=px_h * scale)
    rendered.hAlign = "CENTER"
    return KeepTogether([Spacer(1, 5), rendered, Paragraph(inline(alt), STYLES["caption"])])


def markdown_table(rows: list[str]):
    parsed = [[cell.strip() for cell in row.strip().strip("|").split("|")] for row in rows]
    parsed = [row for idx, row in enumerate(parsed) if idx != 1 or not all(re.fullmatch(r":?-{3,}:?", cell) for cell in row)]
    if not parsed:
        return Spacer(1, 1)
    cols = max(len(row) for row in parsed)
    data = []
    for r_idx, row in enumerate(parsed):
        row += [""] * (cols - len(row))
        style = STYLES["small"] if r_idx else ParagraphStyle("TableHead", parent=STYLES["small"], fontName="Helvetica-Bold", textColor=colors.white)
        data.append([Paragraph(inline(cell), style) for cell in row])
    usable = 6.35 * inch
    table = Table(data, colWidths=[usable / cols] * cols, repeatRows=1, hAlign="LEFT")
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), BLACK),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("BACKGROUND", (0, 1), (-1, -1), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.35, LIGHT),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    return table


def parse_markdown(source: Path):
    lines = source.read_text(encoding="utf-8").splitlines()
    story = []
    paragraph_buffer: list[str] = []
    list_buffer: list[str] = []
    in_code = False
    code_buffer: list[str] = []
    table_buffer: list[str] = []

    def flush_paragraph():
        if paragraph_buffer:
            story.append(Paragraph(inline(" ".join(paragraph_buffer)), STYLES["body"]))
            paragraph_buffer.clear()

    def flush_list():
        if list_buffer:
            items = [ListItem(Paragraph(inline(item), STYLES["bullet"]), leftIndent=10) for item in list_buffer]
            story.append(ListFlowable(items, bulletType="bullet", start="circle", leftIndent=16, bulletFontName="Helvetica", bulletFontSize=6, spaceAfter=8))
            list_buffer.clear()

    def flush_table():
        if table_buffer:
            story.extend([markdown_table(table_buffer.copy()), Spacer(1, 8)])
            table_buffer.clear()

    for line in lines:
        stripped = line.strip()
        if stripped == "<!-- pagebreak -->":
            flush_paragraph(); flush_list(); flush_table()
            story.append(PageBreak())
            continue
        if stripped.startswith("```"):
            flush_paragraph(); flush_list(); flush_table()
            if in_code:
                story.append(Preformatted(normalize("\n".join(code_buffer)), STYLES["code"]))
                code_buffer.clear()
                in_code = False
            else:
                in_code = True
            continue
        if in_code:
            code_buffer.append(line)
            continue
        image_match = re.fullmatch(r"!\[([^]]*)\]\(([^)]+)\)", stripped)
        if image_match:
            flush_paragraph(); flush_list(); flush_table()
            story.append(image_flowable(source, image_match.group(2), image_match.group(1)))
            continue
        if stripped.startswith("|") and stripped.endswith("|"):
            flush_paragraph(); flush_list()
            table_buffer.append(stripped)
            continue
        flush_table()
        heading = re.match(r"^(#{1,3})\s+(.+)$", stripped)
        if heading:
            flush_paragraph(); flush_list()
            level = len(heading.group(1))
            if level == 1 and story:
                story.append(PageBreak())
            story.append(Paragraph(inline(heading.group(2)), STYLES["title" if level == 1 else "h2" if level == 2 else "h3"]))
            continue
        list_match = re.match(r"^(?:[-*]|\d+\.)\s+(.+)$", stripped)
        if list_match:
            flush_paragraph()
            list_buffer.append(list_match.group(1))
            continue
        if not stripped:
            flush_paragraph(); flush_list()
            continue
        paragraph_buffer.append(stripped)

    flush_paragraph(); flush_list(); flush_table()
    if code_buffer:
        story.append(Preformatted(normalize("\n".join(code_buffer)), STYLES["code"]))
    return story


def build(source_name: str, output_name: str, subject: str):
    source = ROOT / "docs" / source_name
    destination = OUTPUT / output_name
    doc = SimpleDocTemplate(
        str(destination),
        pagesize=LETTER,
        rightMargin=0.58 * inch,
        leftMargin=0.58 * inch,
        topMargin=0.62 * inch,
        bottomMargin=0.58 * inch,
        title=f"PUENTE - {subject}",
        author="Rodrigo Pena de Leon - Team 6",
        subject=subject,
    )
    doc.build(parse_markdown(source), onFirstPage=draw_header_footer, onLaterPages=draw_header_footer)
    return destination


if __name__ == "__main__":
    outputs = [
        build("PACKET.md", "PACKET_Rodrigo_Pena_de_Leon.pdf", "Product Packet"),
        build("PERSONA_LOG.md", "PERSONA_Rodrigo_Pena_de_Leon.pdf", "Synthetic Persona Test"),
    ]
    for output in outputs:
        print(output)
