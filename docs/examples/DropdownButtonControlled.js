const DropDownToggle = React.createClass({
  getInitialState: function() {
    return {
      open: false,
      inputFocused: false
    };
  },
  toggle: function() {
    this.setState({
      open: !this.state.open
    });
  },
  handleClick(e, more) {
    this.setState({
      open: !this.state.open
    });
  },
  handleClose(e) {
    if (this.state.inputFocused) {
      return;
    }
    this.setState({
      open: false
    });
  },
  handleFocus() {
    this.setState({
      open: true,
      inputFocused: true
    });
  },
  handleBlur() {
    this.setState({
      inputFocused: false
    });
  },
  handleSelect(e, selected) {
    this.setState({
      open: false,
      inputFocused: false
    });
  },
  render: function() {
    return (
      <ButtonToolbar>
        <Button onClick={this.toggle}>Toggle</Button>
        <Input type="text" onFocus={this.handleFocus} onBlur={this.handleBlur}/>
        <DropdownButtonRevisited
          title="Title"
          open={this.state.open}
          onRequestClose={this.handleClose}
          onClick={this.handleClick}
          onSelect={this.handleSelect}
        >
          <MenuItemRevisited eventKey="1">Action</MenuItemRevisited>
          <MenuItemRevisited eventKey="2">Another action</MenuItemRevisited>
        </DropdownButtonRevisited>
      </ButtonToolbar>
    );
  }
});

const toggleInstance = (
  <DropDownToggle/>
);

React.render(toggleInstance, mountNode);
