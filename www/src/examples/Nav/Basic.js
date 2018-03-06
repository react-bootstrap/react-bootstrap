<Nav
  bsStyle="pills"
  activeKey="active"
  onSelect={selectedKey => alert(`selected ${selectedKey}`)}
>
  <Nav.Item eventKey="active" href="/home">
    <Nav.Link>Active</Nav.Link>
  </Nav.Item>
  <Nav.Item eventKey="link-1">
    <Nav.Link href="#">Link</Nav.Link>
  </Nav.Item>
  <Nav.Item eventKey="link-2">
    <Nav.Link href="#">Link</Nav.Link>
  </Nav.Item>
  <Nav.Item eventKey="disabled" disabled>
    <Nav.Link>Disabled</Nav.Link>
  </Nav.Item>
</Nav>;
