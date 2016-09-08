import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function MenuItemSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="menu-items">Menu items</Anchor> <small>MenuItem</small>
      </h2>

      <p>This component represents a menu item in a dropdown.</p>
      <p>It supports the basic anchor properties <code>href</code>, <code>target</code>, <code>title</code>.</p>
      <p>
        It also supports different properties of the normal Bootstrap MenuItem.
      </p>
      <ul>
        <li><code>header</code>: To add a header label to sections</li>
        <li><code>divider</code>: Adds an horizontal divider between sections</li>
        <li><code>disabled</code>: shows the item as disabled, and prevents the onclick</li>
        <li><code>eventKey</code>: passed to the callback</li>
        <li><code>onSelect</code>: a callback that is called when the user clicks the item.</li>
      </ul>
      <p>The callback is called with the following arguments: <code>event</code> and <code>eventKey</code></p>
      <ReactPlayground codeText={Samples.MenuItem} />

      <h3><Anchor id="menu-item-props">Props</Anchor></h3>
      <PropTable component="MenuItem"/>
    </div>
  );
}
