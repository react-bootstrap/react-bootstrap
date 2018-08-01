import startCase from 'lodash/startCase';
import React from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import FormControl from 'react-bootstrap/lib/FormControl';

import { styled } from 'css-literal-loader/styled';

const SidePanel = styled('div')`
  @import '../css/theme';

  composes: d-flex flex-column from global;

  background-color: #f7f7f7;
  position: sticky;
  top: 4rem;
  height: calc(100vh - 4rem);
  background-color: #f7f7f7;
  overflow: hidden;
  border-right: 1px solid $divider;

  & > * + * {
    border-top: 1px solid $divider;
  }
`;

const TableOfContents = styled('div')`
  @import '../css/theme';

  composes: pt-2 pb-4 d-flex flex-column h-100 from global;

  overflow: auto;
  margin-right: -40px;
  padding-right: calc(40px + 1rem);
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
    color: $subtleOnDark;
  }
`;

const TocSubLink = styled(TocLink)`
  font-size: 90%;
  padding-top: 0.25rem;
`;

const gettingStarted = ['introduction', 'support'];

const layout = ['grid', 'media'];

const components = [
  'alerts',
  'badge',
  'breadcrumb',
  'buttons',
  'button-group',
  'cards',
  'carousel',
  'dropdowns',
  'forms',
  'input-group',
  'glyphicons',
  'images',
  'figures',
  'jumbotron',
  'list-group',
  'modal',
  'navs',
  'navbar',
  'overlays',
  'pagination',
  'panel',
  'popovers',
  'progress',
  'table',
  'tabs',
  'tooltips',
];

const utilities = ['custom-styles', 'transitions', 'responsive-embed'];

function NavSection({ heading, location: { pathname }, items, path }) {
  let active = pathname.startsWith(path);
  return (
    <>
      <TocLink active={active} href={`${path}/${items[0]}/`}>
        {heading}
      </TocLink>

      {active && (
        <Nav activeKey={pathname} className="d-block">
          {items.map(name => (
            <Nav.Item key={`${path}/${name}/`}>
              <TocSubLink href={`${path}/${name}/`}>
                {startCase(name.toLowerCase())}
              </TocSubLink>
            </Nav.Item>
          ))}
        </Nav>
      )}
    </>
  );
}

function SideNav({ location }) {
  return (
    <SidePanel>
      <header className="py-3 px-3">
        <FormControl type="text" placeholder="Search…" />
      </header>
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
      </TableOfContents>
    </SidePanel>
  );
}

export default SideNav;
