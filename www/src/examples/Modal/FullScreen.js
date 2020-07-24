function Example() {
  const values = [true, 'sm', 'md', 'lg', 'xl'];
  const [fullScreen, setFullScreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullScreen(breakpoint);
    setShow(true);
  }

  return (
    <>
      {values.map((v, idx) => (
        <Button key={idx} className="mr-2" onClick={() => handleShow(v)}>
          Full screen
          {typeof v === 'string' && `below ${v}`}
        </Button>
      ))}
      <Modal show={show} fullScreen={fullScreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Modal body content</Modal.Body>
      </Modal>
    </>
  );
}

render(<Example />);
