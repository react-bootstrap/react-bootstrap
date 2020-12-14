render(
  <OverlayTrigger
    placement="bottom"
    overlay={<Tooltip id="button-tooltip-2">Check out this avatar</Tooltip>}
  >
    {({ ref, ...triggerHandler }) => (
      <Button
        variant="light"
        {...triggerHandler}
        className="d-inline-flex align-items-center"
      >
        <Image
          ref={ref}
          roundedCircle
          src="holder.js/20x20?text=J&bg=28a745&fg=FFF"
        />
        <span className="ms-1">Hover to see</span>
      </Button>
    )}
  </OverlayTrigger>,
);
