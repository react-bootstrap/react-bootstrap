import { graphql } from 'gatsby';
import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import PageHeader from '../../examples/PageHeader';

export default function PageHeaderSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="page-header">Page header</Anchor> <small>PageHeader</small>
      </h2>

      <p>
        A simple shell for an <code>h1</code> to appropriately space out and
        segment sections of content on a page. It can utilize the{' '}
        <code>h1</code>
        &#8217;s default <code>small</code> element, as well as most other
        components (with additional styles).
      </p>
      <ReactPlayground codeText={PageHeader} />

      <h3>
        <Anchor id="page-header-props">Props</Anchor>
        <LinkToSource component={data.PageHeader.displayName} />
      </h3>
      <PropTable metadata={data.PageHeader} />
    </div>
  );
}

export const query = graphql`
  query PageHeaderQuery {
    PageHeader: componentMetadata(displayName: { eq: "PageHeader" }) {
      ...PropTable_metadata
    }
  }
`;
