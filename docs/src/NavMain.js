'use strict';

var React = require('react');
var Router = require('react-router');
var Navbar = require('../../lib/Navbar');
var Nav = require('../../lib/Nav');


var InternalLink = Router.Link;

var NAV_LINKS = {
  'getting-started': {
    link: 'getting-started',
    title: 'Getting started'
  },
  'components': {
    link: 'components',
    title: 'Components'
  }
};

var NavMain = React.createClass({
  propTypes: {
    activePage: React.PropTypes.string
  },

  render: function () {
    var brand = <InternalLink to='home' className="navbar-brand">React Bootstrap</InternalLink>;

    return (
      <Navbar componentClass='header' brand={brand} staticTop className="bs-docs-nav" role="banner" toggleNavKey={0}>
        <Nav className="bs-navbar-collapse" role="navigation" eventKey={0} id="top">
          {Object.keys(NAV_LINKS).map(this.renderNavItem)}
        </Nav>
      </Navbar>
    );
  },

  renderNavItem: function (linkName) {
    var link = NAV_LINKS[linkName];

    return (
        <li className={this.props.activePage === linkName ? 'active' : null} key={linkName}>
          <InternalLink to={link.link}>{link.title}</InternalLink>
        </li>
      );
  }
});

module.exports = NavMain;
