document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reservationForm");
    const confirmation = document.getElementById("confirmation");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Aquí podrías agregar validaciones adicionales si lo deseas

        form.classList.add("hidden");
        confirmation.classList.remove("hidden");
    });

    // Footer dynamic year and last modified
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;
});
