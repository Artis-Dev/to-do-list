import validation from './validation';
import dom from './dom';
import projects from './projects';
import tasks from './tasks';

const handlers = (() => {
  function clickHandler() {
    let projectIndex = 0;
    let taskIndex = 0;
    let link = 'inbox';
    dom.body.addEventListener('click', (e) => {
      // Toggle sidebar
      if (e.target.classList.contains('toggle-sidebar')) {
        dom.toggleSidebar();
        // Nav links
      } else if (e.target.classList.contains('link-inbox')) {
        link = 'inbox';
        dom.changeLink('inbox');
        // Nav links
      } else if (e.target.classList.contains('link-today')) {
        link = 'today';
        dom.changeLink('today');
        // Nav links
      } else if (e.target.classList.contains('link-week')) {
        link = 'week';
        dom.changeLink('week');
        // Nav links
      } else if (e.target.classList.contains('link-important')) {
        link = 'important';
        dom.changeLink('important');
        // Nav links
      } else if (e.target.classList.contains('link-completed')) {
        link = 'completed';
        dom.changeLink('completed');
        // Project links
      } else if (e.target.classList.contains('sidebar-project')) {
        projectIndex = parseInt(
          e.target.getAttribute('data-index')
            ? e.target.getAttribute('data-index')
            : e.target.parentElement.getAttribute('data-index'),
          10,
        );
        link = undefined;
        dom.changeLink(projectIndex);
        // Add project modal open
      } else if (e.target.classList.contains('add-project-modal')) {
        link = undefined;
        dom.showProjectModal('addProject');
        // Edit project modal open
      } else if (e.target.classList.contains('edit-project-modal')) {
        projectIndex = parseInt(
          e.target.parentElement.getAttribute('data-index'),
          10,
        );
        dom.showProjectModal('editProject', projectIndex);
        // Remove project modal open
      } else if (e.target.classList.contains('remove-project-modal')) {
        projectIndex = parseInt(
          e.target.parentElement.getAttribute('data-index'),
          10,
        );
        dom.showConfirmModal('removeProject', projectIndex);
        // Add task modal open
      } else if (e.target.classList.contains('add-task-modal')) {
        projectIndex = parseInt(
          e.target.parentElement.getAttribute('data-project-index')
            ? e.target.parentElement.getAttribute('data-project-index')
            : e.target.getAttribute('data-project-index'),
          10,
        );
        dom.showTaskModal('addTask', projectIndex);
        // Edit task modal open
      } else if (e.target.classList.contains('edit-task-modal')) {
        projectIndex = parseInt(
          e.target.parentElement.getAttribute('data-project-index'),
          10,
        );
        taskIndex = parseInt(
          e.target.parentElement.getAttribute('data-task-index'),
          10,
        );
        dom.showTaskModal('editTask', projectIndex, taskIndex);
        // Remove task modal open
      } else if (e.target.classList.contains('remove-task-modal')) {
        projectIndex = parseInt(
          e.target.parentElement.getAttribute('data-project-index'),
          10,
        );
        taskIndex = parseInt(
          e.target.parentElement.getAttribute('data-task-index'),
          10,
        );
        dom.showConfirmModal('removeTask', projectIndex, taskIndex);
        // Close all modals
      } else if (
        e.target.classList.contains('close') ||
        e.target.classList.contains('modal')
      ) {
        dom.hideElement(dom.modals);
        // Add project
      } else if (e.target.classList.contains('add-project')) {
        validation.addProject(e);
        // Edit project
      } else if (e.target.classList.contains('edit-project')) {
        validation.editProject(e, projectIndex, link);
        // Remove project
      } else if (e.target.classList.contains('remove-project')) {
        projects.removeProject(projectIndex);
        // Add Task
      } else if (e.target.classList.contains('add-task')) {
        validation.addTask(e, projectIndex);
        // Edit Task
      } else if (e.target.classList.contains('edit-task')) {
        validation.editTask(e, projectIndex, taskIndex, link);
        // Remove task
      } else if (e.target.classList.contains('remove-task')) {
        tasks.removeTask(projectIndex, taskIndex, link);
        // Toggle task
      } else if (e.target.classList.contains('toggle-task')) {
        projectIndex = parseInt(
          e.target.getAttribute('data-project-index')
            ? e.target.getAttribute('data-project-index')
            : e.target.parentElement.getAttribute('data-project-index'),
          10,
        );
        taskIndex = parseInt(
          e.target.getAttribute('data-task-index')
            ? e.target.getAttribute('data-task-index')
            : e.target.parentElement.getAttribute('data-task-index'),
          10,
        );
        tasks.toggleTask(projectIndex, taskIndex, link);
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
