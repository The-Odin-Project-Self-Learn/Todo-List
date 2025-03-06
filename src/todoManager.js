import { Project } from "./project";

const projectList = [];

function addProject(name) {
    const newProject = new Project(name);
    projectList.push(newProject);
}

function removeProject(index) {
    projectList.splice(index, 1);
}

export {projectList, addProject, removeProject};
