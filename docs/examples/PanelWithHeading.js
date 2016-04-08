const panelsInstance = (
  <div>
    <Panel>
      <Panel.Heading>
        Panel heading without title
      </Panel.Heading>
      <Panel.Body>
        Panel content
      </Panel.Body>
    </Panel>
    <Panel>
      <Panel.Heading>
        <Panel.Title componentClass="h3">
          Panel heading without title
        </Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        Panel content
      </Panel.Body>
    </Panel>
  </div>
);

ReactDOM.render(panelsInstance, mountNode);
