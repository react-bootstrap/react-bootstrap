import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import FormCheck from './FormCheck';
import FormFile from './FormFile';
import FormControl from './FormControl';
import FormGroup from './FormGroup';
import FormLabel from './FormLabel';
import FormText from './FormText';
import Switch from './Switch';
import { useBootstrapPrefix } from './ThemeProvider';
import createWithBsPrefix from './createWithBsPrefix';

const propTypes = {
  /**
   * @default {'form'}
   */
  bsPrefix: PropTypes.string,

  /**
   * The Form `ref` will be forwarded to the underlying element,
   * which means, unless it's rendered `as` a composite component,
   * it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  _ref: PropTypes.any,

  /**
   * Display the series of labels, form controls,
   * and buttons on a single horizontal row
   */
  inline: PropTypes.bool,

  /**
   * Mark a form as having been validated. Setting it to `true` will
   * toggle any validation styles on the forms elements.
   */
  validated: PropTypes.bool,
  as: PropTypes.elementType,
};

const defaultProps = {
  inline: false,
};

const Form = React.forwardRef(
  (
    {
      bsPrefix,
      inline,
      className,
      validated,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'form',
      ...props
    },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'form');
    return (
      <Component
        {...props}
        ref={ref}
        className={classNames(
          className,
          validated && 'was-validated',
          inline && `${bsPrefix}-inline`,
        )}
      />
    );
  },
);

Form.displayName = 'Form';
Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

Form.Row = createWithBsPrefix('form-row');
Form.Group = FormGroup;
Form.Control = FormControl;
Form.Check = FormCheck;
Form.File = FormFile;
Form.Switch = Switch;
Form.Label = FormLabel;
Form.Text = FormText;

export default Form;
