import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function LabelSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="labels">Labels</Anchor> <small>Label</small>
      </h2>

      <p>Create a <code>{"<Label>label</Label>"}</code> to highlight information</p>
      <ReactPlayground codeText={Samples.Label} />

      <h3><Anchor id="labels-variations">Available variations</Anchor></h3>
      <p>Add any of the below mentioned modifier classes to change the appearance of a label.</p>
      <ReactPlayground codeText={Samples.LabelVariations} />

      <h3><Anchor id="label-props">Props</Anchor></h3>
      <PropTable component="Label"/>
    </div>
  );
}
