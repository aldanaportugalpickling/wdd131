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


const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Peru",
    location: "Lima, Peru",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  
  {
   templeName: "Brasilia Brazil",
   location: "Brasilia, Brazil",
   dedicated: "2023, September, 17",
   area:  25000,
   imageUrl:
   "https://churchofjesuschristtemples.org/assets/img/temples/brasilia-brazil-temple/brasilia-brazil-temple-16212.jpg"
  
  },
 
  {
   templeName: "Santiago Chile",
   location: "Santiago, Chile",
   dedicated: "1983, September, 15",
   area: 20831,
   imageUrl:
   "https://churchofjesuschristtemples.org/assets/img/temples/_temp/024-Santiago-Chile-Temple.jpg"
  },
 

  {
   templeName: "Buenos Aires Argentina",
   location: "Buenos Aires, Argentina",
   dedicated: "1986, January, 17",
   area: 30659,
   imageUrl:
   "https://churchofjesuschristtemples.org/assets/img/temples/buenos-aires-argentina-temple/buenos-aires-argentina-temple-12546.jpg"
  },
 
  {
   templeName: "Nauvoo United States",
   location: "Nauvoo, illinois United States",
   dedicated: "1846, May, 1",
   area:  50000,
   imageUrl:
   "https://churchofjesuschristtemples.org/assets/img/temples/nauvoo-temple/nauvoo-temple-3060.jpg"
  
  },
 
  {
   templeName: "Helena Montana",
   location: "Helena Montana, United States",
   dedicated: "2023, June, 18",
   area: 9794,
   imageUrl:
   "https://churchofjesuschristtemples.org/assets/img/temples/helena-montana-temple/helena-montana-temple-37751-main.jpg"
  
  },

    
];



document.querySelector("#home").addEventListener("click", () => {
  createTempleCard(temples);
});

document.querySelector("#old").addEventListener("click", () => {
  const oldTemples = temples.filter(t => parseInt(t.dedicated.split(",")[0]) < 1900);
  createTempleCard(oldTemples);
});

document.querySelector("#new").addEventListener("click", () => {
  const newTemples = temples.filter(t => parseInt(t.dedicated.split(",")[0]) > 2000);
  createTempleCard(newTemples);
});

document.querySelector("#large").addEventListener("click", () => {
  const largeTemples = temples.filter(t => t.area > 90000);
  createTempleCard(largeTemples);
});

document.querySelector("#small").addEventListener("click", () => {
  const smallTemples = temples.filter(t => t.area < 10000);
  createTempleCard(smallTemples);
});



function createTempleCard(filteredTemples) {
  document.querySelector(".res-grid").innerHTML = "";
  
    filteredTemples.forEach(temple => {
    let card = document.createElement("section");
    let name = document.createElement("h3");
    let location = document.createElement("p");
    let dedication = document.createElement("p");
    let area = document.createElement("p");
    let img = document.createElement("img");

    name.textContent = temple.templeName;
    location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;
    dedication.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;
    area.innerHTML = `<span class="label">Size:</span> ${temple.area.toLocaleString()} sq ft`;
      
    img.setAttribute("src", temple.imageUrl);
    img.setAttribute("alt", `${temple.templeName} Temple`);
    img.setAttribute("loading", "lazy");
    img.setAttribute("width", "400"); 
    img.setAttribute("height", "250");

    card.appendChild(name);
    card.appendChild(location);
    card.appendChild(dedication);
    card.appendChild(area);
    card.appendChild(img);

    document.querySelector(".res-grid").appendChild(card);
  });

}

createTempleCard(temples);

