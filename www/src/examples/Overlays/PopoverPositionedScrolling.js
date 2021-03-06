const popover = (position) => (
  <Popover id={`popover-positioned-scrolling-${position}`}>
    <Popover.Header as="h3">{`Popover ${position}`}</Popover.Header>
    <Popover.Body>
      <strong>Holy guacamole!</strong> Check this info.
    </Popover.Body>
  </Popover>
);

const popoverLeft = <popover position="left" />;

const popoverTop = <popover position="top" />;

const popoverBottom = <popover position="bottom" />;

const popoverRight = <popover position="right" />;

class Positioner extends React.Component {
  render() {
    return (
      <div style={{ padding: '100px 0' }}>
        <OverlayTrigger
          container={this}
          trigger="click"
          placement="left"
          overlay={popoverLeft}
        >
          <Button>Holy guacamole!</Button>
        </OverlayTrigger>{' '}
        <OverlayTrigger
          container={this}
          trigger="click"
          placement="top"
          overlay={popoverTop}
        >
          <Button>Holy guacamole!</Button>
        </OverlayTrigger>{' '}
        <OverlayTrigger
          container={this}
          trigger="click"
          placement="bottom"
          overlay={popoverBottom}
        >
          <Button>Holy guacamole!</Button>
        </OverlayTrigger>{' '}
        <OverlayTrigger
          container={this}
          trigger="click"
          placement="right"
          overlay={popoverRight}
        >
          <Button>Holy guacamole!</Button>
        </OverlayTrigger>
      </div>
    );
  }
}

render(<Positioner />);
