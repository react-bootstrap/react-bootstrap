import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function PopoverSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="popovers">Popovers</Anchor> <small>Popover</small>
      </h2>

      <p>
        The Popover, offers a more robust alternative to the Tooltip for displaying overlays of content.
      </p>
      <ReactPlayground codeText={Samples.PopoverBasic}/>

      <h4><Anchor id="popovers-overlay-trigger">With OverlayTrigger</Anchor></h4>
      <p>The Popover component, like the Tooltip can be used with an <code>OverlayTrigger</code> Component, and positioned around it.</p>
      <ReactPlayground codeText={Samples.PopoverPositioned} />

      <h4><Anchor id="popovers-trigger-behaviors">Trigger behaviors</Anchor></h4>
      <p>It's inadvisable to use <code>"hover"</code> or <code>"focus"</code> triggers for popovers, because they have poor accessibility from keyboard and on mobile devices.</p>
      <ReactPlayground codeText={Samples.PopoverTriggerBehaviors} />

      <h4><Anchor id="popovers-in-container">Popover component in container</Anchor></h4>
      <ReactPlayground codeText={Samples.PopoverContained} exampleClassName="bs-example-popover-contained" />

      <h4><Anchor id="popovers-positioned-scrolling">Positioned popover components in scrolling container</Anchor></h4>
      <ReactPlayground codeText={Samples.PopoverPositionedScrolling} exampleClassName="bs-example-popover-scroll" />

      <h3><Anchor id="popover-props">Props</Anchor></h3>
      <PropTable component="Popover"/>
    </div>
  );
}
