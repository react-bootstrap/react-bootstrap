import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function TableSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="tables">Tables</Anchor> <small>Table</small>
      </h2>

      <p>Use the <code>striped</code>, <code>bordered</code>, <code>condensed</code> and <code>hover</code> props to customise the table.</p>
      <ReactPlayground codeText={Samples.TableBasic} />

      <h2><Anchor id="table-responsive">Responsive</Anchor></h2>
      <p>Add <code>responsive</code> prop to make them scroll horizontally up to small devices (under 768px). When viewing on anything larger than 768px wide, you will not see any difference in these tables.</p>
      <ReactPlayground codeText={Samples.TableResponsive} />

      <h3><Anchor id="table-props">Props</Anchor></h3>
      <PropTable component="Table"/>
    </div>
  );
}
