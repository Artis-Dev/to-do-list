import dom from './dom';

const projects = (() => {
  let projectsList = [];

  // Local storage
  if (localStorage.getItem('projects') === null) {
    projectsList = [
      {
        title: 'Demo Project',
        icon: 'fa-home',
        color: 'project-grey',
        tasks: [],
      },
    ];
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
    dom.renderProjects();
    dom.changeLink(projectsList.length - 1);
    localStorage.setItem('projects', JSON.stringify(projectsList));
  }

  function editProject(index, title, icon, color, link) {
    projectsList[index].title = title;
    projectsList[index].icon = icon;
    projectsList[index].color = color;
    dom.renderProjects();
    if (link === undefined) {
      dom.changeLink(index);
    } else {
      dom.changeLink(link);
    }
    localStorage.setItem('projects', JSON.stringify(projectsList));
  }

  function removeProject(index) {
    projectsList.splice(index, 1);
    dom.hideElement(dom.modals);
    dom.renderProjects();
    dom.changeLink('inbox');
    localStorage.setItem('projects', JSON.stringify(projectsList));
  }

  return {
    projectsList,
    createProject,
    editProject,
    removeProject,
  };
})();

export default projects;
