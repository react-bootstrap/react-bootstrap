function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <OffcanvasHeader closeButton>
          <OffcanvasTitle>Offcanvas</OffcanvasTitle>
        </OffcanvasHeader>
        <OffcanvasBody>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
}

render(<Example />);
