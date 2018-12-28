import * as React from 'react';

import SafeAnchor from './SafeAnchor';

import { BsPrefixComponent } from './helpers';

export interface AlertProps extends React.HTMLProps<Alert> {
  bsPrefix?: string;
  variant?:
    | string
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light';
  dismissible?: boolean;
  show?: boolean;
  onClose?: () => void;
  closeLabel?: string;
  transition?: React.ReactType;
}

declare class Alert extends React.Component<AlertProps> {}

declare namespace Alert {
  class Link<
    As extends React.ReactType = typeof SafeAnchor
  > extends BsPrefixComponent<As> {}

  class Heading<As extends React.ReactType = 'div'> extends BsPrefixComponent<
    As
  > {}
}

export default Alert;
