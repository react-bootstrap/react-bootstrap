import { graphql } from 'gatsby';
import React from 'react';
import Callout from '../../components/Callout';
import ComponentApi from '../../components/ComponentApi';
import LinkedHeading from '../../components/LinkedHeading';
import ReactPlayground from '../../components/ReactPlayground';
import FormBasic from '../../examples/Form/Basic';
import Check from '../../examples/Form/Check';
import CheckApi from '../../examples/Form/CheckApi';
import CheckCustom from '../../examples/Form/CheckCustom';
import CheckCustomInline from '../../examples/Form/CheckCustomInline';
import CheckInline from '../../examples/Form/CheckInline';
import FormGroup from '../../examples/Form/FormGroup';
import FormRow from '../../examples/Form/FormRow';
import FormLabelSizing from '../../examples/Form/FormLabelSizing';
import GridBasic from '../../examples/Form/GridBasic';
import GridComplex from '../../examples/Form/GridComplex';
import Horizontal from '../../examples/Form/Horizontal';
import FormInputSizes from '../../examples/Form/InputSizes';
import NoLabels from '../../examples/Form/NoLabels';
import Plaintext from '../../examples/Form/Plaintext';
import Switch from '../../examples/Form/Switch';
import Range from '../../examples/Form/Range';
import RangeCustom from '../../examples/Form/RangeCustom';
import SelectCustom from '../../examples/Form/SelectCustom';
import SelectCustomSize from '../../examples/Form/SelectCustomSize';
import File from '../../examples/Form/File';
import FileButtonText from '../../examples/Form/FileButtonText';
import FileApi from '../../examples/Form/FileApi';
import FormTextControls from '../../examples/Form/TextControls';
import ValidationFormik from '../../examples/Form/ValidationFormik';
import ValidationNative from '../../examples/Form/ValidationNative';
import withLayout from '../../withLayout';

export default withLayout(function FormControlsSection({ data }) {
  return (
    <>
      <LinkedHeading h="1" id="forms">
        Forms
      </LinkedHeading>
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
      </p>
      <LinkedHeading h="2" id="forms-controls">
        Form controls
      </LinkedHeading>
      <p>
        For textual form controls—like <code>input</code>s, <code>select</code>
        s, and <code>textarea</code>s—use the <code>FormControl</code>{' '}
        component. FormControl adds some additional styles for general
        appearance, focus state, sizing, and more.
      </p>
      <ReactPlayground codeText={FormTextControls} />
      <LinkedHeading h="3" id="forms-input-sizes">
        Sizing
      </LinkedHeading>
      <p>
        Use <code>size</code> on <code>{'<FormControl>'}</code> and{' '}
        <code>{'<FormLabel>'}</code> to change the size of inputs and labels
        respectively.
      </p>
      <ReactPlayground codeText={FormInputSizes} />
      <LinkedHeading h="3" id="forms-input-Plaintext">
        Plaintext
      </LinkedHeading>
      <p>
        If you want to have elements in your form styled as plain text, use the{' '}
        <code>plaintext</code> prop on FormControls to remove the default form
        field styling and preserve the correct margin and padding.
      </p>
      <ReactPlayground codeText={Plaintext} />
      <LinkedHeading h="2" id="forms-range">
        Range Inputs
      </LinkedHeading>
      <ReactPlayground codeText={Range} />
      <LinkedHeading h="2" id="forms-form-check">
        Checkboxes and Radios
      </LinkedHeading>
      <p>
        For the non-textual checkbox and radio controls, <code>FormCheck</code>{' '}
        provides a single component for both types that adds some additional
        styling and improved layout.
      </p>
      <LinkedHeading h="3" id="forms-check-stacked">
        Default (stacked)
      </LinkedHeading>
      <p>
        By default, any number of checkboxes and radios that are immediate
        sibling will be vertically stacked and appropriately spaced with
        FormCheck.
      </p>
      <ReactPlayground codeText={Check} />
      <LinkedHeading h="3" id="forms-check-inline">
        Inline
      </LinkedHeading>
      <p>
        Group checkboxes or radios on the same horizontal row by adding the{' '}
        <code>inline</code> prop.
      </p>
      <ReactPlayground codeText={CheckInline} />
      <LinkedHeading h="3" id="forms-check-inline">
        Without labels
      </LinkedHeading>
      <p>
        When you render a FormCheck without a label (no <code>children</code>)
        some additional styling is applied to keep the inputs from collapsing.{' '}
        <strong>
          Remember to add an <code>aria-label</code> when omitting labels!
        </strong>
      </p>
      <ReactPlayground codeText={NoLabels} />

      <LinkedHeading h="3" id="forms-check-api">
        Customizing FormCheck rendering
      </LinkedHeading>

      <p>
        When you need tighter control, or want to customize how the{' '}
        <code>FormCheck</code> component renders, it may better to use it's
        constituent parts directly.
      </p>
      <p>
        By provided <code>children</code> to the <code>FormCheck</code> you can
        forgo the default rendering and handle it yourself. (You can still
        provide an <code>id</code> to the <code>FormCheck</code> or{' '}
        <code>FormGroup</code> and have it propagate to the label and input).
      </p>
      <ReactPlayground codeText={CheckApi} />

      <LinkedHeading h="2" id="forms-layout">
        Layout
      </LinkedHeading>
      <p>
        FormControl and FormCheck both apply <code>display: block</code> with{' '}
        <code>width: 100%</code> to controls, which means they stack vertically
        by default. Additional components and props can be used to vary this
        layout on a per-form basis.
      </p>
      <LinkedHeading h="3" id="forms-layout-group">
        Form group
      </LinkedHeading>
      <p>
        The <code>FormGroup</code> component is the easiest way to add some
        structure to forms. It provides a flexible container for grouping of
        labels, controls, optional help text, and form validation messaging. By
        default it only applies margin-bottom, but it picks up additional styles
        in <code>{'<Form inline >'}</code> as needed. Use it with{' '}
        <code>fieldset</code>s, <code>div</code>s, or nearly any other element.
      </p>
      <p>
        You also add the <code>controlId</code> prop to accessibly wire the
        nested label and input together via the <code>id</code>.
      </p>
      <ReactPlayground codeText={FormGroup} />
      <LinkedHeading h="3" id="forms-layout-grid">
        Form grid
      </LinkedHeading>
      <p>
        More complex forms can be built using the grid components. Use these for
        form layouts that require multiple columns, varied widths, and
        additional alignment options.
      </p>
      <ReactPlayground codeText={GridBasic} />
      <LinkedHeading h="4" id="forms-layout-form-row">
        Form row
      </LinkedHeading>
      <p>
        You may also swap <code>{'<Row>'}</code> for <code>{'<Form.Row>'}</code>
        , a variation of the standard grid row that overrides the default column
        gutters for tighter and more compact layouts.
      </p>
      <ReactPlayground codeText={FormRow} />
      <p>More complex layouts can also be created with the grid system.</p>
      <ReactPlayground codeText={GridComplex} />
      <LinkedHeading h="3" id="horizontal-forms">
        Horizontal forms
      </LinkedHeading>
      <p>
        You may also swap <code>{'<Row>'}</code> for <code>{'<Form.Row>'}</code>
        , a variation of the standard grid row that overrides the default column
        gutters for tighter and more compact layouts.
      </p>
      <ReactPlayground codeText={Horizontal} />
      <LinkedHeading h="4" id="horizontal-forms-label-sizing">
        Horizontal forms label sizing
      </LinkedHeading>
      <p>
        You can size the <code>{'<FormLabel>'}</code> using the column prop as
        shown.
      </p>
      <ReactPlayground codeText={FormLabelSizing} />

      <LinkedHeading h="2" id="forms-validation">
        Validation
      </LinkedHeading>
      <p>
        Provide valuable, actionable feedback to your users with form validation
        feedback.
      </p>
      <LinkedHeading h="3" id="forms-validation-native">
        Native HTML5 form validation
      </LinkedHeading>
      <p>
        For native HTML form validation–
        <a href="https://caniuse.com/#feat=form-validation">
          available in all our supported browsers
        </a>
        , the <code>:valid</code> and <code>:invalid</code> pseudo selectors are
        used to apply validation styles as well as display feedback messages.
      </p>
      <p>
        Bootstrap scopes the <code>:valid</code> and <code>:invalid</code>{' '}
        styles to parent <code>.was-validated</code> class, usually applied to
        the <code>Form</code> (you can use the <code>validated</code> prop as a
        shortcut). Otherwise, any required field without a value shows up as
        invalid on page load. This way, you may choose when to activate them
        (typically after form submission is attempted).
      </p>
      <ReactPlayground codeText={ValidationNative} />

      <LinkedHeading h="3" id="forms-validation-libraries">
        Form libraries and server rendered styles.
      </LinkedHeading>
      <p>
        It's often beneficial (especially in React) to handle form validation
        via a library like Formik, or react-formal. In those cases,{' '}
        <code>isValid</code> and <code>isInvalid</code> props can be added to
        form controls to manually apply validation styles. Below is a quick
        example integrating with{' '}
        <a href="https://github.com/jaredpalmer/formik">Formik</a>.
      </p>
      <ReactPlayground codeText={ValidationFormik} />

      <LinkedHeading h="3" id="forms-validation-examples">
        Examples
      </LinkedHeading>

      <LinkedHeading h="2" id="forms-custom">
        Custom forms
      </LinkedHeading>
      <p>
        For even more customization and cross browser consistency, use our
        completely custom form elements to replace the browser defaults. They’re
        built on top of semantic and accessible markup, so they’re solid
        replacements for any default form control.
      </p>
      <LinkedHeading h="3" id="forms-custom-checkboxes-and-radios">
        Checkboxes and radios
      </LinkedHeading>
      <p>
        Custom checkbox and radio styles are achieved with a resourceful use of
        the <code>:checked</code> selector and <code>:after</code> pseudo
        elements, but are Structurally similar to the default{' '}
        <code>FormCheck</code>. By default the checked and indeterminate icons
        use embedded svg icons from{' '}
        <a href="https://useiconic.com/open">Open Iconic</a>.
      </p>

      <p>
        Apply Bootstrap's custom elements by adding the <code>custom</code>{' '}
        prop.
      </p>
      <ReactPlayground codeText={CheckCustom} />

      <LinkedHeading h="3" id="forms-custom-switch">
        Switches
      </LinkedHeading>
      <p>
        A switch has the markup of a custom checkbox but uses{' '}
        <code>type="switch"</code> to render a toggle switch. Switches also
        support the same customizable children as <code>{'<FormCheck>'}</code>.
      </p>

      <ReactPlayground codeText={Switch} />
      <Callout>
        You can also use the <code>{'<Form.Switch>'}</code> alias which
        encapsulates the above, in a very small component wrapper.
      </Callout>

      <h3>Inline</h3>
      <ReactPlayground codeText={CheckCustomInline} />

      <LinkedHeading h="3" id="forms-custom-select">
        Select
      </LinkedHeading>
      <p>
        For the <code>select</code> form control you can pass the{' '}
        <code>custom</code> prop to get custom styling of the select element.
        Custom styles are limited to the <code>select</code> initial appearance
        and cannot modify the <code>option</code> styling due to browser
        limitations.
      </p>
      <ReactPlayground codeText={SelectCustom} />
      <h4>Sizing</h4>
      <p>
        The custom <code>select</code> element supports sizing.
      </p>
      <ReactPlayground codeText={SelectCustomSize} />

      <LinkedHeading h="3" id="forms-custom-range">
        Range
      </LinkedHeading>
      <p>
        For the <code>range</code> form control you can pass the{' '}
        <code>custom</code> prop to get custom styling of the select element.
        The track (the background) and thumb (the value) are both styled to
        appear the same across browsers. As only IE and Firefox support
        “filling” their track from the left or right of the thumb as a means to
        visually indicate progress, we do not currently support it.
      </p>
      <ReactPlayground codeText={RangeCustom} />

      <LinkedHeading h="3" id="forms-custom-file">
        File
      </LinkedHeading>
      <p>A custom styled File uploader.</p>

      <ReactPlayground codeText={File} />

      <h4>Translating or customizing the strings with HTML</h4>
      <ReactPlayground codeText={FileButtonText} />

      <h4>Customizing FormFile rendering</h4>
      <p>
        When you need tighter control, or want to customize how the{' '}
        <code>FormFile</code> component renders, it may be better to use it's
        constituent parts directly.
      </p>
      <p>
        By providing <code>children</code> to the <code>FormFile</code> you can
        forgo the default rendering and handle it yourself. (You can still
        provide an <code>id</code> to the <code>FormFile</code> and have it
        propagate to the label and input).
      </p>
      <Callout>
        <p>
          When customizing the <code>FormFile</code> rendering it is important
          to note the order of the <code>label</code> and <code>input</code>{' '}
          elements.
        </p>
        <p>
          If you are not setting the <code>custom</code> prop the
          <code>label</code> should be before the <code>input</code>.
        </p>
        <p>
          If you are setting the custom prop the <code>input</code> must appear
          before the <code>label</code> or the <code>buttonText</code> prop will
          not work.
        </p>
      </Callout>
      <ReactPlayground codeText={FileApi} />

      <LinkedHeading h="2" id="forms-api">
        API
      </LinkedHeading>
      <ComponentApi metadata={data.Form} />
      <ComponentApi metadata={data.FormRow} exportedBy={data.Form} />
      <ComponentApi metadata={data.FormGroup} exportedBy={data.Form} />
      <ComponentApi metadata={data.FormLabel} exportedBy={data.Form} />
      <ComponentApi metadata={data.FormControl} exportedBy={data.Form} />
      <ComponentApi metadata={data.Feedback} exportedBy={data.FormControl} />
      <ComponentApi metadata={data.FormCheck} exportedBy={data.Form} />
      <ComponentApi
        metadata={data.FormCheckInput}
        exportedBy={data.FormCheck}
      />
      <ComponentApi
        metadata={data.FormCheckLabel}
        exportedBy={data.FormCheck}
      />
    </>
  );
});

export const query = graphql`
  query FormQuery {
    Form: componentMetadata(displayName: { eq: "Form" }) {
      ...ComponentApi_metadata
    }
    FormRow: componentMetadata(displayName: { eq: "FormRow" }) {
      ...ComponentApi_metadata
    }
    FormGroup: componentMetadata(displayName: { eq: "FormGroup" }) {
      ...ComponentApi_metadata
    }
    FormControl: componentMetadata(displayName: { eq: "FormControl" }) {
      ...ComponentApi_metadata
    }
    FormLabel: componentMetadata(displayName: { eq: "FormLabel" }) {
      ...ComponentApi_metadata
    }
    FormCheck: componentMetadata(displayName: { eq: "FormCheck" }) {
      ...ComponentApi_metadata
    }
    FormCheckInput: componentMetadata(displayName: { eq: "FormCheckInput" }) {
      ...ComponentApi_metadata
    }
    FormCheckLabel: componentMetadata(displayName: { eq: "FormCheckLabel" }) {
      ...ComponentApi_metadata
    }
    Feedback: componentMetadata(displayName: { eq: "Feedback" }) {
      ...ComponentApi_metadata
    }
  }
`;
