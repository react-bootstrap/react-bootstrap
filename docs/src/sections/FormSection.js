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

      <p>
        The <code>{'<FormControl>'}</code> component renders a form control with Bootstrap styling. The <code>{'<FormGroup>'}</code> component wraps a form control with proper spacing, along with support for a label, help text, and validation state. To ensure accessibility, set <code>controlId</code> on <code>{'<FormGroup>'}</code>, and use <code>{'<ControlLabel>'}</code> for the label.
      </p>

      <ReactPlayground codeText={Samples.FormBasic} />

      <p>
        The <code>{'<FormControl>'}</code> component directly renders the <code>{'<input>'}</code> or other specified component. If you need to access the value of an uncontrolled <code>{'<FormControl>'}</code>, attach a <code>ref</code> to it as you would with an uncontrolled input, then call <code>ReactDOM.findDOMNode(ref)</code> to get the DOM node. You can then interact with that node as you would with any other uncontrolled input.
      </p>
      <p>
        If your application contains a large number of form groups, we recommend building a higher-level component encapsulating a complete field group that renders the label, the control, and any other necessary components. We don't provide this out-of-the-box, because the composition of those field groups is too specific to an individual application to admit a good one-size-fits-all solution.
      </p>

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
