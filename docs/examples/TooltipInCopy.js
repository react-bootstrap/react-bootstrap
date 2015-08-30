const LinkWithTooltip = React.createClass({
  render() {
    let tooltip = <Tooltip placement="top">{this.props.tooltip}</Tooltip>;

    return (
      <OverlayTrigger overlay={tooltip} delayShow={300} delayHide={150}>
        <a href={this.props.href}>{this.props.children}</a>
      </OverlayTrigger>
    );
  }
});

const copyInstance = (
  <p className="muted" style={{ marginBottom: 0 }}>
    Tight pants next level keffiyeh <LinkWithTooltip tooltip="Default tooltip" href="#">you probably</LinkWithTooltip> haven't
    heard of them. Photo booth beard raw denim letterpress vegan messenger bag stumptown. Farm-to-table seitan, mcsweeney's
    fixie sustainable quinoa 8-bit american apparel <LinkWithTooltip tooltip={<span>Another <strong>tooltip</strong></span>} href="#">have a</LinkWithTooltip>
    terry richardson vinyl chambray. Beard stumptown, cardigans banh mi lomo thundercats. Tofu biodiesel williamsburg marfa, four
    loko mcsweeney's cleanse vegan chambray. A really ironic artisan <LinkWithTooltip tooltip="Another one here too" href="#">whatever keytar</LinkWithTooltip>,
    scenester farm-to-table banksy Austin <LinkWithTooltip tooltip="The last tip!" href="#">twitter handle</LinkWithTooltip> freegan
    cred raw denim single-origin coffee viral.
  </p>
);

React.render(copyInstance, mountNode);
