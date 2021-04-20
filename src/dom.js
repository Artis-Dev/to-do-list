const dom = (() => {
  const body = document.querySelector('body');
  const addProjectModal = document.querySelector('#add-project-modal');

  function showModal(modal) {
    modal.classList.remove('hide');
    modal.classList.add('display');
  }

  function hideModal(modal) {
    modal.classList.remove('display');
    modal.classList.add('hide');
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

  function activeProjectIcon(icon) {
    const projectIcons = document.querySelectorAll('.project-icon');
    projectIcons.forEach((elem) => {
      elem.classList.remove('active');
    });
    if (icon.classList.contains('far')) {
      icon.parentElement.classList.add('active');
    } else {
      icon.classList.add('active');
    }
  }

  function activeProjectColor(color) {
    const projectColors = document.querySelectorAll('.project-color');
    projectColors.forEach((elem) => {
      elem.classList.remove('active');
    });
    if (color.classList.contains('far')) {
      color.parentElement.classList.add('active');
    } else {
      color.classList.add('active');
    }
  }

  return {
    body,
    addProjectModal,
    showModal,
    hideModal,
    activeLink,
    activeProject,
    activeProjectIcon,
    activeProjectColor,
  };
})();

export default dom;
