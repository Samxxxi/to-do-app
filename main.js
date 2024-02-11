console.log('system connected');

// Initialize a variable to keep track of the number of tasks
var taskCount = 0;

// Check if there is any data stored in local storage
var storedTasks = localStorage.getItem('tasks');
if (storedTasks) {
    // If data is stored, parse it and update the UI
    var tasks = JSON.parse(storedTasks);
    tasks.forEach(function(task) {
        addTaskToUI(task);
        taskCount++;
    });
}

document.getElementById('btn').addEventListener('click', () => {
    console.log('clicked');
    // Get the value from the input box
    var text = document.getElementById('input-box').value.trim();
    console.log(text);

    // Check if the input is not empty and the task count is less than 3
    if (text !== "" && taskCount < 3) {
        addTaskToUI(text);

        // Save the task to local storage
        saveTask(text);

        // Increment the task count
        taskCount++;

        // Clear the input box after adding the item
        document.getElementById('input-box').value = "";
    } else if (taskCount >= 3) {
        // Display an error message if the user tries to add more than 3 tasks
        alert("You can only add up to three tasks.");
    } else {
        console.log('Empty input');
    }
});

function addTaskToUI(text) {
    var listItem = document.createElement('li');
    var textNode = document.createTextNode(text);
    listItem.appendChild(textNode);

    listItem.addEventListener('click', function() {
        var listItemToRemove = this;
        setTimeout(function() {
            listItemToRemove.parentNode.removeChild(listItemToRemove); // Remove the clicked list item after 3 seconds
            taskCount--; // Decrement the task count
            updateLocalStorage(); // Update local storage after removing the task
        }, 3000); // 3-second delay
        this.classList.add('checked'); // Add the 'checked' class immediately
    });

    var output = document.getElementById('List-container');
    output.appendChild(listItem);
}

function saveTask(task) {
    var tasks = [];
    var storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateLocalStorage() {
    var tasks = [];
    document.querySelectorAll('#List-container li').forEach(function(task) {
        tasks.push(task.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

