import projects from './projects';

const dom = (() => {
  const body = document.querySelector('body');
  const projectsList = document.querySelector('.sidebar-projects-list');
  const addProjectModal = document.querySelector('#add-project-modal');
  const removeProjectModal = document.querySelector('#remove-project-modal');
  const modals = document.querySelectorAll('.modal');
  const addProjectForm = document.querySelector('#add-project-form');
  const addProjectTitleError = document.querySelector('.title-error');

  function showElement(element) {
    element.classList.remove('hide');
    element.classList.add('display');
  }

  function hideElement(modal) {
    if (Object.prototype.isPrototypeOf.call(NodeList.prototype, modal)) {
      modals.forEach((element) => {
        element.classList.remove('display');
        element.classList.add('hide');
      });
    } else {
      modal.classList.remove('display');
      modal.classList.add('hide');
    }
  }

  function activeLink(link) {
    const navLinks = document.querySelectorAll('.sidebar-link');
    navLinks.forEach((elem) => {
      elem.classList.remove('active');
    });
    if (link.classList.contains('far')) {
      link.parentElement.classList.add('active');
    } else {
      link.classList.add('active');
    }
  }

  function activeProject(project) {
    const projectLinks = document.querySelectorAll('.sidebar-project');
    projectLinks.forEach((elem) => {
      elem.classList.remove('active');
    });
    if (project.classList.contains('fa-edit')) {
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
      projectIcon.classList.add('far', projects.projectsList[i].icon, 'fa-fw', projects.projectsList[i].color);
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

    // <a class="sidebar-project active" href="#"><i class="far fa-circle fa-fw"></i>Home
    //   <i class="far fa-trash remove-project-modal"></i>
    //   <i class="far fa-edit edit-project-modal"></i>
    // </a>
  }

  return {
    body,
    addProjectModal,
    removeProjectModal,
    modals,
    addProjectForm,
    addProjectTitleError,
    showElement,
    hideElement,
    activeLink,
    activeProject,
    renderProjects,
  };
})();

export default dom;
