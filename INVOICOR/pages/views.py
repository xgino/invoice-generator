from django.utils import translation
import io, json
from django.http import FileResponse, JsonResponse
from django.shortcuts import render
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas


def home(request):
    lang = translation.get_language()
    return render(request, "home.html")

def invoice_template1(request):
    """Render invoice template 1 (frontend editing)."""
    return render(request, "invoices/invoicetemplate1.html")

def invoice_pdf(request):
    """Generate PDF from posted JSON invoice data."""
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))

        # Create PDF in memory
        buffer = io.BytesIO()
        p = canvas.Canvas(buffer, pagesize=A4)
        width, height = A4

        # Example content
        p.setFont("Helvetica-Bold", 16)
        p.drawString(50, height - 50, f"Invoice - {data.get('company', '')}")

        p.setFont("Helvetica", 12)
        p.drawString(50, height - 100, f"Subtotal: {data.get('subtotal', '')}")
        p.drawString(50, height - 120, f"Tax: {data.get('tax', '')}")
        p.drawString(50, height - 140, f"Total: {data.get('total', '')} {data.get('currency', '')}")

        p.showPage()
        p.save()

        buffer.seek(0)
        return FileResponse(buffer, as_attachment=True, filename="invoice.pdf")

    return JsonResponse({"error": "Invalid request"}, status=400)