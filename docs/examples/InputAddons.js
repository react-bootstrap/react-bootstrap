var inputAddonsInstance = (
    <form>
      <Input type="text" addonBefore="@" />
      <Input type="text" addonAfter=".00" />
      <Input type="text" addonBefore="$" addonAfter=".00" />
      <Input type="text" addonAfter={<Glyphicon glyph="music" />} />
      <Input type="text" buttonBefore={<Button>Before</Button>} />
      <Input type="text" buttonAfter={<DropdownButton title="Action">
        <MenuItem key="1">Item</MenuItem>
      </DropdownButton>} />
    </form>
  );

React.render(inputAddonsInstance, mountNode);
