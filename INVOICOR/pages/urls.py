from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),                        # /, /fr/, /nl/ (because i18n_patterns)
    path("invoice/template1/", views.invoice_template1, name="invoice_template1"),
    path("invoice/pdf/", views.invoice_pdf, name="invoice_pdf"),
]