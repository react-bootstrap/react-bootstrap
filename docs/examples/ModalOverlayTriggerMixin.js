/** @jsx React.DOM */

// Our custom component is managing wether the Modal is visible
var CustomTrigger = React.createClass({
  mixins: [OverlayTriggerMixin],

  getInitialState: function () {
    return {
      isModalOpen: false
    };
  },

  handleToggle: function () {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  },

  render: function () {
    return (
      <Button onClick={this.handleToggle} bsStyle="primary">Launch</Button>
    );
  },

  // This is called by `OverlayTriggerMixin` when this
  // component is mounted or updated and the return value
  // is appended to the body
  renderOverlay: function () {
    if (this.state.isModalOpen) {
      return (
        <Modal title="Modal heading" onRequestHide={this.handleToggle}>
          <div className="modal-body">
            This modal is controlled by our custom trigger component.
          </div>
          <div className="modal-footer">
            <Button onClick={this.handleToggle}>Close</Button>
          </div>
        </Modal>
      )
    }

    return <span/>;
  }
});

var customTriggerInstance = (
    <CustomTrigger/>
  );

React.renderComponent(customTriggerInstance, mountNode);