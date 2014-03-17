/** @jsx React.DOM */

var buttonsInstance = (
    <ButtonToolbar>
      <Button href="#">Link</Button>
      <Button>Button</Button>
    </ButtonToolbar>
  );

React.renderComponent(buttonsInstance, mountNode);