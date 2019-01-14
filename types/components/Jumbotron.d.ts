import * as React from 'react';

import { BsPrefixComponent } from './helpers';

interface JumbotronProps {
  fluid?: boolean;
}

declare class Jumbotron<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As, JumbotronProps> {}

export default Jumbotron;
