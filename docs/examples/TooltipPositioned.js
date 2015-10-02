
const tooltip = (
  <Tooltip><strong>Holy guacamole!</strong> Check this info.</Tooltip>
);

const positionerInstance = (
  <ButtonToolbar>
    <OverlayTrigger placement="left" overlay={tooltip}>
      <Button bsStyle="default">Holy guacamole!</Button>
    </OverlayTrigger>

    <OverlayTrigger placement="top" overlay={tooltip}>
      <Button bsStyle="default">Holy guacamole!</Button>
    </OverlayTrigger>

    <OverlayTrigger placement="bottom" overlay={tooltip}>
      <Button bsStyle="default">Holy guacamole!</Button>
    </OverlayTrigger>

    <OverlayTrigger placement="right" overlay={tooltip}>
      <Button bsStyle="default">Holy guacamole!</Button>
    </OverlayTrigger>
  </ButtonToolbar>
);

React.render(positionerInstance, mountNode);
