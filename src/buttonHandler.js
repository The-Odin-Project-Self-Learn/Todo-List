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

export {createInputField, addProject, showProjectName, createListOfProjects};