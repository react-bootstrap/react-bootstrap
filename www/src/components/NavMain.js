import PropTypes from 'prop-types';
import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Dropdown from 'react-bootstrap/Dropdown';
import styled from 'astroturf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons/faDiscord';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';

import logo from '../assets/logo.svg';

const StyledNavbar = styled(Navbar).attrs({
  as: 'header',
  variant: 'dark',
  role: 'banner',
})`
  @import '../css/theme.scss';

  min-height: 4rem;
  background-color: $darker;

  @include media-breakpoint-up(md) {
    position: sticky;
    top: 0;
    z-index: 1040;
  }
`;

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
`;

const StyledDropdown = styled(Dropdown)`
  @import '../css/theme.scss';

  margin-right: $spacer;
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
        <StyledDropdown id="t-version">
          <Dropdown.Toggle id="dropdown-version" as={StyledNavLink}>
            v{config.version} (
            <span className="d-none d-lg-inline">Bootstrap </span>
            {config.bootstrapVersion
              .split('.')
              .slice(0, 2)
              .join('.')}
            )
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-100" role="menu">
            <Dropdown.Item href="https://react-bootstrap-v3.netlify.com">
              v0.32.4 (Bootstrap 3)
            </Dropdown.Item>
          </Dropdown.Menu>
        </StyledDropdown>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 200 }}
          overlay={<Tooltip id="t-github">Github</Tooltip>}
        >
          <StyledNavLink
            href="https://github.com/react-bootstrap/react-bootstrap"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} size="lg" />
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
            <FontAwesomeIcon icon={faDiscord} size="lg" />
            <span className="sr-only">Discord</span>
          </StyledNavLink>
        </OverlayTrigger>
      </Nav>
    </StyledNavbar>
  );
}

NavMain.propTypes = propTypes;

export default NavMain;
