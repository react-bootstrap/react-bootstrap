class NavJustified extends React.Component {
  handleSelect(selectedKey) {
    alert(`selected ${selectedKey}`);
  }

  render() {
    return (
      <div>
        <Nav
          bsStyle="tabs"
          justified
          activeKey={1}
          onSelect={key => this.handleSelect(key)}
        >
          <NavItem eventKey={1} href="/home">
            NavItem 1 content
          </NavItem>
          <NavItem eventKey={2} title="Item">
            NavItem 2 content
          </NavItem>
          <NavItem eventKey={3} disabled>
            NavItem 3 content
          </NavItem>
        </Nav>
        <br />
        <Nav
          bsStyle="pills"
          justified
          activeKey={1}
          onSelect={key => this.handleSelect(key)}
        >
          <NavItem eventKey={1} href="/home">
            NavItem 1 content
          </NavItem>
          <NavItem eventKey={2} title="Item">
            NavItem 2 content
          </NavItem>
          <NavItem eventKey={3} disabled>
            NavItem 3 content
          </NavItem>
        </Nav>
      </div>
    );
  }
}

render(<NavJustified />);
