var renderedInstance;

function handleSelect (selectedKey) {
  renderedInstance.setProps({
    activeKey: selectedKey
  });
}

var panelGroupInstance = (
  <PanelGroup activeKey='1' onSelect={handleSelect} accordion>
    <Panel header="Panel 1" key='1'>Panel 1 content</Panel>
    <Panel header="Panel 2" key='2'>Panel 2 content</Panel>
  </PanelGroup>
);

renderedInstance = React.render(panelGroupInstance, mountNode);