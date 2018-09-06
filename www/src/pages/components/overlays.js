import { graphql } from 'gatsby';
import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import Overlay from '../../examples/Overlay';
import OverlayCustom from '../../examples/OverlayCustom';

export default function OverlaySection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="custom-overlays">Custom overlays</Anchor>{' '}
        <small>Overlay</small>
      </h2>

      <p>
        The <code>OverlayTrigger</code> component is great for most use cases,
        but as a higher level abstraction it can lack the flexibility needed to
        build more nuanced or custom behaviors into your Overlay components. For
        these cases it can be helpful to forgo the trigger and use the{' '}
        <code>Overlay</code> component directly.
      </p>
      <ReactPlayground codeText={Overlay} />

      <h4>
        <Anchor id="custom-overlays-overlay">
          Use Overlay instead of Tooltip and Popover
        </Anchor>
      </h4>
      <p>
        You don't need to use the provided <code>Tooltip</code> or{' '}
        <code>Popover</code> components. Creating custom overlays is as easy as
        wrapping some markup in an <code>Overlay</code> component. Make sure to
        pass down the <code>className</code> and <code>style</code> props to the
        wrapped element to make positioning and transitions work.
      </p>
      <ReactPlayground codeText={OverlayCustom} />

      <h3>
        <Anchor id="custom-overlays-props">Props</Anchor>
        <LinkToSource component={data.Overlay.displayName} />
      </h3>
      <PropTable metadata={data.Overlay} />
    </div>
  );
}

export const query = graphql`
  query OverlayQuery {
    Overlay: componentMetadata(displayName: { eq: "Overlay" }) {
      ...PropTable_metadata
    }
  }
`;
