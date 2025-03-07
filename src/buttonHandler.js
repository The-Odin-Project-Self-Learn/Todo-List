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
                    showTodos(project);
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

    createProjectList();
}

function createProjectList() {
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
        const projectButtonsDiv = document.createElement('div');
        projectButtonsDiv.id = "project-buttons-div";
        projectListDiv.appendChild(projectButtonsDiv);

        const viewButton = document.createElement('button');
        viewButton.textContent = 'View project';
        viewButton.classList.add("project-buttons");
        viewButton.addEventListener('click', () => {showTodos(project)});
        projectButtonsDiv.appendChild(viewButton);

        const addTodoButton = document.createElement('button');
        addTodoButton.textContent = "Add todo";
        addTodoButton.classList.add("project-buttons");
        addTodoButton.addEventListener('click', (event) => {addTodo(event, project)})
        projectButtonsDiv.appendChild(addTodoButton);
    });
}

/*
Once user hits "add todo", a form should open, allowing the user to enter todo details
*/
function addTodo(event, project) {
    //if a form already exists next to the todo, clear it before creating a new one
    const existingForm = document.getElementById("todo-form");
    const clickedButton = event.target; //the specific "add todo" button that was clicked
    if (existingForm) {
        existingForm.remove();
    }

    const form = document.createElement('form');
    form.id = "todo-form";
    
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "Enter title";
    titleInput.id = "todo-title";
    form.appendChild(titleInput);

    const dueDateInput = document.createElement("input");
    dueDateInput.type = "date";
    dueDateInput.placeholder = "Enter due date";
    dueDateInput.id = "todo-due-date";
    form.appendChild(dueDateInput);

    const submitButton = document.createElement("button");
    submitButton.textContent = "submit";
    submitButton.type = "submit";
    form.appendChild(submitButton);

    //add the form next to the specific "add todo" button that was clicked
    clickedButton.after(form);

    //handle form submission by adding a new Todo item to the relevant project based on inputted form data
    submitButton.addEventListener('click', (e) => {
        e.preventDefault(); //prevent full page reload upon submission

        const todoTitle = titleInput.value.trim();
        const todoDate = dueDateInput.value;

        if (!todoTitle || !todoDate) {
            alert("Please enter both a title and a due date");
            return;
        }

        project.addTodo(todoTitle, todoDate);

        form.remove(); //delete the form after submission
    });
}

/*
When user selects a particular project, show the corresponding to-do items on the page
*/
function showTodos(project) {
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

export {loadHomePage, createProject, loadProjects, showTodos};
