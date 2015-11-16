import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function PanelSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="panels">Panels</Anchor> <small>Panel, PanelGroup, Accordion</small>
      </h2>

      <h3><Anchor id="panels-basic">Basic example</Anchor></h3>
      <p>By default, all the <code>&lt;Panel /&gt;</code> does is apply some basic border and padding to contain some content.</p>
      <p>You can pass on any additional properties you need, e.g. a custom <code>onClick</code> handler, as it is shown in the example code. They all will apply to the wrapper <code>div</code> element.</p>
      <ReactPlayground codeText={Samples.PanelBasic} />

      <h3><Anchor id="panels-collapsible">Collapsible Panel</Anchor></h3>
      <ReactPlayground codeText={Samples.PanelCollapsible} />

      <h3><Anchor id="panels-heading">Panel with heading</Anchor></h3>
      <p>Easily add a heading container to your panel with the <code>header</code> prop.</p>
      <ReactPlayground codeText={Samples.PanelWithHeading} />

      <h3><Anchor id="panels-footer">Panel with footer</Anchor></h3>
      <p>Pass buttons or secondary text in the <code>footer</code> prop. Note that panel footers do not inherit colors and borders when using contextual variations as they are not meant to be in the foreground.</p>
      <ReactPlayground codeText={Samples.PanelWithFooter} />

      <h3><Anchor id="panels-contextual">Contextual alternatives</Anchor></h3>
      <p>Like other components, easily make a panel more meaningful to a particular context by adding a <code>bsStyle</code> prop.</p>
      <ReactPlayground codeText={Samples.PanelContextual} />

      <h3><Anchor id="panels-tables">With tables and list groups</Anchor></h3>
      <p>Add the <code>fill</code> prop to <code>&lt;Table /&gt;</code> or <code>&lt;ListGroup /&gt;</code> elements to make them fill the panel.</p>
      <ReactPlayground codeText={Samples.PanelListGroupFill} />

      <h3><Anchor id="panels-controlled">Controlled PanelGroups</Anchor></h3>
      <p><code>PanelGroup</code>s can be controlled by a parent component. The <code>activeKey</code> prop dictates which panel is open.</p>
      <ReactPlayground codeText={Samples.PanelGroupControlled} />

      <h3><Anchor id="panels-uncontrolled">Uncontrolled PanelGroups</Anchor></h3>
      <p><code>PanelGroup</code>s can also be uncontrolled where they manage their own state. The <code>defaultActiveKey</code> prop dictates which panel is open when initially.</p>
      <ReactPlayground codeText={Samples.PanelGroupUncontrolled} />

      <h3><Anchor id="panels-accordion">Accordions</Anchor></h3>
      <p><code>&lt;Accordion /&gt;</code> aliases <code>&lt;PanelGroup accordion /&gt;</code>.</p>
      <ReactPlayground codeText={Samples.PanelGroupAccordion} />

      <h3><Anchor id="panels-props">Props</Anchor></h3>

      <h4><Anchor id="panels-props-accordion">Panels, Accordion</Anchor></h4>
      <PropTable component="Panel"/>

      <h4><Anchor id="panels-props-group">PanelGroup</Anchor></h4>
      <PropTable component="PanelGroup"/>
    </div>
  );
}
