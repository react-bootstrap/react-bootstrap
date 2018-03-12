import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';
import Callout from '../../components/Callout';

import NavAlignement from '../../examples/Nav/Alignment';
import NavBasic from '../../examples/Nav/Basic';
import NavDropdown from '../../examples/Nav/Dropdown';
import NavStacked from '../../examples/Nav/Stacked';
import NavFill from '../../examples/Nav/Fill';
import NavJustified from '../../examples/Nav/Justified';

export default function NavSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="navs">Base Nav</Anchor>{' '}
        <small>Nav, Nav.Item, Nav.Link</small>
      </h2>

      <p>
        Navs come in two styles, <code>pills</code> and <code>tabs</code>.
        Disable a tab by adding <code>disabled</code>.
      </p>
      <Callout theme="info">
        The base <code>.nav</code> component does not include any{' '}
        <code>.active</code> styling!
      </Callout>
      <ReactPlayground codeText={NavBasic} />
      <h3>
        <Anchor id="navs-alignment">Alignment and orientation</Anchor>
      </h3>
      <p>
        You can control the the direction and orientation of the{' '}
        <code>Nav</code> by making use of the{' '}
        <a href="https://getbootstrap.com/docs/4.0/layout/grid/#horizontal-alignment">
          flexbox layout
        </a>{' '}
        utility classes. By default, navs are left-aligned, but that is easily
        changed to center or right-aligned.
      </p>
      <ReactPlayground codeText={NavAlignement} />

      <h3>
        <Anchor id="navs-stacked">Vertical</Anchor>
      </h3>
      <p>
        Create stacked navs by changing the flex item direction with the{' '}
        <code>.flex-column</code> class, or your own css. You can even use the
        responsive versions to stack in some viewports but not others (e.g.{' '}
        <code>.flex-sm-column</code>).
      </p>
      <ReactPlayground codeText={NavStacked} />

      <h3>
        <Anchor id="navs-justified">Fill and justify</Anchor>
      </h3>
      <p>
        Force the contents of your nav to extend the full available width. To
        proportionately fill the space use <code>fill</code>. Notice that the
        nav is the entire width but each nav item is a different size.
      </p>
      <ReactPlayground codeText={NavFill} />

      <p>
        If you want each NavItem to be the same size use <code>justify</code>.
      </p>

      <ReactPlayground codeText={NavJustified} />

      <h3>
        <Anchor id="navs-dropdown">Dropdown</Anchor>
      </h3>
      <p>
        Add dropdowns using the <code>NavDropdown</code> component.
      </p>
      <ReactPlayground codeText={NavDropdown} />

      <h3>
        <Anchor id="navs-props">Props</Anchor>
      </h3>

      <h4>
        <Anchor id="navs-props-nav">Nav</Anchor>
        <LinkToSource component={data.Nav.displayName} />
      </h4>
      <PropTable metadata={data.Nav} />

      <h4>
        <Anchor id="navs-props-navitem">NavItem</Anchor>
        <LinkToSource component={data.NavItem.displayName} />
      </h4>
      <PropTable metadata={data.NavItem} />
      <h4>
        <Anchor id="navs-props-navlink">NavLink</Anchor>
        <LinkToSource component={data.NavLink.displayName} />
      </h4>
      <PropTable metadata={data.NavLink} />
    </div>
  );
}

export const query = graphql`
  query NavQuery {
    Nav: componentMetadata(displayName: { eq: "Nav" }) {
      displayName
      ...PropTable_metadata
    }
    NavItem: componentMetadata(displayName: { eq: "NavItem" }) {
      displayName
      ...PropTable_metadata
    }
    NavLink: componentMetadata(displayName: { eq: "NavLink" }) {
      displayName
      ...PropTable_metadata
    }
  }
`;
