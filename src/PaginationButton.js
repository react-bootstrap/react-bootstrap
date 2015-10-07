import React from 'react';
import classNames from 'classnames';
import BootstrapMixin from './BootstrapMixin';
import createSelectedEvent from './utils/createSelectedEvent';
import elementType from 'react-prop-types/lib/elementType';

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
    active: React.PropTypes.bool,
    /**
     * You can use a custom element for this component
     */
    buttonComponentClass: elementType
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
      disabled: this.props.disabled,
      ...this.getBsClassSet()
    };

    let {
      className,
      ...anchorProps
    } = this.props;

    let ButtonComponentClass = this.props.buttonComponentClass;

    return (
      <li className={classNames(className, classes)}>
        <ButtonComponentClass
          {...anchorProps}
          onClick={this.handleClick} />
      </li>
    );
  }
});

export default PaginationButton;
