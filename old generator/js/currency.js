document.addEventListener("DOMContentLoaded", () => {
    const currencySelect = document.getElementById("currencySelect");

    currencySelect.addEventListener("change", () => {
        const selectedCurrency = currencySelect.value;
        console.log("Currency switched to:", selectedCurrency);

        // Example: format sample numbers
        document.querySelectorAll(".price").forEach((el) => {
            const amount = parseFloat(el.dataset.amount || 0);
            el.textContent = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: selectedCurrency,
            }).format(amount);
        });
    });
});