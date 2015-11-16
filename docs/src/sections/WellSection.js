import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function WellSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="wells">Wells</Anchor> <small>Well</small>
      </h2>

      <p>Use the well as a simple effect on an element to give it an inset effect.</p>
      <ReactPlayground codeText={Samples.Well} />

      <h2><Anchor id="wells-optional">Optional classes</Anchor></h2>
      <p>Control padding and rounded corners with two optional modifier classes.</p>
      <ReactPlayground codeText={Samples.WellSizes} />

      <h3><Anchor id="wells-props">Props</Anchor></h3>
      <PropTable component="Well"/>
    </div>
  );
}
