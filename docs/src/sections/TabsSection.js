import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function TabsSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="tabs">Togglable tabs</Anchor> <small>Tabs, Tab, TabContainer, TabContent, TabPane</small>
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

      <h3><Anchor id="tabs-with-dropdown">Tabs with Dropdown</Anchor></h3>
      <ReactPlayground codeText={Samples.TabsWithDropdown} exampleClassName="bs-example-tabs" />

      <h3><Anchor id="tabs-custom-layout">Custom Tab Layout</Anchor></h3>
      <p>
        For more complex layouts the flexible <code>TabContainer</code>, <code>TabContent</code>, and
        <code>TabPane</code> components along with any style of <code>Nav</code> allow you to quickly piece
        together your own Tabs component with additional markup needed.
      </p>
      <p>
        Just create a set of NavItems each with an <code>eventKey</code> corresponding to the eventKey
        of a <code>TabPane</code>. Wrap the whole thing in a <code>TabContainer</code> and you have fully functioning
        custom tabs component. Check out the below example making use of the grid system and pills.
      </p>
      <ReactPlayground codeText={Samples.LeftTabs} exampleClassName="bs-example-tabs" />

      <h3><Anchor id="tabs-props">Props</Anchor></h3>

      <h4><Anchor id="tabs-props-area">Tabs</Anchor></h4>
      <PropTable component="Tabs"/>

      <h4><Anchor id="tabs-props-pane">Tab</Anchor></h4>
      <PropTable component="Tab"/>

      <h4><Anchor id="tabs-props-pane">TabContainer</Anchor></h4>
      <PropTable component="TabContainer"/>

      <h4><Anchor id="tabs-props-pane">TabContent</Anchor></h4>
      <PropTable component="TabContent"/>

      <h4><Anchor id="tabs-props-pane">TabPane</Anchor></h4>
      <PropTable component="TabPane"/>
    </div>
  );
}
