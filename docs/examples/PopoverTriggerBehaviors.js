const positionerInstance = (
  <ButtonToolbar>
    <OverlayTrigger trigger="click" placement="bottom" overlay={<Popover title="Popover bottom"><strong>Holy guacamole!</strong> Check this info.</Popover>}>
      <Button bsStyle="default">Click</Button>
    </OverlayTrigger>
    <OverlayTrigger trigger="hover" placement="bottom" overlay={<Popover title="Popover bottom"><strong>Holy guacamole!</strong> Check this info.</Popover>}>
      <Button bsStyle="default">Hover</Button>
    </OverlayTrigger>
    <OverlayTrigger trigger="focus" placement="bottom" overlay={<Popover title="Popover bottom"><strong>Holy guacamole!</strong> Check this info.</Popover>}>
      <Button bsStyle="default">Focus</Button>
    </OverlayTrigger>
    <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={<Popover title="Popover bottom"><strong>Holy guacamole!</strong> Check this info.</Popover>}>
      <Button bsStyle="default">Click + rootClose</Button>
    </OverlayTrigger>
  </ButtonToolbar>
);

React.render(positionerInstance, mountNode);
