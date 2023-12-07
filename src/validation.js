import projects from './projects';
import tasks from './tasks';
import dom from './dom';

const validation = (() => {
  function addProject(event) {
    const projectTitle = document.forms['project-form']['project-title'].value;
    const projectIcon = document.forms['project-form']['project-icon'].value;
    const projectColor = document.forms['project-form']['project-color'].value;

    event.preventDefault();

    if (projectTitle !== '') {
      projects.createProject(projectTitle, projectIcon, projectColor);
      dom.hideElement(dom.formProjectTitleError);
      dom.hideElement(dom.modals);
    } else if (projectTitle === '') {
      dom.showElement(dom.formProjectTitleError);
    }
  }

  function editProject(event, index, link) {
    const projectTitle = document.forms['project-form']['project-title'].value;
    const projectIcon = document.forms['project-form']['project-icon'].value;
    const projectColor = document.forms['project-form']['project-color'].value;

    event.preventDefault();

    if (projectTitle !== '') {
      projects.editProject(
        index,
        projectTitle,
        projectIcon,
        projectColor,
        link,
      );
      dom.hideElement(dom.formProjectTitleError);
      dom.hideElement(dom.modals);
    } else if (projectTitle === '') {
      dom.showElement(dom.formProjectTitleError);
    }
  }

  function addTask(event, projectIndex) {
    const taskTitle = document.forms['task-form']['task-title'].value;
    const taskPriority = document.forms['task-form']['task-priority'].value;
    const taskSchedule = document.forms['task-form']['task-schedule'].value;
    const link = document
      .querySelector('.add-task-modal')
      .getAttribute('data-project-index');
    let taskProject;
    if (Number.isNaN(projectIndex)) {
      taskProject = parseInt(
        document.forms['task-form']['task-project'].value,
        10,
      );
    } else {
      taskProject = projectIndex;
    }

    event.preventDefault();

    if (taskTitle !== '' && !Number.isNaN(taskProject)) {
      tasks.createTask(
        taskProject,
        taskTitle,
        taskPriority,
        taskSchedule,
        link,
      );
      dom.hideElement(dom.formTaskTitleError);
      dom.hideElement(dom.formTaskProjectError);
      dom.hideElement(dom.modals);
    } else if (taskTitle === '') {
      dom.showElement(dom.formTaskTitleError);
    } else {
      dom.hideElement(dom.formTaskTitleError);
    }
    if (Number.isNaN(taskProject)) {
      dom.showElement(dom.formTaskProjectError);
    } else {
      dom.hideElement(dom.formTaskProjectError);
    }
  }

  function editTask(event, projectIndex, taskIndex, link) {
    const taskTitle = document.forms['task-form']['task-title'].value;
    const taskPriority = document.forms['task-form']['task-priority'].value;
    const taskSchedule = document.forms['task-form']['task-schedule'].value;

    event.preventDefault();

    if (taskTitle !== '') {
      tasks.editTask(
        projectIndex,
        taskIndex,
        taskTitle,
        taskPriority,
        taskSchedule,
        link,
      );
      dom.hideElement(dom.formTaskTitleError);
      dom.hideElement(dom.modals);
    } else if (taskTitle === '') {
      dom.showElement(dom.formTaskTitleError);
    }
  }

  return {
    addProject,
    editProject,
    addTask,
    editTask,
  };
})();

export default validation;
