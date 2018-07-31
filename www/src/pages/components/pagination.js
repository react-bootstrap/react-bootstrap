import { graphql } from 'gatsby';
import React from 'react';

import ComponentApi from '../../components/ComponentApi';
import Heading from '../../components/Heading';
import ReactPlayground from '../../components/ReactPlayground';
import PaginationAdvanced from '../../examples/Pagination/Advanced';
import PaginationBasic from '../../examples/Pagination/Basic';
import withLayout from '../../withLayout';

export default withLayout(function PaginationSection({ data }) {
  return (
    <div className="bs-docs-section">
      <Heading h="1" id="pagination">
        Pagination
      </Heading>
      <p>
        A set of <em>presentational</em> components for building pagination UI.
      </p>

      <ReactPlayground codeText={PaginationBasic} />

      <Heading h="2" id="pagination-more">
        More options
      </Heading>
      <p>
        For building more complex pagination UI, there are few convenient
        sub-components for adding "First", "Previous", "Next", and "Last"
        buttons, as well as an <code>Ellipsis</code> item for indicating
        previous or continuing results.
      </p>
      <ReactPlayground codeText={PaginationAdvanced} />

      <Heading h="2" id="pagination-props">
        Props
      </Heading>
      <ComponentApi metadata={data.Pagination} />
      <ComponentApi metadata={data.PageItem} />
    </div>
  );
});

export const query = graphql`
  query PaginationQuery {
    Pagination: componentMetadata(displayName: { eq: "Pagination" }) {
      ...ComponentApi_metadata
    }
    PageItem: componentMetadata(displayName: { eq: "PageItem" }) {
      ...ComponentApi_metadata
    }
  }
`;
