import { addToListOfProjects, projectList } from "./projectManager";

let viewingProject = null;
const containerDiv = document.getElementById('main-container');

function createInputField() {
    //create new input field for project name
    const projectNameInput = document.createElement('input');
    projectNameInput.type = 'text';
    projectNameInput.placeholder = "Enter name of project";
    projectNameInput.id = "project-name-input";

    // Create "create" button
    const createProjectBtn = document.createElement("button");
    createProjectBtn.textContent = "Create";
    createProjectBtn.id = "create-project-btn";

    //insert input field and create button below "new project" button
    const newProjectButton = document.getElementById('new-project-button');
    newProjectButton.after(projectNameInput, createProjectBtn);
}

/* 
Adds project to list of projects
*/
function addProject(projectName) {
    const projectNameInput = document.getElementById('project-name-input');
    const projectName = projectNameInput.value.trim();
    addToListOfProjects(projectName);
}

/*
Visually displays the project with two buttons - "view project", "add todo"
*/
function showProjectName() {
    const projectNameInput = document.getElementById('project-name-input');
    const projectName = projectNameInput.value.trim();
    const createProjectBtn = document.getElementById('create-project-button');

    //clear the screen
    if (containerDiv.hasChildNodes()) {
        containerDiv.textContent = '';
    }
    
    //create project name + buttons container
    const projectNameContainer = document.createElement('div');
    projectNameContainer.id = "project-name-container";
    const name = document.createElement('p');
    name.textContent = `${projectName}`;


    //create project buttons container
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add("project-buttons-div");

    //create "view project" button
    const viewProjectButton = document.createElement('button');
    viewProjectButton.textContent = "View project";
    viewProjectButton.classList.add("project-buttons");
    viewProjectButton.addEventListener('click', () => {
        projectList.forEach((project) => {
            if (project.name == projectName) {
                viewProject(project);
            }
        });
    });

    //create "add todo" button
    const addTodoButton = document.createElement('button');
    addTodoButton.textContent = "Add todo";
    addTodoButton.classList.add("project-buttons");
    addTodoButton.addEventListener('click', (event) => { //if particular "add todo" button clicked, add to project
        projectList.forEach((project) => {
            if (project.name == projectName) {
                addTodo(event, project); //add todo to project's internal storage of todo items
            }
        })
    });

    //append everything in order
    containerDiv.appendChild(projectNameContainer);
    projectNameContainer.appendChild(buttonContainer);
    buttonContainer.appendChild(viewProjectButton);
    buttonContainer.appendChild(addTodoButton);

    //remove form fields
    projectNameInput.remove();
    createProjectBtn.remove();
}

function createListOfProjects() {
    //create list object and add it to page
    const ul = document.createElement('ul');
    ul.textContent = "My Projects: ";
    containerDiv.appendChild(ul);

    projectList.forEach((project) => {
        //div container that stores the project name and the button container
        const projectListDiv = document.createElement('div');
        projectListDiv.id = "project-list-div";
        ul.appendChild(projectListDiv);

        const projectName = document.createElement('p');
        projectName.textContent = `${project.name}`;
        projectListDiv.appendChild(projectName);

        //div container that stores the "view project" and "add todo" buttons
        const projectdueDateAndRemoveButtonContainer = document.createElement('div');
        projectdueDateAndRemoveButtonContainer.id = "project-buttons-div";
        projectListDiv.appendChild(projectdueDateAndRemoveButtonContainer);

        const viewButton = document.createElement('button');
        viewButton.textContent = 'View project';
        viewButton.classList.add("project-buttons");
        viewButton.addEventListener('click', () => {viewProject(project)});
        projectdueDateAndRemoveButtonContainer.appendChild(viewButton);

        const addTodoButton = document.createElement('button');
        addTodoButton.textContent = "Add todo";
        addTodoButton.classList.add("project-buttons");
        addTodoButton.addEventListener('click', (event) => {addTodo(event, project)})
        projectdueDateAndRemoveButtonContainer.appendChild(addTodoButton);
    });
}

function buildForm(clickedButton) {
    const form = document.createElement('form');
    form.id = "todo-form";

    //create form title section
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "Enter title";
    titleInput.id = "todo-title";
    
    //create form due date input section
    const dueDateInput = document.createElement("input");
    dueDateInput.type = "date";
    dueDateInput.placeholder = "Enter due date";
    dueDateInput.id = "todo-due-date";

    //create form submit button
    const submitButton = document.createElement("button");
    submitButton.textContent = "submit";
    submitButton.type = "submit";
    submitButton.id = "submit-button";

    //append everything to the form in order
    form.appendChild(titleInput);
    form.appendChild(dueDateInput);
    form.appendChild(submitButton);

    //add the form next to the specific "add todo" button that was clicked
    clickedButton.after(form);
}


/*
Creates a new Todo object from form data and adds it to project's storage.
If user is currently viewing a project while trying to add a new todo, the project list updates visually
*/
function processForm(project) {
    const todoTitle = titleInput.value.trim();
    const todoDate = dueDateInput.value;
    if (!todoTitle || !todoDate) {
        alert("Please enter both a title and a due date");
        return;
    }

    project.addTodo(todoTitle, todoDate);

    form.remove();

    if (viewingProject ===  project) {
        updateTodoListUI(project);
    }
}

/*
Empties out the container of todos, 
iterates through the project's todos, 
refills the container of todos
*/
function updateTodoListUI(project) {
    //if the div container already exists and contains items, clear it before refilling
    let todoContainer = document.getElementById('todo-div-container');
    if (todoContainer) {
        todoContainer.textContent = '';
    } else {
        todoContainer = document.createElement('div');
        todoContainer.id = 'todo-div-container';
    }
    addTodosToContainer(todoContainer, project);
}

function addTodosToContainer(todoContainer, project) {
    //fill the container with todo items
    project.todos.slice().reverse().forEach((todo) => {
    //create container for the todo item title and due date + buttons
    const todoItemDiv = document.createElement("div");
    todoItemDiv.id = "todo-item-div";

    //create todo item title
    const todoItemTitle = document.createElement('p');
    todoItemTitle.textContent = `${todo.title}`;
    todoItemTitle.classList.add("todo-item-content");

    //create container for due date and "remove" button
    const dueDateAndRemoveButtonContainer = document.createElement('div');
    dueDateAndRemoveButtonContainer.classList.add('due-date-and-remove-button-container');

    //create due date and remove todo button
    const todoItemDate = document.createElement('p');
    todoItemDate.textContent = `Due: ${todo.dueDate}`;
    todoItemDate.classList.add("todo-item-content");
    const removeTodoButton = document.createElement('button');
    removeTodoButton.textContent = "Remove todo";
    removeTodoButton.classList.add('project-buttons');
    removeTodoButton.addEventListener('click', (event) => {removeTodo(event, todo, project);});

    //add todo item to container
    todoContainer.appendChild(todoItemDiv);
    //add todo item title and button container to outer container
    todoItemDiv.appendChild(todoItemTitle);
    todoItemDiv.appendChild(dueDateAndRemoveButtonContainer);
    //add due date + remove todo button to container
    dueDateAndRemoveButtonContainer.appendChild(todoItemDate);
    dueDateAndRemoveButtonContainer.appendChild(removeTodoButton);
    });

    //add todoItem container to main page
    containerDiv.appendChild(todoContainer);
}

export {createInputField, addProject, showProjectName, createListOfProjects, processForm, updateTodoListUI};