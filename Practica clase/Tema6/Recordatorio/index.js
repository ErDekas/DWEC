$(document).ready(function () {
  // Load todos from localStorage or use empty array if none exist
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function getTimeAgo(timestamp) {
    const seconds = Math.floor((new Date() - timestamp) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `Añadido hace ${days} días`;
    if (hours > 0) return `Añadido hace ${hours} horas`;
    if (minutes > 0) return `Añadido hace ${minutes} minutos`;
    return "Añadido hace un momento";
  }

  function getNextPriority(currentPriority) {
    const priorities = ["low", "normal", "high"];
    const currentIndex = priorities.indexOf(currentPriority);
    return priorities[(currentIndex + 1) % priorities.length];
  }

  function sortTodos() {
    const priorityOrder = { high: 0, normal: 1, low: 2 };
    todos.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }

  function renderTodos() {
    sortTodos();
    $("#todo-list").empty();
    todos.forEach((todo, index) => {
      const todoItem = $(`
                <div class="todo-item ${todo.completed ? "completed" : ""}">
                    <input type="checkbox" class="todo-checkbox" ${
                      todo.completed ? "checked" : ""
                    }>
                    <span class="todo-text">
                        <button class="priority-btn priority-${todo.priority}">
                            ${
                              todo.priority.charAt(0).toUpperCase() +
                              todo.priority.slice(1)
                            }
                        </button>
                        ${todo.text}
                        <span class="timestamp">${getTimeAgo(
                          todo.timestamp
                        )}</span>
                    </span>
                    <button class="delete-btn">✕</button>
                </div>
            `);

      todoItem.find(".todo-checkbox").on("change", function () {
        todos[index].completed = !todos[index].completed;
        updateStats();
        saveTodos();
        renderTodos();
      });

      todoItem.find(".priority-btn").on("click", function () {
        todos[index].priority = getNextPriority(todos[index].priority);
        saveTodos();
        renderTodos();
      });

      todoItem.find(".delete-btn").on("click", function () {
        todos.splice(index, 1);
        updateStats();
        saveTodos();
        renderTodos();
      });

      $("#todo-list").append(todoItem);
    });
  }

  function updateStats() {
    const pendingCount = todos.filter((todo) => !todo.completed).length;
    const totalCount = todos.length;
    $("#pending-count").text(
      `${pendingCount} Tareas pendientes de un total de ${totalCount}`
    );
  }

  $("#newTodo").keypress(function (e) {
    if (e.which === 13 && $(this).val().trim() !== "") {
      const newTodo = {
        text: $(this).val(),
        completed: false,
        priority: "normal",
        timestamp: new Date().getTime(),
      };
      todos.push(newTodo);
      $(this).val("");
      updateStats();
      saveTodos();
      renderTodos();
    }
  });

  $(".clear-completed").click(function () {
    todos = todos.filter((todo) => !todo.completed);
    updateStats();
    saveTodos();
    renderTodos();
  });

  // Initial render
  renderTodos();
  updateStats();
});
