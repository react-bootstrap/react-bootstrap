import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function FormSection() {
  return (
    <div className="bs-docs-section">
      <h1 className="page-header">
        <Anchor id="forms">Forms</Anchor> <small>Input, ButtonInput, FormControls</small>
      </h1>

      <p>The <code>{'<Input>'}</code> component renders an input in Bootstrap wrappers. Supports label, help, text input add-ons, validation and use as wrapper.
      Use <code>getValue()</code> or <code>getChecked()</code> to get the current state.
      The helper method <code>getInputDOMNode()</code> returns the internal input element. If you don't want the <code>form-group</code> class applied apply the prop named <code>standalone</code>.</p>
      <ReactPlayground codeText={Samples.Input} />

      <h3><Anchor id="input-types">Types</Anchor></h3>
      <p>Supports <code>select</code>, <code>textarea</code>, as well as standard HTML input types. <code>getValue()</code> returns an array for multiple select.</p>
      <ReactPlayground codeText={Samples.InputTypes} />

      <h3><Anchor id="forms-controls-static">FormControls.Static</Anchor></h3>
      <p>Static text can be added to your form controls through the use of the <code>FormControls.Static</code> component.</p>
      <ReactPlayground codeText={Samples.StaticText} />

      <h3><Anchor id="button-input-types">Button Input Types</Anchor></h3>
      <p>Form buttons are encapsulated by <code>ButtonInput</code>. Pass in <code>type="reset"</code> or <code>type="submit"</code> to suit your needs. Styling is the same as <code>Button</code>.</p>
      <ReactPlayground codeText={Samples.ButtonInput} />

      <h3><Anchor id="input-addons">Add-ons</Anchor></h3>
      <p>Use <code>addonBefore</code> and <code>addonAfter</code> for normal addons, <code>buttonBefore</code> and <code>buttonAfter</code> for button addons.
      Exotic configurations may require some css on your side.</p>
      <ReactPlayground codeText={Samples.InputAddons} />

      <h3><Anchor id="input-sizes">Sizes</Anchor></h3>
      <p>Use <code>bsSize</code> to change the size of inputs. It also works with addons and most other options.</p>
      <ReactPlayground codeText={Samples.InputSizes} />

      <h3><Anchor id="input-validation">Validation</Anchor></h3>
      <p>Set <code>bsStyle</code> to one of <code>success</code>, <code>warning</code> or <code>error</code>.
      Add <code>hasFeedback</code> to show glyphicon. Glyphicon may need additional styling if there is an add-on or no label.</p>
      <ReactPlayground codeText={Samples.InputValidation} />

      <h3><Anchor id="input-horizontal">Horizontal forms</Anchor></h3>
      <p>Use <code>labelClassName</code> and <code>wrapperClassName</code> properties to add col classes manually.
      <code>checkbox</code> and <code>radio</code> types need special treatment because label wraps input.</p>
      <ReactPlayground codeText={Samples.InputHorizontal} />

      <h3><Anchor id="input-wrapper">Use as a wrapper</Anchor></h3>
      <p>If <code>type</code> is not set, child element(s) will be rendered instead of an input element.
      <code>getValue()</code> will not work when used this way.</p>
      <ReactPlayground codeText={Samples.InputWrapper} />

      <h3><Anchor id="input-props">Props</Anchor></h3>
      <PropTable component="InputBase"/>
    </div>
  );
}
