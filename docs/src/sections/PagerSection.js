import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function PagerSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="pager">Pager</Anchor> <small>Pager, Pager.Item</small>
      </h2>

      <p>Quick previous and next links.</p>

      <h3><Anchor id="pager-default">Centers by default</Anchor></h3>
      <ReactPlayground codeText={Samples.PagerDefault} />

      <h3><Anchor id="pager-aligned">Aligned</Anchor></h3>
      <p>Set the <code>previous</code> or <code>next</code> prop to <code>true</code>, to align left or right.</p>
      <ReactPlayground codeText={Samples.PagerAligned} />

      <h3><Anchor id="pager-disabled">Disabled</Anchor></h3>
      <p>Set the <code>disabled</code> prop to <code>true</code> to disable the link.</p>
      <ReactPlayground codeText={Samples.PagerDisabled} />

      <h3><Anchor id="pager-props">Props</Anchor></h3>

      <h4><Anchor id="pager-props-pager">Pager</Anchor></h4>
      <PropTable component="Pager"/>

      <h4><Anchor id="pager-props-pager-item">Pager.Item</Anchor></h4>
      <PropTable component="Pager.Item"/>
    </div>
  );
}
