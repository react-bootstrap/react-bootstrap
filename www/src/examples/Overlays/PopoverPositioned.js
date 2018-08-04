<ButtonToolbar>
  {['top', 'right', 'bottom', 'left'].map(placement => (
    <OverlayTrigger
      trigger="click"
      placement={placement}
      overlay={
        <Popover
          id={`popover-positioned-${placement}`}
          title={`Popover ${placement}`}
        >
          <strong>Holy guacamole!</strong> Check this info.
        </Popover>
      }
    >
      <Button variant="secondary">Popover on {placement}</Button>
    </OverlayTrigger>
  ))}
</ButtonToolbar>;
