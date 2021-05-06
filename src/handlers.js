import validation from './validation';
import dom from './dom';
import projects from './projects';

const handlers = (() => {
  function clickHandler() {
    let projectIndex = 0;
    let taskIndex = 0;
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
        dom.showProjectModal('addProject');
      // Edit project modal open
      } else if (e.target.classList.contains('edit-project-modal')) {
        projectIndex = e.target.parentElement.getAttribute('data-index');
        dom.showProjectModal('editProject', projectIndex);
      // Remove project modal open
      } else if (e.target.classList.contains('remove-project-modal')) {
        projectIndex = e.target.parentElement.getAttribute('data-index');
        dom.showConfirmModal('removeProject', projectIndex);
      // Add task modal open
      } else if (e.target.classList.contains('add-task-modal')) {
        console.log('Add Task Modal');
        // dom.showTaskModal('addTask');
      // Edit task modal open
      } else if (e.target.classList.contains('edit-task-modal')) {
        console.log('Edit Task Modal');
        // dom.showTaskModal('editTask', taskIndex);
      // Close all modals
      } else if (e.target.classList.contains('close') || e.target.classList.contains('modal')) {
        dom.hideElement(dom.modals);
      // Add project
      } else if (e.target.classList.contains('add-project')) {
        validation.addProject(e);
      // Edit project
      } else if (e.target.classList.contains('edit-project')) {
        validation.editProject(e, projectIndex);
      // Remove project
      } else if (e.target.classList.contains('remove-project')) {
        projects.removeProject(projectIndex);
      // Toggle task
      } else if (e.target.classList.contains('toggle-task')) {
        console.log('Toggle Task');
      // Remove task
      } else if (e.target.classList.contains('remove-task')) {
        console.log('Remove Task');
        dom.showConfirmModal('removeTask', taskIndex);
      }
    });
  }

  function keyboardHandler() {
    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        dom.hideElement(dom.modals);
      }
      // if (event.key === 'Enter' && modal.style.display === 'block' && modal) {
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