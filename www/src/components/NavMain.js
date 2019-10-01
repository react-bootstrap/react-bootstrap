import PropTypes from 'prop-types';
import React from 'react';
import Link from 'gatsby-link';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';

import config from '../config';

const NAV_LINKS = {
  documentation: {
    link: '/getting-started/introduction',
    title: 'Documentation'
  }
};

// We don't want to include react-router-bootstrap as a dependency here, so we
// need to fudge our own `<NavItem>` substitutes, and hide unknown props from
// them.

function Wrapper({ children }) {
  return children;
}

const propTypes = {
  activePage: PropTypes.string
};

function NavMain({ activePage }) {
  return (
    <Navbar
      staticTop
      componentClass="header"
      className="bs-docs-nav"
      role="banner"
    >
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">React-Bootstrap</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse className="bs-navbar-collapse">
        <Nav role="navigation" id="top">
          {Object.values(NAV_LINKS).map(({ link, title }) => (
            <Wrapper key={link}>
              <li className={activePage.startsWith(link) ? 'active' : null}>
                <Link to={link}>{title}</Link>
              </li>
            </Wrapper>
          ))}
          <Wrapper>
            <li>
              <a
                href="https://github.com/react-bootstrap/react-bootstrap"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
          </Wrapper>
        </Nav>

        <Nav pullRight>
          <NavDropdown title={`v${config.version}`} id="version-dropdown">
            <MenuItem href="https://react-bootstrap.netlify.com">
              React-Bootstrap for Bootstrap 4
            </MenuItem>
          </NavDropdown>
          <NavItem href="https://getbootstrap.com/docs/3.3/css/">
            Supports Bootstrap v{config.bootstrapVersion}
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

NavMain.propTypes = propTypes;

export default NavMain;
