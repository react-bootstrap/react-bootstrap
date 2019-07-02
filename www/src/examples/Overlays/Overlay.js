function Example() {
  const [show, setShow] = React.useState(false);
  const [target, setTarget] = React.useState(null);

  const attachRef = targ => setTarget(targ);

  return (
    <>
      <Button variant="danger" ref={attachRef} onClick={() => setShow(!show)}>
        Click me to see
      </Button>
      <Overlay target={target} show={show} placement="right">
        {({
          placement,
          scheduleUpdate,
          arrowProps,
          outOfBoundaries,
          show: _show,
          ...props
        }) => (
          <div
            {...props}
            style={{
              backgroundColor: 'rgba(255, 100, 100, 0.85)',
              padding: '2px 10px',
              color: 'white',
              borderRadius: 3,
              ...props.style,
            }}
          >
            Simple tooltip
          </div>
        )}
      </Overlay>
    </>
  );
}

render(<Example />);
