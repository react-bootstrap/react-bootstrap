/** @jsx React.DOM */

var key = 1;
var panelGroupInstance;
var renderedInstance;

function handleSelect (selectedKey) {
  renderedInstance.setProps({
    activeKey: selectedKey
  });
}

panelGroupInstance = (
  <PanelGroup activeKey={key} onSelect={handleSelect} isAccordion>
    <Panel header="Panel 1" key={1}>Panel 1 content</Panel>
    <Panel header="Panel 2" key={2}>Panel 2 content</Panel>
  </PanelGroup>
);

renderedInstance = React.renderComponent(panelGroupInstance, mountNode);