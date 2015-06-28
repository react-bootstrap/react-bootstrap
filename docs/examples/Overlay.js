
const Example = React.createClass({
  getInitialState(){
    return { show: true };
  },

  toggle(){
    this.setState({ show: !this.state.show });
  },

  render(){
    const style = {
      position: 'absolute',
      backgroundColor: '#EEE',
      border: '1px solid #CCC',
      borderRadius: 3,
      marginLeft: 5,
      padding: 10
    };

    return (
      <div style={{ height: 100, position: 'relative' }}>
        <Button ref='target' onClick={this.toggle}>
          I am an Overlay target
        </Button>

        <Overlay
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
          placement="right"
          container={this}
          target={ props => React.findDOMNode(this.refs.target)}
        >
          <div style={style}>
            <strong>Holy guacamole!</strong> Check this info.
          </div>
        </Overlay>
      </div>
    );
  }
});

React.render(<Example/>, mountNode);
