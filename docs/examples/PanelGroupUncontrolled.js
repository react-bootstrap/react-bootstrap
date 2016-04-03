const panelGroupInstance = (
  <PanelGroup
    id="accordion-uncontrolled-example"
    defaultActiveKey="2"
    accordion
  >
    <Panel eventKey="1">
      <Panel.Heading title>
        <h3>
          <Panel.Toggle>Panel heading 1</Panel.Toggle>
        </h3>
      </Panel.Heading>
      <Panel.Collapse>
        <Panel.Body>
          Panel content 1
        </Panel.Body>
      </Panel.Collapse>
    </Panel>
    <Panel eventKey="2">
      <Panel.Heading title>
        <h3>
          <Panel.Toggle>Panel heading 2</Panel.Toggle>
        </h3>
      </Panel.Heading>
      <Panel.Collapse>
        <Panel.Body>
          Panel content 2
        </Panel.Body>
      </Panel.Collapse>
    </Panel>
  </PanelGroup>
);

ReactDOM.render(panelGroupInstance, mountNode);
