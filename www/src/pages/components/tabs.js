import { graphql } from 'gatsby';
import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import TabsUncontrolled from '../../examples/TabsUncontrolled';
import TabsControlled from '../../examples/TabsControlled';
import TabsNoAnimation from '../../examples/TabsNoAnimation';
import TabsWithDropdown from '../../examples/TabsWithDropdown';
import LeftTabs from '../../examples/LeftTabs';

export default function TabsSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="tabs">Togglable tabs</Anchor>{' '}
        <small>Tabs, Tab, TabContainer, TabContent, TabPane</small>
      </h2>

      <p>
        Add quick, dynamic tab functionality to transition through panes of
        local content.
      </p>

      <h3>
        <Anchor id="tabs-uncontrolled">Uncontrolled</Anchor>
      </h3>
      <p>Allow the component to control its own state.</p>
      <ReactPlayground
        codeText={TabsUncontrolled}
        exampleClassName="bs-example-tabs"
      />

      <h3>
        <Anchor id="tabs-controlled">Controlled</Anchor>
      </h3>
      <p>Pass down the active state on render via props.</p>
      <ReactPlayground
        codeText={TabsControlled}
        exampleClassName="bs-example-tabs"
      />

      <h3>
        <Anchor id="tabs-no-animation">No animation</Anchor>
      </h3>
      <p>
        Set the <code>animation</code> prop to <code>false</code>
      </p>
      <ReactPlayground
        codeText={TabsNoAnimation}
        exampleClassName="bs-example-tabs"
      />

      <h3>
        <Anchor id="tabs-with-dropdown">Tabs with Dropdown</Anchor>
      </h3>
      <ReactPlayground
        codeText={TabsWithDropdown}
        exampleClassName="bs-example-tabs"
      />

      <h3>
        <Anchor id="tabs-custom-layout">Custom Tab Layout</Anchor>
      </h3>
      <p>
        For more complex layouts the flexible <code>TabContainer</code>,{' '}
        <code>TabContent</code>, and
        <code>TabPane</code> components along with any style of <code>Nav</code>{' '}
        allow you to quickly piece together your own Tabs component with
        additional markup needed.
      </p>
      <p>
        Just create a set of NavItems each with an <code>eventKey</code>{' '}
        corresponding to the eventKey of a <code>TabPane</code>. Wrap the whole
        thing in a <code>TabContainer</code> and you have fully functioning
        custom tabs component. Check out the below example making use of the
        grid system and pills.
      </p>
      <ReactPlayground codeText={LeftTabs} exampleClassName="bs-example-tabs" />

      <h3>
        <Anchor id="tabs-props">Props</Anchor>
      </h3>

      <h4>
        <Anchor id="tabs-props-area">Tabs</Anchor>
        <LinkToSource component={data.Tabs.displayName} />
      </h4>
      <PropTable metadata={data.Tabs} />

      <h4>
        <Anchor id="tabs-props-pane">Tab</Anchor>
        <LinkToSource component={data.Tab.displayName} />
      </h4>
      <PropTable metadata={data.Tab} />

      <h4>
        <Anchor id="tabs-props-pane">TabContainer</Anchor>
        <LinkToSource component={data.TabContainer.displayName} />
      </h4>
      <PropTable metadata={data.TabContainer} />

      <h4>
        <Anchor id="tabs-props-pane">TabContent</Anchor>
        <LinkToSource component={data.TabContent.displayName} />
      </h4>
      <PropTable metadata={data.TabContent} />

      <h4>
        <Anchor id="tabs-props-pane">TabPane</Anchor>
        <LinkToSource component={data.TabPane.displayName} />
      </h4>
      <PropTable metadata={data.TabPane} />
    </div>
  );
}

export const query = graphql`
  query TabsQuery {
    Tabs: componentMetadata(displayName: { eq: "Tabs" }) {
      ...PropTable_metadata
    }
    Tab: componentMetadata(displayName: { eq: "Tab" }) {
      ...PropTable_metadata
    }
    TabContainer: componentMetadata(displayName: { eq: "TabContainer" }) {
      ...PropTable_metadata
    }
    TabContent: componentMetadata(displayName: { eq: "TabContent" }) {
      ...PropTable_metadata
    }
    TabPane: componentMetadata(displayName: { eq: "TabPane" }) {
      ...PropTable_metadata
    }
  }
`;
