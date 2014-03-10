/** @jsx React.DOM */

var buttonGroupInstance = (
    <ButtonToolbar>
      <ButtonGroup>
        <Button bsStyle="default">1</Button>
        <Button bsStyle="default">2</Button>
        <Button bsStyle="default">3</Button>
        <Button bsStyle="default">4</Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button bsStyle="default">5</Button>
        <Button bsStyle="default">6</Button>
        <Button bsStyle="default">7</Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button bsStyle="default">8</Button>
      </ButtonGroup>
    </ButtonToolbar>
  );

React.renderComponent(buttonGroupInstance, mountNode);