function CustomPopover({ style }) {
  return (
    <div
      style={{
        ...style,
        position: 'absolute',
        backgroundColor: '#EEE',
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
        border: '1px solid #CCC',
        borderRadius: 3,
        marginLeft: -5,
        marginTop: 5,
        padding: 10
      }}
    >
      <strong>Holy guacamole!</strong> Check this info.
    </div>
  );
}

class Example extends React.Component {
  constructor(...args) {
    super(...args);

    this.handleToggle = this.handleToggle.bind(this);

    this.state = { show: true };
  }

  handleToggle() {
    this.setState({ show: !this.state.show });
  }

  render() {
    return (
      <div style={{ height: 100, position: 'relative' }}>
        <Button ref="target" onClick={this.handleToggle}>
          I am an Overlay target
        </Button>

        <Overlay
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
          placement="right"
          container={this}
          target={() => ReactDOM.findDOMNode(this.refs.target)}
        >
          <CustomPopover />
        </Overlay>
      </div>
    );
  }
}

render(<Example />);
