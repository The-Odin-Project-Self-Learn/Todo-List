import { projectList, addProject, removeProject } from "./projectManager";

const containerDiv = document.getElementById('main-container');

function loadHomePage() {
    containerDiv.textContent = '';
}

/*
When user clicks "new project", bring up a form for the user to input the project name,
then create a new project and add it to a list of ongoing projects
*/
function createProject() {
    //if user clicks "new project" repeatedly, duplicate input fields should not get created
    if (document.getElementById("project-name-input")) {
        return;
    }

    //create new input field for project name
    const projectNameInput = document.createElement('input');
    projectNameInput.type = 'text';
    projectNameInput.placeholder = "Enter name of project";
    projectNameInput.id = "project-name-input";

    // Create submit button
    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Create";
    submitBtn.id = "submit-project-btn";

    //insert input field and submit button below "new project" button
    const newProjectButton = document.getElementById('new-project-button');
    newProjectButton.after(projectNameInput, submitBtn);

    //add the project to the library after user hits submit
    submitBtn.addEventListener('click', () => {
        //add new project to list of current projects
        const projectName = projectNameInput.value.trim();
        addProject(projectName);

        const successMessage = document.createElement('p');
        successMessage.textContent = "Project added!";
        submitBtn.after(successMessage);
        
        //remove input field and submit button
        projectNameInput.remove();
        submitBtn.remove();
    })
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

export {loadHomePage, createProject, loadProjects, renderProject};
