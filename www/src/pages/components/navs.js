import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';
import Callout from '../../components/Callout';
import CodeBlock from '../../components/CodeBlock';

import NavAlignement from '../../examples/Nav/Alignment';
import NavBasic from '../../examples/Nav/Basic';
import NavDropdown from '../../examples/Nav/Dropdown';
import NavStacked from '../../examples/Nav/Stacked';
import NavFill from '../../examples/Nav/Fill';
import NavJustified from '../../examples/Nav/Justified';
import NavDropdownImpl from '../../examples/Nav/DropdownImpl';

export default function NavSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="navs">Base Nav</Anchor>
      </h2>

      <p>
        Navigation bits in Bootstrap all share a general <code>Nav</code>{' '}
        component and styles. Swap <code>variant</code>s to switch between each
        style. The base <code>Nav</code> component is built with flexbox and
        provide a strong foundation for building all types of navigation
        components.
      </p>
      <Callout theme="info">
        The basic, variant-less, <code>Nav</code> component does not include any{' '}
        <code>active</code> prop styling!
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
        <Anchor id="navs-dropdown">Using dropdowns</Anchor>
      </h3>
      <p>
        You can mix and match the Dropdown components with the NavLink and
        NavItem components to create a Dropdown that plays well in a Nav
        component
      </p>
      <CodeBlock codeText={NavDropdownImpl} />

      <p>
        The above demostrates how flexible the component model can be. But if
        you didn't want to roll your own versions we've included a
        straight-forward <code>NavDropdown</code> that works for most cases.{' '}
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
    NavDropdown: componentMetadata(displayName: { eq: "NavDropdown" }) {
      displayName
      ...PropTable_metadata
    }
  }
`;
