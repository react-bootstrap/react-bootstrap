import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface ContainerProps {
  fluid?: boolean;
}

declare class Container extends BsPrefixComponent<'div', ContainerProps> {}

export default Container;
