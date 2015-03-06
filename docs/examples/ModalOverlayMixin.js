// Our custom component is managing whether the Modal is visible
const CustomModalTrigger = React.createClass({
  mixins: [OverlayMixin],

  getInitialState() {
    return {
      isModalOpen: false
    };
  },

  handleToggle() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  },

  render() {
    return (
      <Button onClick={this.handleToggle} bsStyle='primary'>Launch</Button>
    );
  },

  // This is called by the `OverlayMixin` when this component
  // is mounted or updated and the return value is appended to the body.
  renderOverlay() {
    if (!this.state.isModalOpen) {
      return <span/>;
    }

    return (
      <Modal bsStyle='primary' title='Modal heading' onRequestHide={this.handleToggle}>
        <div className='modal-body'>
          This modal is controlled by our custom trigger component.
        </div>
        <div className='modal-footer'>
          <Button onClick={this.handleToggle}>Close</Button>
        </div>
      </Modal>
    );
  }
});

React.render(<CustomModalTrigger />, mountNode);
