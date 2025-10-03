document.addEventListener("DOMContentLoaded", () => {
    const colorPicker = document.getElementById("colorPicker");
    const logoUpload = document.getElementById("logoUpload");
    const logoPreview = document.getElementById("logoPreview");
    const themeSelect = document.getElementById("themeSelect");
    const resetBtn = document.getElementById("btn-reset");

    // Accent color live update
    colorPicker.addEventListener("input", (e) => {
        document.documentElement.style.setProperty("--accent-color", e.target.value);
    });

    // Logo Upload Preview
    logoUpload.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (evt) => {
                logoPreview.src = evt.target.result;
                logoPreview.style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    });

    // Theme Presets
    themeSelect.addEventListener("change", (e) => {
        document.body.className = ""; // reset
        document.body.classList.add("theme-" + e.target.value);
        // Update color to preset
        const computed = getComputedStyle(document.body).getPropertyValue("--accent-color").trim();
        colorPicker.value = computed;
    });

    // Reset button
    resetBtn.addEventListener("click", () => {
        document.body.className = "theme-classic";
        document.documentElement.style.setProperty("--accent-color", "#2563eb");
        colorPicker.value = "#2563eb";
        logoPreview.src = "";
        logoPreview.style.display = "none";
    });
});