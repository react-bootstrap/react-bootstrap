const Example = React.createClass({
  getInitialState() {
    return { show: true };
  },

  toggle() {
    this.setState({ show: !this.state.show });
  },

  render() {
    const sharedProps = {
      show: this.state.show,
      container: this,
      target: () => ReactDOM.findDOMNode(this.refs.target),
    };

    return (
      <div style={{ height: 100, paddingLeft: 150, position: 'relative' }}>
        <Button ref="target" onClick={this.toggle}>
          Click me!
        </Button>

        <Overlay {...sharedProps} placement="left">
          <Tooltip id="overload-left">Tooltip overload!</Tooltip>
        </Overlay>
        <Overlay {...sharedProps} placement="top">
          <Tooltip id="overload-top">Tooltip overload!</Tooltip>
        </Overlay>
        <Overlay {...sharedProps} placement="right">
          <Tooltip id="overload-right">Tooltip overload!</Tooltip>
        </Overlay>
        <Overlay {...sharedProps} placement="bottom">
          <Tooltip id="overload-bottom">Tooltip overload!</Tooltip>
        </Overlay>
      </div>
    );
  },
});

render(<Example />);
