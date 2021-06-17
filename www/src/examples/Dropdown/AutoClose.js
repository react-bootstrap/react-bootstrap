<>
  {[true, 'outside', 'inside', false].map((autoClose, index) => (
    <Dropdown autoClose={autoClose} className="d-inline mx-2">
      <Dropdown.Toggle id={`dropdown-autoclose-${index}`}>
        AutoClose {autoClose.toString()}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ))}
</>;
