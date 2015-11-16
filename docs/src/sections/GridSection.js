import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function GridSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="grid">Grid system</Anchor> <small>Grid, Row, Col</small>
      </h2>

      <ReactPlayground codeText={Samples.GridBasic} />

      <h3><Anchor id="grid-props">Props</Anchor></h3>

      <h4><Anchor id="grid-props-grid">Grid</Anchor></h4>
      <PropTable component="Grid"/>

      <h4><Anchor id="grid-props-row">Row</Anchor></h4>
      <PropTable component="Row"/>

      <h4><Anchor id="grid-props-col">Col</Anchor></h4>
      <PropTable component="Col"/>
    </div>
  );
}
