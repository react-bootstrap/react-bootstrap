import React from 'react';

import Anchor from '../../components/Anchor';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import TooltipBasic from '!!raw-loader!../../examples/TooltipBasic';
import TooltipPositioned from '!!raw-loader!../../examples/TooltipPositioned';
import TooltipInCopy from '!!raw-loader!../../examples/TooltipInCopy';

export default function TooltipSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="tooltips">Tooltips</Anchor> <small>Tooltip</small>
      </h2>

      <p>
        Tooltip component for a more stylish alternative to that anchor tag <code>title</code> attribute.
      </p>
      <ReactPlayground codeText={TooltipBasic} exampleClassName="tooltip-static"/>

      <h4><Anchor id="tooltips-overlay-trigger">With OverlayTrigger</Anchor></h4>
      <p>Attach and position tooltips with <code>OverlayTrigger</code>.</p>
      <ReactPlayground codeText={TooltipPositioned} />

      <h4><Anchor id="tooltips-in-text">In text copy</Anchor></h4>
      <p>Positioned tooltip in text copy.</p>
      <ReactPlayground codeText={TooltipInCopy} />

      <h3><Anchor id="tooltips-props">Props</Anchor></h3>

      <h4><Anchor id="overlays-trigger-props">OverlayTrigger</Anchor></h4>
      <PropTable metadata={data.OverlayTrigger}/>

      <h4><Anchor id="tooltips-props-tooltip">Tooltip</Anchor></h4>
      <PropTable metadata={data.Tooltip}/>
    </div>
  );
}

export const query = graphql`
  query TooltipQuery {
    Tooltip: componentMetadata(displayName: { eq: "Tooltip" }) {
      ...PropTable_metadata
    }
    OverlayTrigger: componentMetadata(displayName: { eq: "OverlayTrigger" }) {
      ...PropTable_metadata
    }
  }
`;
