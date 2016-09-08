import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function PaginationSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="pagination">Pagination</Anchor> <small>Pagination</small>
      </h2>

      <p>Provide pagination links for your site or app with the multi-page pagination component. Set <code>items</code> to the number of pages. <code>activePage</code> prop dictates which page is active</p>
      <ReactPlayground codeText={Samples.PaginationBasic} />

      <h4><Anchor id="pagination-more">More options</Anchor></h4>
      <p>such as <code>first</code>, <code>last</code>, <code>previous</code>, <code>next</code>, <code>boundaryLinks</code> and <code>ellipsis</code>.</p>
      <ReactPlayground codeText={Samples.PaginationAdvanced} />

      <h3><Anchor id="pagination-props">Props</Anchor></h3>
      <PropTable component="Pagination"/>
    </div>
  );
}
