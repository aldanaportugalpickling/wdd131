//Date and Time
document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

//Array de productos
const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

// Poblar el menú desplegable de productos
const selectElement = document.getElementById("product");

products.forEach(product => {
  const option = document.createElement("option");
  option.value = product.id; // Valor que se envía en el formulario
  option.textContent = product.name; // Texto visible para el usuario
  selectElement.appendChild(option);
});

