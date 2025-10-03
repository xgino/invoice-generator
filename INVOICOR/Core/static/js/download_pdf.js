document.getElementById("btn-download").addEventListener("click", function () {
    const element = document.querySelector("#invoice-canvas");

    const opt = {
        margin: 0,
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, ignoreElements: el => el.classList.contains("tooltip-guide") },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().set(opt).from(element).save();
});