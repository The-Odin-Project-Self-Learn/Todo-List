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
        this.todos.splice(index, 1);
    }
}

export {Project};
