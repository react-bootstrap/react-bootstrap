import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useBootstrapPrefix } from './ThemeProvider';
import {
  BsPrefixAndClassNameOnlyProps,
  BsPrefixRefForwardingComponent,
} from './helpers';

export interface FormRangeProps
  extends BsPrefixAndClassNameOnlyProps,
    React.InputHTMLAttributes<HTMLInputElement> {}

const propTypes = {
  /**
   * @default {'form-range'}
   */
  bsPrefix: PropTypes.string,

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
};

const FormRange: BsPrefixRefForwardingComponent<
  'input',
  FormRangeProps
> = React.forwardRef<HTMLInputElement, FormRangeProps>(
  ({ bsPrefix, className, ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'form-range');

    return (
      <input
        {...props}
        type="range"
        ref={ref}
        className={classNames(className, bsPrefix)}
      />
    );
  },
);

FormRange.displayName = 'FormRange';
FormRange.propTypes = propTypes;

export default FormRange;
