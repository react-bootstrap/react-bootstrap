<Nav
  activeKey="/home"
  role="tablist"
  onSelect={selectedKey => alert(`selected ${selectedKey}`)}
>
  <Nav.Item>
    <Nav.Link href="/home">Active</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-1" href="#">
      Link
    </Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-1" href="#">
      Link
    </Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="disabled" disabled>
      Disabled
    </Nav.Link>
  </Nav.Item>
</Nav>;
