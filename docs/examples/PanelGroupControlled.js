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
        id="accordion-controlled-example"
        activeKey={this.state.activeKey}
        onSelect={this.handleSelect}
        accordion
      >
        <Panel eventKey="1" >
          <Panel.Heading>
            <h3>
              <Panel.Toggle>Panel heading 1</Panel.Toggle>
            </h3>
          </Panel.Heading>
          Panel content 1
        </Panel>
        <Panel eventKey="2">
          <Panel.Heading title>
            <h3>
              <Panel.Toggle>Panel heading 2</Panel.Toggle>
            </h3>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              Panel content 2
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
      </PanelGroup>
    );
  }
});

ReactDOM.render(<ControlledPanelGroup />, mountNode);
