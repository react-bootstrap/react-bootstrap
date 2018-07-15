/* eslint-disable jsx-a11y/label-has-for */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { bsClass, prefix, splitBsProps } from './utils/bootstrapUtils';

const propTypes = {
  inline: PropTypes.bool,
  disabled: PropTypes.bool,
  title: PropTypes.string,

  isValid: PropTypes.bool.isRequired,
  isInvalid: PropTypes.bool.isRequired,
  /**
   * Attaches a ref to the `<input>` element. Only functions can be used here.
   *
   * ```js
   * <Checkbox inputRef={ref => { this.input = ref; }} />
   * ```
   */
  inputRef: PropTypes.func,
};

const defaultProps = {
  inline: false,
  disabled: false,
  isValid: false,
  isInvalid: false,
  title: '',
};

class Checkbox extends React.Component {
  render() {
    const {
      inline,
      disabled,
      isValid,
      isInvalid,
      inputRef,
      className,
      style,
      title,
      children,
      ...props
    } = this.props;

    const [bsProps, elementProps] = splitBsProps(props);

    return (
      <div
        className={classNames(
          className,
          disabled && 'disabled',
          inline && prefix(bsProps, 'inline'),
        )}
        style={style}
        title={title}
      >
        <label title={title} className={prefix(bsProps, 'label')}>
          <input
            {...elementProps}
            ref={inputRef}
            type="checkbox"
            disabled={disabled}
            className={classNames(
              prefix(bsProps, 'input'),
              isValid && prefix(bsProps, 'is-valid'),
              isInvalid && prefix(bsProps, 'is-invalid'),
            )}
          />
          {children}
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default bsClass('form-check', Checkbox);
