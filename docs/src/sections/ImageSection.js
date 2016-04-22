import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function ImageSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="images">Images</Anchor> <small>Image</small>
      </h2>

      <h3><Anchor id="image-shape">Shape</Anchor></h3>
      <p>Use the <code>rounded</code>, <code>circle</code> and <code>thumbnail</code> props to customise the image.</p>
      <ReactPlayground codeText={Samples.ImageShape} />

      <h3><Anchor id="image-responsive">Responsive</Anchor></h3>
      <p>Use the <code>responsive</code> to scale image nicely to the parent element.</p>
      <ReactPlayground codeText={Samples.ImageResponsive} />

      <h3><Anchor id="image-props">Props</Anchor></h3>
      <PropTable component="Image"/>
    </div>
  );
}
