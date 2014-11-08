var inputAddonsInstance = (
    <form>
      <Input type="text" addonBefore="@" />
      <Input type="text" addonAfter=".00" />
      <Input type="text" addonBefore="$" addonAfter=".00" />
      <Input type="text" addonAfter={<Glyphicon glyph="music" />} />
    </form>
  );

React.render(inputAddonsInstance, mountNode);
