class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  render() {
    const handleDismiss = () => this.setState({ show: false });
    const handleShow = () => this.setState({ show: true });
    if (this.state.show) {
      return (
        <Toast onClose={handleDismiss}>
          <Toast.Header>
            <img
              src="https://via.placeholder.com/30"
              className="rounded mr-2"
              alt="..."
            />
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
            <button
              type="button"
              className="ml-2 mb-1 close"
              data-dismiss="toast"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
      );
    }
    return <Button onClick={handleShow}>Show Toast</Button>;
  }
}

render(<Example />);
