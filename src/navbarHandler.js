import {createInputField, addProject, showProjectName, createListOfProjects} from "./buttonHandler";

function loadHomePage() {
    containerDiv.textContent = '';
}

/*
Activates when "New project" button is clicked
*/
function createProject() {
    //duplicate input fields should not get created
    if (document.getElementById("project-name-input")) {
        return;
    }

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
    containerDiv.textContent = '';
    createListOfProjects();
}

/*
Adds a new todo item to the given project's internal storage of todo items
*/
function addTodo(event, project) {
    //if a form already exists next to the todo, clear it before creating a new one
    const existingForm = document.getElementById("todo-form");
    if (existingForm) {
        existingForm.remove();
    }
    const clickedButton = event.target; //the specific "add todo" button that was clicked

    //build the form
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
        console.log('form submitted with todo data!');

        //if the user submits a todo item while viewing the project, update the list of todos for that project
        if (viewingProject ===  project) {
            updateTodoListUI(project);
        }
    });
}

/*
When user chooses to view a particular project, show the corresponding to-do items on the page
*/
function viewProject(project) {
    viewingProject = project;

    containerDiv.textContent = '';

    /*
    set up header for page - includes project name and "add todo" button next to it
    */
    //create container for the project name and "add todo" button
    const projectTitleContainer = document.createElement('div');
    projectTitleContainer.classList.add('project-title-container');
    //create project title
    const projectName = document.createElement('p');
    projectName.textContent = project.name;
    //create "add todo" button
    const addTodoButton = document.createElement('button');
    addTodoButton.textContent = "Add todo";
    addTodoButton.classList.add('project-buttons');
    addTodoButton.addEventListener('click', (event) => {
        console.log('add todo button clicked!');
        addTodo(event, project);
    });
    //append everything in order
    containerDiv.appendChild(projectTitleContainer);
    projectTitleContainer.appendChild(projectName);
    projectTitleContainer.appendChild(addTodoButton);

    /*
    Add todo list items to container
    */
    updateTodoListUI(project);
}

/*
Empties out the container of todos, 
iterates through the project's todos, 
refills the container of todos
*/
function updateTodoListUI(project) {
    //if the div container already exists and contains items, clear it before refilling
    let todoDivContainer = document.getElementById('todo-div-container');
    if (todoDivContainer) {
        todoDivContainer.textContent = '';
    } else {
        todoDivContainer = document.createElement('div');
        todoDivContainer.id = 'todo-div-container';
    }

    //fill the container with todo items
    project.todos.slice().reverse().forEach((todo) => {
        //create container for the todo item title and due date + buttons
        const todoItemDiv = document.createElement("div");
        todoItemDiv.id = "todo-item-div";

        //create todo item title
        const todoItemTitle = document.createElement('p');
        todoItemTitle.textContent = `${todo.title}`;
        todoItemTitle.classList.add("todo-item-content");

        //create container for due date and "remove" button
        const dueDateAndRemoveButtonContainer = document.createElement('div');
        dueDateAndRemoveButtonContainer.classList.add('due-date-and-remove-button-container');

        //create due date and remove todo button
        const todoItemDate = document.createElement('p');
        todoItemDate.textContent = `Due: ${todo.dueDate}`;
        todoItemDate.classList.add("todo-item-content");
        const removeTodoButton = document.createElement('button');
        removeTodoButton.textContent = "Remove todo";
        removeTodoButton.classList.add('project-buttons');
        removeTodoButton.addEventListener('click', (event) => {removeTodo(event, todo, project);});

        //add todo item to container
        todoDivContainer.appendChild(todoItemDiv);
        //add todo item title and button container to outer container
        todoItemDiv.appendChild(todoItemTitle);
        todoItemDiv.appendChild(dueDateAndRemoveButtonContainer);
        //add due date + remove todo button to container
        dueDateAndRemoveButtonContainer.appendChild(todoItemDate);
        dueDateAndRemoveButtonContainer.appendChild(removeTodoButton);
    });
    //add todoItem container to main page
    containerDiv.appendChild(todoDivContainer);
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

export {loadHomePage, createProject, loadProjects, viewProject};
