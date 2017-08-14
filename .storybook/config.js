import React from 'react';
import { configure, addDecorator } from '@storybook/react';

// import './v4/bootstrap-reboot.css';
import './v4/bootstrap.css';
import './examples.css';

function loadStories() {
  require('../stories');
}

addDecorator((story) => (
  <div style={{ margin: 50 }} className="example">{story()}</div>
));

configure(loadStories, module);
