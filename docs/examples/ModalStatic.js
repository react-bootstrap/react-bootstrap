function handleHide() {
  alert('Close me!');
}

const modalInstance = (
  <div className='static-modal'>
    <Modal title='Modal title'
      bsStyle='primary'
      backdrop={false}
      animation={false}
      container={mountNode}
      onRequestHide={handleHide}>
      <div className='modal-body'>
        One fine body...
      </div>
      <div className='modal-footer'>
        <Button>Close</Button>
        <Button bsStyle='primary'>Save changes</Button>
      </div>
    </Modal>
  </div>
);

React.render(modalInstance, mountNode);
