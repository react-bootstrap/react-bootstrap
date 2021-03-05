import { graphql } from 'gatsby';

import LinkedHeading from '../../components/LinkedHeading';
import ARIA from '../../components/AriaAbbr';
import ComponentApi from '../../components/ComponentApi';
import ReactPlayground from '../../components/ReactPlayground';
import TabsControlled from '../../examples/Tabs/Controlled';
import LeftTabs from '../../examples/Tabs/LeftTabs';
import TabsNoAnimation from '../../examples/Tabs/NoAnimation';
import TabsUncontrolled from '../../examples/Tabs/Uncontrolled';
import withLayout from '../../withLayout';

export default withLayout(function TabsSection({ data }) {
  return (
    <>
      <LinkedHeading h="2" id="tabs">
        Tabbed components
      </LinkedHeading>
      <p className="lead">Dynamic tabbed interfaces</p>

      <LinkedHeading h="2" id="tabs-examples">
        Examples
      </LinkedHeading>

      <p>
        Create dynamic tabbed interfaces, as described in the{' '}
        <a href="https://www.w3.org/TR/wai-aria-practices/#tabpanel">
          <abbr title="Web Accessibility Initiative">WAI</abbr> <ARIA />{' '}
          Authoring Practices
        </a>
        . <code>Tabs</code> is a higher-level component for quickly creating a{' '}
        <code>Nav</code> matched with a set of <code>TabPane</code>s.
      </p>

      <ReactPlayground
        codeText={TabsUncontrolled}
        exampleClassName="bs-example-tabs"
      />

      <LinkedHeading h="2" id="tabs-controlled">
        Controlled
      </LinkedHeading>
      <p>
        <code>Tabs</code> can be controlled directly when you want to handle the
        selection logic personally.
      </p>
      <ReactPlayground
        codeText={TabsControlled}
        exampleClassName="bs-example-tabs"
      />

      <LinkedHeading h="2" id="tabs-no-animation">
        No animation
      </LinkedHeading>
      <p>
        Set the <code>transition</code> prop to <code>false</code>
      </p>
      <ReactPlayground
        codeText={TabsNoAnimation}
        exampleClassName="bs-example-tabs"
      />

      <LinkedHeading h="2" id="tabs-with-dropdown">
        Dropdowns?
      </LinkedHeading>
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
      <LinkedHeading h="2" id="tabs-custom-layout">
        Custom Tab Layout
      </LinkedHeading>
      <p>
        For more complex layouts the flexible <code>TabContainer</code>,{' '}
        <code>TabContent</code>, and <code>TabPane</code> components along with
        any style of <code>Nav</code> allow you to quickly piece together your
        own Tabs component with additional markup needed.
      </p>
      <p>
        Create a set of NavItems each with an <code>eventKey</code>{' '}
        corresponding to the eventKey of a <code>TabPane</code>. Wrap the whole
        thing in a <code>TabContainer</code> and you have fully functioning
        custom tabs component. Check out the below example making use of the
        grid system and pills.
      </p>
      <ReactPlayground codeText={LeftTabs} exampleClassName="bs-example-tabs" />

      <LinkedHeading h="2" id="tabs-api">
        API
      </LinkedHeading>

      <ComponentApi metadata={data.Tabs} />
      <ComponentApi metadata={data.Tab} />
      <ComponentApi metadata={data.TabContainer} />
      <ComponentApi metadata={data.TabContent} />
      <ComponentApi metadata={data.TabPane} />
    </>
  );
});

export const query = graphql`
  query TabsQuery {
    Tabs: componentMetadata(displayName: { eq: "Tabs" }) {
      ...ComponentApi_metadata
    }
    Tab: componentMetadata(displayName: { eq: "Tab" }) {
      ...ComponentApi_metadata
    }
    TabContainer: componentMetadata(displayName: { eq: "TabContainer" }) {
      ...ComponentApi_metadata
    }
    TabContent: componentMetadata(displayName: { eq: "TabContent" }) {
      ...ComponentApi_metadata
    }
    TabPane: componentMetadata(displayName: { eq: "TabPane" }) {
      ...ComponentApi_metadata
    }
  }
`;
