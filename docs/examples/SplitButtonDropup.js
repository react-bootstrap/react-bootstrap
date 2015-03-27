const buttonsInstance = (
  <div>
    <ButtonToolbar>
      <SplitButton title='Dropup' dropup>
        <MenuItem eventKey='1'>Action</MenuItem>
        <MenuItem eventKey='2'>Another action</MenuItem>
        <MenuItem eventKey='3'>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey='4'>Separated link</MenuItem>
      </SplitButton>
    </ButtonToolbar>

    <ButtonToolbar>
      <SplitButton bsStyle='primary' title='Right dropup' dropup pullRight>
        <MenuItem eventKey='1'>Action</MenuItem>
        <MenuItem eventKey='2'>Another action</MenuItem>
        <MenuItem eventKey='3'>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey='4'>Separated link</MenuItem>
      </SplitButton>
    </ButtonToolbar>
  </div>
);

React.render(buttonsInstance, mountNode);
