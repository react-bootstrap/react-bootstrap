const buttonsInstance = (
  <div>
    <ButtonToolbar>
      <Button bsStyle="primary" bsSize="large">
        Large button
      </Button>
      <Button bsSize="large">Large button</Button>
    </ButtonToolbar>

    <ButtonToolbar>
      <Button bsStyle="primary" bsSize="small">
        Small button
      </Button>
      <Button bsSize="small" bsStyle="secondary">
        Small button
      </Button>
    </ButtonToolbar>
  </div>
);

render(buttonsInstance);
