import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function TabsSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="tabs">Togglable tabs</Anchor> <small>Tabs, Tab</small>
      </h2>

      <p>Add quick, dynamic tab functionality to transition through panes of local content.</p>

      <h3><Anchor id="tabs-uncontrolled">Uncontrolled</Anchor></h3>
      <p>Allow the component to control its own state.</p>
      <ReactPlayground codeText={Samples.TabsUncontrolled} exampleClassName="bs-example-tabs" />

      <h3><Anchor id="tabs-controlled">Controlled</Anchor></h3>
      <p>Pass down the active state on render via props.</p>
      <ReactPlayground codeText={Samples.TabsControlled} exampleClassName="bs-example-tabs" />

      <h3><Anchor id="tabs-no-animation">No animation</Anchor></h3>
      <p>Set the <code>animation</code> prop to <code>false</code></p>
      <ReactPlayground codeText={Samples.TabsNoAnimation} exampleClassName="bs-example-tabs" />

      <h3><Anchor id="left-tabs">Left tabs</Anchor></h3>
      <p>Set <code>position</code> to <code>"left"</code>. Optionally, <code>tabWidth</code> can be passed the number of columns for the tabs.</p>
      <ReactPlayground codeText={Samples.LeftTabs} exampleClassName="bs-example-tabs" />

      <h3><Anchor id="tabs-props">Props</Anchor></h3>

      <h4><Anchor id="tabs-props-area">Tabs</Anchor></h4>
      <PropTable component="Tabs"/>

      <h4><Anchor id="tabs-props-pane">Tab</Anchor></h4>
      <PropTable component="Tab"/>
    </div>
  );
}
