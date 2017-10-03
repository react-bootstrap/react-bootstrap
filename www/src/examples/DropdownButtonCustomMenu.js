class CustomToggle extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    this.props.onClick(e);
  }

  render() {
    return (
      <a href="" onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}

class CustomMenu extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onChange = e => this.setState({ value: e.target.value });

    this.state = { value: '' };
  }

  focusNext() {
    const input = ReactDOM.findDOMNode(this.input);

    if (input) {
      input.focus();
    }
  }

  render() {
    const { children } = this.props;
    const { value } = this.state;

    return (
      <div className="dropdown-menu" style={{ padding: '' }}>
        <FormControl
          ref={c => { this.input = c; }}
          type="text"
          placeholder="Type to filter..."
          onChange={this.onChange}
          value={this.state.value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(child => (
            !value.trim() || child.props.children.indexOf(value) !== -1
          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render((
  <Dropdown id="dropdown-custom-menu">
    <CustomToggle bsRole="toggle">
      Custom toggle
    </CustomToggle>

    <CustomMenu bsRole="menu">
      <MenuItem eventKey="1">Red</MenuItem>
      <MenuItem eventKey="2">Blue</MenuItem>
      <MenuItem eventKey="3" active>Orange</MenuItem>
      <MenuItem eventKey="1">Red-Orange</MenuItem>
    </CustomMenu>
  </Dropdown>
), mountNode);
