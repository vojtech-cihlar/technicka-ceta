/* ==========================================================
   RESET CHECKBOXŮ PŘI ZMĚNĚ TECHNICKÉHO DNE (3:00)
========================================================== */

function getTechnicalDay() {

    const now = new Date();

    // před třetí hodinou stále patří předchozímu dni
    if (now.getHours() < 3) {
        now.setDate(now.getDate() - 1);
    }

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

const currentDay = getTechnicalDay();
const savedDay = localStorage.getItem("technicalDay");

if (savedDay && savedDay !== currentDay) {

    // smaže pouze checkboxy
    Object.keys(localStorage).forEach(key => {

        if (/^[a-z]+_\d+$/.test(key)) {
            localStorage.removeItem(key);
        }

    });

}

localStorage.setItem("technicalDay", currentDay);


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