import {createInputField, addProject, showProjectName, createListOfProjects, processForm, updateTodoListUI} from "./buttonHandler";

function loadHomePage() {
    containerDiv.textContent = '';
}

/*
Activates when "New project" button is clicked
*/
function createProject() {
    //duplicate input fields should not get created
    if (document.getElementById("project-name-input")) {
        return;
    }

    createInputField();

    const createProjectBtn = document.getElementById('create-project-btn');
    createProjectBtn.addEventListener('click', () => {
        addProject();
        showProjectName();
    });
}

/* 
When user clicks "my projects", build a list of the user's projects
*/
function loadProjects() {
    containerDiv.textContent = '';
    createListOfProjects();
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

/*
When user chooses to view a particular project, show the corresponding to-do items on the page
*/
function viewProject(project) {
    viewingProject = project;

    containerDiv.textContent = '';

    /*
    set up header for page - includes project name and "add todo" button next to it
    */
    //create container for the project name and "add todo" button
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
    containerDiv.appendChild(projectTitleContainer);
    projectTitleContainer.appendChild(projectName);
    projectTitleContainer.appendChild(addTodoButton);

    /*
    Add todo list items to container
    */
    updateTodoListUI(project);
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

export {loadHomePage, createProject, loadProjects, viewProject};
