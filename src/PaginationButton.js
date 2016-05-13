import React from 'react';
import classNames from 'classnames';
import createSelectedEvent from './utils/createSelectedEvent';

const PaginationButton = React.createClass({

  propTypes: {
    className: React.PropTypes.string,
    eventKey: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    onSelect: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    active: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      active: false,
      disabled: false
    };
  },

  handleClick(event) {
    if (this.props.disabled) {
      return;
    }

    if (this.props.onSelect) {
      let selectedEvent = createSelectedEvent(this.props.eventKey);
      this.props.onSelect(event, selectedEvent);
    }
  },

  render() {
    let classes = {
      active: this.props.active,
      disabled: this.props.disabled
    };

    let {
      className,
      ...anchorProps,
      children
    } = this.props;

    return (
      <li className={classNames(className, classes, 'page-item')} style={{cursor: 'pointer'}}>
        <a className="page-link" href="" onClick={this.handleClick}>
          {children}
        </a>
      </li>
    );
  }
});

export default PaginationButton;
