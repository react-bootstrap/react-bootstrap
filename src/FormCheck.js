import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { bsClass, getClassSet, prefix, splitBsProps }
  from './utils/bootstrapUtils';

const propTypes = {
  inline: PropTypes.bool,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  type: PropTypes.oneOf(['radio', 'checkbox']).isRequired,
  isValid: PropTypes.bool.isRequired,
  isInvalid: PropTypes.bool.isRequired,
  /**
   * Attaches a ref to the `<input>` element. Only functions can be used here.
   *
   * ```js
   * <FormCheck inputRef={ref => { this.input = ref; }} />
   * ```
   */
  inputRef: PropTypes.func,
};

const defaultProps = {
  type: 'checkbox',
  inline: false,
  disabled: false,
  isValid: false,
  isInvalid: false,
  title: '',
};

class FormCheck extends React.Component {
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
      type,
      children,
      ...props
    } = this.props;

    const [bsProps, elementProps] = splitBsProps(props);

    return (
      <div
        className={classNames(
          className,
          getClassSet(bsProps),
          disabled && 'disabled',
          inline && prefix(bsProps, 'inline')
        )}
        style={style}
        title={title}
      >
        <label title={title} className={prefix(bsProps, 'label')}>
          <input
            {...elementProps}
            ref={inputRef}
            type={type}
            disabled={disabled}
            className={classNames(
              prefix(bsProps, 'input'),
              isValid && prefix(bsProps, 'is-valid'),
              isInvalid && prefix(bsProps, 'is-invalid')
            )}
          />
          {children}
        </label>
      </div>
    );
  }
}

FormCheck.propTypes = propTypes;
FormCheck.defaultProps = defaultProps;

export default bsClass('form-check', FormCheck);
