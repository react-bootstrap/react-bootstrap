import * as React from 'react';

import ButtonGroup, { ButtonGroupProps } from './ButtonGroup';

import { BsPrefixComponent, BsPrefixComponentClass } from './helpers';

export interface ToggleButtonRadioProps<T> {
  type?: 'radio';
  name: string;
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}
export interface ToggleButtonCheckboxProps<T> {
  type: 'checkbox';
  name?: string;
  value?: T[];
  defaultValue?: T[];
  onChange?: (value: T[]) => void;
}

export type ToggleButtonGroupProps<T> =
  | ToggleButtonRadioProps<T>
  | ToggleButtonCheckboxProps<T>;

declare class ToggleButtonGroup<
  T,
  // Need to use BsPrefixComponentClass to get proper type checking.
  As extends React.ElementType = BsPrefixComponentClass<'a', ButtonGroupProps>
> extends BsPrefixComponent<As, ToggleButtonGroupProps<T>> {}

export default ToggleButtonGroup;
