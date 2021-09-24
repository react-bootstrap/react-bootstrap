import classNames from 'classnames';
import PropTypes from 'prop-types';

import React from 'react';

import createWithBsPrefix from './createWithBsPrefix';
import { useBootstrapPrefix } from './ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

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

export interface InputGroupProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'lg';
  hasValidation?: boolean;
}

type InputGroup = BsPrefixRefForwardingComponent<'div', InputGroupProps> & {
  Append: typeof InputGroupAppend;
  Prepend: typeof InputGroupPrepend;
  Text: typeof InputGroupText;
  Checkbox: typeof InputGroupCheckbox;
  Radio: typeof InputGroupRadio;
};

const propTypes = {
  /** @default 'input-group' */
  bsPrefix: PropTypes.string,

  /**
   * Control the size of buttons and form elements from the top-level.
   *
   * @type {('sm'|'lg')}
   */
  size: PropTypes.string,

  /**
   * Handles the input's rounded corners when using form validation.
   *
   * Use this when your input group contains both an input and feedback element.
   */
  hasValidation: PropTypes.bool,

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
const InputGroup: InputGroup = React.forwardRef(
  (
    {
      bsPrefix,
      size,
      hasValidation,
      className,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      ...props
    }: InputGroupProps,
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
          hasValidation && 'has-validation',
        )}
      />
    );
  },
) as unknown as InputGroup;

InputGroup.propTypes = propTypes;
InputGroup.displayName = 'InputGroup';

InputGroup.Text = InputGroupText;
InputGroup.Radio = InputGroupRadio;
InputGroup.Checkbox = InputGroupCheckbox;
InputGroup.Append = InputGroupAppend;
InputGroup.Prepend = InputGroupPrepend;

export default InputGroup;
