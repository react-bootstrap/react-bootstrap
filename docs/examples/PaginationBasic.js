const PaginationBasic = React.createClass({
  getInitialState() {
    return {
      activePage: 1
    };
  },

  handleSelect(event, selectedEvent) {
    this.setState({
      activePage: selectedEvent.eventKey
    });
  },

  render() {
    return (
      <div>
        <Pagination
          bsSize="large"
          items={10}
          activePage={this.state.activePage}
          onSelect={this.handleSelect} />
        <br />

        <Pagination
          bsSize="medium"
          items={10}
          activePage={this.state.activePage}
          onSelect={this.handleSelect} />
        <br />

        <Pagination
          bsSize="small"
          items={10}
          activePage={this.state.activePage}
          onSelect={this.handleSelect} />
      </div>
    );
  }
});

React.render(<PaginationBasic />, mountNode);
