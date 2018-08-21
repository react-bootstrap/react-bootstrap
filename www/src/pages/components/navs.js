import { graphql } from 'gatsby';
import React from 'react';

import Heading from '../../components/Heading';
import Callout from '../../components/Callout';
import CodeBlock from '../../components/CodeBlock';
import ComponentApi from '../../components/ComponentApi';
import ReactPlayground from '../../components/ReactPlayground';
import NavAlignement from '../../examples/Nav/Alignment';
import NavBasic from '../../examples/Nav/Basic';
import NavDropdown from '../../examples/Nav/Dropdown';
import NavDropdownImpl from '../../examples/Nav/DropdownImpl';
import NavFill from '../../examples/Nav/Fill';
import NavJustified from '../../examples/Nav/Justified';
import NavStacked from '../../examples/Nav/Stacked';
import Tabs from '../../examples/Nav/Tabs';
import Pills from '../../examples/Nav/Pills';
import withLayout from '../../withLayout';

export default withLayout(function NavSection({ data }) {
  return (
    <>
      <Heading h="1" id="navs">
        Base Nav
      </Heading>

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

      <Heading h="2" id="navs-alignment">
        Alignment and orientation
      </Heading>
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

      <Heading h="3" id="navs-stacked">
        Vertical
      </Heading>
      <p>
        Create stacked navs by changing the flex item direction with the{' '}
        <code>.flex-column</code> class, or your own css. You can even use the
        responsive versions to stack in some viewports but not others (e.g.{' '}
        <code>.flex-sm-column</code>).
      </p>
      <ReactPlayground codeText={NavStacked} />

      <Heading h="3" id="navs-tabs">
        Tabs
      </Heading>
      <p>
        Visually represent nav items as "tabs". This style pairs nicely with
        tabbable regions created by our <a href="../tabs/">Tab components</a>
      </p>
      <ReactPlayground codeText={Tabs} />

      <Heading h="3" id="navs-pill">
        Pills
      </Heading>

      <p>An alternative visual variant.</p>
      <ReactPlayground codeText={Pills} />

      <Heading h="3" id="navs-justified">
        Fill and justify
      </Heading>
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

      <Heading h="2" id="navs-dropdown">
        Using dropdowns
      </Heading>
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

      <Heading h="2" id="navs-props">
        API
      </Heading>

      <ComponentApi metadata={data.Nav} />
      <ComponentApi metadata={data.NavItem} />
      <ComponentApi metadata={data.NavLink} />
    </>
  );
});

export const query = graphql`
  query NavQuery {
    Nav: componentMetadata(displayName: { eq: "Nav" }) {
      displayName
      ...ComponentApi_metadata
    }
    NavItem: componentMetadata(displayName: { eq: "NavItem" }) {
      displayName
      ...ComponentApi_metadata
    }
    NavLink: componentMetadata(displayName: { eq: "NavLink" }) {
      displayName
      ...ComponentApi_metadata
    }
    NavDropdown: componentMetadata(displayName: { eq: "NavDropdown" }) {
      displayName
      ...ComponentApi_metadata
    }
  }
`;
