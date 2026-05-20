function fetchTasks() {
  fetch("/tasks")
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("taskList");
      list.innerHTML = "";

      data.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${task} 
          <button onclick="deleteTask(${index})">Delete</button>`;
        list.appendChild(li);
      });
    });
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  fetch("/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: taskInput.value })
  }).then(() => {
    taskInput.value = "";
    fetchTasks();
  });
}

function deleteTask(index) {
  fetch(`/tasks/${index}`, {
    method: "DELETE"
  }).then(() => fetchTasks());
}

fetchTasks();
