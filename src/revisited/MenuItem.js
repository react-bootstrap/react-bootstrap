import React from 'react';

export default class MenuItem extends React.Component {
  render() {
    return (
      <li role='presentation'>
        <a
          role='menuitem'
          tabIndex='-1'
          href='#'
          onKeyDown={this.props.onKeyDown}>
          Action
        </a>
      </li>
    );
  }
}

MenuItem.propTypes = {
  onKeyDown: React.PropTypes.func
};
