import startCase from 'lodash/startCase';
import React from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import FormControl from 'react-bootstrap/lib/FormControl';

import { styled } from 'css-literal-loader/styled';
import Button from 'react-bootstrap/lib/Button';
import Collapse from 'react-bootstrap/lib/Collapse';
import withProps from 'recompose/withProps';

const MenuButton = withProps({ variant: 'link' })(
  styled(Button)`
    composes: p-0 d-md-none ml-3 from global;

    line-height: 1;
    color: #212529;
  `,
);

const SidePanel = styled('div')`
  @import '../css/theme';

  composes: d-flex flex-column from global;

  background-color: #f7f7f7;

  @include media-breakpoint-up(md) {
    position: sticky;
    top: 4rem;
    height: calc(100vh - 4rem);
    background-color: #f7f7f7;
    overflow: hidden;
    border-right: 1px solid $divider;
  }

  & > * + * {
    border-top: 1px solid $divider;
  }
`;

const TableOfContents = styled('nav')`
  @import '../css/theme';

  composes: pt-2 pb-4 from global;

  @include media-breakpoint-up(md) {
    display: block !important;
    height: 100% !important;
    overflow: auto;
    margin-right: -40px;
    padding-right: calc(40px + 1rem);
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
    color: $subtleOnDark;
  }
`;

const TocSubLink = styled(TocLink)`
  font-size: 90%;
  padding-top: 0.25rem;
`;

const gettingStarted = ['introduction', 'theming', 'support'];

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
  'images',
  'figures',
  'jumbotron',
  'list-group',
  'modal',
  'navs',
  'navbar',
  'overlays',
  'pagination',
  'popovers',
  'progress',
  'table',
  'tabs',
  'tooltips',
];

const utilities = ['transitions', 'responsive-embed', 'react-overlays'];

function NavSection({ heading, location: { pathname }, items, path }) {
  let active = pathname.startsWith(path);
  return (
    <>
      <TocLink active={active} href={`${path}/${items[0]}/`}>
        {heading}
      </TocLink>

      {active && (
        <Nav activeKey={pathname} onSelect={() => {}} className="d-block">
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

class SideNav extends React.Component {
  state = { collapsed: false };

  handleCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    const { location, ...props } = this.props;
    return (
      <SidePanel {...props}>
        <form className="py-3 d-flex align-items-center">
          <FormControl type="text" placeholder="Search…" />
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
        </Collapse>
      </SidePanel>
    );
  }
}

export default SideNav;
