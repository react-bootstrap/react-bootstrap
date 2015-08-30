const buttonGroupInstance = (
  <div>
    <ButtonToolbar>
      <ButtonGroup bsSize="large">
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </ButtonGroup>
    </ButtonToolbar>

    <ButtonToolbar>
      <ButtonGroup>
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </ButtonGroup>
    </ButtonToolbar>

    <ButtonToolbar>
      <ButtonGroup bsSize="small">
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </ButtonGroup>
    </ButtonToolbar>

    <ButtonToolbar>
      <ButtonGroup bsSize="xsmall">
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </ButtonGroup>
    </ButtonToolbar>
  </div>
);

React.render(buttonGroupInstance, mountNode);
