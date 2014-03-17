/** @jsx React.DOM */

var buttonsInstance = (
    <ButtonToolbar>
      <Button bsStyle="primary" bsSize="large" active>Primary button</Button>
      <Button bsSize="large" active>Button</Button>
    </ButtonToolbar>
  );

React.renderComponent(buttonsInstance, mountNode);