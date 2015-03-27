const positionerInstance = (
  <ButtonToolbar>
    <OverlayTrigger placement='left' overlay={<Tooltip><strong>Holy guacamole!</strong> Check this info.</Tooltip>}>
      <Button bsStyle='default'>Holy guacamole!</Button>
    </OverlayTrigger>
    <OverlayTrigger placement='top' overlay={<Tooltip><strong>Holy guacamole!</strong> Check this info.</Tooltip>}>
      <Button bsStyle='default'>Holy guacamole!</Button>
    </OverlayTrigger>
    <OverlayTrigger placement='bottom' overlay={<Tooltip><strong>Holy guacamole!</strong> Check this info.</Tooltip>}>
      <Button bsStyle='default'>Holy guacamole!</Button>
    </OverlayTrigger>
    <OverlayTrigger placement='right' overlay={<Tooltip><strong>Holy guacamole!</strong> Check this info.</Tooltip>}>
      <Button bsStyle='default'>Holy guacamole!</Button>
    </OverlayTrigger>
  </ButtonToolbar>
);

React.render(positionerInstance, mountNode);
