import { graphql } from 'gatsby';
import Callout from '../../components/Callout';
import ComponentApi from '../../components/ComponentApi';
import LinkedHeading from '../../components/LinkedHeading';
import ReactPlayground from '../../components/ReactPlayground';
import FormBasic from '../../examples/Form/Basic';
import FormFloatingBasic from '../../examples/Form/FormFloatingBasic';
import FormFloatingCustom from '../../examples/Form/FormFloatingCustom';
import FormFloatingLayout from '../../examples/Form/FormFloatingLayout';
import FormFloatingSelect from '../../examples/Form/FormFloatingSelect';
import FormFloatingTextarea from '../../examples/Form/FormFloatingTextarea';
import Check from '../../examples/Form/Check';
import CheckApi from '../../examples/Form/CheckApi';
import CheckInline from '../../examples/Form/CheckInline';
import ColorPicker from '../../examples/Form/ColorPicker';
import FormFile from '../../examples/Form/FormFile';
import FormDisabled from '../../examples/Form/FormDisabled';
import FormDisabledInputs from '../../examples/Form/FormDisabledInputs';
import FormGroup from '../../examples/Form/FormGroup';
import FormText from '../../examples/Form/FormText';
import FormLabelSizing from '../../examples/Form/FormLabelSizing';
import GridAutoSizing from '../../examples/Form/GridAutoSizing';
import GridAutoSizingCustom from '../../examples/Form/GridAutoSizingCustom';
import GridAutoSizingColMix from '../../examples/Form/GridAutoSizingColMix';
import GridBasic from '../../examples/Form/GridBasic';
import GridColSizes from '../../examples/Form/GridColSizes';
import GridComplex from '../../examples/Form/GridComplex';
import Horizontal from '../../examples/Form/Horizontal';
import InputReadOnly from '../../examples/Form/InputReadOnly';
import FormInputSizes from '../../examples/Form/InputSizes';
import NoLabels from '../../examples/Form/NoLabels';
import Plaintext from '../../examples/Form/Plaintext';
import Switch from '../../examples/Form/Switch';
import Range from '../../examples/Form/Range';
import SelectBasic from '../../examples/Form/SelectBasic';
import SelectSizes from '../../examples/Form/SelectSizes';
import FormTextControls from '../../examples/Form/TextControls';
import ValidationFormik from '../../examples/Form/ValidationFormik';
import ValidationInputGroup from '../../examples/Form/ValidationInputGroup';
import ValidationNative from '../../examples/Form/ValidationNative';
import ValidationTooltips from '../../examples/Form/ValidationTooltips';
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
        For textual form controls—like <code>input</code>s and{' '}
        <code>textarea</code>s—use the <code>FormControl</code> component.
        FormControl adds some additional styles for general appearance, focus
        state, sizing, and more.
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
      <LinkedHeading h="3" id="forms-input-readonly">
        Readonly
      </LinkedHeading>
      <p>
        Add the <code>readOnly</code> prop on an input to prevent modification
        of the input's value. Read-only inputs appear lighter (just like
        disabled inputs), but retain the standard cursor.
      </p>
      <ReactPlayground codeText={InputReadOnly} />
      <LinkedHeading h="3" id="forms-input-plaintext">
        Readonly plain text
      </LinkedHeading>
      <p>
        If you want to have readonly elements in your form styled as plain text,
        use the <code>plaintext</code> prop on FormControls to remove the
        default form field styling and preserve the correct margin and padding.
      </p>
      <ReactPlayground codeText={Plaintext} />
      <LinkedHeading h="3" id="forms-file">
        File input
      </LinkedHeading>
      <ReactPlayground codeText={FormFile} />
      <LinkedHeading h="3" id="forms-color">
        Color
      </LinkedHeading>
      <ReactPlayground codeText={ColorPicker} />
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
      <LinkedHeading h="3" id="forms-check-without-labels">
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
      <LinkedHeading h="2" id="forms-range">
        Range
      </LinkedHeading>
      Create custom <code>{'<input type="range">'}</code> controls with
      <code>{'<FormRange>'}</code>. The track (the background) and thumb (the
      value) are both styled to appear the same across browsers. As only Firefox
      supports “filling” their track from the left or right of the thumb as a
      means to visually indicate progress, we do not currently support it.
      <ReactPlayground codeText={Range} />
      <LinkedHeading h="2" id="forms-select">
        Select
      </LinkedHeading>
      <ReactPlayground codeText={SelectBasic} />
      <LinkedHeading h="3" id="forms-select-sizes">
        Sizing
      </LinkedHeading>
      <p>
        You may also choose from small and large custom selects to match our
        similarly sized text inputs.
      </p>
      <ReactPlayground codeText={SelectSizes} />
      <LinkedHeading h="2" id="forms-floating-labels">
        Floating labels
      </LinkedHeading>
      <p>
        Wrap a <code>{'<Form.Control>'}</code> element in{' '}
        <code>{'<FloatingLabel>'}</code> to enable floating labels with
        Bootstrap’s textual form fields. A <code>placeholder</code> is required
        on each <code>{'<Form.Control>'}</code> as our method of CSS-only
        floating labels uses the <code>:placeholder-shown</code> pseudo-element.
      </p>
      <ReactPlayground codeText={FormFloatingBasic} />
      <LinkedHeading h="3" id="forms-floating-labels-textarea">
        Textareas
      </LinkedHeading>
      <p>
        By default, <code>{'<textarea>'}</code>s will be the same height as{' '}
        <code>{'<input>'}</code>s. To set a custom height on your{' '}
        <code>{'<textarea>'}</code>, do not use the <code>rows</code> attribute.
        Instead, set an explicit <code>height</code> (either inline or via
        custom CSS).
      </p>
      <ReactPlayground codeText={FormFloatingTextarea} />
      <LinkedHeading h="3" id="forms-floating-labels-select">
        Selects
      </LinkedHeading>
      <p>
        Other than <code>{'<Form.Control>'}</code>, floating labels are only
        available on <code>{'<Form.Select>'}</code>s. They work in the same way,
        but unlike <code>{'<input>'}</code>s, they’ll always show the{' '}
        <code>{'<label>'}</code> in its floated state.
      </p>
      <ReactPlayground codeText={FormFloatingSelect} />
      <LinkedHeading h="3" id="forms-floating-labels-layout">
        Layout
      </LinkedHeading>
      <p>
        When working with the Bootstrap grid system, be sure to place form
        elements within column classes.
      </p>
      <ReactPlayground codeText={FormFloatingLayout} />
      <LinkedHeading h="3" id="forms-floating-labels-customize">
        Customizing rendering
      </LinkedHeading>
      <p>
        If you need greater control over the rendering, use the{' '}
        <code>{'<FormFloating>'}</code> component to wrap your input and label.
        Also note that the <code>{'<Form.Control>'}</code> must come first so we
        can utilize a sibling selector (e.g., ~).
      </p>
      <ReactPlayground codeText={FormFloatingCustom} />
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
        Form groups
      </LinkedHeading>
      <p>
        The <code>FormGroup</code> component is the easiest way to add some
        structure to forms. It provides a flexible container for grouping of
        labels, controls, optional help text, and form validation messaging. By
        default it only applies margin-bottom. Use it with <code>fieldset</code>
        s, <code>div</code>s, or nearly any other element.
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
      <p>More complex layouts can also be created with the grid system.</p>
      <ReactPlayground codeText={GridComplex} />
      <LinkedHeading h="4" id="horizontal-forms">
        Horizontal form
      </LinkedHeading>
      <ReactPlayground codeText={Horizontal} />
      <LinkedHeading h="4" id="horizontal-forms-label-sizing">
        Horizontal form label sizing
      </LinkedHeading>
      <p>
        You can size the <code>{'<FormLabel>'}</code> using the column prop as
        shown.
      </p>
      <ReactPlayground codeText={FormLabelSizing} />
      <LinkedHeading h="4" id="forms-col-sizing">
        Column sizing
      </LinkedHeading>
      <p>
        As shown in the previous examples, our grid system allows you to place
        any number of <code>{'<Col>'}</code>s within a <code>{'<Row>'}</code>.
        They'll split the available width equally between them. You may also
        pick a subset of your columns to take up more or less space, while the
        remaining <code>{'<Col>'}</code>s equally split the rest, with specific
        column classes like <code>{'<Col xs={7}>'}</code>.
      </p>
      <ReactPlayground codeText={GridColSizes} />
      <LinkedHeading h="4" id="forms-auto-sizing">
        Auto-sizing
      </LinkedHeading>
      <p>
        The example below uses a flexbox utility to vertically center the
        contents and changes <code>{'<Col>'}</code> to{' '}
        <code>{'<Col xs="auto">'}</code> so that your columns only take up as
        much space as needed. Put another way, the column sizes itself based on
        on the contents.
      </p>
      <ReactPlayground codeText={GridAutoSizing} />
      <p>
        You can then remix that once again with size-specific column classes.
      </p>
      <ReactPlayground codeText={GridAutoSizingColMix} />
      <p>
        And of course <a href="#forms-custom">custom form controls</a> are
        supported.
      </p>
      <ReactPlayground codeText={GridAutoSizingCustom} />
      <LinkedHeading h="2" id="forms-help-text">
        Help text
      </LinkedHeading>
      <p>
        Block-level help text in forms can be created using{' '}
        <code>{'<Form.Text>'}</code>. Inline help text can be flexibly
        implemented using any inline HTML element and utility classes like
        <code>.text-muted</code>.
      </p>
      <Callout>
        <h5>Associating help text with form controls</h5>
        Help text should be explicitly associated with the form control it
        relates to using the <code>aria-describedby</code> attribute. This will
        ensure that assistive technologies—such as screen readers—will announce
        this help text when the user focuses or enters the control.
      </Callout>
      <p>
        Help text below inputs can be styled with <code>{'<Form.Text>'}</code>.
        This component includes <code>display: block</code> and adds some top
        margin for easy spacing from the inputs above.
      </p>
      <ReactPlayground codeText={FormText} />
      <LinkedHeading h="2" id="forms-disabled">
        Disabled forms
      </LinkedHeading>
      <p>
        Add the <code>disabled</code> boolean attribute on an input to prevent
        user interactions and make it appear lighter.
      </p>
      <ReactPlayground codeText={FormDisabledInputs} />
      <p>
        Add the <code>disabled</code> attribute to a <code>{'<fieldset>'}</code>{' '}
        to disable all the controls within.
      </p>
      <ReactPlayground codeText={FormDisabled} />
      <Callout>
        <h5>Caveat with anchors</h5>
        By default, browsers will treat all native form controls (
        <code>{'<input>'}</code>, <code>{'<select>'}</code> and{' '}
        <code>{'<button>'}</code> elements) inside a{' '}
        <code>{'<fieldset disabled>'}</code> as disabled, preventing both
        keyboard and mouse interactions on them. However, if your form also
        includes <code>{'<a ... class="btn btn-*">'}</code> elements, these will
        only be given a style of <code>pointer-events: none</code>. As noted in
        the section about{' '}
        <a href="/components/buttons/#disabled-state">
          disabled state for buttons
        </a>{' '}
        (and specifically in the sub-section for anchor elements), this CSS
        property is not yet standardized and isn’t fully supported in Internet
        Explorer 10, and won’t prevent keyboard users from being able to focus
        or activate these links. So to be safe, use custom JavaScript to disable
        such links.
      </Callout>
      <Callout theme="danger">
        <h4>Cross-browser compatibility</h4>
        While Bootstrap will apply these styles in all browsers, Internet
        Explorer 11 and below don’t fully support the <code>disabled</code>{' '}
        attribute on a <code>{'<fieldset>'}</code>. Use custom JavaScript to
        disable the fieldset in these browsers.
      </Callout>
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
        the <code>{'<Form>'}</code> (you can use the <code>validated</code> prop
        as a shortcut). Otherwise, any required field without a value shows up
        as invalid on page load. This way, you may choose when to activate them
        (typically after form submission is attempted).
      </p>
      <Callout>
        Watch out! Browsers provide their own validation UI by default on{' '}
        <code>form</code>s. You can disable the default UI by adding the HTML{' '}
        <code>noValidate</code> attribute to your <code>{'<Form>'}</code> or{' '}
        <code>{'<form>'}</code> element.
      </Callout>
      <ReactPlayground codeText={ValidationNative} />
      <LinkedHeading h="3" id="forms-validation-libraries">
        Form libraries and server-rendered styles
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
      <LinkedHeading h="3" id="forms-validation-tooltips">
        Tooltips
      </LinkedHeading>
      <p>
        If your form layout allows it, you can use the <code>tooltip</code> prop
        to display validation feedback in a styled tooltip. Be sure to have a
        parent with <code>position: relative</code> on it for tooltip
        positioning. In the example below, our column classes have this already,
        but your project may require an alternative setup.
      </p>
      <ReactPlayground codeText={ValidationTooltips} />
      <LinkedHeading h="3" id="forms-validation-input-group">
        Input group validation
      </LinkedHeading>
      <p>
        To properly show rounded corners in an <code>{'<InputGroup>'}</code>{' '}
        with validation, the <code>{'<InputGroup>'}</code> requires the{' '}
        <code>hasValidation</code> prop.
      </p>
      <ReactPlayground codeText={ValidationInputGroup} />
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
      <LinkedHeading h="2" id="forms-api">
        API
      </LinkedHeading>
      <ComponentApi metadata={data.Form} />
      <ComponentApi metadata={data.FormFloating} exportedBy={data.Form} />
      <ComponentApi metadata={data.FormGroup} exportedBy={data.Form} />
      <ComponentApi metadata={data.FormLabel} exportedBy={data.Form} />
      <ComponentApi metadata={data.FormText} exportedBy={data.Form} />
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
      <ComponentApi metadata={data.FormRange} exportedBy={data.Form} />
      <ComponentApi metadata={data.FormSelect} exportedBy={data.Form} />
      <ComponentApi metadata={data.FloatingLabel} />
    </>
  );
});

export const query = graphql`
  query FormQuery {
    Form: componentMetadata(displayName: { eq: "Form" }) {
      ...ComponentApi_metadata
    }
    FormFloating: componentMetadata(displayName: { eq: "FormFloating" }) {
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
    FormText: componentMetadata(displayName: { eq: "FormText" }) {
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
    FormRange: componentMetadata(displayName: { eq: "FormRange" }) {
      ...ComponentApi_metadata
    }
    FormSelect: componentMetadata(displayName: { eq: "FormSelect" }) {
      ...ComponentApi_metadata
    }
    FloatingLabel: componentMetadata(displayName: { eq: "FloatingLabel" }) {
      ...ComponentApi_metadata
    }
  }
`;
