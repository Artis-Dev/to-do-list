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

  function createTask(projectIndex, title, priority = 0, schedule = 0, link = projectIndex) {
    const newTask = new Task(title, priority, schedule);
    projects.projectsList[projectIndex].tasks.push(newTask);
    if (Number.isNaN(parseInt(link, 10))) {
      dom.changeLink(link);
    } else {
      dom.renderTasks(projectIndex);
    }
  }

  function toggleTask(projectIndex, taskIndex, link = projectIndex) {
    if (projects.projectsList[projectIndex].tasks[taskIndex].done) {
      projects.projectsList[projectIndex].tasks[taskIndex].done = false;
    } else {
      projects.projectsList[projectIndex].tasks[taskIndex].done = true;
    }
    dom.renderTasks(link);
  }

  function editTask(projectIndex, taskIndex, title, priority, schedule, link = projectIndex) {
    projects.projectsList[projectIndex].tasks[taskIndex].title = title;
    projects.projectsList[projectIndex].tasks[taskIndex].priority = priority;
    projects.projectsList[projectIndex].tasks[taskIndex].schedule = schedule;
    dom.renderTasks(link);
  }

  function removeTask(projectIndex, taskIndex, link = projectIndex) {
    projects.projectsList[projectIndex].tasks.splice(taskIndex, 1);
    dom.hideElement(dom.modals);
    dom.renderTasks(link);
  }

  return {
    createTask,
    toggleTask,
    editTask,
    removeTask,
  };
})();

export default tasks;
