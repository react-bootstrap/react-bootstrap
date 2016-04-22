import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function CustomStylesSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="custom-styles">Custom Styles</Anchor>
      </h2>

      <p>The <code>bsStyle</code> prop, available in many components in React-Bootstrap, is used to map to a Bootstrap class for styling; for example, the Bootstrap class used for <code>Button</code> is <code>`btn-${'{'}bsStyle{'}'}`</code>. Use <code>bootstrapUtils</code> to create a custom class that is used in lieu of the classes provided by Bootstrap:</p>

      <ReactPlayground codeText={Samples.CustomButtonStyle} />
    </div>
  );
}
