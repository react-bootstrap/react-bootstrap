const modalInstance = (
  <div className='static-modal'>
    <Modal
      enforceFocus={false}
      backdrop={false}
      animation={false}
      container={mountNode}
      onHide={function(){}}>

      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        One fine body...
      </Modal.Body>

      <Modal.Footer>
        <Button>Close</Button>
        <Button bsStyle='primary'>Save changes</Button>
      </Modal.Footer>
    </Modal>
  </div>
);

React.render(modalInstance, mountNode);
