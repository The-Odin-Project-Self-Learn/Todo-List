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

    //upon form submission, new todo item should be added to the specific project
    submitBtn.addEventListener('click', () => {
        //add new project to list of current projects
        const projectName = projectNameInput.value.trim();
        addProject(projectName);

        //add a success message indicating that the project was added along with a button to view the project
        //check to see if the page is populated (say, with list of my projects). if so, clear page before adding msg + button
        if (containerDiv.hasChildNodes()) {
            containerDiv.textContent = '';
        }
        //create message + buttons container
        const successDiv = document.createElement('div');
        successDiv.id = "success-div";
        containerDiv.appendChild(successDiv);
        const successMessage = document.createElement('p');
        successMessage.textContent = `${projectName}`;
        successDiv.appendChild(successMessage);

        //create project buttons container
        const projectButtonsDiv = document.createElement('div');
        projectButtonsDiv.classList.add("project-buttons-div");
        successDiv.appendChild(projectButtonsDiv);
        //create "view project" button and attach it to button container
        const viewProjectButton = document.createElement('button');
        viewProjectButton.textContent = "View project";
        viewProjectButton.classList.add("project-buttons");
        projectButtonsDiv.appendChild(viewProjectButton);
        //create "add todo" button and attach it to button container
        const addTodoButton = document.createElement('button');
        addTodoButton.textContent = "Add todo";
        addTodoButton.classList.add("project-buttons");
        addTodoButton.addEventListener('click', (event) => { //if particular "add todo" button clicked, add to project
            projectList.forEach((project) => {
                if (project.name == projectName) {
                    addTodo(event, project);
                }
            })
        });
        projectButtonsDiv.appendChild(addTodoButton);

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

        //add the todo to the project's internal storage of todos
        project.addTodo(todoTitle, todoDate);

        form.remove(); //delete the form after submission
    });
}

/*
When user chooses to view a particular project, show the corresponding to-do items on the page
*/
function showTodos(project) {
    containerDiv.textContent = '';

    const ul = document.createElement("ul");

    //create container for the project name and "add todo" button
    const projectNameAndButtonContainer = document.createElement('div');
    projectNameAndButtonContainer.classList.add('project-buttons-div');

    //create project title
    const projectName = document.createElement('p');
    projectName.textContent = project.name;

    //create "add todo" button
    const addTodoButton = document.createElement('button');
    addTodoButton.textContent = "Add todo";
    addTodoButton.classList.add('project-buttons');
    addTodoButton.addEventListener('click', (event) => {
        addTodo(event, project);
    });

    //append everything in order
    containerDiv.appendChild(ul);
    ul.appendChild(projectNameAndButtonContainer);
    projectNameAndButtonContainer.appendChild(projectName);
    projectNameAndButtonContainer.appendChild(addTodoButton);

    //reverse todos before displaying them so that the most newly-created todo appears first
    project.todos.slice().reverse().forEach((todo) => {
        //create container for the todo item title and due date + buttons
        const todoItemDiv = document.createElement("div");
        todoItemDiv.classList.add("todo-item-div");

        //add container to list
        ul.appendChild(todoItemDiv);

        //create todo item title
        const todoItemTitle = document.createElement('p');
        todoItemTitle.textContent = `${todo.title}`;
        todoItemTitle.classList.add("todo-item-content");

        //create container for due date and "remove" button
        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('project-buttons-div');

        //add todo item title and button container to outer container
        todoItemDiv.appendChild(todoItemTitle);
        todoItemDiv.appendChild(buttonsDiv);

        //create due date and remove todo button
        const todoItemDate = document.createElement('p');
        todoItemDate.textContent = `Due: ${todo.dueDate}`;
        todoItemDate.classList.add("todo-item-content");
        const removeTodoButton = document.createElement('button');
        removeTodoButton.textContent = "Remove todo";
        removeTodoButton.classList.add('project-buttons');

        //add due date + remove todo button to container
        buttonsDiv.appendChild(todoItemDate);
        buttonsDiv.appendChild(removeTodoButton);

        //attach event listener to each "remove todo" button
        removeTodoButton.addEventListener('click', (event) => {removeTodo(event, todo, project);});
    });
}

//removes specific todo item from project
function removeTodo(event, todo, project) {
    //remove todo from project's internal list of todos
    project.removeTodo(todo);

    /*
    Remove todo from UI
    */
    //remove the todo item from the list, which involves removing the specific <div> container containing the title + due date
    const clickedRemoveButton = event.target; //identify the specific "remove todo" button which was clicked

    //obtain reference to this particular buttons' parent <div> - the <div> that contains the due date + remove todo button
    const buttonsContainer = clickedRemoveButton.parentElement;

    //obtain reference to the outer <div> containing the buttons <div> and todo item title
    const outerDiv = buttonsContainer.parentElement;

    //remove outer <div> from DOM
    if (outerDiv) {outerDiv.remove()};
}

export {loadHomePage, createProject, loadProjects, showTodos};
