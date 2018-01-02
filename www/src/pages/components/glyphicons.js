import React from 'react';

import Anchor from '../../components/Anchor';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import Glyphicon from '!!raw-loader!../../examples/Glyphicon';

export default function GlyphiconSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="glyphicons">Glyphicons</Anchor> <small>Glyphicon</small>
      </h2>

      <p>Use them in buttons, button groups for a toolbar, navigation, or prepended form inputs.</p>
      <ReactPlayground codeText={Glyphicon} />

      <h3><Anchor id="glyphicons-props">Props</Anchor></h3>
      <PropTable metadata={data.Glyphicon} />
    </div>
  );
}

export const query = graphql`
  query GlyphiconQuery {
    Glyphicon: componentMetadata(displayName: { eq: "Glyphicon" }) {
      ...PropTable_metadata
    }
  }
`;
