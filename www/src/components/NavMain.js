import PropTypes from 'prop-types';
import React from 'react';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';

const NAV_LINKS = {
  documentation: {
    link: '/getting-started/introduction',
    title: 'Documentation'
  }
};

const propTypes = {
  activePage: PropTypes.string
};

function NavMain({ activePage }) {
  return (
    <Navbar
      componentClass="header"
      role="banner"
      expand="md"
      variant="dark"
      className="bg-dark"
      collapseOnSelect
    >
      <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="bs-navbar-collapse">
        <Nav role="navigation" id="top">
          {Object.values(NAV_LINKS).map(({ link, title }) => (
            <Nav.Link
              key={link}
              href={link}
              active={activePage.startsWith(link)}
            >
              {title}
            </Nav.Link>
          ))}
          <Nav.Link
            href="https://github.com/react-bootstrap/react-bootstrap"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

NavMain.propTypes = propTypes;

export default NavMain;
