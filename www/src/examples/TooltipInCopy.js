function LinkWithTooltip({ id, children, href, tooltip }) {
  return (
    <OverlayTrigger
      overlay={<Tooltip id={id}>{tooltip}</Tooltip>}
      placement="top"
      delayShow={300}
      delayHide={150}
    >
      <a href={href}>{children}</a>
    </OverlayTrigger>
  );
}

render(
  <p className="muted" style={{ marginBottom: 0 }}>
    Tight pants next level keffiyeh{' '}
    <LinkWithTooltip tooltip="Default tooltip" href="#" id="tooltip-1">
      you probably
    </LinkWithTooltip>{' '}
    haven't heard of them. Photo booth beard raw denim letterpress vegan
    messenger bag stumptown. Farm-to-table seitan, mcsweeney's fixie sustainable
    quinoa 8-bit american apparel{' '}
    <LinkWithTooltip
      tooltip={
        <span>
          Another <strong>tooltip</strong>
        </span>
      }
      href="#"
      id="tooltip-2"
    >
      have a
    </LinkWithTooltip>
    terry richardson vinyl chambray. Beard stumptown, cardigans banh mi lomo
    thundercats. Tofu biodiesel williamsburg marfa, four loko mcsweeney's
    cleanse vegan chambray. A really ironic artisan{' '}
    <LinkWithTooltip tooltip="Another one here too" href="#" id="tooltip-3">
      whatever keytar
    </LinkWithTooltip>
    , scenester farm-to-table banksy Austin{' '}
    <LinkWithTooltip tooltip="The last tip!" href="#" id="tooltip-4">
      twitter handle
    </LinkWithTooltip>{' '}
    freegan cred raw denim single-origin coffee viral.
  </p>
);
