const title = (
  <h3>Panel title</h3>
);

const panelsInstance = (
  <div>
    <Panel header="Panel heading without title">
      Panel content
    </Panel>
    <Panel header={title}>
      Panel content
    </Panel>
  </div>
);

React.render(panelsInstance, mountNode);
