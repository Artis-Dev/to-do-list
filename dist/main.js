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
        if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[i].done === true) {
          taskIcon.classList.add('fa-check-circle');
          taskTitle.classList.add('done');
        } else {
          taskIcon.classList.add('fa-circle');
          taskTitle.classList.remove('done');
        }
        todoItem.appendChild(taskTitle);
        // Create date
        if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[i].schedule !== '') {
          const taskDate = document.createElement('p');
          taskDate.classList.add('todo-item-date', 'todo-item-pill', 'toggle-task');
          taskDate.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[i].schedule;
          todoItem.appendChild(taskDate);
        }
        // Create project name
        const taskProject = document.createElement('p');
        taskProject.classList.add('todo-item-pill', `${_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].color}-background`, 'toggle-task');
        taskProject.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].title;
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
        projectIndex = (e.target.parentElement.getAttribute('data-project-index')) ? e.target.parentElement.getAttribute('data-project-index') : e.target.getAttribute('data-project-index');
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].showTaskModal('addTask', projectIndex);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTndCO0FBQ1U7O0FBRWxDLDhEQUFxQjtBQUNyQiwyREFBa0I7QUFDbEIsMERBQWlCOztBQUVqQiwrREFBc0I7QUFDdEIsOERBQXFCO0FBQ3JCLGlFQUF3QiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Rhc2tzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJvamVjdHMgZnJvbSAnLi9wcm9qZWN0cyc7XG5cbmNvbnN0IGRvbSA9ICgoKSA9PiB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpO1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuICBjb25zdCBwcm9qZWN0c0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhci1wcm9qZWN0cy1saXN0Jyk7XG4gIGNvbnN0IHRhc2tzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWl0ZW0tbGlzdCcpO1xuICBjb25zdCBwcm9qZWN0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1tb2RhbCcpO1xuICBjb25zdCB0YXNrTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1tb2RhbCcpO1xuICBjb25zdCBjb25maXJtTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29uZmlybS1tb2RhbCcpO1xuICBjb25zdCBtb2RhbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubW9kYWwnKTtcbiAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1mb3JtJyk7XG4gIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZm9ybScpO1xuICBjb25zdCBmb3JtUHJvamVjdFRpdGxlRXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC10aXRsZS1lcnJvcicpO1xuICBjb25zdCBmb3JtVGFza1RpdGxlRXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay10aXRsZS1lcnJvcicpO1xuXG4gIGZ1bmN0aW9uIHJlc3BvbnNpdmVTaWRlYmFyKCkge1xuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSA5NjApIHtcbiAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnc2lkZWJhci1zaG93Jyk7XG4gICAgICBzaWRlYmFyLmNsYXNzTGlzdC5hZGQoJ3NpZGViYXItaGlkZScpO1xuICAgICAgbWFpbi5jbGFzc0xpc3QuYWRkKCdtYWluLW1vYmlsZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaWRlYmFyLmNsYXNzTGlzdC5yZW1vdmUoJ3NpZGViYXItaGlkZScpO1xuICAgICAgc2lkZWJhci5jbGFzc0xpc3QuYWRkKCdzaWRlYmFyLXNob3cnKTtcbiAgICAgIG1haW4uY2xhc3NMaXN0LnJlbW92ZSgnbWFpbi1tb2JpbGUnKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGVTaWRlYmFyKCkge1xuICAgIGlmICghc2lkZWJhci5jbGFzc0xpc3QuY29udGFpbnMoJ3NpZGViYXItc2hvdycpKSB7XG4gICAgICBzaWRlYmFyLmNsYXNzTGlzdC5yZW1vdmUoJ3NpZGViYXItaGlkZScpO1xuICAgICAgc2lkZWJhci5jbGFzc0xpc3QuYWRkKCdzaWRlYmFyLXNob3cnKTtcbiAgICB9IGVsc2UgaWYgKHNpZGViYXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaWRlYmFyLXNob3cnKSkge1xuICAgICAgc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdzaWRlYmFyLXNob3cnKTtcbiAgICAgIHNpZGViYXIuY2xhc3NMaXN0LmFkZCgnc2lkZWJhci1oaWRlJyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2hvd1Byb2plY3RNb2RhbChtb2RhbCwgaW5kZXggPSBmYWxzZSkge1xuICAgIGNvbnN0IG1vZGFsSGVhZGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LW1vZGFsLXRpdGxlJyk7XG4gICAgY29uc3QgbW9kYWxTdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1idXR0b24nKTtcblxuICAgIHByb2plY3RNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgcHJvamVjdE1vZGFsLmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXknKTtcblxuICAgIGlmIChtb2RhbCA9PT0gJ2FkZFByb2plY3QnKSB7XG4gICAgICBwcm9qZWN0Rm9ybS5yZXNldCgpO1xuICAgICAgbW9kYWxIZWFkaW5nLnRleHRDb250ZW50ID0gJ05ldyBwcm9qZWN0JztcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gJ0FkZCc7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdlZGl0LXByb2plY3QnKTtcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2FkZC1wcm9qZWN0Jyk7XG4gICAgfSBlbHNlIGlmIChtb2RhbCA9PT0gJ2VkaXRQcm9qZWN0Jykge1xuICAgICAgY29uc3QgY3VycmVudFByb2plY3RUaXRsZSA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0udGl0bGU7XG4gICAgICBjb25zdCBjdXJyZW50UHJvamVjdEljb24gPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLmljb247XG4gICAgICBjb25zdCBjdXJyZW50UHJvamVjdENvbG9yID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2luZGV4XS5jb2xvcjtcblxuICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Zvcm0tcHJvamVjdC10aXRsZScpO1xuICAgICAgY29uc3QgcHJvamVjdEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFt2YWx1ZT0ke2N1cnJlbnRQcm9qZWN0SWNvbn1dYCk7XG4gICAgICBjb25zdCBwcm9qZWN0Q29sb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dFt2YWx1ZT0ke2N1cnJlbnRQcm9qZWN0Q29sb3J9XWApO1xuXG4gICAgICBwcm9qZWN0VGl0bGUudmFsdWUgPSBjdXJyZW50UHJvamVjdFRpdGxlO1xuICAgICAgcHJvamVjdEljb24uY2hlY2tlZCA9IHRydWU7XG4gICAgICBwcm9qZWN0Q29sb3IuY2hlY2tlZCA9IHRydWU7XG5cbiAgICAgIG1vZGFsSGVhZGluZy50ZXh0Q29udGVudCA9ICdFZGl0IHByb2plY3QnO1xuICAgICAgbW9kYWxTdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSAnRWRpdCc7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdhZGQtcHJvamVjdCcpO1xuICAgICAgbW9kYWxTdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnZWRpdC1wcm9qZWN0Jyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2hvd1Rhc2tNb2RhbChtb2RhbCwgcHJvamVjdEluZGV4ID0gZmFsc2UsIHRhc2tJbmRleCA9IGZhbHNlKSB7XG4gICAgY29uc3QgbW9kYWxIZWFkaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stbW9kYWwtdGl0bGUnKTtcbiAgICBjb25zdCBtb2RhbFN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWJ1dHRvbicpO1xuXG4gICAgdGFza01vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICB0YXNrTW9kYWwuY2xhc3NMaXN0LmFkZCgnZGlzcGxheScpO1xuXG4gICAgaWYgKG1vZGFsID09PSAnYWRkVGFzaycpIHtcbiAgICAgIHRhc2tGb3JtLnJlc2V0KCk7XG4gICAgICBtb2RhbEhlYWRpbmcudGV4dENvbnRlbnQgPSAnTmV3IHRhc2snO1xuICAgICAgbW9kYWxTdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSAnQWRkJztcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2VkaXQtdGFzaycpO1xuICAgICAgbW9kYWxTdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnYWRkLXRhc2snKTtcbiAgICB9IGVsc2UgaWYgKG1vZGFsID09PSAnZWRpdFRhc2snKSB7XG4gICAgICBjb25zdCBjdXJyZW50VGFza1RpdGxlID0gcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS50aXRsZTtcbiAgICAgIGNvbnN0IGN1cnJlbnRUYXNrUHJpb3JpdHkgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLnByaW9yaXR5O1xuICAgICAgY29uc3QgY3VycmVudFRhc2tTY2hlZHVsZSA9IHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0uc2NoZWR1bGU7XG5cbiAgICAgIGNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtLXRhc2stdGl0bGUnKTtcbiAgICAgIGNvbnN0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtLXRhc2stcHJpb3JpdHknKTtcbiAgICAgIGNvbnN0IHRhc2tTY2hlZHVsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtLXRhc2stc2NoZWR1bGUnKTtcblxuICAgICAgdGFza1RpdGxlLnZhbHVlID0gY3VycmVudFRhc2tUaXRsZTtcbiAgICAgIHRhc2tQcmlvcml0eS52YWx1ZSA9IGN1cnJlbnRUYXNrUHJpb3JpdHk7XG4gICAgICB0YXNrU2NoZWR1bGUudmFsdWUgPSBjdXJyZW50VGFza1NjaGVkdWxlO1xuXG4gICAgICBtb2RhbEhlYWRpbmcudGV4dENvbnRlbnQgPSAnRWRpdCBwcm9qZWN0JztcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gJ0VkaXQnO1xuICAgICAgbW9kYWxTdWJtaXRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnYWRkLXRhc2snKTtcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2VkaXQtdGFzaycpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3dDb25maXJtTW9kYWwobW9kYWwsIHByb2plY3RJbmRleCwgdGFza0luZGV4KSB7XG4gICAgY29uc3QgbW9kYWxIZWFkaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmZpcm0tbW9kYWwtdGl0bGUnKTtcbiAgICBjb25zdCBtb2RhbENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS1tb2RhbC1jb250ZW50Jyk7XG4gICAgY29uc3QgbW9kYWxTdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29uZmlybS1idXR0b24nKTtcbiAgICBjb25zdCBtb2RhbENvbnRlbnRQcmVmaXggPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnWW91IGFyZSBnb2luZyB0byByZW1vdmUgJyk7XG4gICAgY29uc3QgbW9kYWxDb250ZW50UG9zdGZpeCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcuIFRoaXMgYWN0aW9uIGNhbm5vdCBiZSB1bmRvbmUuJyk7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICBjb25maXJtTW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIGNvbmZpcm1Nb2RhbC5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Jyk7XG5cbiAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCdjb25maXJtLW1vZGFsLXRpdGxlJyk7XG5cbiAgICBtb2RhbENvbnRlbnQudGV4dENvbnRlbnQgPSAnJztcblxuICAgIGlmIChtb2RhbCA9PT0gJ3JlbW92ZVByb2plY3QnKSB7XG4gICAgICBtb2RhbEhlYWRpbmcudGV4dENvbnRlbnQgPSAnUmVtb3ZlIHByb2plY3QnO1xuICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50aXRsZTtcbiAgICAgIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChtb2RhbENvbnRlbnRQcmVmaXgpO1xuICAgICAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChtb2RhbENvbnRlbnRQb3N0Zml4KTtcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ3JlbW92ZS10YXNrJyk7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdyZW1vdmUtcHJvamVjdCcpO1xuICAgIH0gZWxzZSBpZiAobW9kYWwgPT09ICdyZW1vdmVUYXNrJykge1xuICAgICAgbW9kYWxIZWFkaW5nLnRleHRDb250ZW50ID0gJ1JlbW92ZSB0YXNrJztcbiAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS50aXRsZTtcbiAgICAgIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChtb2RhbENvbnRlbnRQcmVmaXgpO1xuICAgICAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChtb2RhbENvbnRlbnRQb3N0Zml4KTtcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ3JlbW92ZS1wcm9qZWN0Jyk7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdyZW1vdmUtdGFzaycpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3dFbGVtZW50KGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXknKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGVFbGVtZW50KG1vZGFsKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaXNQcm90b3R5cGVPZi5jYWxsKE5vZGVMaXN0LnByb3RvdHlwZSwgbW9kYWwpKSB7XG4gICAgICBtb2RhbC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheScpO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5Jyk7XG4gICAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWN0aXZlTGluayhsaW5rKSB7XG4gICAgY29uc3QgbmF2TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhLnNpZGViYXItbGluaycpO1xuICAgIG5hdkxpbmtzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgfSk7XG4gICAgaWYgKGxpbmsuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaWRlYmFyLWxpbmstaWNvbicpKSB7XG4gICAgICBsaW5rLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyUHJvamVjdHMoKSB7XG4gICAgLy8gQ3JlYXRlIGxpbmtcbiAgICBwcm9qZWN0c0xpc3QudGV4dENvbnRlbnQgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzLnByb2plY3RzTGlzdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgcHJvamVjdExpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICBwcm9qZWN0TGluay5jbGFzc0xpc3QuYWRkKCdzaWRlYmFyLXByb2plY3QnKTtcbiAgICAgIHByb2plY3RMaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcjJyk7XG4gICAgICBwcm9qZWN0TGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpKTtcbiAgICAgIHByb2plY3RzTGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0TGluayk7XG4gICAgICAvLyBDcmVhdGUgaWNvblxuICAgICAgY29uc3QgcHJvamVjdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICBwcm9qZWN0SWNvbi5jbGFzc0xpc3QuYWRkKCdmYXInLCBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0uaWNvbiwgJ2ZhLWZ3JywgcHJvamVjdHMucHJvamVjdHNMaXN0W2ldLmNvbG9yLCAnc2lkZWJhci1wcm9qZWN0JywgJ3NpZGViYXItcHJvamVjdC1pY29uJyk7XG4gICAgICBwcm9qZWN0TGluay5hcHBlbmRDaGlsZChwcm9qZWN0SWNvbik7XG4gICAgICAvLyBDcmVhdGUgdGl0bGVcbiAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHByb2plY3RzLnByb2plY3RzTGlzdFtpXS50aXRsZSk7XG4gICAgICBwcm9qZWN0TGluay5hcHBlbmRDaGlsZChwcm9qZWN0VGl0bGUpO1xuICAgICAgLy8gQ3JlYXRlIHJlbW92ZSBpY29uXG4gICAgICBjb25zdCBwcm9qZWN0UmVtb3ZlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgIHByb2plY3RSZW1vdmVJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhcicsICdmYS10cmFzaCcsICdyZW1vdmUtcHJvamVjdC1tb2RhbCcpO1xuICAgICAgcHJvamVjdExpbmsuYXBwZW5kQ2hpbGQocHJvamVjdFJlbW92ZUljb24pO1xuICAgICAgLy8gQ3JlYXRlIGVkaXQgaWNvblxuICAgICAgY29uc3QgcHJvamVjdEVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgcHJvamVjdEVkaXRJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhcicsICdmYS1lZGl0JywgJ2VkaXQtcHJvamVjdC1tb2RhbCcpO1xuICAgICAgcHJvamVjdExpbmsuYXBwZW5kQ2hpbGQocHJvamVjdEVkaXRJY29uKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3RQcm9qZWN0KHByb2plY3RJbmRleCkge1xuICAgIGlmIChwcm9qZWN0cy5wcm9qZWN0c0xpc3QubGVuZ3RoID49IDEpIHtcbiAgICAgIGNvbnN0IHByb2plY3RMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Euc2lkZWJhci1wcm9qZWN0Jyk7XG4gICAgICBwcm9qZWN0TGlua3MuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgfSk7XG4gICAgICBwcm9qZWN0TGlua3NbcHJvamVjdEluZGV4XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJIZWFkZXIocHJvamVjdEluZGV4KSB7XG4gICAgY29uc3QgaGVhZGVyTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8taGVhZGVyLW5hdicpO1xuICAgIGNvbnN0IGhlYWRlclByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1oZWFkZXItcHJvamVjdCcpO1xuXG4gICAgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdC5sZW5ndGggPj0gMSkge1xuICAgICAgaGVhZGVyUHJvamVjdC50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRpdGxlO1xuICAgICAgaGVhZGVyTmF2LnRleHRDb250ZW50ID0gJ0luYm94JztcbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZGVyUHJvamVjdC50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgaGVhZGVyTmF2LnRleHRDb250ZW50ID0gJ0luYm94JztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJUYXNrcyhwcm9qZWN0SW5kZXgpIHtcbiAgICB0YXNrc0xpc3QudGV4dENvbnRlbnQgPSAnJztcbiAgICBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0Lmxlbmd0aCA+PSAxKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IHRvZG9JdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRvZG9JdGVtLmNsYXNzTGlzdC5hZGQoJ3RvZG8taXRlbScsICd0b2dnbGUtdGFzaycpO1xuICAgICAgICB0b2RvSXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcsIHByb2plY3RJbmRleCk7XG4gICAgICAgIHRvZG9JdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4JywgaSk7XG4gICAgICAgIHRhc2tzTGlzdC5hcHBlbmRDaGlsZCh0b2RvSXRlbSk7XG4gICAgICAgIC8vIENyZWF0ZSBpY29uXG4gICAgICAgIGNvbnN0IHRhc2tJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICB0YXNrSWNvbi5jbGFzc0xpc3QuYWRkKCdmYXInLCAnZmEtZncnLCAndG9nZ2xlLXRhc2snKTtcbiAgICAgICAgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW2ldLnByaW9yaXR5ID09PSAnbG93Jykge1xuICAgICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtZ3JlZW4nKTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1tpXS5wcmlvcml0eSA9PT0gJ21lZGl1bScpIHtcbiAgICAgICAgICB0YXNrSWNvbi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LXllbGxvdycpO1xuICAgICAgICB9IGVsc2UgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW2ldLnByaW9yaXR5ID09PSAnaGlnaCcpIHtcbiAgICAgICAgICB0YXNrSWNvbi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LXJlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtZ3JleScpO1xuICAgICAgICB9XG4gICAgICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKHRhc2tJY29uKTtcbiAgICAgICAgLy8gQ3JlYXRlIHRpdGxlXG4gICAgICAgIGNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgdGFza1RpdGxlLmNsYXNzTGlzdC5hZGQoJ3RvZG8taXRlbS10aXRsZScsICd0b2dnbGUtdGFzaycpO1xuICAgICAgICB0YXNrVGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1tpXS50aXRsZTtcbiAgICAgICAgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW2ldLmRvbmUgPT09IHRydWUpIHtcbiAgICAgICAgICB0YXNrSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1jaGVjay1jaXJjbGUnKTtcbiAgICAgICAgICB0YXNrVGl0bGUuY2xhc3NMaXN0LmFkZCgnZG9uZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLWNpcmNsZScpO1xuICAgICAgICAgIHRhc2tUaXRsZS5jbGFzc0xpc3QucmVtb3ZlKCdkb25lJyk7XG4gICAgICAgIH1cbiAgICAgICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQodGFza1RpdGxlKTtcbiAgICAgICAgLy8gQ3JlYXRlIGRhdGVcbiAgICAgICAgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW2ldLnNjaGVkdWxlICE9PSAnJykge1xuICAgICAgICAgIGNvbnN0IHRhc2tEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgIHRhc2tEYXRlLmNsYXNzTGlzdC5hZGQoJ3RvZG8taXRlbS1kYXRlJywgJ3RvZG8taXRlbS1waWxsJywgJ3RvZ2dsZS10YXNrJyk7XG4gICAgICAgICAgdGFza0RhdGUudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1tpXS5zY2hlZHVsZTtcbiAgICAgICAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZCh0YXNrRGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ3JlYXRlIHByb2plY3QgbmFtZVxuICAgICAgICBjb25zdCB0YXNrUHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgdGFza1Byb2plY3QuY2xhc3NMaXN0LmFkZCgndG9kby1pdGVtLXBpbGwnLCBgJHtwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS5jb2xvcn0tYmFja2dyb3VuZGAsICd0b2dnbGUtdGFzaycpO1xuICAgICAgICB0YXNrUHJvamVjdC50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRpdGxlO1xuICAgICAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZCh0YXNrUHJvamVjdCk7XG4gICAgICAgIC8vIENyZWF0ZSBlZGl0IGljb25cbiAgICAgICAgY29uc3QgdGFza0VkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICB0YXNrRWRpdEljb24uY2xhc3NMaXN0LmFkZCgnZmFyJywgJ2ZhLWVkaXQnLCAnZmEtZncnLCAnZWRpdC10YXNrLW1vZGFsJyk7XG4gICAgICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKHRhc2tFZGl0SWNvbik7XG4gICAgICAgIC8vIENyZWF0ZSByZW1vdmUgaWNvblxuICAgICAgICBjb25zdCB0YXNrUmVtb3ZlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgdGFza1JlbW92ZUljb24uY2xhc3NMaXN0LmFkZCgnZmFyJywgJ2ZhLXRyYXNoJywgJ2ZhLWZ3JywgJ3JlbW92ZS10YXNrLW1vZGFsJyk7XG4gICAgICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKHRhc2tSZW1vdmVJY29uKTtcbiAgICAgIH1cbiAgICAgIC8vIEFkZCB0YXNrIGxpbmVcbiAgICAgIGNvbnN0IHRhc2tBZGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRhc2tBZGQuc2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QtaW5kZXgnLCBwcm9qZWN0SW5kZXgpO1xuICAgICAgdGFza0FkZC5jbGFzc0xpc3QuYWRkKCd0b2RvLWl0ZW0tYWRkJywgJ2FkZC10YXNrLW1vZGFsJyk7XG4gICAgICB0YXNrc0xpc3QuYXBwZW5kQ2hpbGQodGFza0FkZCk7XG4gICAgICBjb25zdCB0YXNrQWRkSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgIHRhc2tBZGRJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhcicsICdmYS1wbHVzJywgJ2ZhLWZ3JywgJ2FkZC10YXNrLW1vZGFsJyk7XG4gICAgICB0YXNrQWRkLmFwcGVuZENoaWxkKHRhc2tBZGRJY29uKTtcbiAgICAgIGNvbnN0IHRhc2tBZGRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIHRhc2tBZGRUaXRsZS5jbGFzc0xpc3QuYWRkKCd0b2RvLWl0ZW0tdGl0bGUnLCAnYWRkLXRhc2stbW9kYWwnKTtcbiAgICAgIHRhc2tBZGRUaXRsZS50ZXh0Q29udGVudCA9ICdBZGQgbmV3IHRhc2snO1xuICAgICAgdGFza0FkZC5hcHBlbmRDaGlsZCh0YXNrQWRkVGl0bGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoYW5nZVByb2plY3QocHJvamVjdEluZGV4KSB7XG4gICAgc2VsZWN0UHJvamVjdChwcm9qZWN0SW5kZXgpO1xuICAgIHJlbmRlckhlYWRlcihwcm9qZWN0SW5kZXgpO1xuICAgIHJlbmRlclRhc2tzKHByb2plY3RJbmRleCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGJvZHksXG4gICAgcHJvamVjdE1vZGFsLFxuICAgIGNvbmZpcm1Nb2RhbCxcbiAgICBtb2RhbHMsXG4gICAgZm9ybVByb2plY3RUaXRsZUVycm9yLFxuICAgIGZvcm1UYXNrVGl0bGVFcnJvcixcbiAgICByZXNwb25zaXZlU2lkZWJhcixcbiAgICB0b2dnbGVTaWRlYmFyLFxuICAgIHNob3dQcm9qZWN0TW9kYWwsXG4gICAgc2hvd1Rhc2tNb2RhbCxcbiAgICBzaG93Q29uZmlybU1vZGFsLFxuICAgIHNob3dFbGVtZW50LFxuICAgIGhpZGVFbGVtZW50LFxuICAgIGFjdGl2ZUxpbmssXG4gICAgcmVuZGVyUHJvamVjdHMsXG4gICAgcmVuZGVyVGFza3MsXG4gICAgY2hhbmdlUHJvamVjdCxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRvbTtcbiIsImltcG9ydCB2YWxpZGF0aW9uIGZyb20gJy4vdmFsaWRhdGlvbic7XG5pbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcbmltcG9ydCBwcm9qZWN0cyBmcm9tICcuL3Byb2plY3RzJztcbmltcG9ydCB0YXNrcyBmcm9tICcuL3Rhc2tzJztcblxuY29uc3QgaGFuZGxlcnMgPSAoKCkgPT4ge1xuICBmdW5jdGlvbiBjbGlja0hhbmRsZXIoKSB7XG4gICAgbGV0IHByb2plY3RJbmRleCA9IDA7XG4gICAgbGV0IHRhc2tJbmRleCA9IDA7XG4gICAgZG9tLmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgLy8gVG9nZ2xlIHNpZGViYXJcbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3RvZ2dsZS1zaWRlYmFyJykpIHtcbiAgICAgICAgZG9tLnRvZ2dsZVNpZGViYXIoKTtcbiAgICAgIC8vIE5hdiBsaW5rc1xuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3NpZGViYXItbGluaycpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDaGFuZ2UgbGluaycpO1xuICAgICAgICBkb20uYWN0aXZlTGluayhlLnRhcmdldCk7XG4gICAgICAvLyBQcm9qZWN0IGxpbmtzXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2lkZWJhci1wcm9qZWN0JykpIHtcbiAgICAgICAgcHJvamVjdEluZGV4ID0gKGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpKSA/IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpIDogZS50YXJnZXQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgZG9tLmNoYW5nZVByb2plY3QocHJvamVjdEluZGV4KTtcbiAgICAgIC8vIEFkZCBwcm9qZWN0IG1vZGFsIG9wZW5cbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtcHJvamVjdC1tb2RhbCcpKSB7XG4gICAgICAgIGRvbS5zaG93UHJvamVjdE1vZGFsKCdhZGRQcm9qZWN0Jyk7XG4gICAgICAvLyBFZGl0IHByb2plY3QgbW9kYWwgb3BlblxuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtcHJvamVjdC1tb2RhbCcpKSB7XG4gICAgICAgIHByb2plY3RJbmRleCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgICAgIGRvbS5zaG93UHJvamVjdE1vZGFsKCdlZGl0UHJvamVjdCcsIHByb2plY3RJbmRleCk7XG4gICAgICAvLyBSZW1vdmUgcHJvamVjdCBtb2RhbCBvcGVuXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncmVtb3ZlLXByb2plY3QtbW9kYWwnKSkge1xuICAgICAgICBwcm9qZWN0SW5kZXggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xuICAgICAgICBkb20uc2hvd0NvbmZpcm1Nb2RhbCgncmVtb3ZlUHJvamVjdCcsIHByb2plY3RJbmRleCk7XG4gICAgICAvLyBBZGQgdGFzayBtb2RhbCBvcGVuXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWRkLXRhc2stbW9kYWwnKSkge1xuICAgICAgICBwcm9qZWN0SW5kZXggPSAoZS50YXJnZXQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcpKSA/IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QtaW5kZXgnKSA6IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0LWluZGV4Jyk7XG4gICAgICAgIGRvbS5zaG93VGFza01vZGFsKCdhZGRUYXNrJywgcHJvamVjdEluZGV4KTtcbiAgICAgIC8vIEVkaXQgdGFzayBtb2RhbCBvcGVuXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC10YXNrLW1vZGFsJykpIHtcbiAgICAgICAgdGFza0luZGV4ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1pbmRleCcpO1xuICAgICAgICBkb20uc2hvd1Rhc2tNb2RhbCgnZWRpdFRhc2snLCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCk7XG4gICAgICAvLyBSZW1vdmUgdGFzayBtb2RhbCBvcGVuXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncmVtb3ZlLXRhc2stbW9kYWwnKSkge1xuICAgICAgICB0YXNrSW5kZXggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4Jyk7XG4gICAgICAgIGRvbS5zaG93Q29uZmlybU1vZGFsKCdyZW1vdmVUYXNrJywgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgpO1xuICAgICAgLy8gQ2xvc2UgYWxsIG1vZGFsc1xuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Nsb3NlJykgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtb2RhbCcpKSB7XG4gICAgICAgIGRvbS5oaWRlRWxlbWVudChkb20ubW9kYWxzKTtcbiAgICAgIC8vIEFkZCBwcm9qZWN0XG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWRkLXByb2plY3QnKSkge1xuICAgICAgICB2YWxpZGF0aW9uLmFkZFByb2plY3QoZSk7XG4gICAgICAvLyBFZGl0IHByb2plY3RcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LXByb2plY3QnKSkge1xuICAgICAgICB2YWxpZGF0aW9uLmVkaXRQcm9qZWN0KGUsIHByb2plY3RJbmRleCk7XG4gICAgICAvLyBSZW1vdmUgcHJvamVjdFxuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3JlbW92ZS1wcm9qZWN0JykpIHtcbiAgICAgICAgcHJvamVjdHMucmVtb3ZlUHJvamVjdChwcm9qZWN0SW5kZXgpO1xuICAgICAgLy8gQWRkIFRhc2tcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtdGFzaycpKSB7XG4gICAgICAgIHZhbGlkYXRpb24uYWRkVGFzayhlLCBwcm9qZWN0SW5kZXgpO1xuICAgICAgLy8gRWRpdCBUYXNrXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC10YXNrJykpIHtcbiAgICAgICAgdmFsaWRhdGlvbi5lZGl0VGFzayhlLCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCk7XG4gICAgICAvLyBSZW1vdmUgdGFza1xuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3JlbW92ZS10YXNrJykpIHtcbiAgICAgICAgdGFza3MucmVtb3ZlVGFzayhwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCk7XG4gICAgICAvLyBUb2dnbGUgdGFza1xuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3RvZ2dsZS10YXNrJykpIHtcbiAgICAgICAgdGFza0luZGV4ID0gKGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4JykpID8gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhc2staW5kZXgnKSA6IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhc2staW5kZXgnKTtcbiAgICAgICAgdGFza3MudG9nZ2xlVGFzayhwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBrZXlib2FyZEhhbmRsZXIoKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgIGRvbS5oaWRlRWxlbWVudChkb20ubW9kYWxzKTtcbiAgICAgIH1cbiAgICAgIC8vIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicgJiYgbW9kYWwuc3R5bGUuZGlzcGxheSA9PT0gJ2Jsb2NrJykge1xuICAgICAgLy8gICBzdWJtaXRCdXR0b24uY2xpY2soKTtcbiAgICAgIC8vIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2l6ZUhhbmRsZXIoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRvbS5yZXNwb25zaXZlU2lkZWJhcik7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNsaWNrSGFuZGxlcixcbiAgICBrZXlib2FyZEhhbmRsZXIsXG4gICAgcmVzaXplSGFuZGxlcixcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGhhbmRsZXJzO1xuIiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5cbmNvbnN0IHByb2plY3RzID0gKCgpID0+IHtcbiAgY29uc3QgcHJvamVjdHNMaXN0ID0gW3tcbiAgICB0aXRsZTogJ0RlbW8nLCBpY29uOiAnZmEtaG9tZScsIGNvbG9yOiAncHJvamVjdC1ncmV5JywgdGFza3M6IFtdLFxuICB9XTtcblxuICBjbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgaWNvbiwgY29sb3IpIHtcbiAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgIHRoaXMuaWNvbiA9IGljb247XG4gICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICB0aGlzLnRhc2tzID0gW107XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJvamVjdCh0aXRsZSwgaWNvbiwgY29sb3IpIHtcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QodGl0bGUsIGljb24sIGNvbG9yKTtcbiAgICBwcm9qZWN0c0xpc3QucHVzaChuZXdQcm9qZWN0KTtcbiAgICBkb20ucmVuZGVyUHJvamVjdHMoKTtcbiAgICBkb20uY2hhbmdlUHJvamVjdChwcm9qZWN0c0xpc3QubGVuZ3RoIC0gMSk7XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0UHJvamVjdChpbmRleCwgdGl0bGUsIGljb24sIGNvbG9yKSB7XG4gICAgcHJvamVjdHNMaXN0W2luZGV4XS50aXRsZSA9IHRpdGxlO1xuICAgIHByb2plY3RzTGlzdFtpbmRleF0uaWNvbiA9IGljb247XG4gICAgcHJvamVjdHNMaXN0W2luZGV4XS5jb2xvciA9IGNvbG9yO1xuICAgIGRvbS5yZW5kZXJQcm9qZWN0cygpO1xuICAgIGRvbS5jaGFuZ2VQcm9qZWN0KGluZGV4KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVByb2plY3QoaW5kZXgpIHtcbiAgICBwcm9qZWN0c0xpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICBkb20uaGlkZUVsZW1lbnQoZG9tLm1vZGFscyk7XG4gICAgZG9tLnJlbmRlclByb2plY3RzKCk7XG4gICAgZG9tLmNoYW5nZVByb2plY3QoMCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHByb2plY3RzTGlzdCxcbiAgICBjcmVhdGVQcm9qZWN0LFxuICAgIGVkaXRQcm9qZWN0LFxuICAgIHJlbW92ZVByb2plY3QsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBwcm9qZWN0cztcbiIsImltcG9ydCBwcm9qZWN0cyBmcm9tICcuL3Byb2plY3RzJztcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuXG5jb25zdCB0YXNrcyA9ICgoKSA9PiB7XG4gIGNsYXNzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBwcmlvcml0eSwgc2NoZWR1bGUpIHtcbiAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgIHRoaXMuc2NoZWR1bGUgPSBzY2hlZHVsZTtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVRhc2socHJvamVjdEluZGV4LCB0aXRsZSwgcHJpb3JpdHkgPSAwLCBzY2hlZHVsZSA9IDApIHtcbiAgICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2sodGl0bGUsIHByaW9yaXR5LCBzY2hlZHVsZSk7XG4gICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3MucHVzaChuZXdUYXNrKTtcbiAgICBkb20ucmVuZGVyVGFza3MocHJvamVjdEluZGV4KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZVRhc2socHJvamVjdEluZGV4LCB0YXNrSW5kZXgpIHtcbiAgICBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5kb25lKSB7XG4gICAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLmRvbmUgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5kb25lID0gdHJ1ZTtcbiAgICB9XG4gICAgZG9tLnJlbmRlclRhc2tzKHByb2plY3RJbmRleCk7XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0VGFzayhwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCwgdGl0bGUsIHByaW9yaXR5LCBzY2hlZHVsZSkge1xuICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0udGl0bGUgPSB0aXRsZTtcbiAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5zY2hlZHVsZSA9IHNjaGVkdWxlO1xuICAgIGRvbS5yZW5kZXJUYXNrcyhwcm9qZWN0SW5kZXgpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlVGFzayhwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCkge1xuICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzLnNwbGljZSh0YXNrSW5kZXgsIDEpO1xuICAgIGRvbS5oaWRlRWxlbWVudChkb20ubW9kYWxzKTtcbiAgICBkb20ucmVuZGVyVGFza3MocHJvamVjdEluZGV4KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY3JlYXRlVGFzayxcbiAgICB0b2dnbGVUYXNrLFxuICAgIGVkaXRUYXNrLFxuICAgIHJlbW92ZVRhc2ssXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCB0YXNrcztcbiIsImltcG9ydCBwcm9qZWN0cyBmcm9tICcuL3Byb2plY3RzJztcbmltcG9ydCB0YXNrcyBmcm9tICcuL3Rhc2tzJztcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuXG5jb25zdCB2YWxpZGF0aW9uID0gKCgpID0+IHtcbiAgZnVuY3Rpb24gYWRkUHJvamVjdChldmVudCkge1xuICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmZvcm1zWydwcm9qZWN0LWZvcm0nXVsncHJvamVjdC10aXRsZSddLnZhbHVlO1xuICAgIGNvbnN0IHByb2plY3RJY29uID0gZG9jdW1lbnQuZm9ybXNbJ3Byb2plY3QtZm9ybSddWydwcm9qZWN0LWljb24nXS52YWx1ZTtcbiAgICBjb25zdCBwcm9qZWN0Q29sb3IgPSBkb2N1bWVudC5mb3Jtc1sncHJvamVjdC1mb3JtJ11bJ3Byb2plY3QtY29sb3InXS52YWx1ZTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAocHJvamVjdFRpdGxlICE9PSAnJykge1xuICAgICAgcHJvamVjdHMuY3JlYXRlUHJvamVjdChwcm9qZWN0VGl0bGUsIHByb2plY3RJY29uLCBwcm9qZWN0Q29sb3IpO1xuICAgICAgZG9tLmhpZGVFbGVtZW50KGRvbS5mb3JtUHJvamVjdFRpdGxlRXJyb3IpO1xuICAgICAgZG9tLmhpZGVFbGVtZW50KGRvbS5tb2RhbHMpO1xuICAgIH0gZWxzZSBpZiAocHJvamVjdFRpdGxlID09PSAnJykge1xuICAgICAgZG9tLnNob3dFbGVtZW50KGRvbS5mb3JtUHJvamVjdFRpdGxlRXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGVkaXRQcm9qZWN0KGV2ZW50LCBpbmRleCkge1xuICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmZvcm1zWydwcm9qZWN0LWZvcm0nXVsncHJvamVjdC10aXRsZSddLnZhbHVlO1xuICAgIGNvbnN0IHByb2plY3RJY29uID0gZG9jdW1lbnQuZm9ybXNbJ3Byb2plY3QtZm9ybSddWydwcm9qZWN0LWljb24nXS52YWx1ZTtcbiAgICBjb25zdCBwcm9qZWN0Q29sb3IgPSBkb2N1bWVudC5mb3Jtc1sncHJvamVjdC1mb3JtJ11bJ3Byb2plY3QtY29sb3InXS52YWx1ZTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAocHJvamVjdFRpdGxlICE9PSAnJykge1xuICAgICAgcHJvamVjdHMuZWRpdFByb2plY3QoaW5kZXgsIHByb2plY3RUaXRsZSwgcHJvamVjdEljb24sIHByb2plY3RDb2xvcik7XG4gICAgICBkb20uaGlkZUVsZW1lbnQoZG9tLmZvcm1Qcm9qZWN0VGl0bGVFcnJvcik7XG4gICAgICBkb20uaGlkZUVsZW1lbnQoZG9tLm1vZGFscyk7XG4gICAgfSBlbHNlIGlmIChwcm9qZWN0VGl0bGUgPT09ICcnKSB7XG4gICAgICBkb20uc2hvd0VsZW1lbnQoZG9tLmZvcm1Qcm9qZWN0VGl0bGVFcnJvcik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkVGFzayhldmVudCwgcHJvamVjdEluZGV4KSB7XG4gICAgY29uc3QgdGFza1RpdGxlID0gZG9jdW1lbnQuZm9ybXNbJ3Rhc2stZm9ybSddWyd0YXNrLXRpdGxlJ10udmFsdWU7XG4gICAgY29uc3QgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQuZm9ybXNbJ3Rhc2stZm9ybSddWyd0YXNrLXByaW9yaXR5J10udmFsdWU7XG4gICAgY29uc3QgdGFza1NjaGVkdWxlID0gZG9jdW1lbnQuZm9ybXNbJ3Rhc2stZm9ybSddWyd0YXNrLXNjaGVkdWxlJ10udmFsdWU7XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKHRhc2tUaXRsZSAhPT0gJycpIHtcbiAgICAgIHRhc2tzLmNyZWF0ZVRhc2socHJvamVjdEluZGV4LCB0YXNrVGl0bGUsIHRhc2tQcmlvcml0eSwgdGFza1NjaGVkdWxlKTtcbiAgICAgIGRvbS5oaWRlRWxlbWVudChkb20uZm9ybVRhc2tUaXRsZUVycm9yKTtcbiAgICAgIGRvbS5oaWRlRWxlbWVudChkb20ubW9kYWxzKTtcbiAgICB9IGVsc2UgaWYgKHRhc2tUaXRsZSA9PT0gJycpIHtcbiAgICAgIGRvbS5zaG93RWxlbWVudChkb20uZm9ybVRhc2tUaXRsZUVycm9yKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0VGFzayhldmVudCwgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgpIHtcbiAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5mb3Jtc1sndGFzay1mb3JtJ11bJ3Rhc2stdGl0bGUnXS52YWx1ZTtcbiAgICBjb25zdCB0YXNrUHJpb3JpdHkgPSBkb2N1bWVudC5mb3Jtc1sndGFzay1mb3JtJ11bJ3Rhc2stcHJpb3JpdHknXS52YWx1ZTtcbiAgICBjb25zdCB0YXNrU2NoZWR1bGUgPSBkb2N1bWVudC5mb3Jtc1sndGFzay1mb3JtJ11bJ3Rhc2stc2NoZWR1bGUnXS52YWx1ZTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAodGFza1RpdGxlICE9PSAnJykge1xuICAgICAgdGFza3MuZWRpdFRhc2socHJvamVjdEluZGV4LCB0YXNrSW5kZXgsIHRhc2tUaXRsZSwgdGFza1ByaW9yaXR5LCB0YXNrU2NoZWR1bGUpO1xuICAgICAgZG9tLmhpZGVFbGVtZW50KGRvbS5mb3JtVGFza1RpdGxlRXJyb3IpO1xuICAgICAgZG9tLmhpZGVFbGVtZW50KGRvbS5tb2RhbHMpO1xuICAgIH0gZWxzZSBpZiAodGFza1RpdGxlID09PSAnJykge1xuICAgICAgZG9tLnNob3dFbGVtZW50KGRvbS5mb3JtclRhc2tUaXRsZUVycm9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGFkZFByb2plY3QsXG4gICAgZWRpdFByb2plY3QsXG4gICAgYWRkVGFzayxcbiAgICBlZGl0VGFzayxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRpb247XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuaW1wb3J0IGhhbmRsZXJzIGZyb20gJy4vaGFuZGxlcnMnO1xuXG5kb20ucmVzcG9uc2l2ZVNpZGViYXIoKTtcbmRvbS5yZW5kZXJQcm9qZWN0cygpO1xuZG9tLmNoYW5nZVByb2plY3QoMCwgMCk7XG5cbmhhbmRsZXJzLnJlc2l6ZUhhbmRsZXIoKTtcbmhhbmRsZXJzLmNsaWNrSGFuZGxlcigpO1xuaGFuZGxlcnMua2V5Ym9hcmRIYW5kbGVyKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=