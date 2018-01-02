import React from 'react';

import Anchor from '../../components/Anchor';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import Well from '!!raw-loader!../../examples/Well';
import WellSizes from '!!raw-loader!../../examples/WellSizes';

export default function WellSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="wells">Wells</Anchor> <small>Well</small>
      </h2>

      <p>Use the well as a simple effect on an element to give it an inset effect.</p>
      <ReactPlayground codeText={Well} />

      <h2><Anchor id="wells-optional">Optional classes</Anchor></h2>
      <p>Control padding and rounded corners with two optional modifier classes.</p>
      <ReactPlayground codeText={WellSizes} />

      <h3><Anchor id="wells-props">Props</Anchor></h3>
      <PropTable metadata={data.Well}/>
    </div>
  );
}

export const query = graphql`
  query WellQuery {
    Well: componentMetadata(displayName: { eq: "Well" }) {
      ...PropTable_metadata
    }
  }
`;
