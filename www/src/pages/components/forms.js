import { graphql } from 'gatsby';
import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import FormBasic from '../../examples/FormBasic';
import FormControls from '../../examples/FormControls';
import FormInline from '../../examples/FormInline';
import FormHorizontal from '../../examples/FormHorizontal';
import FormInputSizes from '../../examples/FormInputSizes';
import FormInputAddons from '../../examples/FormInputAddons';
import FormValidation from '../../examples/FormValidation';

export default function FormControlsSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="forms">Forms</Anchor>{' '}
        <small>FormGroup, FormControl, ControlLabel</small>
      </h2>

      <p>
        The <code>{'<FormControl>'}</code> component renders a form control with
        Bootstrap styling. The <code>{'<FormGroup>'}</code> component wraps a
        form control with proper spacing, along with support for a label, help
        text, and validation state. To ensure accessibility, set{' '}
        <code>controlId</code> on <code>{'<FormGroup>'}</code>, and use{' '}
        <code>{'<ControlLabel>'}</code> for the label.
      </p>

      <ReactPlayground codeText={FormBasic} />

      <p>
        The <code>{'<FormControl>'}</code> component directly renders the{' '}
        <code>{'<input>'}</code> or other specified component. If you need to
        access the value of an uncontrolled <code>{'<FormControl>'}</code>,
        attach a <code>ref</code> to it as you would with an uncontrolled input,
        then call <code>ReactDOM.findDOMNode(ref)</code> to get the DOM node.
        You can then interact with that node as you would with any other
        uncontrolled input.
      </p>
      <p>
        If your application contains a large number of form groups, we recommend
        building a higher-level component encapsulating a complete field group
        that renders the label, the control, and any other necessary components.
        We don't provide this out-of-the-box, because the composition of those
        field groups is too specific to an individual application to admit a
        good one-size-fits-all solution.
      </p>

      <h3>
        <Anchor id="forms-props">Props</Anchor>
      </h3>

      <h4>
        <Anchor id="forms-props-form-group">FormGroup</Anchor>
        <LinkToSource component={data.FormGroup.displayName} />
      </h4>
      <PropTable metadata={data.FormGroup} />

      <h4>
        <Anchor id="forms-props-form-control">FormControl</Anchor>
        <LinkToSource component={data.FormControl.displayName} />
      </h4>
      <PropTable metadata={data.FormControl} />

      <h4>
        <Anchor id="forms-props-control-label">ControlLabel</Anchor>
        <LinkToSource component={data.ControlLabel.displayName} />
      </h4>
      <PropTable metadata={data.ControlLabel} />

      <h2 className="page-header">
        <Anchor id="forms-controls">Supported controls</Anchor>{' '}
        <small>Checkbox, Radio, FormControl.Static, HelpBlock</small>
      </h2>

      <p>
        Examples of standard form controls supported in an example form layout,
        using a custom <code>{'<FieldGroup>'}</code> component. Use{' '}
        <code>{'<FormControl>'}</code> for <code>{'<input>'}</code>,{' '}
        <code>{'<textarea>'}</code>, and <code>{'<select>'}</code>. Use{' '}
        <code>{'<Checkbox>'}</code> and <code>{'<Radio>'}</code> for checkboxes
        and radios respectively, optionally with <code>inline</code> to render
        multiple on the same line. Use <code>{'<FormControl.Static>'}</code> for
        static text.
      </p>
      <ReactPlayground codeText={FormControls} />

      <h3>
        <Anchor id="forms-controls-props">Props</Anchor>
      </h3>

      <h4>
        <Anchor id="forms-props-checkbox">Checkbox</Anchor>
        <LinkToSource component={data.Checkbox.displayName} />
      </h4>
      <PropTable metadata={data.Checkbox} />

      <h4>
        <Anchor id="forms-props-radio">Radio</Anchor>
        <LinkToSource component={data.Radio.displayName} />
      </h4>
      <PropTable metadata={data.Radio} />

      <h4>
        <Anchor id="forms-props-form-control-static">FormControl.Static</Anchor>
        <LinkToSource component={data.FormControlStatic.displayName} />
      </h4>
      <PropTable metadata={data.FormControlStatic} />

      <h4>
        <Anchor id="forms-props-help-block">HelpBlock</Anchor>
        <LinkToSource component={data.HelpBlock.displayName} />
      </h4>
      <PropTable metadata={data.HelpBlock} />

      <h2 className="page-header">
        <Anchor id="forms-layout">Form layout</Anchor> <small>Form</small>
      </h2>

      <h3>
        <Anchor id="forms-inline">Inline forms</Anchor>
      </h3>
      <p>
        Use <code>{'<Form inline>'}</code> instead of <code>{'<form>'}</code>.
        JSX strips whitespace between lines, so you will need to manually add
        spaces. Additionally, Bootstrap assigns inline form controls{' '}
        <code>width: auto</code> by default, so you may need to set custom
        widths.
      </p>
      <ReactPlayground codeText={FormInline} />

      <h3>
        <Anchor id="forms-horizontal">Horizontal forms</Anchor>
      </h3>
      <p>
        Use <code>{'<Form horizontal>'}</code> instead of{' '}
        <code>{'<form>'}</code>, then use <code>{'<Col>'}</code>s to align
        labels and controls. Do not use <code>{'<Row>'}</code> here, as{' '}
        <code>{'<FormGroup>'}</code> will already serve as a grid row in a
        horizontal form.
      </p>
      <ReactPlayground codeText={FormHorizontal} />

      <h3>
        <Anchor id="forms-layout-props">Props</Anchor>
      </h3>

      <h4>
        <Anchor id="forms-props-form">Form</Anchor>
        <LinkToSource component={data.Form.displayName} />
        <small>(only needed for horizontal or inline forms)</small>
      </h4>
      <PropTable metadata={data.Form} />

      <h2 className="page-header">
        <Anchor id="forms-input-groups">Input groups</Anchor>
        <small>InputGroup, InputGroup.Addon, InputGroup.Button</small>
      </h2>

      <h3>
        <Anchor id="forms-input-addons">Input add-ons</Anchor>
      </h3>
      <p>
        Wrap your form control in an <code>{'<InputGroup>'}</code>, then use for
        normal add-ons and for button add-ons. Exotic configurations may require
        CSS on your side.
      </p>
      <ReactPlayground codeText={FormInputAddons} />

      <h3>
        <Anchor id="forms-input-sizes">Input sizes</Anchor>
      </h3>
      <p>
        Use <code>bsSize</code> on <code>{'<FormGroup>'}</code> or{' '}
        <code>{'<InputGroup>'}</code> to change the size of inputs. It also
        works with add-ons and most other options.
      </p>
      <ReactPlayground codeText={FormInputSizes} />

      <h3>
        <Anchor id="forms-input-groups-props">Props</Anchor>
      </h3>

      <h4>
        <Anchor id="forms-props-input-group">InputGroup</Anchor>
        <LinkToSource component={data.InputGroup.displayName} />
      </h4>
      <PropTable metadata={data.InputGroup} />

      <h4>
        <Anchor id="forms-props-input-group-addon">InputGroup.Addon</Anchor>
        <LinkToSource component={data.InputGroupAddon.displayName} />
      </h4>
      <PropTable metadata={data.InputGroupAddon} />

      <h4>
        <Anchor id="forms-props-input-group-button">InputGroup.Button</Anchor>
        <LinkToSource component={data.InputGroupButton.displayName} />
      </h4>
      <PropTable metadata={data.InputGroupButton} />

      <h2 className="page-header">
        <Anchor id="forms-validation">Validation states</Anchor>
        <small>FormControl.Feedback</small>
      </h2>

      <p>
        Set <code>validationState</code> to one of <code>'success'</code>,{' '}
        <code>'warning'</code> or <code>'error'</code> to show validation state.
        Set <code>validationState</code> to <code>null</code> (or{' '}
        <code>undefined</code>) to hide validation state. Add{' '}
        <code>{'<FormControl.Feedback>'}</code> for a feedback icon when
        validation state is set.
      </p>
      <ReactPlayground codeText={FormValidation} />

      <h3>
        <Anchor id="forms-validation-props">Props</Anchor>
      </h3>

      <h4>
        <Anchor id="forms-props-form-control-feedback">
          FormControl.Feedback
        </Anchor>
        <LinkToSource component={data.FormControlFeedback.displayName} />
      </h4>
      <PropTable metadata={data.FormControlFeedback} />
    </div>
  );
}

export const query = graphql`
  query FormQuery {
    Form: componentMetadata(displayName: { eq: "Form" }) {
      ...PropTable_metadata
    }
    FormGroup: componentMetadata(displayName: { eq: "FormGroup" }) {
      ...PropTable_metadata
    }
    FormControl: componentMetadata(displayName: { eq: "FormControl" }) {
      ...PropTable_metadata
    }
    ControlLabel: componentMetadata(displayName: { eq: "ControlLabel" }) {
      ...PropTable_metadata
    }
    Checkbox: componentMetadata(displayName: { eq: "Checkbox" }) {
      ...PropTable_metadata
    }
    Radio: componentMetadata(displayName: { eq: "Radio" }) {
      ...PropTable_metadata
    }
    FormControlStatic: componentMetadata(
      displayName: { eq: "FormControlStatic" }
    ) {
      ...PropTable_metadata
    }
    HelpBlock: componentMetadata(displayName: { eq: "HelpBlock" }) {
      ...PropTable_metadata
    }
    InputGroup: componentMetadata(displayName: { eq: "InputGroup" }) {
      ...PropTable_metadata
    }
    InputGroupAddon: componentMetadata(displayName: { eq: "InputGroupAddon" }) {
      ...PropTable_metadata
    }
    InputGroupButton: componentMetadata(
      displayName: { eq: "InputGroupButton" }
    ) {
      ...PropTable_metadata
    }
    FormControlFeedback: componentMetadata(
      displayName: { eq: "FormControlFeedback" }
    ) {
      ...PropTable_metadata
    }
  }
`;
