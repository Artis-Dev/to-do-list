import projects from './projects';

const dom = (() => {
  const body = document.querySelector('body');
  const sidebar = document.querySelector('.sidebar');
  const main = document.querySelector('main');
  const projectsList = document.querySelector('.sidebar-projects-list');
  const tasksList = document.querySelector('.todo-item-list');
  const projectModal = document.querySelector('#project-modal');
  const taskModal = document.querySelector('#task-modal');
  const confirmModal = document.querySelector('#confirm-modal');
  const modals = document.querySelectorAll('.modal');
  const projectForm = document.querySelector('#project-form');
  const taskForm = document.querySelector('#task-form');
  const formProjectTitleError = document.querySelector('.project-title-error');
  const formTaskTitleError = document.querySelector('.task-title-error');

  function responsiveSidebar() {
    if (window.innerWidth <= 960) {
      sidebar.classList.remove('sidebar-show');
      sidebar.classList.add('sidebar-hide');
      main.classList.add('main-mobile');
    } else {
      sidebar.classList.remove('sidebar-hide');
      sidebar.classList.add('sidebar-show');
      main.classList.remove('main-mobile');
    }
  }

  function toggleSidebar() {
    if (!sidebar.classList.contains('sidebar-show')) {
      sidebar.classList.remove('sidebar-hide');
      sidebar.classList.add('sidebar-show');
    } else if (sidebar.classList.contains('sidebar-show')) {
      sidebar.classList.remove('sidebar-show');
      sidebar.classList.add('sidebar-hide');
    }
  }

  function showProjectModal(modal, index = false) {
    const modalHeading = document.querySelector('.project-modal-title');
    const modalSubmitButton = document.querySelector('#project-button');

    projectModal.classList.remove('hide');
    projectModal.classList.add('display');

    if (modal === 'addProject') {
      projectForm.reset();
      modalHeading.textContent = 'New project';
      modalSubmitButton.textContent = 'Add';
      modalSubmitButton.classList.remove('edit-project');
      modalSubmitButton.classList.add('add-project');
    } else if (modal === 'editProject') {
      const currentProjectTitle = projects.projectsList[index].title;
      const currentProjectIcon = projects.projectsList[index].icon;
      const currentProjectColor = projects.projectsList[index].color;

      const projectTitle = document.querySelector('#form-project-title');
      const projectIcon = document.querySelector(`input[value=${currentProjectIcon}]`);
      const projectColor = document.querySelector(`input[value=${currentProjectColor}]`);

      projectTitle.value = currentProjectTitle;
      projectIcon.checked = true;
      projectColor.checked = true;

      modalHeading.textContent = 'Edit project';
      modalSubmitButton.textContent = 'Edit';
      modalSubmitButton.classList.remove('add-project');
      modalSubmitButton.classList.add('edit-project');
    }
  }

  function showTaskModal(modal, projectIndex = false, taskIndex = false) {
    const modalHeading = document.querySelector('.task-modal-title');
    const modalSubmitButton = document.querySelector('#task-button');

    taskModal.classList.remove('hide');
    taskModal.classList.add('display');

    if (modal === 'addTask') {
      taskForm.reset();
      modalHeading.textContent = 'New task';
      modalSubmitButton.textContent = 'Add';
      modalSubmitButton.classList.remove('edit-task');
      modalSubmitButton.classList.add('add-task');
    } else if (modal === 'editTask') {
      const currentTaskTitle = projects.projectsList[projectIndex].tasks[taskIndex].title;
      const currentTaskPriority = projects.projectsList[projectIndex].tasks[taskIndex].priority;
      const currentTaskSchedule = projects.projectsList[projectIndex].tasks[taskIndex].schedule;

      const taskTitle = document.querySelector('#form-task-title');
      const taskPriority = document.querySelector('#form-task-priority');
      const taskSchedule = document.querySelector('#form-task-schedule');

      taskTitle.value = currentTaskTitle;
      taskPriority.value = currentTaskPriority;
      taskSchedule.value = currentTaskSchedule;

      modalHeading.textContent = 'Edit project';
      modalSubmitButton.textContent = 'Edit';
      modalSubmitButton.classList.remove('add-task');
      modalSubmitButton.classList.add('edit-task');
    }
  }

  function showConfirmModal(modal, projectIndex, taskIndex) {
    const modalHeading = document.querySelector('.confirm-modal-title');
    const modalContent = document.querySelector('.confirm-modal-content');
    const modalSubmitButton = document.querySelector('#confirm-button');
    const modalContentPrefix = document.createTextNode('You are going to remove ');
    const modalContentPostfix = document.createTextNode('. This action cannot be undone.');
    const title = document.createElement('span');

    confirmModal.classList.remove('hide');
    confirmModal.classList.add('display');

    title.classList.add('confirm-modal-title');

    modalContent.textContent = '';

    if (modal === 'removeProject') {
      modalHeading.textContent = 'Remove project';
      title.textContent = projects.projectsList[projectIndex].title;
      modalContent.appendChild(modalContentPrefix);
      modalContent.appendChild(title);
      modalContent.appendChild(modalContentPostfix);
      modalSubmitButton.classList.remove('remove-task');
      modalSubmitButton.classList.add('remove-project');
    } else if (modal === 'removeTask') {
      modalHeading.textContent = 'Remove task';
      title.textContent = projects.projectsList[projectIndex].tasks[taskIndex].title;
      modalContent.appendChild(modalContentPrefix);
      modalContent.appendChild(title);
      modalContent.appendChild(modalContentPostfix);
      modalSubmitButton.classList.remove('remove-project');
      modalSubmitButton.classList.add('remove-task');
    }
  }

  function showElement(element) {
    element.classList.remove('hide');
    element.classList.add('display');
  }

  function hideElement(modal) {
    if (Object.prototype.isPrototypeOf.call(NodeList.prototype, modal)) {
      modal.forEach((element) => {
        element.classList.remove('display');
        element.classList.add('hide');
      });
    } else {
      modal.classList.remove('display');
      modal.classList.add('hide');
    }
  }

  function activeLink(link) {
    const navLinks = document.querySelectorAll('a.sidebar-link');
    navLinks.forEach((elem) => {
      elem.classList.remove('active');
    });
    if (link.classList.contains('sidebar-link-icon')) {
      link.parentElement.classList.add('active');
    } else {
      link.classList.add('active');
    }
  }

  function renderProjects() {
    // Create link
    projectsList.textContent = '';
    for (let i = 0; i < projects.projectsList.length; i += 1) {
      const projectLink = document.createElement('a');
      projectLink.classList.add('sidebar-project');
      projectLink.setAttribute('href', '#');
      projectLink.setAttribute('data-index', i);
      projectsList.appendChild(projectLink);
      // Create icon
      const projectIcon = document.createElement('i');
      projectIcon.classList.add('far', projects.projectsList[i].icon, 'fa-fw', projects.projectsList[i].color, 'sidebar-project', 'sidebar-project-icon');
      projectLink.appendChild(projectIcon);
      // Create title
      const projectTitle = document.createTextNode(projects.projectsList[i].title);
      projectLink.appendChild(projectTitle);
      // Create remove icon
      const projectRemoveIcon = document.createElement('i');
      projectRemoveIcon.classList.add('far', 'fa-trash', 'remove-project-modal');
      projectLink.appendChild(projectRemoveIcon);
      // Create edit icon
      const projectEditIcon = document.createElement('i');
      projectEditIcon.classList.add('far', 'fa-edit', 'edit-project-modal');
      projectLink.appendChild(projectEditIcon);
    }
  }

  function selectProject(projectIndex) {
    if (projects.projectsList.length >= 1) {
      const projectLinks = document.querySelectorAll('a.sidebar-project');
      projectLinks.forEach((elem) => {
        elem.classList.remove('active');
      });
      projectLinks[projectIndex].classList.add('active');
    }
  }

  function renderHeader(projectIndex) {
    const headerNav = document.querySelector('.todo-header-nav');
    const headerProject = document.querySelector('.todo-header-project');

    if (projects.projectsList.length >= 1) {
      headerProject.textContent = projects.projectsList[projectIndex].title;
      headerNav.textContent = 'Inbox';
    } else {
      headerProject.textContent = '';
      headerNav.textContent = 'Inbox';
    }
  }

  function renderTasks(projectIndex) {
    tasksList.textContent = '';
    if (projects.projectsList.length >= 1) {
      for (let i = 0; i < projects.projectsList[projectIndex].tasks.length; i += 1) {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item', 'toggle-task');
        todoItem.setAttribute('data-project-index', projectIndex);
        todoItem.setAttribute('data-task-index', i);
        tasksList.appendChild(todoItem);
        // Create icon
        const taskIcon = document.createElement('i');
        taskIcon.classList.add('far', 'fa-fw', 'toggle-task');
        if (projects.projectsList[projectIndex].tasks[i].priority === 'low') {
          taskIcon.classList.add('project-green');
        } else if (projects.projectsList[projectIndex].tasks[i].priority === 'medium') {
          taskIcon.classList.add('project-yellow');
        } else if (projects.projectsList[projectIndex].tasks[i].priority === 'high') {
          taskIcon.classList.add('project-red');
        } else {
          taskIcon.classList.add('project-grey');
        }
        todoItem.appendChild(taskIcon);
        // Create title
        const taskTitle = document.createElement('p');
        taskTitle.classList.add('todo-item-title', 'toggle-task');
        taskTitle.textContent = projects.projectsList[projectIndex].tasks[i].title;
        if (projects.projectsList[projectIndex].tasks[i].done === true) {
          taskIcon.classList.add('fa-check-circle');
          taskTitle.classList.add('done');
        } else {
          taskIcon.classList.add('fa-circle');
          taskTitle.classList.remove('done');
        }
        todoItem.appendChild(taskTitle);
        // Create date
        if (projects.projectsList[projectIndex].tasks[i].schedule !== '') {
          const taskDate = document.createElement('p');
          taskDate.classList.add('todo-item-date', 'todo-item-pill', 'toggle-task');
          taskDate.textContent = projects.projectsList[projectIndex].tasks[i].schedule;
          todoItem.appendChild(taskDate);
        }
        // Create project name
        const taskProject = document.createElement('p');
        taskProject.classList.add('todo-item-pill', `${projects.projectsList[projectIndex].color}-background`, 'toggle-task');
        taskProject.textContent = projects.projectsList[projectIndex].title;
        todoItem.appendChild(taskProject);
        // Create edit icon
        const taskEditIcon = document.createElement('i');
        taskEditIcon.classList.add('far', 'fa-edit', 'fa-fw', 'edit-task-modal');
        todoItem.appendChild(taskEditIcon);
        // Create remove icon
        const taskRemoveIcon = document.createElement('i');
        taskRemoveIcon.classList.add('far', 'fa-trash', 'fa-fw', 'remove-task-modal');
        todoItem.appendChild(taskRemoveIcon);
      }
      // Add task line
      const taskAdd = document.createElement('div');
      taskAdd.setAttribute('data-project-index', projectIndex);
      taskAdd.classList.add('todo-item-add', 'add-task-modal');
      tasksList.appendChild(taskAdd);
      const taskAddIcon = document.createElement('i');
      taskAddIcon.classList.add('far', 'fa-plus', 'fa-fw', 'add-task-modal');
      taskAdd.appendChild(taskAddIcon);
      const taskAddTitle = document.createElement('p');
      taskAddTitle.classList.add('todo-item-title', 'add-task-modal');
      taskAddTitle.textContent = 'Add new task';
      taskAdd.appendChild(taskAddTitle);
    }
  }

  function changeProject(projectIndex) {
    selectProject(projectIndex);
    renderHeader(projectIndex);
    renderTasks(projectIndex);
  }

  return {
    body,
    projectModal,
    confirmModal,
    modals,
    formProjectTitleError,
    formTaskTitleError,
    responsiveSidebar,
    toggleSidebar,
    showProjectModal,
    showTaskModal,
    showConfirmModal,
    showElement,
    hideElement,
    activeLink,
    renderProjects,
    renderTasks,
    changeProject,
  };
})();

export default dom;
