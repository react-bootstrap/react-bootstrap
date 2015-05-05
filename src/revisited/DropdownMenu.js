import React from 'react';

class DropdownMenu extends React.Component {
  render() {
    let children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, { onKeyDown: this.props.onKeyDown }, child.children);
    });

    return (
      <ul className='dropdown-menu' role='menu' aria-labelledby={this.props.labelledBy}>
        {children}
      </ul>
    );
  }
}

DropdownMenu.propTypes = {
  onKeyDown: React.PropTypes.func,
  labelledBy: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
};

export default DropdownMenu;
