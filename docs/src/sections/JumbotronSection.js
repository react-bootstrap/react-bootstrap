import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function JumbotronSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="jumbotron">Jumbotron</Anchor> <small>Jumbotron</small>
      </h2>

      <p>A lightweight, flexible component that can optionally extend the entire viewport to showcase key content on your site.</p>
      <ReactPlayground codeText={Samples.Jumbotron} />

      <h3><Anchor id="jumbotron-props">Props</Anchor></h3>
      <PropTable component="Jumbotron"/>
    </div>
  );
}
