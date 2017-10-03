import React from 'react';

import Anchor from '../../components/Anchor';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import PagerDefault from '!!raw-loader!../../examples/PagerDefault';
import PagerAligned from '!!raw-loader!../../examples/PagerAligned';
import PagerDisabled from '!!raw-loader!../../examples/PagerDisabled';
import PaginationBasic from '!!raw-loader!../../examples/PaginationBasic';
import PaginationAdvanced from '!!raw-loader!../../examples/PaginationAdvanced';

export default function PaginationSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="pager">Pager</Anchor> <small>Pager, Pager.Item</small>
      </h2>

      <p>Quick previous and next links.</p>

      <h3><Anchor id="pager-default">Centers by default</Anchor></h3>
      <ReactPlayground codeText={PagerDefault} />

      <h3><Anchor id="pager-aligned">Aligned</Anchor></h3>
      <p>Set the <code>previous</code> or <code>next</code> prop to <code>true</code>, to align left or right.</p>
      <ReactPlayground codeText={PagerAligned} />

      <h3><Anchor id="pager-disabled">Disabled</Anchor></h3>
      <p>Set the <code>disabled</code> prop to <code>true</code> to disable the link.</p>
      <ReactPlayground codeText={PagerDisabled} />

      <h3><Anchor id="pager-props">Props</Anchor></h3>

      <h4><Anchor id="pager-props-pager">Pager</Anchor></h4>
      <PropTable metadata={data.Pager}/>

      <h4><Anchor id="pager-props-pager-item">Pager.Item</Anchor></h4>
      <PropTable metadata={data.Pager.Item}/>

      <h2 className="page-header">
        <Anchor id="pagination">Pagination</Anchor> <small>Pagination</small>
      </h2>

      <p>Provide pagination links for your site or app with the multi-page pagination component. Set <code>items</code> to the number of pages. <code>activePage</code> prop dictates which page is active</p>
      <ReactPlayground codeText={PaginationBasic} />

      <h4><Anchor id="pagination-more">More options</Anchor></h4>
      <p>such as <code>first</code>, <code>last</code>, <code>previous</code>, <code>next</code>, <code>boundaryLinks</code> and <code>ellipsis</code>.</p>
      <ReactPlayground codeText={PaginationAdvanced} />

      <h3><Anchor id="pagination-props">Props</Anchor></h3>
      <PropTable metadata={data.Pagination}/>
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
  }
`;
