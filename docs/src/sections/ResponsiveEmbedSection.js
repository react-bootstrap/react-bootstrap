import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function ResponsiveEmbedSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="responsive-embed">Responsive embed</Anchor> <small>ResponsiveEmbed</small>
      </h2>

      <p>Allow browsers to determine video or slideshow dimensions based on the width of their containing block by creating an intrinsic ratio that will properly scale on any device.</p>
      <p>You don't need to include <code>frameborder="0"</code> in your <code>iframe</code>s.</p>
      <p className="bg-warning">Either <b>16by9</b> or <b>4by3</b> aspect ratio via <code>a16by9</code> or <code>a4by3</code> attribute must be set.</p>
      <ReactPlayground codeText={Samples.ResponsiveEmbed} />

      <h3><Anchor id="responsive-embed-props">Props</Anchor></h3>
      <PropTable component="ResponsiveEmbed"/>
    </div>
  );
}
