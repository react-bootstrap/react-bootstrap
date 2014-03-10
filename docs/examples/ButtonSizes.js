/** @jsx React.DOM */

var buttonsInstance = (
    <div>
      <p>
        <Button bsStyle="primary" bsSize="large">Large button</Button>
        <Button bsStyle="default" bsSize="large">Large button</Button>
      </p>
      <p>
        <Button bsStyle="primary">Default button</Button>
        <Button bsStyle="default">Default button</Button>
      </p>
      <p>
        <Button bsStyle="primary" bsSize="small">Small button</Button>
        <Button bsStyle="default" bsSize="small">Small button</Button>
      </p>
      <p>
        <Button bsStyle="primary" bsSize="xsmall">Extra small button</Button>
        <Button bsStyle="default" bsSize="xsmall">Extra small button</Button>
      </p>
    </div>
  );

React.renderComponent(buttonsInstance, mountNode);