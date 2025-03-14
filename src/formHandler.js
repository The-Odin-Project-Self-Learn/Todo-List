function buildForm(clickedButton) {
    const form = document.createElement('form');
    form.id = "todo-form";

    //create form title section
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "Enter title";
    titleInput.id = "todo-title";
    
    //create form due date input section
    const dueDateInput = document.createElement("input");
    dueDateInput.type = "date";
    dueDateInput.placeholder = "Enter due date";
    dueDateInput.id = "todo-due-date";

    //create form submit button
    const submitButton = document.createElement("button");
    submitButton.textContent = "submit";
    submitButton.type = "submit";
    submitButton.id = "submit-button";

    //append everything to the form in order
    form.appendChild(titleInput);
    form.appendChild(dueDateInput);
    form.appendChild(submitButton);
}

export {buildForm};