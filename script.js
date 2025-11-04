const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from Local Storage
document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const li = createTaskElement(taskText);
  taskList.appendChild(li);

  saveTask(taskText);
  taskInput.value = "";
}

// Create a single task item
function createTaskElement(taskText, completed = false) {
  const li = document.createElement("li");
  li.textContent = taskText;

  if (completed) li.classList.add("completed");

  // Toggle complete on click
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateLocalStorage();
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.classList.add("delete");

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    updateLocalStorage();
  });

  li.appendChild(deleteBtn);
  return li;
}

// Save to Local Storage
function saveTask(taskText) {
  const tasks = getTasks();
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from Local Storage
function loadTasks() {
  const tasks = getTasks();
  tasks.forEach((task) => {
    const li = createTaskElement(task.text, task.completed);
    taskList.appendChild(li);
  });
}

// Get tasks from Local Storage
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Update Local Storage after changes
function updateLocalStorage() {
  const allTasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    allTasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(allTasks));
}
