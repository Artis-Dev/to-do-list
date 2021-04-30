const dom = (() => {
  const body = document.querySelector('body');
  const addProjectModal = document.querySelector('#add-project-modal');
  const addProjectForm = document.querySelector('#add-project-form');
  const addProjectTitleError = document.querySelector('.title-error');

  function showElement(element) {
    element.classList.remove('hide');
    element.classList.add('display');
  }

  function hideElement(element) {
    element.classList.remove('display');
    element.classList.add('hide');
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

  return {
    body,
    addProjectModal,
    addProjectForm,
    addProjectTitleError,
    showElement,
    hideElement,
    activeLink,
    activeProject,
  };
})();

export default dom;
