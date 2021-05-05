import projects from './projects';
import dom from './dom';

const validation = (() => {
  function addProject(event) {
    const projectTitle = document.forms['add-project-form']['project-title'].value;
    const projectIcon = document.forms['add-project-form']['project-icon'].value;
    const projectColor = document.forms['add-project-form']['project-color'].value;

    event.preventDefault();

    if (projectTitle !== '') {
      projects.createProject(projectTitle, projectIcon, projectColor);
      dom.hideElement(dom.projectFormTitleError);
      dom.hideElement(dom.modals);
    } else if (projectTitle === '') {
      dom.showElement(dom.projectFormTitleError);
    }
  }

  function editProject(event, index) {
    const projectTitle = document.forms['add-project-form']['project-title'].value;
    const projectIcon = document.forms['add-project-form']['project-icon'].value;
    const projectColor = document.forms['add-project-form']['project-color'].value;

    event.preventDefault();

    if (projectTitle !== '') {
      projects.editProject(index, projectTitle, projectIcon, projectColor);
      dom.hideElement(dom.projectFormTitleError);
      dom.hideElement(dom.modals);
    } else if (projectTitle === '') {
      dom.showElement(dom.projectFormTitleError);
    }
  }

  return {
    addProject,
    editProject,
  };
})();

export default validation;
