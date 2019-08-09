import * as React from 'react';
import Button from './Button';
import { BsPrefixComponent } from './helpers';

declare class PopoverContent<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As> {}

export default PopoverContent;
