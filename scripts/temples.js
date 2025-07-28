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