import PropTypes from 'prop-types';
import * as React from 'react';
import { useMemo } from 'react';

import FormContext from './FormContext';
import { AsProp, BsPrefixRefForwardingComponent } from './helpers';

export interface FormGroupProps
  extends React.HTMLAttributes<HTMLElement>,
    AsProp {
  controlId?: string;
}

const propTypes = {
  as: PropTypes.elementType,

  /**
   * Sets `id` on `<FormControl>` and `htmlFor` on `<FormGroup.Label>`.
   */
  controlId: PropTypes.string,

  /**
   * The FormGroup `ref` will be forwarded to the underlying element.
   * Unless the FormGroup is rendered `as` a composite component,
   * it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  _ref: PropTypes.any,
};

const FormGroup: BsPrefixRefForwardingComponent<'div', FormGroupProps> =
  React.forwardRef(
    (
      {
        controlId,
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component = 'div',
        ...props
      },
      ref,
    ) => {
      const context = useMemo(() => ({ controlId }), [controlId]);

      return (
        <FormContext.Provider value={context}>
          <Component {...props} ref={ref} />
        </FormContext.Provider>
      );
    },
  );

FormGroup.displayName = 'FormGroup';
FormGroup.propTypes = propTypes;

export default FormGroup;
