import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function NavSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="navs">Navs</Anchor> <small>Nav, NavItem</small>
      </h2>

      <p>Navs come in two styles, <code>pills</code> and <code>tabs</code>. Disable a tab by adding <code>disabled</code>.</p>
      <ReactPlayground codeText={Samples.NavBasic} />

      <h3><Anchor id="navs-dropdown">Dropdown</Anchor></h3>
      <p>Add dropdowns using the <code>NavDropdown</code> component.</p>
      <ReactPlayground codeText={Samples.NavDropdown} />

      <h3><Anchor id="navs-stacked">Stacked</Anchor></h3>
      <p>They can also be <code>stacked</code> vertically.</p>
      <ReactPlayground codeText={Samples.NavStacked} />

      <h3><Anchor id="navs-justified">Justified</Anchor></h3>
      <p>They can be <code>justified</code> to take the full width of their parent.</p>
      <ReactPlayground codeText={Samples.NavJustified} />

      <h3><Anchor id="navs-props">Props</Anchor></h3>

      <h4><Anchor id="navs-props-nav">Nav</Anchor></h4>
      <PropTable component="Nav"/>

      <h4><Anchor id="navs-props-navitem">NavItem</Anchor></h4>
      <PropTable component="NavItem"/>
    </div>
  );
}
