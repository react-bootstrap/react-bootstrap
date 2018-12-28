import * as React from 'react';

declare namespace ListGroupItem {
  export interface ListGroupItemProps extends React.HTMLProps<ListGroupItem> {
    active?: any;
    // size: string;
    variant?: string;
    eventKey?: any;
    header?: React.ReactNode;
    listItem?: boolean;
  }
}
declare class ListGroupItem extends React.Component<
  ListGroupItem.ListGroupItemProps
> {}
export = ListGroupItem;
