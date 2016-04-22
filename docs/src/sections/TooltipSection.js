import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function TooltipSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="tooltips">Tooltips</Anchor> <small>Tooltip</small>
      </h2>

      <p>
        Tooltip component for a more stylish alternative to that anchor tag <code>title</code> attribute.
      </p>
      <ReactPlayground codeText={Samples.TooltipBasic} exampleClassName="tooltip-static"/>

      <h4><Anchor id="tooltips-overlay-trigger">With OverlayTrigger</Anchor></h4>
      <p>Attach and position tooltips with <code>OverlayTrigger</code>.</p>
      <ReactPlayground codeText={Samples.TooltipPositioned} />

      <h4><Anchor id="tooltips-in-text">In text copy</Anchor></h4>
      <p>Positioned tooltip in text copy.</p>
      <ReactPlayground codeText={Samples.TooltipInCopy} />

      <h3><Anchor id="tooltips-props">Props</Anchor></h3>

      <h4><Anchor id="overlays-trigger-props">Overlay Trigger</Anchor></h4>
      <PropTable component="OverlayTrigger"/>

      <h4><Anchor id="tooltips-props-tooltip">Tooltip</Anchor></h4>
      <PropTable component="Tooltip"/>
    </div>
  );
}
