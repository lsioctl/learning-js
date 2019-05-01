document.addEventListener('DOMContentLoaded', (event) => {
    // The DOM has been loaded.
    // It allows us to parse it and put this script
    // inclusion wherever we want on the HTML page

    // we can use arrow function here as the this
    // will still be window this (parent scope, wich is global scope)

    var taskInput = document.getElementById("new-task");
    var addButton = document.getElementsByTagName("button")[0];

    // console.log(addButton);

    var incompleteTasks = document.getElementById("incomplete-tasks");

    // for (var i = 0; i < incompleteTasks.children.length; i++ ) {
    //     console.log(incompleteTasks.children[i]);
    // }

    function bindAddTaskEvent(button) {
        button.addEventListener("click", addNewTask)
    }

    var addNewTask = function () {
        let ntask = document.getElementById("new-task").value;
        let newNode = document.createElement("li");
        // we use template litterals for multine and
        // string interpolation
        newNode.innerHTML = `<li>
        <input type="checkbox">
        <label> ${ntask} </label>
        <input type="text">
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </li>`
        incompleteTasks.appendChild(newNode); 
    }

    bindAddTaskEvent(addButton);

    


});