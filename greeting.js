const greetingTop = document.querySelector(".js-greetingTop");
const greetingForm = document.querySelector(".js-formContainer"),
  formInput = greetingForm.querySelector("input");
const userNameContainer = document.querySelector(".js-greetingContainer"),
  userName = userNameContainer.querySelector(".js-userName");
const todoFormContainer = document.querySelector(".js-todoContainer");

const USER_LS = "currentUser";
const SHOWING = "showing";
const HIDING = "hiding";

function resetName() {
  askForName();
}
function paintGreeting(name) {
  greetingTop.classList.add(SHOWING);
  greetingForm.classList.add(HIDING);
  greetingForm.classList.remove(SHOWING);
  todoFormContainer.classList.remove(HIDING);
  userName.innerText = name;
}
function saveName(name) {
  localStorage.setItem(USER_LS, name);
}
function handleSubmit(e) {
  e.preventDefault();
  const name = formInput.value;
  paintGreeting(name);
  saveName(name);
}
function askForName() {
  greetingForm.classList.add(SHOWING);
  greetingTop.classList.add(HIDING);
  todoFormContainer.classList.add(HIDING);

  greetingForm.addEventListener("submit", handleSubmit);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser !== null) {
    paintGreeting(currentUser);
  } else {
    askForName();
  }
}

function init() {
  loadName();
  userName.addEventListener("click", resetName);
}
init();
