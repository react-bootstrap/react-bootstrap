import * as React from 'react';

import { BsPrefixComponent } from './helpers';

interface ListGroupItemProps {
  action?: boolean;
  active?: boolean;
  disabled?: boolean;
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light';
}

declare class ListGroupItem<
  As extends React.ReactType = 'a'
> extends BsPrefixComponent<As, ListGroupItemProps> {}

export default ListGroupItem;
