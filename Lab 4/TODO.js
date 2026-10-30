"use strict";
let todos = [];
let currentFilter = "all";
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const itemsLeft = document.getElementById("itemsLeft");
const filterAll = document.getElementById("filterAll");
const filterActive = document.getElementById("filterActive");
const filterCompleted = document.getElementById("filterCompleted");
const clearCompletedBtn = document.getElementById("clearCompleted");
const clearAllBtn = document.getElementById("clearAll");
function addTodo() {
    const text = todoInput.value.trim();
    if (!text)
        return;
    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };
    todos.push(newTodo);
    todoInput.value = "";
    render();
}
function render() {
    todoList.innerHTML = "";
    const filteredTodos = todos.filter((todo) => {
        if (currentFilter === "active")
            return !todo.completed;
        if (currentFilter === "completed")
            return todo.completed;
        return true;
    });
    filteredTodos.forEach((todo) => {
        const li = document.createElement("li");
        if (todo.completed) {
            li.classList.add("completed");
        }
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", () => {
            todo.completed = checkbox.checked;
            render();
        });
        const span = document.createElement("span");
        span.textContent = todo.text;
        span.addEventListener("dblclick", () => {
            const editInput = document.createElement("input");
            editInput.type = "text";
            editInput.value = todo.text;
            li.replaceChild(editInput, span);
            editInput.focus();
            editInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    const newText = editInput.value.trim();
                    if (newText) {
                        todo.text = newText;
                    }
                    render();
                }
            });
        });
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑";
        deleteBtn.addEventListener("click", () => {
            todos = todos.filter((t) => t.id !== todo.id);
            render();
        });
        const leftContainer = document.createElement("div");
        leftContainer.style.display = "flex";
        leftContainer.style.gap = "10px";
        leftContainer.appendChild(checkbox);
        leftContainer.appendChild(span);
        li.appendChild(leftContainer);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
    const activeCount = todos.filter((t) => !t.completed).length;
    itemsLeft.textContent = `${activeCount} items left`;
}
addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});
filterAll.addEventListener("click", () => {
    currentFilter = "all";
    updateFilterUI(filterAll);
});
filterActive.addEventListener("click", () => {
    currentFilter = "active";
    updateFilterUI(filterActive);
});
filterCompleted.addEventListener("click", () => {
    currentFilter = "completed";
    updateFilterUI(filterCompleted);
});
function updateFilterUI(activeBtn) {
    [filterAll, filterActive, filterCompleted].forEach((btn) => btn.classList.remove("active"));
    activeBtn.classList.add("active");
    render();
}
clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter((t) => !t.completed);
    render();
});
clearAllBtn.addEventListener("click", () => {
    todos = [];
    render();
});
render();
