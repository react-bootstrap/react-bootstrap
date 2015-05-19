const modalInstance = (
  <div className='static-modal'>
    <Modal title='Modal title'
      backdrop={false}
      animation={false}
      container={mountNode}
      onRequestHide={function() {}}>
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
