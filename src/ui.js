import { projectList, addProject, removeProject } from "./todoManager";
import { createProject, loadProjects } from "./buttonHandler";

const div = document.getElementById('main-container');

const myProjectsButton = document.getElementById('my-projects-button');
myProjectsButton.addEventListener('click', () => {
    div.textContent = '';
    loadProjects();
})

const newProjectButton = document.getElementById('new-project-button');
newProjectButton.addEventListener('click', () => {
    createProject();
})

//when user selects a particular project, show the corresponding to-do items on the page
function renderProject(name) {

}

