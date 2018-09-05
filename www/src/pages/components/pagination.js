import { graphql } from 'gatsby';
import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import PagerDefault from '../../examples/PagerDefault';
import PagerAligned from '../../examples/PagerAligned';
import PagerDisabled from '../../examples/PagerDisabled';
import PaginationBasic from '../../examples/PaginationBasic';
import PaginationAdvanced from '../../examples/PaginationAdvanced';

export default function PaginationSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="pager">Pager</Anchor> <small>Pager, Pager.Item</small>
      </h2>

      <p>Quick previous and next links.</p>

      <h3>
        <Anchor id="pager-default">Centers by default</Anchor>
      </h3>
      <ReactPlayground codeText={PagerDefault} />

      <h3>
        <Anchor id="pager-aligned">Aligned</Anchor>
      </h3>
      <p>
        Set the <code>previous</code> or <code>next</code> prop to{' '}
        <code>true</code>, to align left or right.
      </p>
      <ReactPlayground codeText={PagerAligned} />

      <h3>
        <Anchor id="pager-disabled">Disabled</Anchor>
      </h3>
      <p>
        Set the <code>disabled</code> prop to <code>true</code> to disable the
        link.
      </p>
      <ReactPlayground codeText={PagerDisabled} />

      <h3>
        <Anchor id="pager-props">Props</Anchor>
      </h3>

      <h4>
        <Anchor id="pager-props-pager">Pager</Anchor>
        <LinkToSource component={data.Pager.displayName} />
      </h4>
      <PropTable metadata={data.Pager} />

      <h4>
        <Anchor id="pager-props-pager-item">Pager.Item</Anchor>
        <LinkToSource component={data.PagerItem.displayName} />
      </h4>
      <PropTable metadata={data.PagerItem} />

      <h2 className="page-header">
        <Anchor id="pagination">Pagination</Anchor> <small>Pagination</small>
      </h2>
      <p>
        A set of <em>presentational</em> components for building pagination UI.
      </p>

      <div className="bs-callout bs-callout-info">
        <h4>Migration Details</h4>
        <p>
          In previous versions of ReactBootstrap, the Pagination components
          contained "business" logic related to pagination. Considering logic of
          this sort is almost always application and use-case specific we've
          removed it in favor of purely presentational components (just like
          vanilla bootstrap).
        </p>
        <p>
          In order to help migration we've provided a drop-in replacement for
          the old component at:{' '}
          <a href="https://www.npmjs.com/package/@react-bootstrap/pagination">
            @react-bootstrap/pagination
          </a>
        </p>
      </div>

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
    Pager: componentMetadata(displayName: { eq: "Pager" }) {
      ...PropTable_metadata
    }
    PagerItem: componentMetadata(displayName: { eq: "PagerItem" }) {
      ...PropTable_metadata
    }
  }
`;
