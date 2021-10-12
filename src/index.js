import dom from './dom';
import handlers from './handlers';

dom.responsiveSidebar();
dom.renderProjects();
dom.changeProject(0, 0);

handlers.resizeHandler();
handlers.clickHandler();
handlers.keyboardHandler();
