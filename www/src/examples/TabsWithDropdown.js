<Tab.Container id="tabs-with-dropdown" defaultActiveKey="first">
  <Row className="clearfix">
    <Col sm={12}>
      <Nav bsStyle="tabs">
        <NavItem eventKey="first">Tab 1</NavItem>
        <NavItem eventKey="second">Tab 2</NavItem>
        <NavDropdown eventKey="3" title="Dropdown" id="nav-dropdown-within-tab">
          <MenuItem eventKey="3.1">Action</MenuItem>
          <MenuItem eventKey="3.2">Another action</MenuItem>
          <MenuItem eventKey="3.3">Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="3.4">Separated link</MenuItem>
        </NavDropdown>
      </Nav>
    </Col>
    <Col sm={12}>
      <Tab.Content animation>
        <Tab.Pane eventKey="first">Tab 1 content</Tab.Pane>
        <Tab.Pane eventKey="second">Tab 2 content</Tab.Pane>
        <Tab.Pane eventKey="3.1">Tab 3.1 content</Tab.Pane>
        <Tab.Pane eventKey="3.2">Tab 3.2 content</Tab.Pane>
        <Tab.Pane eventKey="3.3">Tab 3.3 content</Tab.Pane>
        <Tab.Pane eventKey="3.4">Tab 3.4 content</Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>;
