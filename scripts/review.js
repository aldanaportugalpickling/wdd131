//Date and Time
document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Tracks how many times the user has submitted a review form.
// It stores the count in localStorage and displays it on the confirmation page.
let count = localStorage.getItem("reviewCount") || 0;
count++;
localStorage.setItem("reviewCount", count);

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("counter").textContent = `You have successfully completed ${count} review${count > 1 ? 's' : ''}.`;
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;
});

    