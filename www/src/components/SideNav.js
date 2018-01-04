import classNames from 'classnames';
import startCase from 'lodash/startCase';
import React from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

const gettingStarted = ['introduction', 'support'];

const layout = ['grid', 'media'];

const components = [
  'alerts',
  'badge',
  'breadcrumb',
  'buttons',
  'button-group',
  'carousel',
  'dropdowns',
  'forms',
  'glyphicons',
  'images',
  'jumbotron',
  'label',
  'list-group',
  'modal',
  'navs',
  'navbar',
  'overlays',
  'page-header',
  'pagination',
  'panel',
  'popovers',
  'progress',
  'table',
  'tabs',
  'tooltips',
  'well'
];

const utilities = ['custom-styles', 'transitions', 'responsive-embed'];

function NavSection({ heading, location, items, path }) {
  let active = location.pathname.startsWith(path);
  return (
    <div className={classNames(active && 'bs-sidebar-section-active')}>
      <div className="bs-sidebar-section-heading">
        <a href={`${path}/${items[0]}/`}>{heading}</a>
      </div>

      {active && (
        <Nav className="bs-docs-sidenav" activeHref={location.pathname}>
          {items.map(name => (
            <NavItem key={`${path}/${name}/`} href={`${path}/${name}/`}>
              {startCase(name.toLowerCase())}
            </NavItem>
          ))}
        </Nav>
      )}
    </div>
  );
}

function SideNav({ location }) {
  return (
    <div className="bs-docs-sidebar" role="complementary">
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
    </div>
  );
}

export default SideNav;
