const PaginationAdvanced = React.createClass({
  getInitialState() {
    return {
      activePage: 1,
    };
  },

  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey,
    });
  },

  render() {
    return (
      <Pagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        items={20}
        maxButtons={5}
        activePage={this.state.activePage}
        onSelect={this.handleSelect}
      />
    );
  },
});

render(<PaginationAdvanced />);
