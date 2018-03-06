import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';
import Callout from '../../components/Callout';

import NavBasic from '../../examples/Nav/Basic';
import NavDropdown from '../../examples/Nav/Dropdown';
import NavStacked from '../../examples/Nav/Stacked';
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
      displayName
      ...PropTable_metadata
    }
    NavItem: componentMetadata(displayName: { eq: "NavItem" }) {
      displayName
      ...PropTable_metadata
    }
  }
`;
