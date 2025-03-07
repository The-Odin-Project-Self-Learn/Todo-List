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

        //add a success message indicating that the project was added along with a button to view the project
        //check to see if the page is populated (say, with list of my projects). if so, clear page before adding msg + button
        if (containerDiv.hasChildNodes()) {
            containerDiv.textContent = '';
        }
        const successDiv = document.createElement('div');
        successDiv.id = "success-div";
        containerDiv.appendChild(successDiv);
        const successMessage = document.createElement('p');
        successMessage.textContent = `${projectName}`;
        successDiv.appendChild(successMessage);
        const viewProjectButton = document.createElement('button');
        viewProjectButton.textContent = "View project";
        viewProjectButton.classList.add("project-buttons");
        successDiv.appendChild(viewProjectButton);

        //remove input field and submit button
        projectNameInput.remove();
        submitBtn.remove();

        //if "view project" button is clicked, load the respective project
        viewProjectButton.addEventListener('click', () => {
            projectList.forEach((project) => {
                if (project.name == projectName) {
                    renderProject(project);
                }
            });
        });
    })
}

/* 
When user clicks "my projects", build a list of the user's projects
*/
function loadProjects() {
    //clear the page
    containerDiv.textContent = '';

    //create list object and add it to page
    const ul = document.createElement('ul');
    ul.textContent = "My Projects: ";
    containerDiv.appendChild(ul);

    //add each project, along with a "view" + "add todo" button, to the list
    projectList.forEach((project) => {
        const projectListDiv = document.createElement('div');
        projectListDiv.id = "project-list-div";
        ul.appendChild(projectListDiv);

        const projectName = document.createElement('p');
        projectName.textContent = `${project.name}`;
        projectListDiv.appendChild(projectName);

        const viewButton = document.createElement('button');
        viewButton.textContent = 'View project';
        viewButton.classList.add("project-buttons");
        viewButton.addEventListener('click', () => {renderProject(project)});
        projectListDiv.appendChild(viewButton);

        const addTodoButton = document.createElement('button');
        addTodoButton.textContent = "Add todo";
        addTodoButton.classList.add("project-buttons");
        projectListDiv.appendChild(addTodoButton);
    });
}

/*
When user selects a particular project, show the corresponding to-do items on the page
*/
function renderProject(project) {
    containerDiv.textContent = '';
    const ul = document.createElement("ul");
    ul.textContent = `${project.name}: `;
    containerDiv.appendChild(ul);

    project.todos.forEach((todo) => {
        const li = document.createElement('li');
        li.textContent = todo.title;
        ul.appendChild(li);
    });
}

export {loadHomePage, createProject, loadProjects, renderProject};
