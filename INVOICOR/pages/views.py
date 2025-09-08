from django.utils import translation
from django.shortcuts import render

CURRENCY_MAP = {
    'en': 'USD',
    'fr': 'EUR',
    'de': 'EUR',
    'nl': 'EUR',
    'es': 'EUR',
    'it': 'EUR',
    'pt': 'EUR',
    'jp': 'JPY',
    'zh': 'CNY',
}

def home(request):
    lang = translation.get_language()
    currency = CURRENCY_MAP.get(lang, 'USD')
    return render(request, "home.html", {"currency": currency})

def invoice(request, invoice_slug):
    lang = translation.get_language()
    currency = CURRENCY_MAP.get(lang, 'USD')
    return render(request, "invoice.html", {"currency": currency, "invoice_slug": invoice_slug})