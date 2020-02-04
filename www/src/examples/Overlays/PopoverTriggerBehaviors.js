const popover = triggerBehavior => (
  <Popover id={`popover-trigger-${triggerBehavior}`}>
    <Popover.Title as="h3">Popover bottom</Popover.Title>
    <Popover.Content>
      <strong>Holy guacamole!</strong> Check this info.
    </Popover.Content>
  </Popover>
);

const popoverClick = <popover triggerBehavior="click" />;

const popoverHoverFocus = <popover triggerBehavior="hover-focus" />;

const popoverFocus = <popover triggerBehavior="focus" />;

const popoverClickRootClose = <popover triggerBehavior="click-root-close" />;

render(
  <>
    <OverlayTrigger trigger="click" placement="bottom" overlay={popoverClick}>
      <Button>Click</Button>
    </OverlayTrigger>{' '}
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement="bottom"
      overlay={popoverHoverFocus}
    >
      <Button>Hover + Focus</Button>
    </OverlayTrigger>{' '}
    <OverlayTrigger trigger="focus" placement="bottom" overlay={popoverFocus}>
      <Button>Focus</Button>
    </OverlayTrigger>{' '}
    <OverlayTrigger
      trigger="click"
      rootClose
      placement="bottom"
      overlay={popoverClickRootClose}
    >
      <Button>Click w/rootClose</Button>
    </OverlayTrigger>
  </>,
);
