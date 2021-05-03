/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ \"./src/projects.js\");\n\n\nconst dom = (() => {\n  const body = document.querySelector('body');\n  const projectsList = document.querySelector('.sidebar-projects-list');\n  const addProjectModal = document.querySelector('#add-project-modal');\n  const removeProjectModal = document.querySelector('#remove-project-modal');\n  const modals = document.querySelectorAll('.modal');\n  const addProjectForm = document.querySelector('#add-project-form');\n  const addProjectTitleError = document.querySelector('.title-error');\n\n  function showElement(element) {\n    element.classList.remove('hide');\n    element.classList.add('display');\n  }\n\n  function hideElement(modal) {\n    if (Object.prototype.isPrototypeOf.call(NodeList.prototype, modal)) {\n      modals.forEach((element) => {\n        element.classList.remove('display');\n        element.classList.add('hide');\n      });\n    } else {\n      modal.classList.remove('display');\n      modal.classList.add('hide');\n    }\n  }\n\n  function activeLink(link) {\n    const navLinks = document.querySelectorAll('.sidebar-link');\n    navLinks.forEach((elem) => {\n      elem.classList.remove('active');\n    });\n    if (link.classList.contains('far')) {\n      link.parentElement.classList.add('active');\n    } else {\n      link.classList.add('active');\n    }\n  }\n\n  function activeProject(project) {\n    const projectLinks = document.querySelectorAll('.sidebar-project');\n    projectLinks.forEach((elem) => {\n      elem.classList.remove('active');\n    });\n    if (project.classList.contains('fa-edit')) {\n      project.parentElement.classList.add('active');\n    } else {\n      project.classList.add('active');\n    }\n  }\n\n  function renderProjects() {\n    // Create link\n    projectsList.textContent = '';\n    for (let i = 0; i < _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList.length; i += 1) {\n      const projectLink = document.createElement('a');\n      projectLink.classList.add('sidebar-project');\n      projectLink.setAttribute('href', '#');\n      projectLink.setAttribute('data-index', i);\n      projectsList.appendChild(projectLink);\n      // Create icon\n      const projectIcon = document.createElement('i');\n      projectIcon.classList.add('far', _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[i].icon, 'fa-fw', _projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[i].color);\n      projectLink.appendChild(projectIcon);\n      // Create name\n      const projectName = document.createTextNode(_projects__WEBPACK_IMPORTED_MODULE_0__.default.projectsList[i].title);\n      projectLink.appendChild(projectName);\n      // Create remove icon\n      const projectRemoveIcon = document.createElement('i');\n      projectRemoveIcon.classList.add('far', 'fa-trash', 'remove-project-modal');\n      projectLink.appendChild(projectRemoveIcon);\n      // Create edit icon\n      const projectEditIcon = document.createElement('i');\n      projectEditIcon.classList.add('far', 'fa-edit', 'edit-project-modal');\n      projectLink.appendChild(projectEditIcon);\n    }\n\n    // <a class=\"sidebar-project active\" href=\"#\"><i class=\"far fa-circle fa-fw\"></i>Home\n    //   <i class=\"far fa-trash remove-project-modal\"></i>\n    //   <i class=\"far fa-edit edit-project-modal\"></i>\n    // </a>\n  }\n\n  return {\n    body,\n    addProjectModal,\n    removeProjectModal,\n    modals,\n    addProjectForm,\n    addProjectTitleError,\n    showElement,\n    hideElement,\n    activeLink,\n    activeProject,\n    renderProjects,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);\n\n\n//# sourceURL=webpack://to-do-list/./src/dom.js?");

/***/ }),

/***/ "./src/handlers.js":
/*!*************************!*\
  !*** ./src/handlers.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validation */ \"./src/validation.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projects */ \"./src/projects.js\");\n\n\n\n\nconst handlers = (() => {\n  function clickHandler() {\n    let projectIndex;\n    _dom__WEBPACK_IMPORTED_MODULE_1__.default.body.addEventListener('click', (e) => {\n      // Nav links\n      if (e.target.classList.contains('sidebar-link')) {\n        console.log('Change link');\n        _dom__WEBPACK_IMPORTED_MODULE_1__.default.activeLink(e.target);\n      // Project links\n      } else if (e.target.classList.contains('sidebar-project')) {\n        console.log('Change Project');\n        _dom__WEBPACK_IMPORTED_MODULE_1__.default.activeProject(e.target);\n      // Add project modal open\n      } else if (e.target.classList.contains('add-project-modal')) {\n        _dom__WEBPACK_IMPORTED_MODULE_1__.default.showElement(_dom__WEBPACK_IMPORTED_MODULE_1__.default.addProjectModal);\n      // Edit project modal open\n      } else if (e.target.classList.contains('edit-project-modal')) {\n        console.log('Edit Project Modal');\n        // dom.showModal(dom.editProjectModal);\n      // Remove project modal open\n      } else if (e.target.classList.contains('remove-project-modal')) {\n        _dom__WEBPACK_IMPORTED_MODULE_1__.default.showElement(_dom__WEBPACK_IMPORTED_MODULE_1__.default.removeProjectModal);\n        projectIndex = e.target.parentElement.getAttribute('data-index');\n      // Add task modal open\n      } else if (e.target.classList.contains('add-task-modal')) {\n        console.log('Add Task Modal');\n        // dom.showModal(dom.addTaskModal);\n      // Edit task modal open\n      } else if (e.target.classList.contains('edit-task-modal')) {\n        console.log('Edit Task Modal');\n        // dom.showModal(dom.editTaskModal);\n      // Close all modals\n      } else if (e.target.classList.contains('close') || e.target.classList.contains('modal')) {\n        _dom__WEBPACK_IMPORTED_MODULE_1__.default.hideElement(_dom__WEBPACK_IMPORTED_MODULE_1__.default.modals);\n      // Add project\n      } else if (e.target.id === 'add-project') {\n        e.preventDefault();\n        _validation__WEBPACK_IMPORTED_MODULE_0__.default.formValidation();\n      // Remove project\n      } else if (e.target.id === 'remove-project') {\n        _projects__WEBPACK_IMPORTED_MODULE_2__.default.removeProject(projectIndex);\n      // Toggle task\n      } else if (e.target.classList.contains('toggle-task')) {\n        console.log('Toggle Task');\n      // Remove task\n      } else if (e.target.classList.contains('remove-task')) {\n        console.log('Delete Task');\n      }\n    });\n  }\n\n  function keyboardHandler() {\n    document.addEventListener('keyup', (event) => {\n      if (event.key === 'Escape') {\n        _dom__WEBPACK_IMPORTED_MODULE_1__.default.hideElement(_dom__WEBPACK_IMPORTED_MODULE_1__.default.modals);\n      }\n      // if (event.key === 'Enter' && modal.style.display === 'block') {\n      //   formValidation(event);\n      // }\n      // if (event.key === 'Enter' && confirmModal.style.display === 'block') {\n      //   clearData();\n      //   confirmModal.style.display = 'none';\n      // }\n    });\n  }\n\n  return {\n    clickHandler,\n    keyboardHandler,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handlers);\n\n\n//# sourceURL=webpack://to-do-list/./src/handlers.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n/* harmony import */ var _handlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handlers */ \"./src/handlers.js\");\n\n\n\n_dom__WEBPACK_IMPORTED_MODULE_0__.default.renderProjects();\n_handlers__WEBPACK_IMPORTED_MODULE_1__.default.clickHandler();\n_handlers__WEBPACK_IMPORTED_MODULE_1__.default.keyboardHandler();\n\n\n//# sourceURL=webpack://to-do-list/./src/index.js?");

/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n\n\nconst projects = (() => {\n  const projectsList = [];\n\n  class Project {\n    constructor(title, icon, color) {\n      this.title = title;\n      this.icon = icon;\n      this.color = color;\n      this.tasks = [];\n    }\n  }\n\n  function createProject(title, icon, color) {\n    const newProject = new Project(title, icon, color);\n    projectsList.push(newProject);\n    _dom__WEBPACK_IMPORTED_MODULE_0__.default.renderProjects();\n  }\n\n  function removeProject(index) {\n    projectsList.splice(index, 1);\n    _dom__WEBPACK_IMPORTED_MODULE_0__.default.hideElement(_dom__WEBPACK_IMPORTED_MODULE_0__.default.modals);\n    _dom__WEBPACK_IMPORTED_MODULE_0__.default.renderProjects();\n  }\n\n  return {\n    projectsList,\n    createProject,\n    removeProject,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (projects);\n\n\n//# sourceURL=webpack://to-do-list/./src/projects.js?");

/***/ }),

/***/ "./src/validation.js":
/*!***************************!*\
  !*** ./src/validation.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ \"./src/projects.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n\n\n\nconst validation = (() => {\n  function formValidation() {\n    const projectTitle = document.forms['add-project-form']['project-title'].value;\n    const projectIcon = document.forms['add-project-form']['project-icon'].value;\n    const projectColor = document.forms['add-project-form']['project-color'].value;\n\n    if (projectTitle !== '') {\n      _projects__WEBPACK_IMPORTED_MODULE_0__.default.createProject(projectTitle, projectIcon, projectColor);\n      _dom__WEBPACK_IMPORTED_MODULE_1__.default.addProjectForm.reset();\n      _dom__WEBPACK_IMPORTED_MODULE_1__.default.hideElement(_dom__WEBPACK_IMPORTED_MODULE_1__.default.addProjectTitleError);\n      _dom__WEBPACK_IMPORTED_MODULE_1__.default.hideElement(_dom__WEBPACK_IMPORTED_MODULE_1__.default.addProjectModal);\n    } else if (projectTitle === '') {\n      _dom__WEBPACK_IMPORTED_MODULE_1__.default.showElement(_dom__WEBPACK_IMPORTED_MODULE_1__.default.addProjectTitleError);\n    }\n  }\n  return {\n    formValidation,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validation);\n\n\n//# sourceURL=webpack://to-do-list/./src/validation.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;