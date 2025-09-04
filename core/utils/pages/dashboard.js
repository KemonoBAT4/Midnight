
async function loadDashboardPage() {

    let container = document.querySelector("#dashboard-content-container");

    // loads the dashboard items
    _loadDashboardWelcomeCard(container, {name: "Kemono_BAT_4"}, "You have 3 tasks to complete today. Ready to be productive?");

    let quick_actions = [
        {
            "title": "Schedule Meeting",
            "subtitle": "Set up appointments",
        },
        {
            "title": "Add Task",
            "subtitle": "Create reminders",
        },
        {
            "title": "Check Email",
            "subtitle": "5 new messages",
        },
        {
            "title": "Weather",
            "subtitle": "Sunny, 22°C",
        }
    ]

    _loadDashboardQuickActions(container, quick_actions);

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

    let actual_content_container = document.createElement("div");
    actual_content_container.id = "actual-main-content-container";
    actual_content_container.className = "grid grid-cols-1 lg:grid-cols-2 gap-6";

    container.append(actual_content_container);


    _loadDashboardTasks(actual_content_container, tasks);

    _loadTempRecentActivities(actual_content_container);
}

//#############
//# UTILITIES #
//#region #####

/**
 * creates the welcome card container and adds it to the parent container
 * @param {Element} container the parent container element to add the welcome card
 * @param {JSON} user the user object from the database
 * @param {string} message subtitle message for the welcome card
 */
async function _loadDashboardWelcomeCard(container, user, message) {
    let dashboard_welcome_card_container = document.createElement("div");
    dashboard_welcome_card_container.id = "dashboard-welcome-card";
    dashboard_welcome_card_container.className = "bg-white rounded-xl shadow-sm p-6 mb-6";

    // this is not the best way to do this
    dashboard_welcome_card_container.innerHTML = `
        <div class="flex items-start justify-between">
            <div>
                <h2 class="text-2xl font-semibold mb-2">Welcome back, ${user.name}!</h2>
                <p class="text-gray-500 mb-4">${message}</p>
                <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <i class="fas fa-microphone"></i>
                    <span>Start with voice</span>
                </button>
            </div>
            <img src="https://placehold.co/200x200" alt="Digital assistant illustration - A friendly animated assistant character holding a calendar" class="w-32 h-32">
        </div>
    `;

    container.append(dashboard_welcome_card_container);
}

/**
 * creates the quick actions container and adds it to the parent container
 * @param {Element} container the parent container element to add the quick actions
 * @param {JSON} actions the actions array of objects
 */
async function _loadDashboardQuickActions(container, actions) {
    let dashboard_quick_actions_container = document.createElement("div");
    dashboard_quick_actions_container.id = "dashboard-quick-actions";
    dashboard_quick_actions_container.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6";

    let quick_action_html = ``;

    for (let action of actions) {
        quick_action_html += `
            <div class="bg-white rounded-xl shadow-sm p-4 flex items-center space-x-3 cursor-pointer hover:bg-indigo-50 transition-colors">
                <div class="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <i class="fas fa-calendar text-indigo-600"></i>
                </div>
                <div>
                    <div class="font-medium">${action.title}</div>
                    <div class="text-xs text-gray-500">${action.subtitle}</div>
                </div>
            </div>
        `;
    }
    dashboard_quick_actions_container.innerHTML = quick_action_html;

    container.append(dashboard_quick_actions_container);
}

async function _loadDashboardTasks(container, tasks) {
    let upcoming_tasks_container = document.createElement("div");
    upcoming_tasks_container.id = "upcoming-tasks-container";
    upcoming_tasks_container.className = "bg-white rounded-xl shadow-sm p-6";

    // tasks header
    let tasks_header = document.createElement("div");
    tasks_header.className = "flex items-center justify-between mb-4";
    tasks_header.innerHTML = `
        <h3 class="font-semibold">Upcoming Tasks</h3>
        <button class="text-sm text-indigo-600 hover:text-indigo-800">View All</button>
    `;
    upcoming_tasks_container.append(tasks_header);

    // creates the tasks list
    _loadDashboardTasksItems(upcoming_tasks_container, tasks);

    // tasks footer
    let tasks_footer = document.createElement("div");
    tasks_footer.className = "mt-4 pt-3 border-t border-gray-100";
    tasks_footer.innerHTML = `
        <div class="flex items-center space-x-2 text-sm text-indigo-600 cursor-pointer">
            <i class="fas fa-plus"></i>
            <span>Add new task</span>
        </div>
    `;
    upcoming_tasks_container.append(tasks_footer);

    container.append(upcoming_tasks_container);
}

async function _loadTempRecentActivities(container) {
    let recent_activities_container = document.createElement("div");
    recent_activities_container.id = "recent-activities-container";
    recent_activities_container.className = "bg-white rounded-xl shadow-sm p-6";

    recent_activities_container.innerHTML = `                        <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold">Recent Activity</h3>
            <button class="text-sm text-indigo-600 hover:text-indigo-800">View All</button>
        </div>

        <div class="space-y-4">
            <div class="flex items-start">
                <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                    <i class="fas fa-calendar text-indigo-600"></i>
                </div>
                <div>
                    <div class="text-sm">Meeting scheduled with client</div>
                    <div class="text-xs text-gray-500">Today, 9:15 AM</div>
                </div>
            </div>

            <div class="flex items-start">
                <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <i class="fas fa-check text-green-600"></i>
                </div>
                <div>
                    <div class="text-sm">Completed "Project Review" task</div>
                    <div class="text-xs text-gray-500">Today, 8:45 AM</div>
                </div>
            </div>

            <div class="flex items-start">
                <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <i class="fas fa-cloud text-blue-600"></i>
                </div>
                <div>
                    <div class="text-sm">Weather alert: Rain expected tomorrow</div>
                    <div class="text-xs text-gray-500">Today, 7:30 AM</div>
                </div>
            </div>

            <div class="flex items-start">
                <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <i class="fas fa-envelope text-purple-600"></i>
                </div>
                <div>
                    <div class="text-sm">New email from Jane Smith</div>
                    <div class="text-xs text-gray-500">Yesterday, 5:20 PM</div>
                </div>
            </div>
        </div>
    `;

    container.append(recent_activities_container);
}

async function _loadDashboardTasksItems(container, tasks) {
    let tasks_container = document.createElement("div");
    tasks_container.id = "tasks-container";
    tasks_container.className = "space-y-3";

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

    container.append(tasks_container);
}

//#endregion ##