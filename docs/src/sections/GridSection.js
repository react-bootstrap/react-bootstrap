import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function GridSection() {
  return (
    <div className="bs-docs-section">
      <h1 className="page-header">
        <Anchor id="grids">Grids</Anchor> <small>Grid, Row, Col</small>
      </h1>

      <ReactPlayground codeText={Samples.GridBasic} exampleClassName="bs-example-tabs" />

      <h3><Anchor id="grids-props">Props</Anchor></h3>

      <h4><Anchor id="grids-props-grid">Grid</Anchor></h4>
      <PropTable component="Grid"/>

      <h4><Anchor id="grids-props-row">Row</Anchor></h4>
      <PropTable component="Row"/>

      <h4><Anchor id="grids-props-col">Col</Anchor></h4>
      <PropTable component="Col"/>
    </div>
  );
}
