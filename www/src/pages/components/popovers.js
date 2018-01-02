import React from 'react';

import Anchor from '../../components/Anchor';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import PopoverBasic from '!!raw-loader!../../examples/PopoverBasic';
import PopoverPositioned from '!!raw-loader!../../examples/PopoverPositioned';
import PopoverTriggerBehaviors from '!!raw-loader!../../examples/PopoverTriggerBehaviors';
import PopoverContained from '!!raw-loader!../../examples/PopoverContained';
import PopoverPositionedScrolling from '!!raw-loader!../../examples/PopoverPositionedScrolling';

export default function PopoverSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="popovers">Popovers</Anchor> <small>Popover</small>
      </h2>

      <p>
        The Popover, offers a more robust alternative to the Tooltip for displaying overlays of content.
      </p>
      <ReactPlayground codeText={PopoverBasic}/>

      <h4><Anchor id="popovers-overlay-trigger">With OverlayTrigger</Anchor></h4>
      <p>
        The Popover component, like the Tooltip can be used with an <code>OverlayTrigger</code> Component, and positioned around it.
      </p>
      <ReactPlayground codeText={PopoverPositioned} />

      <h4><Anchor id="popovers-trigger-behaviors">Trigger behaviors</Anchor></h4>
      <p>
        It's inadvisable to use <code>"hover"</code> or <code>"focus"</code> triggers for popovers, because they have poor accessibility from keyboard and on mobile devices.
      </p>
      <ReactPlayground codeText={PopoverTriggerBehaviors} />

      <h4><Anchor id="popovers-in-container">Popover component in container</Anchor></h4>
      <p>
        Specify <code>container</code> to control the DOM element to which to append the overlay. This element must be a positioned element to allow correctly positioning the overlay.
      </p>
      <ReactPlayground codeText={PopoverContained} exampleClassName="bs-example-popover-contained" />

      <h4><Anchor id="popovers-positioned-scrolling">Positioned popover components in scrolling container</Anchor></h4>
      <ReactPlayground codeText={PopoverPositionedScrolling}
        exampleClassName="bs-example-popover-scroll" />

      <h3><Anchor id="popover-props">Props</Anchor></h3>
      <PropTable metadata={data.Popover} />
    </div>
  );
}

export const query = graphql`
  query PopoverQuery {
    Popover: componentMetadata(displayName: { eq: "Popover" }) {
      ...PropTable_metadata
    }
  }
`;
