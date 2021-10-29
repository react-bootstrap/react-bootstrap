import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useContext } from 'react';
import { useBootstrapPrefix } from './ThemeProvider';
import { BsPrefixOnlyProps, BsPrefixRefForwardingComponent } from './helpers';
import FormContext from './FormContext';

export interface FormSelectProps
  extends BsPrefixOnlyProps,
    Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  htmlSize?: number;
  size?: 'sm' | 'lg';
  isValid?: boolean;
  isInvalid?: boolean;
}

const propTypes = {
  /**
   * @default {'form-select'}
   */
  bsPrefix: PropTypes.string,

  /**
   * Size variants
   *
   * @type {('sm'|'lg')}
   */
  size: PropTypes.string,

  /**
   * The size attribute of the underlying HTML element.
   * Specifies the number of visible options.
   */
  htmlSize: PropTypes.number,

  /** Make the control disabled */
  disabled: PropTypes.bool,

  /**
   * The `value` attribute of underlying input
   *
   * @controllable onChange
   * */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
  ]),

  /** A callback fired when the `value` prop changes */
  onChange: PropTypes.func,

  /** Add "valid" validation styles to the control */
  isValid: PropTypes.bool,

  /** Add "invalid" validation styles to the control and accompanying label */
  isInvalid: PropTypes.bool,
};

const FormSelect: BsPrefixRefForwardingComponent<'select', FormSelectProps> =
  React.forwardRef<HTMLSelectElement, FormSelectProps>(
    (
      {
        bsPrefix,
        size,
        htmlSize,
        className,
        isValid = false,
        isInvalid = false,
        id,
        ...props
      },
      ref,
    ) => {
      const { controlId } = useContext(FormContext);
      bsPrefix = useBootstrapPrefix(bsPrefix, 'form-select');

      return (
        <select
          {...props}
          size={htmlSize}
          ref={ref}
          className={classNames(
            className,
            bsPrefix,
            size && `${bsPrefix}-${size}`,
            isValid && `is-valid`,
            isInvalid && `is-invalid`,
          )}
          id={id || controlId}
        />
      );
    },
  );

FormSelect.displayName = 'FormSelect';
FormSelect.propTypes = propTypes;

export default FormSelect;
