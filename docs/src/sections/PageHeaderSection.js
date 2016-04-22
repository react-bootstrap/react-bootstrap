import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function PageHeaderSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="page-header">Page header</Anchor> <small>PageHeader</small>
      </h2>

      <p>A simple shell for an <code>h1</code> to appropriately space out and segment sections of content on a page. It can utilize the <code>h1</code>&#8217;s default <code>small</code> element, as well as most other components (with additional styles).</p>
      <ReactPlayground codeText={Samples.PageHeader} />

      <h3><Anchor id="page-header-props">Props</Anchor></h3>
      <PropTable component="PageHeader"/>
    </div>
  );
}
