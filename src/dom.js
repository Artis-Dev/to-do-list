import projects from './projects';

const dom = (() => {
  const body = document.querySelector('body');
  const projectsList = document.querySelector('.sidebar-projects-list');
  const projectModal = document.querySelector('#add-project-modal');
  const confirmModal = document.querySelector('#remove-project-modal');
  const modals = document.querySelectorAll('.modal');
  const projectForm = document.querySelector('#add-project-form');
  const projectFormTitleError = document.querySelector('.title-error');

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

  function showConfirmModal(modal) {
    const modalHeading = document.querySelector('.confirm-modal-title');
    const modalSubmitButton = document.querySelector('#confirm-button');

    confirmModal.classList.remove('hide');
    confirmModal.classList.add('display');
    modalSubmitButton.textContent = 'Remove';

    if (modal === 'removeProject') {
      console.log('qqqq');
      modalHeading.textContent = 'Remove project';
      modalSubmitButton.classList.remove('remove-task');
      modalSubmitButton.classList.add('remove-project');
    } else if (modal === 'removeTask') {
      modalHeading.textContent = 'Remove task';
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

  function activeProject(project) {
    const projectLinks = document.querySelectorAll('a.sidebar-project');
    projectLinks.forEach((elem) => {
      elem.classList.remove('active');
    });
    if (project.classList.contains('sidebar-project-icon')) {
      project.parentElement.classList.add('active');
    } else {
      project.classList.add('active');
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
      // Create name
      const projectName = document.createTextNode(projects.projectsList[i].title);
      projectLink.appendChild(projectName);
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

  return {
    body,
    projectModal,
    confirmModal,
    modals,
    projectForm,
    projectFormTitleError,
    showProjectModal,
    showConfirmModal,
    showElement,
    hideElement,
    activeLink,
    activeProject,
    renderProjects,
  };
})();

export default dom;
