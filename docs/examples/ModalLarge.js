var MyModal = React.createClass({
  render: function() {
    return (
        <Modal {...this.props} title="Large Modal" bsClass="modal-lg" animation={false}>
          <div className="modal-body">
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

          </div>
          <div className="modal-footer">
            <Button onClick={this.props.onRequestHide}>Close</Button>
          </div>
        </Modal>
      );
  }
});

var overlayTriggerInstance = (
    <ModalTrigger modal={<MyModal />}>
      <Button bsStyle="primary" bsSize="large">Launch a large modal</Button>
    </ModalTrigger>
  );

React.render(overlayTriggerInstance, mountNode);