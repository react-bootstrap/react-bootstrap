import { graphql } from 'gatsby';
import React from 'react';

import Anchor from '../../components/Anchor';
import LinkToSource from '../../components/LinkToSource';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import PanelBasic from '../../examples/PanelBasic';
import PanelCollapsible from '../../examples/PanelCollapsible';
import PanelWithHeading from '../../examples/PanelWithHeading';
import PanelWithFooter from '../../examples/PanelWithFooter';
import PanelContextual from '../../examples/PanelContextual';
import PanelListGroupFill from '../../examples/PanelListGroupFill';
import PanelGroupControlled from '../../examples/PanelGroupControlled';
import PanelGroupUncontrolled from '../../examples/PanelGroupUncontrolled';
import PanelGroupAccordion from '../../examples/PanelGroupAccordion';

export default function PanelSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="panels">Panels</Anchor>{' '}
        <small>Panel, PanelGroup, Accordion</small>
      </h2>

      <h3>
        <Anchor id="panels-basic">Basic example</Anchor>
      </h3>
      <p>
        By default, all the <code>&lt;Panel /&gt;</code> does is apply a basic
        border and padding to contain some content.
      </p>
      <p>
        You can pass on any additional properties you need, e.g. a custom{' '}
        <code>onClick</code> handler, as it is shown in the example code. They
        all will apply to the wrapper <code>div</code> element.
      </p>
      <ReactPlayground codeText={PanelBasic} />

      <h3>
        <Anchor id="panels-heading">Panel with heading</Anchor>
      </h3>
      <p>
        Easily add a heading container to your panel with the{' '}
        <code>{'<Panel.Heading>'}</code> and <code>{'<Panel.Title>'}</code>{' '}
        sub-components.
      </p>
      <ReactPlayground codeText={PanelWithHeading} />

      <h3>
        <Anchor id="panels-footer">Panel with footer</Anchor>
      </h3>
      <p>
        Pass buttons or secondary text in the <code>{'<Panel.Footer>'}</code>{' '}
        sub-component. Note that panel footers do not inherit colors and borders
        when using contextual variations as they are not meant to be in the
        foreground.
      </p>
      <ReactPlayground codeText={PanelWithFooter} />

      <h3>
        <Anchor id="panels-contextual">Contextual alternatives</Anchor>
      </h3>
      <p>
        Like other components, easily make a panel more meaningful to a
        particular context by adding a <code>bsStyle</code> prop.
      </p>
      <ReactPlayground codeText={PanelContextual} />

      <h3>
        <Anchor id="panels-tables">With tables and list groups</Anchor>
      </h3>
      <p>
        Add any <code>&lt;Table /&gt;</code>, <code>&lt;ListGroup /&gt;</code>{' '}
        to a panel for a seamless integration. Mix and match with{' '}
        <code>Panel.Body</code> as needed.
      </p>
      <ReactPlayground codeText={PanelListGroupFill} />

      <h3>
        <Anchor id="panels-collapsible">Collapsible Panel</Anchor>
      </h3>
      <ReactPlayground codeText={PanelCollapsible} />

      <h3>
        <Anchor id="panels-controlled">Controlled PanelGroups</Anchor>
      </h3>
      <p>
        <code>PanelGroup</code>s can be controlled by a parent component. The{' '}
        <code>activeKey</code> prop dictates which panel is open.
      </p>
      <ReactPlayground codeText={PanelGroupControlled} />

      <h3>
        <Anchor id="panels-uncontrolled">Uncontrolled PanelGroups</Anchor>
      </h3>
      <p>
        <code>PanelGroup</code>s can also be uncontrolled where they manage
        their own state. The <code>defaultActiveKey</code> prop dictates which
        panel is open when initially.
      </p>
      <ReactPlayground codeText={PanelGroupUncontrolled} />

      <h3>
        <Anchor id="panels-accordion">Accordions</Anchor>
      </h3>
      <p>
        Use <code>&lt;PanelGroup accordion /&gt;</code> to create an accordion
        style collapsing Panel set.
      </p>
      <ReactPlayground codeText={PanelGroupAccordion} />

      <h3>
        <Anchor id="panels-props">Props</Anchor>
      </h3>

      <h4>
        <Anchor id="panels-props-accordion">Panels, Accordion</Anchor>
        <LinkToSource component={data.Panel.displayName} />
      </h4>
      <PropTable metadata={data.Panel} />

      <h4>
        <Anchor id="panels-props-panel-heading">Panel.Heading</Anchor>
        <LinkToSource component={data.PanelHeading.displayName} />
      </h4>
      <PropTable metadata={data.PanelHeading} />

      <h4>
        <Anchor id="panels-props-panel-title">Panel.Title</Anchor>
        <LinkToSource component={data.PanelTitle.displayName} />
      </h4>
      <PropTable metadata={data.PanelTitle} />

      <h4>
        <Anchor id="panels-props-panel-toggle">Panel.Toggle</Anchor>
        <LinkToSource component={data.PanelToggle.displayName} />
      </h4>
      <PropTable metadata={data.PanelToggle} />

      <h4>
        <Anchor id="panels-props-panel-collapse">Panel.Collapse</Anchor>
        <LinkToSource component={data.PanelCollapse.displayName} />
      </h4>
      <PropTable metadata={data.PanelCollapse} />

      <h4>
        <Anchor id="panels-props-panel-body">Panel.Body</Anchor>
        <LinkToSource component={data.PanelBody.displayName} />
      </h4>
      <PropTable metadata={data.PanelBody} />

      <h4>
        <Anchor id="panels-props-panel-footer">Panel.Footer</Anchor>
        <LinkToSource component={data.PanelFooter.displayName} />
      </h4>
      <PropTable metadata={data.PanelFooter} />

      <h4>
        <Anchor id="panels-props-group">PanelGroup</Anchor>
        <LinkToSource component={data.PanelGroup.displayName} />
      </h4>
      <PropTable metadata={data.PanelGroup} />
    </div>
  );
}

export const query = graphql`
  query PanelQuery {
    Panel: componentMetadata(displayName: { eq: "Panel" }) {
      ...PropTable_metadata
    }
    PanelHeading: componentMetadata(displayName: { eq: "PanelHeading" }) {
      ...PropTable_metadata
    }
    PanelTitle: componentMetadata(displayName: { eq: "PanelTitle" }) {
      ...PropTable_metadata
    }
    PanelBody: componentMetadata(displayName: { eq: "PanelBody" }) {
      ...PropTable_metadata
    }
    PanelFooter: componentMetadata(displayName: { eq: "PanelFooter" }) {
      ...PropTable_metadata
    }
    PanelToggle: componentMetadata(displayName: { eq: "PanelToggle" }) {
      ...PropTable_metadata
    }
    PanelCollapse: componentMetadata(displayName: { eq: "PanelCollapse" }) {
      ...PropTable_metadata
    }
    PanelGroup: componentMetadata(displayName: { eq: "PanelGroup" }) {
      ...PropTable_metadata
    }
  }
`;
