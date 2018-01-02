import React from 'react';

import Anchor from '../../components/Anchor';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import AlertBasic from '!!raw-loader!../../examples/AlertBasic';
import AlertDismissable from '!!raw-loader!../../examples/AlertDismissable';

export default function AlertsSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="alerts">Alert messages</Anchor> <small>Alert</small>
      </h2>

      <p>Basic alert styles.</p>
      <ReactPlayground codeText={AlertBasic} />

      <h3><Anchor id="alerts-closeable">Closeable alerts</Anchor></h3>
      <p>just pass in a <code>onDismiss</code> function.</p>
      <ReactPlayground codeText={AlertDismissable} />

      <h3><Anchor id="alert-props">Props</Anchor></h3>
      <PropTable metadata={data.metadata} />
    </div>
  );
}

export const query = graphql`
  query AlertQuery {
    metadata: componentMetadata(displayName: { eq: "Button" }) {
      ...PropTable_metadata
    }
  }
`;
