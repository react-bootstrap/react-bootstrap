import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import SafeAnchor from './SafeAnchor';
import createChainedFunction from './utils/createChainedFunction';

const propTypes = {
  disabled: PropTypes.bool,
  previous: PropTypes.bool,
  next: PropTypes.bool,
  onClick: PropTypes.func,
  onSelect: PropTypes.func,
  eventKey: PropTypes.any
};

const defaultProps = {
  disabled: false,
  previous: false,
  next: false
};

class PagerItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    const { disabled, onSelect, eventKey } = this.props;

    if (disabled) {
      e.preventDefault();
      return;
    }

    if (onSelect) {
      onSelect(eventKey, e);
    }
  }

  render() {
    const {
      disabled,
      previous,
      next,
      onClick,
      className,
      style,
      ...props
    } = this.props;

    delete props.onSelect;
    delete props.eventKey;

    return (
      <li
        className={classNames(className, { disabled, previous, next })}
        style={style}
      >
        <SafeAnchor
          {...props}
          disabled={disabled}
          onClick={createChainedFunction(onClick, this.handleSelect)}
        />
      </li>
    );
  }
}

PagerItem.propTypes = propTypes;
PagerItem.defaultProps = defaultProps;

export default PagerItem;
