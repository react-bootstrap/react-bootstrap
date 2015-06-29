
const Example = React.createClass({
  render(){
    const style = {
      position: 'absolute',
      backgroundColor: '#EEE',
      border: '1px solid #CCC',
      borderRadius: 3,
      marginLeft: 5,
      padding: 10
    };

    const overlay = (
      <div style={style}>
        <strong>Holy guacamole!</strong> Check this info.
      </div>
    );

    return (
      <div style={{ height: 100, position: 'relative' }}>
        <OverlayTrigger
          defaultOverlayShown={true}
          placement="right"
          trigger='click'
          overlay={overlay}
          container={this}
        >
          <Button>I am an Overlay target (click me)</Button>
        </OverlayTrigger>
      </div>
    );
  }
});

React.render(<Example/>, mountNode);
