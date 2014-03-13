/** @jsx React.DOM */

var panelGroupInstance = (
  <PanelGroup defaultActiveKey={2} isAccordion>
    <Panel header="Panel 1" key={1}>Panel 1 content</Panel>
    <Panel header="Panel 2" key={2}>Panel 2 content</Panel>
  </PanelGroup>
);

React.renderComponent(panelGroupInstance, mountNode);