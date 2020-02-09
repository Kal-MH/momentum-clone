const todoForm = document.querySelector(".js-todoListForm"),
  todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".js-todoList");
const spanNice = document.querySelector(".js-spanNice");

const TODOS_LS = "toDos";
const FinishBtnClickekd = "finishBtnClicked";
const FinishBtnNotClickekd = "finishBtnNotClicked";
let clickOnset = 0;
let toDos = [];

function delToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  todoList.removeChild(li);
  const cleanTodoList = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanTodoList;
  saveToDos();
}
function spanNiceAddHiding() {
  spanNice.classList.add(HIDING);
}
function finishBtnClick(e) {
  const btn = e.target;
  if (clickOnset) {
    clickOnset = 0;
    btn.classList.remove(FinishBtnClickekd);
  } else {
    clickOnset = 1;
    btn.classList.add(FinishBtnClickekd);
    spanNice.classList.remove(HIDING);
    setTimeout(spanNiceAddHiding, 3800);
  }
}
function paintToDo(todo) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const finishBtn = document.createElement("button");
  const newId = toDos.length + 1;
  span.innerText = todo;
  delBtn.innerText = "X";
  finishBtn.className = "finishBtn";
  delBtn.addEventListener("click", delToDo);
  finishBtn.addEventListener("click", finishBtnClick);
  li.id = newId;

  li.appendChild(finishBtn);
  li.appendChild(span);
  li.appendChild(delBtn);

  todoList.appendChild(li);

  const toDoObj = {
    text: todo,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function handleTodoSubmit(e) {
  e.preventDefault();
  const inputValue = todoInput.value;
  paintToDo(inputValue);
  todoInput.value = "";
}
function loadTodo() {
  const toDos = localStorage.getItem(TODOS_LS);
  if (toDos !== null) {
    const parsedToDos = JSON.parse(toDos);
    parsedToDos.forEach(function(todo) {
      paintToDo(todo.text);
    });
  }
}
function init() {
  loadTodo();
  todoForm.addEventListener("submit", handleTodoSubmit);
  spanNice.classList.add(HIDING);
}

init();
