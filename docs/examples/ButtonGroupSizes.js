/** @jsx React.DOM */

var buttonGroupInstance = (
    <div>
      <ButtonToolbar>
        <ButtonGroup bsSize="large">
          <Button bsStyle="default">Left</Button>
          <Button bsStyle="default">Middle</Button>
          <Button bsStyle="default">Right</Button>
        </ButtonGroup>
      </ButtonToolbar>

      <ButtonToolbar>
        <ButtonGroup>
          <Button bsStyle="default">Left</Button>
          <Button bsStyle="default">Middle</Button>
          <Button bsStyle="default">Right</Button>
        </ButtonGroup>
      </ButtonToolbar>

      <ButtonToolbar>
        <ButtonGroup bsSize="small">
          <Button bsStyle="default">Left</Button>
          <Button bsStyle="default">Middle</Button>
          <Button bsStyle="default">Right</Button>
        </ButtonGroup>
      </ButtonToolbar>

      <ButtonToolbar>
        <ButtonGroup bsSize="xsmall">
          <Button bsStyle="default">Left</Button>
          <Button bsStyle="default">Middle</Button>
          <Button bsStyle="default">Right</Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
  );

React.renderComponent(buttonGroupInstance, mountNode);