import dom from './dom';

const projects = (() => {
  const projectsList = [];

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
    dom.renderProjects();
  }

  function removeProject(index) {
    projectsList.splice(index, 1);
    dom.hideElement(dom.modals);
    dom.renderProjects();
  }

  return {
    projectsList,
    createProject,
    removeProject,
  };
})();

export default projects;
