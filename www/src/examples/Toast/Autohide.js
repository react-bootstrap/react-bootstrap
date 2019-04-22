class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  render() {
    const { show } = this.state;
    const toggleShow = () => this.setState({ show: true });
    const handleClose = () => this.setState({ show: false });
    return (
      <Row>
        <Col xs={6}>
          <Toast onClose={handleClose} show={show} delay={5000} autohide>
            <Toast.Header>
              <img
                src="https://via.placeholder.com/20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">Bootstrap</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>
              Woohoo, you're reading this text in a Toast!
            </Toast.Body>
          </Toast>
        </Col>
        <Col xs={6}>
          <Button onClick={toggleShow}>Show Toast</Button>
        </Col>
      </Row>
    );
  }
}

render(<Example />);
