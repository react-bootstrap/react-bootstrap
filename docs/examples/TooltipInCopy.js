/** @jsx React.DOM */

var LinkWithTooltip = React.createClass({
  render: function () {
    var tooltip = <Tooltip>{this.props.tooltip}</Tooltip>;
    return (
        <OverlayTrigger placement="top" overlay={tooltip} delayShow={300} delayHide={150}>
          <a href={this.props.href}>{this.props.children}</a>
        </OverlayTrigger>
      );
  }
});

var pStyle = {marginBottom: 0};

var copyInstance = (
    <p className="muted" style={pStyle}>
      Tight pants next level keffiyeh <LinkWithTooltip tooltip="Default tooltip" href="#">you probably</LinkWithTooltip> haven't heard of them. Photo booth beard raw denim letterpress vegan messenger bag stumptown. Farm-to-table seitan, mcsweeney's fixie sustainable quinoa 8-bit american apparel <LinkWithTooltip tooltip={<span>Another <strong>tooltip</strong></span>} href="#">have a</LinkWithTooltip> terry richardson vinyl chambray. Beard stumptown, cardigans banh mi lomo thundercats. Tofu biodiesel williamsburg marfa, four loko mcsweeney's cleanse vegan chambray. A really ironic artisan <LinkWithTooltip tooltip="Another one here to" href="#">whatever keytar</LinkWithTooltip>, scenester farm-to-table banksy Austin <LinkWithTooltip tooltip="The last tip!" href="#">twitter handle</LinkWithTooltip> freegan cred raw denim single-origin coffee viral.
    </p>
  );

React.renderComponent(copyInstance, mountNode);