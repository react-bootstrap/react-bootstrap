import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useContext } from 'react';
import { useBootstrapPrefix } from './ThemeProvider';
import { BsPrefixOnlyProps } from './helpers';
import FormContext from './FormContext';

export interface FormRangeProps
  extends BsPrefixOnlyProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

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
    PropTypes.arrayOf(PropTypes.string.isRequired),
    PropTypes.number,
  ]),

  /** A callback fired when the `value` prop changes */
  onChange: PropTypes.func,

  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  id: PropTypes.string,
};

const FormRange = React.forwardRef<HTMLInputElement, FormRangeProps>(
  ({ bsPrefix, className, id, ...props }, ref) => {
    const { controlId } = useContext(FormContext);
    bsPrefix = useBootstrapPrefix(bsPrefix, 'form-range');

    return (
      <input
        {...props}
        type="range"
        ref={ref}
        className={classNames(className, bsPrefix)}
        id={id || controlId}
      />
    );
  },
);

FormRange.displayName = 'FormRange';
FormRange.propTypes = propTypes;

export default FormRange;
