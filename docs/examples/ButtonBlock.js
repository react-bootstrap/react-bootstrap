/** @jsx React.DOM */
var wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

var buttonsInstance = (
    <div className="well" style={wellStyles}>
      <Button bsStyle="primary" bsSize="large" block>Block level button</Button>
      <Button bsStyle="default" bsSize="large" block>Block level button</Button>
    </div>
  );

React.renderComponent(buttonsInstance, mountNode);