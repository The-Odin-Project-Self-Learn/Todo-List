import { loadHomePage, createProject, loadProjects } from "./navbarHandler";

const homeButton = document.getElementById('home-button');
homeButton.addEventListener('click', () => {
    loadHomePage();
})

const myProjectsButton = document.getElementById('my-projects-button');
myProjectsButton.addEventListener('click', () => {
    loadProjects();
})

const newProjectButton = document.getElementById('new-project-button');
newProjectButton.addEventListener('click', () => {
    createProject();
})



