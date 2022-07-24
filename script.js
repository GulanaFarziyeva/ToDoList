let taskList = JSON.parse(localStorage.getItem("taskList"));

let editId;
let isEditTask = false;

let ulElement = document.querySelector(".task-list-inner");
let newTaskName = document.querySelector(".add-task-input");
let addTaskBtn = document.querySelector(".add-task-btn");
let clearBtn = document.querySelector(".clear-all-btn");


displayTask();

function displayTask() {
  ulElement.innerHTML = "";
  if (taskList.length == 0) {
    ulElement.innerHTML = `<p>Task List is empty</p>`;
  } else {
    for (let task of taskList) {
      let completed = task.completed === true ? "checked": "";
      let liElement = `
         <li class="task-list">
          <input type="checkbox" id="${task.id}" onClick="updateStatus(this)"
          class="task-list-input" ${completed}>
          <label for="${task.id}" class="${completed}">${task.name}</label>
          <button class="edit-btn" onClick='editTask(${task.id},"${task.name}")'>
            <i class="fa-solid fa-pen-to-square"></i>       
          </button>
          <button class="delete-btn" onClick='deleteTask(${task.id}, "${task.name}")'>
          <i class="fa-solid fa-trash-can"></i>
          </button>
        </li> 
        `;
      ulElement.insertAdjacentHTML("beforeend", liElement);
    }
  }
}

addTaskBtn.addEventListener("click", addNewTask);
clearBtn.addEventListener("click", function() {
  taskList.splice(0, taskList.length);
  displayTask();
  localStorage.setItem("taskList", JSON.stringify(taskList));
})

function addNewTask(event) {
  if (newTaskName.value == "") {
    alert("Please enter task");
  } else {
    if (!isEditTask) {
      let task = {
        id: taskList.length + 1,
        name: newTaskName.value,
        completed: false
      }
       taskList.push(task);
    } else {
      taskList.forEach(task => {
      if(task.id === editId){
        task.name = newTaskName.value
        isEditTask = false;
      }
    }) 
}
    newTaskName.value = "";
    displayTask();
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }

  event.preventDefault();
}

function deleteTask(id) {
  let deletedId = taskList.find(task=>{
    task.id === id
  })

  taskList.splice(deletedId, 1);
  displayTask();
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

function editTask(id, name) {
  editId = id;
  isEditTask = true;
  newTaskName.value = name;
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

  taskList.forEach(task =>{
    if(task.id == selectedTask.id) {
      task.completed = completed;
  }
  }) 

  displayTask();
  localStorage.setItem("taskList", JSON.stringify(taskList));
}
