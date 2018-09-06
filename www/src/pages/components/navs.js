import { graphql } from 'gatsby';
import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import NavBasic from '../../examples/NavBasic';
import NavDropdown from '../../examples/NavDropdown';
import NavStacked from '../../examples/NavStacked';
import NavJustified from '../../examples/NavJustified';

export default function NavSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="navs">Navs</Anchor> <small>Nav, NavItem</small>
      </h2>

      <p>
        Navs come in two styles, <code>pills</code> and <code>tabs</code>.
        Disable a tab by adding <code>disabled</code>.
      </p>
      <ReactPlayground codeText={NavBasic} />

      <h3>
        <Anchor id="navs-dropdown">Dropdown</Anchor>
      </h3>
      <p>
        Add dropdowns using the <code>NavDropdown</code> component.
      </p>
      <ReactPlayground codeText={NavDropdown} />

      <h3>
        <Anchor id="navs-stacked">Stacked</Anchor>
      </h3>
      <p>
        They can also be <code>stacked</code> vertically.
      </p>
      <ReactPlayground codeText={NavStacked} />

      <h3>
        <Anchor id="navs-justified">Justified</Anchor>
      </h3>
      <p>
        They can be <code>justified</code> to take the full width of their
        parent.
      </p>
      <ReactPlayground codeText={NavJustified} />

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
    </div>
  );
}

export const query = graphql`
  query NavQuery {
    Nav: componentMetadata(displayName: { eq: "Nav" }) {
      ...PropTable_metadata
    }
    NavItem: componentMetadata(displayName: { eq: "NavItem" }) {
      ...PropTable_metadata
    }
  }
`;
