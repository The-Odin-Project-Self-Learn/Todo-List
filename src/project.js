class Project {
    constructor(name) {
        this.name = name;
        this.todos = []; //every project starts with an empty set of todos
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(todo) {
        this.todos.splice(index, 1);
    }
}

export {Project};
