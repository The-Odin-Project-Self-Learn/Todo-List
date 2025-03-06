import { projectList, addProject, removeProject } from "./projectManager";

const containerDiv = document.getElementById('main-container');

/*
When user clicks "new project", bring up a form for the user to input the project name,
then create a new project and add it to a list of ongoing projects
*/
function createProject() {
    const projectNameForm = document.createElement('form');
}

/* 
When user clicks "my projects", build a list of the user's projects
*/
function loadProjects() {
    containerDiv.textContent = '';
    const ul = document.createElement('ul');
    ul.textContent = "My Projects: ";
    containerDiv.appendChild(ul);

    projectList.forEach(project, () => {
        const li = document.createElement('li');
        li.addEventListener('click', () => {renderProject(project)});
        li.textContent = `${project.name}`;
        li.id = `${project.name}`;
        ul.appendChild(li);
    })
}

/*
When user selects a particular project, show the corresponding to-do items on the page
*/
function renderProject(project) {
    containerDiv.textContent = '';
    const ul = document.createElement(ul);
    ul.textContent = `Project ${project.name}: `;
    containerDiv.appendChild(ul);

    project.todos.forEach(todo, () => {
        const li = document.createElement('li');
        li.textContent = todo.title;
        ul.appendChild(li);
    });
}

export {createProject, loadProjects};