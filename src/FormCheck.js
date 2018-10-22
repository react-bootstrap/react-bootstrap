import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { createBootstrapComponent } from './ThemeProvider';
import FormContext from './FormContext';
import Feedback from './Feedback';
import FormCheckInput from './FormCheckInput';
import FormCheckLabel from './FormCheckLabel';

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

    /**
     * Provide a function child to manually handle the layout of the FormCheck's inner components.
     *
     * ````
     * <FormCheck>
     *   <FormCheck.Input isInvalid type={radio} />
     *   <FormCheck.Label>Allow us to contact you?</FormCheck.Label>
     *   <Feedback type="invalid">Yo this is required</Feedback>
     * </FormCheck>
     * ```
     */
    children: PropTypes.node,

    inline: PropTypes.bool,
    disabled: PropTypes.bool,
    title: PropTypes.string,
    label: PropTypes.node,

    /** Use Bootstrap's custom form elements to replace the browser defaults */
    custom: PropTypes.bool,

    /** The type of checkable. */
    type: PropTypes.oneOf(['radio', 'checkbox']).isRequired,

    /** Manually style the input as valid */
    isValid: PropTypes.bool.isRequired,

    /** Manually style the input as invalid */
    isInvalid: PropTypes.bool.isRequired,

    /** A message to display when the input is in a validation state */
    feedback: PropTypes.node,
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
      feedback,
      inputRef,
      className,
      style,
      title,
      type,
      label,
      children,
      custom,
      ...props
    } = this.props;

    const hasLabel = label != null && label !== false && !children;

    const input = (
      <FormCheckInput
        {...props}
        type={type}
        ref={inputRef}
        isValid={isValid}
        isInvalid={isInvalid}
        isStatic={!hasLabel}
        disabled={disabled}
      />
    );

    return (
      <FormContext.Transform
        mapToValue={({ controlId }) => ({
          controlId: id || controlId,
          custom,
        })}
      >
        <div
          style={style}
          className={classNames(
            className,
            !custom && bsPrefix,
            custom && `custom-control custom-${type}`,
            inline && `${custom ? 'custom-control' : bsPrefix}-inline`,
          )}
        >
          {children || (
            <React.Fragment>
              {input}
              {hasLabel && (
                <FormCheckLabel title={title}>{label}</FormCheckLabel>
              )}
              {(isValid || isInvalid) && (
                <Feedback type={isValid ? 'valid' : 'invalid'}>
                  {feedback}
                </Feedback>
              )}
            </React.Fragment>
          )}
        </div>
      </FormContext.Transform>
    );
  }
}
const DecoratedFormCheck = createBootstrapComponent(FormCheck, {
  forwardRefAs: 'inputRef',
  prefix: 'form-check',
});

DecoratedFormCheck.Input = FormCheckInput;
DecoratedFormCheck.Label = FormCheckLabel;

export default DecoratedFormCheck;
