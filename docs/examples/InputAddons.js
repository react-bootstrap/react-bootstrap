const innerGlyphicon = <Glyphicon glyph='music' />;
const innerButton = <Button>Before</Button>;
const innerDropdown = (
  <DropdownButton title='Action'>
    <MenuItem key='1'>Item</MenuItem>
  </DropdownButton>
);

const inputAddonsInstance = (
  <form>
    <Input type='text' addonBefore='@' />
    <Input type='text' addonAfter='.00' />
    <Input type='text' addonBefore='$' addonAfter='.00' />
    <Input type='text' addonAfter={innerGlyphicon} />
    <Input type='text' buttonBefore={innerButton} />
    <Input type='text' buttonAfter={innerDropdown} />
  </form>
);

React.render(inputAddonsInstance, mountNode);
