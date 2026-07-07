document.addEventListener("DOMContentLoaded", () => {

    const infoText = document.getElementById("infoText");

    if (!infoText || typeof zajimavosti === "undefined") return;

    let aktualni = 0;

    infoText.textContent = zajimavosti[aktualni];

    setInterval(() => {

        infoText.style.opacity = 0;

        setTimeout(() => {

            aktualni++;

            if (aktualni >= zajimavosti.length) {
                aktualni = 0;
            }

            infoText.textContent = zajimavosti[aktualni];

            infoText.style.opacity = 1;

        }, 300);

    }, 8000);

});