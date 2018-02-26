import React from 'react';

import Anchor from '../../components/Anchor';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import PaginationBasic from '../../examples/Pagination/Basic';
import PaginationAdvanced from '../../examples/Pagination/Advanced';

export default function PaginationSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="pagination">Pagination</Anchor> <small>Pagination</small>
      </h2>
      <p>
        A set of <em>presentational</em> components for building pagination UI.
      </p>

      <ReactPlayground codeText={PaginationBasic} />

      <h4>
        <Anchor id="pagination-more">More options</Anchor>
      </h4>
      <p>
        For building more complex pagination UI, there are few convenient
        sub-components for adding "First", "Previous", "Next", and "Last"
        buttons, as well as an <code>Ellipsis</code> item for indicating
        previous or continuing results.
      </p>
      <ReactPlayground codeText={PaginationAdvanced} />

      <PropTable metadata={data.Pagination} />
    </div>
  );
}

export const query = graphql`
  query PaginationQuery {
    Pagination: componentMetadata(displayName: { eq: "Pagination" }) {
      ...PropTable_metadata
    }
  }
`;
