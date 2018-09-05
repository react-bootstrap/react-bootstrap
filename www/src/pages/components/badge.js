import { graphql } from 'gatsby';
import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import Badge from '../../examples/Badge';

export default function BadgeSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="badges">Badges</Anchor> <small>Badge</small>
      </h2>

      <p>
        Easily highlight new or unread items by adding a{' '}
        <code>{'<Badge>'}</code> to links, Bootstrap navs, and more.
      </p>
      <ReactPlayground codeText={Badge} />
      <div className="bs-callout bs-callout-info">
        <h4>Cross-browser compatibility</h4>
        <p>
          Unlike in regular Bootstrap, badges self collapse even in Internet
          Explorer 8.
        </p>
      </div>

      <h3>
        <Anchor id="badges-props">Props</Anchor>
        <LinkToSource component={data.metadata.displayName} />
      </h3>

      <PropTable metadata={data.metadata} />
    </div>
  );
}

export const query = graphql`
  query BadgeQuery {
    metadata: componentMetadata(displayName: { eq: "Badge" }) {
      ...PropTable_metadata
    }
  }
`;
