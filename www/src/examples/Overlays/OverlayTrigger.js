function renderTooltip(props) {
  return (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );
}

const Example = () => (
  <OverlayTrigger
    placement="right"
    delay={{ show: 250, hide: 400 }}
    overlay={renderTooltip}
  >
    <Button variant="success">Hover me to see</Button>
  </OverlayTrigger>
);

render(<Example />);
