import * as React from 'react';

import { BsPrefixComponent } from './helpers';

interface ContainerProps {
  fluid?: boolean;
}

declare class Container<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As, ContainerProps> {}

export default Container;
