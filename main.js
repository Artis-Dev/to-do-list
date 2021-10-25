/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/projects.js");


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
  const formTaskProjectError = document.querySelector('.task-project-error');

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

    projectForm.reset();
    dom.hideElement(dom.formProjectTitleError);

    projectModal.classList.remove('hide');
    projectModal.classList.add('display');

    if (modal === 'addProject') {
      modalHeading.textContent = 'New project';
      modalSubmitButton.textContent = 'Add';
      modalSubmitButton.classList.remove('edit-project');
      modalSubmitButton.classList.add('add-project');
    } else if (modal === 'editProject') {
      const currentProjectTitle = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[index].title;
      const currentProjectIcon = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[index].icon;
      const currentProjectColor = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[index].color;

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

  function showTaskModal(modal, projectIndex, taskIndex = false) {
    const modalHeading = document.querySelector('.task-modal-title');
    const selectProject = document.querySelector('#select-project');
    const modalSubmitButton = document.querySelector('#task-button');

    taskForm.reset();
    dom.hideElement(dom.formTaskTitleError);
    dom.hideElement(dom.formTaskProjectError);

    taskModal.classList.remove('hide');
    taskModal.classList.add('display');

    if (modal === 'addTask') {
      modalHeading.textContent = 'New task';

      selectProject.innerText = '';
      if (Number.isNaN(projectIndex)) {
        const label = document.createElement('label');
        label.id = 'form-label';
        label.innerText = 'Project *';
        label.setAttribute('for', 'form-task-project');
        selectProject.appendChild(label);

        const select = document.createElement('select');
        select.id = 'form-task-project';
        select.setAttribute('name', 'task-project');
        selectProject.appendChild(select);

        const option = document.createElement('option');
        option.setAttribute('value', '');
        option.selected = true;
        option.disabled = true;
        option.innerText = 'Select project';

        select.appendChild(option);
        for (let i = 0; i < _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList.length; i += 1) {
          const newOption = document.createElement('option');
          newOption.setAttribute('value', i);
          newOption.innerText = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].title;
          select.appendChild(newOption);
        }
      }

      modalSubmitButton.textContent = 'Add';
      modalSubmitButton.classList.remove('edit-task');
      modalSubmitButton.classList.add('add-task');
    } else if (modal === 'editTask') {
      const currentTaskTitle = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].title;
      const currentTaskPriority = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].priority;
      const currentTaskSchedule = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].schedule;

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
      title.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].title;
      modalContent.appendChild(modalContentPrefix);
      modalContent.appendChild(title);
      modalContent.appendChild(modalContentPostfix);
      modalSubmitButton.classList.remove('remove-task');
      modalSubmitButton.classList.add('remove-project');
    } else if (modal === 'removeTask') {
      modalHeading.textContent = 'Remove task';
      title.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].title;
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

  function renderProjects() {
    // Create link
    projectsList.textContent = '';
    for (let i = 0; i < _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList.length; i += 1) {
      const projectLink = document.createElement('a');
      projectLink.classList.add('sidebar-project');
      projectLink.setAttribute('href', '#');
      projectLink.setAttribute('data-index', i);
      projectsList.appendChild(projectLink);
      // Create icon
      const projectIcon = document.createElement('i');
      projectIcon.classList.add('far', _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].icon, 'fa-fw', _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].color, 'sidebar-project', 'sidebar-project-icon');
      projectLink.appendChild(projectIcon);
      // Create title
      const projectTitle = document.createTextNode(_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].title);
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

  function selectLink(projectIndex) {
    const allLinks = document.querySelectorAll('a.sidebar-project, a.sidebar-link');
    const inboxLink = document.querySelector('.link-inbox');
    const todayLink = document.querySelector('.link-today');
    const weekLink = document.querySelector('.link-week');
    const importantLink = document.querySelector('.link-important');
    const completedLink = document.querySelector('.link-completed');
    const projectLinks = document.querySelectorAll('a.sidebar-project');
    allLinks.forEach((elem) => {
      elem.classList.remove('active');
    });
    if (typeof projectIndex === 'number') {
      projectLinks[projectIndex].classList.add('active');
    } else if (projectIndex === 'inbox') {
      inboxLink.classList.add('active');
    } else if (projectIndex === 'today') {
      todayLink.classList.add('active');
    } else if (projectIndex === 'week') {
      weekLink.classList.add('active');
    } else if (projectIndex === 'important') {
      importantLink.classList.add('active');
    } else if (projectIndex === 'completed') {
      completedLink.classList.add('active');
    }
  }

  function renderHeader(projectIndex) {
    const headerTitle = document.querySelector('.todo-header-title');

    if (typeof projectIndex === 'number') {
      headerTitle.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].title;
    } else {
      headerTitle.textContent = projectIndex[0].toUpperCase() + projectIndex.substring(1);
    }
  }

  function renderTasks(projectIndex) {
    let indexStart;
    let indexEnd;
    tasksList.textContent = '';
    if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList.length >= 1) {
      if (typeof projectIndex === 'number') {
        indexStart = projectIndex;
        indexEnd = projectIndex + 1;
      } else {
        indexStart = 0;
        indexEnd = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList.length;
      }
      for (let j = indexStart; j < indexEnd; j += 1) {
        for (let i = 0; i < _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[j].tasks.length; i += 1) {
          if (projectIndex === 'today' && _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[j].tasks[i].schedule === '') {
            continue;
          } else if (projectIndex === 'week' && _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[j].tasks[i].schedule === '') {
            continue;
          } else if (projectIndex === 'important' && _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[j].tasks[i].priority !== 'high') {
            continue;
          } else if (projectIndex === 'completed' && _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[j].tasks[i].done !== true) {
            continue;
          }
          const todoItem = document.createElement('div');
          todoItem.classList.add('todo-item', 'toggle-task');
          todoItem.setAttribute('data-project-index', j);
          todoItem.setAttribute('data-task-index', i);
          tasksList.appendChild(todoItem);
          // Create icon
          const taskIcon = document.createElement('i');
          taskIcon.classList.add('far', 'fa-fw', 'toggle-task');
          if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[j].tasks[i].priority === 'low') {
            taskIcon.classList.add('project-green');
          } else if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[j].tasks[i].priority === 'medium') {
            taskIcon.classList.add('project-yellow');
          } else if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[j].tasks[i].priority === 'high') {
            taskIcon.classList.add('project-red');
          } else {
            taskIcon.classList.add('project-grey');
          }
          todoItem.appendChild(taskIcon);
          // Create title
          const taskTitle = document.createElement('p');
          taskTitle.classList.add('todo-item-title', 'toggle-task');
          taskTitle.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[j].tasks[i].title;
          if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[j].tasks[i].done === true) {
            taskIcon.classList.add('fa-check-circle');
            taskTitle.classList.add('done');
          } else {
            taskIcon.classList.add('fa-circle');
            taskTitle.classList.remove('done');
          }
          todoItem.appendChild(taskTitle);
          // Create date
          if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[j].tasks[i].schedule !== '') {
            const taskDate = document.createElement('p');
            taskDate.classList.add('todo-item-date', 'todo-item-pill', 'toggle-task');
            taskDate.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[j].tasks[i].schedule;
            todoItem.appendChild(taskDate);
          }
          // Create project name
          const taskProject = document.createElement('p');
          taskProject.classList.add('todo-item-pill', `${_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[j].color}-background`, 'toggle-task');
          taskProject.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[j].title;
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
    } else {
      // No project warning
      const taskAdd = document.createElement('div');
      taskAdd.classList.add('todo-item-add', 'add-project-modal');
      tasksList.appendChild(taskAdd);
      const taskAddIcon = document.createElement('i');
      taskAddIcon.classList.add('far', 'fa-exclamation-circle', 'fa-fw', 'project-red', 'add-project-modal');
      taskAdd.appendChild(taskAddIcon);
      const taskAddTitle = document.createElement('p');
      taskAddTitle.classList.add('todo-item-title', 'add-project-modal');
      taskAddTitle.textContent = 'You don\'t have any projects, create one.';
      taskAdd.appendChild(taskAddTitle);
    }
  }

  function changeLink(projectIndex) {
    selectLink(projectIndex);
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
    formTaskProjectError,
    responsiveSidebar,
    toggleSidebar,
    showProjectModal,
    showTaskModal,
    showConfirmModal,
    showElement,
    hideElement,
    renderProjects,
    renderTasks,
    changeLink,
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);


/***/ }),

/***/ "./src/handlers.js":
/*!*************************!*\
  !*** ./src/handlers.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validation */ "./src/validation.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");





const handlers = (() => {
  function clickHandler() {
    let projectIndex = 0;
    let taskIndex = 0;
    let link = 'inbox';
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].body.addEventListener('click', (e) => {
      // Toggle sidebar
      if (e.target.classList.contains('toggle-sidebar')) {
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].toggleSidebar();
      // Nav links
      } else if (e.target.classList.contains('link-inbox')) {
        link = 'inbox';
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].changeLink('inbox');
      // Nav links
      } else if (e.target.classList.contains('link-today')) {
        console.log('Today');
        link = 'today';
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].changeLink('today');
      // Nav links
      } else if (e.target.classList.contains('link-week')) {
        console.log('Week');
        link = 'week';
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].changeLink('week');
      // Nav links
      } else if (e.target.classList.contains('link-important')) {
        link = 'important';
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].changeLink('important');
      // Nav links
      } else if (e.target.classList.contains('link-completed')) {
        link = 'completed';
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].changeLink('completed');
      // Project links
      } else if (e.target.classList.contains('sidebar-project')) {
        projectIndex = parseInt((e.target.getAttribute('data-index')) ? e.target.getAttribute('data-index') : e.target.parentElement.getAttribute('data-index'), 10);
        link = undefined;
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].changeLink(projectIndex);
      // Add project modal open
      } else if (e.target.classList.contains('add-project-modal')) {
        link = undefined;
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].showProjectModal('addProject');
      // Edit project modal open
      } else if (e.target.classList.contains('edit-project-modal')) {
        projectIndex = parseInt(e.target.parentElement.getAttribute('data-index'), 10);
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].showProjectModal('editProject', projectIndex);
      // Remove project modal open
      } else if (e.target.classList.contains('remove-project-modal')) {
        projectIndex = parseInt(e.target.parentElement.getAttribute('data-index'), 10);
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].showConfirmModal('removeProject', projectIndex);
      // Add task modal open
      } else if (e.target.classList.contains('add-task-modal')) {
        projectIndex = parseInt((e.target.parentElement.getAttribute('data-project-index')) ? e.target.parentElement.getAttribute('data-project-index') : e.target.getAttribute('data-project-index'), 10);
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].showTaskModal('addTask', projectIndex);
      // Edit task modal open
      } else if (e.target.classList.contains('edit-task-modal')) {
        taskIndex = parseInt(e.target.parentElement.getAttribute('data-task-index'), 10);
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].showTaskModal('editTask', projectIndex, taskIndex);
      // Remove task modal open
      } else if (e.target.classList.contains('remove-task-modal')) {
        projectIndex = parseInt(e.target.parentElement.getAttribute('data-project-index'), 10);
        taskIndex = parseInt(e.target.parentElement.getAttribute('data-task-index'), 10);
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].showConfirmModal('removeTask', projectIndex, taskIndex);
      // Close all modals
      } else if (e.target.classList.contains('close') || e.target.classList.contains('modal')) {
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].hideElement(_dom__WEBPACK_IMPORTED_MODULE_1__["default"].modals);
      // Add project
      } else if (e.target.classList.contains('add-project')) {
        _validation__WEBPACK_IMPORTED_MODULE_0__["default"].addProject(e);
      // Edit project
      } else if (e.target.classList.contains('edit-project')) {
        _validation__WEBPACK_IMPORTED_MODULE_0__["default"].editProject(e, projectIndex, link);
      // Remove project
      } else if (e.target.classList.contains('remove-project')) {
        _projects__WEBPACK_IMPORTED_MODULE_2__["default"].removeProject(projectIndex);
      // Add Task
      } else if (e.target.classList.contains('add-task')) {
        _validation__WEBPACK_IMPORTED_MODULE_0__["default"].addTask(e, projectIndex);
      // Edit Task
      } else if (e.target.classList.contains('edit-task')) {
        _validation__WEBPACK_IMPORTED_MODULE_0__["default"].editTask(e, projectIndex, taskIndex, link);
      // Remove task
      } else if (e.target.classList.contains('remove-task')) {
        _tasks__WEBPACK_IMPORTED_MODULE_3__["default"].removeTask(projectIndex, taskIndex, link);
      // Toggle task
      } else if (e.target.classList.contains('toggle-task')) {
        projectIndex = parseInt((e.target.getAttribute('data-project-index')) ? e.target.getAttribute('data-project-index') : e.target.parentElement.getAttribute('data-project-index'), 10);
        taskIndex = parseInt((e.target.getAttribute('data-task-index')) ? e.target.getAttribute('data-task-index') : e.target.parentElement.getAttribute('data-task-index'), 10);
        _tasks__WEBPACK_IMPORTED_MODULE_3__["default"].toggleTask(projectIndex, taskIndex, link);
      }
    });
  }

  function keyboardHandler() {
    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].hideElement(_dom__WEBPACK_IMPORTED_MODULE_1__["default"].modals);
      }
      // if (event.key === 'Enter' && modal.style.display === 'block') {
      //   submitButton.click();
      // }
    });
  }

  function resizeHandler() {
    window.addEventListener('resize', _dom__WEBPACK_IMPORTED_MODULE_1__["default"].responsiveSidebar);
  }

  return {
    clickHandler,
    keyboardHandler,
    resizeHandler,
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handlers);


/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");


const projects = (() => {
  let projectsList = [];

  // Local storage
  if (localStorage.getItem('projects') === null) {
    projectsList = [{
      title: 'Demo', icon: 'fa-home', color: 'project-green', tasks: [],
    }];
  } else {
    const projectsFromStorage = JSON.parse(localStorage.getItem('projects'));
    projectsList = projectsFromStorage;
  }

  class Project {
    constructor(title, icon, color) {
      this.title = title;
      this.icon = icon;
      this.color = color;
      this.tasks = [];
    }
  }

  function createProject(title, icon, color) {
    const newProject = new Project(title, icon, color);
    projectsList.push(newProject);
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].renderProjects();
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].changeLink(projectsList.length - 1);
    localStorage.setItem('projects', JSON.stringify(projectsList));
  }

  function editProject(index, title, icon, color, link) {
    projectsList[index].title = title;
    projectsList[index].icon = icon;
    projectsList[index].color = color;
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].renderProjects();
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].changeLink(link);
    localStorage.setItem('projects', JSON.stringify(projectsList));
  }

  function removeProject(index) {
    projectsList.splice(index, 1);
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].hideElement(_dom__WEBPACK_IMPORTED_MODULE_0__["default"].modals);
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].renderProjects();
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].changeLink('inbox');
    localStorage.setItem('projects', JSON.stringify(projectsList));
  }

  return {
    projectsList,
    createProject,
    editProject,
    removeProject,
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (projects);


/***/ }),

/***/ "./src/tasks.js":
/*!**********************!*\
  !*** ./src/tasks.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");



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
    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks.push(newTask);
    if (Number.isNaN(parseInt(link, 10))) {
      _dom__WEBPACK_IMPORTED_MODULE_1__["default"].changeLink(link);
    } else {
      _dom__WEBPACK_IMPORTED_MODULE_1__["default"].renderTasks(projectIndex);
    }
    localStorage.setItem('projects', JSON.stringify(_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList));
  }

  function toggleTask(projectIndex, taskIndex, link = projectIndex) {
    if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].done) {
      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].done = false;
    } else {
      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].done = true;
    }
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].renderTasks(link);
    localStorage.setItem('projects', JSON.stringify(_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList));
  }

  function editTask(projectIndex, taskIndex, title, priority, schedule, link = projectIndex) {
    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].title = title;
    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].priority = priority;
    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].schedule = schedule;
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].renderTasks(link);
    localStorage.setItem('projects', JSON.stringify(_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList));
  }

  function removeTask(projectIndex, taskIndex, link = projectIndex) {
    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks.splice(taskIndex, 1);
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].hideElement(_dom__WEBPACK_IMPORTED_MODULE_1__["default"].modals);
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].renderTasks(link);
    localStorage.setItem('projects', JSON.stringify(_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList));
  }

  return {
    createTask,
    toggleTask,
    editTask,
    removeTask,
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tasks);


/***/ }),

/***/ "./src/validation.js":
/*!***************************!*\
  !*** ./src/validation.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ "./src/dom.js");




const validation = (() => {
  function addProject(event) {
    const projectTitle = document.forms['project-form']['project-title'].value;
    const projectIcon = document.forms['project-form']['project-icon'].value;
    const projectColor = document.forms['project-form']['project-color'].value;

    event.preventDefault();

    if (projectTitle !== '') {
      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].createProject(projectTitle, projectIcon, projectColor);
      _dom__WEBPACK_IMPORTED_MODULE_2__["default"].hideElement(_dom__WEBPACK_IMPORTED_MODULE_2__["default"].formProjectTitleError);
      _dom__WEBPACK_IMPORTED_MODULE_2__["default"].hideElement(_dom__WEBPACK_IMPORTED_MODULE_2__["default"].modals);
    } else if (projectTitle === '') {
      _dom__WEBPACK_IMPORTED_MODULE_2__["default"].showElement(_dom__WEBPACK_IMPORTED_MODULE_2__["default"].formProjectTitleError);
    }
  }

  function editProject(event, index, link) {
    const projectTitle = document.forms['project-form']['project-title'].value;
    const projectIcon = document.forms['project-form']['project-icon'].value;
    const projectColor = document.forms['project-form']['project-color'].value;

    event.preventDefault();

    if (projectTitle !== '') {
      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].editProject(index, projectTitle, projectIcon, projectColor, link);
      _dom__WEBPACK_IMPORTED_MODULE_2__["default"].hideElement(_dom__WEBPACK_IMPORTED_MODULE_2__["default"].formProjectTitleError);
      _dom__WEBPACK_IMPORTED_MODULE_2__["default"].hideElement(_dom__WEBPACK_IMPORTED_MODULE_2__["default"].modals);
    } else if (projectTitle === '') {
      _dom__WEBPACK_IMPORTED_MODULE_2__["default"].showElement(_dom__WEBPACK_IMPORTED_MODULE_2__["default"].formProjectTitleError);
    }
  }

  function addTask(event, projectIndex) {
    const taskTitle = document.forms['task-form']['task-title'].value;
    const taskPriority = document.forms['task-form']['task-priority'].value;
    const taskSchedule = document.forms['task-form']['task-schedule'].value;
    const link = document.querySelector('.add-task-modal').getAttribute('data-project-index');
    let taskProject;
    if (Number.isNaN(projectIndex)) {
      taskProject = parseInt(document.forms['task-form']['task-project'].value, 10);
    } else {
      taskProject = projectIndex;
    }

    event.preventDefault();

    if (taskTitle !== '' && !Number.isNaN(taskProject)) {
      _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].createTask(taskProject, taskTitle, taskPriority, taskSchedule, link);
      _dom__WEBPACK_IMPORTED_MODULE_2__["default"].hideElement(_dom__WEBPACK_IMPORTED_MODULE_2__["default"].formTaskTitleError);
      _dom__WEBPACK_IMPORTED_MODULE_2__["default"].hideElement(_dom__WEBPACK_IMPORTED_MODULE_2__["default"].formTaskProjectError);
      _dom__WEBPACK_IMPORTED_MODULE_2__["default"].hideElement(_dom__WEBPACK_IMPORTED_MODULE_2__["default"].modals);
    } else if (taskTitle === '') {
      _dom__WEBPACK_IMPORTED_MODULE_2__["default"].showElement(_dom__WEBPACK_IMPORTED_MODULE_2__["default"].formTaskTitleError);
    } else {
      _dom__WEBPACK_IMPORTED_MODULE_2__["default"].hideElement(_dom__WEBPACK_IMPORTED_MODULE_2__["default"].formTaskTitleError);
    }
    if (Number.isNaN(taskProject)) {
      _dom__WEBPACK_IMPORTED_MODULE_2__["default"].showElement(_dom__WEBPACK_IMPORTED_MODULE_2__["default"].formTaskProjectError);
    } else {
      _dom__WEBPACK_IMPORTED_MODULE_2__["default"].hideElement(_dom__WEBPACK_IMPORTED_MODULE_2__["default"].formTaskProjectError);
    }
  }

  function editTask(event, projectIndex, taskIndex, link) {
    const taskTitle = document.forms['task-form']['task-title'].value;
    const taskPriority = document.forms['task-form']['task-priority'].value;
    const taskSchedule = document.forms['task-form']['task-schedule'].value;

    event.preventDefault();

    if (taskTitle !== '') {
      _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].editTask(projectIndex, taskIndex, taskTitle, taskPriority, taskSchedule, link);
      _dom__WEBPACK_IMPORTED_MODULE_2__["default"].hideElement(_dom__WEBPACK_IMPORTED_MODULE_2__["default"].formTaskTitleError);
      _dom__WEBPACK_IMPORTED_MODULE_2__["default"].hideElement(_dom__WEBPACK_IMPORTED_MODULE_2__["default"].modals);
    } else if (taskTitle === '') {
      _dom__WEBPACK_IMPORTED_MODULE_2__["default"].showElement(_dom__WEBPACK_IMPORTED_MODULE_2__["default"].formTaskTitleError);
    }
  }

  return {
    addProject,
    editProject,
    addTask,
    editTask,
  };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validation);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _handlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handlers */ "./src/handlers.js");



_dom__WEBPACK_IMPORTED_MODULE_0__["default"].responsiveSidebar();
_dom__WEBPACK_IMPORTED_MODULE_0__["default"].renderProjects();
_dom__WEBPACK_IMPORTED_MODULE_0__["default"].changeLink('inbox');

_handlers__WEBPACK_IMPORTED_MODULE_1__["default"].resizeHandler();
_handlers__WEBPACK_IMPORTED_MODULE_1__["default"].clickHandler();
_handlers__WEBPACK_IMPORTED_MODULE_1__["default"].keyboardHandler();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0EsQ0FBQzs7QUFFRCxpRUFBZSxVQUFVLEVBQUM7Ozs7Ozs7VUM1RjFCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTndCO0FBQ1U7O0FBRWxDLDhEQUFxQjtBQUNyQiwyREFBa0I7QUFDbEIsdURBQWM7O0FBRWQsK0RBQXNCO0FBQ3RCLDhEQUFxQjtBQUNyQixpRUFBd0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2hhbmRsZXJzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy90YXNrcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb2plY3RzIGZyb20gJy4vcHJvamVjdHMnO1xuXG5jb25zdCBkb20gPSAoKCkgPT4ge1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKTtcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgY29uc3QgcHJvamVjdHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXItcHJvamVjdHMtbGlzdCcpO1xuICBjb25zdCB0YXNrc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1pdGVtLWxpc3QnKTtcbiAgY29uc3QgcHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbW9kYWwnKTtcbiAgY29uc3QgdGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stbW9kYWwnKTtcbiAgY29uc3QgY29uZmlybU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbmZpcm0tbW9kYWwnKTtcbiAgY29uc3QgbW9kYWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1vZGFsJyk7XG4gIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZm9ybScpO1xuICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWZvcm0nKTtcbiAgY29uc3QgZm9ybVByb2plY3RUaXRsZUVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtdGl0bGUtZXJyb3InKTtcbiAgY29uc3QgZm9ybVRhc2tUaXRsZUVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stdGl0bGUtZXJyb3InKTtcbiAgY29uc3QgZm9ybVRhc2tQcm9qZWN0RXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1wcm9qZWN0LWVycm9yJyk7XG5cbiAgZnVuY3Rpb24gcmVzcG9uc2l2ZVNpZGViYXIoKSB7XG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDw9IDk2MCkge1xuICAgICAgc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdzaWRlYmFyLXNob3cnKTtcbiAgICAgIHNpZGViYXIuY2xhc3NMaXN0LmFkZCgnc2lkZWJhci1oaWRlJyk7XG4gICAgICBtYWluLmNsYXNzTGlzdC5hZGQoJ21haW4tbW9iaWxlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnc2lkZWJhci1oaWRlJyk7XG4gICAgICBzaWRlYmFyLmNsYXNzTGlzdC5hZGQoJ3NpZGViYXItc2hvdycpO1xuICAgICAgbWFpbi5jbGFzc0xpc3QucmVtb3ZlKCdtYWluLW1vYmlsZScpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZVNpZGViYXIoKSB7XG4gICAgaWYgKCFzaWRlYmFyLmNsYXNzTGlzdC5jb250YWlucygnc2lkZWJhci1zaG93JykpIHtcbiAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnc2lkZWJhci1oaWRlJyk7XG4gICAgICBzaWRlYmFyLmNsYXNzTGlzdC5hZGQoJ3NpZGViYXItc2hvdycpO1xuICAgIH0gZWxzZSBpZiAoc2lkZWJhci5jbGFzc0xpc3QuY29udGFpbnMoJ3NpZGViYXItc2hvdycpKSB7XG4gICAgICBzaWRlYmFyLmNsYXNzTGlzdC5yZW1vdmUoJ3NpZGViYXItc2hvdycpO1xuICAgICAgc2lkZWJhci5jbGFzc0xpc3QuYWRkKCdzaWRlYmFyLWhpZGUnKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93UHJvamVjdE1vZGFsKG1vZGFsLCBpbmRleCA9IGZhbHNlKSB7XG4gICAgY29uc3QgbW9kYWxIZWFkaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtbW9kYWwtdGl0bGUnKTtcbiAgICBjb25zdCBtb2RhbFN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWJ1dHRvbicpO1xuXG4gICAgcHJvamVjdEZvcm0ucmVzZXQoKTtcbiAgICBkb20uaGlkZUVsZW1lbnQoZG9tLmZvcm1Qcm9qZWN0VGl0bGVFcnJvcik7XG5cbiAgICBwcm9qZWN0TW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIHByb2plY3RNb2RhbC5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Jyk7XG5cbiAgICBpZiAobW9kYWwgPT09ICdhZGRQcm9qZWN0Jykge1xuICAgICAgbW9kYWxIZWFkaW5nLnRleHRDb250ZW50ID0gJ05ldyBwcm9qZWN0JztcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gJ0FkZCc7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdlZGl0LXByb2plY3QnKTtcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2FkZC1wcm9qZWN0Jyk7XG4gICAgfSBlbHNlIGlmIChtb2RhbCA9PT0gJ2VkaXRQcm9qZWN0Jykge1xuICAgICAgY29uc3QgY3VycmVudFByb2plY3RUaXRsZSA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0udGl0bGU7XG4gICAgICBjb25zdCBjdXJyZW50UHJvamVjdEljb24gPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLmljb247XG4gICAgICBjb25zdCBjdXJyZW50UHJvamVjdENvbG9yID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2luZGV4XS5jb2xvcjtcblxuICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Zvcm0tcHJvamVjdC10aXRsZScpO1xuICAgICAgY29uc3QgcHJvamVjdEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFt2YWx1ZT0ke2N1cnJlbnRQcm9qZWN0SWNvbn1dYCk7XG4gICAgICBjb25zdCBwcm9qZWN0Q29sb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFt2YWx1ZT0ke2N1cnJlbnRQcm9qZWN0Q29sb3J9XWApO1xuXG4gICAgICBwcm9qZWN0VGl0bGUudmFsdWUgPSBjdXJyZW50UHJvamVjdFRpdGxlO1xuICAgICAgcHJvamVjdEljb24uY2hlY2tlZCA9IHRydWU7XG4gICAgICBwcm9qZWN0Q29sb3IuY2hlY2tlZCA9IHRydWU7XG5cbiAgICAgIG1vZGFsSGVhZGluZy50ZXh0Q29udGVudCA9ICdFZGl0IHByb2plY3QnO1xuICAgICAgbW9kYWxTdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSAnRWRpdCc7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdhZGQtcHJvamVjdCcpO1xuICAgICAgbW9kYWxTdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnZWRpdC1wcm9qZWN0Jyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2hvd1Rhc2tNb2RhbChtb2RhbCwgcHJvamVjdEluZGV4LCB0YXNrSW5kZXggPSBmYWxzZSkge1xuICAgIGNvbnN0IG1vZGFsSGVhZGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLW1vZGFsLXRpdGxlJyk7XG4gICAgY29uc3Qgc2VsZWN0UHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWxlY3QtcHJvamVjdCcpO1xuICAgIGNvbnN0IG1vZGFsU3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stYnV0dG9uJyk7XG5cbiAgICB0YXNrRm9ybS5yZXNldCgpO1xuICAgIGRvbS5oaWRlRWxlbWVudChkb20uZm9ybVRhc2tUaXRsZUVycm9yKTtcbiAgICBkb20uaGlkZUVsZW1lbnQoZG9tLmZvcm1UYXNrUHJvamVjdEVycm9yKTtcblxuICAgIHRhc2tNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgdGFza01vZGFsLmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXknKTtcblxuICAgIGlmIChtb2RhbCA9PT0gJ2FkZFRhc2snKSB7XG4gICAgICBtb2RhbEhlYWRpbmcudGV4dENvbnRlbnQgPSAnTmV3IHRhc2snO1xuXG4gICAgICBzZWxlY3RQcm9qZWN0LmlubmVyVGV4dCA9ICcnO1xuICAgICAgaWYgKE51bWJlci5pc05hTihwcm9qZWN0SW5kZXgpKSB7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgbGFiZWwuaWQgPSAnZm9ybS1sYWJlbCc7XG4gICAgICAgIGxhYmVsLmlubmVyVGV4dCA9ICdQcm9qZWN0IConO1xuICAgICAgICBsYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsICdmb3JtLXRhc2stcHJvamVjdCcpO1xuICAgICAgICBzZWxlY3RQcm9qZWN0LmFwcGVuZENoaWxkKGxhYmVsKTtcblxuICAgICAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcbiAgICAgICAgc2VsZWN0LmlkID0gJ2Zvcm0tdGFzay1wcm9qZWN0JztcbiAgICAgICAgc2VsZWN0LnNldEF0dHJpYnV0ZSgnbmFtZScsICd0YXNrLXByb2plY3QnKTtcbiAgICAgICAgc2VsZWN0UHJvamVjdC5hcHBlbmRDaGlsZChzZWxlY3QpO1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICBvcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsICcnKTtcbiAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgb3B0aW9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgb3B0aW9uLmlubmVyVGV4dCA9ICdTZWxlY3QgcHJvamVjdCc7XG5cbiAgICAgICAgc2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdHMucHJvamVjdHNMaXN0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgY29uc3QgbmV3T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgICAgbmV3T3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBpKTtcbiAgICAgICAgICBuZXdPcHRpb24uaW5uZXJUZXh0ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2ldLnRpdGxlO1xuICAgICAgICAgIHNlbGVjdC5hcHBlbmRDaGlsZChuZXdPcHRpb24pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gJ0FkZCc7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdlZGl0LXRhc2snKTtcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2FkZC10YXNrJyk7XG4gICAgfSBlbHNlIGlmIChtb2RhbCA9PT0gJ2VkaXRUYXNrJykge1xuICAgICAgY29uc3QgY3VycmVudFRhc2tUaXRsZSA9IHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0udGl0bGU7XG4gICAgICBjb25zdCBjdXJyZW50VGFza1ByaW9yaXR5ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5wcmlvcml0eTtcbiAgICAgIGNvbnN0IGN1cnJlbnRUYXNrU2NoZWR1bGUgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLnNjaGVkdWxlO1xuXG4gICAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybS10YXNrLXRpdGxlJyk7XG4gICAgICBjb25zdCB0YXNrUHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybS10YXNrLXByaW9yaXR5Jyk7XG4gICAgICBjb25zdCB0YXNrU2NoZWR1bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybS10YXNrLXNjaGVkdWxlJyk7XG5cbiAgICAgIHRhc2tUaXRsZS52YWx1ZSA9IGN1cnJlbnRUYXNrVGl0bGU7XG4gICAgICB0YXNrUHJpb3JpdHkudmFsdWUgPSBjdXJyZW50VGFza1ByaW9yaXR5O1xuICAgICAgdGFza1NjaGVkdWxlLnZhbHVlID0gY3VycmVudFRhc2tTY2hlZHVsZTtcblxuICAgICAgbW9kYWxIZWFkaW5nLnRleHRDb250ZW50ID0gJ0VkaXQgcHJvamVjdCc7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdFZGl0JztcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2FkZC10YXNrJyk7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdlZGl0LXRhc2snKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93Q29uZmlybU1vZGFsKG1vZGFsLCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCkge1xuICAgIGNvbnN0IG1vZGFsSGVhZGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb25maXJtLW1vZGFsLXRpdGxlJyk7XG4gICAgY29uc3QgbW9kYWxDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmZpcm0tbW9kYWwtY29udGVudCcpO1xuICAgIGNvbnN0IG1vZGFsU3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbmZpcm0tYnV0dG9uJyk7XG4gICAgY29uc3QgbW9kYWxDb250ZW50UHJlZml4ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1lvdSBhcmUgZ29pbmcgdG8gcmVtb3ZlICcpO1xuICAgIGNvbnN0IG1vZGFsQ29udGVudFBvc3RmaXggPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnLiBUaGlzIGFjdGlvbiBjYW5ub3QgYmUgdW5kb25lLicpO1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgY29uZmlybU1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBjb25maXJtTW9kYWwuY2xhc3NMaXN0LmFkZCgnZGlzcGxheScpO1xuXG4gICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgnY29uZmlybS1tb2RhbC10aXRsZScpO1xuXG4gICAgbW9kYWxDb250ZW50LnRleHRDb250ZW50ID0gJyc7XG5cbiAgICBpZiAobW9kYWwgPT09ICdyZW1vdmVQcm9qZWN0Jykge1xuICAgICAgbW9kYWxIZWFkaW5nLnRleHRDb250ZW50ID0gJ1JlbW92ZSBwcm9qZWN0JztcbiAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGl0bGU7XG4gICAgICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQobW9kYWxDb250ZW50UHJlZml4KTtcbiAgICAgIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQobW9kYWxDb250ZW50UG9zdGZpeCk7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdyZW1vdmUtdGFzaycpO1xuICAgICAgbW9kYWxTdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgncmVtb3ZlLXByb2plY3QnKTtcbiAgICB9IGVsc2UgaWYgKG1vZGFsID09PSAncmVtb3ZlVGFzaycpIHtcbiAgICAgIG1vZGFsSGVhZGluZy50ZXh0Q29udGVudCA9ICdSZW1vdmUgdGFzayc7XG4gICAgICB0aXRsZS50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0udGl0bGU7XG4gICAgICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQobW9kYWxDb250ZW50UHJlZml4KTtcbiAgICAgIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQobW9kYWxDb250ZW50UG9zdGZpeCk7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdyZW1vdmUtcHJvamVjdCcpO1xuICAgICAgbW9kYWxTdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgncmVtb3ZlLXRhc2snKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93RWxlbWVudChlbGVtZW50KSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Jyk7XG4gIH1cblxuICBmdW5jdGlvbiBoaWRlRWxlbWVudChtb2RhbCkge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YuY2FsbChOb2RlTGlzdC5wcm90b3R5cGUsIG1vZGFsKSkge1xuICAgICAgbW9kYWwuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc3BsYXknKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheScpO1xuICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlclByb2plY3RzKCkge1xuICAgIC8vIENyZWF0ZSBsaW5rXG4gICAgcHJvamVjdHNMaXN0LnRleHRDb250ZW50ID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5wcm9qZWN0c0xpc3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHByb2plY3RMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgcHJvamVjdExpbmsuY2xhc3NMaXN0LmFkZCgnc2lkZWJhci1wcm9qZWN0Jyk7XG4gICAgICBwcm9qZWN0TGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycpO1xuICAgICAgcHJvamVjdExpbmsuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaSk7XG4gICAgICBwcm9qZWN0c0xpc3QuYXBwZW5kQ2hpbGQocHJvamVjdExpbmspO1xuICAgICAgLy8gQ3JlYXRlIGljb25cbiAgICAgIGNvbnN0IHByb2plY3RJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgcHJvamVjdEljb24uY2xhc3NMaXN0LmFkZCgnZmFyJywgcHJvamVjdHMucHJvamVjdHNMaXN0W2ldLmljb24sICdmYS1mdycsIHByb2plY3RzLnByb2plY3RzTGlzdFtpXS5jb2xvciwgJ3NpZGViYXItcHJvamVjdCcsICdzaWRlYmFyLXByb2plY3QtaWNvbicpO1xuICAgICAgcHJvamVjdExpbmsuYXBwZW5kQ2hpbGQocHJvamVjdEljb24pO1xuICAgICAgLy8gQ3JlYXRlIHRpdGxlXG4gICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGl0bGUpO1xuICAgICAgcHJvamVjdExpbmsuYXBwZW5kQ2hpbGQocHJvamVjdFRpdGxlKTtcbiAgICAgIC8vIENyZWF0ZSByZW1vdmUgaWNvblxuICAgICAgY29uc3QgcHJvamVjdFJlbW92ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICBwcm9qZWN0UmVtb3ZlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYXInLCAnZmEtdHJhc2gnLCAncmVtb3ZlLXByb2plY3QtbW9kYWwnKTtcbiAgICAgIHByb2plY3RMaW5rLmFwcGVuZENoaWxkKHByb2plY3RSZW1vdmVJY29uKTtcbiAgICAgIC8vIENyZWF0ZSBlZGl0IGljb25cbiAgICAgIGNvbnN0IHByb2plY3RFZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgIHByb2plY3RFZGl0SWNvbi5jbGFzc0xpc3QuYWRkKCdmYXInLCAnZmEtZWRpdCcsICdlZGl0LXByb2plY3QtbW9kYWwnKTtcbiAgICAgIHByb2plY3RMaW5rLmFwcGVuZENoaWxkKHByb2plY3RFZGl0SWNvbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0TGluayhwcm9qZWN0SW5kZXgpIHtcbiAgICBjb25zdCBhbGxMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Euc2lkZWJhci1wcm9qZWN0LCBhLnNpZGViYXItbGluaycpO1xuICAgIGNvbnN0IGluYm94TGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5rLWluYm94Jyk7XG4gICAgY29uc3QgdG9kYXlMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmstdG9kYXknKTtcbiAgICBjb25zdCB3ZWVrTGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5rLXdlZWsnKTtcbiAgICBjb25zdCBpbXBvcnRhbnRMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmstaW1wb3J0YW50Jyk7XG4gICAgY29uc3QgY29tcGxldGVkTGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5rLWNvbXBsZXRlZCcpO1xuICAgIGNvbnN0IHByb2plY3RMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Euc2lkZWJhci1wcm9qZWN0Jyk7XG4gICAgYWxsTGlua3MuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIHByb2plY3RJbmRleCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHByb2plY3RMaW5rc1twcm9qZWN0SW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH0gZWxzZSBpZiAocHJvamVjdEluZGV4ID09PSAnaW5ib3gnKSB7XG4gICAgICBpbmJveExpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfSBlbHNlIGlmIChwcm9qZWN0SW5kZXggPT09ICd0b2RheScpIHtcbiAgICAgIHRvZGF5TGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9IGVsc2UgaWYgKHByb2plY3RJbmRleCA9PT0gJ3dlZWsnKSB7XG4gICAgICB3ZWVrTGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9IGVsc2UgaWYgKHByb2plY3RJbmRleCA9PT0gJ2ltcG9ydGFudCcpIHtcbiAgICAgIGltcG9ydGFudExpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfSBlbHNlIGlmIChwcm9qZWN0SW5kZXggPT09ICdjb21wbGV0ZWQnKSB7XG4gICAgICBjb21wbGV0ZWRMaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckhlYWRlcihwcm9qZWN0SW5kZXgpIHtcbiAgICBjb25zdCBoZWFkZXJUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWhlYWRlci10aXRsZScpO1xuXG4gICAgaWYgKHR5cGVvZiBwcm9qZWN0SW5kZXggPT09ICdudW1iZXInKSB7XG4gICAgICBoZWFkZXJUaXRsZS50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRpdGxlO1xuICAgIH0gZWxzZSB7XG4gICAgICBoZWFkZXJUaXRsZS50ZXh0Q29udGVudCA9IHByb2plY3RJbmRleFswXS50b1VwcGVyQ2FzZSgpICsgcHJvamVjdEluZGV4LnN1YnN0cmluZygxKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJUYXNrcyhwcm9qZWN0SW5kZXgpIHtcbiAgICBsZXQgaW5kZXhTdGFydDtcbiAgICBsZXQgaW5kZXhFbmQ7XG4gICAgdGFza3NMaXN0LnRleHRDb250ZW50ID0gJyc7XG4gICAgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdC5sZW5ndGggPj0gMSkge1xuICAgICAgaWYgKHR5cGVvZiBwcm9qZWN0SW5kZXggPT09ICdudW1iZXInKSB7XG4gICAgICAgIGluZGV4U3RhcnQgPSBwcm9qZWN0SW5kZXg7XG4gICAgICAgIGluZGV4RW5kID0gcHJvamVjdEluZGV4ICsgMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGV4U3RhcnQgPSAwO1xuICAgICAgICBpbmRleEVuZCA9IHByb2plY3RzLnByb2plY3RzTGlzdC5sZW5ndGg7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBqID0gaW5kZXhTdGFydDsgaiA8IGluZGV4RW5kOyBqICs9IDEpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5wcm9qZWN0c0xpc3Rbal0udGFza3MubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBpZiAocHJvamVjdEluZGV4ID09PSAndG9kYXknICYmIHByb2plY3RzLnByb2plY3RzTGlzdFtqXS50YXNrc1tpXS5zY2hlZHVsZSA9PT0gJycpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAocHJvamVjdEluZGV4ID09PSAnd2VlaycgJiYgcHJvamVjdHMucHJvamVjdHNMaXN0W2pdLnRhc2tzW2ldLnNjaGVkdWxlID09PSAnJykge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSBlbHNlIGlmIChwcm9qZWN0SW5kZXggPT09ICdpbXBvcnRhbnQnICYmIHByb2plY3RzLnByb2plY3RzTGlzdFtqXS50YXNrc1tpXS5wcmlvcml0eSAhPT0gJ2hpZ2gnKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHByb2plY3RJbmRleCA9PT0gJ2NvbXBsZXRlZCcgJiYgcHJvamVjdHMucHJvamVjdHNMaXN0W2pdLnRhc2tzW2ldLmRvbmUgIT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB0b2RvSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIHRvZG9JdGVtLmNsYXNzTGlzdC5hZGQoJ3RvZG8taXRlbScsICd0b2dnbGUtdGFzaycpO1xuICAgICAgICAgIHRvZG9JdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0LWluZGV4Jywgaik7XG4gICAgICAgICAgdG9kb0l0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLXRhc2staW5kZXgnLCBpKTtcbiAgICAgICAgICB0YXNrc0xpc3QuYXBwZW5kQ2hpbGQodG9kb0l0ZW0pO1xuICAgICAgICAgIC8vIENyZWF0ZSBpY29uXG4gICAgICAgICAgY29uc3QgdGFza0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgICAgdGFza0ljb24uY2xhc3NMaXN0LmFkZCgnZmFyJywgJ2ZhLWZ3JywgJ3RvZ2dsZS10YXNrJyk7XG4gICAgICAgICAgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdFtqXS50YXNrc1tpXS5wcmlvcml0eSA9PT0gJ2xvdycpIHtcbiAgICAgICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtZ3JlZW4nKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdFtqXS50YXNrc1tpXS5wcmlvcml0eSA9PT0gJ21lZGl1bScpIHtcbiAgICAgICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QteWVsbG93Jyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChwcm9qZWN0cy5wcm9qZWN0c0xpc3Rbal0udGFza3NbaV0ucHJpb3JpdHkgPT09ICdoaWdoJykge1xuICAgICAgICAgICAgdGFza0ljb24uY2xhc3NMaXN0LmFkZCgncHJvamVjdC1yZWQnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFza0ljb24uY2xhc3NMaXN0LmFkZCgncHJvamVjdC1ncmV5Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKHRhc2tJY29uKTtcbiAgICAgICAgICAvLyBDcmVhdGUgdGl0bGVcbiAgICAgICAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgdGFza1RpdGxlLmNsYXNzTGlzdC5hZGQoJ3RvZG8taXRlbS10aXRsZScsICd0b2dnbGUtdGFzaycpO1xuICAgICAgICAgIHRhc2tUaXRsZS50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtqXS50YXNrc1tpXS50aXRsZTtcbiAgICAgICAgICBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W2pdLnRhc2tzW2ldLmRvbmUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLWNoZWNrLWNpcmNsZScpO1xuICAgICAgICAgICAgdGFza1RpdGxlLmNsYXNzTGlzdC5hZGQoJ2RvbmUnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFza0ljb24uY2xhc3NMaXN0LmFkZCgnZmEtY2lyY2xlJyk7XG4gICAgICAgICAgICB0YXNrVGl0bGUuY2xhc3NMaXN0LnJlbW92ZSgnZG9uZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZCh0YXNrVGl0bGUpO1xuICAgICAgICAgIC8vIENyZWF0ZSBkYXRlXG4gICAgICAgICAgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdFtqXS50YXNrc1tpXS5zY2hlZHVsZSAhPT0gJycpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhc2tEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgdGFza0RhdGUuY2xhc3NMaXN0LmFkZCgndG9kby1pdGVtLWRhdGUnLCAndG9kby1pdGVtLXBpbGwnLCAndG9nZ2xlLXRhc2snKTtcbiAgICAgICAgICAgIHRhc2tEYXRlLnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2pdLnRhc2tzW2ldLnNjaGVkdWxlO1xuICAgICAgICAgICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQodGFza0RhdGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBDcmVhdGUgcHJvamVjdCBuYW1lXG4gICAgICAgICAgY29uc3QgdGFza1Byb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgdGFza1Byb2plY3QuY2xhc3NMaXN0LmFkZCgndG9kby1pdGVtLXBpbGwnLCBgJHtwcm9qZWN0cy5wcm9qZWN0c0xpc3Rbal0uY29sb3J9LWJhY2tncm91bmRgLCAndG9nZ2xlLXRhc2snKTtcbiAgICAgICAgICB0YXNrUHJvamVjdC50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtqXS50aXRsZTtcbiAgICAgICAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZCh0YXNrUHJvamVjdCk7XG4gICAgICAgICAgLy8gQ3JlYXRlIGVkaXQgaWNvblxuICAgICAgICAgIGNvbnN0IHRhc2tFZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgICB0YXNrRWRpdEljb24uY2xhc3NMaXN0LmFkZCgnZmFyJywgJ2ZhLWVkaXQnLCAnZmEtZncnLCAnZWRpdC10YXNrLW1vZGFsJyk7XG4gICAgICAgICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQodGFza0VkaXRJY29uKTtcbiAgICAgICAgICAvLyBDcmVhdGUgcmVtb3ZlIGljb25cbiAgICAgICAgICBjb25zdCB0YXNrUmVtb3ZlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgICB0YXNrUmVtb3ZlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYXInLCAnZmEtdHJhc2gnLCAnZmEtZncnLCAncmVtb3ZlLXRhc2stbW9kYWwnKTtcbiAgICAgICAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZCh0YXNrUmVtb3ZlSWNvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIEFkZCB0YXNrIGxpbmVcbiAgICAgIGNvbnN0IHRhc2tBZGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRhc2tBZGQuc2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QtaW5kZXgnLCBwcm9qZWN0SW5kZXgpO1xuICAgICAgdGFza0FkZC5jbGFzc0xpc3QuYWRkKCd0b2RvLWl0ZW0tYWRkJywgJ2FkZC10YXNrLW1vZGFsJyk7XG4gICAgICB0YXNrc0xpc3QuYXBwZW5kQ2hpbGQodGFza0FkZCk7XG4gICAgICBjb25zdCB0YXNrQWRkSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgIHRhc2tBZGRJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhcicsICdmYS1wbHVzJywgJ2ZhLWZ3JywgJ2FkZC10YXNrLW1vZGFsJyk7XG4gICAgICB0YXNrQWRkLmFwcGVuZENoaWxkKHRhc2tBZGRJY29uKTtcbiAgICAgIGNvbnN0IHRhc2tBZGRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIHRhc2tBZGRUaXRsZS5jbGFzc0xpc3QuYWRkKCd0b2RvLWl0ZW0tdGl0bGUnLCAnYWRkLXRhc2stbW9kYWwnKTtcbiAgICAgIHRhc2tBZGRUaXRsZS50ZXh0Q29udGVudCA9ICdBZGQgbmV3IHRhc2snO1xuICAgICAgdGFza0FkZC5hcHBlbmRDaGlsZCh0YXNrQWRkVGl0bGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBObyBwcm9qZWN0IHdhcm5pbmdcbiAgICAgIGNvbnN0IHRhc2tBZGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRhc2tBZGQuY2xhc3NMaXN0LmFkZCgndG9kby1pdGVtLWFkZCcsICdhZGQtcHJvamVjdC1tb2RhbCcpO1xuICAgICAgdGFza3NMaXN0LmFwcGVuZENoaWxkKHRhc2tBZGQpO1xuICAgICAgY29uc3QgdGFza0FkZEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICB0YXNrQWRkSWNvbi5jbGFzc0xpc3QuYWRkKCdmYXInLCAnZmEtZXhjbGFtYXRpb24tY2lyY2xlJywgJ2ZhLWZ3JywgJ3Byb2plY3QtcmVkJywgJ2FkZC1wcm9qZWN0LW1vZGFsJyk7XG4gICAgICB0YXNrQWRkLmFwcGVuZENoaWxkKHRhc2tBZGRJY29uKTtcbiAgICAgIGNvbnN0IHRhc2tBZGRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIHRhc2tBZGRUaXRsZS5jbGFzc0xpc3QuYWRkKCd0b2RvLWl0ZW0tdGl0bGUnLCAnYWRkLXByb2plY3QtbW9kYWwnKTtcbiAgICAgIHRhc2tBZGRUaXRsZS50ZXh0Q29udGVudCA9ICdZb3UgZG9uXFwndCBoYXZlIGFueSBwcm9qZWN0cywgY3JlYXRlIG9uZS4nO1xuICAgICAgdGFza0FkZC5hcHBlbmRDaGlsZCh0YXNrQWRkVGl0bGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoYW5nZUxpbmsocHJvamVjdEluZGV4KSB7XG4gICAgc2VsZWN0TGluayhwcm9qZWN0SW5kZXgpO1xuICAgIHJlbmRlckhlYWRlcihwcm9qZWN0SW5kZXgpO1xuICAgIHJlbmRlclRhc2tzKHByb2plY3RJbmRleCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGJvZHksXG4gICAgcHJvamVjdE1vZGFsLFxuICAgIGNvbmZpcm1Nb2RhbCxcbiAgICBtb2RhbHMsXG4gICAgZm9ybVByb2plY3RUaXRsZUVycm9yLFxuICAgIGZvcm1UYXNrVGl0bGVFcnJvcixcbiAgICBmb3JtVGFza1Byb2plY3RFcnJvcixcbiAgICByZXNwb25zaXZlU2lkZWJhcixcbiAgICB0b2dnbGVTaWRlYmFyLFxuICAgIHNob3dQcm9qZWN0TW9kYWwsXG4gICAgc2hvd1Rhc2tNb2RhbCxcbiAgICBzaG93Q29uZmlybU1vZGFsLFxuICAgIHNob3dFbGVtZW50LFxuICAgIGhpZGVFbGVtZW50LFxuICAgIHJlbmRlclByb2plY3RzLFxuICAgIHJlbmRlclRhc2tzLFxuICAgIGNoYW5nZUxpbmssXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBkb207XG4iLCJpbXBvcnQgdmFsaWRhdGlvbiBmcm9tICcuL3ZhbGlkYXRpb24nO1xuaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgcHJvamVjdHMgZnJvbSAnLi9wcm9qZWN0cyc7XG5pbXBvcnQgdGFza3MgZnJvbSAnLi90YXNrcyc7XG5cbmNvbnN0IGhhbmRsZXJzID0gKCgpID0+IHtcbiAgZnVuY3Rpb24gY2xpY2tIYW5kbGVyKCkge1xuICAgIGxldCBwcm9qZWN0SW5kZXggPSAwO1xuICAgIGxldCB0YXNrSW5kZXggPSAwO1xuICAgIGxldCBsaW5rID0gJ2luYm94JztcbiAgICBkb20uYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAvLyBUb2dnbGUgc2lkZWJhclxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndG9nZ2xlLXNpZGViYXInKSkge1xuICAgICAgICBkb20udG9nZ2xlU2lkZWJhcigpO1xuICAgICAgLy8gTmF2IGxpbmtzXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbGluay1pbmJveCcpKSB7XG4gICAgICAgIGxpbmsgPSAnaW5ib3gnO1xuICAgICAgICBkb20uY2hhbmdlTGluaygnaW5ib3gnKTtcbiAgICAgIC8vIE5hdiBsaW5rc1xuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2xpbmstdG9kYXknKSkge1xuICAgICAgICBjb25zb2xlLmxvZygnVG9kYXknKTtcbiAgICAgICAgbGluayA9ICd0b2RheSc7XG4gICAgICAgIGRvbS5jaGFuZ2VMaW5rKCd0b2RheScpO1xuICAgICAgLy8gTmF2IGxpbmtzXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbGluay13ZWVrJykpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1dlZWsnKTtcbiAgICAgICAgbGluayA9ICd3ZWVrJztcbiAgICAgICAgZG9tLmNoYW5nZUxpbmsoJ3dlZWsnKTtcbiAgICAgIC8vIE5hdiBsaW5rc1xuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2xpbmstaW1wb3J0YW50JykpIHtcbiAgICAgICAgbGluayA9ICdpbXBvcnRhbnQnO1xuICAgICAgICBkb20uY2hhbmdlTGluaygnaW1wb3J0YW50Jyk7XG4gICAgICAvLyBOYXYgbGlua3NcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsaW5rLWNvbXBsZXRlZCcpKSB7XG4gICAgICAgIGxpbmsgPSAnY29tcGxldGVkJztcbiAgICAgICAgZG9tLmNoYW5nZUxpbmsoJ2NvbXBsZXRlZCcpO1xuICAgICAgLy8gUHJvamVjdCBsaW5rc1xuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3NpZGViYXItcHJvamVjdCcpKSB7XG4gICAgICAgIHByb2plY3RJbmRleCA9IHBhcnNlSW50KChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSkgPyBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSA6IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgbGluayA9IHVuZGVmaW5lZDtcbiAgICAgICAgZG9tLmNoYW5nZUxpbmsocHJvamVjdEluZGV4KTtcbiAgICAgIC8vIEFkZCBwcm9qZWN0IG1vZGFsIG9wZW5cbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtcHJvamVjdC1tb2RhbCcpKSB7XG4gICAgICAgIGxpbmsgPSB1bmRlZmluZWQ7XG4gICAgICAgIGRvbS5zaG93UHJvamVjdE1vZGFsKCdhZGRQcm9qZWN0Jyk7XG4gICAgICAvLyBFZGl0IHByb2plY3QgbW9kYWwgb3BlblxuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtcHJvamVjdC1tb2RhbCcpKSB7XG4gICAgICAgIHByb2plY3RJbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgZG9tLnNob3dQcm9qZWN0TW9kYWwoJ2VkaXRQcm9qZWN0JywgcHJvamVjdEluZGV4KTtcbiAgICAgIC8vIFJlbW92ZSBwcm9qZWN0IG1vZGFsIG9wZW5cbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdyZW1vdmUtcHJvamVjdC1tb2RhbCcpKSB7XG4gICAgICAgIHByb2plY3RJbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgZG9tLnNob3dDb25maXJtTW9kYWwoJ3JlbW92ZVByb2plY3QnLCBwcm9qZWN0SW5kZXgpO1xuICAgICAgLy8gQWRkIHRhc2sgbW9kYWwgb3BlblxuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FkZC10YXNrLW1vZGFsJykpIHtcbiAgICAgICAgcHJvamVjdEluZGV4ID0gcGFyc2VJbnQoKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QtaW5kZXgnKSkgPyBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0LWluZGV4JykgOiBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcpLCAxMCk7XG4gICAgICAgIGRvbS5zaG93VGFza01vZGFsKCdhZGRUYXNrJywgcHJvamVjdEluZGV4KTtcbiAgICAgIC8vIEVkaXQgdGFzayBtb2RhbCBvcGVuXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC10YXNrLW1vZGFsJykpIHtcbiAgICAgICAgdGFza0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1pbmRleCcpLCAxMCk7XG4gICAgICAgIGRvbS5zaG93VGFza01vZGFsKCdlZGl0VGFzaycsIHByb2plY3RJbmRleCwgdGFza0luZGV4KTtcbiAgICAgIC8vIFJlbW92ZSB0YXNrIG1vZGFsIG9wZW5cbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdyZW1vdmUtdGFzay1tb2RhbCcpKSB7XG4gICAgICAgIHByb2plY3RJbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QtaW5kZXgnKSwgMTApO1xuICAgICAgICB0YXNrSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4JyksIDEwKTtcbiAgICAgICAgZG9tLnNob3dDb25maXJtTW9kYWwoJ3JlbW92ZVRhc2snLCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCk7XG4gICAgICAvLyBDbG9zZSBhbGwgbW9kYWxzXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2xvc2UnKSB8fCBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21vZGFsJykpIHtcbiAgICAgICAgZG9tLmhpZGVFbGVtZW50KGRvbS5tb2RhbHMpO1xuICAgICAgLy8gQWRkIHByb2plY3RcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtcHJvamVjdCcpKSB7XG4gICAgICAgIHZhbGlkYXRpb24uYWRkUHJvamVjdChlKTtcbiAgICAgIC8vIEVkaXQgcHJvamVjdFxuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtcHJvamVjdCcpKSB7XG4gICAgICAgIHZhbGlkYXRpb24uZWRpdFByb2plY3QoZSwgcHJvamVjdEluZGV4LCBsaW5rKTtcbiAgICAgIC8vIFJlbW92ZSBwcm9qZWN0XG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncmVtb3ZlLXByb2plY3QnKSkge1xuICAgICAgICBwcm9qZWN0cy5yZW1vdmVQcm9qZWN0KHByb2plY3RJbmRleCk7XG4gICAgICAvLyBBZGQgVGFza1xuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FkZC10YXNrJykpIHtcbiAgICAgICAgdmFsaWRhdGlvbi5hZGRUYXNrKGUsIHByb2plY3RJbmRleCk7XG4gICAgICAvLyBFZGl0IFRhc2tcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LXRhc2snKSkge1xuICAgICAgICB2YWxpZGF0aW9uLmVkaXRUYXNrKGUsIHByb2plY3RJbmRleCwgdGFza0luZGV4LCBsaW5rKTtcbiAgICAgIC8vIFJlbW92ZSB0YXNrXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncmVtb3ZlLXRhc2snKSkge1xuICAgICAgICB0YXNrcy5yZW1vdmVUYXNrKHByb2plY3RJbmRleCwgdGFza0luZGV4LCBsaW5rKTtcbiAgICAgIC8vIFRvZ2dsZSB0YXNrXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndG9nZ2xlLXRhc2snKSkge1xuICAgICAgICBwcm9qZWN0SW5kZXggPSBwYXJzZUludCgoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QtaW5kZXgnKSkgPyBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcpIDogZS50YXJnZXQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcpLCAxMCk7XG4gICAgICAgIHRhc2tJbmRleCA9IHBhcnNlSW50KChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1pbmRleCcpKSA/IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4JykgOiBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4JyksIDEwKTtcbiAgICAgICAgdGFza3MudG9nZ2xlVGFzayhwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCwgbGluayk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBrZXlib2FyZEhhbmRsZXIoKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgIGRvbS5oaWRlRWxlbWVudChkb20ubW9kYWxzKTtcbiAgICAgIH1cbiAgICAgIC8vIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicgJiYgbW9kYWwuc3R5bGUuZGlzcGxheSA9PT0gJ2Jsb2NrJykge1xuICAgICAgLy8gICBzdWJtaXRCdXR0b24uY2xpY2soKTtcbiAgICAgIC8vIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2l6ZUhhbmRsZXIoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRvbS5yZXNwb25zaXZlU2lkZWJhcik7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNsaWNrSGFuZGxlcixcbiAgICBrZXlib2FyZEhhbmRsZXIsXG4gICAgcmVzaXplSGFuZGxlcixcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGhhbmRsZXJzO1xuIiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5cbmNvbnN0IHByb2plY3RzID0gKCgpID0+IHtcbiAgbGV0IHByb2plY3RzTGlzdCA9IFtdO1xuXG4gIC8vIExvY2FsIHN0b3JhZ2VcbiAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpID09PSBudWxsKSB7XG4gICAgcHJvamVjdHNMaXN0ID0gW3tcbiAgICAgIHRpdGxlOiAnRGVtbycsIGljb246ICdmYS1ob21lJywgY29sb3I6ICdwcm9qZWN0LWdyZWVuJywgdGFza3M6IFtdLFxuICAgIH1dO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHByb2plY3RzRnJvbVN0b3JhZ2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpKTtcbiAgICBwcm9qZWN0c0xpc3QgPSBwcm9qZWN0c0Zyb21TdG9yYWdlO1xuICB9XG5cbiAgY2xhc3MgUHJvamVjdCB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsIGljb24sIGNvbG9yKSB7XG4gICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICB0aGlzLmljb24gPSBpY29uO1xuICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgdGhpcy50YXNrcyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByb2plY3QodGl0bGUsIGljb24sIGNvbG9yKSB7XG4gICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHRpdGxlLCBpY29uLCBjb2xvcik7XG4gICAgcHJvamVjdHNMaXN0LnB1c2gobmV3UHJvamVjdCk7XG4gICAgZG9tLnJlbmRlclByb2plY3RzKCk7XG4gICAgZG9tLmNoYW5nZUxpbmsocHJvamVjdHNMaXN0Lmxlbmd0aCAtIDEpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzTGlzdCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZWRpdFByb2plY3QoaW5kZXgsIHRpdGxlLCBpY29uLCBjb2xvciwgbGluaykge1xuICAgIHByb2plY3RzTGlzdFtpbmRleF0udGl0bGUgPSB0aXRsZTtcbiAgICBwcm9qZWN0c0xpc3RbaW5kZXhdLmljb24gPSBpY29uO1xuICAgIHByb2plY3RzTGlzdFtpbmRleF0uY29sb3IgPSBjb2xvcjtcbiAgICBkb20ucmVuZGVyUHJvamVjdHMoKTtcbiAgICBkb20uY2hhbmdlTGluayhsaW5rKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0c0xpc3QpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVByb2plY3QoaW5kZXgpIHtcbiAgICBwcm9qZWN0c0xpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICBkb20uaGlkZUVsZW1lbnQoZG9tLm1vZGFscyk7XG4gICAgZG9tLnJlbmRlclByb2plY3RzKCk7XG4gICAgZG9tLmNoYW5nZUxpbmsoJ2luYm94Jyk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHNMaXN0KSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHByb2plY3RzTGlzdCxcbiAgICBjcmVhdGVQcm9qZWN0LFxuICAgIGVkaXRQcm9qZWN0LFxuICAgIHJlbW92ZVByb2plY3QsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBwcm9qZWN0cztcbiIsImltcG9ydCBwcm9qZWN0cyBmcm9tICcuL3Byb2plY3RzJztcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuXG5jb25zdCB0YXNrcyA9ICgoKSA9PiB7XG4gIGNsYXNzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBwcmlvcml0eSwgc2NoZWR1bGUpIHtcbiAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgIHRoaXMuc2NoZWR1bGUgPSBzY2hlZHVsZTtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVRhc2socHJvamVjdEluZGV4LCB0aXRsZSwgcHJpb3JpdHkgPSAwLCBzY2hlZHVsZSA9IDAsIGxpbmsgPSBwcm9qZWN0SW5kZXgpIHtcbiAgICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2sodGl0bGUsIHByaW9yaXR5LCBzY2hlZHVsZSk7XG4gICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3MucHVzaChuZXdUYXNrKTtcbiAgICBpZiAoTnVtYmVyLmlzTmFOKHBhcnNlSW50KGxpbmssIDEwKSkpIHtcbiAgICAgIGRvbS5jaGFuZ2VMaW5rKGxpbmspO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb20ucmVuZGVyVGFza3MocHJvamVjdEluZGV4KTtcbiAgICB9XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMucHJvamVjdHNMaXN0KSk7XG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGVUYXNrKHByb2plY3RJbmRleCwgdGFza0luZGV4LCBsaW5rID0gcHJvamVjdEluZGV4KSB7XG4gICAgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0uZG9uZSkge1xuICAgICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5kb25lID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0uZG9uZSA9IHRydWU7XG4gICAgfVxuICAgIGRvbS5yZW5kZXJUYXNrcyhsaW5rKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cy5wcm9qZWN0c0xpc3QpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVkaXRUYXNrKHByb2plY3RJbmRleCwgdGFza0luZGV4LCB0aXRsZSwgcHJpb3JpdHksIHNjaGVkdWxlLCBsaW5rID0gcHJvamVjdEluZGV4KSB7XG4gICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS50aXRsZSA9IHRpdGxlO1xuICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0ucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLnNjaGVkdWxlID0gc2NoZWR1bGU7XG4gICAgZG9tLnJlbmRlclRhc2tzKGxpbmspO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzLnByb2plY3RzTGlzdCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlVGFzayhwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCwgbGluayA9IHByb2plY3RJbmRleCkge1xuICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzLnNwbGljZSh0YXNrSW5kZXgsIDEpO1xuICAgIGRvbS5oaWRlRWxlbWVudChkb20ubW9kYWxzKTtcbiAgICBkb20ucmVuZGVyVGFza3MobGluayk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMucHJvamVjdHNMaXN0KSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZVRhc2ssXG4gICAgdG9nZ2xlVGFzayxcbiAgICBlZGl0VGFzayxcbiAgICByZW1vdmVUYXNrLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdGFza3M7XG4iLCJpbXBvcnQgcHJvamVjdHMgZnJvbSAnLi9wcm9qZWN0cyc7XG5pbXBvcnQgdGFza3MgZnJvbSAnLi90YXNrcyc7XG5pbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcblxuY29uc3QgdmFsaWRhdGlvbiA9ICgoKSA9PiB7XG4gIGZ1bmN0aW9uIGFkZFByb2plY3QoZXZlbnQpIHtcbiAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5mb3Jtc1sncHJvamVjdC1mb3JtJ11bJ3Byb2plY3QtdGl0bGUnXS52YWx1ZTtcbiAgICBjb25zdCBwcm9qZWN0SWNvbiA9IGRvY3VtZW50LmZvcm1zWydwcm9qZWN0LWZvcm0nXVsncHJvamVjdC1pY29uJ10udmFsdWU7XG4gICAgY29uc3QgcHJvamVjdENvbG9yID0gZG9jdW1lbnQuZm9ybXNbJ3Byb2plY3QtZm9ybSddWydwcm9qZWN0LWNvbG9yJ10udmFsdWU7XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKHByb2plY3RUaXRsZSAhPT0gJycpIHtcbiAgICAgIHByb2plY3RzLmNyZWF0ZVByb2plY3QocHJvamVjdFRpdGxlLCBwcm9qZWN0SWNvbiwgcHJvamVjdENvbG9yKTtcbiAgICAgIGRvbS5oaWRlRWxlbWVudChkb20uZm9ybVByb2plY3RUaXRsZUVycm9yKTtcbiAgICAgIGRvbS5oaWRlRWxlbWVudChkb20ubW9kYWxzKTtcbiAgICB9IGVsc2UgaWYgKHByb2plY3RUaXRsZSA9PT0gJycpIHtcbiAgICAgIGRvbS5zaG93RWxlbWVudChkb20uZm9ybVByb2plY3RUaXRsZUVycm9yKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0UHJvamVjdChldmVudCwgaW5kZXgsIGxpbmspIHtcbiAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5mb3Jtc1sncHJvamVjdC1mb3JtJ11bJ3Byb2plY3QtdGl0bGUnXS52YWx1ZTtcbiAgICBjb25zdCBwcm9qZWN0SWNvbiA9IGRvY3VtZW50LmZvcm1zWydwcm9qZWN0LWZvcm0nXVsncHJvamVjdC1pY29uJ10udmFsdWU7XG4gICAgY29uc3QgcHJvamVjdENvbG9yID0gZG9jdW1lbnQuZm9ybXNbJ3Byb2plY3QtZm9ybSddWydwcm9qZWN0LWNvbG9yJ10udmFsdWU7XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKHByb2plY3RUaXRsZSAhPT0gJycpIHtcbiAgICAgIHByb2plY3RzLmVkaXRQcm9qZWN0KGluZGV4LCBwcm9qZWN0VGl0bGUsIHByb2plY3RJY29uLCBwcm9qZWN0Q29sb3IsIGxpbmspO1xuICAgICAgZG9tLmhpZGVFbGVtZW50KGRvbS5mb3JtUHJvamVjdFRpdGxlRXJyb3IpO1xuICAgICAgZG9tLmhpZGVFbGVtZW50KGRvbS5tb2RhbHMpO1xuICAgIH0gZWxzZSBpZiAocHJvamVjdFRpdGxlID09PSAnJykge1xuICAgICAgZG9tLnNob3dFbGVtZW50KGRvbS5mb3JtUHJvamVjdFRpdGxlRXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFRhc2soZXZlbnQsIHByb2plY3RJbmRleCkge1xuICAgIGNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LmZvcm1zWyd0YXNrLWZvcm0nXVsndGFzay10aXRsZSddLnZhbHVlO1xuICAgIGNvbnN0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LmZvcm1zWyd0YXNrLWZvcm0nXVsndGFzay1wcmlvcml0eSddLnZhbHVlO1xuICAgIGNvbnN0IHRhc2tTY2hlZHVsZSA9IGRvY3VtZW50LmZvcm1zWyd0YXNrLWZvcm0nXVsndGFzay1zY2hlZHVsZSddLnZhbHVlO1xuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRhc2stbW9kYWwnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcpO1xuICAgIGxldCB0YXNrUHJvamVjdDtcbiAgICBpZiAoTnVtYmVyLmlzTmFOKHByb2plY3RJbmRleCkpIHtcbiAgICAgIHRhc2tQcm9qZWN0ID0gcGFyc2VJbnQoZG9jdW1lbnQuZm9ybXNbJ3Rhc2stZm9ybSddWyd0YXNrLXByb2plY3QnXS52YWx1ZSwgMTApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXNrUHJvamVjdCA9IHByb2plY3RJbmRleDtcbiAgICB9XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKHRhc2tUaXRsZSAhPT0gJycgJiYgIU51bWJlci5pc05hTih0YXNrUHJvamVjdCkpIHtcbiAgICAgIHRhc2tzLmNyZWF0ZVRhc2sodGFza1Byb2plY3QsIHRhc2tUaXRsZSwgdGFza1ByaW9yaXR5LCB0YXNrU2NoZWR1bGUsIGxpbmspO1xuICAgICAgZG9tLmhpZGVFbGVtZW50KGRvbS5mb3JtVGFza1RpdGxlRXJyb3IpO1xuICAgICAgZG9tLmhpZGVFbGVtZW50KGRvbS5mb3JtVGFza1Byb2plY3RFcnJvcik7XG4gICAgICBkb20uaGlkZUVsZW1lbnQoZG9tLm1vZGFscyk7XG4gICAgfSBlbHNlIGlmICh0YXNrVGl0bGUgPT09ICcnKSB7XG4gICAgICBkb20uc2hvd0VsZW1lbnQoZG9tLmZvcm1UYXNrVGl0bGVFcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvbS5oaWRlRWxlbWVudChkb20uZm9ybVRhc2tUaXRsZUVycm9yKTtcbiAgICB9XG4gICAgaWYgKE51bWJlci5pc05hTih0YXNrUHJvamVjdCkpIHtcbiAgICAgIGRvbS5zaG93RWxlbWVudChkb20uZm9ybVRhc2tQcm9qZWN0RXJyb3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb20uaGlkZUVsZW1lbnQoZG9tLmZvcm1UYXNrUHJvamVjdEVycm9yKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0VGFzayhldmVudCwgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgsIGxpbmspIHtcbiAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5mb3Jtc1sndGFzay1mb3JtJ11bJ3Rhc2stdGl0bGUnXS52YWx1ZTtcbiAgICBjb25zdCB0YXNrUHJpb3JpdHkgPSBkb2N1bWVudC5mb3Jtc1sndGFzay1mb3JtJ11bJ3Rhc2stcHJpb3JpdHknXS52YWx1ZTtcbiAgICBjb25zdCB0YXNrU2NoZWR1bGUgPSBkb2N1bWVudC5mb3Jtc1sndGFzay1mb3JtJ11bJ3Rhc2stc2NoZWR1bGUnXS52YWx1ZTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAodGFza1RpdGxlICE9PSAnJykge1xuICAgICAgdGFza3MuZWRpdFRhc2socHJvamVjdEluZGV4LCB0YXNrSW5kZXgsIHRhc2tUaXRsZSwgdGFza1ByaW9yaXR5LCB0YXNrU2NoZWR1bGUsIGxpbmspO1xuICAgICAgZG9tLmhpZGVFbGVtZW50KGRvbS5mb3JtVGFza1RpdGxlRXJyb3IpO1xuICAgICAgZG9tLmhpZGVFbGVtZW50KGRvbS5tb2RhbHMpO1xuICAgIH0gZWxzZSBpZiAodGFza1RpdGxlID09PSAnJykge1xuICAgICAgZG9tLnNob3dFbGVtZW50KGRvbS5mb3JtVGFza1RpdGxlRXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYWRkUHJvamVjdCxcbiAgICBlZGl0UHJvamVjdCxcbiAgICBhZGRUYXNrLFxuICAgIGVkaXRUYXNrLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGlvbjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgaGFuZGxlcnMgZnJvbSAnLi9oYW5kbGVycyc7XG5cbmRvbS5yZXNwb25zaXZlU2lkZWJhcigpO1xuZG9tLnJlbmRlclByb2plY3RzKCk7XG5kb20uY2hhbmdlTGluaygnaW5ib3gnKTtcblxuaGFuZGxlcnMucmVzaXplSGFuZGxlcigpO1xuaGFuZGxlcnMuY2xpY2tIYW5kbGVyKCk7XG5oYW5kbGVycy5rZXlib2FyZEhhbmRsZXIoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==