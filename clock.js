const clockContainer = document.querySelector(".js-clockContainer"),
  clock = clockContainer.querySelector(".js-clock");
const greetingContainer = document.querySelector(".js-greetingContainer"),
  greeting = greetingContainer.querySelector(".js-greeting");

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  clock.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
  console.log(hours);
  setGreeting(hours);
}
function setGreeting(hours) {
  if (hours >= 5 && hours < 12) {
    greeting.innerText = "Good Morning, ";
  } else if (hours >= 12 && hours < 17) {
    greeting.innerText = "Good Afternoon, ";
  } else if (hours >= 17 && hours < 22) {
    greeting.innerText = "Good Evening, ";
  } else {
    greeting.innerText = "Good Night, ";
  }
}
function init() {
  getTime();
  setInterval(getTime, 1000);
}
init();
