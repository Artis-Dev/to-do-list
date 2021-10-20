import dom from './dom';

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
    dom.renderProjects();
    dom.changeLink(projectsList.length - 1);
  }

  function editProject(index, title, icon, color) {
    projectsList[index].title = title;
    projectsList[index].icon = icon;
    projectsList[index].color = color;
    dom.renderProjects();
    dom.changeLink(index);
  }

  function removeProject(index) {
    projectsList.splice(index, 1);
    dom.hideElement(dom.modals);
    dom.renderProjects();
    dom.changeLink('inbox');
  }

  return {
    projectsList,
    createProject,
    editProject,
    removeProject,
  };
})();

export default projects;
