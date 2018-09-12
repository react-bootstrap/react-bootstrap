const popover = (
  <Popover id="popover-basic" title="Popover right">
    And here's some <strong>amazing</strong> content. It's very engaging. right?
  </Popover>
);

const Example = () => (
  <OverlayTrigger trigger="click" placement="right" overlay={popover}>
    <Button variant="success">Click me to see</Button>
  </OverlayTrigger>
);

render(<Example />);
