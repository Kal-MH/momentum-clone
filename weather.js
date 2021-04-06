const COORDS = "coords";
const API_KEY = "SET API KEYS";

const temp = document.querySelector(".js-temperature");
const currentlocation = document.querySelector(".js-location");

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      currentlocation.innerText = `${json.name}`;
      temp.innerText = `${json.main.temp}ºC`;
    });
}
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function handleSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(position);
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}
function handleError() {
  console.log("cant get geo location");
}
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleSucces, handleError);
}
function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}
function init() {
  loadCoords();
}
init();
