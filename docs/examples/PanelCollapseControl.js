const collapseControlInstance = (
  <PanelGroup accordion>
    <Panel header="Clickable header" collapseControl="heading" eventKey="1">Panel 1 content</Panel>
    <Panel header={<Button>Clickable button</Button>} collapseControl="element" eventKey="2">Panel 2 content</Panel>
    <Panel header="Clickable anchor" eventKey="3">Panel 3 content</Panel>
  </PanelGroup>
);

ReactDOM.render(collapseControlInstance, mountNode);
