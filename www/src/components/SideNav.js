import classNames from 'classnames';
import startCase from 'lodash/startCase';
import React from 'react';
import Nav from 'react-bootstrap/lib/Nav';

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
  'tooltips'
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
        <Nav
          activeKey={location.pathname}
          className="bs-docs-sidenav flex-column"
        >
          {items.map(name => (
            <Nav.Item key={`${path}/${name}/`}>
              <Nav.Link href={`${path}/${name}/`}>
                {startCase(name.toLowerCase())}
              </Nav.Link>
            </Nav.Item>
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
