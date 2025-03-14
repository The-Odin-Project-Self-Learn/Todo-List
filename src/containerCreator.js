//creates container for project name and "view project" + "add todo" buttons
function createNameAndButtonsContainer(projectName) {
    const nameAndButtonsContainer = document.createElement('div');
    nameAndButtonsContainer.id = "project-container";
    const name = document.createElement('p');
    name.id = "project-name";
    name.textContent = `${projectName}`;

    //append the name to the container
    nameAndButtonsContainer.appendChild(name);

    return nameAndButtonsContainer;
}

function createProjectListContainer() {
    const projectListContainer = document.createElement('div');
    projectListContainer.id = "project-list-container";
    return projectListContainer;
}

function createDueDateAndRemoveButtonContainer() {
    const dueDateAndRemoveButtonContainer = document.createElement('div');
    dueDateAndRemoveButtonContainer.id = "project-buttons-container";
    return dueDateAndRemoveButtonContainer;
}

function createHeaderContainer() {
    const projectTitleContainer = document.createElement('div');
    projectTitleContainer.classList.add('project-title-container');
    return projectTitleContainer;
}

//creates container for the todo item title and due date + buttons
function createTodoItemContainer() {
    const todoItemContainer = document.createElement("div");
    todoItemDiv.id = "todo-item-container";
    return todoItemContainer;
}

export {createNameAndButtonsContainer, createProjectListContainer, createDueDateAndRemoveButtonContainer, createHeaderContainer, createTodoItemContainer};