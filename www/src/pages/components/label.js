import React from 'react';

import Anchor from '../../components/Anchor';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import Label from '!!raw-loader!../../examples/Label';
import LabelVariations from '!!raw-loader!../../examples/LabelVariations';

export default function LabelSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="labels">Labels</Anchor> <small>Label</small>
      </h2>

      <p>Create a <code>{"<Label>label</Label>"}</code> to highlight information</p>
      <ReactPlayground codeText={Label} />

      <h3><Anchor id="labels-variations">Available variations</Anchor></h3>
      <p>Add any of the below mentioned modifier classes to change the appearance of a label.</p>
      <ReactPlayground codeText={LabelVariations} />

      <h3><Anchor id="label-props">Props</Anchor></h3>
      <PropTable metadata={data.Label}/>
    </div>
  );
}

export const query = graphql`
  query LabelQuery {
    Label: componentMetadata(displayName: { eq: "Label" }) {
      ...PropTable_metadata
    }
  }
`;
