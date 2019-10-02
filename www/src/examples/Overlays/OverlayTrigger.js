const renderTooltip = ({
  placement,
  scheduleUpdate,
  arrowProps,
  outOfBoundaries,
  show,
  ...props
}) => (
  <div
    {...props}
    style={{
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      padding: '2px 10px',
      color: 'white',
      borderRadius: 3,
      ...props.style,
    }}
  >
    Simple tooltip
  </div>
);

const Example = () => (
  <OverlayTrigger
    placement="right-start"
    delay={{ show: 250, hide: 400 }}
    overlay={renderTooltip}
  >
    <Button variant="success">Hover me to see</Button>
  </OverlayTrigger>
);

render(<Example />);
