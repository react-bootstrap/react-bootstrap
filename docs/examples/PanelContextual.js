/** @jsx React.DOM */

var title = (
    <h3>Panel title</h3>
  );

var panelsInstance = (
    <div>
      <Panel header={title}>
        Panel content
      </Panel>

      <Panel header={title} bsStyle="primary">
        Panel content
      </Panel>

      <Panel header={title} bsStyle="success">
        Panel content
      </Panel>

      <Panel header={title} bsStyle="info">
        Panel content
      </Panel>

      <Panel header={title} bsStyle="warning">
        Panel content
      </Panel>

      <Panel header={title} bsStyle="danger">
        Panel content
      </Panel>
    </div>
  );

React.renderComponent(panelsInstance, mountNode);