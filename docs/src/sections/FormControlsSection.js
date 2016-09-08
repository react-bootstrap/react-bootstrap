import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function FormControlsSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="forms-controls">Supported controls</Anchor> <small>Checkbox, Radio, FormControl.Static, HelpBlock</small>
      </h2>

      <p>Examples of standard form controls supported in an example form layout, using a custom <code>{'<FieldGroup>'}</code> component. Use <code>{'<FormControl>'}</code> for <code>{'<input>'}</code>, <code>{'<textarea>'}</code>, and <code>{'<select>'}</code>. Use <code>{'<Checkbox>'}</code> and <code>{'<Radio>'}</code> for checkboxes and radios respectively, optionally with <code>inline</code> to render multiple on the same line. Use <code>{'<FormControl.Static>'}</code> for static text.</p>
      <ReactPlayground codeText={Samples.FormControls} />

      <h3><Anchor id="forms-controls-props">Props</Anchor></h3>

      <h4><Anchor id="forms-props-checkbox">Checkbox</Anchor></h4>
      <PropTable component="Checkbox" />

      <h4><Anchor id="forms-props-radio">Radio</Anchor></h4>
      <PropTable component="Radio" />

      <h4><Anchor id="forms-props-form-control-static">FormControl.Static</Anchor></h4>
      <PropTable component="FormControlStatic" />

      <h4><Anchor id="forms-props-help-block">HelpBlock</Anchor></h4>
      <PropTable component="HelpBlock" />
    </div>
  );
}
