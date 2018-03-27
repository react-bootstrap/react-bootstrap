import PropTypes from 'prop-types';
import React from 'react';
import Link from 'gatsby-link';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import FormControl from 'react-bootstrap/lib/FormControl';

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

function attachSearch(ref) {
  if (ref)
    window.docsearch({
      apiKey: '68117ff90f086cb491d7e7e984cd7b75',
      indexName: 'react_bootstrap',
      inputSelector: ref,
      debug: false // Set debug to true if you want to inspect the dropdown
    });
}
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
        <Navbar.Form pullRight>
          <FormControl
            type="search"
            className="bs-search-bar"
            placeholder="Search…"
            inputRef={attachSearch}
          />
        </Navbar.Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

NavMain.propTypes = propTypes;

export default NavMain;
