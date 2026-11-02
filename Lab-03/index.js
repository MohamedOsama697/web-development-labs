const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");

let todos = [
    { id: 1, text: "See Lecture", completed: false },
    { id: 2, text: "Solve assignment", completed: false }
];

let nextId = 3;

function showTodos() {
    list.innerHTML = "";

    todos.forEach(function(todo) {
        const li = document.createElement("li");
        li.className = "todo-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "todo-checkbox";
        checkbox.checked = todo.completed;

        li.classList.toggle("completed", todo.completed);

        const text = document.createElement("span");
        text.className = "todo-text";
        text.textContent = todo.text;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "🗑";
        deleteButton.className = "delete-button";

        checkbox.addEventListener("change", function() {
            todo.completed = checkbox.checked;
            showTodos();
        });

        text.addEventListener("dblclick", function() {
            const editInput = document.createElement("input");
            editInput.className = "edit-input";
            editInput.value = todo.text;

            li.replaceChild(editInput, text);
            editInput.focus();

            let finished = false;

            function saveEdit() {
                if (finished) return;
                finished = true;

                if (editInput.value.trim() !== "") {
                    todo.text = editInput.value.trim();
                }

                showTodos();
            }

            editInput.addEventListener("keydown", function(event) {
                if (event.key === "Enter") {
                    saveEdit();
                }

                if (event.key === "Escape") {
                    finished = true;
                    showTodos();
                }
            });

            editInput.addEventListener("blur", saveEdit);
        });

        deleteButton.addEventListener("click", function() {
            todos = todos.filter(function(item) {
                return item.id !== todo.id;
            });

            showTodos();
        });

        li.append(checkbox, text, deleteButton);
        list.appendChild(li);
    });

    const remaining = todos.filter(function(todo) {
        return !todo.completed;
    }).length;

    itemsLeft.textContent = remaining +
        (remaining === 1 ? " item left" : " items left");
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const taskText = input.value.trim();

    if (taskText === "") return;

    todos.push({
        id: nextId++,
        text: taskText,
        completed: false
    });

    input.value = "";
    showTodos();
});

showTodos();