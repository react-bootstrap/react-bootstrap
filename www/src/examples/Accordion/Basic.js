<Accordion defaultActiveKey="0">
  <Card>
    <Card.Header>
      <Accordion.Toggle eventKey="0">
        <button
          type="button"
          onClick={key => console.log(`I've been clicked by : ${key}`)}
        >
          Click me!
        </button>
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>Hello! I'm the body</Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header>
      <Accordion.Toggle eventKey="1">
        <button
          type="button"
          onClick={key => console.log(`I've been clicked by : ${key}`)}
        >
          Click me!
        </button>
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="1">
      <Card.Body>Hello! I'm another body</Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>;
