/** @jsx React.DOM */

var buttonsInstance = (
    <div>
      <Button bsStyle="primary" bsSize="large" disabled>Primary button</Button>
      <Button bsSize="large" disabled>Button</Button>
    </div>
  );

React.renderComponent(buttonsInstance, mountNode);