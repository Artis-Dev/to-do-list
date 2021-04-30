import projects from './projects';
import dom from './dom';

const validation = (() => {
  function formValidation() {
    const projectTitle = document.forms['add-project-form']['project-title'].value;
    const projectIcon = document.forms['add-project-form']['project-icon'].value;
    const projectColor = document.forms['add-project-form']['project-color'].value;

    if (projectTitle !== '') {
      projects.createProject(projectTitle, projectIcon, projectColor);
      dom.addProjectForm.reset();
      dom.hideElement(dom.addProjectTitleError);
      dom.hideElement(dom.addProjectModal);
    } else if (projectTitle === '') {
      dom.showElement(dom.addProjectTitleError);
    }
  }
  return {
    formValidation,
  };
})();

export default validation;
