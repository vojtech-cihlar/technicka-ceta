async function nactiZavody() {

    const { data, error } = await supabaseClient
        .from("events")
        .select("*")
        .order("date", { ascending: true });

    if (error) {
        console.error("Chyba při načítání závodů:", error);
        return;
    }

    const container = document.getElementById("eventsContainer");

    container.innerHTML = "";

    data.forEach(event => {

        const card = document.createElement("div");

        card.className = "event-card";

        card.innerHTML = `
            <div class="event-date">
                ${formatDatum(event.date)}
            </div>

            <div class="event-name">
                ${event.name}
            </div>
        `;

      card.addEventListener("click", () => {

    localStorage.setItem(
        "selectedEvent",
        JSON.stringify(event)
    );

    window.location.href = "director-disciplines.html";

});

        container.appendChild(card);

    });

}



function formatDatum(datum){

    const d = new Date(datum);

    return d.toLocaleDateString("cs-CZ", {

        day: "numeric",
        month: "numeric",
        year: "numeric"

    });

}


nactiZavody();