var panelGroupInstance = (
  <PanelGroup defaultActiveKey='2' accordion>
    <Panel header="Panel 1" selectKey='1'>Panel 1 content</Panel>
    <Panel header="Panel 2" selectKey='2'>Panel 2 content</Panel>
  </PanelGroup>
);

React.render(panelGroupInstance, mountNode);