document.addEventListener("DOMContentLoaded", () => {
    const itemsBody = document.getElementById("itemsBody");
    const addBtn = document.getElementById("table-add");
    const removeBtn = document.getElementById("table-remove");
    const subtotalEl = document.getElementById("subtotal");
    const taxPctEl = document.getElementById("taxInput");   // input field
    const taxDisplay = document.getElementById("taxDisplay"); // summary span
    const taxRow = document.getElementById("taxRow");       // wrap tax row for hide/show
    const taxAmountEl = document.getElementById("taxAmount");
    const grandTotalEl = document.getElementById("grandTotal");
    const currencySelect = document.getElementById("currencySelect");
    const formatSelect = document.getElementById("formatSelect");
    const taxModeEl = document.getElementById("taxMode");

    function formatCurrency(amount) {
        const currency = currencySelect.value || "EUR";
        const locale = formatSelect.value || "en-US";

        let formatted = new Intl.NumberFormat(locale, {
            style: "currency",
            currency: currency,
            currencyDisplay: "symbol"
        }).format(amount);

        // Force symbol in front
        const symbol = new Intl.NumberFormat(locale, {
            style: "currency",
            currency: currency,
            currencyDisplay: "narrowSymbol"
        })
        .formatToParts(0)
        .find(p => p.type === "currency").value;

        // Remove symbol and re-add in front
        formatted = formatted.replace(symbol, "").trim();
        return symbol + " " + formatted;
    }

    function recalc() {
        let subtotal = 0;

        itemsBody.querySelectorAll("tr").forEach(row => {
            const qty = parseFloat(row.querySelector(".item-qty").value) || 0;
            const price = parseFloat(row.querySelector(".item-price").value) || 0;
            const total = qty * price;

            row.querySelector(".item-total").textContent = formatCurrency(total);
            subtotal += total;
        });

        const taxPct = parseFloat(taxPctEl.value) || 0;
        const mode = taxModeEl.value;
        let taxAmount = 0;
        let grandTotal = 0;

        if (mode === "exclude") {   // ✅ default: add tax on top
            taxAmount = subtotal * (taxPct / 100);
            grandTotal = subtotal + taxAmount;
        } else { // include ✅ extract tax from subtotal
            const net = subtotal / (1 + taxPct / 100);
            taxAmount = subtotal - net;
            grandTotal = subtotal;
            subtotal = net;
        }

        subtotalEl.textContent = formatCurrency(subtotal);
        taxAmountEl.textContent = formatCurrency(taxAmount);
        grandTotalEl.textContent = formatCurrency(grandTotal);

        // update tax percentage in summary
        taxDisplay.textContent = taxPct;

        // hide tax row if 0%
        if (taxPct <= 0) {
            taxRow.style.display = "none";
        } else {
            taxRow.style.display = "flex"; // or "block" depending on your layout
        }
    }

    function addRow() {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><input type="text" class="form-control-plaintext item-desc text-start" placeholder="---------"></td>
          <td><input type="number" class="form-control-plaintext item-qty text-end" value="1" min="0"></td>
          <td><input type="number" class="form-control-plaintext item-price text-end" value="20" step="0.01" min="0"></td>
          <td class="text-end item-total">${formatCurrency(0)}</td>
        `;

        row.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", recalc);
        });

        // Force 2 decimals on blur for price # New
        row.querySelector(".item-price").addEventListener("blur", e => {
            let val = parseFloat(e.target.value);
            if (!isNaN(val)) e.target.value = val.toFixed(2);
        });

        itemsBody.appendChild(row);
        recalc();
    }

    // Buttons
    addBtn.addEventListener("click", addRow);
    removeBtn.addEventListener("click", () => {
        if (itemsBody.lastChild) {
            itemsBody.removeChild(itemsBody.lastChild);
            recalc();
        }
    });

    // Currency change → refresh totals
    currencySelect.addEventListener("change", recalc);
    formatSelect.addEventListener("change", recalc);

    // Tax change → refresh totals
    taxPctEl.addEventListener("input", recalc);
    taxModeEl.addEventListener("change", recalc);

    // Init with one row
    addRow();
});