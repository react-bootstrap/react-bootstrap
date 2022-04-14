<Tabs
  defaultActiveKey="home"
  transition={false}
  id="noanim-tab-example"
  className="mb-3"
>
  <Tab eventKey="home" title="Home" transition={false}>
    <Sonnet />
  </Tab>
  <Tab eventKey="profile" title="Profile" transition={false}>
    <Sonnet />
  </Tab>
  <Tab eventKey="contact" title="Contact" disabled>
    <Sonnet />
  </Tab>
</Tabs>;
