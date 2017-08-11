import { configure } from '@storybook/react';

// import './v4/bootstrap-reboot.css';
import './v4/bootstrap.css';

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
