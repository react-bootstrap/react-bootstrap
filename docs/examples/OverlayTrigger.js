
const overlayExample = (
  <div>
    <OverlayTrigger
      defaultOverlayShown={true}
      placement="right"
      trigger='click'
      overlay={<Tooltip>I am a tooltip overlay!</Tooltip>}
    >
      <Button>I am an Overlay target (click me)</Button>
    </OverlayTrigger>
  </div>
);

React.render(overlayExample, mountNode);
