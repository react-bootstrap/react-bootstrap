/** @jsx React.DOM */

var buttonGroupInstance = (
    <ButtonGroup>
      <Button bsStyle="default">Left</Button>
      <Button bsStyle="default">Middle</Button>
      <Button bsStyle="default">Right</Button>
    </ButtonGroup>
  );

React.renderComponent(buttonGroupInstance, mountNode);