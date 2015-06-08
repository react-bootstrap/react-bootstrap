import React from 'react';
import classNames from 'classnames';
import BootstrapMixin from './BootstrapMixin';
import createSelectedEvent from './utils/createSelectedEvent';

const PaginationButton = React.createClass({
  mixins: [BootstrapMixin],

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
    // This would go away once SafeAnchor is available
    event.preventDefault();

    if (this.props.onSelect) {
      let selectedEvent = createSelectedEvent(this.props.eventKey);
      this.props.onSelect(event, selectedEvent);
    }
  },

  render() {
    let classes = this.getBsClassSet();

    classes.active = this.props.active;
    classes.disabled = this.props.disabled;

    return (
      <li className={classNames(this.props.className, classes)}>
        <a href='#' onClick={this.handleClick}>{this.props.children}</a>
      </li>
    );
  }
});

export default PaginationButton;
