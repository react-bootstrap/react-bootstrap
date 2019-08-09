import * as React from 'react';
import Button from './Button';
import { BsPrefixComponent } from './helpers';

declare class PopoverTitle<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As> {}

export default PopoverTitle;
