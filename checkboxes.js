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