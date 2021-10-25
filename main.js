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
      const projectTitle = document.createElement('p');
      projectTitle.classList.add('sidebar-project');
      projectTitle.innerText = _projects__WEBPACK_IMPORTED_MODULE_0__["default"].projectsList[i].title;
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
    if (link === undefined) {
      _dom__WEBPACK_IMPORTED_MODULE_0__["default"].changeLink(index);
    } else {
      _dom__WEBPACK_IMPORTED_MODULE_0__["default"].changeLink(link);
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QywrREFBc0I7QUFDNUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGlFQUFlLFVBQVUsRUFBQzs7Ozs7OztVQzVGMUI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOd0I7QUFDVTs7QUFFbEMsOERBQXFCO0FBQ3JCLDJEQUFrQjtBQUNsQix1REFBYzs7QUFFZCwrREFBc0I7QUFDdEIsOERBQXFCO0FBQ3JCLGlFQUF3QiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Rhc2tzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJvamVjdHMgZnJvbSAnLi9wcm9qZWN0cyc7XG5cbmNvbnN0IGRvbSA9ICgoKSA9PiB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpO1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuICBjb25zdCBwcm9qZWN0c0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhci1wcm9qZWN0cy1saXN0Jyk7XG4gIGNvbnN0IHRhc2tzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWl0ZW0tbGlzdCcpO1xuICBjb25zdCBwcm9qZWN0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1tb2RhbCcpO1xuICBjb25zdCB0YXNrTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1tb2RhbCcpO1xuICBjb25zdCBjb25maXJtTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29uZmlybS1tb2RhbCcpO1xuICBjb25zdCBtb2RhbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubW9kYWwnKTtcbiAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1mb3JtJyk7XG4gIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZm9ybScpO1xuICBjb25zdCBmb3JtUHJvamVjdFRpdGxlRXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC10aXRsZS1lcnJvcicpO1xuICBjb25zdCBmb3JtVGFza1RpdGxlRXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay10aXRsZS1lcnJvcicpO1xuICBjb25zdCBmb3JtVGFza1Byb2plY3RFcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLXByb2plY3QtZXJyb3InKTtcblxuICBmdW5jdGlvbiByZXNwb25zaXZlU2lkZWJhcigpIHtcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPD0gOTYwKSB7XG4gICAgICBzaWRlYmFyLmNsYXNzTGlzdC5yZW1vdmUoJ3NpZGViYXItc2hvdycpO1xuICAgICAgc2lkZWJhci5jbGFzc0xpc3QuYWRkKCdzaWRlYmFyLWhpZGUnKTtcbiAgICAgIG1haW4uY2xhc3NMaXN0LmFkZCgnbWFpbi1tb2JpbGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdzaWRlYmFyLWhpZGUnKTtcbiAgICAgIHNpZGViYXIuY2xhc3NMaXN0LmFkZCgnc2lkZWJhci1zaG93Jyk7XG4gICAgICBtYWluLmNsYXNzTGlzdC5yZW1vdmUoJ21haW4tbW9iaWxlJyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlU2lkZWJhcigpIHtcbiAgICBpZiAoIXNpZGViYXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaWRlYmFyLXNob3cnKSkge1xuICAgICAgc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdzaWRlYmFyLWhpZGUnKTtcbiAgICAgIHNpZGViYXIuY2xhc3NMaXN0LmFkZCgnc2lkZWJhci1zaG93Jyk7XG4gICAgfSBlbHNlIGlmIChzaWRlYmFyLmNsYXNzTGlzdC5jb250YWlucygnc2lkZWJhci1zaG93JykpIHtcbiAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnc2lkZWJhci1zaG93Jyk7XG4gICAgICBzaWRlYmFyLmNsYXNzTGlzdC5hZGQoJ3NpZGViYXItaGlkZScpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3dQcm9qZWN0TW9kYWwobW9kYWwsIGluZGV4ID0gZmFsc2UpIHtcbiAgICBjb25zdCBtb2RhbEhlYWRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1tb2RhbC10aXRsZScpO1xuICAgIGNvbnN0IG1vZGFsU3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtYnV0dG9uJyk7XG5cbiAgICBwcm9qZWN0Rm9ybS5yZXNldCgpO1xuICAgIGRvbS5oaWRlRWxlbWVudChkb20uZm9ybVByb2plY3RUaXRsZUVycm9yKTtcblxuICAgIHByb2plY3RNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgcHJvamVjdE1vZGFsLmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXknKTtcblxuICAgIGlmIChtb2RhbCA9PT0gJ2FkZFByb2plY3QnKSB7XG4gICAgICBtb2RhbEhlYWRpbmcudGV4dENvbnRlbnQgPSAnTmV3IHByb2plY3QnO1xuICAgICAgbW9kYWxTdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSAnQWRkJztcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2VkaXQtcHJvamVjdCcpO1xuICAgICAgbW9kYWxTdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnYWRkLXByb2plY3QnKTtcbiAgICB9IGVsc2UgaWYgKG1vZGFsID09PSAnZWRpdFByb2plY3QnKSB7XG4gICAgICBjb25zdCBjdXJyZW50UHJvamVjdFRpdGxlID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2luZGV4XS50aXRsZTtcbiAgICAgIGNvbnN0IGN1cnJlbnRQcm9qZWN0SWNvbiA9IHByb2plY3RzLnByb2plY3RzTGlzdFtpbmRleF0uaWNvbjtcbiAgICAgIGNvbnN0IGN1cnJlbnRQcm9qZWN0Q29sb3IgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaW5kZXhdLmNvbG9yO1xuXG4gICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybS1wcm9qZWN0LXRpdGxlJyk7XG4gICAgICBjb25zdCBwcm9qZWN0SWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W3ZhbHVlPSR7Y3VycmVudFByb2plY3RJY29ufV1gKTtcbiAgICAgIGNvbnN0IHByb2plY3RDb2xvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W3ZhbHVlPSR7Y3VycmVudFByb2plY3RDb2xvcn1dYCk7XG5cbiAgICAgIHByb2plY3RUaXRsZS52YWx1ZSA9IGN1cnJlbnRQcm9qZWN0VGl0bGU7XG4gICAgICBwcm9qZWN0SWNvbi5jaGVja2VkID0gdHJ1ZTtcbiAgICAgIHByb2plY3RDb2xvci5jaGVja2VkID0gdHJ1ZTtcblxuICAgICAgbW9kYWxIZWFkaW5nLnRleHRDb250ZW50ID0gJ0VkaXQgcHJvamVjdCc7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdFZGl0JztcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2FkZC1wcm9qZWN0Jyk7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdlZGl0LXByb2plY3QnKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93VGFza01vZGFsKG1vZGFsLCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCA9IGZhbHNlKSB7XG4gICAgY29uc3QgbW9kYWxIZWFkaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stbW9kYWwtdGl0bGUnKTtcbiAgICBjb25zdCBzZWxlY3RQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlbGVjdC1wcm9qZWN0Jyk7XG4gICAgY29uc3QgbW9kYWxTdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1idXR0b24nKTtcblxuICAgIHRhc2tGb3JtLnJlc2V0KCk7XG4gICAgZG9tLmhpZGVFbGVtZW50KGRvbS5mb3JtVGFza1RpdGxlRXJyb3IpO1xuICAgIGRvbS5oaWRlRWxlbWVudChkb20uZm9ybVRhc2tQcm9qZWN0RXJyb3IpO1xuXG4gICAgdGFza01vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICB0YXNrTW9kYWwuY2xhc3NMaXN0LmFkZCgnZGlzcGxheScpO1xuXG4gICAgaWYgKG1vZGFsID09PSAnYWRkVGFzaycpIHtcbiAgICAgIG1vZGFsSGVhZGluZy50ZXh0Q29udGVudCA9ICdOZXcgdGFzayc7XG5cbiAgICAgIHNlbGVjdFByb2plY3QuaW5uZXJUZXh0ID0gJyc7XG4gICAgICBpZiAoTnVtYmVyLmlzTmFOKHByb2plY3RJbmRleCkpIHtcbiAgICAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICBsYWJlbC5pZCA9ICdmb3JtLWxhYmVsJztcbiAgICAgICAgbGFiZWwuaW5uZXJUZXh0ID0gJ1Byb2plY3QgKic7XG4gICAgICAgIGxhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgJ2Zvcm0tdGFzay1wcm9qZWN0Jyk7XG4gICAgICAgIHNlbGVjdFByb2plY3QuYXBwZW5kQ2hpbGQobGFiZWwpO1xuXG4gICAgICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuICAgICAgICBzZWxlY3QuaWQgPSAnZm9ybS10YXNrLXByb2plY3QnO1xuICAgICAgICBzZWxlY3Quc2V0QXR0cmlidXRlKCduYW1lJywgJ3Rhc2stcHJvamVjdCcpO1xuICAgICAgICBzZWxlY3RQcm9qZWN0LmFwcGVuZENoaWxkKHNlbGVjdCk7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJycpO1xuICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICBvcHRpb24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICBvcHRpb24uaW5uZXJUZXh0ID0gJ1NlbGVjdCBwcm9qZWN0JztcblxuICAgICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5wcm9qZWN0c0xpc3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBuZXdPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgICBuZXdPcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsIGkpO1xuICAgICAgICAgIG5ld09wdGlvbi5pbm5lclRleHQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGl0bGU7XG4gICAgICAgICAgc2VsZWN0LmFwcGVuZENoaWxkKG5ld09wdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbW9kYWxTdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSAnQWRkJztcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2VkaXQtdGFzaycpO1xuICAgICAgbW9kYWxTdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnYWRkLXRhc2snKTtcbiAgICB9IGVsc2UgaWYgKG1vZGFsID09PSAnZWRpdFRhc2snKSB7XG4gICAgICBjb25zdCBjdXJyZW50VGFza1RpdGxlID0gcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS50aXRsZTtcbiAgICAgIGNvbnN0IGN1cnJlbnRUYXNrUHJpb3JpdHkgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLnByaW9yaXR5O1xuICAgICAgY29uc3QgY3VycmVudFRhc2tTY2hlZHVsZSA9IHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0uc2NoZWR1bGU7XG5cbiAgICAgIGNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtLXRhc2stdGl0bGUnKTtcbiAgICAgIGNvbnN0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtLXRhc2stcHJpb3JpdHknKTtcbiAgICAgIGNvbnN0IHRhc2tTY2hlZHVsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtLXRhc2stc2NoZWR1bGUnKTtcblxuICAgICAgdGFza1RpdGxlLnZhbHVlID0gY3VycmVudFRhc2tUaXRsZTtcbiAgICAgIHRhc2tQcmlvcml0eS52YWx1ZSA9IGN1cnJlbnRUYXNrUHJpb3JpdHk7XG4gICAgICB0YXNrU2NoZWR1bGUudmFsdWUgPSBjdXJyZW50VGFza1NjaGVkdWxlO1xuXG4gICAgICBtb2RhbEhlYWRpbmcudGV4dENvbnRlbnQgPSAnRWRpdCBwcm9qZWN0JztcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gJ0VkaXQnO1xuICAgICAgbW9kYWxTdWJtaXRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnYWRkLXRhc2snKTtcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2VkaXQtdGFzaycpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3dDb25maXJtTW9kYWwobW9kYWwsIHByb2plY3RJbmRleCwgdGFza0luZGV4KSB7XG4gICAgY29uc3QgbW9kYWxIZWFkaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmZpcm0tbW9kYWwtdGl0bGUnKTtcbiAgICBjb25zdCBtb2RhbENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZmlybS1tb2RhbC1jb250ZW50Jyk7XG4gICAgY29uc3QgbW9kYWxTdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29uZmlybS1idXR0b24nKTtcbiAgICBjb25zdCBtb2RhbENvbnRlbnRQcmVmaXggPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnWW91IGFyZSBnb2luZyB0byByZW1vdmUgJyk7XG4gICAgY29uc3QgbW9kYWxDb250ZW50UG9zdGZpeCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcuIFRoaXMgYWN0aW9uIGNhbm5vdCBiZSB1bmRvbmUuJyk7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICBjb25maXJtTW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIGNvbmZpcm1Nb2RhbC5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Jyk7XG5cbiAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCdjb25maXJtLW1vZGFsLXRpdGxlJyk7XG5cbiAgICBtb2RhbENvbnRlbnQudGV4dENvbnRlbnQgPSAnJztcblxuICAgIGlmIChtb2RhbCA9PT0gJ3JlbW92ZVByb2plY3QnKSB7XG4gICAgICBtb2RhbEhlYWRpbmcudGV4dENvbnRlbnQgPSAnUmVtb3ZlIHByb2plY3QnO1xuICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50aXRsZTtcbiAgICAgIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChtb2RhbENvbnRlbnRQcmVmaXgpO1xuICAgICAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChtb2RhbENvbnRlbnRQb3N0Zml4KTtcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ3JlbW92ZS10YXNrJyk7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdyZW1vdmUtcHJvamVjdCcpO1xuICAgIH0gZWxzZSBpZiAobW9kYWwgPT09ICdyZW1vdmVUYXNrJykge1xuICAgICAgbW9kYWxIZWFkaW5nLnRleHRDb250ZW50ID0gJ1JlbW92ZSB0YXNrJztcbiAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS50aXRsZTtcbiAgICAgIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChtb2RhbENvbnRlbnRQcmVmaXgpO1xuICAgICAgbW9kYWxDb250ZW50LmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgIG1vZGFsQ29udGVudC5hcHBlbmRDaGlsZChtb2RhbENvbnRlbnRQb3N0Zml4KTtcbiAgICAgIG1vZGFsU3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ3JlbW92ZS1wcm9qZWN0Jyk7XG4gICAgICBtb2RhbFN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdyZW1vdmUtdGFzaycpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3dFbGVtZW50KGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXknKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGVFbGVtZW50KG1vZGFsKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaXNQcm90b3R5cGVPZi5jYWxsKE5vZGVMaXN0LnByb3RvdHlwZSwgbW9kYWwpKSB7XG4gICAgICBtb2RhbC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheScpO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5Jyk7XG4gICAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyUHJvamVjdHMoKSB7XG4gICAgLy8gQ3JlYXRlIGxpbmtcbiAgICBwcm9qZWN0c0xpc3QudGV4dENvbnRlbnQgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzLnByb2plY3RzTGlzdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgcHJvamVjdExpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICBwcm9qZWN0TGluay5jbGFzc0xpc3QuYWRkKCdzaWRlYmFyLXByb2plY3QnKTtcbiAgICAgIHByb2plY3RMaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICcjJyk7XG4gICAgICBwcm9qZWN0TGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBpKTtcbiAgICAgIHByb2plY3RzTGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0TGluayk7XG4gICAgICAvLyBDcmVhdGUgaWNvblxuICAgICAgY29uc3QgcHJvamVjdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICBwcm9qZWN0SWNvbi5jbGFzc0xpc3QuYWRkKCdmYXInLCBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0uaWNvbiwgJ2ZhLWZ3JywgcHJvamVjdHMucHJvamVjdHNMaXN0W2ldLmNvbG9yLCAnc2lkZWJhci1wcm9qZWN0JywgJ3NpZGViYXItcHJvamVjdC1pY29uJyk7XG4gICAgICBwcm9qZWN0TGluay5hcHBlbmRDaGlsZChwcm9qZWN0SWNvbik7XG4gICAgICAvLyBDcmVhdGUgdGl0bGVcbiAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIHByb2plY3RUaXRsZS5jbGFzc0xpc3QuYWRkKCdzaWRlYmFyLXByb2plY3QnKTtcbiAgICAgIHByb2plY3RUaXRsZS5pbm5lclRleHQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbaV0udGl0bGU7XG4gICAgICBwcm9qZWN0TGluay5hcHBlbmRDaGlsZChwcm9qZWN0VGl0bGUpO1xuICAgICAgLy8gQ3JlYXRlIHJlbW92ZSBpY29uXG4gICAgICBjb25zdCBwcm9qZWN0UmVtb3ZlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgIHByb2plY3RSZW1vdmVJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhcicsICdmYS10cmFzaCcsICdyZW1vdmUtcHJvamVjdC1tb2RhbCcpO1xuICAgICAgcHJvamVjdExpbmsuYXBwZW5kQ2hpbGQocHJvamVjdFJlbW92ZUljb24pO1xuICAgICAgLy8gQ3JlYXRlIGVkaXQgaWNvblxuICAgICAgY29uc3QgcHJvamVjdEVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgcHJvamVjdEVkaXRJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhcicsICdmYS1lZGl0JywgJ2VkaXQtcHJvamVjdC1tb2RhbCcpO1xuICAgICAgcHJvamVjdExpbmsuYXBwZW5kQ2hpbGQocHJvamVjdEVkaXRJY29uKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3RMaW5rKHByb2plY3RJbmRleCkge1xuICAgIGNvbnN0IGFsbExpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYS5zaWRlYmFyLXByb2plY3QsIGEuc2lkZWJhci1saW5rJyk7XG4gICAgY29uc3QgaW5ib3hMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmstaW5ib3gnKTtcbiAgICBjb25zdCB0b2RheUxpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluay10b2RheScpO1xuICAgIGNvbnN0IHdlZWtMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmstd2VlaycpO1xuICAgIGNvbnN0IGltcG9ydGFudExpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluay1pbXBvcnRhbnQnKTtcbiAgICBjb25zdCBjb21wbGV0ZWRMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmstY29tcGxldGVkJyk7XG4gICAgY29uc3QgcHJvamVjdExpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYS5zaWRlYmFyLXByb2plY3QnKTtcbiAgICBhbGxMaW5rcy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIH0pO1xuICAgIGlmICh0eXBlb2YgcHJvamVjdEluZGV4ID09PSAnbnVtYmVyJykge1xuICAgICAgcHJvamVjdExpbmtzW3Byb2plY3RJbmRleF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfSBlbHNlIGlmIChwcm9qZWN0SW5kZXggPT09ICdpbmJveCcpIHtcbiAgICAgIGluYm94TGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9IGVsc2UgaWYgKHByb2plY3RJbmRleCA9PT0gJ3RvZGF5Jykge1xuICAgICAgdG9kYXlMaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH0gZWxzZSBpZiAocHJvamVjdEluZGV4ID09PSAnd2VlaycpIHtcbiAgICAgIHdlZWtMaW5rLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH0gZWxzZSBpZiAocHJvamVjdEluZGV4ID09PSAnaW1wb3J0YW50Jykge1xuICAgICAgaW1wb3J0YW50TGluay5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9IGVsc2UgaWYgKHByb2plY3RJbmRleCA9PT0gJ2NvbXBsZXRlZCcpIHtcbiAgICAgIGNvbXBsZXRlZExpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVySGVhZGVyKHByb2plY3RJbmRleCkge1xuICAgIGNvbnN0IGhlYWRlclRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8taGVhZGVyLXRpdGxlJyk7XG5cbiAgICBpZiAodHlwZW9mIHByb2plY3RJbmRleCA9PT0gJ251bWJlcicpIHtcbiAgICAgIGhlYWRlclRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGl0bGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWRlclRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdEluZGV4WzBdLnRvVXBwZXJDYXNlKCkgKyBwcm9qZWN0SW5kZXguc3Vic3RyaW5nKDEpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlclRhc2tzKHByb2plY3RJbmRleCkge1xuICAgIGxldCBpbmRleFN0YXJ0O1xuICAgIGxldCBpbmRleEVuZDtcbiAgICB0YXNrc0xpc3QudGV4dENvbnRlbnQgPSAnJztcbiAgICBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0Lmxlbmd0aCA+PSAxKSB7XG4gICAgICBpZiAodHlwZW9mIHByb2plY3RJbmRleCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgaW5kZXhTdGFydCA9IHByb2plY3RJbmRleDtcbiAgICAgICAgaW5kZXhFbmQgPSBwcm9qZWN0SW5kZXggKyAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXhTdGFydCA9IDA7XG4gICAgICAgIGluZGV4RW5kID0gcHJvamVjdHMucHJvamVjdHNMaXN0Lmxlbmd0aDtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGogPSBpbmRleFN0YXJ0OyBqIDwgaW5kZXhFbmQ7IGogKz0gMSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzLnByb2plY3RzTGlzdFtqXS50YXNrcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGlmIChwcm9qZWN0SW5kZXggPT09ICd0b2RheScgJiYgcHJvamVjdHMucHJvamVjdHNMaXN0W2pdLnRhc2tzW2ldLnNjaGVkdWxlID09PSAnJykge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSBlbHNlIGlmIChwcm9qZWN0SW5kZXggPT09ICd3ZWVrJyAmJiBwcm9qZWN0cy5wcm9qZWN0c0xpc3Rbal0udGFza3NbaV0uc2NoZWR1bGUgPT09ICcnKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHByb2plY3RJbmRleCA9PT0gJ2ltcG9ydGFudCcgJiYgcHJvamVjdHMucHJvamVjdHNMaXN0W2pdLnRhc2tzW2ldLnByaW9yaXR5ICE9PSAnaGlnaCcpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAocHJvamVjdEluZGV4ID09PSAnY29tcGxldGVkJyAmJiBwcm9qZWN0cy5wcm9qZWN0c0xpc3Rbal0udGFza3NbaV0uZG9uZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHRvZG9JdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgdG9kb0l0ZW0uY2xhc3NMaXN0LmFkZCgndG9kby1pdGVtJywgJ3RvZ2dsZS10YXNrJyk7XG4gICAgICAgICAgdG9kb0l0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QtaW5kZXgnLCBqKTtcbiAgICAgICAgICB0b2RvSXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFzay1pbmRleCcsIGkpO1xuICAgICAgICAgIHRhc2tzTGlzdC5hcHBlbmRDaGlsZCh0b2RvSXRlbSk7XG4gICAgICAgICAgLy8gQ3JlYXRlIGljb25cbiAgICAgICAgICBjb25zdCB0YXNrSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgICB0YXNrSWNvbi5jbGFzc0xpc3QuYWRkKCdmYXInLCAnZmEtZncnLCAndG9nZ2xlLXRhc2snKTtcbiAgICAgICAgICBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W2pdLnRhc2tzW2ldLnByaW9yaXR5ID09PSAnbG93Jykge1xuICAgICAgICAgICAgdGFza0ljb24uY2xhc3NMaXN0LmFkZCgncHJvamVjdC1ncmVlbicpO1xuICAgICAgICAgIH0gZWxzZSBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W2pdLnRhc2tzW2ldLnByaW9yaXR5ID09PSAnbWVkaXVtJykge1xuICAgICAgICAgICAgdGFza0ljb24uY2xhc3NMaXN0LmFkZCgncHJvamVjdC15ZWxsb3cnKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHByb2plY3RzLnByb2plY3RzTGlzdFtqXS50YXNrc1tpXS5wcmlvcml0eSA9PT0gJ2hpZ2gnKSB7XG4gICAgICAgICAgICB0YXNrSWNvbi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LXJlZCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YXNrSWNvbi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LWdyZXknKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdG9kb0l0ZW0uYXBwZW5kQ2hpbGQodGFza0ljb24pO1xuICAgICAgICAgIC8vIENyZWF0ZSB0aXRsZVxuICAgICAgICAgIGNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICB0YXNrVGl0bGUuY2xhc3NMaXN0LmFkZCgndG9kby1pdGVtLXRpdGxlJywgJ3RvZ2dsZS10YXNrJyk7XG4gICAgICAgICAgdGFza1RpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2pdLnRhc2tzW2ldLnRpdGxlO1xuICAgICAgICAgIGlmIChwcm9qZWN0cy5wcm9qZWN0c0xpc3Rbal0udGFza3NbaV0uZG9uZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGFza0ljb24uY2xhc3NMaXN0LmFkZCgnZmEtY2hlY2stY2lyY2xlJyk7XG4gICAgICAgICAgICB0YXNrVGl0bGUuY2xhc3NMaXN0LmFkZCgnZG9uZScpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YXNrSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1jaXJjbGUnKTtcbiAgICAgICAgICAgIHRhc2tUaXRsZS5jbGFzc0xpc3QucmVtb3ZlKCdkb25lJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKHRhc2tUaXRsZSk7XG4gICAgICAgICAgLy8gQ3JlYXRlIGRhdGVcbiAgICAgICAgICBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W2pdLnRhc2tzW2ldLnNjaGVkdWxlICE9PSAnJykge1xuICAgICAgICAgICAgY29uc3QgdGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICB0YXNrRGF0ZS5jbGFzc0xpc3QuYWRkKCd0b2RvLWl0ZW0tZGF0ZScsICd0b2RvLWl0ZW0tcGlsbCcsICd0b2dnbGUtdGFzaycpO1xuICAgICAgICAgICAgdGFza0RhdGUudGV4dENvbnRlbnQgPSBwcm9qZWN0cy5wcm9qZWN0c0xpc3Rbal0udGFza3NbaV0uc2NoZWR1bGU7XG4gICAgICAgICAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZCh0YXNrRGF0ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIENyZWF0ZSBwcm9qZWN0IG5hbWVcbiAgICAgICAgICBjb25zdCB0YXNrUHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICB0YXNrUHJvamVjdC5jbGFzc0xpc3QuYWRkKCd0b2RvLWl0ZW0tcGlsbCcsIGAke3Byb2plY3RzLnByb2plY3RzTGlzdFtqXS5jb2xvcn0tYmFja2dyb3VuZGAsICd0b2dnbGUtdGFzaycpO1xuICAgICAgICAgIHRhc2tQcm9qZWN0LnRleHRDb250ZW50ID0gcHJvamVjdHMucHJvamVjdHNMaXN0W2pdLnRpdGxlO1xuICAgICAgICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKHRhc2tQcm9qZWN0KTtcbiAgICAgICAgICAvLyBDcmVhdGUgZWRpdCBpY29uXG4gICAgICAgICAgY29uc3QgdGFza0VkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICAgIHRhc2tFZGl0SWNvbi5jbGFzc0xpc3QuYWRkKCdmYXInLCAnZmEtZWRpdCcsICdmYS1mdycsICdlZGl0LXRhc2stbW9kYWwnKTtcbiAgICAgICAgICB0b2RvSXRlbS5hcHBlbmRDaGlsZCh0YXNrRWRpdEljb24pO1xuICAgICAgICAgIC8vIENyZWF0ZSByZW1vdmUgaWNvblxuICAgICAgICAgIGNvbnN0IHRhc2tSZW1vdmVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICAgIHRhc2tSZW1vdmVJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhcicsICdmYS10cmFzaCcsICdmYS1mdycsICdyZW1vdmUtdGFzay1tb2RhbCcpO1xuICAgICAgICAgIHRvZG9JdGVtLmFwcGVuZENoaWxkKHRhc2tSZW1vdmVJY29uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gQWRkIHRhc2sgbGluZVxuICAgICAgY29uc3QgdGFza0FkZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdGFza0FkZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcsIHByb2plY3RJbmRleCk7XG4gICAgICB0YXNrQWRkLmNsYXNzTGlzdC5hZGQoJ3RvZG8taXRlbS1hZGQnLCAnYWRkLXRhc2stbW9kYWwnKTtcbiAgICAgIHRhc2tzTGlzdC5hcHBlbmRDaGlsZCh0YXNrQWRkKTtcbiAgICAgIGNvbnN0IHRhc2tBZGRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgdGFza0FkZEljb24uY2xhc3NMaXN0LmFkZCgnZmFyJywgJ2ZhLXBsdXMnLCAnZmEtZncnLCAnYWRkLXRhc2stbW9kYWwnKTtcbiAgICAgIHRhc2tBZGQuYXBwZW5kQ2hpbGQodGFza0FkZEljb24pO1xuICAgICAgY29uc3QgdGFza0FkZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgdGFza0FkZFRpdGxlLmNsYXNzTGlzdC5hZGQoJ3RvZG8taXRlbS10aXRsZScsICdhZGQtdGFzay1tb2RhbCcpO1xuICAgICAgdGFza0FkZFRpdGxlLnRleHRDb250ZW50ID0gJ0FkZCBuZXcgdGFzayc7XG4gICAgICB0YXNrQWRkLmFwcGVuZENoaWxkKHRhc2tBZGRUaXRsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE5vIHByb2plY3Qgd2FybmluZ1xuICAgICAgY29uc3QgdGFza0FkZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdGFza0FkZC5jbGFzc0xpc3QuYWRkKCd0b2RvLWl0ZW0tYWRkJywgJ2FkZC1wcm9qZWN0LW1vZGFsJyk7XG4gICAgICB0YXNrc0xpc3QuYXBwZW5kQ2hpbGQodGFza0FkZCk7XG4gICAgICBjb25zdCB0YXNrQWRkSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgIHRhc2tBZGRJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhcicsICdmYS1leGNsYW1hdGlvbi1jaXJjbGUnLCAnZmEtZncnLCAncHJvamVjdC1yZWQnLCAnYWRkLXByb2plY3QtbW9kYWwnKTtcbiAgICAgIHRhc2tBZGQuYXBwZW5kQ2hpbGQodGFza0FkZEljb24pO1xuICAgICAgY29uc3QgdGFza0FkZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgdGFza0FkZFRpdGxlLmNsYXNzTGlzdC5hZGQoJ3RvZG8taXRlbS10aXRsZScsICdhZGQtcHJvamVjdC1tb2RhbCcpO1xuICAgICAgdGFza0FkZFRpdGxlLnRleHRDb250ZW50ID0gJ1lvdSBkb25cXCd0IGhhdmUgYW55IHByb2plY3RzLCBjcmVhdGUgb25lLic7XG4gICAgICB0YXNrQWRkLmFwcGVuZENoaWxkKHRhc2tBZGRUaXRsZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hhbmdlTGluayhwcm9qZWN0SW5kZXgpIHtcbiAgICBzZWxlY3RMaW5rKHByb2plY3RJbmRleCk7XG4gICAgcmVuZGVySGVhZGVyKHByb2plY3RJbmRleCk7XG4gICAgcmVuZGVyVGFza3MocHJvamVjdEluZGV4KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYm9keSxcbiAgICBwcm9qZWN0TW9kYWwsXG4gICAgY29uZmlybU1vZGFsLFxuICAgIG1vZGFscyxcbiAgICBmb3JtUHJvamVjdFRpdGxlRXJyb3IsXG4gICAgZm9ybVRhc2tUaXRsZUVycm9yLFxuICAgIGZvcm1UYXNrUHJvamVjdEVycm9yLFxuICAgIHJlc3BvbnNpdmVTaWRlYmFyLFxuICAgIHRvZ2dsZVNpZGViYXIsXG4gICAgc2hvd1Byb2plY3RNb2RhbCxcbiAgICBzaG93VGFza01vZGFsLFxuICAgIHNob3dDb25maXJtTW9kYWwsXG4gICAgc2hvd0VsZW1lbnQsXG4gICAgaGlkZUVsZW1lbnQsXG4gICAgcmVuZGVyUHJvamVjdHMsXG4gICAgcmVuZGVyVGFza3MsXG4gICAgY2hhbmdlTGluayxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRvbTtcbiIsImltcG9ydCB2YWxpZGF0aW9uIGZyb20gJy4vdmFsaWRhdGlvbic7XG5pbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcbmltcG9ydCBwcm9qZWN0cyBmcm9tICcuL3Byb2plY3RzJztcbmltcG9ydCB0YXNrcyBmcm9tICcuL3Rhc2tzJztcblxuY29uc3QgaGFuZGxlcnMgPSAoKCkgPT4ge1xuICBmdW5jdGlvbiBjbGlja0hhbmRsZXIoKSB7XG4gICAgbGV0IHByb2plY3RJbmRleCA9IDA7XG4gICAgbGV0IHRhc2tJbmRleCA9IDA7XG4gICAgbGV0IGxpbmsgPSAnaW5ib3gnO1xuICAgIGRvbS5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIC8vIFRvZ2dsZSBzaWRlYmFyXG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2dnbGUtc2lkZWJhcicpKSB7XG4gICAgICAgIGRvbS50b2dnbGVTaWRlYmFyKCk7XG4gICAgICAvLyBOYXYgbGlua3NcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsaW5rLWluYm94JykpIHtcbiAgICAgICAgbGluayA9ICdpbmJveCc7XG4gICAgICAgIGRvbS5jaGFuZ2VMaW5rKCdpbmJveCcpO1xuICAgICAgLy8gTmF2IGxpbmtzXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbGluay10b2RheScpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdUb2RheScpO1xuICAgICAgICBsaW5rID0gJ3RvZGF5JztcbiAgICAgICAgZG9tLmNoYW5nZUxpbmsoJ3RvZGF5Jyk7XG4gICAgICAvLyBOYXYgbGlua3NcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsaW5rLXdlZWsnKSkge1xuICAgICAgICBjb25zb2xlLmxvZygnV2VlaycpO1xuICAgICAgICBsaW5rID0gJ3dlZWsnO1xuICAgICAgICBkb20uY2hhbmdlTGluaygnd2VlaycpO1xuICAgICAgLy8gTmF2IGxpbmtzXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbGluay1pbXBvcnRhbnQnKSkge1xuICAgICAgICBsaW5rID0gJ2ltcG9ydGFudCc7XG4gICAgICAgIGRvbS5jaGFuZ2VMaW5rKCdpbXBvcnRhbnQnKTtcbiAgICAgIC8vIE5hdiBsaW5rc1xuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2xpbmstY29tcGxldGVkJykpIHtcbiAgICAgICAgbGluayA9ICdjb21wbGV0ZWQnO1xuICAgICAgICBkb20uY2hhbmdlTGluaygnY29tcGxldGVkJyk7XG4gICAgICAvLyBQcm9qZWN0IGxpbmtzXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2lkZWJhci1wcm9qZWN0JykpIHtcbiAgICAgICAgcHJvamVjdEluZGV4ID0gcGFyc2VJbnQoKGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpKSA/IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpIDogZS50YXJnZXQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICBsaW5rID0gdW5kZWZpbmVkO1xuICAgICAgICBkb20uY2hhbmdlTGluayhwcm9qZWN0SW5kZXgpO1xuICAgICAgLy8gQWRkIHByb2plY3QgbW9kYWwgb3BlblxuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FkZC1wcm9qZWN0LW1vZGFsJykpIHtcbiAgICAgICAgbGluayA9IHVuZGVmaW5lZDtcbiAgICAgICAgZG9tLnNob3dQcm9qZWN0TW9kYWwoJ2FkZFByb2plY3QnKTtcbiAgICAgIC8vIEVkaXQgcHJvamVjdCBtb2RhbCBvcGVuXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1wcm9qZWN0LW1vZGFsJykpIHtcbiAgICAgICAgcHJvamVjdEluZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICBkb20uc2hvd1Byb2plY3RNb2RhbCgnZWRpdFByb2plY3QnLCBwcm9qZWN0SW5kZXgpO1xuICAgICAgLy8gUmVtb3ZlIHByb2plY3QgbW9kYWwgb3BlblxuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3JlbW92ZS1wcm9qZWN0LW1vZGFsJykpIHtcbiAgICAgICAgcHJvamVjdEluZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICBkb20uc2hvd0NvbmZpcm1Nb2RhbCgncmVtb3ZlUHJvamVjdCcsIHByb2plY3RJbmRleCk7XG4gICAgICAvLyBBZGQgdGFzayBtb2RhbCBvcGVuXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWRkLXRhc2stbW9kYWwnKSkge1xuICAgICAgICBwcm9qZWN0SW5kZXggPSBwYXJzZUludCgoZS50YXJnZXQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcpKSA/IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QtaW5kZXgnKSA6IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0LWluZGV4JyksIDEwKTtcbiAgICAgICAgZG9tLnNob3dUYXNrTW9kYWwoJ2FkZFRhc2snLCBwcm9qZWN0SW5kZXgpO1xuICAgICAgLy8gRWRpdCB0YXNrIG1vZGFsIG9wZW5cbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LXRhc2stbW9kYWwnKSkge1xuICAgICAgICB0YXNrSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4JyksIDEwKTtcbiAgICAgICAgZG9tLnNob3dUYXNrTW9kYWwoJ2VkaXRUYXNrJywgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgpO1xuICAgICAgLy8gUmVtb3ZlIHRhc2sgbW9kYWwgb3BlblxuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3JlbW92ZS10YXNrLW1vZGFsJykpIHtcbiAgICAgICAgcHJvamVjdEluZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcpLCAxMCk7XG4gICAgICAgIHRhc2tJbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhc2staW5kZXgnKSwgMTApO1xuICAgICAgICBkb20uc2hvd0NvbmZpcm1Nb2RhbCgncmVtb3ZlVGFzaycsIHByb2plY3RJbmRleCwgdGFza0luZGV4KTtcbiAgICAgIC8vIENsb3NlIGFsbCBtb2RhbHNcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjbG9zZScpIHx8IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbW9kYWwnKSkge1xuICAgICAgICBkb20uaGlkZUVsZW1lbnQoZG9tLm1vZGFscyk7XG4gICAgICAvLyBBZGQgcHJvamVjdFxuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FkZC1wcm9qZWN0JykpIHtcbiAgICAgICAgdmFsaWRhdGlvbi5hZGRQcm9qZWN0KGUpO1xuICAgICAgLy8gRWRpdCBwcm9qZWN0XG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1wcm9qZWN0JykpIHtcbiAgICAgICAgdmFsaWRhdGlvbi5lZGl0UHJvamVjdChlLCBwcm9qZWN0SW5kZXgsIGxpbmspO1xuICAgICAgLy8gUmVtb3ZlIHByb2plY3RcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdyZW1vdmUtcHJvamVjdCcpKSB7XG4gICAgICAgIHByb2plY3RzLnJlbW92ZVByb2plY3QocHJvamVjdEluZGV4KTtcbiAgICAgIC8vIEFkZCBUYXNrXG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWRkLXRhc2snKSkge1xuICAgICAgICB2YWxpZGF0aW9uLmFkZFRhc2soZSwgcHJvamVjdEluZGV4KTtcbiAgICAgIC8vIEVkaXQgVGFza1xuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtdGFzaycpKSB7XG4gICAgICAgIHZhbGlkYXRpb24uZWRpdFRhc2soZSwgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgsIGxpbmspO1xuICAgICAgLy8gUmVtb3ZlIHRhc2tcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdyZW1vdmUtdGFzaycpKSB7XG4gICAgICAgIHRhc2tzLnJlbW92ZVRhc2socHJvamVjdEluZGV4LCB0YXNrSW5kZXgsIGxpbmspO1xuICAgICAgLy8gVG9nZ2xlIHRhc2tcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2dnbGUtdGFzaycpKSB7XG4gICAgICAgIHByb2plY3RJbmRleCA9IHBhcnNlSW50KChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvamVjdC1pbmRleCcpKSA/IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0LWluZGV4JykgOiBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0LWluZGV4JyksIDEwKTtcbiAgICAgICAgdGFza0luZGV4ID0gcGFyc2VJbnQoKGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YXNrLWluZGV4JykpID8gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhc2staW5kZXgnKSA6IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhc2staW5kZXgnKSwgMTApO1xuICAgICAgICB0YXNrcy50b2dnbGVUYXNrKHByb2plY3RJbmRleCwgdGFza0luZGV4LCBsaW5rKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGtleWJvYXJkSGFuZGxlcigpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgZG9tLmhpZGVFbGVtZW50KGRvbS5tb2RhbHMpO1xuICAgICAgfVxuICAgICAgLy8gaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJyAmJiBtb2RhbC5zdHlsZS5kaXNwbGF5ID09PSAnYmxvY2snKSB7XG4gICAgICAvLyAgIHN1Ym1pdEJ1dHRvbi5jbGljaygpO1xuICAgICAgLy8gfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzaXplSGFuZGxlcigpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZG9tLnJlc3BvbnNpdmVTaWRlYmFyKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY2xpY2tIYW5kbGVyLFxuICAgIGtleWJvYXJkSGFuZGxlcixcbiAgICByZXNpemVIYW5kbGVyLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlcnM7XG4iLCJpbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcblxuY29uc3QgcHJvamVjdHMgPSAoKCkgPT4ge1xuICBsZXQgcHJvamVjdHNMaXN0ID0gW107XG5cbiAgLy8gTG9jYWwgc3RvcmFnZVxuICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykgPT09IG51bGwpIHtcbiAgICBwcm9qZWN0c0xpc3QgPSBbe1xuICAgICAgdGl0bGU6ICdEZW1vJywgaWNvbjogJ2ZhLWhvbWUnLCBjb2xvcjogJ3Byb2plY3QtZ3JlZW4nLCB0YXNrczogW10sXG4gICAgfV07XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgcHJvamVjdHNGcm9tU3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykpO1xuICAgIHByb2plY3RzTGlzdCA9IHByb2plY3RzRnJvbVN0b3JhZ2U7XG4gIH1cblxuICBjbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgaWNvbiwgY29sb3IpIHtcbiAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgIHRoaXMuaWNvbiA9IGljb247XG4gICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICB0aGlzLnRhc2tzID0gW107XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJvamVjdCh0aXRsZSwgaWNvbiwgY29sb3IpIHtcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QodGl0bGUsIGljb24sIGNvbG9yKTtcbiAgICBwcm9qZWN0c0xpc3QucHVzaChuZXdQcm9qZWN0KTtcbiAgICBkb20ucmVuZGVyUHJvamVjdHMoKTtcbiAgICBkb20uY2hhbmdlTGluayhwcm9qZWN0c0xpc3QubGVuZ3RoIC0gMSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHNMaXN0KSk7XG4gIH1cblxuICBmdW5jdGlvbiBlZGl0UHJvamVjdChpbmRleCwgdGl0bGUsIGljb24sIGNvbG9yLCBsaW5rKSB7XG4gICAgcHJvamVjdHNMaXN0W2luZGV4XS50aXRsZSA9IHRpdGxlO1xuICAgIHByb2plY3RzTGlzdFtpbmRleF0uaWNvbiA9IGljb247XG4gICAgcHJvamVjdHNMaXN0W2luZGV4XS5jb2xvciA9IGNvbG9yO1xuICAgIGRvbS5yZW5kZXJQcm9qZWN0cygpO1xuICAgIGlmIChsaW5rID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGRvbS5jaGFuZ2VMaW5rKGluZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9tLmNoYW5nZUxpbmsobGluayk7XG4gICAgfVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzTGlzdCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlUHJvamVjdChpbmRleCkge1xuICAgIHByb2plY3RzTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGRvbS5oaWRlRWxlbWVudChkb20ubW9kYWxzKTtcbiAgICBkb20ucmVuZGVyUHJvamVjdHMoKTtcbiAgICBkb20uY2hhbmdlTGluaygnaW5ib3gnKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0c0xpc3QpKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcHJvamVjdHNMaXN0LFxuICAgIGNyZWF0ZVByb2plY3QsXG4gICAgZWRpdFByb2plY3QsXG4gICAgcmVtb3ZlUHJvamVjdCxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHByb2plY3RzO1xuIiwiaW1wb3J0IHByb2plY3RzIGZyb20gJy4vcHJvamVjdHMnO1xuaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XG5cbmNvbnN0IHRhc2tzID0gKCgpID0+IHtcbiAgY2xhc3MgVGFzayB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsIHByaW9yaXR5LCBzY2hlZHVsZSkge1xuICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgdGhpcy5zY2hlZHVsZSA9IHNjaGVkdWxlO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlVGFzayhwcm9qZWN0SW5kZXgsIHRpdGxlLCBwcmlvcml0eSA9IDAsIHNjaGVkdWxlID0gMCwgbGluayA9IHByb2plY3RJbmRleCkge1xuICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayh0aXRsZSwgcHJpb3JpdHksIHNjaGVkdWxlKTtcbiAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrcy5wdXNoKG5ld1Rhc2spO1xuICAgIGlmIChOdW1iZXIuaXNOYU4ocGFyc2VJbnQobGluaywgMTApKSkge1xuICAgICAgZG9tLmNoYW5nZUxpbmsobGluayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvbS5yZW5kZXJUYXNrcyhwcm9qZWN0SW5kZXgpO1xuICAgIH1cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cy5wcm9qZWN0c0xpc3QpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZVRhc2socHJvamVjdEluZGV4LCB0YXNrSW5kZXgsIGxpbmsgPSBwcm9qZWN0SW5kZXgpIHtcbiAgICBpZiAocHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5kb25lKSB7XG4gICAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLmRvbmUgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5kb25lID0gdHJ1ZTtcbiAgICB9XG4gICAgZG9tLnJlbmRlclRhc2tzKGxpbmspO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzLnByb2plY3RzTGlzdCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZWRpdFRhc2socHJvamVjdEluZGV4LCB0YXNrSW5kZXgsIHRpdGxlLCBwcmlvcml0eSwgc2NoZWR1bGUsIGxpbmsgPSBwcm9qZWN0SW5kZXgpIHtcbiAgICBwcm9qZWN0cy5wcm9qZWN0c0xpc3RbcHJvamVjdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLnRpdGxlID0gdGl0bGU7XG4gICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3NbdGFza0luZGV4XS5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHByb2plY3RzLnByb2plY3RzTGlzdFtwcm9qZWN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0uc2NoZWR1bGUgPSBzY2hlZHVsZTtcbiAgICBkb20ucmVuZGVyVGFza3MobGluayk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMucHJvamVjdHNMaXN0KSk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVUYXNrKHByb2plY3RJbmRleCwgdGFza0luZGV4LCBsaW5rID0gcHJvamVjdEluZGV4KSB7XG4gICAgcHJvamVjdHMucHJvamVjdHNMaXN0W3Byb2plY3RJbmRleF0udGFza3Muc3BsaWNlKHRhc2tJbmRleCwgMSk7XG4gICAgZG9tLmhpZGVFbGVtZW50KGRvbS5tb2RhbHMpO1xuICAgIGRvbS5yZW5kZXJUYXNrcyhsaW5rKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cy5wcm9qZWN0c0xpc3QpKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY3JlYXRlVGFzayxcbiAgICB0b2dnbGVUYXNrLFxuICAgIGVkaXRUYXNrLFxuICAgIHJlbW92ZVRhc2ssXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCB0YXNrcztcbiIsImltcG9ydCBwcm9qZWN0cyBmcm9tICcuL3Byb2plY3RzJztcbmltcG9ydCB0YXNrcyBmcm9tICcuL3Rhc2tzJztcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuXG5jb25zdCB2YWxpZGF0aW9uID0gKCgpID0+IHtcbiAgZnVuY3Rpb24gYWRkUHJvamVjdChldmVudCkge1xuICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmZvcm1zWydwcm9qZWN0LWZvcm0nXVsncHJvamVjdC10aXRsZSddLnZhbHVlO1xuICAgIGNvbnN0IHByb2plY3RJY29uID0gZG9jdW1lbnQuZm9ybXNbJ3Byb2plY3QtZm9ybSddWydwcm9qZWN0LWljb24nXS52YWx1ZTtcbiAgICBjb25zdCBwcm9qZWN0Q29sb3IgPSBkb2N1bWVudC5mb3Jtc1sncHJvamVjdC1mb3JtJ11bJ3Byb2plY3QtY29sb3InXS52YWx1ZTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAocHJvamVjdFRpdGxlICE9PSAnJykge1xuICAgICAgcHJvamVjdHMuY3JlYXRlUHJvamVjdChwcm9qZWN0VGl0bGUsIHByb2plY3RJY29uLCBwcm9qZWN0Q29sb3IpO1xuICAgICAgZG9tLmhpZGVFbGVtZW50KGRvbS5mb3JtUHJvamVjdFRpdGxlRXJyb3IpO1xuICAgICAgZG9tLmhpZGVFbGVtZW50KGRvbS5tb2RhbHMpO1xuICAgIH0gZWxzZSBpZiAocHJvamVjdFRpdGxlID09PSAnJykge1xuICAgICAgZG9tLnNob3dFbGVtZW50KGRvbS5mb3JtUHJvamVjdFRpdGxlRXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGVkaXRQcm9qZWN0KGV2ZW50LCBpbmRleCwgbGluaykge1xuICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmZvcm1zWydwcm9qZWN0LWZvcm0nXVsncHJvamVjdC10aXRsZSddLnZhbHVlO1xuICAgIGNvbnN0IHByb2plY3RJY29uID0gZG9jdW1lbnQuZm9ybXNbJ3Byb2plY3QtZm9ybSddWydwcm9qZWN0LWljb24nXS52YWx1ZTtcbiAgICBjb25zdCBwcm9qZWN0Q29sb3IgPSBkb2N1bWVudC5mb3Jtc1sncHJvamVjdC1mb3JtJ11bJ3Byb2plY3QtY29sb3InXS52YWx1ZTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAocHJvamVjdFRpdGxlICE9PSAnJykge1xuICAgICAgcHJvamVjdHMuZWRpdFByb2plY3QoaW5kZXgsIHByb2plY3RUaXRsZSwgcHJvamVjdEljb24sIHByb2plY3RDb2xvciwgbGluayk7XG4gICAgICBkb20uaGlkZUVsZW1lbnQoZG9tLmZvcm1Qcm9qZWN0VGl0bGVFcnJvcik7XG4gICAgICBkb20uaGlkZUVsZW1lbnQoZG9tLm1vZGFscyk7XG4gICAgfSBlbHNlIGlmIChwcm9qZWN0VGl0bGUgPT09ICcnKSB7XG4gICAgICBkb20uc2hvd0VsZW1lbnQoZG9tLmZvcm1Qcm9qZWN0VGl0bGVFcnJvcik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkVGFzayhldmVudCwgcHJvamVjdEluZGV4KSB7XG4gICAgY29uc3QgdGFza1RpdGxlID0gZG9jdW1lbnQuZm9ybXNbJ3Rhc2stZm9ybSddWyd0YXNrLXRpdGxlJ10udmFsdWU7XG4gICAgY29uc3QgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQuZm9ybXNbJ3Rhc2stZm9ybSddWyd0YXNrLXByaW9yaXR5J10udmFsdWU7XG4gICAgY29uc3QgdGFza1NjaGVkdWxlID0gZG9jdW1lbnQuZm9ybXNbJ3Rhc2stZm9ybSddWyd0YXNrLXNjaGVkdWxlJ10udmFsdWU7XG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdGFzay1tb2RhbCcpLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0LWluZGV4Jyk7XG4gICAgbGV0IHRhc2tQcm9qZWN0O1xuICAgIGlmIChOdW1iZXIuaXNOYU4ocHJvamVjdEluZGV4KSkge1xuICAgICAgdGFza1Byb2plY3QgPSBwYXJzZUludChkb2N1bWVudC5mb3Jtc1sndGFzay1mb3JtJ11bJ3Rhc2stcHJvamVjdCddLnZhbHVlLCAxMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhc2tQcm9qZWN0ID0gcHJvamVjdEluZGV4O1xuICAgIH1cblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAodGFza1RpdGxlICE9PSAnJyAmJiAhTnVtYmVyLmlzTmFOKHRhc2tQcm9qZWN0KSkge1xuICAgICAgdGFza3MuY3JlYXRlVGFzayh0YXNrUHJvamVjdCwgdGFza1RpdGxlLCB0YXNrUHJpb3JpdHksIHRhc2tTY2hlZHVsZSwgbGluayk7XG4gICAgICBkb20uaGlkZUVsZW1lbnQoZG9tLmZvcm1UYXNrVGl0bGVFcnJvcik7XG4gICAgICBkb20uaGlkZUVsZW1lbnQoZG9tLmZvcm1UYXNrUHJvamVjdEVycm9yKTtcbiAgICAgIGRvbS5oaWRlRWxlbWVudChkb20ubW9kYWxzKTtcbiAgICB9IGVsc2UgaWYgKHRhc2tUaXRsZSA9PT0gJycpIHtcbiAgICAgIGRvbS5zaG93RWxlbWVudChkb20uZm9ybVRhc2tUaXRsZUVycm9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9tLmhpZGVFbGVtZW50KGRvbS5mb3JtVGFza1RpdGxlRXJyb3IpO1xuICAgIH1cbiAgICBpZiAoTnVtYmVyLmlzTmFOKHRhc2tQcm9qZWN0KSkge1xuICAgICAgZG9tLnNob3dFbGVtZW50KGRvbS5mb3JtVGFza1Byb2plY3RFcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvbS5oaWRlRWxlbWVudChkb20uZm9ybVRhc2tQcm9qZWN0RXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGVkaXRUYXNrKGV2ZW50LCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCwgbGluaykge1xuICAgIGNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LmZvcm1zWyd0YXNrLWZvcm0nXVsndGFzay10aXRsZSddLnZhbHVlO1xuICAgIGNvbnN0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LmZvcm1zWyd0YXNrLWZvcm0nXVsndGFzay1wcmlvcml0eSddLnZhbHVlO1xuICAgIGNvbnN0IHRhc2tTY2hlZHVsZSA9IGRvY3VtZW50LmZvcm1zWyd0YXNrLWZvcm0nXVsndGFzay1zY2hlZHVsZSddLnZhbHVlO1xuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmICh0YXNrVGl0bGUgIT09ICcnKSB7XG4gICAgICB0YXNrcy5lZGl0VGFzayhwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCwgdGFza1RpdGxlLCB0YXNrUHJpb3JpdHksIHRhc2tTY2hlZHVsZSwgbGluayk7XG4gICAgICBkb20uaGlkZUVsZW1lbnQoZG9tLmZvcm1UYXNrVGl0bGVFcnJvcik7XG4gICAgICBkb20uaGlkZUVsZW1lbnQoZG9tLm1vZGFscyk7XG4gICAgfSBlbHNlIGlmICh0YXNrVGl0bGUgPT09ICcnKSB7XG4gICAgICBkb20uc2hvd0VsZW1lbnQoZG9tLmZvcm1UYXNrVGl0bGVFcnJvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBhZGRQcm9qZWN0LFxuICAgIGVkaXRQcm9qZWN0LFxuICAgIGFkZFRhc2ssXG4gICAgZWRpdFRhc2ssXG4gIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0aW9uO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcbmltcG9ydCBoYW5kbGVycyBmcm9tICcuL2hhbmRsZXJzJztcblxuZG9tLnJlc3BvbnNpdmVTaWRlYmFyKCk7XG5kb20ucmVuZGVyUHJvamVjdHMoKTtcbmRvbS5jaGFuZ2VMaW5rKCdpbmJveCcpO1xuXG5oYW5kbGVycy5yZXNpemVIYW5kbGVyKCk7XG5oYW5kbGVycy5jbGlja0hhbmRsZXIoKTtcbmhhbmRsZXJzLmtleWJvYXJkSGFuZGxlcigpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9