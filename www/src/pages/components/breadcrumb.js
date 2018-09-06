import { graphql } from 'gatsby';
import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import Breadcrumb from '../../examples/Breadcrumb';

export default function BreadcrumbSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="breadcrumbs">Breadcrumbs</Anchor>{' '}
        <small>Breadcrumb, Breadcrumb.Item</small>
      </h2>

      <p>
        Breadcrumbs are used to indicate the current page's location. Add{' '}
        <code>active</code> attribute to active <code>Breadcrumb.Item</code>.
      </p>
      <p>
        Do not set both <code>active</code> and <code>href</code> attributes.{' '}
        <code>active</code> overrides <code>href</code> and <code>span</code>{' '}
        element is rendered instead of <code>a</code>.
      </p>

      <h3>
        <Anchor id="breadcrumbs-example">Breadcrumbs Example</Anchor>
      </h3>
      <ReactPlayground codeText={Breadcrumb} />

      <h3>
        <Anchor id="breadcrumbs-props">Props</Anchor>
        <LinkToSource component={data.metadata.displayName} />
      </h3>
      <p>
        <code>Breadcrumb</code> component itself doesn't have any specific
        public properties
      </p>

      <h4>
        <Anchor id="breadcrumbs-props-breadcrumb-item">Breadcrumb.Item</Anchor>
      </h4>
      <PropTable metadata={data.metadata} />
    </div>
  );
}

export const query = graphql`
  query BreadcrumbQuery {
    metadata: componentMetadata(displayName: { eq: "BreadcrumbItem" }) {
      ...PropTable_metadata
    }
  }
`;
