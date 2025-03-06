import { projectList } from "./todoManager";

/* 
When user clicks "my projects", build a list of the user's projects
*/
function createProject() {
    const projectNameForm = document.createElement('form');
}

/*
When user clicks "new project", bring up a form for the user to input the project name,
then create a new project and add it to a list of ongoing projects
*/
function loadProjects() {
    const ul = document.createElement('ul');
    ul.textContent = "My Projects: ";
    div.appendChild(ul);
    projectList.forEach(project, () => {
        const li = document.createElement('li');
        li.textContent = `${project.name}`;
        ul.appendChild(li);
    })
}

export {createProject, loadProjects};