console.log("NAČTEN NOVÝ director-disciplines.js");

const event = JSON.parse(localStorage.getItem("selectedEvent"));

const datum = new Date(event.date);

const text =
    `${datum.getDate()}. ${datum.getMonth()+1}. ${datum.getFullYear()} • ${event.name}`;

document.getElementById("infoText").textContent = text;

let selectedDisciplines = [];

async function nactiDiscipliny() {

    const { data, error } = await supabaseClient
        .from("disciplines")
        .select("*")
        .order("id");

    if (error) {

        console.error(error);
        return;

    }

    const container = document.getElementById("disciplinesContainer");

    container.innerHTML = "";

    data.forEach(discipline => {

        const card = document.createElement("div");
        card.className = "location";

        card.innerHTML = `

            <label class="check-item">

                <input type="checkbox">

                <span>${discipline.name}</span>

            </label>

        `;

        const checkbox = card.querySelector("input");

        checkbox.addEventListener("change", () => {

            if (checkbox.checked) {

                selectedDisciplines.push(discipline);

            } else {

                selectedDisciplines = selectedDisciplines.filter(
                    d => d.id !== discipline.id
                );

            }

            console.table(selectedDisciplines);

        });

        container.appendChild(card);

    });

}

nactiDiscipliny();

document
.getElementById("continueButton")
.addEventListener("click", () => {

    localStorage.setItem(

        "selectedDisciplines",

        JSON.stringify(selectedDisciplines)

    );

    window.location.href = "director-equipment.html";

});