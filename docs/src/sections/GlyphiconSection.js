import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function GlyphiconSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="glyphicons">Glyphicons</Anchor> <small>Glyphicon</small>
      </h2>

      <p>Use them in buttons, button groups for a toolbar, navigation, or prepended form inputs.</p>
      <ReactPlayground codeText={Samples.Glyphicon} />

      <h3><Anchor id="glyphicons-props">Props</Anchor></h3>
      <PropTable component="Glyphicon"/>
    </div>
  );
}
