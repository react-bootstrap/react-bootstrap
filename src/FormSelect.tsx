import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useBootstrapPrefix } from './ThemeProvider';
import {
  BsPrefixAndClassNameOnlyProps,
  BsPrefixRefForwardingComponent,
} from './helpers';

export interface FormSelectProps
  extends BsPrefixAndClassNameOnlyProps,
    React.HTMLAttributes<HTMLSelectElement> {
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

const FormSelect: BsPrefixRefForwardingComponent<
  'select',
  FormSelectProps
> = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      bsPrefix,
      size,
      htmlSize,
      className,
      isValid = false,
      isInvalid = false,
      ...props
    },
    ref,
  ) => {
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
      />
    );
  },
);

FormSelect.displayName = 'FormSelect';
FormSelect.propTypes = propTypes;

export default FormSelect;
