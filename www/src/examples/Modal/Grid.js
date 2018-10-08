class MydModalWithGrid extends React.Component {
  render() {
    return (
      <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Using Grid in Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="show-grid">
              <Col xs={12} md={8}>
                <code>.col-xs-12 .col-md-8</code>
              </Col>
              <Col xs={6} md={4}>
                <code>.col-xs-6 .col-md-4</code>
              </Col>
            </Row>

            <Row className="show-grid">
              <Col xs={6} md={4}>
                <code>.col-xs-6 .col-md-4</code>
              </Col>
              <Col xs={6} md={4}>
                <code>.col-xs-6 .col-md-4</code>
              </Col>
              <Col xs={6} md={4}>
                <code>.col-xs-6 .col-md-4</code>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

class App extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { modalShow: false };
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });

    return (
      <ButtonToolbar>
        <Button
          variant="primary"
          onClick={() => this.setState({ modalShow: true })}
        >
          Launch modal with grid
        </Button>

        <MydModalWithGrid show={this.state.modalShow} onHide={modalClose} />
      </ButtonToolbar>
    );
  }
}

render(<App />);
