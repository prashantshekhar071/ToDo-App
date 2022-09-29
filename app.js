// ************* Selectors ************************ //

const todoInput = document.querySelector('input');
const todoButton = document.querySelector('button');
let todoSection = document.querySelector('#tasks-section');


// ************** Event Listners *********************//


document.addEventListener("DOMContentLoaded", getTodos);

todoButton.addEventListener("click", addTodo);

todoSection.addEventListener("click", deleteTodo);



// **************** Functions *************************//


function addTodo(event){

    event.preventDefault();

    //Creating Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("task-div");

    //Adding Text in Todo DIV
    const todoText = document.createElement("p");
    todoText.innerText = todoInput.value;
    todoDiv.appendChild(todoText);

    //Adding it to Localstorage
    saveItToLocalStorage(todoInput.value);

    //Creating option button div
    const todoOptionDiv = document.createElement("div");
    todoOptionDiv.classList.add("check-cross-div");
    todoDiv.appendChild(todoOptionDiv);

    //Creating Check buttons
    const checkButton = document.createElement("div");
    checkButton.innerHTML = '<i class="fa fa-check"></i>';
    checkButton.classList.add("check-div");
    todoOptionDiv.appendChild(checkButton);

    //Creating cross button
    const crossButton = document.createElement("div");
    crossButton.innerHTML = '<i class="fa fa-trash"></i>';
    crossButton.classList.add("cross-div");
    todoOptionDiv.appendChild(crossButton);

    //Adding the div to parent Section
    todoSection.appendChild(todoDiv);
    todoInput.value = " ";
}


function deleteTodo(event){
    // event.preventDefault();
    const items = event.target;
    if(items.classList[0] === 'cross-div'){
        const toBeDeleted = items.parentElement.parentElement;
        toBeDeleted.remove();
        removeFromLocalStorage(toBeDeleted);
    }

    //Check 
    if(items.classList[0] === 'check-div') {
        const toBeChecked = items.parentElement.parentElement;
        toBeChecked.classList.toggle("checked");
    }
}


function saveItToLocalStorage(todo){
    //Checking if there exist anything before
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(todo => {
        //Creating Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("task-div");

    //Adding Text in Todo DIV
    const todoText = document.createElement("p");
    todoText.innerText = todo;
    todoDiv.appendChild(todoText);

    //Creating option button div
    const todoOptionDiv = document.createElement("div");
    todoOptionDiv.classList.add("check-cross-div");
    todoDiv.appendChild(todoOptionDiv);

    //Creating Check buttons
    const checkButton = document.createElement("div");
    checkButton.innerHTML = '<i class="fa fa-check"></i>';
    checkButton.classList.add("check-div");
    todoOptionDiv.appendChild(checkButton);

    //Creating cross button
    const crossButton = document.createElement("div");
    crossButton.innerHTML = '<i class="fa fa-trash"></i>';
    crossButton.classList.add("cross-div");
    todoOptionDiv.appendChild(crossButton);

    //Adding the div to parent Section
    todoSection.appendChild(todoDiv);
    });
}

function removeFromLocalStorage(todo){
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoToBeRemoved = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoToBeRemoved), 1);
    localStorage.setItem("todos", JSON.stringify(todos));

}
