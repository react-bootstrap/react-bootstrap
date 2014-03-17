/** @jsx React.DOM */

var buttonsInstance = (
    <ButtonToolbar>
      <Button bsStyle="primary" bsSize="large" disabled>Primary button</Button>
      <Button bsSize="large" disabled>Button</Button>
    </ButtonToolbar>
  );

React.renderComponent(buttonsInstance, mountNode);