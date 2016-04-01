import React from 'react';
import classNames from 'classnames';
import elementType from 'react-prop-types/lib/elementType';

const PaginationButton = React.createClass({

  propTypes: {
    className: React.PropTypes.string,
    eventKey: React.PropTypes.any,
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
      this.props.onSelect(this.props.eventKey, event);
    }
  },

  render() {
    let classes = {
      active: this.props.active,
      disabled: this.props.disabled
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
