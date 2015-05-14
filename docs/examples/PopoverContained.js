const positionerInstance = (
  <ButtonToolbar>
    <OverlayTrigger
      container={mountNode} containerPadding={20}
      trigger='click' placement='bottom'
      overlay={<Popover title='Popover bottom'><strong>Holy guacamole!</strong> Check this info.</Popover>}
    >
      <Button bsStyle='default'>Holy guacamole!</Button>
    </OverlayTrigger>
  </ButtonToolbar>
);

React.render(positionerInstance, mountNode);
