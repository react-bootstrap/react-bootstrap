const ControlledPanelGroup = React.createClass({
  getInitialState() {
    return {
      activeKey: 1
    };
  },

  handleSelect(activeKey) {
    this.setState({ activeKey });
  },

  render() {
    return (
      <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
        <Panel header="Panel 1" eventKey="1">Panel 1 content</Panel>
        <Panel header="Panel 2" eventKey="2">Panel 2 content</Panel>
      </PanelGroup>
    );
  }
});

React.render(<ControlledPanelGroup />, mountNode);
