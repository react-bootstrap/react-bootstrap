class Example extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false
    };
  }

  render() {
    return (
      <div>
        <Button
          onClick={() => this.setState({ open: !this.state.open })}
          aria-expanded={this.state.open}
          aria-controls="collapseExample"
        >
          click
        </Button>
        <Collapse in={this.state.open}>
          <div id="collapseExample">
            <Well>
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
            </Well>
          </div>
        </Collapse>
      </div>
    );
  }
}

render(<Example />);
