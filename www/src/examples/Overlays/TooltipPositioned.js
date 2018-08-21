<ButtonToolbar>
  {['top', 'right', 'bottom', 'left'].map(placement => (
    <OverlayTrigger
      placement={placement}
      overlay={
        <Tooltip id="tooltip">
          Tooltip on <strong>{placement}</strong>.
        </Tooltip>
      }
    >
      <Button variant="secondary">Tooltip on {placement}</Button>
    </OverlayTrigger>
  ))}
</ButtonToolbar>;
