import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function BadgeSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="badges">Badges</Anchor> <small>Badge</small>
      </h2>

      <p>Easily highlight new or unread items by adding a <code>{"<Badge>"}</code> to links, Bootstrap navs, and more.</p>
      <ReactPlayground codeText={Samples.Badge} />
      <div className="bs-callout bs-callout-info">
        <h4>Cross-browser compatibility</h4>
        <p>Unlike in regular Bootstrap, badges self collapse even in Internet Explorer 8.</p>
      </div>

      <h3><Anchor id="badges-props">Props</Anchor></h3>
      <PropTable component="Badge" />
    </div>
  );
}
