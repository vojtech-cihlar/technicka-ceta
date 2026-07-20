document.addEventListener("DOMContentLoaded", async () => {

    const cardsContainer = document.getElementById("cardsContainer");

    if (!cardsContainer) return;

    // Propojení ID disciplíny s obrázkem a stránkou

    const disciplineInfo = {

        1: {
            image: "images/cards/behy.jpg",
            page: "discipliny/behy.html"
        },

        2: {
            image: "images/cards/dalka.jpg",
            page: "discipliny/dalka.html"
        },

        3: {
            image: "images/cards/vyska.jpg",
            page: "discipliny/vyska.html"
        },

        4: {
            image: "images/cards/tyc.jpg",
            page: "discipliny/tyc.html"
        },

        5: {
            image: "images/cards/ostep.jpg",
            page: "discipliny/ostep.html"
        },

        6: {
            image: "images/cards/disk.jpg",
            page: "discipliny/disk.html"
        },

        7: {
            image: "images/cards/kladivo.jpg",
            page: "discipliny/kladivo.html"
        },

        8: {
            image: "images/cards/koule.jpg",
            page: "discipliny/koule.html"
        }

    };

    // Načtení aktivního závodu

    const { data: event, error } = await supabaseClient
        .from("events")
        .select("*")
        .eq("active", true)
        .single();

    if (error) {

        console.error(error);
        return;

    }

    const disciplines = event.selected_disciplines || [];

    cardsContainer.innerHTML = "";

    disciplines.forEach(discipline => {

        const info = disciplineInfo[discipline.id];

        if (!info) return;

        const card = document.createElement("a");

        card.href = info.page;
        card.className = "card";

        card.innerHTML = `
            <img src="${info.image}" alt="${discipline.name}">
            <div class="overlay">
                <h2>${discipline.name}</h2>
            </div>
        `;

        cardsContainer.appendChild(card);

    });

});