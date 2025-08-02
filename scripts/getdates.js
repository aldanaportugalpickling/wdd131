document.getElementById("currentyear").textContent = new Date().getFullYear();

let oLastModif = new Date(document.lastModified);

let date = oLastModif.toLocaleDateString("en-GB"); 
let time = oLastModif.toLocaleTimeString("en-GB", {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});

document.getElementById("lastModified").textContent = `Last Modified: ${date} ${time}`;
