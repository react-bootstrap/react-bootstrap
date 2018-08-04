import { graphql } from 'gatsby';
import React from 'react';

import Heading from '../../components/Heading';
import ComponentApi from '../../components/ComponentApi';
import ReactPlayground from '../../components/ReactPlayground';
import Breadcrumb from '../../examples/Breadcrumb';
import withLayout from '../../withLayout';

export default withLayout(function BreadcrumbSection({ data }) {
  return (
    <>
      <Heading h="2" id="breadcrumbs">
        Breadcrumbs
      </Heading>

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

      <Heading h="3" id="breadcrumbs-example">
        Example
      </Heading>
      <ReactPlayground codeText={Breadcrumb} />

      <Heading h="2" id="breadcrumbs-api">
        API
      </Heading>

      <ComponentApi metadata={data.Breadcrumb} />
      <ComponentApi
        metadata={data.BreadcrumbItem}
        exportedBy={data.Breadcrumb}
      />
    </>
  );
});

export const query = graphql`
  query BreadcrumbQuery {
    BreadcrumbItem: componentMetadata(displayName: { eq: "BreadcrumbItem" }) {
      ...ComponentApi_metadata
    }
    Breadcrumb: componentMetadata(displayName: { eq: "Breadcrumb" }) {
      ...ComponentApi_metadata
    }
  }
`;
