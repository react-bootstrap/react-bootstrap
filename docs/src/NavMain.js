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

var NavMain = React.createClass({
  propTypes: {
    activePage: React.PropTypes.string
  },

  render: function () {
    return (
      <header className="navbar navbar-static-top bs-docs-nav" role="banner">
        <div className="container">
          <div className="navbar-header">
            <button className="navbar-toggle" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <InternalLink href="/" className="navbar-brand">React Bootstrap</InternalLink>
          </div>
          <nav className="collapse navbar-collapse bs-navbar-collapse" role="navigation">
            <ul className="nav navbar-nav">
              {Object.keys(NAV_LINKS).map(this.renderNavItem)}
            </ul>
          </nav>
        </div>
      </header>
      );
  },

  renderNavItem: function (linkName) {
    var link = NAV_LINKS[linkName];
    return (
        <li className={this.props.activePage === linkName ? 'active' : null} key={linkName}>
          <InternalLink href={link.link}>{link.title}</InternalLink>
        </li>
      );
  }
});

module.exports = NavMain;