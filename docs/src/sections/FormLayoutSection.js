import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function FormLayoutSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="forms-layout">Form layout</Anchor> <small>Form</small>
      </h2>

      <h3><Anchor id="forms-inline">Inline forms</Anchor></h3>
      <p>Use <code>{'<Form inline>'}</code> instead of <code>{'<form>'}</code>. JSX strips whitespace between lines, so you will need to manually add spaces. Additionally, Bootstrap assigns inline form controls <code>width: auto</code> by default, so you may need to set custom widths.</p>
      <ReactPlayground codeText={Samples.FormInline} />

      <h3><Anchor id="forms-horizontal">Horizontal forms</Anchor></h3>
      <p>Use <code>{'<Form horizontal>'}</code> instead of <code>{'<form>'}</code>, then use <code>{'<Col>'}</code>s to align labels and controls. Do not use <code>{'<Row>'}</code> here, as <code>{'<FormGroup>'}</code> will already serve as a grid row in a horizontal form.</p>
      <ReactPlayground codeText={Samples.FormHorizontal} />

      <h3><Anchor id="forms-layout-props">Props</Anchor></h3>

      <h4><Anchor id="forms-props-form">Form</Anchor> <small>(only needed for horizontal or inline forms)</small></h4>
      <PropTable component="Form" />
    </div>
  );
}
