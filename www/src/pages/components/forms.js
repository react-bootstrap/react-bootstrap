import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import FormBasic from '../../examples/Form/Basic';
import FormControls from '../../examples/Form/Controls';
import FormInline from '../../examples/Form/Inline';
import FormHorizontal from '../../examples/Form/Horizontal';
import FormInputSizes from '../../examples/Form/InputSizes';
import FormValidation from '../../examples/Form/Validation';

export default function FormControlsSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="forms">Forms</Anchor>{' '}
        <small>FormGroup, FormControl, FormLabel</small>
      </h2>
      <p>
        The <code>{'<FormControl>'}</code> component renders a form control with
        Bootstrap styling. The <code>{'<FormGroup>'}</code> component wraps a
        form control with proper spacing, along with support for a label, help
        text, and validation state. To ensure accessibility, set{' '}
        <code>controlId</code> on <code>{'<FormGroup>'}</code>, and use{' '}
        <code>{'<FormLabel>'}</code> for the label.
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
      </p>Í
      <h3>
        <Anchor id="forms-props">Props</Anchor>
      </h3>
      <h4>
        <Anchor id="forms-props-form-group">FormGroup</Anchor>
      </h4>
      <PropTable metadata={data.FormGroup} />
      <h4>
        <Anchor id="forms-props-form-control">FormControl</Anchor>
      </h4>
      <PropTable metadata={data.FormControl} />
      <h4>
        <Anchor id="forms-props-control-label">FormLabel</Anchor>
      </h4>
      <PropTable metadata={data.FormLabel} />
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
      </h4>
      <PropTable metadata={data.Checkbox} />
      <h4>
        <Anchor id="forms-props-radio">Radio</Anchor>
      </h4>
      <PropTable metadata={data.Radio} />
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
      </h4>
      <PropTable metadata={data.FormControlFeedback} />
    </div>
  );
}

export const query = graphql`
  query FormQuery {
    Form: componentMetadata(displayName: { eq: "Form" }) {
      displayName
      ...PropTable_metadata
    }
    FormGroup: componentMetadata(displayName: { eq: "FormGroup" }) {
      displayName
      ...PropTable_metadata
    }
    FormControl: componentMetadata(displayName: { eq: "FormControl" }) {
      displayName
      ...PropTable_metadata
    }
    FormLabel: componentMetadata(displayName: { eq: "FormLabel" }) {
      displayName
      ...PropTable_metadata
    }
    Checkbox: componentMetadata(displayName: { eq: "Checkbox" }) {
      displayName
      ...PropTable_metadata
    }
    Radio: componentMetadata(displayName: { eq: "Radio" }) {
      displayName
      ...PropTable_metadata
    }
    InputGroupButton: componentMetadata(
      displayName: { eq: "InputGroupButton" }
    ) {
      displayName
      ...PropTable_metadata
    }
    FormControlFeedback: componentMetadata(
      displayName: { eq: "FormControlFeedback" }
    ) {
      displayName
      ...PropTable_metadata
    }
  }
`;
