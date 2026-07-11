/* ==========================================================
   AUTOMATICKÝ RESET CHECKBOXŮ PŘI ZMĚNĚ DATA
========================================================== */

const today = new Date().toISOString().split("T")[0];
const savedDate = localStorage.getItem("lastOpenDate");

if (savedDate !== today) {

    // smaže všechny uložené checkboxy
    Object.keys(localStorage).forEach(key => {

        if (/-\d+$/.test(key)) {
            localStorage.removeItem(key);
        }

    });

}

// uloží datum posledního otevření aplikace
localStorage.setItem("lastResetDate", today);


/* ==========================================================
   CHECKBOXY + POČÍTADLO
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const page = location.pathname
        .split("/")
        .pop()
        .replace(".html", "");

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    const progress = document.querySelector(".progress-number");

    const logo = document.querySelector(".progress-logo");


    /* ==========================================
       Aktualizace počítadla
    ========================================== */

    function updateProgress() {

        const total = checkboxes.length;

        const checked = document.querySelectorAll(
            'input[type="checkbox"]:checked'
        ).length;

        progress.textContent = `${checked} / ${total}`;

        const percent = checked / total;

        logo.style.opacity = 0.04 + (percent * 0.96);

    }


    checkboxes.forEach((checkbox, index) => {

        const key = page + "_" + index;

        // načtení uloženého stavu
        if (localStorage.getItem(key) === "true") {
            checkbox.checked = true;
        }

        // po změně checkboxu
        checkbox.addEventListener("change", () => {

            localStorage.setItem(key, checkbox.checked);

            updateProgress();

        });

    });


    // první načtení počítadla
    updateProgress();

});