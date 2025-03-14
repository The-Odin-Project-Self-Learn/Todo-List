function createViewProjectButton() {
    const viewProjectButton = document.createElement('button');
    viewProjectButton.textContent = "View project";
    viewProjectButton.id = "view-project-button";
    return viewProjectButton;
}

function createAddTodoButton() {
    const addTodoButton = document.createElement('button');
    addTodoButton.textContent = "Add todo";
    addTodoButton.id = "add-todo-button";
    return addTodoButton;
}

function createRemoveTodoButton() {
    const removeTodoButton = document.createElement('button');
    removeTodoButton.id = "remove-todo-button";
    return removeTodoButton;
}

export {createViewProjectButton, createAddTodoButton, createRemoveTodoButton};