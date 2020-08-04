import classNames from 'classnames';
import PropTypes from 'prop-types';

import React from 'react';

import createWithBsPrefix from './createWithBsPrefix';
import { useBootstrapPrefix } from './ThemeProvider';
import FormCheckInput from './FormCheckInput';
import {
  BsPrefixPropsWithChildren,
  BsPrefixRefForwardingComponent,
} from './helpers';

const InputGroupText = createWithBsPrefix('input-group-text', {
  Component: 'span',
});

const InputGroupCheckbox = (props) => (
  <InputGroupText>
    <FormCheckInput type="checkbox" {...props} />
  </InputGroupText>
);

const InputGroupRadio = (props) => (
  <InputGroupText>
    <FormCheckInput type="radio" {...props} />
  </InputGroupText>
);

export interface InputGroupProps extends BsPrefixPropsWithChildren {
  size?: 'sm' | 'lg';
}

type InputGroupExtras = {
  Text: typeof InputGroupText;
  Checkbox: typeof InputGroupCheckbox;
  Radio: typeof InputGroupRadio;
};

type InputGroup = BsPrefixRefForwardingComponent<'div', InputGroupProps>;

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
 * @property {InputGroupText} Text
 * @property {InputGroupRadio} Radio
 * @property {InputGroupCheckbox} Checkbox
 */
const InputGroup: InputGroup = React.forwardRef(
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

InputGroup.propTypes = propTypes;
InputGroup.displayName = 'InputGroup';

const InputGroupWithExtras: InputGroup & InputGroupExtras = {
  ...InputGroup,
  Text: InputGroupText,
  Radio: InputGroupRadio,
  Checkbox: InputGroupCheckbox,
} as any;

export default InputGroupWithExtras;
