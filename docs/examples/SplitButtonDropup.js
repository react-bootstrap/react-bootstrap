/** @jsx React.DOM */

var buttonsInstance = (
    <div>
      <ButtonToolbar>
        <SplitButton title="Dropup" dropup>
          <MenuItem key="1">Action</MenuItem>
          <MenuItem key="2">Another action</MenuItem>
          <MenuItem key="3">Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem key="4">Separated link</MenuItem>
        </SplitButton>
      </ButtonToolbar>

      <ButtonToolbar>
        <SplitButton bsStyle="primary" title="Right dropup" dropup pullRight>
          <MenuItem key="1">Action</MenuItem>
          <MenuItem key="2">Another action</MenuItem>
          <MenuItem key="3">Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem key="4">Separated link</MenuItem>
        </SplitButton>
      </ButtonToolbar>
    </div>
  );

React.renderComponent(buttonsInstance, mountNode);