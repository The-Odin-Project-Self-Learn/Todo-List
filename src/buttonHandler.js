import { addToListOfProjects, projectList } from "./projectManager";
import { createViewProjectButton, createAddTodoButton } from "./buttonCreator";
import { createNameAndButtonsContainer, createProjectListContainer, createDueDateAndRemoveButtonContainer } from "./containerCreator";

let viewingProject = null;
const containerDiv = document.getElementById('main-container');

function createInputField() {
    //duplicate input fields should not get created
    if (document.getElementById("project-name-input")) {
        return;
    }
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
function addProject() {
    const projectNameInput = document.getElementById('project-name-input');
    const projectName = projectNameInput.value.trim();
    addToListOfProjects(projectName);
}

/*
Activated when "create" button is clicked
Visually displays the project with two buttons - "view project", "add todo"
*/
function showProjectName() {
    //clear the screen
    if (containerDiv.hasChildNodes()) {
        containerDiv.textContent = '';
    }

    //retrieve value inputted into the "name" input field
    const projectNameInput = document.getElementById('project-name-input');
    const projectName = projectNameInput.value.trim();
   
    const nameAndButtonsContainer = createNameAndButtonsContainer(projectName);
    const buttonContainer = document.createElement('div');
    buttonContainer.id = "project-buttons-container";

    const viewProjectButton = createViewProjectButton();
    viewProjectButton.addEventListener('click', () => {
        projectList.forEach((project) => {
            if (project.name == projectName) {
                viewProject(project);
            }
        });
    });
    const addTodoButton = createAddTodoButton();
    addTodoButton.addEventListener('click', (event) => { //if particular "add todo" button clicked, add to project
        projectList.forEach((project) => {
            if (project.name == projectName) {
                addTodo(event, project); //add todo to project's internal storage of todo items
            }
        })
    });

    //append everything in order
    appendToProjectNameContainer(nameAndButtonsContainer, buttonContainer, viewProjectButton, addTodoButton);

    //remove form fields
    const createProjectBtn = document.getElementById('create-project-btn');
    projectNameInput.remove();
    createProjectBtn.remove();
}

function appendToProjectNameContainer(nameAndButtonsContainer, buttonContainer, viewProjectButton, addTodoButton) {
    containerDiv.appendChild(nameAndButtonsContainer);
    nameAndButtonsContainer.appendChild(buttonContainer);
    buttonContainer.appendChild(viewProjectButton);
    buttonContainer.appendChild(addTodoButton);
}

function createListOfProjects() {
    //create list object and add it to page
    const ul = document.createElement('ul');
    ul.textContent = "My Projects: ";
    containerDiv.appendChild(ul);

    projectList.forEach((project) => {
        const projectListContainer = createProjectListContainer();

        const projectName = document.createElement('p');
        projectName.textContent = `${project.name}`;

        const dueDateAndRemoveButtonContainer = createDueDateAndRemoveButtonContainer();

        const viewButton = createViewProjectButton();
        viewButton.addEventListener('click', () => {viewProject(project)});

        const addTodoButton = createAddTodoButton();
        addTodoButton.addEventListener('click', (event) => {addTodo(event, project)})
        
        ul.appendChild(projectListContainer);
        projectListContainer.appendChild(projectName);
        projectListContainer.appendChild(dueDateAndRemoveButtonContainer);
        dueDateAndRemoveButtonContainer.appendChild(viewButton);
        dueDateAndRemoveButtonContainer.appendChild(addTodoButton);
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
Empties out the container of todos, iterates through the project's todos, then refills the container of todos
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

function createHeaderContainer(todoContainer) {
    const projectTitleContainer = document.createElement('div');
    projectTitleContainer.classList.add('project-title-container');

    //create project title
    const projectName = document.createElement('p');
    projectName.textContent = project.name;

    //create "add todo" button
    const addTodoButton = document.createElement('button');
    addTodoButton.textContent = "Add todo";
    addTodoButton.classList.add('project-buttons');
    addTodoButton.addEventListener('click', (event) => {
        console.log('add todo button clicked!');
        addTodo(event, project);
    });

    //append everything in order
    todoContainer.appendChild(projectTitleContainer);
    projectTitleContainer.appendChild(projectName);
    projectTitleContainer.appendChild(addTodoButton);
}

/*
Adds a new todo item to the given project's internal storage of todo items
*/
function addTodo(event, project) {
    //if a form already exists next to the todo, clear it before creating a new one
    const existingForm = document.getElementById("todo-form");
    if (existingForm) {
        existingForm.remove();
    }

    //build the form next to the button
    const clickedAddTodoButton = event.target; 
    buildForm(clickedAddTodoButton);
    
    //once submitted, process the form by using form details to create a new todo object and add it to the project's internal storage
    const submitButton = document.getElementById("submit-button");
    submitButton.addEventListener('click', () => {
        processForm(project);
    });
}


//removes specific todo item from project
function removeTodo(event, todo, project) {
    //remove todo from project's internal list of todos
    project.removeTodo(todo);

    /*
    Remove todo from UI
    */
    //remove the todo item from the list, which involves removing the specific <div> container containing the title + due date
    const clickedRemoveButton = event.target; //identify the specific "remove todo" button which was clicked

    //obtain reference to this particular buttons' parent <div> - the <div> that contains the due date + remove todo button
    const buttonsContainer = clickedRemoveButton.parentElement;

    //obtain reference to the outer <div> containing the buttons <div> and todo item title
    const outerDiv = buttonsContainer.parentElement;

    //remove outer <div> from DOM
    if (outerDiv) {outerDiv.remove()};
}

/*
When user chooses to view a particular project, show the corresponding to-do items on the page
*/
function viewProject(project) {
    viewingProject = project;

    //check if a container already exists for the to-do items - if not, create a new one
    let todoContainer = document.getElementById('todo-container');
    if (!todoContainer) {
        todoContainer = document.createElement('div');
        todoContainer.id = 'todo-container';
    }
    todoContainer.textContent = '';

    //create container for the project name and "add todo" button
    createHeaderContainer(todoContainer);

    //Add todo list items to container
    updateTodoListUI(project);
}

export {createInputField, addProject, showProjectName, createListOfProjects, processForm, updateTodoListUI, createHeaderContainer};