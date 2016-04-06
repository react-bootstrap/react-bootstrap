import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function FormSection() {
  return (
    <div className="bs-docs-section">
      <h1 className="page-header">
        <Anchor id="forms">Forms</Anchor> <small>FormGroup, FormControl, ControlLabel, Checkbox, Radio, HelpBlock, Form, InputGroup</small>
      </h1>

      <p>The <code>{'<FormControl>'}</code> component renders a form control with Bootstrap styling. The <code>{'<FormGroup>'}</code> component wraps a form control with proper spacing, along with support for a label, help text, and validation state. To ensure accessibility, set <code>controlId</code> on <code>{'<FormGroup>'}</code>, and use <code>{'<ControlLabel>'}</code> for the label.</p>
      <ReactPlayground codeText={Samples.FormBasic} />

      <h3><Anchor id="forms-controls">Supported controls</Anchor></h3>
      <p>Examples of standard form controls supported in an example form layout. Use <code>{'<FormControl>'}</code> for <code>{'<input>'}</code>, <code>{'<textarea>'}</code>, and <code>{'<select>'}</code>. Use <code>{'<Checkbox>'}</code> and <code>{'<Radio>'}</code> for checkboxes and radios respectively, optionally with <code>inline</code> to render multiple on the same line. Use <code>{'<FormControl.Static>'}</code> for static text.</p>
      <ReactPlayground codeText={Samples.FormControls} />

      <h3><Anchor id="forms-inline">Inline forms</Anchor></h3>
      <p>Use <code>{'<Form inline>'}</code> instead of <code>{'<form>'}</code>. JSX strips whitespace between lines, so you will need to manually add spaces. Additionally, Bootstrap assigns inline form controls <code>width: auto</code> by default, so you may need to set custom widths.</p>
      <ReactPlayground codeText={Samples.FormInline} />

      <h3><Anchor id="forms-horizontal">Horizontal forms</Anchor></h3>
      <p>Use <code>{'<Form horizontal>'}</code> instead of <code>{'<form>'}</code>, then use <code>{'<Col>'}</code>s to align labels and controls. Do not use <code>{'<Row>'}</code> here, as <code>{'<FormGroup>'}</code> will already serve as a grid row in a horizontal form.</p>
      <ReactPlayground codeText={Samples.FormHorizontal} />

      <h3><Anchor id="forms-input-addons">Input add-ons</Anchor></h3>
      <p>Wrap your form control in an <code>{'<InputGroup>'}</code>, then use for normal add-ons and for button add-ons. Exotic configurations may require CSS on your side.</p>
      <ReactPlayground codeText={Samples.FormInputAddons} />

      <h3><Anchor id="forms-input-sizes">Input sizes</Anchor></h3>
      <p>Use <code>bsSize</code> on <code>{'<FormGroup>'}</code> or <code>{'<InputGroup>'}</code> to change the size of inputs. It also works with add-ons and most other options.</p>
      <ReactPlayground codeText={Samples.FormInputSizes} />

      <h3><Anchor id="forms-validation">Validation states</Anchor></h3>
      <p>Set <code>validationState</code> to one of <code>'success'</code>, <code>'warning'</code> or <code>'error'</code>. Add <code>{'<FormControl.Feedback>'}</code> for a feedback icon.</p>
      <ReactPlayground codeText={Samples.FormValidation} />

      <h3><Anchor id="forms-props">Props</Anchor></h3>

      <h4><Anchor id="forms-props-form-group">FormGroup</Anchor></h4>
      <PropTable component="FormGroup" />

      <h4><Anchor id="forms-props-form-control">FormControl</Anchor></h4>
      <PropTable component="FormControl" />

      <h4><Anchor id="forms-props-form-group">ControlLabel</Anchor></h4>
      <PropTable component="ControlLabel" />

      <h4><Anchor id="forms-props-checkbox">Checkbox</Anchor></h4>
      <PropTable component="Checkbox" />

      <h4><Anchor id="forms-props-radio">Radio</Anchor></h4>
      <PropTable component="Radio" />

      <h4><Anchor id="forms-props-form-control-static">FormControl.Static</Anchor></h4>
      <PropTable component="FormControlStatic" />

      <h4><Anchor id="forms-props-help-block">HelpBlock</Anchor></h4>
      <PropTable component="HelpBlock" />

      <h4><Anchor id="forms-props-form">Form</Anchor> <small>(only needed for horizontal or inline forms)</small></h4>
      <PropTable component="Form" />

      <h4><Anchor id="forms-props-form-control-feedback">FormControl.Feedback</Anchor></h4>
      <PropTable component="FormControlFeedback" />
    </div>
  );
}
