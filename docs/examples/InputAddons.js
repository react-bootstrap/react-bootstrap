const innerGlyphicon = <Glyphicon glyph='music' />;
const innerButton = <Button>Before</Button>;
const innerDropdown = (
  <DropdownButton title='Action'>
    <MenuItem key='1'>Item</MenuItem>
  </DropdownButton>
);

const customBefore = (
  <span className="input-group-addon hidden-xs">
    Hide this on narrow view
  </span>
);

const customAfter = (
  <span className="input-group-addon hidden-xs">
    <Button>Search</Button>
  </span>
);

const inputAddonsInstance = (
  <form>
    <Input type='text' addonBefore='@' />
    <Input type='text' addonAfter='.00' />
    <Input type='text' addonBefore='$' addonAfter='.00' />
    <Input type='text' addonAfter={innerGlyphicon} />
    <Input type='text' buttonBefore={innerButton} />
    <Input type='text' buttonAfter={innerDropdown} />
    <Input type='text' customBefore={customBefore} />
    <Input type='text' customBefore={customAfter} />
  </form>
);

React.render(inputAddonsInstance, mountNode);
