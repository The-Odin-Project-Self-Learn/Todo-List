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

export {createNameAndButtonsContainer};