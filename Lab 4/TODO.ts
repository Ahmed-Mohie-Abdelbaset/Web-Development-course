interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

let todos: Todo[] = [];
let currentFilter: string = "all";

const todoInput = document.getElementById("todoInput") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const todoList = document.getElementById("todoList") as HTMLUListElement;
const itemsLeft = document.getElementById("itemsLeft") as HTMLSpanElement;

const filterAll = document.getElementById("filterAll") as HTMLButtonElement;
const filterActive = document.getElementById("filterActive") as HTMLButtonElement;
const filterCompleted = document.getElementById("filterCompleted") as HTMLButtonElement;

const clearCompletedBtn = document.getElementById("clearCompleted") as HTMLButtonElement;
const clearAllBtn = document.getElementById("clearAll") as HTMLButtonElement;

function addTodo(): void {
    const text: string = todoInput.value.trim();
    if (!text) return;

    const newTodo: Todo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(newTodo);
    todoInput.value = "";
    render();
}

function render(): void {
    todoList.innerHTML = "";

    const filteredTodos = todos.filter((todo: Todo) => {
        if (currentFilter === "active") return !todo.completed;
        if (currentFilter === "completed") return todo.completed;
        return true;
    });

    filteredTodos.forEach((todo: Todo) => {
        const li: HTMLLIElement = document.createElement("li");
        if (todo.completed) {
            li.classList.add("completed");
        }

        const checkbox: HTMLInputElement = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", () => {
            todo.completed = checkbox.checked;
            render();
        });

        const span: HTMLSpanElement = document.createElement("span");
        span.textContent = todo.text;

        span.addEventListener("dblclick", () => {
            const editInput: HTMLInputElement = document.createElement("input");
            editInput.type = "text";
            editInput.value = todo.text;

            li.replaceChild(editInput, span);
            editInput.focus();

            editInput.addEventListener("keydown", (e: KeyboardEvent) => {
                if (e.key === "Enter") {
                    const newText: string = editInput.value.trim();
                    if (newText) {
                        todo.text = newText;
                    }
                    render();
                }
            });
        });

        const deleteBtn: HTMLButtonElement = document.createElement("button");
        deleteBtn.textContent = "🗑";
        deleteBtn.addEventListener("click", () => {
            todos = todos.filter((t: Todo) => t.id !== todo.id);
            render();
        });

        const leftContainer: HTMLDivElement = document.createElement("div");
        leftContainer.style.display = "flex";
        leftContainer.style.gap = "10px";
        leftContainer.appendChild(checkbox);
        leftContainer.appendChild(span);

        li.appendChild(leftContainer);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });

    const activeCount: number = todos.filter((t: Todo) => !t.completed).length;
    itemsLeft.textContent = `${activeCount} items left`;
}

addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", (e: KeyboardEvent) => {
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

function updateFilterUI(activeBtn: HTMLButtonElement): void {
    [filterAll, filterActive, filterCompleted].forEach((btn) => btn.classList.remove("active"));
    activeBtn.classList.add("active");
    render();
}

clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter((t: Todo) => !t.completed);
    render();
});

clearAllBtn.addEventListener("click", () => {
    todos = [];
    render();
});

render();