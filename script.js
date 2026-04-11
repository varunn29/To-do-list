let popUp = document.getElementById("pop-up");
let newTask = document.getElementById("new-task");
let addTask = document.getElementById("add-task");
let heading = document.getElementById("heading");
let overlay = document.getElementById("overlay");

let title = document.getElementById("title");
let date = document.getElementById("date");
let description = document.getElementById("description");
let task = document.getElementById("task");
let editIndex = null;

newTask.addEventListener("click", function () {
    popUp.classList.remove("hide");
    overlay.style.display = "block";
})

overlay.addEventListener("click", function (event) {
    popUp.classList.add("hide")
    overlay.style.display = "none";
})

function showTask(taskData) {
    let taskItem = document.createElement("div");
    taskItem.classList.add("taskItem");

    let divText = document.createElement("div");
    divText.classList.add("text");

    let divHeader = document.createElement("div");
    divHeader.classList.add("header");

    let headingE1 = document.createElement("h2");
    headingE1.textContent = taskData.title;
    divHeader.appendChild(headingE1);

    let para = document.createElement("p");
    para.textContent = taskData.date;
    divHeader.appendChild(para);

    divText.appendChild(divHeader);

    let desc = document.createElement("p");
    desc.textContent = taskData.description;
    divText.appendChild(desc);

    let divButton = document.createElement("div");
    divButton.classList.add("buttons");

    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    divButton.appendChild(editButton);

    editButton.addEventListener("click", function () {
        popUp.classList.remove("hide");
        overlay.style.display = "block";

        title.value = taskData.title;
        date.value = taskData.date;
        description.value = taskData.description;

        let tasks;
        if (localStorage.getItem("tasks")) {
            tasks = JSON.parse(localStorage.getItem("tasks"));
        }
        else {
            tasks = [];
        }

        editIndex = tasks.findIndex(function (t) {
            if (t.title === taskData.title && t.date === taskData.date) {
                return true;
            }
            else {
                return false;
            }
        })
    })

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    divButton.appendChild(deleteButton);

    deleteButton.addEventListener("click", function () {
        taskItem.remove();

        let tasks;
        if (localStorage.getItem("tasks")) {
            tasks = JSON.parse(localStorage.getItem("tasks"));
        }
        else {
            tasks = [];
        }

        let updatedTasks = [];

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].title === taskData.title && tasks[i].date === taskData.date) {
                continue;
            } else {
                updatedTasks.push(tasks[i]);
            }
        }

        tasks = updatedTasks;
        localStorage.setItem("tasks", JSON.stringify(tasks));

    })

    taskItem.appendChild(divText);
    taskItem.appendChild(divButton);

    task.appendChild(taskItem);

}

window.addEventListener("DOMContentLoaded", function () {
    let tasks;
    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    else {
        tasks = [];
    }

    tasks.forEach(function (task) {
        showTask(task);
    })
})

addTask.addEventListener("click", function () {
    let taskData = {
        title: title.value,
        date: date.value,
        description: description.value
    };

    let tasks;
    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    else {
        tasks = [];
    }

    if (editIndex !== null) {
        tasks[editIndex] = taskData;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    else {
        tasks.push(taskData);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    task.innerHTML = "";
    tasks.forEach(function(t){
        showTask(t);
    })

    title.value = "";
    date.value = "";
    description.value = "";

    popUp.classList.add("hide");
    overlay.style.display = "none";
    editIndex = null;
})    
