const innerGlyphicon = <Glyphicon glyph="music" />;
const innerButton = <Button>Before</Button>;
const innerDropdown = (
  <DropdownButton title="Action" id="input-dropdown-addon">
    <MenuItem key="1">Item</MenuItem>
  </DropdownButton>
);
const innerRadio = <input type="radio" aria-label="..." />;
const innerCheckbox = <input type="checkbox" aria-label="..." />;

const inputAddonsInstance = (
  <form>
    <Input type="text" addonBefore="@" />
    <Input type="text" addonAfter=".00" />
    <Input type="text" addonBefore="$" addonAfter=".00" />
    <Input type="text" addonAfter={innerGlyphicon} />
    <Input type="text" buttonBefore={innerButton} />
    <Input type="text" buttonAfter={innerDropdown} />
    <Input type="text" addonBefore={innerRadio} />
    <Input type="text" addonBefore={innerCheckbox} />
  </form>
);

React.render(inputAddonsInstance, mountNode);
