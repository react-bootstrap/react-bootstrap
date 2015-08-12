
class CustomMenu extends React.Component {

  constructor(...args){
    super(...args)
    this.state = { value: '' }
    this.onChange = e => this.setState({ value: e.target.value })
  }

  render(){
    let { className, ...props } = this.props;

    return (
      <div
        className={'dropdown-menu'}
        style={{ padding: '5px 10px'}}
      >
        <input
          ref={input => this.input = input}
          type='text'
          className='form-control'
          placeholder='type to filter...'
          onChange={this.onChange}
          value={this.state.value}
        />
        <ul className='list-unstyled'>
          { this.filterChildren() }
        </ul>
      </div>
    );
  }

  filterChildren(){
    let { children } = this.props;
    let { value } = this.state;
    let filtered = [];

    let matches = child => child.props.children.indexOf(value) !== -1

    React.Children.forEach(children, child => {
      if (!value.trim() || matches(child))
        filtered.push(child)
    })

    return filtered
  }

  focusNext() {
    let input = React.findDOMNode(this.input);

    if (input){
      input.focus()
    }
  }
}


let dropdownExample = (
    <DropdownButton title='click me!' id='dropdown-custom-menu'>
      <CustomMenu>
        <MenuItem eventKey='1'>Red</MenuItem>
        <MenuItem eventKey='2'>Blue</MenuItem>
        <MenuItem eventKey='3' active>Orange</MenuItem>
        <MenuItem eventKey='1'>Red-Orange</MenuItem>
      </CustomMenu>
    </DropdownButton>
  )

React.render(dropdownExample, mountNode);