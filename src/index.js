import dom from './dom';
import handlers from './handlers';

dom.responsiveSidebar();
dom.renderProjects();
dom.changeLink('inbox');

handlers.resizeHandler();
handlers.clickHandler();
handlers.keyboardHandler();
