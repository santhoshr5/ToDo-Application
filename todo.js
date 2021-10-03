let todoItemsContainerEl = document.getElementById('todoItemsContainer')
let addButtonEl = document.getElementById("addTodoButton")
let saveTodoButtonEl = document.getElementById("saveTodoButton")

function getTodoListFromLocalStorage() {
    let stringifyEl = localStorage.getItem("todoList")
    let parsedTodoList = JSON.parse(stringifyEl)
    if (parsedTodoList === null) {
        return []
    } else {
        return parsedTodoList
    }

}
let todoList = getTodoListFromLocalStorage()

saveTodoButtonEl.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList))
}

function onDeleteTodo(todoId) {
    let todoEl = document.getElementById(todoId)
    todoItemsContainerEl.removeChild(todoEl)

    let delElIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo
        if (eachTodoId === todoId) {
            return true
        } else {
            return false
        }

    })

    todoList.splice(delElIndex, 1)
}

function onTodoStatusChange(checkboxId, labelId) {
    let checkboxEl = document.getElementById(checkboxId)
    let labelEl = document.getElementById(labelId)
    labelEl.classList.toggle("checked")
}



function createAndAppendTodo(todo) {
    let todoId = "todo " + todo.uniqueNo
    let checkboxId = "checkbox" + todo.uniqueNo
    let labelId = "labelId" + todo.uniqueNo
    console.log(todoId)

    let todoEl = document.createElement("li")
    todoEl.classList.add("d-flex", "flex-row")
    todoEl.id = todoId
    todoItemsContainerEl.appendChild(todoEl)

    let inputEl = document.createElement("input")
    inputEl.type = "checkbox"
    inputEl.id = checkboxId
    inputEl.classList.add("checkbox-input")
    inputEl.onclick = function() {
        onTodoStatusChange(checkboxId, labelId)
    }

    todoEl.appendChild(inputEl)
    //console.log(todoEl)

    let labelContainer = document.createElement("div")
    labelContainer.classList.add("label-container", "d-flex", "flex-row", "mt-2")
    todoEl.appendChild(labelContainer)
    //console.log(todoItemsContainerEl)
    let labelEl = document.createElement("label")
    labelEl.id = labelId
    labelEl.setAttribute("for", checkboxId)
    labelEl.classList.add("checkbox-label")
    labelEl.textContent = todo.text
    labelContainer.appendChild(labelEl)

    let delIconContainer = document.createElement("div")
    delIconContainer.classList.add("delete-icon-container")
    labelContainer.appendChild(delIconContainer)
    console.log(labelEl)

    let delIconEl = document.createElement("i")
    delIconEl.classList.add("far", "fa-trash-alt", "delete-icon")
    delIconContainer.appendChild(delIconEl)
    delIconEl.onclick = function() {
        onDeleteTodo(todoId)
    }

}
for (let todo of todoList) {
    createAndAppendTodo(todo)
}

let todosCount = todoList.length

function addTodo() {
    let userInputEl = document.getElementById("todoUserInput")
    let userInputValue = userInputEl.value
    if (userInputValue === "") {
        alert("Enter valid Text")
        return;
    }

    todosCount = todosCount + 1
    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount
    }
    todoList.push(newTodo)
    createAndAppendTodo(newTodo)
    userInputEl.value = ""
}
addButtonEl.onclick = function() {
    addTodo()
}