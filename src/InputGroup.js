import classNames from 'classnames';
import PropTypes from 'prop-types';

import React from 'react';

import createWithBsPrefix from './createWithBsPrefix';
import { useBootstrapPrefix } from './ThemeProvider';

const propTypes = {
  /** @default 'input-group' */
  bsPrefix: PropTypes.string,

  /**
   * Control the size of buttons and form elements from the top-level .
   *
   * @type {('sm'|'lg')}
   */
  size: PropTypes.string,

  as: PropTypes.elementType,
};

/**
 *
 * @property {InputGroupAppend} Append
 * @property {InputGroupPrepend} Prepend
 * @property {InputGroupText} Text
 * @property {InputGroupRadio} Radio
 * @property {InputGroupCheckbox} Checkbox
 */
const InputGroup = React.forwardRef(
  (
    {
      bsPrefix,
      size,
      className,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      ...props
    },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'input-group');

    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(
          className,
          bsPrefix,
          size && `${bsPrefix}-${size}`,
        )}
      />
    );
  },
);

const InputGroupAppend = createWithBsPrefix('input-group-append');

const InputGroupPrepend = createWithBsPrefix('input-group-prepend');

const InputGroupText = createWithBsPrefix('input-group-text', {
  Component: 'span',
});

const InputGroupCheckbox = (props) => (
  <InputGroupText>
    <input type="checkbox" {...props} />
  </InputGroupText>
);

const InputGroupRadio = (props) => (
  <InputGroupText>
    <input type="radio" {...props} />
  </InputGroupText>
);

InputGroup.propTypes = propTypes;
InputGroup.displayName = 'InputGroup';

InputGroup.Text = InputGroupText;
InputGroup.Radio = InputGroupRadio;
InputGroup.Checkbox = InputGroupCheckbox;
InputGroup.Append = InputGroupAppend;
InputGroup.Prepend = InputGroupPrepend;

export default InputGroup;
