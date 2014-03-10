/** @jsx React.DOM */

var buttonsInstance = (
    <div>
      <Button bsStyle="primary" bsSize="large" active>Primary button</Button>
      <Button bsSize="large" active>Button</Button>
    </div>
  );

React.renderComponent(buttonsInstance, mountNode);