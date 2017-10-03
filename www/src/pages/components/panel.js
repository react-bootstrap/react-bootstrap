import React from 'react';

import Anchor from '../../components/Anchor';
import PropTable from '../../components/PropTable';
import ReactPlayground from '../../components/ReactPlayground';

import PanelBasic from '!!raw-loader!../../examples/PanelBasic';
import PanelCollapsible from '!!raw-loader!../../examples/PanelCollapsible';
import PanelWithHeading from '!!raw-loader!../../examples/PanelWithHeading';
import PanelWithFooter from '!!raw-loader!../../examples/PanelWithFooter';
import PanelContextual from '!!raw-loader!../../examples/PanelContextual';
import PanelListGroupFill from '!!raw-loader!../../examples/PanelListGroupFill';
import PanelGroupControlled from '!!raw-loader!../../examples/PanelGroupControlled';
import PanelGroupUncontrolled from '!!raw-loader!../../examples/PanelGroupUncontrolled';
import PanelGroupAccordion from '!!raw-loader!../../examples/PanelGroupAccordion';

export default function PanelSection({ data }) {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="panels">Panels</Anchor> <small>Panel, PanelGroup, Accordion</small>
      </h2>

      <h3><Anchor id="panels-basic">Basic example</Anchor></h3>
      <p>By default, all the <code>&lt;Panel /&gt;</code> does is apply some basic border and padding to contain some content.</p>
      <p>You can pass on any additional properties you need, e.g. a custom <code>onClick</code> handler, as it is shown in the example code. They all will apply to the wrapper <code>div</code> element.</p>
      <ReactPlayground codeText={PanelBasic} />

      <h3><Anchor id="panels-collapsible">Collapsible Panel</Anchor></h3>
      <ReactPlayground codeText={PanelCollapsible} />

      <h3><Anchor id="panels-heading">Panel with heading</Anchor></h3>
      <p>Easily add a heading container to your panel with the <code>header</code> prop.</p>
      <ReactPlayground codeText={PanelWithHeading} />

      <h3><Anchor id="panels-footer">Panel with footer</Anchor></h3>
      <p>Pass buttons or secondary text in the <code>footer</code> prop. Note that panel footers do not inherit colors and borders when using contextual variations as they are not meant to be in the foreground.</p>
      <ReactPlayground codeText={PanelWithFooter} />

      <h3><Anchor id="panels-contextual">Contextual alternatives</Anchor></h3>
      <p>Like other components, easily make a panel more meaningful to a particular context by adding a <code>bsStyle</code> prop.</p>
      <ReactPlayground codeText={PanelContextual} />

      <h3><Anchor id="panels-tables">With tables and list groups</Anchor></h3>
      <p>Add the <code>fill</code> prop to <code>&lt;Table /&gt;</code> or <code>&lt;ListGroup /&gt;</code> elements to make them fill the panel.</p>
      <ReactPlayground codeText={PanelListGroupFill} />

      <h3><Anchor id="panels-controlled">Controlled PanelGroups</Anchor></h3>
      <p><code>PanelGroup</code>s can be controlled by a parent component. The <code>activeKey</code> prop dictates which panel is open.</p>
      <ReactPlayground codeText={PanelGroupControlled} />

      <h3><Anchor id="panels-uncontrolled">Uncontrolled PanelGroups</Anchor></h3>
      <p><code>PanelGroup</code>s can also be uncontrolled where they manage their own state. The <code>defaultActiveKey</code> prop dictates which panel is open when initially.</p>
      <ReactPlayground codeText={PanelGroupUncontrolled} />

      <h3><Anchor id="panels-accordion">Accordions</Anchor></h3>
      <p><code>&lt;Accordion /&gt;</code> aliases <code>&lt;PanelGroup accordion /&gt;</code>.</p>
      <ReactPlayground codeText={PanelGroupAccordion} />

      <h3><Anchor id="panels-props">Props</Anchor></h3>

      <h4><Anchor id="panels-props-accordion">Panels, Accordion</Anchor></h4>
      <PropTable metadata={data.Panel}/>

      <h4><Anchor id="panels-props-group">PanelGroup</Anchor></h4>
      <PropTable metadata={data.PanelGroup}/>
    </div>
  );
}

export const query = graphql`
  query PanelQuery {
    Panel: componentMetadata(displayName: { eq: "Panel" }) {
      ...PropTable_metadata
    }
    PanelGroup: componentMetadata(displayName: { eq: "PanelGroup" }) {
      ...PropTable_metadata
    }
  }
`;
