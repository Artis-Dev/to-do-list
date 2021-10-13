import validation from './validation';
import dom from './dom';
import projects from './projects';
import tasks from './tasks';

const handlers = (() => {
  function clickHandler() {
    let projectIndex = 0;
    let taskIndex = 0;
    dom.body.addEventListener('click', (e) => {
      // Toggle sidebar
      if (e.target.classList.contains('toggle-sidebar')) {
        dom.toggleSidebar();
      // Nav links
      } else if (e.target.classList.contains('sidebar-link')) {
        console.log('Change link');
        dom.activeLink(e.target);
      // Project links
      } else if (e.target.classList.contains('sidebar-project')) {
        projectIndex = (e.target.getAttribute('data-index')) ? e.target.getAttribute('data-index') : e.target.parentElement.getAttribute('data-index');
        dom.changeProject(projectIndex);
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
        projectIndex = (e.target.parentElement.getAttribute('data-project-index')) ? e.target.parentElement.getAttribute('data-project-index') : e.target.getAttribute('data-project-index');
        dom.showTaskModal('addTask', projectIndex);
      // Edit task modal open
      } else if (e.target.classList.contains('edit-task-modal')) {
        taskIndex = e.target.parentElement.getAttribute('data-task-index');
        dom.showTaskModal('editTask', projectIndex, taskIndex);
      // Remove task modal open
      } else if (e.target.classList.contains('remove-task-modal')) {
        taskIndex = e.target.parentElement.getAttribute('data-task-index');
        dom.showConfirmModal('removeTask', projectIndex, taskIndex);
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
      // Add Task
      } else if (e.target.classList.contains('add-task')) {
        validation.addTask(e, projectIndex);
      // Edit Task
      } else if (e.target.classList.contains('edit-task')) {
        validation.editTask(e, projectIndex, taskIndex);
      // Remove task
      } else if (e.target.classList.contains('remove-task')) {
        tasks.removeTask(projectIndex, taskIndex);
      // Toggle task
      } else if (e.target.classList.contains('toggle-task')) {
        taskIndex = (e.target.getAttribute('data-task-index')) ? e.target.getAttribute('data-task-index') : e.target.parentElement.getAttribute('data-task-index');
        tasks.toggleTask(projectIndex, taskIndex);
      }
    });
  }

  function keyboardHandler() {
    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        dom.hideElement(dom.modals);
      }
      // if (event.key === 'Enter' && modal.style.display === 'block') {
      //   submitButton.click();
      // }
    });
  }

  function resizeHandler() {
    window.addEventListener('resize', dom.responsiveSidebar);
  }

  return {
    clickHandler,
    keyboardHandler,
    resizeHandler,
  };
})();

export default handlers;
