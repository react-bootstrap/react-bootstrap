const ControlledTabArea = React.createClass({
  getInitialState() {
    return {
      key: 1
    };
  },

  handleSelect(key) {
    alert('selected ' + key);
    this.setState({key});
  },

  render() {
    return (
      <TabbedArea activeKey={this.state.key} onSelect={this.handleSelect}>
        <TabPane eventKey={1} tab='Tab 1'>TabPane 1 content</TabPane>
        <TabPane eventKey={2} tab='Tab 2'>TabPane 2 content</TabPane>
        <TabPane eventKey={3} tab='Tab 3' disabled>TabPane 3 content</TabPane>
      </TabbedArea>
    );
  }
});

React.render(<ControlledTabArea />, mountNode);
