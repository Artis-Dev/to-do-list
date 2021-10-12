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

  function selectProject(projectIndex) {
    if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList.length >= 1) {
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

    if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList.length >= 1) {
      headerProject.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].title;
      headerNav.textContent = 'Inbox';
    } else {
      headerProject.textContent = '';
      headerNav.textContent = 'Inbox';
    }
  }

  function renderTasks(projectIndex) {
    tasksList.textContent = '';
    if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList.length >= 1) {
      for (let i = 0; i < _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks.length; i += 1) {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item', 'toggle-task');
        todoItem.setAttribute('data-project-index', projectIndex);
        todoItem.setAttribute('data-task-index', i);
        tasksList.appendChild(todoItem);
        // Create icon
        const taskIcon = document.createElement('i');
        taskIcon.classList.add('far', 'fa-fw', 'toggle-task');
        if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[i].done === true) {
          taskIcon.classList.add('fa-check-circle');
        } else {
          taskIcon.classList.add('fa-circle');
        }
        if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[i].priority === 'low') {
          taskIcon.classList.add('project-green');
        } else if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[i].priority === 'medium') {
          taskIcon.classList.add('project-yellow');
        } else if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[i].priority === 'high') {
          taskIcon.classList.add('project-red');
        } else {
          taskIcon.classList.add('project-grey');
        }
        todoItem.appendChild(taskIcon);
        // Create title
        const taskTitle = document.createElement('p');
        taskTitle.classList.add('todo-item-title', 'toggle-task');
        taskTitle.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[i].title;
        todoItem.appendChild(taskTitle);
        // Create date
        const taskDate = document.createElement('p');
        taskDate.classList.add('todo-item-date', 'toggle-task');
        taskDate.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[i].schedule;
        todoItem.appendChild(taskDate);
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
/* eslint-disable no-console */





const handlers = (() => {
  function clickHandler() {
    let projectIndex = 0;
    let taskIndex = 0;
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].body.addEventListener('click', (e) => {
      // Toggle sidebar
      if (e.target.classList.contains('toggle-sidebar')) {
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].toggleSidebar();
      // Nav links
      } else if (e.target.classList.contains('sidebar-link')) {
        console.log('Change link');
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].activeLink(e.target);
      // Project links
      } else if (e.target.classList.contains('sidebar-project')) {
        projectIndex = (e.target.getAttribute('data-index')) ? e.target.getAttribute('data-index') : e.target.parentElement.getAttribute('data-index');
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].changeProject(projectIndex);
      // Add project modal open
      } else if (e.target.classList.contains('add-project-modal')) {
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].showProjectModal('addProject');
      // Edit project modal open
      } else if (e.target.classList.contains('edit-project-modal')) {
        projectIndex = e.target.parentElement.getAttribute('data-index');
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].showProjectModal('editProject', projectIndex);
      // Remove project modal open
      } else if (e.target.classList.contains('remove-project-modal')) {
        projectIndex = e.target.parentElement.getAttribute('data-index');
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].showConfirmModal('removeProject', projectIndex);
      // Add task modal open
      } else if (e.target.classList.contains('add-task-modal')) {
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].showTaskModal('addTask');
      // Edit task modal open
      } else if (e.target.classList.contains('edit-task-modal')) {
        taskIndex = e.target.parentElement.getAttribute('data-task-index');
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].showTaskModal('editTask', projectIndex, taskIndex);
      // Remove task modal open
      } else if (e.target.classList.contains('remove-task-modal')) {
        taskIndex = e.target.parentElement.getAttribute('data-task-index');
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].showConfirmModal('removeTask', projectIndex, taskIndex);
      // Close all modals
      } else if (e.target.classList.contains('close') || e.target.classList.contains('modal')) {
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].hideElement(_dom__WEBPACK_IMPORTED_MODULE_1__["default"].modals);
      // Add project
      } else if (e.target.classList.contains('add-project')) {
        _validation__WEBPACK_IMPORTED_MODULE_0__["default"].addProject(e);
      // Edit project
      } else if (e.target.classList.contains('edit-project')) {
        _validation__WEBPACK_IMPORTED_MODULE_0__["default"].editProject(e, projectIndex);
      // Remove project
      } else if (e.target.classList.contains('remove-project')) {
        _projects__WEBPACK_IMPORTED_MODULE_2__["default"].removeProject(projectIndex);
      // Add Task
      } else if (e.target.classList.contains('add-task')) {
        _validation__WEBPACK_IMPORTED_MODULE_0__["default"].addTask(e, projectIndex);
      // Edit Task
      } else if (e.target.classList.contains('edit-task')) {
        _validation__WEBPACK_IMPORTED_MODULE_0__["default"].editTask(e, projectIndex, taskIndex);
      // Remove task
      } else if (e.target.classList.contains('remove-task')) {
        _tasks__WEBPACK_IMPORTED_MODULE_3__["default"].removeTask(projectIndex, taskIndex);
      // Toggle task
      } else if (e.target.classList.contains('toggle-task')) {
        console.log('Toggle Task');
        taskIndex = (e.target.getAttribute('data-task-index')) ? e.target.getAttribute('data-task-index') : e.target.parentElement.getAttribute('data-task-index');
        _tasks__WEBPACK_IMPORTED_MODULE_3__["default"].toggleTask(projectIndex, taskIndex);
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
  const projectsList = [{
    title: 'Demo', icon: 'fa-home', color: 'project-grey', tasks: [],
  }];

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
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].changeProject(projectsList.length - 1);
  }

  function editProject(index, title, icon, color) {
    projectsList[index].title = title;
    projectsList[index].icon = icon;
    projectsList[index].color = color;
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].renderProjects();
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].changeProject(index);
  }

  function removeProject(index) {
    projectsList.splice(index, 1);
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].hideElement(_dom__WEBPACK_IMPORTED_MODULE_0__["default"].modals);
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].renderProjects();
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].changeProject(0);
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

  function createTask(projectIndex, title, priority = 0, schedule = 0) {
    const newTask = new Task(title, priority, schedule);
    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks.push(newTask);
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].renderTasks(projectIndex);
  }

  function toggleTask(projectIndex, taskIndex) {
    if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].done) {
      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].done = false;
    } else {
      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].done = true;
    }
    console.log(_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].done);
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].renderTasks(projectIndex);
  }

  function editTask(projectIndex, taskIndex, title, priority, schedule) {
    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].title = title;
    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].priority = priority;
    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].schedule = schedule;
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].renderTasks(projectIndex);
  }

  function removeTask(projectIndex, taskIndex) {
    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks.splice(taskIndex, 1);
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].hideElement(_dom__WEBPACK_IMPORTED_MODULE_1__["default"].modals);
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].renderTasks(projectIndex);
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

  function editProject(event, index) {
    const projectTitle = document.forms['project-form']['project-title'].value;
    const projectIcon = document.forms['project-form']['project-icon'].value;
    const projectColor = document.forms['project-form']['project-color'].value;

    event.preventDefault();

    if (projectTitle !== '') {
      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].editProject(index, projectTitle, projectIcon, projectColor);
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

    event.preventDefault();

    if (taskTitle !== '') {
      _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].createTask(projectIndex, taskTitle, taskPriority, taskSchedule);
      _dom__WEBPACK_IMPORTED_MODULE_2__["default"].hideElement(_dom__WEBPACK_IMPORTED_MODULE_2__["default"].formTaskTitleError);
      _dom__WEBPACK_IMPORTED_MODULE_2__["default"].hideElement(_dom__WEBPACK_IMPORTED_MODULE_2__["default"].modals);
    } else if (taskTitle === '') {
      _dom__WEBPACK_IMPORTED_MODULE_2__["default"].showElement(_dom__WEBPACK_IMPORTED_MODULE_2__["default"].formTaskTitleError);
    }
  }

  function editTask(event, projectIndex, taskIndex) {
    const taskTitle = document.forms['task-form']['task-title'].value;
    const taskPriority = document.forms['task-form']['task-priority'].value;
    const taskSchedule = document.forms['task-form']['task-schedule'].value;

    event.preventDefault();

    if (taskTitle !== '') {
      _tasks__WEBPACK_IMPORTED_MODULE_1__["default"].editTask(projectIndex, taskIndex, taskTitle, taskPriority, taskSchedule);
      _dom__WEBPACK_IMPORTED_MODULE_2__["default"].hideElement(_dom__WEBPACK_IMPORTED_MODULE_2__["default"].formTaskTitleError);
      _dom__WEBPACK_IMPORTED_MODULE_2__["default"].hideElement(_dom__WEBPACK_IMPORTED_MODULE_2__["default"].modals);
    } else if (taskTitle === '') {
      _dom__WEBPACK_IMPORTED_MODULE_2__["default"].showElement(_dom__WEBPACK_IMPORTED_MODULE_2__["default"].formrTaskTitleError);
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
_dom__WEBPACK_IMPORTED_MODULE_0__["default"].changeProject(0, 0);

_handlers__WEBPACK_IMPORTED_MODULE_1__["default"].resizeHandler();
_handlers__WEBPACK_IMPORTED_MODULE_1__["default"].clickHandler();
_handlers__WEBPACK_IMPORTED_MODULE_1__["default"].keyboardHandler();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ053QjtBQUNVOztBQUVsQyw4REFBcUI7QUFDckIsMkRBQWtCO0FBQ2xCLDBEQUFpQjs7QUFFakIsK0RBQXNCO0FBQ3RCLDhEQUFxQjtBQUNyQixpRUFBd0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2hhbmRsZXJzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy90YXNrcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb2plY3RzIGZyb20gJy4vcHJvamVjdHMnO1xuXG5jb25zdCBkb20gPSAoKCkgPT4ge1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKTtcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgY29uc3QgcHJvamVjdHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXItcHJvamVjdHMtbGlzdCcpO1xuICBjb25zdCB0YXNrc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1pdGVtLWxpc3QnKTtcbiAgY29uc3QgcHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbW9kYWwnKTtcbiAgY29uc3QgdGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stbW9kYWwnKTtcbiAgY29uc3QgY29uZmlybU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbmZpcm0tbW9kYWwnKTtcbiAgY29uc3QgbW9kYWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1vZGFsJyk7XG4gIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZm9ybScpO1xuICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWZvcm0nKTtcbiAgY29uc3QgZm9ybVByb2plY3RUaXRsZUVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtdGl0bGUtZXJyb3InKTtcbiAgY29uc3QgZm9ybVRhc2tUaXRsZUVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stdGl0bGUtZXJyb3InKTtcblxuICBmdW5jdGlvbiByZXNwb25zaXZlU2lkZWJhcigpIHtcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPD0gOTYwKSB7XG4gICAgICBzaWRlYmFyLmNsYXNzTGlzdC5yZW1vdmUoJ3NpZGViYXItc2hvdycpO1xuICAgICAgc2lkZWJhci5jbGFzc0xpc3QuYWRkKCdzaWRlYmFyLWhpZGUnKTtcbiAgICAgIG1haW4uY2xhc3NMaXN0LmFkZCgnbWFpbi1tb2JpbGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdzaWRlYmFyLWhpZGUnKTtcbiAgICAgIHNpZGViYXIuY2xhc3NMaXN0LmFkZCgnc2lkZWJhci1zaG93Jyk7XG4gICAgICBtYWluLmNsYXNzTGlzdC5yZW1vdmUoJ21haW4tbW9iaWxlJyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlU2lkZWJhcigpIHtcbiAgICBpZiAoIXNpZGViYXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaWRlYmFyLXNob3cnKSkge1xuICAgICAgc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdzaWRlYmFyLWhpZGUnKTtcbiAgICAgIHNpZGViYXIuY2xhc3NMaXN0LmFkZCgnc2lkZWJhci1zaG93Jyk7XG4gICAgfSBlbHNlIGlmIChzaWRlYmFyLmNsYXNzTGlzdC5jb250YWlucygnc2lkZWJhci1zaG93JykpIHtcbiAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnc2lkZWJhci1zaG93Jyk7XG4gICAgICBzaWRlYmFyLmNsYXNzTGlzdC5hZGQoJ3NpZGViYXItaGlkZScpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3dQcm9qZWN0TW9kYWwobW9kYWwsIGluZGV4ID0gZmFsc2UpIHtcbiAgICBjb25zdCBtb2RhbEhlYWRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1tb2RhbC10aXRsZScpO1xuICAgIGNvbnN0IG1vZGFsU3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtYnV0dG9uJyk7XG5cbiAgICBwcm9qZWN0TW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIHByb2plY3RNb2RhbC5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Jyk7XG5cbiAgICBpZiAobW9kYWwgPT09ICdhZGRQcm9qZWN0Jykge1xuICAgICAgcHJvamVjdEZvcm0ucmVzZXQoKTtcbiAgICAgIG1vZGFsSGVhZGluZy50ZXh0Q29udGVudCA9ICdOZXcgcHJvamVjdCc7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdBZGQnO1xuICAgICAgbW9kYWxTdWJtaXRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnZWRpdC1wcm9qZWN0Jyk7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdhZGQtcHJvamVjdCcpO1xuICAgIH0gZWxzZSBpZiAobW9kYWwgPT09ICdlZGl0UHJvamVjdCcpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRQcm9qZWN0VGl0bGUgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLnRpdGxlO1xuICAgICAgY29uc3QgY3VycmVudFByb2plY3RJY29uID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2luZGV4XS5pY29uO1xuICAgICAgY29uc3QgY3VycmVudFByb2plY3RDb2xvciA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0uY29sb3I7XG5cbiAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtLXByb2plY3QtdGl0bGUnKTtcbiAgICAgIGNvbnN0IHByb2plY3RJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbdmFsdWU9JHtjdXJyZW50UHJvamVjdEljb259XWApO1xuICAgICAgY29uc3QgcHJvamVjdENvbG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbdmFsdWU9JHtjdXJyZW50UHJvamVjdENvbG9yfV1gKTtcblxuICAgICAgcHJvamVjdFRpdGxlLnZhbHVlID0gY3VycmVudFByb2plY3RUaXRsZTtcbiAgICAgIHByb2plY3RJY29uLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgcHJvamVjdENvbG9yLmNoZWNrZWQgPSB0cnVlO1xuXG4gICAgICBtb2RhbEhlYWRpbmcudGV4dENvbnRlbnQgPSAnRWRpdCBwcm9qZWN0JztcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gJ0VkaXQnO1xuICAgICAgbW9kYWxTdWJtaXRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnYWRkLXByb2plY3QnKTtcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2VkaXQtcHJvamVjdCcpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3dUYXNrTW9kYWwobW9kYWwsIHByb2plY3RJbmRleCA9IGZhbHNlLCB0YXNrSW5kZXggPSBmYWxzZSkge1xuICAgIGNvbnN0IG1vZGFsSGVhZGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLW1vZGFsLXRpdGxlJyk7XG4gICAgY29uc3QgbW9kYWxTdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1idXR0b24nKTtcblxuICAgIHRhc2tNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgdGFza01vZGFsLmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXknKTtcblxuICAgIGlmIChtb2RhbCA9PT0gJ2FkZFRhc2snKSB7XG4gICAgICB0YXNrRm9ybS5yZXNldCgpO1xuICAgICAgbW9kYWxIZWFkaW5nLnRleHRDb250ZW50ID0gJ05ldyB0YXNrJztcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gJ0FkZCc7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdlZGl0LXRhc2snKTtcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2FkZC10YXNrJyk7XG4gICAgfSBlbHNlIGlmIChtb2RhbCA9PT0gJ2VkaXRUYXNrJykge1xuICAgICAgY29uc3QgY3VycmVudFRhc2tUaXRsZSA9IHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0udGl0bGU7XG4gICAgICBjb25zdCBjdXJyZW50VGFza1ByaW9yaXR5ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5wcmlvcml0eTtcbiAgICAgIGNvbnN0IGN1cnJlbnRUYXNrU2NoZWR1bGUgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLnNjaGVkdWxlO1xuXG4gICAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybS10YXNrLXRpdGxlJyk7XG4gICAgICBjb25zdCB0YXNrUHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybS10YXNrLXByaW9yaXR5Jyk7XG4gICAgICBjb25zdCB0YXNrU2NoZWR1bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybS10YXNrLXNjaGVkdWxlJyk7XG5cbiAgICAgIHRhc2tUaXRsZS52YWx1ZSA9IGN1cnJlbnRUYXNrVGl0bGU7XG4gICAgICB0YXNrUHJpb3JpdHkudmFsdWUgPSBjdXJyZW50VGFza1ByaW9yaXR5O1xuICAgICAgdGFza1NjaGVkdWxlLnZhbHVlID0gY3VycmVudFRhc2tTY2hlZHVsZTtcblxuICAgICAgbW9kYWxIZWFkaW5nLnRleHRDb250ZW50ID0gJ0VkaXQgcHJvamVjdCc7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdFZGl0JztcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2FkZC10YXNrJyk7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdlZGl0LXRhc2snKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93Q29uZmlybU1vZGFsKG1vZGFsLCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCkge1xuICAgIGNvbnN0IG1vZGFsSGVhZGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb25maXJtLW1vZGFsLXRpdGxlJyk7XG4gICAgY29uc3QgbW9kYWxDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmZpcm0tbW9kYWwtY29udGVudCcpO1xuICAgIGNvbnN0IG1vZGFsU3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbmZpcm0tYnV0dG9uJyk7XG4gICAgY29uc3QgbW9kYWxDb250ZW50UHJlZml4ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1lvdSBhcmUgZ29pbmcgdG8gcmVtb3ZlICcpO1xuICAgIGNvbnN0IG1vZGFsQ29udGVudFBvc3RmaXggPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnLiBUaGlzIGFjdGlvbiBjYW5ub3QgYmUgdW5kb25lLicpO1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgY29uZmlybU1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBjb25maXJtTW9kYWwuY2xhc3NMaXN0LmFkZCgnZGlzcGxheScpO1xuXG4gICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgnY29uZmlybS1tb2RhbC10aXRsZScpO1xuXG4gICAgbW9kYWxDb250ZW50LnRleHRDb250ZW50ID0gJyc7XG5cbiAgICBpZiAobW9kYWwgPT09ICdyZW1vdmVQcm9qZWN0Jykge1xuICAgICAgbW9kYWxIZWFkaW5nLnRleHRDb250ZW50ID0gJ1JlbW92ZSBwcm9qZWN0JztcbiAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGl0bGU7XG4gICAgICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQobW9kYWxDb250ZW50UHJlZml4KTtcbiAgICAgIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQobW9kYWxDb250ZW50UG9zdGZpeCk7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdyZW1vdmUtdGFzaycpO1xuICAgICAgbW9kYWxTdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgncmVtb3ZlLXByb2plY3QnKTtcbiAgICB9IGVsc2UgaWYgKG1vZGFsID09PSAncmVtb3ZlVGFzaycpIHtcbiAgICAgIG1vZGFsSGVhZGluZy50ZXh0Q29udGVudCA9ICdSZW1vdmUgdGFzayc7XG4gICAgICB0aXRsZS50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0udGl0bGU7XG4gICAgICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQobW9kYWxDb250ZW50UHJlZml4KTtcbiAgICAgIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQobW9kYWxDb250ZW50UG9zdGZpeCk7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdyZW1vdmUtcHJvamVjdCcpO1xuICAgICAgbW9kYWxTdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgncmVtb3ZlLXRhc2snKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93RWxlbWVudChlbGVtZW50KSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Jyk7XG4gIH1cblxuICBmdW5jdGlvbiBoaWRlRWxlbWVudChtb2RhbCkge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YuY2FsbChOb2RlTGlzdC5wcm90b3R5cGUsIG1vZGFsKSkge1xuICAgICAgbW9kYWwuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc3BsYXknKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheScpO1xuICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFjdGl2ZUxpbmsobGluaykge1xuICAgIGNvbnN0IG5hdkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYS5zaWRlYmFyLWxpbmsnKTtcbiAgICBuYXZMaW5rcy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIH0pO1xuICAgIGlmIChsaW5rLmNsYXNzTGlzdC5jb250YWlucygnc2lkZWJhci1saW5rLWljb24nKSkge1xuICAgICAgbGluay5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlclByb2plY3RzKCkge1xuICAgIC8vIENyZWF0ZSBsaW5rXG4gICAgcHJvamVjdHNMaXN0LnRleHRDb250ZW50ID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5wcm9qZWN0c0xpc3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHByb2plY3RMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgcHJvamVjdExpbmsuY2xhc3NMaXN0LmFkZCgnc2lkZWJhci1wcm9qZWN0Jyk7XG4gICAgICBwcm9qZWN0TGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycpO1xuICAgICAgcHJvamVjdExpbmsuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaSk7XG4gICAgICBwcm9qZWN0c0xpc3QuYXBwZW5kQ2hpbGQocHJvamVjdExpbmspO1xuICAgICAgLy8gQ3JlYXRlIGljb25cbiAgICAgIGNvbnN0IHByb2plY3RJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgcHJvamVjdEljb24uY2xhc3NMaXN0LmFkZCgnZmFyJywgcHJvamVjdHMucHJvamVjdHNMaXN0W2ldLmljb24sICdmYS1mdycsIHByb2plY3RzLnByb2plY3RzTGlzdFtpXS5jb2xvciwgJ3NpZGViYXItcHJvamVjdCcsICdzaWRlYmFyLXByb2plY3QtaWNvbicpO1xuICAgICAgcHJvamVjdExpbmsuYXBwZW5kQ2hpbGQocHJvamVjdEljb24pO1xuICAgICAgLy8gQ3JlYXRlIHRpdGxlXG4gICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGl0bGUpO1xuICAgICAgcHJvamVjdExpbmsuYXBwZW5kQ2hpbGQocHJvamVjdFRpdGxlKTtcbiAgICAgIC8vIENyZWF0ZSByZW1vdmUgaWNvblxuICAgICAgY29uc3QgcHJvamVjdFJlbW92ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICBwcm9qZWN0UmVtb3ZlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYXInLCAnZmEtdHJhc2gnLCAncmVtb3ZlLXByb2plY3QtbW9kYWwnKTtcbiAgICAgIHByb2plY3RMaW5rLmFwcGVuZENoaWxkKHByb2plY3RSZW1vdmVJY29uKTtcbiAgICAgIC8vIENyZWF0ZSBlZGl0IGljb25cbiAgICAgIGNvbnN0IHByb2plY3RFZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgIHByb2plY3RFZGl0SWNvbi5jbGFzc0xpc3QuYWRkKCdmYXInLCAnZmEtZWRpdCcsICdlZGl0LXByb2plY3QtbW9kYWwnKTtcbiAgICAgIHByb2plY3RMaW5rLmFwcGVuZENoaWxkKHByb2plY3RFZGl0SWNvbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0UHJvamVjdChwcm9qZWN0SW5kZXgpIHtcbiAgICBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0Lmxlbmd0aCA+PSAxKSB7XG4gICAgICBjb25zdCBwcm9qZWN0TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhLnNpZGViYXItcHJvamVjdCcpO1xuICAgICAgcHJvamVjdExpbmtzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgIH0pO1xuICAgICAgcHJvamVjdExpbmtzW3Byb2plY3RJbmRleF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVySGVhZGVyKHByb2plY3RJbmRleCkge1xuICAgIGNvbnN0IGhlYWRlck5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWhlYWRlci1uYXYnKTtcbiAgICBjb25zdCBoZWFkZXJQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8taGVhZGVyLXByb2plY3QnKTtcblxuICAgIGlmIChwcm9qZWN0cy5wcm9qZWN0c0xpc3QubGVuZ3RoID49IDEpIHtcbiAgICAgIGhlYWRlclByb2plY3QudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50aXRsZTtcbiAgICAgIGhlYWRlck5hdi50ZXh0Q29udGVudCA9ICdJbmJveCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWRlclByb2plY3QudGV4dENvbnRlbnQgPSAnJztcbiAgICAgIGhlYWRlck5hdi50ZXh0Q29udGVudCA9ICdJbmJveCc7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyVGFza3MocHJvamVjdEluZGV4KSB7XG4gICAgdGFza3NMaXN0LnRleHRDb250ZW50ID0gJyc7XG4gICAgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdC5sZW5ndGggPj0gMSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCB0b2RvSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0b2RvSXRlbS5jbGFzc0xpc3QuYWRkKCd0b2RvLWl0ZW0nLCAndG9nZ2xlLXRhc2snKTtcbiAgICAgICAgdG9kb0l0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QtaW5kZXgnLCBwcm9qZWN0SW5kZXgpO1xuICAgICAgICB0b2RvSXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1pbmRleCcsIGkpO1xuICAgICAgICB0YXNrc0xpc3QuYXBwZW5kQ2hpbGQodG9kb0l0ZW0pO1xuICAgICAgICAvLyBDcmVhdGUgaWNvblxuICAgICAgICBjb25zdCB0YXNrSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgdGFza0ljb24uY2xhc3NMaXN0LmFkZCgnZmFyJywgJ2ZhLWZ3JywgJ3RvZ2dsZS10YXNrJyk7XG4gICAgICAgIGlmIChwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1tpXS5kb25lID09PSB0cnVlKSB7XG4gICAgICAgICAgdGFza0ljb24uY2xhc3NMaXN0LmFkZCgnZmEtY2hlY2stY2lyY2xlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFza0ljb24uY2xhc3NMaXN0LmFkZCgnZmEtY2lyY2xlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW2ldLnByaW9yaXR5ID09PSAnbG93Jykge1xuICAgICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtZ3JlZW4nKTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1tpXS5wcmlvcml0eSA9PT0gJ21lZGl1bScpIHtcbiAgICAgICAgICB0YXNrSWNvbi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LXllbGxvdycpO1xuICAgICAgICB9IGVsc2UgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW2ldLnByaW9yaXR5ID09PSAnaGlnaCcpIHtcbiAgICAgICAgICB0YXNrSWNvbi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LXJlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtZ3JleScpO1xuICAgICAgICB9XG4gICAgICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKHRhc2tJY29uKTtcbiAgICAgICAgLy8gQ3JlYXRlIHRpdGxlXG4gICAgICAgIGNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgdGFza1RpdGxlLmNsYXNzTGlzdC5hZGQoJ3RvZG8taXRlbS10aXRsZScsICd0b2dnbGUtdGFzaycpO1xuICAgICAgICB0YXNrVGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1tpXS50aXRsZTtcbiAgICAgICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQodGFza1RpdGxlKTtcbiAgICAgICAgLy8gQ3JlYXRlIGRhdGVcbiAgICAgICAgY29uc3QgdGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIHRhc2tEYXRlLmNsYXNzTGlzdC5hZGQoJ3RvZG8taXRlbS1kYXRlJywgJ3RvZ2dsZS10YXNrJyk7XG4gICAgICAgIHRhc2tEYXRlLnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbaV0uc2NoZWR1bGU7XG4gICAgICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKHRhc2tEYXRlKTtcbiAgICAgICAgLy8gQ3JlYXRlIGVkaXQgaWNvblxuICAgICAgICBjb25zdCB0YXNrRWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgIHRhc2tFZGl0SWNvbi5jbGFzc0xpc3QuYWRkKCdmYXInLCAnZmEtZWRpdCcsICdmYS1mdycsICdlZGl0LXRhc2stbW9kYWwnKTtcbiAgICAgICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQodGFza0VkaXRJY29uKTtcbiAgICAgICAgLy8gQ3JlYXRlIHJlbW92ZSBpY29uXG4gICAgICAgIGNvbnN0IHRhc2tSZW1vdmVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICB0YXNrUmVtb3ZlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYXInLCAnZmEtdHJhc2gnLCAnZmEtZncnLCAncmVtb3ZlLXRhc2stbW9kYWwnKTtcbiAgICAgICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQodGFza1JlbW92ZUljb24pO1xuICAgICAgfVxuICAgICAgLy8gQWRkIHRhc2sgbGluZVxuICAgICAgY29uc3QgdGFza0FkZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdGFza0FkZC5jbGFzc0xpc3QuYWRkKCd0b2RvLWl0ZW0tYWRkJywgJ2FkZC10YXNrLW1vZGFsJyk7XG4gICAgICB0YXNrc0xpc3QuYXBwZW5kQ2hpbGQodGFza0FkZCk7XG4gICAgICBjb25zdCB0YXNrQWRkSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgIHRhc2tBZGRJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhcicsICdmYS1wbHVzJywgJ2ZhLWZ3JywgJ2FkZC10YXNrLW1vZGFsJyk7XG4gICAgICB0YXNrQWRkLmFwcGVuZENoaWxkKHRhc2tBZGRJY29uKTtcbiAgICAgIGNvbnN0IHRhc2tBZGRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIHRhc2tBZGRUaXRsZS5jbGFzc0xpc3QuYWRkKCd0b2RvLWl0ZW0tdGl0bGUnLCAnYWRkLXRhc2stbW9kYWwnKTtcbiAgICAgIHRhc2tBZGRUaXRsZS50ZXh0Q29udGVudCA9ICdBZGQgbmV3IHRhc2snO1xuICAgICAgdGFza0FkZC5hcHBlbmRDaGlsZCh0YXNrQWRkVGl0bGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoYW5nZVByb2plY3QocHJvamVjdEluZGV4KSB7XG4gICAgc2VsZWN0UHJvamVjdChwcm9qZWN0SW5kZXgpO1xuICAgIHJlbmRlckhlYWRlcihwcm9qZWN0SW5kZXgpO1xuICAgIHJlbmRlclRhc2tzKHByb2plY3RJbmRleCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGJvZHksXG4gICAgcHJvamVjdE1vZGFsLFxuICAgIGNvbmZpcm1Nb2RhbCxcbiAgICBtb2RhbHMsXG4gICAgZm9ybVByb2plY3RUaXRsZUVycm9yLFxuICAgIGZvcm1UYXNrVGl0bGVFcnJvcixcbiAgICByZXNwb25zaXZlU2lkZWJhcixcbiAgICB0b2dnbGVTaWRlYmFyLFxuICAgIHNob3dQcm9qZWN0TW9kYWwsXG4gICAgc2hvd1Rhc2tNb2RhbCxcbiAgICBzaG93Q29uZmlybU1vZGFsLFxuICAgIHNob3dFbGVtZW50LFxuICAgIGhpZGVFbGVtZW50LFxuICAgIGFjdGl2ZUxpbmssXG4gICAgcmVuZGVyUHJvamVjdHMsXG4gICAgcmVuZGVyVGFza3MsXG4gICAgY2hhbmdlUHJvamVjdCxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRvbTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbmltcG9ydCB2YWxpZGF0aW9uIGZyb20gJy4vdmFsaWRhdGlvbic7XG5pbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcbmltcG9ydCBwcm9qZWN0cyBmcm9tICcuL3Byb2plY3RzJztcbmltcG9ydCB0YXNrcyBmcm9tICcuL3Rhc2tzJztcblxuY29uc3QgaGFuZGxlcnMgPSAoKCkgPT4ge1xuICBmdW5jdGlvbiBjbGlja0hhbmRsZXIoKSB7XG4gICAgbGV0IHByb2plY3RJbmRleCA9IDA7XG4gICAgbGV0IHRhc2tJbmRleCA9IDA7XG4gICAgZG9tLmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgLy8gVG9nZ2xlIHNpZGViYXJcbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3RvZ2dsZS1zaWRlYmFyJykpIHtcbiAgICAgICAgZG9tLnRvZ2dsZVNpZGViYXIoKTtcbiAgICAgIC8vIE5hdiBsaW5rc1xuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3NpZGViYXItbGluaycpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDaGFuZ2UgbGluaycpO1xuICAgICAgICBkb20uYWN0aXZlTGluayhlLnRhcmdldCk7XG4gICAgICAvLyBQcm9qZWN0IGxpbmtzXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2lkZWJhci1wcm9qZWN0JykpIHtcbiAgICAgICAgcHJvamVjdEluZGV4ID0gKGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpKSA/IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpIDogZS50YXJnZXQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgZG9tLmNoYW5nZVByb2plY3QocHJvamVjdEluZGV4KTtcbiAgICAgIC8vIEFkZCBwcm9qZWN0IG1vZGFsIG9wZW5cbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtcHJvamVjdC1tb2RhbCcpKSB7XG4gICAgICAgIGRvbS5zaG93UHJvamVjdE1vZGFsKCdhZGRQcm9qZWN0Jyk7XG4gICAgICAvLyBFZGl0IHByb2plY3QgbW9kYWwgb3BlblxuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtcHJvamVjdC1tb2RhbCcpKSB7XG4gICAgICAgIHByb2plY3RJbmRleCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgICAgIGRvbS5zaG93UHJvamVjdE1vZGFsKCdlZGl0UHJvamVjdCcsIHByb2plY3RJbmRleCk7XG4gICAgICAvLyBSZW1vdmUgcHJvamVjdCBtb2RhbCBvcGVuXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncmVtb3ZlLXByb2plY3QtbW9kYWwnKSkge1xuICAgICAgICBwcm9qZWN0SW5kZXggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xuICAgICAgICBkb20uc2hvd0NvbmZpcm1Nb2RhbCgncmVtb3ZlUHJvamVjdCcsIHByb2plY3RJbmRleCk7XG4gICAgICAvLyBBZGQgdGFzayBtb2RhbCBvcGVuXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWRkLXRhc2stbW9kYWwnKSkge1xuICAgICAgICBkb20uc2hvd1Rhc2tNb2RhbCgnYWRkVGFzaycpO1xuICAgICAgLy8gRWRpdCB0YXNrIG1vZGFsIG9wZW5cbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LXRhc2stbW9kYWwnKSkge1xuICAgICAgICB0YXNrSW5kZXggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4Jyk7XG4gICAgICAgIGRvbS5zaG93VGFza01vZGFsKCdlZGl0VGFzaycsIHByb2plY3RJbmRleCwgdGFza0luZGV4KTtcbiAgICAgIC8vIFJlbW92ZSB0YXNrIG1vZGFsIG9wZW5cbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdyZW1vdmUtdGFzay1tb2RhbCcpKSB7XG4gICAgICAgIHRhc2tJbmRleCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhc2staW5kZXgnKTtcbiAgICAgICAgZG9tLnNob3dDb25maXJtTW9kYWwoJ3JlbW92ZVRhc2snLCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCk7XG4gICAgICAvLyBDbG9zZSBhbGwgbW9kYWxzXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2xvc2UnKSB8fCBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21vZGFsJykpIHtcbiAgICAgICAgZG9tLmhpZGVFbGVtZW50KGRvbS5tb2RhbHMpO1xuICAgICAgLy8gQWRkIHByb2plY3RcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtcHJvamVjdCcpKSB7XG4gICAgICAgIHZhbGlkYXRpb24uYWRkUHJvamVjdChlKTtcbiAgICAgIC8vIEVkaXQgcHJvamVjdFxuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtcHJvamVjdCcpKSB7XG4gICAgICAgIHZhbGlkYXRpb24uZWRpdFByb2plY3QoZSwgcHJvamVjdEluZGV4KTtcbiAgICAgIC8vIFJlbW92ZSBwcm9qZWN0XG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncmVtb3ZlLXByb2plY3QnKSkge1xuICAgICAgICBwcm9qZWN0cy5yZW1vdmVQcm9qZWN0KHByb2plY3RJbmRleCk7XG4gICAgICAvLyBBZGQgVGFza1xuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FkZC10YXNrJykpIHtcbiAgICAgICAgdmFsaWRhdGlvbi5hZGRUYXNrKGUsIHByb2plY3RJbmRleCk7XG4gICAgICAvLyBFZGl0IFRhc2tcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LXRhc2snKSkge1xuICAgICAgICB2YWxpZGF0aW9uLmVkaXRUYXNrKGUsIHByb2plY3RJbmRleCwgdGFza0luZGV4KTtcbiAgICAgIC8vIFJlbW92ZSB0YXNrXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncmVtb3ZlLXRhc2snKSkge1xuICAgICAgICB0YXNrcy5yZW1vdmVUYXNrKHByb2plY3RJbmRleCwgdGFza0luZGV4KTtcbiAgICAgIC8vIFRvZ2dsZSB0YXNrXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndG9nZ2xlLXRhc2snKSkge1xuICAgICAgICBjb25zb2xlLmxvZygnVG9nZ2xlIFRhc2snKTtcbiAgICAgICAgdGFza0luZGV4ID0gKGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4JykpID8gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhc2staW5kZXgnKSA6IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhc2staW5kZXgnKTtcbiAgICAgICAgdGFza3MudG9nZ2xlVGFzayhwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBrZXlib2FyZEhhbmRsZXIoKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgIGRvbS5oaWRlRWxlbWVudChkb20ubW9kYWxzKTtcbiAgICAgIH1cbiAgICAgIC8vIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicgJiYgbW9kYWwuc3R5bGUuZGlzcGxheSA9PT0gJ2Jsb2NrJykge1xuICAgICAgLy8gICBzdWJtaXRCdXR0b24uY2xpY2soKTtcbiAgICAgIC8vIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2l6ZUhhbmRsZXIoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRvbS5yZXNwb25zaXZlU2lkZWJhcik7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNsaWNrSGFuZGxlcixcbiAgICBrZXlib2FyZEhhbmRsZXIsXG4gICAgcmVzaXplSGFuZGxlcixcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGhhbmRsZXJzO1xuIiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5cbmNvbnN0IHByb2plY3RzID0gKCgpID0+IHtcbiAgY29uc3QgcHJvamVjdHNMaXN0ID0gW3tcbiAgICB0aXRsZTogJ0RlbW8nLCBpY29uOiAnZmEtaG9tZScsIGNvbG9yOiAncHJvamVjdC1ncmV5JywgdGFza3M6IFtdLFxuICB9XTtcblxuICBjbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgaWNvbiwgY29sb3IpIHtcbiAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgIHRoaXMuaWNvbiA9IGljb247XG4gICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICB0aGlzLnRhc2tzID0gW107XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJvamVjdCh0aXRsZSwgaWNvbiwgY29sb3IpIHtcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QodGl0bGUsIGljb24sIGNvbG9yKTtcbiAgICBwcm9qZWN0c0xpc3QucHVzaChuZXdQcm9qZWN0KTtcbiAgICBkb20ucmVuZGVyUHJvamVjdHMoKTtcbiAgICBkb20uY2hhbmdlUHJvamVjdChwcm9qZWN0c0xpc3QubGVuZ3RoIC0gMSk7XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0UHJvamVjdChpbmRleCwgdGl0bGUsIGljb24sIGNvbG9yKSB7XG4gICAgcHJvamVjdHNMaXN0W2luZGV4XS50aXRsZSA9IHRpdGxlO1xuICAgIHByb2plY3RzTGlzdFtpbmRleF0uaWNvbiA9IGljb247XG4gICAgcHJvamVjdHNMaXN0W2luZGV4XS5jb2xvciA9IGNvbG9yO1xuICAgIGRvbS5yZW5kZXJQcm9qZWN0cygpO1xuICAgIGRvbS5jaGFuZ2VQcm9qZWN0KGluZGV4KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVByb2plY3QoaW5kZXgpIHtcbiAgICBwcm9qZWN0c0xpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICBkb20uaGlkZUVsZW1lbnQoZG9tLm1vZGFscyk7XG4gICAgZG9tLnJlbmRlclByb2plY3RzKCk7XG4gICAgZG9tLmNoYW5nZVByb2plY3QoMCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHByb2plY3RzTGlzdCxcbiAgICBjcmVhdGVQcm9qZWN0LFxuICAgIGVkaXRQcm9qZWN0LFxuICAgIHJlbW92ZVByb2plY3QsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBwcm9qZWN0cztcbiIsImltcG9ydCBwcm9qZWN0cyBmcm9tICcuL3Byb2plY3RzJztcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuXG5jb25zdCB0YXNrcyA9ICgoKSA9PiB7XG4gIGNsYXNzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBwcmlvcml0eSwgc2NoZWR1bGUpIHtcbiAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgIHRoaXMuc2NoZWR1bGUgPSBzY2hlZHVsZTtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVRhc2socHJvamVjdEluZGV4LCB0aXRsZSwgcHJpb3JpdHkgPSAwLCBzY2hlZHVsZSA9IDApIHtcbiAgICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2sodGl0bGUsIHByaW9yaXR5LCBzY2hlZHVsZSk7XG4gICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3MucHVzaChuZXdUYXNrKTtcbiAgICBkb20ucmVuZGVyVGFza3MocHJvamVjdEluZGV4KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZVRhc2socHJvamVjdEluZGV4LCB0YXNrSW5kZXgpIHtcbiAgICBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5kb25lKSB7XG4gICAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLmRvbmUgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5kb25lID0gdHJ1ZTtcbiAgICB9XG4gICAgY29uc29sZS5sb2cocHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5kb25lKTtcbiAgICBkb20ucmVuZGVyVGFza3MocHJvamVjdEluZGV4KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVkaXRUYXNrKHByb2plY3RJbmRleCwgdGFza0luZGV4LCB0aXRsZSwgcHJpb3JpdHksIHNjaGVkdWxlKSB7XG4gICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS50aXRsZSA9IHRpdGxlO1xuICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0ucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLnNjaGVkdWxlID0gc2NoZWR1bGU7XG4gICAgZG9tLnJlbmRlclRhc2tzKHByb2plY3RJbmRleCk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVUYXNrKHByb2plY3RJbmRleCwgdGFza0luZGV4KSB7XG4gICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3Muc3BsaWNlKHRhc2tJbmRleCwgMSk7XG4gICAgZG9tLmhpZGVFbGVtZW50KGRvbS5tb2RhbHMpO1xuICAgIGRvbS5yZW5kZXJUYXNrcyhwcm9qZWN0SW5kZXgpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVUYXNrLFxuICAgIHRvZ2dsZVRhc2ssXG4gICAgZWRpdFRhc2ssXG4gICAgcmVtb3ZlVGFzayxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHRhc2tzO1xuIiwiaW1wb3J0IHByb2plY3RzIGZyb20gJy4vcHJvamVjdHMnO1xuaW1wb3J0IHRhc2tzIGZyb20gJy4vdGFza3MnO1xuaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5cbmNvbnN0IHZhbGlkYXRpb24gPSAoKCkgPT4ge1xuICBmdW5jdGlvbiBhZGRQcm9qZWN0KGV2ZW50KSB7XG4gICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuZm9ybXNbJ3Byb2plY3QtZm9ybSddWydwcm9qZWN0LXRpdGxlJ10udmFsdWU7XG4gICAgY29uc3QgcHJvamVjdEljb24gPSBkb2N1bWVudC5mb3Jtc1sncHJvamVjdC1mb3JtJ11bJ3Byb2plY3QtaWNvbiddLnZhbHVlO1xuICAgIGNvbnN0IHByb2plY3RDb2xvciA9IGRvY3VtZW50LmZvcm1zWydwcm9qZWN0LWZvcm0nXVsncHJvamVjdC1jb2xvciddLnZhbHVlO1xuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmIChwcm9qZWN0VGl0bGUgIT09ICcnKSB7XG4gICAgICBwcm9qZWN0cy5jcmVhdGVQcm9qZWN0KHByb2plY3RUaXRsZSwgcHJvamVjdEljb24sIHByb2plY3RDb2xvcik7XG4gICAgICBkb20uaGlkZUVsZW1lbnQoZG9tLmZvcm1Qcm9qZWN0VGl0bGVFcnJvcik7XG4gICAgICBkb20uaGlkZUVsZW1lbnQoZG9tLm1vZGFscyk7XG4gICAgfSBlbHNlIGlmIChwcm9qZWN0VGl0bGUgPT09ICcnKSB7XG4gICAgICBkb20uc2hvd0VsZW1lbnQoZG9tLmZvcm1Qcm9qZWN0VGl0bGVFcnJvcik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZWRpdFByb2plY3QoZXZlbnQsIGluZGV4KSB7XG4gICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuZm9ybXNbJ3Byb2plY3QtZm9ybSddWydwcm9qZWN0LXRpdGxlJ10udmFsdWU7XG4gICAgY29uc3QgcHJvamVjdEljb24gPSBkb2N1bWVudC5mb3Jtc1sncHJvamVjdC1mb3JtJ11bJ3Byb2plY3QtaWNvbiddLnZhbHVlO1xuICAgIGNvbnN0IHByb2plY3RDb2xvciA9IGRvY3VtZW50LmZvcm1zWydwcm9qZWN0LWZvcm0nXVsncHJvamVjdC1jb2xvciddLnZhbHVlO1xuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmIChwcm9qZWN0VGl0bGUgIT09ICcnKSB7XG4gICAgICBwcm9qZWN0cy5lZGl0UHJvamVjdChpbmRleCwgcHJvamVjdFRpdGxlLCBwcm9qZWN0SWNvbiwgcHJvamVjdENvbG9yKTtcbiAgICAgIGRvbS5oaWRlRWxlbWVudChkb20uZm9ybVByb2plY3RUaXRsZUVycm9yKTtcbiAgICAgIGRvbS5oaWRlRWxlbWVudChkb20ubW9kYWxzKTtcbiAgICB9IGVsc2UgaWYgKHByb2plY3RUaXRsZSA9PT0gJycpIHtcbiAgICAgIGRvbS5zaG93RWxlbWVudChkb20uZm9ybVByb2plY3RUaXRsZUVycm9yKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhZGRUYXNrKGV2ZW50LCBwcm9qZWN0SW5kZXgpIHtcbiAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5mb3Jtc1sndGFzay1mb3JtJ11bJ3Rhc2stdGl0bGUnXS52YWx1ZTtcbiAgICBjb25zdCB0YXNrUHJpb3JpdHkgPSBkb2N1bWVudC5mb3Jtc1sndGFzay1mb3JtJ11bJ3Rhc2stcHJpb3JpdHknXS52YWx1ZTtcbiAgICBjb25zdCB0YXNrU2NoZWR1bGUgPSBkb2N1bWVudC5mb3Jtc1sndGFzay1mb3JtJ11bJ3Rhc2stc2NoZWR1bGUnXS52YWx1ZTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAodGFza1RpdGxlICE9PSAnJykge1xuICAgICAgdGFza3MuY3JlYXRlVGFzayhwcm9qZWN0SW5kZXgsIHRhc2tUaXRsZSwgdGFza1ByaW9yaXR5LCB0YXNrU2NoZWR1bGUpO1xuICAgICAgZG9tLmhpZGVFbGVtZW50KGRvbS5mb3JtVGFza1RpdGxlRXJyb3IpO1xuICAgICAgZG9tLmhpZGVFbGVtZW50KGRvbS5tb2RhbHMpO1xuICAgIH0gZWxzZSBpZiAodGFza1RpdGxlID09PSAnJykge1xuICAgICAgZG9tLnNob3dFbGVtZW50KGRvbS5mb3JtVGFza1RpdGxlRXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGVkaXRUYXNrKGV2ZW50LCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCkge1xuICAgIGNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LmZvcm1zWyd0YXNrLWZvcm0nXVsndGFzay10aXRsZSddLnZhbHVlO1xuICAgIGNvbnN0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LmZvcm1zWyd0YXNrLWZvcm0nXVsndGFzay1wcmlvcml0eSddLnZhbHVlO1xuICAgIGNvbnN0IHRhc2tTY2hlZHVsZSA9IGRvY3VtZW50LmZvcm1zWyd0YXNrLWZvcm0nXVsndGFzay1zY2hlZHVsZSddLnZhbHVlO1xuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmICh0YXNrVGl0bGUgIT09ICcnKSB7XG4gICAgICB0YXNrcy5lZGl0VGFzayhwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCwgdGFza1RpdGxlLCB0YXNrUHJpb3JpdHksIHRhc2tTY2hlZHVsZSk7XG4gICAgICBkb20uaGlkZUVsZW1lbnQoZG9tLmZvcm1UYXNrVGl0bGVFcnJvcik7XG4gICAgICBkb20uaGlkZUVsZW1lbnQoZG9tLm1vZGFscyk7XG4gICAgfSBlbHNlIGlmICh0YXNrVGl0bGUgPT09ICcnKSB7XG4gICAgICBkb20uc2hvd0VsZW1lbnQoZG9tLmZvcm1yVGFza1RpdGxlRXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYWRkUHJvamVjdCxcbiAgICBlZGl0UHJvamVjdCxcbiAgICBhZGRUYXNrLFxuICAgIGVkaXRUYXNrLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGlvbjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgaGFuZGxlcnMgZnJvbSAnLi9oYW5kbGVycyc7XG5cbmRvbS5yZXNwb25zaXZlU2lkZWJhcigpO1xuZG9tLnJlbmRlclByb2plY3RzKCk7XG5kb20uY2hhbmdlUHJvamVjdCgwLCAwKTtcblxuaGFuZGxlcnMucmVzaXplSGFuZGxlcigpO1xuaGFuZGxlcnMuY2xpY2tIYW5kbGVyKCk7XG5oYW5kbGVycy5rZXlib2FyZEhhbmRsZXIoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==