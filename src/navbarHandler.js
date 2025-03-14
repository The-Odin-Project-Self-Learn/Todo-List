import {createInputField, addProject, showProjectName, createListOfProjects} from "./buttonHandler";

function loadHomePage() {
    const containerDiv = document.getElementById('main-container');
    containerDiv.textContent = '';
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
    createListOfProjects();
}


export {loadHomePage, createProject, loadProjects};
