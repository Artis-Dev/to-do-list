import projects from './projects';
import dom from './dom';

const tasks = (() => {
  class Task {
    constructor(title, priority, schedule) {
      this.title = title;
      this.priority = priority;
      this.schedule = schedule;
      this.done = false;
    }
  }

  function createTask(projectIndex, title, priority = 0, schedule = 0) {
    const newTask = new Task(title, priority, schedule);
    projects.projectsList[projectIndex].tasks.push(newTask);
    dom.renderTasks(projectIndex);
  }

  function toggleTask(projectIndex, taskIndex) {
    if (projects.projectsList[projectIndex].tasks[taskIndex].done) {
      projects.projectsList[projectIndex].tasks[taskIndex].done = false;
    } else {
      projects.projectsList[projectIndex].tasks[taskIndex].done = true;
    }
    console.log(projects.projectsList[projectIndex].tasks[taskIndex].done);
    dom.renderTasks(projectIndex);
  }

  function editTask(projectIndex, taskIndex, title, priority, schedule) {
    projects.projectsList[projectIndex].tasks[taskIndex].title = title;
    projects.projectsList[projectIndex].tasks[taskIndex].priority = priority;
    projects.projectsList[projectIndex].tasks[taskIndex].schedule = schedule;
    dom.renderTasks(projectIndex);
  }

  function removeTask(projectIndex, taskIndex) {
    projects.projectsList[projectIndex].tasks.splice(taskIndex, 1);
    dom.hideElement(dom.modals);
    dom.renderTasks(projectIndex);
  }

  return {
    createTask,
    toggleTask,
    editTask,
    removeTask,
  };
})();

export default tasks;
