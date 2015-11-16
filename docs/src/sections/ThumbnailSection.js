import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function ThumbnailSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="thumbnail">Thumbnails</Anchor> <small>Thumbnail</small>
      </h2>

      <p>Thumbnails are designed to showcase linked images with minimal required markup. You can extend the grid component with thumbnails.</p>

      <h3><Anchor id="thumbnail-anchor">Anchor Thumbnail</Anchor></h3>
      <p>Creates an anchor wrapping an image.</p>
      <ReactPlayground codeText={Samples.ThumbnailAnchor} />

      <h3><Anchor id="thumbnail-divider">Divider Thumbnail</Anchor></h3>
      <p>Creates a divider wrapping an image and other children elements.</p>
      <ReactPlayground codeText={Samples.ThumbnailDiv} />

      <h3><Anchor id="thumbnail-props">Props</Anchor></h3>
      <PropTable component="Thumbnail"/>
    </div>
  );
}
