import classNames from 'classnames';
import React from 'react';

import SafeAnchor from './SafeAnchor';
import createChainedFunction from './utils/createChainedFunction';

const PageItem = React.createClass({

  propTypes: {
    disabled: React.PropTypes.bool,
    previous: React.PropTypes.bool,
    next: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    eventKey: React.PropTypes.any
  },

  getDefaultProps() {
    return {
      disabled: false,
      previous: false,
      next: false
    };
  },

  render() {
    const {
      disabled, previous, next, onClick, className, style, ...props,
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
  },

  handleSelect(e) {
    if (this.props.onSelect || this.props.disabled) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.eventKey, e);
      }
    }
  }
});

export default PageItem;
