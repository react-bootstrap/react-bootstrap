import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function BreadcrumbSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="breadcrumbs">Breadcrumbs</Anchor> <small>Breadcrumb, Breadcrumb.Item</small>
      </h2>

      <p>Breadcrumbs are used to indicate the current page's location. Add <code>active</code> attribute to active <code>Breadcrumb.Item</code>.</p>
      <p>Do not set both <code>active</code> and <code>href</code> attributes. <code>active</code> overrides <code>href</code> and <code>span</code> element is rendered instead of <code>a</code>.</p>

      <h3><Anchor id="breadcrumbs-example">Breadcrumbs Example</Anchor></h3>
      <ReactPlayground codeText={Samples.Breadcrumb} />

      <h3><Anchor id="breadcrumbs-props">Props</Anchor></h3>
      <p><code>Breadcrumb</code> component itself doesn't have any specific public properties</p>

      <h4><Anchor id="breadcrumbs-props-breadcrumb-item">Breadcrumb.Item</Anchor></h4>
      <PropTable component="BreadcrumbItem"/>
    </div>
  );
}
