const event =
    JSON.parse(localStorage.getItem("selectedEvent"));

document.getElementById("infoText").textContent =
    `${event.date} • ${event.name}`;

const selectedDisciplines =
    JSON.parse(localStorage.getItem("selectedDisciplines")) || [];

const selectedEquipment =
    JSON.parse(localStorage.getItem("selectedEquipment")) || [];

const container =
    document.getElementById("summaryContainer");

container.innerHTML = "";

/* ===========================================
   VYTVOŘENÍ BOXŮ DISCIPLÍN
=========================================== */

selectedDisciplines.forEach(discipline => {

    const box = document.createElement("div");

    box.className = "location";

    const title = document.createElement("h3");

    title.textContent = discipline.name;

    box.appendChild(title);

    /* Pomůcky této disciplíny */

    const equipment = selectedEquipment.filter(item =>
        item.discipline_id === discipline.id
    );

    equipment.forEach(item => {

        const row = document.createElement("div");

        row.className = "summary-item";

        row.textContent = item.name;

        box.appendChild(row);

    });

    container.appendChild(box);

});


/* ===========================================
   PUBLIKOVAT
=========================================== */

document
    .getElementById("continueButton")
    .addEventListener("click", async () => {

        /* 1. Zruší aktivní závod u všech */

        let { error } = await supabaseClient
            .from("events")
            .update({
                active: false
            })
            .not("id", "is", null);

        if (error) {
            console.error(error);
            alert(JSON.stringify(error));
            return;
        }

        /* 2. Publikuje vybraný závod */

        ({ error } = await supabaseClient
            .from("events")
  .update({
    active: true,
    selected_disciplines: selectedDisciplines,
    selected_equipment: selectedEquipment,
    equipment_status: []
})
            .eq("id", event.id));

        if (error) {
            console.error(error);
            alert(JSON.stringify(error));
            return;
        }

        alert("Závod byl úspěšně publikován.");

    });