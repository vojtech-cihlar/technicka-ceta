const event =
    JSON.parse(localStorage.getItem("selectedEvent"));

document.getElementById("infoText").textContent =
    `${event.date} • ${event.name}`;

const selectedDisciplines =
    JSON.parse(localStorage.getItem("selectedDisciplines"));

let selectedEquipment = [];

async function nactiPomucky() {

    const { data, error } = await supabaseClient
        .from("equipment")
        .select("*")
        .eq("active", true)
        .order("discipline_id")
        .order("id");

    if (error) {

        console.error(error);
        return;

    }

    const container =
        document.getElementById("equipmentContainer");

    container.innerHTML = "";

    selectedDisciplines.forEach(discipline => {

        // vytvoření boxu disciplíny

        const box = document.createElement("div");

        box.className = "location";

        // nadpis disciplíny

        const title = document.createElement("h3");

        title.textContent = discipline.name;

        box.appendChild(title);

        // pomůcky pouze této disciplíny

        const disciplineEquipment = data.filter(item =>
            item.discipline_id === discipline.id
        );

        disciplineEquipment.forEach(item => {

            const label = document.createElement("label");

            label.className = "check-item";

            label.innerHTML = `
                <input type="checkbox">
                <span>${item.name}</span>
            `;

            const checkbox =
                label.querySelector("input");

            checkbox.addEventListener("change", () => {

                if (checkbox.checked) {

                    selectedEquipment.push(item);

                } else {

                    selectedEquipment =
                        selectedEquipment.filter(
                            equipment => equipment.id !== item.id
                        );

                }

                console.table(selectedEquipment);

            });

            box.appendChild(label);

        });

        container.appendChild(box);

    });

}

nactiPomucky();

document
.getElementById("continueButton")
.addEventListener("click", () => {

    localStorage.setItem(
        "selectedEquipment",
        JSON.stringify(selectedEquipment)
    );

    window.location.href =
        "director-summary.html";

});