const tooltip = (
  <Tooltip id="tooltip">
    <strong>Holy guacamole!</strong> Check this info.
  </Tooltip>
);

const positionerInstance = (
  <ButtonToolbar>
    <OverlayTrigger placement="left" overlay={tooltip}>
      <Button variant="default">Holy guacamole!</Button>
    </OverlayTrigger>

    <OverlayTrigger placement="top" overlay={tooltip}>
      <Button variant="default">Holy guacamole!</Button>
    </OverlayTrigger>

    <OverlayTrigger placement="bottom" overlay={tooltip}>
      <Button variant="default">Holy guacamole!</Button>
    </OverlayTrigger>

    <OverlayTrigger placement="right" overlay={tooltip}>
      <Button variant="default">Holy guacamole!</Button>
    </OverlayTrigger>
  </ButtonToolbar>
);

render(positionerInstance);
