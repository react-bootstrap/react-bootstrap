class Example extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = { show: false };
  }
  render(){

    return (
      <ButtonToolbar>
        <Button
          bsStyle='default'
          onClick={e => this.setState({ target: e.target, show: !this.state.show })}
        >
          Holy guacamole!
        </Button>

        <Overlay
          show={this.state.show}
          target={()=> React.findDOMNode(this.state.target)}
          placement='bottom'
          container={mountNode}
          containerPadding={20}
        >
          <Popover title='Popover bottom'>
            <strong>Holy guacamole!</strong> Check this info.
          </Popover>
        </Overlay>
      </ButtonToolbar>
    );
  }
}

React.render(<Example/>, mountNode);
