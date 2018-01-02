class PaginationBasic extends React.Component {
  constructor(...args) {
    super(...args);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      activePage: 1,
    };
  }

  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey,
    });
  }

  render() {
    return (
      <div>
        <Pagination
          bsSize="large"
          items={10}
          activePage={this.state.activePage}
          onSelect={this.handleSelect}
        />
        <br />

        <Pagination
          bsSize="medium"
          items={10}
          activePage={this.state.activePage}
          onSelect={this.handleSelect}
        />
        <br />

        <Pagination
          bsSize="small"
          items={10}
          activePage={this.state.activePage}
          onSelect={this.handleSelect}
        />
      </div>
    );
  }
}

render(<PaginationBasic />);
