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
    if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList.length >= 1) {
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
  }

  function renderHeader(projectIndex) {
    const headerTitle = document.querySelector('.todo-header-title');

    if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList.length >= 1) {
      if (typeof projectIndex === 'number') {
        headerTitle.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].title;
      } else {
        headerTitle.textContent = projectIndex[0].toUpperCase() + projectIndex.substring(1);
      }
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
          if (projectIndex === 'important' && _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[j].tasks[i].priority !== 'high') {
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
    responsiveSidebar,
    toggleSidebar,
    showProjectModal,
    showTaskModal,
    showConfirmModal,
    showElement,
    hideElement,
    renderProjects,
    renderTasks,
    selectLink,
    renderHeader,
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
    let link;
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
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].selectLink('today');
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].renderHeader('today');
      // Nav links
      } else if (e.target.classList.contains('link-week')) {
        console.log('Week');
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].selectLink('week');
        _dom__WEBPACK_IMPORTED_MODULE_1__["default"].renderHeader('week');
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
        link = undefined;
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
        _validation__WEBPACK_IMPORTED_MODULE_0__["default"].editProject(e, projectIndex);
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
  const projectsList = [{
    title: 'Demo', icon: 'fa-home', color: 'project-green', tasks: [],
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
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].changeLink(projectsList.length - 1);
  }

  function editProject(index, title, icon, color) {
    projectsList[index].title = title;
    projectsList[index].icon = icon;
    projectsList[index].color = color;
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].renderProjects();
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].changeLink(index);
  }

  function removeProject(index) {
    projectsList.splice(index, 1);
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].hideElement(_dom__WEBPACK_IMPORTED_MODULE_0__["default"].modals);
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].renderProjects();
    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].changeLink('inbox');
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
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].renderTasks(link);
  }

  function toggleTask(projectIndex, taskIndex, link = projectIndex) {
    if (_projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].done) {
      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].done = false;
    } else {
      _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].done = true;
    }
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].renderTasks(link);
  }

  function editTask(projectIndex, taskIndex, title, priority, schedule, link = projectIndex) {
    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].title = title;
    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].priority = priority;
    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks[taskIndex].schedule = schedule;
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].renderTasks(link);
  }

  function removeTask(projectIndex, taskIndex, link = projectIndex) {
    _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[projectIndex].tasks.splice(taskIndex, 1);
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].hideElement(_dom__WEBPACK_IMPORTED_MODULE_1__["default"].modals);
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].renderTasks(link);
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
_dom__WEBPACK_IMPORTED_MODULE_0__["default"].changeLink('inbox');

_handlers__WEBPACK_IMPORTED_MODULE_1__["default"].resizeHandler();
_handlers__WEBPACK_IMPORTED_MODULE_1__["default"].clickHandler();
_handlers__WEBPACK_IMPORTED_MODULE_1__["default"].keyboardHandler();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLE1BQU0seURBQWdCO0FBQ3RCLE1BQU0sd0RBQWUsQ0FBQywrREFBc0I7QUFDNUMsTUFBTSx3REFBZSxDQUFDLG1EQUFVO0FBQ2hDLE1BQU07QUFDTixNQUFNLHdEQUFlLENBQUMsK0RBQXNCO0FBQzVDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxNQUFNLHVEQUFjO0FBQ3BCLE1BQU0sd0RBQWUsQ0FBQywrREFBc0I7QUFDNUMsTUFBTSx3REFBZSxDQUFDLG1EQUFVO0FBQ2hDLE1BQU07QUFDTixNQUFNLHdEQUFlLENBQUMsZ0VBQXVCO0FBQzdDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxpRUFBZSxVQUFVLEVBQUM7Ozs7Ozs7VUM3RTFCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTndCO0FBQ1U7O0FBRWxDLDhEQUFxQjtBQUNyQiwyREFBa0I7QUFDbEIsdURBQWM7O0FBRWQsK0RBQXNCO0FBQ3RCLDhEQUFxQjtBQUNyQixpRUFBd0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2hhbmRsZXJzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy90YXNrcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb2plY3RzIGZyb20gJy4vcHJvamVjdHMnO1xuXG5jb25zdCBkb20gPSAoKCkgPT4ge1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKTtcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgY29uc3QgcHJvamVjdHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXItcHJvamVjdHMtbGlzdCcpO1xuICBjb25zdCB0YXNrc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1pdGVtLWxpc3QnKTtcbiAgY29uc3QgcHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbW9kYWwnKTtcbiAgY29uc3QgdGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stbW9kYWwnKTtcbiAgY29uc3QgY29uZmlybU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbmZpcm0tbW9kYWwnKTtcbiAgY29uc3QgbW9kYWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1vZGFsJyk7XG4gIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZm9ybScpO1xuICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWZvcm0nKTtcbiAgY29uc3QgZm9ybVByb2plY3RUaXRsZUVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtdGl0bGUtZXJyb3InKTtcbiAgY29uc3QgZm9ybVRhc2tUaXRsZUVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stdGl0bGUtZXJyb3InKTtcblxuICBmdW5jdGlvbiByZXNwb25zaXZlU2lkZWJhcigpIHtcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPD0gOTYwKSB7XG4gICAgICBzaWRlYmFyLmNsYXNzTGlzdC5yZW1vdmUoJ3NpZGViYXItc2hvdycpO1xuICAgICAgc2lkZWJhci5jbGFzc0xpc3QuYWRkKCdzaWRlYmFyLWhpZGUnKTtcbiAgICAgIG1haW4uY2xhc3NMaXN0LmFkZCgnbWFpbi1tb2JpbGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdzaWRlYmFyLWhpZGUnKTtcbiAgICAgIHNpZGViYXIuY2xhc3NMaXN0LmFkZCgnc2lkZWJhci1zaG93Jyk7XG4gICAgICBtYWluLmNsYXNzTGlzdC5yZW1vdmUoJ21haW4tbW9iaWxlJyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlU2lkZWJhcigpIHtcbiAgICBpZiAoIXNpZGViYXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaWRlYmFyLXNob3cnKSkge1xuICAgICAgc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdzaWRlYmFyLWhpZGUnKTtcbiAgICAgIHNpZGViYXIuY2xhc3NMaXN0LmFkZCgnc2lkZWJhci1zaG93Jyk7XG4gICAgfSBlbHNlIGlmIChzaWRlYmFyLmNsYXNzTGlzdC5jb250YWlucygnc2lkZWJhci1zaG93JykpIHtcbiAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnc2lkZWJhci1zaG93Jyk7XG4gICAgICBzaWRlYmFyLmNsYXNzTGlzdC5hZGQoJ3NpZGViYXItaGlkZScpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3dQcm9qZWN0TW9kYWwobW9kYWwsIGluZGV4ID0gZmFsc2UpIHtcbiAgICBjb25zdCBtb2RhbEhlYWRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1tb2RhbC10aXRsZScpO1xuICAgIGNvbnN0IG1vZGFsU3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtYnV0dG9uJyk7XG5cbiAgICBwcm9qZWN0TW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIHByb2plY3RNb2RhbC5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Jyk7XG5cbiAgICBpZiAobW9kYWwgPT09ICdhZGRQcm9qZWN0Jykge1xuICAgICAgcHJvamVjdEZvcm0ucmVzZXQoKTtcbiAgICAgIG1vZGFsSGVhZGluZy50ZXh0Q29udGVudCA9ICdOZXcgcHJvamVjdCc7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdBZGQnO1xuICAgICAgbW9kYWxTdWJtaXRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnZWRpdC1wcm9qZWN0Jyk7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdhZGQtcHJvamVjdCcpO1xuICAgIH0gZWxzZSBpZiAobW9kYWwgPT09ICdlZGl0UHJvamVjdCcpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRQcm9qZWN0VGl0bGUgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLnRpdGxlO1xuICAgICAgY29uc3QgY3VycmVudFByb2plY3RJY29uID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2luZGV4XS5pY29uO1xuICAgICAgY29uc3QgY3VycmVudFByb2plY3RDb2xvciA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0uY29sb3I7XG5cbiAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtLXByb2plY3QtdGl0bGUnKTtcbiAgICAgIGNvbnN0IHByb2plY3RJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbdmFsdWU9JHtjdXJyZW50UHJvamVjdEljb259XWApO1xuICAgICAgY29uc3QgcHJvamVjdENvbG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXRbdmFsdWU9JHtjdXJyZW50UHJvamVjdENvbG9yfV1gKTtcblxuICAgICAgcHJvamVjdFRpdGxlLnZhbHVlID0gY3VycmVudFByb2plY3RUaXRsZTtcbiAgICAgIHByb2plY3RJY29uLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgcHJvamVjdENvbG9yLmNoZWNrZWQgPSB0cnVlO1xuXG4gICAgICBtb2RhbEhlYWRpbmcudGV4dENvbnRlbnQgPSAnRWRpdCBwcm9qZWN0JztcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gJ0VkaXQnO1xuICAgICAgbW9kYWxTdWJtaXRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnYWRkLXByb2plY3QnKTtcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2VkaXQtcHJvamVjdCcpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3dUYXNrTW9kYWwobW9kYWwsIHByb2plY3RJbmRleCA9IGZhbHNlLCB0YXNrSW5kZXggPSBmYWxzZSkge1xuICAgIGNvbnN0IG1vZGFsSGVhZGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLW1vZGFsLXRpdGxlJyk7XG4gICAgY29uc3QgbW9kYWxTdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1idXR0b24nKTtcblxuICAgIHRhc2tNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgdGFza01vZGFsLmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXknKTtcblxuICAgIGlmIChtb2RhbCA9PT0gJ2FkZFRhc2snKSB7XG4gICAgICB0YXNrRm9ybS5yZXNldCgpO1xuICAgICAgbW9kYWxIZWFkaW5nLnRleHRDb250ZW50ID0gJ05ldyB0YXNrJztcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gJ0FkZCc7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdlZGl0LXRhc2snKTtcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2FkZC10YXNrJyk7XG4gICAgfSBlbHNlIGlmIChtb2RhbCA9PT0gJ2VkaXRUYXNrJykge1xuICAgICAgY29uc3QgY3VycmVudFRhc2tUaXRsZSA9IHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0udGl0bGU7XG4gICAgICBjb25zdCBjdXJyZW50VGFza1ByaW9yaXR5ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5wcmlvcml0eTtcbiAgICAgIGNvbnN0IGN1cnJlbnRUYXNrU2NoZWR1bGUgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLnNjaGVkdWxlO1xuXG4gICAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybS10YXNrLXRpdGxlJyk7XG4gICAgICBjb25zdCB0YXNrUHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybS10YXNrLXByaW9yaXR5Jyk7XG4gICAgICBjb25zdCB0YXNrU2NoZWR1bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybS10YXNrLXNjaGVkdWxlJyk7XG5cbiAgICAgIHRhc2tUaXRsZS52YWx1ZSA9IGN1cnJlbnRUYXNrVGl0bGU7XG4gICAgICB0YXNrUHJpb3JpdHkudmFsdWUgPSBjdXJyZW50VGFza1ByaW9yaXR5O1xuICAgICAgdGFza1NjaGVkdWxlLnZhbHVlID0gY3VycmVudFRhc2tTY2hlZHVsZTtcblxuICAgICAgbW9kYWxIZWFkaW5nLnRleHRDb250ZW50ID0gJ0VkaXQgcHJvamVjdCc7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdFZGl0JztcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2FkZC10YXNrJyk7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdlZGl0LXRhc2snKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93Q29uZmlybU1vZGFsKG1vZGFsLCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCkge1xuICAgIGNvbnN0IG1vZGFsSGVhZGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb25maXJtLW1vZGFsLXRpdGxlJyk7XG4gICAgY29uc3QgbW9kYWxDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmZpcm0tbW9kYWwtY29udGVudCcpO1xuICAgIGNvbnN0IG1vZGFsU3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbmZpcm0tYnV0dG9uJyk7XG4gICAgY29uc3QgbW9kYWxDb250ZW50UHJlZml4ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1lvdSBhcmUgZ29pbmcgdG8gcmVtb3ZlICcpO1xuICAgIGNvbnN0IG1vZGFsQ29udGVudFBvc3RmaXggPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnLiBUaGlzIGFjdGlvbiBjYW5ub3QgYmUgdW5kb25lLicpO1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgY29uZmlybU1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBjb25maXJtTW9kYWwuY2xhc3NMaXN0LmFkZCgnZGlzcGxheScpO1xuXG4gICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgnY29uZmlybS1tb2RhbC10aXRsZScpO1xuXG4gICAgbW9kYWxDb250ZW50LnRleHRDb250ZW50ID0gJyc7XG5cbiAgICBpZiAobW9kYWwgPT09ICdyZW1vdmVQcm9qZWN0Jykge1xuICAgICAgbW9kYWxIZWFkaW5nLnRleHRDb250ZW50ID0gJ1JlbW92ZSBwcm9qZWN0JztcbiAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGl0bGU7XG4gICAgICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQobW9kYWxDb250ZW50UHJlZml4KTtcbiAgICAgIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQobW9kYWxDb250ZW50UG9zdGZpeCk7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdyZW1vdmUtdGFzaycpO1xuICAgICAgbW9kYWxTdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgncmVtb3ZlLXByb2plY3QnKTtcbiAgICB9IGVsc2UgaWYgKG1vZGFsID09PSAncmVtb3ZlVGFzaycpIHtcbiAgICAgIG1vZGFsSGVhZGluZy50ZXh0Q29udGVudCA9ICdSZW1vdmUgdGFzayc7XG4gICAgICB0aXRsZS50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0udGl0bGU7XG4gICAgICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQobW9kYWxDb250ZW50UHJlZml4KTtcbiAgICAgIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgICBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQobW9kYWxDb250ZW50UG9zdGZpeCk7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdyZW1vdmUtcHJvamVjdCcpO1xuICAgICAgbW9kYWxTdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgncmVtb3ZlLXRhc2snKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93RWxlbWVudChlbGVtZW50KSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Jyk7XG4gIH1cblxuICBmdW5jdGlvbiBoaWRlRWxlbWVudChtb2RhbCkge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YuY2FsbChOb2RlTGlzdC5wcm90b3R5cGUsIG1vZGFsKSkge1xuICAgICAgbW9kYWwuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc3BsYXknKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheScpO1xuICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlclByb2plY3RzKCkge1xuICAgIC8vIENyZWF0ZSBsaW5rXG4gICAgcHJvamVjdHNMaXN0LnRleHRDb250ZW50ID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5wcm9qZWN0c0xpc3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHByb2plY3RMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgcHJvamVjdExpbmsuY2xhc3NMaXN0LmFkZCgnc2lkZWJhci1wcm9qZWN0Jyk7XG4gICAgICBwcm9qZWN0TGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycpO1xuICAgICAgcHJvamVjdExpbmsuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaSk7XG4gICAgICBwcm9qZWN0c0xpc3QuYXBwZW5kQ2hpbGQocHJvamVjdExpbmspO1xuICAgICAgLy8gQ3JlYXRlIGljb25cbiAgICAgIGNvbnN0IHByb2plY3RJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgcHJvamVjdEljb24uY2xhc3NMaXN0LmFkZCgnZmFyJywgcHJvamVjdHMucHJvamVjdHNMaXN0W2ldLmljb24sICdmYS1mdycsIHByb2plY3RzLnByb2plY3RzTGlzdFtpXS5jb2xvciwgJ3NpZGViYXItcHJvamVjdCcsICdzaWRlYmFyLXByb2plY3QtaWNvbicpO1xuICAgICAgcHJvamVjdExpbmsuYXBwZW5kQ2hpbGQocHJvamVjdEljb24pO1xuICAgICAgLy8gQ3JlYXRlIHRpdGxlXG4gICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGl0bGUpO1xuICAgICAgcHJvamVjdExpbmsuYXBwZW5kQ2hpbGQocHJvamVjdFRpdGxlKTtcbiAgICAgIC8vIENyZWF0ZSByZW1vdmUgaWNvblxuICAgICAgY29uc3QgcHJvamVjdFJlbW92ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICBwcm9qZWN0UmVtb3ZlSWNvbi5jbGFzc0xpc3QuYWRkKCdmYXInLCAnZmEtdHJhc2gnLCAncmVtb3ZlLXByb2plY3QtbW9kYWwnKTtcbiAgICAgIHByb2plY3RMaW5rLmFwcGVuZENoaWxkKHByb2plY3RSZW1vdmVJY29uKTtcbiAgICAgIC8vIENyZWF0ZSBlZGl0IGljb25cbiAgICAgIGNvbnN0IHByb2plY3RFZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgIHByb2plY3RFZGl0SWNvbi5jbGFzc0xpc3QuYWRkKCdmYXInLCAnZmEtZWRpdCcsICdlZGl0LXByb2plY3QtbW9kYWwnKTtcbiAgICAgIHByb2plY3RMaW5rLmFwcGVuZENoaWxkKHByb2plY3RFZGl0SWNvbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2VsZWN0TGluayhwcm9qZWN0SW5kZXgpIHtcbiAgICBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0Lmxlbmd0aCA+PSAxKSB7XG4gICAgICBjb25zdCBhbGxMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Euc2lkZWJhci1wcm9qZWN0LCBhLnNpZGViYXItbGluaycpO1xuICAgICAgY29uc3QgaW5ib3hMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmstaW5ib3gnKTtcbiAgICAgIGNvbnN0IHRvZGF5TGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5rLXRvZGF5Jyk7XG4gICAgICBjb25zdCB3ZWVrTGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saW5rLXdlZWsnKTtcbiAgICAgIGNvbnN0IGltcG9ydGFudExpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluay1pbXBvcnRhbnQnKTtcbiAgICAgIGNvbnN0IGNvbXBsZXRlZExpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluay1jb21wbGV0ZWQnKTtcbiAgICAgIGNvbnN0IHByb2plY3RMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Euc2lkZWJhci1wcm9qZWN0Jyk7XG4gICAgICBhbGxMaW5rcy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICB9KTtcbiAgICAgIGlmICh0eXBlb2YgcHJvamVjdEluZGV4ID09PSAnbnVtYmVyJykge1xuICAgICAgICBwcm9qZWN0TGlua3NbcHJvamVjdEluZGV4XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvamVjdEluZGV4ID09PSAnaW5ib3gnKSB7XG4gICAgICAgIGluYm94TGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvamVjdEluZGV4ID09PSAndG9kYXknKSB7XG4gICAgICAgIHRvZGF5TGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvamVjdEluZGV4ID09PSAnd2VlaycpIHtcbiAgICAgICAgd2Vla0xpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICB9IGVsc2UgaWYgKHByb2plY3RJbmRleCA9PT0gJ2ltcG9ydGFudCcpIHtcbiAgICAgICAgaW1wb3J0YW50TGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvamVjdEluZGV4ID09PSAnY29tcGxldGVkJykge1xuICAgICAgICBjb21wbGV0ZWRMaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckhlYWRlcihwcm9qZWN0SW5kZXgpIHtcbiAgICBjb25zdCBoZWFkZXJUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWhlYWRlci10aXRsZScpO1xuXG4gICAgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdC5sZW5ndGggPj0gMSkge1xuICAgICAgaWYgKHR5cGVvZiBwcm9qZWN0SW5kZXggPT09ICdudW1iZXInKSB7XG4gICAgICAgIGhlYWRlclRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGl0bGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoZWFkZXJUaXRsZS50ZXh0Q29udGVudCA9IHByb2plY3RJbmRleFswXS50b1VwcGVyQ2FzZSgpICsgcHJvamVjdEluZGV4LnN1YnN0cmluZygxKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJUYXNrcyhwcm9qZWN0SW5kZXgpIHtcbiAgICBsZXQgaW5kZXhTdGFydDtcbiAgICBsZXQgaW5kZXhFbmQ7XG4gICAgdGFza3NMaXN0LnRleHRDb250ZW50ID0gJyc7XG4gICAgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdC5sZW5ndGggPj0gMSkge1xuICAgICAgaWYgKHR5cGVvZiBwcm9qZWN0SW5kZXggPT09ICdudW1iZXInKSB7XG4gICAgICAgIGluZGV4U3RhcnQgPSBwcm9qZWN0SW5kZXg7XG4gICAgICAgIGluZGV4RW5kID0gcHJvamVjdEluZGV4ICsgMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGV4U3RhcnQgPSAwO1xuICAgICAgICBpbmRleEVuZCA9IHByb2plY3RzLnByb2plY3RzTGlzdC5sZW5ndGg7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBqID0gaW5kZXhTdGFydDsgaiA8IGluZGV4RW5kOyBqICs9IDEpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5wcm9qZWN0c0xpc3Rbal0udGFza3MubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBpZiAocHJvamVjdEluZGV4ID09PSAnaW1wb3J0YW50JyAmJiBwcm9qZWN0cy5wcm9qZWN0c0xpc3Rbal0udGFza3NbaV0ucHJpb3JpdHkgIT09ICdoaWdoJykge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSBlbHNlIGlmIChwcm9qZWN0SW5kZXggPT09ICdjb21wbGV0ZWQnICYmIHByb2plY3RzLnByb2plY3RzTGlzdFtqXS50YXNrc1tpXS5kb25lICE9PSB0cnVlKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdG9kb0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICB0b2RvSXRlbS5jbGFzc0xpc3QuYWRkKCd0b2RvLWl0ZW0nLCAndG9nZ2xlLXRhc2snKTtcbiAgICAgICAgICB0b2RvSXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcsIGopO1xuICAgICAgICAgIHRvZG9JdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4JywgaSk7XG4gICAgICAgICAgdGFza3NMaXN0LmFwcGVuZENoaWxkKHRvZG9JdGVtKTtcbiAgICAgICAgICAvLyBDcmVhdGUgaWNvblxuICAgICAgICAgIGNvbnN0IHRhc2tJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhcicsICdmYS1mdycsICd0b2dnbGUtdGFzaycpO1xuICAgICAgICAgIGlmIChwcm9qZWN0cy5wcm9qZWN0c0xpc3Rbal0udGFza3NbaV0ucHJpb3JpdHkgPT09ICdsb3cnKSB7XG4gICAgICAgICAgICB0YXNrSWNvbi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LWdyZWVuJyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChwcm9qZWN0cy5wcm9qZWN0c0xpc3Rbal0udGFza3NbaV0ucHJpb3JpdHkgPT09ICdtZWRpdW0nKSB7XG4gICAgICAgICAgICB0YXNrSWNvbi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LXllbGxvdycpO1xuICAgICAgICAgIH0gZWxzZSBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W2pdLnRhc2tzW2ldLnByaW9yaXR5ID09PSAnaGlnaCcpIHtcbiAgICAgICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtcmVkJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtZ3JleScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZCh0YXNrSWNvbik7XG4gICAgICAgICAgLy8gQ3JlYXRlIHRpdGxlXG4gICAgICAgICAgY29uc3QgdGFza1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgIHRhc2tUaXRsZS5jbGFzc0xpc3QuYWRkKCd0b2RvLWl0ZW0tdGl0bGUnLCAndG9nZ2xlLXRhc2snKTtcbiAgICAgICAgICB0YXNrVGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3Rbal0udGFza3NbaV0udGl0bGU7XG4gICAgICAgICAgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdFtqXS50YXNrc1tpXS5kb25lID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0YXNrSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1jaGVjay1jaXJjbGUnKTtcbiAgICAgICAgICAgIHRhc2tUaXRsZS5jbGFzc0xpc3QuYWRkKCdkb25lJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhc2tJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLWNpcmNsZScpO1xuICAgICAgICAgICAgdGFza1RpdGxlLmNsYXNzTGlzdC5yZW1vdmUoJ2RvbmUnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQodGFza1RpdGxlKTtcbiAgICAgICAgICAvLyBDcmVhdGUgZGF0ZVxuICAgICAgICAgIGlmIChwcm9qZWN0cy5wcm9qZWN0c0xpc3Rbal0udGFza3NbaV0uc2NoZWR1bGUgIT09ICcnKSB7XG4gICAgICAgICAgICBjb25zdCB0YXNrRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIHRhc2tEYXRlLmNsYXNzTGlzdC5hZGQoJ3RvZG8taXRlbS1kYXRlJywgJ3RvZG8taXRlbS1waWxsJywgJ3RvZ2dsZS10YXNrJyk7XG4gICAgICAgICAgICB0YXNrRGF0ZS50ZXh0Q29udGVudCA9IHByb2plY3RzLnByb2plY3RzTGlzdFtqXS50YXNrc1tpXS5zY2hlZHVsZTtcbiAgICAgICAgICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKHRhc2tEYXRlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gQ3JlYXRlIHByb2plY3QgbmFtZVxuICAgICAgICAgIGNvbnN0IHRhc2tQcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgIHRhc2tQcm9qZWN0LmNsYXNzTGlzdC5hZGQoJ3RvZG8taXRlbS1waWxsJywgYCR7cHJvamVjdHMucHJvamVjdHNMaXN0W2pdLmNvbG9yfS1iYWNrZ3JvdW5kYCwgJ3RvZ2dsZS10YXNrJyk7XG4gICAgICAgICAgdGFza1Byb2plY3QudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3Rbal0udGl0bGU7XG4gICAgICAgICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQodGFza1Byb2plY3QpO1xuICAgICAgICAgIC8vIENyZWF0ZSBlZGl0IGljb25cbiAgICAgICAgICBjb25zdCB0YXNrRWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgICAgdGFza0VkaXRJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhcicsICdmYS1lZGl0JywgJ2ZhLWZ3JywgJ2VkaXQtdGFzay1tb2RhbCcpO1xuICAgICAgICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKHRhc2tFZGl0SWNvbik7XG4gICAgICAgICAgLy8gQ3JlYXRlIHJlbW92ZSBpY29uXG4gICAgICAgICAgY29uc3QgdGFza1JlbW92ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgICAgdGFza1JlbW92ZUljb24uY2xhc3NMaXN0LmFkZCgnZmFyJywgJ2ZhLXRyYXNoJywgJ2ZhLWZ3JywgJ3JlbW92ZS10YXNrLW1vZGFsJyk7XG4gICAgICAgICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQodGFza1JlbW92ZUljb24pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBBZGQgdGFzayBsaW5lXG4gICAgICBjb25zdCB0YXNrQWRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0YXNrQWRkLnNldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0LWluZGV4JywgcHJvamVjdEluZGV4KTtcbiAgICAgIHRhc2tBZGQuY2xhc3NMaXN0LmFkZCgndG9kby1pdGVtLWFkZCcsICdhZGQtdGFzay1tb2RhbCcpO1xuICAgICAgdGFza3NMaXN0LmFwcGVuZENoaWxkKHRhc2tBZGQpO1xuICAgICAgY29uc3QgdGFza0FkZEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICB0YXNrQWRkSWNvbi5jbGFzc0xpc3QuYWRkKCdmYXInLCAnZmEtcGx1cycsICdmYS1mdycsICdhZGQtdGFzay1tb2RhbCcpO1xuICAgICAgdGFza0FkZC5hcHBlbmRDaGlsZCh0YXNrQWRkSWNvbik7XG4gICAgICBjb25zdCB0YXNrQWRkVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICB0YXNrQWRkVGl0bGUuY2xhc3NMaXN0LmFkZCgndG9kby1pdGVtLXRpdGxlJywgJ2FkZC10YXNrLW1vZGFsJyk7XG4gICAgICB0YXNrQWRkVGl0bGUudGV4dENvbnRlbnQgPSAnQWRkIG5ldyB0YXNrJztcbiAgICAgIHRhc2tBZGQuYXBwZW5kQ2hpbGQodGFza0FkZFRpdGxlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaGFuZ2VMaW5rKHByb2plY3RJbmRleCkge1xuICAgIHNlbGVjdExpbmsocHJvamVjdEluZGV4KTtcbiAgICByZW5kZXJIZWFkZXIocHJvamVjdEluZGV4KTtcbiAgICByZW5kZXJUYXNrcyhwcm9qZWN0SW5kZXgpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBib2R5LFxuICAgIHByb2plY3RNb2RhbCxcbiAgICBjb25maXJtTW9kYWwsXG4gICAgbW9kYWxzLFxuICAgIGZvcm1Qcm9qZWN0VGl0bGVFcnJvcixcbiAgICBmb3JtVGFza1RpdGxlRXJyb3IsXG4gICAgcmVzcG9uc2l2ZVNpZGViYXIsXG4gICAgdG9nZ2xlU2lkZWJhcixcbiAgICBzaG93UHJvamVjdE1vZGFsLFxuICAgIHNob3dUYXNrTW9kYWwsXG4gICAgc2hvd0NvbmZpcm1Nb2RhbCxcbiAgICBzaG93RWxlbWVudCxcbiAgICBoaWRlRWxlbWVudCxcbiAgICByZW5kZXJQcm9qZWN0cyxcbiAgICByZW5kZXJUYXNrcyxcbiAgICBzZWxlY3RMaW5rLFxuICAgIHJlbmRlckhlYWRlcixcbiAgICBjaGFuZ2VMaW5rLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZG9tO1xuIiwiaW1wb3J0IHZhbGlkYXRpb24gZnJvbSAnLi92YWxpZGF0aW9uJztcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuaW1wb3J0IHByb2plY3RzIGZyb20gJy4vcHJvamVjdHMnO1xuaW1wb3J0IHRhc2tzIGZyb20gJy4vdGFza3MnO1xuXG5jb25zdCBoYW5kbGVycyA9ICgoKSA9PiB7XG4gIGZ1bmN0aW9uIGNsaWNrSGFuZGxlcigpIHtcbiAgICBsZXQgcHJvamVjdEluZGV4ID0gMDtcbiAgICBsZXQgdGFza0luZGV4ID0gMDtcbiAgICBsZXQgbGluaztcbiAgICBkb20uYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAvLyBUb2dnbGUgc2lkZWJhclxuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndG9nZ2xlLXNpZGViYXInKSkge1xuICAgICAgICBkb20udG9nZ2xlU2lkZWJhcigpO1xuICAgICAgLy8gTmF2IGxpbmtzXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbGluay1pbmJveCcpKSB7XG4gICAgICAgIGxpbmsgPSAnaW5ib3gnO1xuICAgICAgICBkb20uY2hhbmdlTGluaygnaW5ib3gnKTtcbiAgICAgIC8vIE5hdiBsaW5rc1xuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2xpbmstdG9kYXknKSkge1xuICAgICAgICBjb25zb2xlLmxvZygnVG9kYXknKTtcbiAgICAgICAgZG9tLnNlbGVjdExpbmsoJ3RvZGF5Jyk7XG4gICAgICAgIGRvbS5yZW5kZXJIZWFkZXIoJ3RvZGF5Jyk7XG4gICAgICAvLyBOYXYgbGlua3NcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsaW5rLXdlZWsnKSkge1xuICAgICAgICBjb25zb2xlLmxvZygnV2VlaycpO1xuICAgICAgICBkb20uc2VsZWN0TGluaygnd2VlaycpO1xuICAgICAgICBkb20ucmVuZGVySGVhZGVyKCd3ZWVrJyk7XG4gICAgICAvLyBOYXYgbGlua3NcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsaW5rLWltcG9ydGFudCcpKSB7XG4gICAgICAgIGxpbmsgPSAnaW1wb3J0YW50JztcbiAgICAgICAgZG9tLmNoYW5nZUxpbmsoJ2ltcG9ydGFudCcpO1xuICAgICAgLy8gTmF2IGxpbmtzXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbGluay1jb21wbGV0ZWQnKSkge1xuICAgICAgICBsaW5rID0gJ2NvbXBsZXRlZCc7XG4gICAgICAgIGRvbS5jaGFuZ2VMaW5rKCdjb21wbGV0ZWQnKTtcbiAgICAgIC8vIFByb2plY3QgbGlua3NcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaWRlYmFyLXByb2plY3QnKSkge1xuICAgICAgICBwcm9qZWN0SW5kZXggPSBwYXJzZUludCgoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykpID8gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykgOiBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgIGxpbmsgPSB1bmRlZmluZWQ7XG4gICAgICAgIGRvbS5jaGFuZ2VMaW5rKHByb2plY3RJbmRleCk7XG4gICAgICAvLyBBZGQgcHJvamVjdCBtb2RhbCBvcGVuXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWRkLXByb2plY3QtbW9kYWwnKSkge1xuICAgICAgICBsaW5rID0gdW5kZWZpbmVkO1xuICAgICAgICBkb20uc2hvd1Byb2plY3RNb2RhbCgnYWRkUHJvamVjdCcpO1xuICAgICAgLy8gRWRpdCBwcm9qZWN0IG1vZGFsIG9wZW5cbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LXByb2plY3QtbW9kYWwnKSkge1xuICAgICAgICBsaW5rID0gdW5kZWZpbmVkO1xuICAgICAgICBwcm9qZWN0SW5kZXggPSBwYXJzZUludChlLnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgIGRvbS5zaG93UHJvamVjdE1vZGFsKCdlZGl0UHJvamVjdCcsIHByb2plY3RJbmRleCk7XG4gICAgICAvLyBSZW1vdmUgcHJvamVjdCBtb2RhbCBvcGVuXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncmVtb3ZlLXByb2plY3QtbW9kYWwnKSkge1xuICAgICAgICBwcm9qZWN0SW5kZXggPSBwYXJzZUludChlLnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgIGRvbS5zaG93Q29uZmlybU1vZGFsKCdyZW1vdmVQcm9qZWN0JywgcHJvamVjdEluZGV4KTtcbiAgICAgIC8vIEFkZCB0YXNrIG1vZGFsIG9wZW5cbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtdGFzay1tb2RhbCcpKSB7XG4gICAgICAgIHByb2plY3RJbmRleCA9IHBhcnNlSW50KChlLnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0LWluZGV4JykpID8gZS50YXJnZXQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcpIDogZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QtaW5kZXgnKSwgMTApO1xuICAgICAgICBkb20uc2hvd1Rhc2tNb2RhbCgnYWRkVGFzaycsIHByb2plY3RJbmRleCk7XG4gICAgICAvLyBFZGl0IHRhc2sgbW9kYWwgb3BlblxuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtdGFzay1tb2RhbCcpKSB7XG4gICAgICAgIHRhc2tJbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhc2staW5kZXgnKSwgMTApO1xuICAgICAgICBkb20uc2hvd1Rhc2tNb2RhbCgnZWRpdFRhc2snLCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCk7XG4gICAgICAvLyBSZW1vdmUgdGFzayBtb2RhbCBvcGVuXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncmVtb3ZlLXRhc2stbW9kYWwnKSkge1xuICAgICAgICBwcm9qZWN0SW5kZXggPSBwYXJzZUludChlLnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0LWluZGV4JyksIDEwKTtcbiAgICAgICAgdGFza0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1pbmRleCcpLCAxMCk7XG4gICAgICAgIGRvbS5zaG93Q29uZmlybU1vZGFsKCdyZW1vdmVUYXNrJywgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgpO1xuICAgICAgLy8gQ2xvc2UgYWxsIG1vZGFsc1xuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Nsb3NlJykgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtb2RhbCcpKSB7XG4gICAgICAgIGRvbS5oaWRlRWxlbWVudChkb20ubW9kYWxzKTtcbiAgICAgIC8vIEFkZCBwcm9qZWN0XG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWRkLXByb2plY3QnKSkge1xuICAgICAgICB2YWxpZGF0aW9uLmFkZFByb2plY3QoZSk7XG4gICAgICAvLyBFZGl0IHByb2plY3RcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LXByb2plY3QnKSkge1xuICAgICAgICB2YWxpZGF0aW9uLmVkaXRQcm9qZWN0KGUsIHByb2plY3RJbmRleCk7XG4gICAgICAvLyBSZW1vdmUgcHJvamVjdFxuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3JlbW92ZS1wcm9qZWN0JykpIHtcbiAgICAgICAgcHJvamVjdHMucmVtb3ZlUHJvamVjdChwcm9qZWN0SW5kZXgpO1xuICAgICAgLy8gQWRkIFRhc2tcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtdGFzaycpKSB7XG4gICAgICAgIHZhbGlkYXRpb24uYWRkVGFzayhlLCBwcm9qZWN0SW5kZXgpO1xuICAgICAgLy8gRWRpdCBUYXNrXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC10YXNrJykpIHtcbiAgICAgICAgdmFsaWRhdGlvbi5lZGl0VGFzayhlLCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCwgbGluayk7XG4gICAgICAvLyBSZW1vdmUgdGFza1xuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3JlbW92ZS10YXNrJykpIHtcbiAgICAgICAgdGFza3MucmVtb3ZlVGFzayhwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCwgbGluayk7XG4gICAgICAvLyBUb2dnbGUgdGFza1xuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3RvZ2dsZS10YXNrJykpIHtcbiAgICAgICAgcHJvamVjdEluZGV4ID0gcGFyc2VJbnQoKGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0LWluZGV4JykpID8gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QtaW5kZXgnKSA6IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QtaW5kZXgnKSwgMTApO1xuICAgICAgICB0YXNrSW5kZXggPSBwYXJzZUludCgoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhc2staW5kZXgnKSkgPyBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1pbmRleCcpIDogZS50YXJnZXQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1pbmRleCcpLCAxMCk7XG4gICAgICAgIHRhc2tzLnRvZ2dsZVRhc2socHJvamVjdEluZGV4LCB0YXNrSW5kZXgsIGxpbmspO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24ga2V5Ym9hcmRIYW5kbGVyKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICBkb20uaGlkZUVsZW1lbnQoZG9tLm1vZGFscyk7XG4gICAgICB9XG4gICAgICAvLyBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInICYmIG1vZGFsLnN0eWxlLmRpc3BsYXkgPT09ICdibG9jaycpIHtcbiAgICAgIC8vICAgc3VibWl0QnV0dG9uLmNsaWNrKCk7XG4gICAgICAvLyB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNpemVIYW5kbGVyKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkb20ucmVzcG9uc2l2ZVNpZGViYXIpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjbGlja0hhbmRsZXIsXG4gICAga2V5Ym9hcmRIYW5kbGVyLFxuICAgIHJlc2l6ZUhhbmRsZXIsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVycztcbiIsImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuXG5jb25zdCBwcm9qZWN0cyA9ICgoKSA9PiB7XG4gIGNvbnN0IHByb2plY3RzTGlzdCA9IFt7XG4gICAgdGl0bGU6ICdEZW1vJywgaWNvbjogJ2ZhLWhvbWUnLCBjb2xvcjogJ3Byb2plY3QtZ3JlZW4nLCB0YXNrczogW10sXG4gIH1dO1xuXG4gIGNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBpY29uLCBjb2xvcikge1xuICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgdGhpcy5pY29uID0gaWNvbjtcbiAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgIHRoaXMudGFza3MgPSBbXTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVQcm9qZWN0KHRpdGxlLCBpY29uLCBjb2xvcikge1xuICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdCh0aXRsZSwgaWNvbiwgY29sb3IpO1xuICAgIHByb2plY3RzTGlzdC5wdXNoKG5ld1Byb2plY3QpO1xuICAgIGRvbS5yZW5kZXJQcm9qZWN0cygpO1xuICAgIGRvbS5jaGFuZ2VMaW5rKHByb2plY3RzTGlzdC5sZW5ndGggLSAxKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVkaXRQcm9qZWN0KGluZGV4LCB0aXRsZSwgaWNvbiwgY29sb3IpIHtcbiAgICBwcm9qZWN0c0xpc3RbaW5kZXhdLnRpdGxlID0gdGl0bGU7XG4gICAgcHJvamVjdHNMaXN0W2luZGV4XS5pY29uID0gaWNvbjtcbiAgICBwcm9qZWN0c0xpc3RbaW5kZXhdLmNvbG9yID0gY29sb3I7XG4gICAgZG9tLnJlbmRlclByb2plY3RzKCk7XG4gICAgZG9tLmNoYW5nZUxpbmsoaW5kZXgpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlUHJvamVjdChpbmRleCkge1xuICAgIHByb2plY3RzTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGRvbS5oaWRlRWxlbWVudChkb20ubW9kYWxzKTtcbiAgICBkb20ucmVuZGVyUHJvamVjdHMoKTtcbiAgICBkb20uY2hhbmdlTGluaygnaW5ib3gnKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcHJvamVjdHNMaXN0LFxuICAgIGNyZWF0ZVByb2plY3QsXG4gICAgZWRpdFByb2plY3QsXG4gICAgcmVtb3ZlUHJvamVjdCxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHByb2plY3RzO1xuIiwiaW1wb3J0IHByb2plY3RzIGZyb20gJy4vcHJvamVjdHMnO1xuaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5cbmNvbnN0IHRhc2tzID0gKCgpID0+IHtcbiAgY2xhc3MgVGFzayB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsIHByaW9yaXR5LCBzY2hlZHVsZSkge1xuICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgdGhpcy5zY2hlZHVsZSA9IHNjaGVkdWxlO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlVGFzayhwcm9qZWN0SW5kZXgsIHRpdGxlLCBwcmlvcml0eSA9IDAsIHNjaGVkdWxlID0gMCwgbGluayA9IHByb2plY3RJbmRleCkge1xuICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayh0aXRsZSwgcHJpb3JpdHksIHNjaGVkdWxlKTtcbiAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrcy5wdXNoKG5ld1Rhc2spO1xuICAgIGRvbS5yZW5kZXJUYXNrcyhsaW5rKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZVRhc2socHJvamVjdEluZGV4LCB0YXNrSW5kZXgsIGxpbmsgPSBwcm9qZWN0SW5kZXgpIHtcbiAgICBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5kb25lKSB7XG4gICAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLmRvbmUgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5kb25lID0gdHJ1ZTtcbiAgICB9XG4gICAgZG9tLnJlbmRlclRhc2tzKGxpbmspO1xuICB9XG5cbiAgZnVuY3Rpb24gZWRpdFRhc2socHJvamVjdEluZGV4LCB0YXNrSW5kZXgsIHRpdGxlLCBwcmlvcml0eSwgc2NoZWR1bGUsIGxpbmsgPSBwcm9qZWN0SW5kZXgpIHtcbiAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLnRpdGxlID0gdGl0bGU7XG4gICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0uc2NoZWR1bGUgPSBzY2hlZHVsZTtcbiAgICBkb20ucmVuZGVyVGFza3MobGluayk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVUYXNrKHByb2plY3RJbmRleCwgdGFza0luZGV4LCBsaW5rID0gcHJvamVjdEluZGV4KSB7XG4gICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3Muc3BsaWNlKHRhc2tJbmRleCwgMSk7XG4gICAgZG9tLmhpZGVFbGVtZW50KGRvbS5tb2RhbHMpO1xuICAgIGRvbS5yZW5kZXJUYXNrcyhsaW5rKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY3JlYXRlVGFzayxcbiAgICB0b2dnbGVUYXNrLFxuICAgIGVkaXRUYXNrLFxuICAgIHJlbW92ZVRhc2ssXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCB0YXNrcztcbiIsImltcG9ydCBwcm9qZWN0cyBmcm9tICcuL3Byb2plY3RzJztcbmltcG9ydCB0YXNrcyBmcm9tICcuL3Rhc2tzJztcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuXG5jb25zdCB2YWxpZGF0aW9uID0gKCgpID0+IHtcbiAgZnVuY3Rpb24gYWRkUHJvamVjdChldmVudCkge1xuICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmZvcm1zWydwcm9qZWN0LWZvcm0nXVsncHJvamVjdC10aXRsZSddLnZhbHVlO1xuICAgIGNvbnN0IHByb2plY3RJY29uID0gZG9jdW1lbnQuZm9ybXNbJ3Byb2plY3QtZm9ybSddWydwcm9qZWN0LWljb24nXS52YWx1ZTtcbiAgICBjb25zdCBwcm9qZWN0Q29sb3IgPSBkb2N1bWVudC5mb3Jtc1sncHJvamVjdC1mb3JtJ11bJ3Byb2plY3QtY29sb3InXS52YWx1ZTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAocHJvamVjdFRpdGxlICE9PSAnJykge1xuICAgICAgcHJvamVjdHMuY3JlYXRlUHJvamVjdChwcm9qZWN0VGl0bGUsIHByb2plY3RJY29uLCBwcm9qZWN0Q29sb3IpO1xuICAgICAgZG9tLmhpZGVFbGVtZW50KGRvbS5mb3JtUHJvamVjdFRpdGxlRXJyb3IpO1xuICAgICAgZG9tLmhpZGVFbGVtZW50KGRvbS5tb2RhbHMpO1xuICAgIH0gZWxzZSBpZiAocHJvamVjdFRpdGxlID09PSAnJykge1xuICAgICAgZG9tLnNob3dFbGVtZW50KGRvbS5mb3JtUHJvamVjdFRpdGxlRXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGVkaXRQcm9qZWN0KGV2ZW50LCBpbmRleCkge1xuICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmZvcm1zWydwcm9qZWN0LWZvcm0nXVsncHJvamVjdC10aXRsZSddLnZhbHVlO1xuICAgIGNvbnN0IHByb2plY3RJY29uID0gZG9jdW1lbnQuZm9ybXNbJ3Byb2plY3QtZm9ybSddWydwcm9qZWN0LWljb24nXS52YWx1ZTtcbiAgICBjb25zdCBwcm9qZWN0Q29sb3IgPSBkb2N1bWVudC5mb3Jtc1sncHJvamVjdC1mb3JtJ11bJ3Byb2plY3QtY29sb3InXS52YWx1ZTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAocHJvamVjdFRpdGxlICE9PSAnJykge1xuICAgICAgcHJvamVjdHMuZWRpdFByb2plY3QoaW5kZXgsIHByb2plY3RUaXRsZSwgcHJvamVjdEljb24sIHByb2plY3RDb2xvcik7XG4gICAgICBkb20uaGlkZUVsZW1lbnQoZG9tLmZvcm1Qcm9qZWN0VGl0bGVFcnJvcik7XG4gICAgICBkb20uaGlkZUVsZW1lbnQoZG9tLm1vZGFscyk7XG4gICAgfSBlbHNlIGlmIChwcm9qZWN0VGl0bGUgPT09ICcnKSB7XG4gICAgICBkb20uc2hvd0VsZW1lbnQoZG9tLmZvcm1Qcm9qZWN0VGl0bGVFcnJvcik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkVGFzayhldmVudCwgcHJvamVjdEluZGV4KSB7XG4gICAgY29uc3QgdGFza1RpdGxlID0gZG9jdW1lbnQuZm9ybXNbJ3Rhc2stZm9ybSddWyd0YXNrLXRpdGxlJ10udmFsdWU7XG4gICAgY29uc3QgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQuZm9ybXNbJ3Rhc2stZm9ybSddWyd0YXNrLXByaW9yaXR5J10udmFsdWU7XG4gICAgY29uc3QgdGFza1NjaGVkdWxlID0gZG9jdW1lbnQuZm9ybXNbJ3Rhc2stZm9ybSddWyd0YXNrLXNjaGVkdWxlJ10udmFsdWU7XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKHRhc2tUaXRsZSAhPT0gJycpIHtcbiAgICAgIHRhc2tzLmNyZWF0ZVRhc2socHJvamVjdEluZGV4LCB0YXNrVGl0bGUsIHRhc2tQcmlvcml0eSwgdGFza1NjaGVkdWxlKTtcbiAgICAgIGRvbS5oaWRlRWxlbWVudChkb20uZm9ybVRhc2tUaXRsZUVycm9yKTtcbiAgICAgIGRvbS5oaWRlRWxlbWVudChkb20ubW9kYWxzKTtcbiAgICB9IGVsc2UgaWYgKHRhc2tUaXRsZSA9PT0gJycpIHtcbiAgICAgIGRvbS5zaG93RWxlbWVudChkb20uZm9ybVRhc2tUaXRsZUVycm9yKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0VGFzayhldmVudCwgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgsIGxpbmspIHtcbiAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5mb3Jtc1sndGFzay1mb3JtJ11bJ3Rhc2stdGl0bGUnXS52YWx1ZTtcbiAgICBjb25zdCB0YXNrUHJpb3JpdHkgPSBkb2N1bWVudC5mb3Jtc1sndGFzay1mb3JtJ11bJ3Rhc2stcHJpb3JpdHknXS52YWx1ZTtcbiAgICBjb25zdCB0YXNrU2NoZWR1bGUgPSBkb2N1bWVudC5mb3Jtc1sndGFzay1mb3JtJ11bJ3Rhc2stc2NoZWR1bGUnXS52YWx1ZTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAodGFza1RpdGxlICE9PSAnJykge1xuICAgICAgdGFza3MuZWRpdFRhc2socHJvamVjdEluZGV4LCB0YXNrSW5kZXgsIHRhc2tUaXRsZSwgdGFza1ByaW9yaXR5LCB0YXNrU2NoZWR1bGUsIGxpbmspO1xuICAgICAgZG9tLmhpZGVFbGVtZW50KGRvbS5mb3JtVGFza1RpdGxlRXJyb3IpO1xuICAgICAgZG9tLmhpZGVFbGVtZW50KGRvbS5tb2RhbHMpO1xuICAgIH0gZWxzZSBpZiAodGFza1RpdGxlID09PSAnJykge1xuICAgICAgZG9tLnNob3dFbGVtZW50KGRvbS5mb3JtclRhc2tUaXRsZUVycm9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGFkZFByb2plY3QsXG4gICAgZWRpdFByb2plY3QsXG4gICAgYWRkVGFzayxcbiAgICBlZGl0VGFzayxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRpb247XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuaW1wb3J0IGhhbmRsZXJzIGZyb20gJy4vaGFuZGxlcnMnO1xuXG5kb20ucmVzcG9uc2l2ZVNpZGViYXIoKTtcbmRvbS5yZW5kZXJQcm9qZWN0cygpO1xuZG9tLmNoYW5nZUxpbmsoJ2luYm94Jyk7XG5cbmhhbmRsZXJzLnJlc2l6ZUhhbmRsZXIoKTtcbmhhbmRsZXJzLmNsaWNrSGFuZGxlcigpO1xuaGFuZGxlcnMua2V5Ym9hcmRIYW5kbGVyKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=