import { Todo } from "./todo";

class Project {
    constructor(name) {
        this.name = name;
        this.todos = []; //every project starts with an empty set of todos
    }

    addTodo(title, dueDate) {
        const todo = new Todo(title, dueDate);
        this.todos.push(todo);
    }

    removeTodo(todo) {
        const index = this.todos.indexOf(todo); //Find the index of the todo
        if (index !== -1) {
            this.todos.splice(index, 1); //Remove it only if it exists
        }
    }
    
}

export {Project};
