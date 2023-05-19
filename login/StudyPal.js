function addTask() {
    var taskInput = document.getElementById("taskinput");
    var task = taskInput.value;
    var todoList = document.getElementById("todays-tasks");
    if (task !== "") {
        var newTask = document.createElement("li");
        newTask.textContent = task;
        todoList.appendChild(newTask);
        taskInput.value = "";
    }

}
