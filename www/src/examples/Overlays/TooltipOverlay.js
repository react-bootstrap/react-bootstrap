function Example() {
  const [show, setShow] = React.useState(false);
  const [target, setTarget] = React.useState(null);

  const attachRef = targ => setTarget(targ);

  return (
    <>
      <Button ref={attachRef} onClick={() => setShow(!show)}>
        Click me!
      </Button>
      <Overlay target={target} show={show} placement="right">
        {props => (
          <Tooltip id="overlay-example" {...props}>
            My Tooltip
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

render(<Example />);
