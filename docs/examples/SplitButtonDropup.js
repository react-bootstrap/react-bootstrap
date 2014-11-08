var buttonsInstance = (
    <div>
      <ButtonToolbar>
        <SplitButton title="Dropup" dropup>
          <MenuItem selectKey="1">Action</MenuItem>
          <MenuItem selectKey="2">Another action</MenuItem>
          <MenuItem selectKey="3">Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem selectKey="4">Separated link</MenuItem>
        </SplitButton>
      </ButtonToolbar>

      <ButtonToolbar>
        <SplitButton bsStyle="primary" title="Right dropup" dropup pullRight>
          <MenuItem selectKey="1">Action</MenuItem>
          <MenuItem selectKey="2">Another action</MenuItem>
          <MenuItem selectKey="3">Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem selectKey="4">Separated link</MenuItem>
        </SplitButton>
      </ButtonToolbar>
    </div>
  );

React.render(buttonsInstance, mountNode);