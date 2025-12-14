from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

def generate_plan_pdf(text, output_path):
    c = canvas.Canvas(output_path, pagesize=letter)
    width, height = letter

    y = height - 60
    lines = text.split("\n")

    for line in lines:
        if y < 60:
            c.showPage()
            y = height - 60

        c.drawString(50, y, line)
        y -= 20

    c.save()
