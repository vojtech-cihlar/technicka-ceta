document.addEventListener("DOMContentLoaded", async () => {

    const equipmentContainer = document.getElementById("equipmentContainer");

    if (!equipmentContainer) return;

    // ======================================================
    // Nastavení stránky
    // ======================================================

    const disciplineId = 1;

    // ======================================================
    // Načtení aktivního závodu
    // ======================================================

    const { data: event, error } = await supabaseClient
        .from("events")
        .select("id, selected_equipment, equipment_status")
        .eq("active", true)
        .single();

    if (error || !event) {

        console.error(error);

        equipmentContainer.innerHTML =
            "<p>Nepodařilo se načíst pomůcky.</p>";

        return;

    }

    const eventId = event.id;

    const allEquipment = event.selected_equipment || [];
    let equipmentStatus = event.equipment_status || [];

    // ======================================================
    // Vyfiltrování disciplíny
    // ======================================================

    const equipment = allEquipment.filter(item =>
        item.discipline_id === disciplineId
    );

    // ======================================================
    // Seskupení podle umístění
    // ======================================================

    const grouped = {};

    equipment.forEach(item => {

        if (!grouped[item.location]) {

            grouped[item.location] = [];

        }

        grouped[item.location].push(item);

    });

    equipmentContainer.innerHTML = "";
    // ======================================================
    // Překreslení checkboxů podle databáze
    // ======================================================

    function refreshCheckboxes() {

        const checkboxes =
            equipmentContainer.querySelectorAll("input[type='checkbox']");

        checkboxes.forEach(checkbox => {

            const id = Number(checkbox.dataset.id);

            checkbox.checked =
                equipmentStatus.includes(id);

        });

        updateProgress();

    }
    // ======================================================
    // Funkce pro přepočet progressu
    // ======================================================

    function updateProgress() {

        const checkboxes =
            equipmentContainer.querySelectorAll("input[type='checkbox']");

        const checked =
            equipmentContainer.querySelectorAll("input[type='checkbox']:checked");

        const progress =
            document.getElementById("progress");

        if (progress) {

            progress.textContent =
                `${checked.length} / ${checkboxes.length}`;

        }

        // logo

        const logo =
            document.getElementById("progressLogo");

        if (logo && checkboxes.length > 0) {

            const opacity =
                0.02 + (checked.length / checkboxes.length) * 0.98;

            logo.style.opacity = opacity;

        }

    }
        // ======================================================
    // Vykreslení pomůcek
    // ======================================================

    Object.entries(grouped).forEach(([location, items]) => {

        const locationDiv = document.createElement("div");
        locationDiv.className = "location";

        const title = document.createElement("h3");
        title.textContent = "📍 " + location;

        locationDiv.appendChild(title);

        items.forEach(item => {

            const label = document.createElement("label");
            label.className = "check-item";

            const isChecked = equipmentStatus.includes(item.id);

            label.innerHTML = `
                <input
                    type="checkbox"
                    data-id="${item.id}"
                    ${isChecked ? "checked" : ""}>
                <span>${item.name}</span>
            `;

            const checkbox = label.querySelector("input");

            checkbox.addEventListener("change", async () => {

                const equipmentId = Number(checkbox.dataset.id);

                if (checkbox.checked) {

                    if (!equipmentStatus.includes(equipmentId)) {
                        equipmentStatus.push(equipmentId);
                    }

                } else {

                    equipmentStatus = equipmentStatus.filter(
                        id => id !== equipmentId
                    );

                }

                const { error } = await supabaseClient
                    .from("events")
                    .update({
                        equipment_status: equipmentStatus
                    })
                    .eq("id", eventId);

                if (error) {

                    console.error(error);
                    alert("Nepodařilo se uložit změnu.");

                    return;

                }

                updateProgress();

            });

            locationDiv.appendChild(label);

        });

        equipmentContainer.appendChild(locationDiv);

    });

    // ======================================================
    // První přepočet po načtení stránky
    // ======================================================


    updateProgress();

    // ======================================================
    // Realtime synchronizace
    // ======================================================

    supabaseClient
        .channel("equipment-status")

        .on(
            "postgres_changes",
            {
                event: "UPDATE",
                schema: "public",
                table: "events",
                filter: `id=eq.${eventId}`
            },

            payload => {

                equipmentStatus =
                    payload.new.equipment_status || [];

                refreshCheckboxes();

            }

        )

        .subscribe();

});