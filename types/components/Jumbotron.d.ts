import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface JumbotronProps {
  fluid?: boolean;
}

declare class Jumbotron extends BsPrefixComponent<'div', JumbotronProps> {}

export default Jumbotron;
