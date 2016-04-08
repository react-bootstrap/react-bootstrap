import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function FormInputGroupSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="forms-input-groups">Input groups</Anchor> <small>InputGroup, InputGroup.Addon, InputGroup.Button</small>
      </h2>

      <h3><Anchor id="forms-input-addons">Input add-ons</Anchor></h3>
      <p>Wrap your form control in an <code>{'<InputGroup>'}</code>, then use for normal add-ons and for button add-ons. Exotic configurations may require CSS on your side.</p>
      <ReactPlayground codeText={Samples.FormInputAddons} />

      <h3><Anchor id="forms-input-sizes">Input sizes</Anchor></h3>
      <p>Use <code>bsSize</code> on <code>{'<FormGroup>'}</code> or <code>{'<InputGroup>'}</code> to change the size of inputs. It also works with add-ons and most other options.</p>
      <ReactPlayground codeText={Samples.FormInputSizes} />

      <h3><Anchor id="forms-input-groups-props">Props</Anchor></h3>

      <h4><Anchor id="forms-props-input-group">InputGroup</Anchor></h4>
      <PropTable component="InputGroup" />

      <h4><Anchor id="forms-props-input-group-addon">InputGroup.Addon</Anchor></h4>
      <PropTable component="InputGroupAddon" />

      <h4><Anchor id="forms-props-input-group-button">InputGroup.Button</Anchor></h4>
      <PropTable component="InputGroupButton" />
    </div>
  );
}
