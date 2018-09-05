import { graphql } from 'gatsby';
import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import TableBasic from '../../examples/TableBasic';
import TableResponsive from '../../examples/TableResponsive';

export default function TableSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="tables">Tables</Anchor> <small>Table</small>
      </h2>

      <p>
        Use the <code>striped</code>, <code>bordered</code>,{' '}
        <code>condensed</code> and <code>hover</code> props to customise the
        table.
      </p>
      <ReactPlayground codeText={TableBasic} />

      <h2>
        <Anchor id="table-responsive">Responsive</Anchor>
      </h2>
      <p>
        Add <code>responsive</code> prop to make them scroll horizontally up to
        small devices (under 768px). When viewing on anything larger than 768px
        wide, you will not see any difference in these tables.
      </p>
      <ReactPlayground codeText={TableResponsive} />

      <h3>
        <Anchor id="table-props">Props</Anchor>
        <LinkToSource component={data.Table.displayName} />
      </h3>
      <PropTable metadata={data.Table} />
    </div>
  );
}

export const query = graphql`
  query TableQuery {
    Table: componentMetadata(displayName: { eq: "Table" }) {
      ...PropTable_metadata
    }
  }
`;
