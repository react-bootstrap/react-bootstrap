
class CustomMenu extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = { value: '' };
    this.onChange = e => this.setState({ value: e.target.value });
  }

  render() {
    let { className, ...props } = this.props;

    return (
      <div
        className={"dropdown-menu"}
        style={{ padding: ''}}
      >
        <input
          ref={input => this.input = input}
          type="text"
          className="form-control"
          placeholder="type to filter..."
          onChange={this.onChange}
          value={this.state.value}
        />
        <ul className="list-unstyled">
          { this.filterChildren() }
        </ul>
      </div>
    );
  }

  filterChildren() {
    let { children } = this.props;
    let { value } = this.state;
    let filtered = [];

    let matches = child => child.props.children.indexOf(value) !== -1;

    React.Children.forEach(children, child => {
      if (!value.trim() || matches(child)) {
        filtered.push(child);
      }
    });

    return filtered;
  }

  focusNext() {
    let input = React.findDOMNode(this.input);

    if (input) {
      input.focus();
    }
  }
}

let preventDefault = e => e.preventDefault();

let dropdownExample = (
    <Dropdown id="dropdown-custom-menu">
      <a href="#" bsRole="toggle" onClick={preventDefault}>
        custom Toggle
      </a>

      <CustomMenu bsRole="menu">
        <MenuItem eventKey="1">Red</MenuItem>
        <MenuItem eventKey="2">Blue</MenuItem>
        <MenuItem eventKey="3" active>Orange</MenuItem>
        <MenuItem eventKey="1">Red-Orange</MenuItem>
      </CustomMenu>
    </Dropdown>
  );

React.render(dropdownExample, mountNode);
