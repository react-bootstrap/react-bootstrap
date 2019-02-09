import * as React from 'react';

import { BsPrefixComponent, SelectCallback } from './helpers';

declare class TabContent<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As> {}

export default TabContent;
