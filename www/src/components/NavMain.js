import PropTypes from 'prop-types';
import React from 'react';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
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
      z-index: 1040;
    }
  `,
);
const SkipToContentLink = styled('a')`
  composes: sr-only sr-only-focusable bg-primary text-white px-4 py-2 mr-2 from global;
`;

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
    <StyledNavbar expand collapseOnSelect>
      <SkipToContentLink href="#rb-docs-content" tabIndex="0">
        Skip to content
      </SkipToContentLink>
      <Navbar.Brand href="/">
        <img src={logo} alt="react-bootstrap" height={30} />
      </Navbar.Brand>

      <Nav role="navigation" id="top" className="d-none d-md-flex">
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
      <Nav className="ml-auto pr-md-5">
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 200 }}
          overlay={<Tooltip id="t-discord">Github</Tooltip>}
        >
          <StyledNavLink
            href="https://github.com/react-bootstrap/react-bootstrap"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github" />
            <span className="sr-only">Github</span>
          </StyledNavLink>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 200 }}
          overlay={<Tooltip id="t-discord">Discord</Tooltip>}
        >
          <StyledNavLink
            href="https://discord.gg/0ZcbPKXt5bXLs9XK"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-discord" />
            <span className="sr-only">Discord</span>
          </StyledNavLink>
        </OverlayTrigger>
      </Nav>
    </StyledNavbar>
  );
}

NavMain.propTypes = propTypes;

export default NavMain;
