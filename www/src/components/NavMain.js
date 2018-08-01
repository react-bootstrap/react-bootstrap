import PropTypes from 'prop-types';
import React from 'react';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import { styled } from 'css-literal-loader/styled';
import withProps from 'recompose/withProps';

import logo from '../assets/logo.svg';

const StyledNavbar = withProps({
  as: 'header',
  variant: 'dark',
  role: 'banner',
})(
  styled(Navbar)`
    @import '../css/theme.scss';

    min-height: 4rem;
    background-color: $darker;

    @include media-breakpoint-up(md) {
      position: sticky;
      top: 0;
      z-index: 2000;
    }
  `,
);

const StyledNavLink = styled(Nav.Link)`
  @import '../css/theme.scss';

  & + & {
    margin-left: $spacer;
  }

  &:global(.active) {
    font-width: 700;
  }

  & i {
    font-size: 1.2em;
  }
`;

const NAV_LINKS = [
  {
    link: '/',
    title: 'Home',
    exact: true,
  },
  {
    link: '/getting-started/introduction',
    title: 'Getting Started',
  },
  {
    link: '/components/alerts',
    title: 'Components',
  },
];

const propTypes = {
  activePage: PropTypes.string,
};

function NavMain({ activePage }) {
  return (
    <StyledNavbar expand="md" collapseOnSelect>
      <Navbar.Brand href="/">
        <img src={logo} alt="react-bootstrap" height={30} />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="bs-navbar-collapse">
        <Nav role="navigation" id="top">
          {NAV_LINKS.map(({ link, title, exact }) => (
            <StyledNavLink
              key={link}
              href={link}
              active={exact ? activePage === link : activePage.startsWith(link)}
            >
              {title}
            </StyledNavLink>
          ))}
        </Nav>
        <Nav className="ml-auto pr-5">
          <StyledNavLink
            href="https://github.com/react-bootstrap/react-bootstrap"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github" />
            <span className="sr-only">github</span>
          </StyledNavLink>
          <StyledNavLink
            href="https://discord.gg/5PM9hB"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-discord" />
            <span className="sr-only">Discord</span>
          </StyledNavLink>
        </Nav>
      </Navbar.Collapse>
    </StyledNavbar>
  );
}

NavMain.propTypes = propTypes;

export default NavMain;
