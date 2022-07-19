let ulElement = document.querySelector(".task-list-inner");
let newTaskName = document.querySelector("#new-task-name");
let addTask = document.querySelector("#add-new-task");
let clearBtn = document.querySelector(".clear-all-btn");

let editId;
let isEditTask = false;

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
        <button class="edit-btn" onClick="editTask(${task.id},'${task.taskName}')">
          <i class="fa-solid fa-pen-to-square"></i>       
        </button>
        <button class="delete-btn" onClick="deleteTask(${task.id}, '${task.taskName}')">
        <i class="fa-solid fa-trash-can"></i>
        </button>
      </li> 
      `;
    ulElement.insertAdjacentHTML("beforeend", liElement);
  }
}

document
  .querySelector("#add-new-task")
  .addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
      document.querySelector("#add-new-task").click();
    }
  });

addTask.addEventListener("click", newTask);

function newTask(event) {
  if (newTaskName.value == "") {
    alert("Please enter task");
  } else {
    if (!isEditTask) {
      tasksList.push({ id: tasksList.length + 1, taskName: newTaskName.value });
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
  newTaskName.classList.add("active");
}

clearBtn.addEventListener("click", function () {
  tasksList.splice(0, tasksList.length);
  displayTask();
});
