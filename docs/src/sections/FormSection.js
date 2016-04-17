import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function FormSection() {
  return (
    <div className="bs-docs-section">
      <h1 className="page-header">
        <Anchor id="forms">Forms</Anchor> <small>FormGroup, FormControl, ControlLabel</small>
      </h1>

      <p>The <code>{'<FormControl>'}</code> component renders a form control with Bootstrap styling. The <code>{'<FormGroup>'}</code> component wraps a form control with proper spacing, along with support for a label, help text, and validation state. To ensure accessibility, set <code>controlId</code> on <code>{'<FormGroup>'}</code>, and use <code>{'<ControlLabel>'}</code> for the label.</p>
      <ReactPlayground codeText={Samples.FormBasic} />

      <h3><Anchor id="forms-props">Props</Anchor></h3>

      <h4><Anchor id="forms-props-form-group">FormGroup</Anchor></h4>
      <PropTable component="FormGroup" />

      <h4><Anchor id="forms-props-form-control">FormControl</Anchor></h4>
      <PropTable component="FormControl" />

      <h4><Anchor id="forms-props-control-label">ControlLabel</Anchor></h4>
      <PropTable component="ControlLabel" />
    </div>
  );
}
