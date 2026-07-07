/* ==========================================
   AUTOMATICKÝ RESET CHECKBOXŮ VE 3:00
========================================== */

const now = new Date();

// "Technický den" začíná ve 3:00
const technicalDate = new Date(now);

if (technicalDate.getHours() < 1) {
    technicalDate.setDate(technicalDate.getDate() - 1);
}

const todayKey = technicalDate.toISOString().split("T")[0];
const savedDay = localStorage.getItem("technicalDay");

if (savedDay !== todayKey) {

    // smaže všechny uložené checkboxy
Object.keys(localStorage).forEach(key => {

    if (/-\d+$/.test(key)) {
        localStorage.removeItem(key);
    }

});

    localStorage.setItem("technicalDay", todayKey);
}

document.addEventListener("DOMContentLoaded", () => {

    const page = location.pathname
        .split("/")
        .pop()
        .replace(".html", "");

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkbox, index) => {

        const key = page + "-" + index;

        if (localStorage.getItem(key) === "true") {
            checkbox.checked = true;
        }

        checkbox.addEventListener("change", () => {
            localStorage.setItem(key, checkbox.checked);
        });

    });

});