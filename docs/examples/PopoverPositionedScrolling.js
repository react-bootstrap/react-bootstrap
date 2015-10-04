class Positioner extends React.Component {
  render() {
    return (
      <ButtonToolbar style={{padding: '100px 0'}}>
        <OverlayTrigger container={this} trigger="click" placement="left" overlay={<Popover title="Popover left"><strong>Holy guacamole!</strong> Check this info.</Popover>}>
          <Button bsStyle="default">Holy guacamole!</Button>
        </OverlayTrigger>
        <OverlayTrigger container={this} trigger="click" placement="top" overlay={<Popover title="Popover top"><strong>Holy guacamole!</strong> Check this info.</Popover>}>
          <Button bsStyle="default">Holy guacamole!</Button>
        </OverlayTrigger>
        <OverlayTrigger container={this} trigger="click" placement="bottom" overlay={<Popover title="Popover bottom"><strong>Holy guacamole!</strong> Check this info.</Popover>}>
          <Button bsStyle="default">Holy guacamole!</Button>
        </OverlayTrigger>
        <OverlayTrigger container={this} trigger="click" placement="right" overlay={<Popover title="Popover right"><strong>Holy guacamole!</strong> Check this info.</Popover>}>
          <Button bsStyle="default">Holy guacamole!</Button>
        </OverlayTrigger>
      </ButtonToolbar>
    );
  }
}

React.render(<Positioner />, mountNode);
