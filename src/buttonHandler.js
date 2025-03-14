import { addToListOfProjects, projectList } from "./projectManager";
import { createViewProjectButton, createAddTodoButton, createRemoveTodoButton } from "./buttonCreator";
import { createNameAndButtonsContainer, createProjectListContainer, createDueDateAndRemoveButtonContainer, createHeaderContainer, createTodoItemContainer } from "./containerCreator";
import { buildForm } from "./formHandler";

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
    containerDiv.appendChild(nameAndButtonsContainer);
    nameAndButtonsContainer.appendChild(buttonContainer);
    buttonContainer.appendChild(viewProjectButton);
    buttonContainer.appendChild(addTodoButton);

    //remove form fields
    const createProjectBtn = document.getElementById('create-project-btn');
    projectNameInput.remove();
    createProjectBtn.remove();
}


/*
When user chooses to view a particular project, show the corresponding to-do items on the page
*/
function viewProject(project) {
    viewingProject = project;

    //check if a container already exists for the to-do items - if not, create a new one
    if (containerDiv.hasChildNodes()) {
        containerDiv.textContent = '';
    }

    //create and fill container for the project name and "add todo" button
    const headerContainer = createHeaderContainer();
    const projectName = document.createElement('h3');
    projectName.textContent = project.name;
    projectName.id = "project-name";

    //create "add todo" button
    const addTodoButton = createAddTodoButton();
    addTodoButton.addEventListener('click', (event) => {
        addTodo(event, project);
    });

    containerDiv.appendChild(headerContainer);
    headerContainer.appendChild(projectName);
    headerContainer.appendChild(addTodoButton);

    //Add todo list items to container
    updateTodoListUI(project);
}

/*
Empties out the container of todos, iterates through the project's todos, then refills the container of todos
*/
function updateTodoListUI(project) {
    //if the div container already exists and contains items, clear it before refilling
    let todoContainer = document.getElementById('todo-container');
    if (todoContainer) {
        todoContainer.textContent = '';
    } else {
        todoContainer = document.createElement('div');
        todoContainer.id = 'todo-container';
    }
    containerDiv.appendChild(todoContainer);
    addTodosToContainer(todoContainer, project);
}

function addTodosToContainer(todoContainer, project) {
    project.todos.slice().reverse().forEach((todo) => {
    const todoItemContainer = createTodoItemContainer();

    const todoTitle = document.createElement('p');
    const dueDateAndRemoveButtonContainer = createDueDateAndRemoveButtonContainer();

    todoTitle.textContent = `${todo.title}`;
    todoTitle.classList.add("todo-item-content");

    const todoItemDate = document.createElement('p');
    todoItemDate.textContent = `Due: ${todo.dueDate}`;
    todoItemDate.classList.add("todo-item-content");
    
    const removeTodoButton = createRemoveTodoButton();
    removeTodoButton.addEventListener('click', (event) => {removeTodo(event, todo, project);});

    //add todo item to container
    todoContainer.appendChild(todoItemContainer);
    todoItemContainer.appendChild(todoTitle);
    todoItemContainer.appendChild(dueDateAndRemoveButtonContainer);
    dueDateAndRemoveButtonContainer.appendChild(todoItemDate);
    dueDateAndRemoveButtonContainer.appendChild(removeTodoButton);
    });
}

function createListOfProjects() {
    viewingProject = null;
    
    containerDiv.textContent = '';

    const ul = document.createElement('ul');
    ul.textContent = "My Projects: ";

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
    containerDiv.appendChild(ul);
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
    const form = buildForm(clickedAddTodoButton);
    clickedAddTodoButton.after(form);
    
    //once submitted, process the form by using form details to create a new todo object and add it to the project's internal storage
    const submitButton = document.getElementById("submit-button");
    submitButton.addEventListener('click', () => {
        const todoTitle = document.getElementById('todo-title').value.trim();
        const todoDate = document.getElementById('todo-due-date').value;
        if (!todoTitle || !todoDate) {
            alert("Please enter both a title and a due date");
            return;
        }
        project.addTodo(todoTitle, todoDate);
        form.remove();
        if (viewingProject ===  project) {
            updateTodoListUI(project);
        }
    });
}

function removeTodo(event, todo, project) {
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


export {createInputField, addProject, showProjectName, createListOfProjects, updateTodoListUI, createHeaderContainer};