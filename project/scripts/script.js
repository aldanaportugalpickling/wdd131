const hamButton = document.querySelector('#menu-button');
const navigation = document.querySelector('nav');

hamButton.addEventListener('click', () => {
  navigation.classList.toggle('show');
  hamButton.classList.toggle('open');


 if (hamButton.classList.contains('open')) {
    hamButton.innerHTML = '&times;'; // ✕
  } else {
    hamButton.innerHTML = '&#9776;'; // ☰
  }
});


//Date and Time
document.querySelector('#currentyear').textContent = new Date().getFullYear();

document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;





/*document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservationForm");
  const confirmation = document.getElementById("confirmation");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const tour = form.tour.value;
    const guide = form.querySelector('input[name="guide"]:checked');

    if (!name || !email || !tour || !guide) {
      alert("Please fill out all fields.");
      return;
    }

    const guideValue = guide.value;

    // Simulate reservation success
    form.classList.add("hidden");
    confirmation.classList.remove("hidden");

    console.log("Reservation submitted:", {
      name,
      email,
      tour,
      guide: guideValue
    });
  });

  // Footer dynamic year and last modified
  document.getElementById("currentyear").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = "Last modified: " + document.lastModified;
});




//boton hamburguer

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});*/
