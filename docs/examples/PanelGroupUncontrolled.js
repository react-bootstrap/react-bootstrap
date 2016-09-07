const panelGroupInstance = (
  <PanelGroup
    accordion
    id="accordion-uncontrolled-example"
    defaultActiveKey="2"
  >
    <Panel eventKey="1" >
      <Panel.Heading>
        <Panel.Title toggle>Panel heading 1</Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        Panel content 1
      </Panel.Body>
    </Panel>
    <Panel eventKey="2">
      <Panel.Heading>
        <Panel.Title toggle>Panel heading 2</Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        Panel content 2
      </Panel.Body>
    </Panel>
  </PanelGroup>
);

ReactDOM.render(panelGroupInstance, mountNode);
