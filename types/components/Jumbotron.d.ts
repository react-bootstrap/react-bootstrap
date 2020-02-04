import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface JumbotronProps {
  fluid?: boolean;
}

declare class Jumbotron<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As, JumbotronProps> {}

export default Jumbotron;
