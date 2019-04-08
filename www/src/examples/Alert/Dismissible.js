class AlertDismissibleExample extends React.Component {
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
        <Alert variant="danger" onClose={handleDismiss} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            Change this and that and try again. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Cras mattis consectetur purus sit amet fermentum.
          </p>
        </Alert>
      );
    }
    return <Button onClick={handleShow}>Show Alert</Button>;
  }
}

render(<AlertDismissibleExample />);
