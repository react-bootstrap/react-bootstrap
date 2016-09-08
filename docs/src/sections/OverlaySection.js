import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function OverlaySection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="custom-overlays">Custom overlays</Anchor> <small>Overlay</small>
      </h2>

      <p>
        The <code>OverlayTrigger</code> component is great for most use cases, but as a higher level abstraction it can lack the flexibility needed
        to build more nuanced or custom behaviors into your Overlay components. For these cases it can be helpful to forgo the trigger and use
        the <code>Overlay</code> component directly.
      </p>
      <ReactPlayground codeText={Samples.Overlay}/>

      <h4><Anchor id="custom-overlays-overlay">Use Overlay instead of Tooltip and Popover</Anchor></h4>
      <p>
        You don't need to use the provided <code>Tooltip</code> or <code>Popover</code> components. Creating custom overlays
        is as easy as wrapping some markup in an <code>Overlay</code> component
      </p>
      <ReactPlayground codeText={Samples.OverlayCustom} />

      <h3><Anchor id="custom-overlays-props">Props</Anchor></h3>
      <PropTable component="Overlay"/>
    </div>
  );
}
