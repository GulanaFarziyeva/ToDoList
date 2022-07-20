let ulElement = document.querySelector(".task-list-inner");
let newTaskName = document.querySelector("#new-task-name");
let addTask = document.querySelector("#add-new-task");
let clearBtn = document.querySelector(".clear-all-btn");
let addNewTaskBtn = document.querySelector("#add-new-task");

let editId;
let isEditTask = false;

let tasksList = [];

displayTask();

function displayTask() {
  ulElement.innerHTML = "";
  if (tasksList.length == 0) {
    ulElement.innerHTML = `<p>Task List is empty</p>`;
  } else {
    for (let task of tasksList) {
      let completed = task.status == "completed" ? "checked" : "";
      let liElement = `
         <li class="task-list">
          <input type="checkbox" id="${task.id}" onClick="updateStatus(this)"
          class="task-list-input" ${completed}>
          <label for="${task.id}" class="${completed}">${task.taskName}</label>
          <button class="edit-btn" onClick='editTask(${task.id},"${task.taskName}")'>
            <i class="fa-solid fa-pen-to-square"></i>       
          </button>
          <button class="delete-btn" onClick='deleteTask(${task.id}, "${task.taskName}")'>
          <i class="fa-solid fa-trash-can"></i>
          </button>
        </li> 
        `;
      ulElement.insertAdjacentHTML("beforeend", liElement);
    }
  }
}

addNewTaskBtn.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    addNewTaskBtn.click();
  }
});

addTask.addEventListener("click", newTask);

function newTask(event) {
  if (newTaskName.value == "") {
    alert("Please enter task");
  } else {
    if (!isEditTask) {
      tasksList.push({
        "id": tasksList.length + 1,
        "taskName": newTaskName.value,
        "status": "pending",
      });
    } else {
      for (let task of tasksList) {
        if (task.id == editId) {
          task.taskName = newTaskName.value;
        }
        isEditTask = false;
      }
    }
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

function editTask(taskId, taskName) {
  editId = taskId;
  isEditTask = true;
  newTaskName.value = taskName;
  newTaskName.focus();
}



clearBtn.addEventListener("click", function() {
  tasksList.splice(0, tasksList.length);
  displayTask();
})

function updateStatus(selectedTask) {
  let label = selectedTask.nextElementSibling;
  let status;
  if (selectedTask.checked) {
    label.classList.add("checked");
    status = "completed";
  } else {
    label.classList.remove("checked");
    status = "pending";
  }
  for (let task of tasksList) {
    if (task.id == selectedTask.id) {
      task.status = status;
    }
  }
}
