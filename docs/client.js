'use strict';

var React = require('react');
var Root = require('./src/Root');

// For React devtools
window.React = React;

React.render(Root(window.INITIAL_PROPS), document);