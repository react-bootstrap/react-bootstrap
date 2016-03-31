import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function GridSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="grid">Grid system</Anchor> <small>Grid, Row, Col, Clearfix</small>
      </h2>

      <h3><Anchor id="grids-basic">Basic Grid</Anchor></h3>
      <ReactPlayground codeText={Samples.GridBasic} />

      <h3><Anchor id="grids-clearfix">Clearfix</Anchor></h3>

      <p>Below, the columns won't clear correctly in viewport <code>sm</code> (768px &le; width &lt; 992px).</p>
      <ReactPlayground codeText={Samples.GridWithoutClearfix} />

      <p>Introduce <code>Clearfix</code>, set to visible for the viewports with issue, so that columns clear correctly.</p>
      <ReactPlayground codeText={Samples.GridWithClearfix} />

      <h3><Anchor id="grid-props">Props</Anchor></h3>

      <h4><Anchor id="grid-props-grid">Grid</Anchor></h4>
      <PropTable component="Grid"/>

      <h4><Anchor id="grid-props-row">Row</Anchor></h4>
      <PropTable component="Row"/>

      <h4><Anchor id="grid-props-col">Col</Anchor></h4>
      <PropTable component="Col"/>

      <h4><Anchor id="grid-props-col">Clearfix</Anchor></h4>
      <PropTable component="Clearfix"/>
    </div>
  );
}
