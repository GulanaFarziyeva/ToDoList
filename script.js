let taskLists = [];

if (localStorage.getItem("taskLists") !== null) {
  taskLists = JSON.parse(localStorage.getItem("taskLists"));
}

let editId;
let isEditTask = false;

let ulElement = document.querySelector(".task-list-inner");
let newTaskName = document.querySelector(".add-task-input");
let addTaskBtn = document.querySelector(".add-task-btn");
let clearBtn = document.querySelector(".clear-all-btn");


displayTask();

function displayTask() {
  ulElement.innerHTML = "";
  if (taskLists.length == 0) {
    ulElement.innerHTML = `<p>Task List is empty</p>`;
  } else {
    for (let task of taskLists) {
      let completed = task.completed == true ? "checked": "";
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

addTaskBtn.addEventListener("click", newTask);
clearBtn.addEventListener("click", function() {
  taskLists.splice(0, taskLists.length);
  displayTask();
  localStorage.setItem("taskLists", JSON.stringify(taskLists));
})

function newTask(event) {
  if (newTaskName.value == "") {
    alert("Please enter task");
  } else {
    if (!isEditTask) {
       taskLists.push({
        id: taskLists.length + 1,
        taskName: newTaskName.value,
        completed: false
        
      });
    } else {
      taskLists.find(task => {
        task.id == editId
        task.taskName = newTaskName.value
        isEditTask = false;
      }) 
}
    newTaskName.value = "";
    displayTask();
    localStorage.setItem("taskLists", JSON.stringify(taskLists));
  }

  event.preventDefault();
}

function deleteTask(id) {
  let deletedId;
  taskLists.find((task, index )=>{
    task.id == id || deletedId == index
  })

  taskLists.splice(deletedId, 1);
  displayTask();
  localStorage.setItem("taskLists", JSON.stringify(taskLists));
}

function editTask(taskId, taskName) {
  editId = taskId;
  isEditTask = true;
  newTaskName.value = taskName;
  newTaskName.focus();
}

function updateStatus(selectedTask) {
  let label = selectedTask.nextElementSibling;
  let completed;

  if(selectedTask.checked) {
    label.classList.add("checked");
    completed = true;
  } else {
    label.classList.remove("checked");
    completed = false;
  }

  taskLists.find(task => {
    task.id == selectedTask.id 
    task.completed = completed
  })

  displayTask();
  localStorage.setItem("taskLists", JSON.stringify(taskLists));
}
