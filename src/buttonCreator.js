function createViewProjectButton(projectName) {
    const viewProjectButton = document.createElement('button');
    viewProjectButton.textContent = "View project";
    viewProjectButton.id = "view-project-button";
    viewProjectButton.addEventListener('click', () => {
        projectList.forEach((project) => {
            if (project.name == projectName) {
                viewProject(project);
            }
        });
    });
    return viewProjectButton;
}

function createAddTodoButton(projectName) {
    const addTodoButton = document.createElement('button');
    addTodoButton.textContent = "Add todo";
    addTodoButton.id = "add-todo-button";
    addTodoButton.addEventListener('click', (event) => { //if particular "add todo" button clicked, add to project
        projectList.forEach((project) => {
            if (project.name == projectName) {
                addTodo(event, project); //add todo to project's internal storage of todo items
            }
        })
    });
    return addTodoButton;
}

export {createViewProjectButton, createAddTodoButton};