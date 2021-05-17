import projects from './projects';
import dom from './dom';

const tasks = (() => {
  class Task {
    constructor(title, description, priority, dueDate) {
      this.title = title;
      this.description = description;
      this.priority = priority;
      this.dueDate = dueDate;
      this.done = false;
    }
  }

  function createTask(projectIndex, title, description, priority, dueDate) {
    const newTask = new Task(title, description, priority, dueDate);
    projects.projectsList[projectIndex].tasks.push(newTask);
    console.log(projects.projectsList[projectIndex]);
    dom.renderTasks(0);
  }

  return {
    createTask,
  };
})();

export default tasks;
