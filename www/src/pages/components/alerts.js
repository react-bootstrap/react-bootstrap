import { graphql } from 'gatsby';
import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';
import Basic from '../../examples/Alert/Basic';
import Dismissible from '../../examples/Alert/Dismissible';
import DismissibleControlled from '../../examples/Alert/DismissibleControlled';
import Link from '../../examples/Alert/Link';
import withLayout from '../../withLayout';

export default withLayout(function AlertsSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="alerts">Alert messages</Anchor> <small>Alert</small>
      </h2>

      <p>
        Alerts are available for any length of text, as well as an optional
        dismiss button. For proper styling, use one of the eight{' '}
        <code>variant</code>s.
      </p>
      <ReactPlayground codeText={Basic} />
      <h3>
        <Anchor id="alerts-links">Links</Anchor>
      </h3>
      <p>
        For links, use the <code>Alert.Link</code> component to provide matching
        colored links within any alert.
      </p>
      <ReactPlayground codeText={Link} />

      <h3>
        <Anchor id="alerts-dismissible">Dismissible alerts</Anchor>
      </h3>
      <p>
        Add the <code>dismissable</code> prop to add a functioning dismiss
        button to the Alert.
      </p>
      <ReactPlayground codeText={Dismissible} />
      <p>
        You can also control the visual state directly which is great if you
        wnat to build more complicated alerts.
      </p>
      <ReactPlayground codeText={DismissibleControlled} />
      <h3>
        <Anchor id="alert-props">Props</Anchor>
        <LinkToSource component={data.metadata.displayName} />
      </h3>
      <PropTable metadata={data.metadata} />
    </div>
  );
});

export const query = graphql`
  query AlertQuery {
    metadata: componentMetadata(displayName: { eq: "Alert" }) {
      ...PropTable_metadata
    }
  }
`;
