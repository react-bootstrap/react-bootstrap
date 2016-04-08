import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function FormValidationSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="forms-validation">Validation states</Anchor> <small>FormControl.Feedback</small>
      </h2>

      <p>Set <code>validationState</code> to one of <code>'success'</code>, <code>'warning'</code> or <code>'error'</code>. Add <code>{'<FormControl.Feedback>'}</code> for a feedback icon.</p>
      <ReactPlayground codeText={Samples.FormValidation} />

      <h3><Anchor id="forms-validation-props">Props</Anchor></h3>

      <h4><Anchor id="forms-props-form-control-feedback">FormControl.Feedback</Anchor></h4>
      <PropTable component="FormControlFeedback" />
    </div>
  );
}
