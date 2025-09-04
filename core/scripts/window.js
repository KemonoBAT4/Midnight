// const { remote } = require('electron');

// const dbInstance = remote.getGlobal('db');

// document.addEventListener('DOMContentLoaded', () => {

//     let username = document.querySelector('.user-name');
//     let userrole = document.querySelector('.user-role');

//     // Fetch user data from the server

//     console.log("test")

//     // let user = localStorage.getItem('user');

//     // if (user) {
//     //     user = JSON.parse(user);
//     //     username.textContent = user.name;
//     //     userrole.textContent = user.role;
//     // } else {
//     //     login();
//     // }
//     // loadPage();

// });

// Example usage in your renderer process

// Get all users
async function getAllUsers() {
    try {
        const users = await window.electronAPI.getAllFromTable('users');
        console.log('All users:', users);
        return users;
    } catch (error) {
        console.error('Error getting users:', error);
    }
}

// // Insert a new user
async function addUser(userData) {
    try {
        const newUser = await window.electronAPI.insertRecord('users', userData);
        console.log('New user added:', newUser);
        return newUser;
    } catch (error) {
        console.error('Error adding user:', error);
    }
}

// Update a user
async function updateUser(userId, updateData) {
    try {
        const result = await window.electronAPI.updateRecord('users', userId, updateData);
        console.log('Update result:', result);
        return result;
    } catch (error) {
        console.error('Error updating user:', error);
    }
}

// Delete a user
async function deleteUser(userId) {
    try {
        const result = await window.electronAPI.deleteRecord('users', userId);
        console.log('Delete result:', result);
        return result;
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

// Get table statistics
async function getUsersStats() {
    try {
        const stats = await window.electronAPI.getTableStats('users');
        console.log('Users table stats:', stats);
        return stats;
    } catch (error) {
        console.error('Error getting stats:', error);
    }
}

// Usage examples
async function exampleUsage() {
    // Get all users
    const users = await getAllUsers();
    
    // Add a new user
    const newUser = await addUser({
        username: 'johndoe',
        name: 'John',
        surname: 'Doe',
        email: 'john@example.com'
    });
    
    // Update a user
    if (users && users.length > 0) {
        await updateUser(users[0].id, { name: 'John Updated' });
    }
    
    // Get statistics
    const stats = await getUsersStats();
}

// Call the example
// exampleUsage();

async function login() {

}

async function loadPage() {

    let tasks = [
        {
            "id": 1,
            "title": "Prepare quarterly report",
            "dueDate": "Today, 3:00 PM",
            "completed": false
        },
        {
            "id": 2,
            "title": "Team meeting",
            "dueDate": "Tomorrow, 10:00 AM",
            "completed": false
        },
        {
            "id": 3,
            "title": "Submit expense report",
            "dueDate": "Fri, Aug 25",
            "completed": false
        },
        {
            "id": 4,
            "title": "",
            "dueDate": "Fri, Aug 25",
            "completed": false
        }
    ]

    _loadDashboardTasks(tasks);
    // _loadNotes(notes);
    // loadMeetings(meetings);
    // loadEmails(emails);
}

async function _loadDashboardTasks(tasks) {
    let tasks_container = document.querySelector("#tasks-container");

    /*
    {
        "id": 1,
        "title": "Task 1",
        "content": "Description 1",
        "priority": 1,
        "dueDate": "2023-05-01T12:00:00.000Z",
        "completed": false
    }
    */

    for (let task of tasks) {

        if (task.completed == true) {
            continue;
        }

        // task container
        let task_div = document.createElement("div");
        task_div.className = "task-item p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors flex items-start";

        // task checkbox container
        let task_checkbox = document.createElement("div");
        task_checkbox.className = "flex items-center mt-1";

        // task checkbox input
        let task_checkbox_input = document.createElement("input");
        task_checkbox_input.type = "checkbox";
        task_checkbox_input.className = "rounded text-indigo-600 focus:ring-indigo-500";
        task_checkbox.appendChild(task_checkbox_input);
        task_div.appendChild(task_checkbox);

        // task content container
        let task_content = document.createElement("div");
        task_content.className = "ml-3 flex-1";

        // task title
        let task_title = document.createElement("div");
        task_title.id = "task-title";
        task_title.className = "text-sm font-medium text-gray-900";
        task_title.textContent = task.title;
        task_content.appendChild(task_title);

        // task date container
        let task_date_container = document.createElement("div");
        task_date_container.id = "task-date-container";
        task_date_container.className = "text-xs text-gray-500 flex items-center";
        task_content.appendChild(task_date_container);

        // task date icon
        let task_date_icon = document.createElement("i");
        task_date_icon.className = "fas fa-calendar-day mr-1";
        task_date_container.appendChild(task_date_icon);

        // task date
        let task_date = document.createElement("span");
        task_date.className = "text-xs text-gray-500 flex items-center";
        task_date.textContent = task.dueDate;
        task_date_container.appendChild(task_date);
        task_content.appendChild(task_date_container);
        task_div.appendChild(task_content);

        // task expand button
        let task_expand_button = document.createElement("button");
        task_expand_button.className = "p-1 rounded-full hover:bg-gray-100";

        let task_expand_button_icon = document.createElement("i");
        task_expand_button_icon.className = "fas fa-ellipsis-v text-gray-500";
        task_expand_button.appendChild(task_expand_button_icon);
        task_div.appendChild(task_expand_button);

        task_expand_button.addEventListener("click", function() {
            console.log("Expand task " + task.id);
        });

        tasks_container.appendChild(task_div);
    }
}

async function _loadDashboardNotes(notes) {
    let notes_container = document.querySelector("#notes-container");

    /*
    {
        "id": 1,
    }
    */
}

// DASHBOARD MENU LOADING
