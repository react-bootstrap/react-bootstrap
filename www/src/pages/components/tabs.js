import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';
import ARIA from '../../components/AriaAbbr';

import TabsUncontrolled from '../../examples/Tabs/Uncontrolled';
import TabsControlled from '../../examples/Tabs/Controlled';
import TabsNoAnimation from '../../examples/Tabs/NoAnimation';
import LeftTabs from '../../examples/Tabs/LeftTabs';

export default function TabsSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2>
        <Anchor id="tabs">Tabbed components</Anchor>
      </h2>

      <p>
        Create dynamic tabbed interfaces, as described in the{' '}
        <a href="https://www.w3.org/TR/wai-aria-practices/#tabpanel">
          <abbr title="Web Accessibility Initiative">WAI</abbr> <ARIA />
          Authoring Practices
        </a>. <code>Tabs</code> is a higher-level component for quickly creating
        a <code>Nav</code> matched with a set of <code>TabPane</code>s.
      </p>

      <ReactPlayground
        codeText={TabsUncontrolled}
        exampleClassName="bs-example-tabs"
      />

      <h3>
        <Anchor id="tabs-controlled">Controlled</Anchor>
      </h3>
      <p>
        <code>Tabs</code> can be controlled directly when you want to handle the
        selection logic personally.
      </p>
      <ReactPlayground
        codeText={TabsControlled}
        exampleClassName="bs-example-tabs"
      />

      <h3>
        <Anchor id="tabs-no-animation">No animation</Anchor>
      </h3>
      <p>
        Set the <code>transition</code> prop to <code>false</code>
      </p>
      <ReactPlayground
        codeText={TabsNoAnimation}
        exampleClassName="bs-example-tabs"
      />

      <h3>
        <Anchor id="tabs-with-dropdown">Dropdowns?</Anchor>
      </h3>
      <p>
        Dynamic tabbed interfaces should not contain dropdown menus, as this
        causes both usability and accessibility issues. From a usability
        perspective, the fact that the currently displayed tab’s trigger element
        is not immediately visible (as it’s inside the closed dropdown menu) can
        cause confusion. From an accessibility point of view, there is currently
        no sensible way to map this sort of construct to a standard WAI ARIA
        pattern, meaning that it cannot be easily made understandable to users
        of assistive technologies.
      </p>
      <p>
        That said, it Dropdowns do work technically (sans focus management), but
        we don't make any claims about support.
      </p>
      <h3>
        <Anchor id="tabs-custom-layout">Custom Tab Layout</Anchor>
      </h3>
      <p>
        For more complex layouts the flexible <code>TabContainer</code>,{' '}
        <code>TabContent</code>, and <code>TabPane</code> components along with
        any style of <code>Nav</code> allow you to quickly piece together your
        own Tabs component with additional markup needed.
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
