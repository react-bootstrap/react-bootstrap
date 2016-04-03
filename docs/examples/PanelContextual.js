const heading = (
  <Panel.Heading>Panel title</Panel.Heading>
);

const panelsInstance = (
  <div>
    <Panel bsStyle="primary">
      <Panel.Heading>Panel title</Panel.Heading>
      <Panel.Body>
        Panel content
      </Panel.Body>
    </Panel>

    <Panel bsStyle="success">
      <Panel.Heading>Panel title</Panel.Heading>
      <Panel.Body>
        Panel content
      </Panel.Body>
    </Panel>

    <Panel bsStyle="info">
      <Panel.Heading>Panel title</Panel.Heading>
      <Panel.Body>
        Panel content
      </Panel.Body>
    </Panel>

    <Panel bsStyle="warning">
      <Panel.Heading>Panel title</Panel.Heading>
      <Panel.Body>
        Panel content
      </Panel.Body>
    </Panel>

    <Panel bsStyle="danger">
      <Panel.Heading>Panel title</Panel.Heading>
      <Panel.Body>
        Panel content
      </Panel.Body>
    </Panel>
  </div>
);

ReactDOM.render(panelsInstance, mountNode);
