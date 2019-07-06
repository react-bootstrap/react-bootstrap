import * as React from 'react';

import { BsPrefixComponent } from './helpers';

declare class ToastBody<
  As extends React.ReactType = 'div'
  > extends BsPrefixComponent<As> { }

export default ToastBody;
