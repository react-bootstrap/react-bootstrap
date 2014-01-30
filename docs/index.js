'use strict';

var React = require('react');
var Root = require('./built/Root');

document.addEventListener('DOMContentLoaded', function () {
  React.renderComponent(Root(window.INITIAL_PROPS || null), document);
}, false);
