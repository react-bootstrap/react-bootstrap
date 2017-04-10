import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Navbar from '../../src/Navbar';
import Nav from '../../src/Nav';

const NAV_LINKS = {
  introduction: {
    link: '/introduction.html',
    title: 'Introduction'
  },
  'getting-started': {
    link: '/getting-started.html',
    title: 'Getting started'
  },
  components: {
    link: '/components.html',
    title: 'Components'
  },
  support: {
    link: '/support.html',
    title: 'Support'
  },
};

// We don't want to include react-router-bootstrap as a dependency here, so we
// need to fudge our own `<NavItem>` substitutes, and hide unknown props from
// them.

function Wrapper({ children }) {
  return children;
}

const propTypes = {
  activePage: PropTypes.string,
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
          {Object.entries(NAV_LINKS).map(([linkName, { link, title }]) => (
            <Wrapper key={linkName}>
              <li className={linkName === activePage ? 'active' : null}>
                <Link to={link}>
                  {title}
                </Link>
              </li>
            </Wrapper>
          ))}
          <Wrapper>
            <li>
              <a
                href="https://github.com/react-bootstrap/react-bootstrap"
                target="_blank"
              >
                GitHub
              </a>
            </li>
          </Wrapper>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

NavMain.propTypes = propTypes;

export default NavMain;
