
const Example = React.createClass({
  getInitialState() {
    return { show: true };
  },

  toggle() {
    this.setState({ show: !this.state.show });
  },

  render() {
    const tooltip = <Tooltip>Tooltip overload!</Tooltip>;

    const sharedProps = {
      show: this.state.show,
      container: this,
      target: () => React.findDOMNode(this.refs.target)
    };

    return (
      <div style={{ height: 100, paddingLeft: 150, position: 'relative' }}>
        <Button ref="target" onClick={this.toggle}>
          Click me!
        </Button>

        <Overlay {...sharedProps} placement="left">
          { tooltip }
        </Overlay>
        <Overlay {...sharedProps} placement="top">
          { tooltip }
        </Overlay>
        <Overlay {...sharedProps} placement="right">
          { tooltip }
        </Overlay>
        <Overlay {...sharedProps} placement="bottom">
          { tooltip }
        </Overlay>
      </div>
    );
  }
});

React.render(<Example/>, mountNode);
