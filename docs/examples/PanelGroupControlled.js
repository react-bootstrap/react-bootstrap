const ControlledPanelGroup = React.createClass({
  getInitialState() {
    return {
      activeKey: '1'
    };
  },

  handleSelect(activeKey) {
    this.setState({ activeKey });
  },

  render() {
    return (
      <PanelGroup
        accordion
        id="accordion-controlled-example"
        activeKey={this.state.activeKey}
        onSelect={this.handleSelect}
      >
        <Panel eventKey="1" >
          <Panel.Heading>
            <Panel.Title toggle>Panel heading 1</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            Panel content 1
          </Panel.Body>
        </Panel>
        <Panel eventKey="2">
          <Panel.Heading>
            <Panel.Title toggle>Panel heading 2</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            Panel content 2
          </Panel.Body>
        </Panel>
      </PanelGroup>
    );
  }
});

ReactDOM.render(<ControlledPanelGroup />, mountNode);
