document.addEventListener("DOMContentLoaded", () => {

    const infoText = document.getElementById("infoText");

    if (!infoText || typeof zajimavosti === "undefined") return;

    // Zamíchání pole (Fisher-Yates)
    function zamichejPole(pole) {

        const novePole = [...pole];

        for (let i = novePole.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));

            [novePole[i], novePole[j]] = [novePole[j], novePole[i]];
        }

        return novePole;
    }

    let seznam = zamichejPole(zajimavosti);
    let aktualni = 0;

    infoText.textContent = seznam[aktualni];

    setInterval(() => {

        infoText.style.opacity = 0;

        setTimeout(() => {

            aktualni++;

            // Pokud jsme zobrazili všechny, znovu zamícháme
            if (aktualni >= seznam.length) {

                seznam = zamichejPole(zajimavosti);
                aktualni = 0;

            }

            infoText.textContent = seznam[aktualni];

            infoText.style.opacity = 1;

        }, 300);

    }, 8000);

});