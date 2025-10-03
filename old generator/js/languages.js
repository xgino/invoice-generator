const translations = {
    en: { 
        invoice: "INVOICE", 
        invoicenum: "Invoice Number",
        dateinvoice: "Date of Invoice",
        duedate: "Due Date",
        purachaseorder: "Purchase Order #",
        description: "Description", 
        qty: "Qty", 
        unit: "Unit Price", 
        total: "Total",
        tableAdd: "Add Row",
        TabelRemove: "Remove Last",
        ResetBtn: "Reset",
        AccentBtn: "Accent",
        LogoBtn: "Logo",
        CurrencyBtn: "Currency",
        LanguageBtn: "Language",
        ThemeBtn: "Theme",
        FormatBtn: "Format",
        ExcludeBtn: "Excl.",
        IncludeBtn: "Incl.",
        TaxBtn: "Tax",
        DownloadBtn: "Download",

        language_subtotal: "Subtotal",
        language_tax: "Tax",
        language_total: "Total",
        terms_notes: "Terms & Notes",
        terms_notes_text: "We kindly request payment within <strong>14 days</strong> to the bank details above, including the <strong>invoice number</strong> as reference.",
    },
    nl: { 
        invoice: "FACTUUR", 
        invoicenum: "Factuurnummer",
        dateinvoice: "Factuurdatum",
        duedate: "Vervaldatum",
        purachaseorder: "Inkooporder #",
        description: "Omschrijving", 
        qty: "Aantal", 
        unit: "Stukprijs", 
        total: "Totaal",
        tableAdd: "+ Rij toevoegen",
        TabelRemove: "− Laatste verwijderen",
        ResetBtn: "Resetten",
        AccentBtn: "Accent",
        LogoBtn: "Logo",
        CurrencyBtn: "Valuta",
        LanguageBtn: "Taal",
        ThemeBtn: "Thema",
        FormatBtn: "Formaat",
        ExcludeBtn: "Excl.",
        IncludeBtn: "Incl.",
        TaxBtn: "Btw",
        DownloadBtn: "Downloaden",

        language_subtotal: "Subtotaal",
        language_tax: "Btw",
        language_total: "Totaal",
        terms_notes: "Voorwaarden & Notities",
        terms_notes_text: "Wij verzoeken u vriendelijk om binnen <strong>14 dagen</strong> te betalen naar de bovenstaande bankgegevens, met vermelding van het <strong>factuurnummer</strong> als referentie.",
    },
    de: { 
        invoice: "RECHNUNG", 
        invoicenum: "Rechnungsnummer",
        dateinvoice: "Rechnungsdatum",
        duedate: "Fälligkeitsdatum",
        purachaseorder: "Bestellnummer #",
        description: "Beschreibung", 
        qty: "Menge", 
        unit: "Stückpreis", 
        total: "Gesamt",
        tableAdd: "+ Zeile hinzufügen",
        TabelRemove: "− Letzte entfernen",
        ResetBtn: "Zurücksetzen",
        AccentBtn: "Akzent",
        LogoBtn: "Logo",
        CurrencyBtn: "Währung",
        LanguageBtn: "Sprache",
        ThemeBtn: "Thema",
        FormatBtn: "Format",
        ExcludeBtn: "Exkl.",
        IncludeBtn: "Inkl.",
        TaxBtn: "MwSt",
        DownloadBtn: "Herunterladen",

        language_subtotal: "Zwischensumme",
        language_tax: "MwSt",
        language_total: "Gesamt",
        terms_notes: "Bedingungen & Hinweise",
        terms_notes_text: "Wir bitten Sie, die Zahlung innerhalb von <strong>14 Tagen</strong> auf die oben angegebenen Bankdaten vorzunehmen und die <strong>Rechnungsnummer</strong> als Referenz anzugeben.",
    },
    fr: { 
        invoice: "FACTURE", 
        invoicenum: "Numéro de Facture",
        dateinvoice: "Date de Facture",
        duedate: "Date d'Échéance",
        purachaseorder: "Bon de Commande #",
        description: "Description", 
        qty: "Qté", 
        unit: "Prix Unitaire", 
        total: "Total",
        tableAdd: "+ Ajouter une ligne",
        TabelRemove: "− Supprimer la dernière",
        ResetBtn: "Réinitialiser",
        AccentBtn: "Accent",
        LogoBtn: "Logo",
        CurrencyBtn: "Devise",
        LanguageBtn: "Langue",
        ThemeBtn: "Thème",
        FormatBtn: "Format",
        ExcludeBtn: "Excl.",
        IncludeBtn: "Incl.",
        TaxBtn: "TVA",
        DownloadBtn: "Télécharger",

        language_subtotal: "Sous-total",
        language_tax: "TVA",
        language_total: "Total",
        terms_notes: "Conditions & Remarques",
        terms_notes_text: "Nous vous prions de bien vouloir effectuer le paiement dans un délai de <strong>14 jours</strong> sur les coordonnées bancaires ci-dessus, en indiquant le <strong>numéro de facture</strong> comme référence.",
    },
};

document.addEventListener("DOMContentLoaded", () => {
    const langSelect = document.getElementById("langSelect");
    const invoiceTitle = document.getElementById("language_invoiceTitle");

    const thinvoicenum = document.getElementById("language_invoice-num");
    const thdateinvoice = document.getElementById("language_date-invoice");
    const thduedate = document.getElementById("language_due-date");
    const thpurachaseorder = document.getElementById("language_purchase-order");
    const thDesc = document.getElementById("language_th-description");
    const thQty = document.getElementById("language_th-qty");
    const thUnit = document.getElementById("language_th-unit");
    const thTotal = document.getElementById("language_th-total");
    
    const thtableAdd = document.getElementById("table-add");
    const thTabelRemove = document.getElementById("table-remove");
    const ResetBtn = document.getElementById("reset-btn");
    const AccentBtn = document.getElementById("accent-btn");
    const LogoBtn = document.getElementById("logo-btn");
    const CurrencyBtn = document.getElementById("currency-btn");
    const LanguageBtn = document.getElementById("language-btn");
    const ThemeBtn = document.getElementById("theme-btn");
    const FormatBtn = document.getElementById("format-btn");
    const ExcludeBtn = document.getElementById("exclude-btn");
    const IncludeBtn = document.getElementById("include-btn");
    const TaxBtn = document.getElementById("tax-btn");
    const DownloadBtn = document.getElementById("btn-download");

    const language_subtotal = document.getElementById("language_subtotal");
    const language_tax = document.getElementById("language_tax");
    const language_total = document.getElementById("language_total");
    
    const language_terms_notes = document.getElementById("language_terms_notes");
    const language_terms_notes_text = document.getElementById("language_terms_notes_text");

    function applyTranslations(lang) {
        const t = translations[lang] || translations.en;
        invoiceTitle.textContent = t.invoice;
        thinvoicenum.textContent = t.invoicenum;
        thdateinvoice.textContent = t.dateinvoice;
        thduedate.textContent = t.duedate;
        thpurachaseorder.textContent = t.purachaseorder;
        thDesc.textContent = t.description;
        thQty.textContent = t.qty;
        thUnit.textContent = t.unit;
        thTotal.textContent = t.total;
        
        thtableAdd.textContent = t.tableAdd;
        thTabelRemove.textContent = t.TabelRemove;
        ResetBtn.textContent = t.ResetBtn;
        AccentBtn.textContent = t.AccentBtn;
        LogoBtn.textContent = t.LogoBtn;
        CurrencyBtn.textContent = t.CurrencyBtn;
        LanguageBtn.textContent = t.LanguageBtn;
        ThemeBtn.textContent = t.ThemeBtn;
        FormatBtn.textContent = t.FormatBtn;
        ExcludeBtn.textContent = t.ExcludeBtn;
        IncludeBtn.textContent = t.IncludeBtn;
        TaxBtn.textContent = t.TaxBtn;
        DownloadBtn.textContent = t.DownloadBtn;


        language_subtotal.textContent = t.language_subtotal;
        language_tax.textContent = t.language_tax;
        language_total.textContent = t.language_total;
        
        language_terms_notes.textContent = t.terms_notes;
        language_terms_notes_text.innerHTML = t.terms_notes_text;
    }

    langSelect.addEventListener("change", e => {
        applyTranslations(e.target.value);
    });

    // init
    applyTranslations(langSelect.value);
});