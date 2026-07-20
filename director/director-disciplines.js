const event = JSON.parse(localStorage.getItem("selectedEvent"));

document.getElementById("infoText").textContent =
    `${event.date} • ${event.name}`;

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

    const container =
        document.getElementById("disciplinesContainer");

    container.innerHTML = "";

    data.forEach(discipline => {

        const card = document.createElement("div");

        card.className = "location";

        card.innerHTML = `

            <div class="discipline-row">

                <label class="check-item">

                    <input type="checkbox">

                    <span>${discipline.name}</span>

                </label>

                <button
                    class="duplicate-button"
                    type="button"
                    disabled>

                    +

                </button>

            </div>

        `;

        const checkbox =
            card.querySelector("input");

        const plusButton =
            card.querySelector(".duplicate-button");

        checkbox.addEventListener("change", () => {

            if (checkbox.checked) {

                selectedDisciplines.push({

                    id: discipline.id,
                    name: discipline.name

                });

                plusButton.disabled = false;

            } else {

                selectedDisciplines =
                    selectedDisciplines.filter(
                        d => d.id !== discipline.id
                    );

                plusButton.disabled = true;

            }

            console.table(selectedDisciplines);

        });

        plusButton.addEventListener("click", () => {

            console.log(
                `Přidat další sektor disciplíny: ${discipline.name}`
            );

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

    window.location.href =
        "director-equipment.html";

});