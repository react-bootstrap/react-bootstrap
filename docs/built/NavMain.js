/** @jsx React.DOM */

'use strict';

var React = require('react');
var Router = require('react-router-component');

var InternalLink = Router.Link;

var NAV_LINKS = {
  'getting-started': {
    link: '/getting-started.html',
    title: 'Getting started'
  },
  'css': {
    link: '/css.html',
    title: 'CSS'
  },
  'components': {
    link: '/components.html',
    title: 'Components'
  },
  'javascript': {
    link: '/javascript.html',
    title: 'JavaScript'
  }
};

var NavMain = React.createClass({displayName: 'NavMain',
  propTypes: {
    activePage: React.PropTypes.string
  },

  render: function () {
    return (
      React.DOM.header( {className:"navbar navbar-static-top bs-docs-nav", role:"banner"},
        React.DOM.div( {className:"container"},
          React.DOM.div( {className:"navbar-header"},
            React.DOM.button( {className:"navbar-toggle", type:"button", 'data-toggle':"collapse", 'data-target':".bs-navbar-collapse"},
              React.DOM.span( {className:"sr-only"}, "Toggle navigation"),
              React.DOM.span( {className:"icon-bar"} ),
              React.DOM.span( {className:"icon-bar"} ),
              React.DOM.span( {className:"icon-bar"} )
            ),
            InternalLink( {href:"/", className:"navbar-brand"}, "React Bootstrap")
          ),
          React.DOM.nav( {className:"collapse navbar-collapse bs-navbar-collapse", role:"navigation"},
            React.DOM.ul( {className:"nav navbar-nav"},
              Object.keys(NAV_LINKS).map(this.renderNavItem)
            )
          )
        )
      )
      );
  },

  renderNavItem: function (linkName) {
    var link = NAV_LINKS[linkName];
    return (
        React.DOM.li( {className:this.props.activePage === linkName ? 'active' : null, key:linkName},
          InternalLink( {href:link.link}, link.title)
        )
      );
  }
});

module.exports = NavMain;