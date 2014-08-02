/** @jsx React.DOM */

var inputAddonsInstance = (
    <form>
      <Input type="text" addonBefore="@" />
      <Input type="text" addonAfter=".00" />
      <Input type="text" addonBefore="$" addonAfter=".00" />
      <Input type="text" addonAfter={<Glyphicon glyph="music" />} />
      <Input type="text" wrapAddonAfter={false}
        addonAfter={<div className="input-group-addon customClass"><Glyphicon glyph="chevron-up" /></div>} />
    </form>
  );

React.renderComponent(inputAddonsInstance, mountNode);
