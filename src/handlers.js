import dom from './dom';

const handlers = (() => {
  function clickHandler() {
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
        dom.showModal(dom.addProjectModal);
      // Add project icon
      } else if (e.target.classList.contains('project-icon')) {
        dom.activeProjectIcon(e.target);
      // Add project color
      } else if (e.target.classList.contains('project-color')) {
        dom.activeProjectColor(e.target);
      // Edit project modal open
      } else if (e.target.classList.contains('edit-project-modal')) {
        console.log('Edit Project Modal');
        // dom.showModal(dom.editProjectModal);
      // Remove project modal open
      } else if (e.target.classList.contains('remove-project-modal')) {
        console.log('Remove Project Modal');
        // dom.showModal(dom.removeProjectModal);
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
        dom.hideModal(dom.addProjectModal);
      // Add project
      } else if (e.target.id === 'add-project') {
        console.log('Add project');
        e.preventDefault();
      // Remove project
      } else if (e.target.classList.contains('remove-project')) {
        console.log('Remove Project');
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
        dom.hideModal(dom.addProjectModal);
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
