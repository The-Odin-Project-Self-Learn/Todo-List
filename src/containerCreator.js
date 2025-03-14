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
    projectListContainer.id = "project-list-div";
    return projectListContainer;
}

function createDueDateAndRemoveButtonContainer() {
    const dueDateAndRemoveButtonContainer = document.createElement('div');
    dueDateAndRemoveButtonContainer.id = "project-buttons-container";
    return dueDateAndRemoveButtonContainer;
}

export {createNameAndButtonsContainer, createProjectListContainer, createDueDateAndRemoveButtonContainer};