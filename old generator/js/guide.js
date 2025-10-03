(function() {
    const guideSteps = [
        { selector: "#itemsBody", text: "All text on the page can be edited here." },
        { selector: "#logoUpload", text: "Click to add your logo." },
        { selector: "#table-add", text: "Add a new item: press 'Add Row'." },
        { selector: "#table-remove", text: "Remove last item: press 'Remove'." },
        { selector: "#themeSelect", text: "Change style and colors here." },
        { selector: "#currencySelect", text: "Change currency here." },
        { selector: "#formatSelect", text: "Change number format here." },
        { selector: "#taxInput", text: "Set tax percentage here." },
        { selector: "#taxMode", text: "Switch tax mode: included/excluded." },
        { selector: "#btn-download", text: "Export invoice to PDF to send to your client." }
    ];

    if (localStorage.getItem("invoiceGuideDone")) return; // skip if already done

    let step = 0;
    let tooltip = null;

    function createTooltip(el, text) {
        tooltip = document.createElement("div");
        tooltip.className = "tooltip-guide";
        tooltip.style.position = "absolute";
        tooltip.style.background = "#2563eb";
        tooltip.style.color = "#fff";
        tooltip.style.padding = "8px";
        tooltip.style.borderRadius = "4px";
        tooltip.style.fontSize = "0.85rem";
        tooltip.style.zIndex = 9999;
        tooltip.style.maxWidth = "220px";
        tooltip.innerHTML = `${text}<br>
            <button class="next-step" style="margin-top:4px;">Next</button>
            <button class="skip-guide" style="margin-top:4px;margin-left:4px;">Skip</button>`;

        document.body.appendChild(tooltip);

        const rect = el.getBoundingClientRect();
        tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
        tooltip.style.left = `${rect.left + window.scrollX}px`;

        tooltip.querySelector(".next-step").addEventListener("click", nextStep);
        tooltip.querySelector(".skip-guide").addEventListener("click", skipGuide);
    }

    function nextStep() {
        if (tooltip) tooltip.remove();
        step++;
        showStep();
    }

    function skipGuide() {
        if (tooltip) tooltip.remove();
        localStorage.setItem("invoiceGuideDone", "true");
    }

    function showStep() {
        if (step >= guideSteps.length) {
            localStorage.setItem("invoiceGuideDone", "true");
            return;
        }

        const { selector, text } = guideSteps[step];
        const el = document.querySelector(selector);
        if (!el) {
            step++;
            showStep();
            return;
        }

        createTooltip(el, text);
    }

    document.addEventListener("DOMContentLoaded", showStep);
})();