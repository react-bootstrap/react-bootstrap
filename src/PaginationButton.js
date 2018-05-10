import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import createSelectedEvent from './utils/createSelectedEvent';
import elementType from 'react-prop-types/lib/elementType';

class PaginationButton extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    eventKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    onSelect: PropTypes.func,
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    /**
     * You can use a custom element for this component
     */
    buttonComponentClass: elementType
  };

  static defaultProps = {
    active: false,
    disabled: false
  };

  handleClick = (event) => {
    if (this.props.disabled) {
      return;
    }

    if (this.props.onSelect) {
      let selectedEvent = createSelectedEvent(this.props.eventKey);
      this.props.onSelect(event, selectedEvent);
    }
  };

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
}

export default PaginationButton;
