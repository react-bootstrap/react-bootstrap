import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface ContainerProps {
  fluid?: boolean;
}

declare class Container<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As, ContainerProps> {}

export default Container;
