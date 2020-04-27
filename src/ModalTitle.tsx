import createWithBsPrefix from './createWithBsPrefix';
import divWithClassName from './divWithClassName';

import * as React from 'react';
import { BsPrefixComponent } from './helpers';

declare class ModalTitle<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As> {}

const DivStyledAsH4 = divWithClassName('h4');

export default createWithBsPrefix('modal-title', { Component: DivStyledAsH4 });
