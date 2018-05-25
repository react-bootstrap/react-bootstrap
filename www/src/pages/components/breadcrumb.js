import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';
import Breadcrumb from '../../examples/Breadcrumb';
import withLayout from '../../withLayout';

export default withLayout(function BreadcrumbSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="breadcrumbs">Breadcrumbs</Anchor>{' '}
        <small>Breadcrumb, Breadcrumb.Item</small>
      </h2>

      <p>
        Indicate the current page’s location within a navigational hierarchy
        that automatically adds separators via CSS. Add <code>active</code> prop
        to active <code>Breadcrumb.Item</code>.
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
        <LinkToSource component={data.Breadcrumb.displayName} />
      </h3>
      <PropTable metadata={data.Breadcrumb} />

      <h4>
        <Anchor id="breadcrumbs-props-breadcrumb-item">Breadcrumb.Item</Anchor>
      </h4>
      <PropTable metadata={data.BreadcrumbItem} />
    </div>
  );
});

export const query = graphql`
  query BreadcrumbQuery {
    BreadcrumbItem: componentMetadata(displayName: { eq: "BreadcrumbItem" }) {
      ...PropTable_metadata
    }
    Breadcrumb: componentMetadata(displayName: { eq: "Breadcrumb" }) {
      ...PropTable_metadata
    }
  }
`;
