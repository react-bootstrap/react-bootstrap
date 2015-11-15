import React from 'react';
import { Link } from 'react-router';
import Navbar from '../../src/Navbar';
import Nav from '../../src/Nav';

const NAV_LINKS = {
  'introduction': {
    link: '/introduction.html',
    title: 'Introduction'
  },
  'getting-started': {
    link: '/getting-started.html',
    title: 'Getting started'
  },
  'components': {
    link: '/components.html',
    title: 'Components'
  },
  'support': {
    link: '/support.html',
    title: 'Support'
  }
};

const NavMain = React.createClass({
  propTypes: {
    activePage: React.PropTypes.string
  },

  render() {
    let brand = <Link to="/" className="navbar-brand">React-Bootstrap</Link>;
    let links = Object.keys(NAV_LINKS).map(this.renderNavItem).concat([
      <li key="github-link">
        <a href="https://github.com/react-bootstrap/react-bootstrap" target="_blank">GitHub</a>
      </li>
    ]);

    return (
      <Navbar staticTop
        componentClass="header"
        className="bs-docs-nav"
        role="banner"
      >
        <Navbar.Header>
          {brand}
        </Navbar.Header>
        <Navbar.Collapse className="bs-navbar-collapse" >
          <Nav role="navigation" id="top">
            {links}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  },

  renderNavItem(linkName) {
    let link = NAV_LINKS[linkName];

    return (
        <li className={this.props.activePage === linkName ? 'active' : null} key={linkName}>
          <Link to={link.link}>{link.title}</Link>
        </li>
      );
  }
});

export default NavMain;
