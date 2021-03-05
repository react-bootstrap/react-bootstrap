import { graphql } from 'gatsby';

import ComponentApi from '../../components/ComponentApi';
import LinkedHeading from '../../components/LinkedHeading';
import ReactPlayground from '../../components/ReactPlayground';
import PaginationAdvanced from '../../examples/Pagination/Advanced';
import PaginationBasic from '../../examples/Pagination/Basic';
import withLayout from '../../withLayout';

export default withLayout(function PaginationSection({ data }) {
  return (
    <>
      <LinkedHeading h="1" id="pagination">
        Pagination
      </LinkedHeading>
      <p>
        A set of <em>presentational</em> components for building pagination UI.
      </p>

      <ReactPlayground codeText={PaginationBasic} />

      <LinkedHeading h="2" id="pagination-more">
        More options
      </LinkedHeading>
      <p>
        For building more complex pagination UI, there are few convenient
        sub-components for adding "First", "Previous", "Next", and "Last"
        buttons, as well as an <code>Ellipsis</code> item for indicating
        previous or continuing results.
      </p>
      <ReactPlayground codeText={PaginationAdvanced} />

      <LinkedHeading h="2" id="pagination-api">
        API
      </LinkedHeading>
      <ComponentApi metadata={data.Pagination} />
      <ComponentApi metadata={data.PageItem} />
    </>
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
