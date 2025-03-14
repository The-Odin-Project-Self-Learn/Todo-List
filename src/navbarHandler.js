import {createInputField, addProject, showProjectName, createListOfProjects, processForm, createHeaderContainer} from "./buttonHandler";

function loadHomePage() {
    todoContainer.textContent = '';
}

/*
Activates when "New project" button is clicked
*/
function createProject() {
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
    todoContainer.textContent = '';
    createListOfProjects();
}


export {loadHomePage, createProject, loadProjects};
