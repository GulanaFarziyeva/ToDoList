let ulElement = document.querySelector(".task-list-inner");

let tasksList = [
  { id: 1, taskName: "Task-1" },
  { id: 2, taskName: "Task-2" },
  { id: 3, taskName: "Task-3" },
];

displayTask();

function displayTask() {
  ulElement.innerHTML = "";
  for (let task of tasksList) {
    let liElement = `
          <li class="task-list">
              <input type="checkbox" id="${task.id}" class="task-list-input">
              <label for="${task.id}">${task.taskName}</label>
              <button class="edit-btn">Edit</button>
              <button class="delete-btn" onClick="deleteTask(${task.id})">Delete</button>
          </li> 
      `;
    ulElement.insertAdjacentHTML("beforeend", liElement);
  }
}

let addTask = document.querySelector("#add-new-task");
addTask.addEventListener("click", newTask);

document
  .querySelector("#add-new-task")
  .addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
      document.querySelector("#add-new-task").click();
    }
  });

function newTask(event) {
  let newTaskName = document.querySelector("#new-task-name");
  if (newTaskName.value == "") {
    alert("Please enter task");
  } else {
    tasksList.push({ id: tasksList.length + 1, taskName: newTaskName.value });
    newTaskName.value = "";
    displayTask();
  }

  event.preventDefault();
}

function deleteTask(id) {
  let deletedId;
  for (let index in tasksList) {
    if (tasksList[index].id == id) {
      deletedId = index;
    }
  }

  tasksList.splice(deletedId, 1);
  displayTask();
}
