import React from 'react';
import createSelectedEvent from '../utils/createSelectedEvent';
import CustomPropTypes from '../utils/CustomPropTypes';
import SafeAnchor from '../SafeAnchor';

export default class MenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (!this.props.href) {
      event.preventDefault();
    }

    if (this.props.onSelect) {
      let selectedEvent = createSelectedEvent(this.props.eventKey);

      this.props.onSelect(event, selectedEvent);
    }
  }

  render() {
    if (this.props.divider) {
      return <li role='separator' className='divider' />;
    }

    if (this.props.header) {
      return (
        <li role='heading' className='dropdown-header'>{this.props.children}</li>
      );
    }

    return (
      <li role='presentation'>
        <SafeAnchor
          role='menuitem'
          tabIndex='-1'
          href={this.props.href || ''}
          onKeyDown={this.props.onKeyDown}
          onClick={this.handleClick}>
          {this.props.children}
        </SafeAnchor>
      </li>
    );
  }
}

MenuItem.propTypes = {
  divider: CustomPropTypes.all([
    React.PropTypes.bool,
    function(props, propName, componentName) {
      if (props.divider && props.children) {
        return new Error('Children will not be rendered for dividers');
      }
    }
  ]),
  eventKey: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]),
  header: React.PropTypes.bool,
  href: React.PropTypes.string,
  onKeyDown: React.PropTypes.func,
  onSelect: React.PropTypes.func
};
