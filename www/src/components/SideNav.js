import startCase from 'lodash/startCase';
import classNames from 'classnames';
import * as React from 'react';
import Nav from 'react-bootstrap/Nav';
import FormControl from 'react-bootstrap/FormControl';

import styled from 'astroturf';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

const MenuButton = styled(Button).attrs({ variant: 'link' })`
  composes: p-0 d-md-none ms-3 from global;

  line-height: 1;
  color: #212529;
`;

const SidePanel = styled('div')`
  @import '../css/theme';

  $top: 4rem;

  composes: d-flex flex-column from global;

  background-color: #f7f7f7;

  @include media-breakpoint-up(md) {
    position: sticky;
    top: $top;
    z-index: 1000;
    height: calc(100vh - #{$top});
    background-color: #f7f7f7;
    border-right: 1px solid $divider;
  }

  & > * + * {
    border-top: 1px solid $divider;
  }
`;

const OverflowWrapper = styled('div')`
  @import '../css/theme';

  @include media-breakpoint-up(md) {
    display: block !important;
    height: 100% !important;
  }
`;

const TableOfContents = styled('nav')`
  @import '../css/theme';

  composes: pt-2 pb-4 from global;

  @include media-breakpoint-up(md) {
    height: 100% !important;
    overflow: auto;
    margin-right: -15px;
    padding-right: calc(15px + 1rem);
  }
`;

const TocLink = styled(Nav.Link)`
  @import '../css/theme';

  &.active,
  &:global(.active) {
    font-weight: 500;
    color: $text !important;
  }

  &.active {
    margin-top: 1rem;

    & + * {
      margin-bottom: 1rem;
    }
  }

  &,
  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
    color: transparentize($text, 0.25);
    transition: color 0.2s ease-out;
  }

  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
    color: $subtle-on-dark;
  }
`;

const TocSubLink = styled(TocLink)`
  font-size: 90%;
  padding-top: 0.25rem;
`;

const gettingStarted = [
  'introduction',
  'why-react-bootstrap',
  'theming',
  'support',
];

const layout = ['grid'];

const components = [
  'alerts',
  'accordion',
  'badge',
  'breadcrumb',
  'buttons',
  'button-group',
  'cards',
  'carousel',
  'close-button',
  'dropdowns',
  'figures',
  'forms',
  'input-group',
  'images',
  'list-group',
  'modal',
  'navs',
  'navbar',
  'offcanvas',
  'overlays',
  'pagination',
  'popovers',
  'progress',
  'spinners',
  'table',
  'tabs',
  'tooltips',
  'toasts',
];

const utilities = ['transitions', 'ratio', 'react-overlays'];

// We need to configure this
function attachSearch(ref) {
  if (ref && window)
    import('docsearch.js').then(({ default: docsearch }) => {
      docsearch({
        apiKey: '00f98b765b687b91399288e7c4c68ce1',
        indexName: 'react_bootstrap_v4',
        inputSelector: `#${ref.id}`,
        debug: process.env.NODE_ENV !== 'production', // Set debug to true if you want to inspect the dropdown
      });
    });
}

function NavSection({ heading, location: { pathname }, items, path }) {
  let active = pathname.startsWith(path);
  return (
    <>
      <TocLink
        active={active}
        href={items ? `${path}/${items[0]}/` : `${path}/`}
        className={classNames(
          'js-search-toc-item',
          active && 'js-search-active',
        )}
      >
        {heading}
      </TocLink>

      {items && active && (
        <Nav activeKey={pathname} onSelect={() => {}} className="d-block">
          {items.map((name) => (
            <Nav.Item key={`${path}/${name}/`}>
              <TocSubLink href={`${path}/${name}/`}>
                {startCase(name.toLowerCase()).replace(
                  'React Bootstrap',
                  'React-Bootstrap',
                )}
              </TocSubLink>
            </Nav.Item>
          ))}
        </Nav>
      )}
    </>
  );
}

class SideNav extends React.Component {
  state = { collapsed: false };

  handleCollapse = () => {
    this.setState((s) => ({ collapsed: !s.collapsed }));
  };

  render() {
    const { location, ...props } = this.props;
    return (
      <SidePanel {...props}>
        <form className="py-3 d-flex align-items-center">
          <FormControl
            id="docs-search-input"
            type="text"
            placeholder="Search…"
            ref={attachSearch}
          />
          <MenuButton onClick={this.handleCollapse}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              width="30"
              height="30"
              focusable="false"
            >
              <title>Menu</title>
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeMiterlimit="10"
                d="M4 7h22M4 15h22M4 23h22"
              />
            </svg>
          </MenuButton>
        </form>
        <Collapse in={this.state.collapsed}>
          <OverflowWrapper>
            <TableOfContents role="complementary">
              <NavSection
                heading="Getting started"
                path="/getting-started"
                location={location}
                items={gettingStarted}
              />
              <NavSection
                heading="Layout"
                location={location}
                items={layout}
                path="/layout"
              />
              <NavSection
                heading="Components"
                location={location}
                items={components}
                path="/components"
              />
              <NavSection
                heading="Utilities"
                location={location}
                items={utilities}
                path="/utilities"
              />
              <NavSection
                heading="Migrating"
                location={location}
                path="/migrating"
              />
              <NavSection heading="About" location={location} path="/about" />
            </TableOfContents>
          </OverflowWrapper>
        </Collapse>
      </SidePanel>
    );
  }
}

export default SideNav;
