import { createProject, loadProjects } from "./buttonHandler";

const myProjectsButton = document.getElementById('my-projects-button');
myProjectsButton.addEventListener('click', () => {
    loadProjects();
})

const newProjectButton = document.getElementById('new-project-button');
newProjectButton.addEventListener('click', () => {
    createProject();
})


