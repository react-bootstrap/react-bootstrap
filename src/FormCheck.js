import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';

import mapContextToProps from './utils/mapContextToProps';
import createWithBsPrefix from './utils/createWithBsPrefix';
import { createBootstrapComponent } from './ThemeProvider';
import FormContext from './FormContext';
import Feedback from './Feedback';

const withFormContext = (field, Component) =>
  mapContextToProps(Component, FormContext.Consumer, ({ id }, props) => ({
    [field]: props[field] || id,
  }));

const FormCheckInput = createWithBsPrefix('form-check-input', {
  Component: 'input',
});

const FormCheckLabel = createWithBsPrefix('form-check-label', {
  Component: 'label',
});

class FormCheck extends React.Component {
  static propTypes = {
    /**
     * @default 'form-check'
     */
    bsPrefix: PropTypes.string,

    /**
     * The FormCheck `ref` will be forwarded to the underlying input element,
     * which means it will be a DOM node, when resolved.
     *
     * @type {ReactRef}
     * @alias {ref}
     */
    inputRef: PropTypes.any,

    /** A HTML id attribute, necessary for proper form accessibility. */
    id: PropTypes.string,

    inline: PropTypes.bool,
    disabled: PropTypes.bool,
    title: PropTypes.string,
    label: PropTypes.node,

    /** The type of checkable. */
    type: PropTypes.oneOf(['radio', 'checkbox']).isRequired,

    /** Manually style the input as valid */
    isValid: PropTypes.bool.isRequired,
    /** A message to display when the input is valid */
    validFeedback: PropTypes.node,

    /** Manually style the input as invalid */
    isInvalid: PropTypes.bool.isRequired,
    /** A message to display when the input is invalid */
    invalidFeedback: PropTypes.node,
  };

  static defaultProps = {
    type: 'checkbox',
    inline: false,
    disabled: false,
    isValid: false,
    isInvalid: false,
    title: '',
  };

  render() {
    const {
      id,
      bsPrefix,
      inline,
      disabled,
      isValid,
      isInvalid,
      inputRef, // eslint-disable-line react/prop-types
      className,
      style,
      title,
      type,
      label,
      children,
      ...props
    } = this.props;

    const hasChildren =
      children != null &&
      children !== false &&
      React.Children.count(children) > 0;

    const hasLabel =
      label != null && label !== false && React.Children.count(label) > 0;

    return (
      <div
        style={style}
        className={classNames(
          className,
          bsPrefix,
          inline && `${bsPrefix}-inline`,
        )}
      >
        {hasChildren ? (
          children
        ) : (
          <>
            <FormCheckInput
              {...props}
              id={id}
              type={type}
              ref={inputRef}
              disabled={disabled}
              className={classNames(
                isValid && 'is-valid',
                isInvalid && 'is-invalid',
                !hasLabel && 'position-static',
              )}
            />
            {hasLabel && (
              <FormCheckLabel htmlFor={id} title={title}>
                {label}
              </FormCheckLabel>
            )}
          </>
        )}
      </div>
    );
  }
}

const mapContext = ({ controlId }, { id }) => {
  warning(
    controlId == null || !id,
    '`controlId` is ignored on `<FormCheck>` when `id` is specified.',
  );
  return {
    id: id || controlId,
  };
};

export default mapContextToProps(
  createBootstrapComponent(FormCheck, {
    forwardRefAs: 'inputRef',
    prefix: 'form-check',
  }),
  FormContext.Consumer,
  mapContext,
);
