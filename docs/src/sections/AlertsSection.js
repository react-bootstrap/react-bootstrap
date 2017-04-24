import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function AlertsSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="alerts">Alert messages</Anchor> <small>Alert</small>
      </h2>

      <p>Basic alert styles.</p>
      <ReactPlayground codeText={Samples.AlertBasic} />

      <h3><Anchor id="alerts-closeable">Closeable alerts</Anchor></h3>
      <p>just pass in a <code>onDismiss</code> function.</p>
      <ReactPlayground codeText={Samples.AlertDismissable} />

      <h3><Anchor id="alert-props">Props</Anchor></h3>
      <PropTable component="Alert"/>
    </div>
  );
}
