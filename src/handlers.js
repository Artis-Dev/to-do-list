import validation from './validation';
import dom from './dom';
import projects from './projects';

const handlers = (() => {
  function clickHandler() {
    let projectIndex;
    dom.body.addEventListener('click', (e) => {
      // Nav links
      if (e.target.classList.contains('sidebar-link')) {
        console.log('Change link');
        dom.activeLink(e.target);
      // Project links
      } else if (e.target.classList.contains('sidebar-project')) {
        console.log('Change Project');
        dom.activeProject(e.target);
      // Add project modal open
      } else if (e.target.classList.contains('add-project-modal')) {
        dom.showElement(dom.addProjectModal);
      // Edit project modal open
      } else if (e.target.classList.contains('edit-project-modal')) {
        console.log('Edit Project Modal');
        // dom.showElement(dom.editProjectModal);
      // Remove project modal open
      } else if (e.target.classList.contains('remove-project-modal')) {
        dom.showElement(dom.removeProjectModal);
        projectIndex = e.target.parentElement.getAttribute('data-index');
      // Add task modal open
      } else if (e.target.classList.contains('add-task-modal')) {
        console.log('Add Task Modal');
        // dom.showModal(dom.addTaskModal);
      // Edit task modal open
      } else if (e.target.classList.contains('edit-task-modal')) {
        console.log('Edit Task Modal');
        // dom.showModal(dom.editTaskModal);
      // Close all modals
      } else if (e.target.classList.contains('close') || e.target.classList.contains('modal')) {
        dom.hideElement(dom.modals);
      // Add project
      } else if (e.target.id === 'add-project') {
        e.preventDefault();
        validation.formValidation();
      // Remove project
      } else if (e.target.id === 'remove-project') {
        projects.removeProject(projectIndex);
      // Toggle task
      } else if (e.target.classList.contains('toggle-task')) {
        console.log('Toggle Task');
      // Remove task
      } else if (e.target.classList.contains('remove-task')) {
        console.log('Delete Task');
      }
    });
  }

  function keyboardHandler() {
    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        dom.hideElement(dom.modals);
      }
      // if (event.key === 'Enter' && modal.style.display === 'block') {
      //   formValidation(event);
      // }
      // if (event.key === 'Enter' && confirmModal.style.display === 'block') {
      //   clearData();
      //   confirmModal.style.display = 'none';
      // }
    });
  }

  return {
    clickHandler,
    keyboardHandler,
  };
})();

export default handlers;
