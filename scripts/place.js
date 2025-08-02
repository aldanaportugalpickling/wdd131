//To get the current year 
document.querySelector('#currentyear').textContent = new Date().getFullYear();
//To get the Last modification
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

//Calculator: 
const temperature = 32; 
const windSpeed = 5; 
const conditions = "Sunny and very hot";

document.getElementById("temp").textContent = temperature;
document.getElementById("wind").textContent = windSpeed;
document.getElementById("condition").textContent = conditions;


function calculateWindChill(temp, wind) {
  return (
    13.12 +
    0.6215 * temp -
    11.37 * Math.pow(wind, 0.16) +
    0.3965 * temp * Math.pow(wind, 0.16)
  ).toFixed(1);
}


let chill = "N/A";
if (temperature <= 10 && windSpeed > 4.8) {
  chill = `${calculateWindChill(temperature, windSpeed)}°C`;
}

document.getElementById("chill").textContent = chill;