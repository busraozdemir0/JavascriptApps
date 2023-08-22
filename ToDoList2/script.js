// selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".filter-todo");

// alerts
const alertWarning = document.querySelector(".alert-warning");
const alertSuccess = document.querySelector(".alert-success");

//events
document.addEventListener("DOMContentLoaded", function () { //sayfa yüklendiğinde local storage içerisindeki bilgiler gelecek
    getTodos();
});
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
todoFilter.addEventListener("click", filterTodo);


// functions
function addTodo(e) {

    e.preventDefault(); // butona bastığımızda sayfa yenilenmesin diye

    const isEmpty = str => !str.trim().length;
    if (isEmpty(todoInput.value)) { //inputun içerisinde sağında ve solunda boşluk varsa
        alertWarning.style.display = "block";  // kırmızı alerti gösteriyoruz
        setTimeout(() => {   // kırmızı alertin 1.5 saniye sonra kaybolmasını sağlıyoruz.
            alertWarning.style.display = "none";
        }, 1500);

        // clear todo input value
        todoInput.value = "";

    } else {
        alertSuccess.style.display = "block";  // success alerti gösteriyoruz
        setTimeout(() => {
            alertSuccess.style.display = "none";
        }, 1500);

        saveLocalTodos(todoInput.value);

        // create todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");  // classı todo adında olan div oluşturduk

        // check mark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = "<i class='fas fa-check-circle'></i>";
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        // create todo li
        const newTodo = document.createElement("li");
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        // check trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = "<i class='fas fa-minus-circle'></i>";
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //append to list
        todoList.appendChild(todoDiv); // inputa girilen değeri todoDiv değişkeninin içerisine ekleyecek

        // clear todo input value
        todoInput.value = "";

    }

}

function deleteCheck(e) {
    const item = e.target;

    // delete todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;  // hangi elemanın trash butonuna tıklarsak todo'ya ata
        todo.classList.add("fall");
        removeLocalStorage(todo);
        todo.addEventListener("transitionend", function () { // transitionend=>animasyon için event
            todo.remove();
        });
    }

    // check mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (item) {
        switch (e.target.value) {
            case "all":
                item.style.display = "flex";
                break;

            case "completed":
                if (item.classList.contains("completed")) {  // itemin classında completed varsa göster yoksa gösterme
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
                break;

            case "uncompleted":
                if (!item.classList.contains("completed")) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
        }
    });
}

// locale storage
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach((todo) => {
        // create todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");  // classı todo adında olan div oluşturduk

        // check mark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = "<i class='fas fa-check-circle'></i>";
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        // create todo li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        // check trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = "<i class='fas fa-minus-circle'></i>";
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //append to list
        todoList.appendChild(todoDiv); // inputa girilen değeri todoDiv değişkeninin içerisine ekleyecek

    });
}


function removeLocalStorage(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[1].innerText;  // gelen todo elemanının çocuklarından ilkinin yazısını silecek
    todos.splice(todos.indexOf(todoIndex), 1); // splice metodu hem silmeye hem eklemeye yarar
    localStorage.setItem("todos", JSON.stringify(todos));

}

