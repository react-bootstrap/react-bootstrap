import * as React from 'react';

import ButtonGroup from './ButtonGroup';

import { BsPrefixComponent } from './helpers';

interface ToggleButtonRadioProps<T> {
  type?: 'radio';
  name: string;
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}
interface ToggleButtonCheckboxProps<T> {
  type: 'checkbox';
  name?: string;
  value?: T;
  defaultValue?: T;
  onChange?: (value: T[]) => void;
}

type ToggleButtonGroupProps<T> =
  | ToggleButtonRadioProps<T>
  | ToggleButtonCheckboxProps<T>;

declare class ToggleButtonGroup<
  T,
  As extends React.ReactType = typeof ButtonGroup
> extends BsPrefixComponent<As, ToggleButtonGroupProps<T>> {}

export default ToggleButtonGroup;
