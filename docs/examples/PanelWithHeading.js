/** @jsx React.DOM */

var title = (
    <h3>Panel title</h3>
  );

var panelsInstance = (
    <div>
      <Panel header="Panel heading without title">
        Panel content
      </Panel>
      <Panel header={title}>
        Panel content
      </Panel>
    </div>
  );

React.renderComponent(panelsInstance, mountNode);