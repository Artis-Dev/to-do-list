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
    console.log(projectsList);
  }

  return {
    createProject,
  };
})();

export default projects;
