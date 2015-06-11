const DropDownToggle = React.createClass({
  getInitialState: function() {
    return {
      open: false
    };
  },
  toggle: function() {
    this.setState({
      open: !this.state.open
    });
  },
  handleOpenStateChange(openState) {
    this.setState({
      open: openState
    });
  },
  render: function() {
    return (
      <ButtonToolbar>
        <Button onClick={this.toggle}>Toggle</Button>
        <DropdownButton
          title="Title"
          open={this.state.open}
          onOpenStateChange={this.handleOpenStateChange}
        >
          <MenuItem eventKey="1">Action</MenuItem>
          <MenuItem eventKey="2">Another action</MenuItem>
        </DropdownButton>
      </ButtonToolbar>
    );
  }
});

const toggleInstance = (
  <DropDownToggle/>
);

React.render(toggleInstance, mountNode);
