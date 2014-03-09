'use strict';

var React = require('react');
var Root = require('./built/Root');

React.renderComponent(Root(window.INITIAL_PROPS || null), document);