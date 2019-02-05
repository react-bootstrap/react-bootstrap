import * as React from 'react';

import SafeAnchor from './SafeAnchor';

import { BsPrefixComponent } from './helpers';

declare class AlertLink<
  As extends React.ReactType = typeof SafeAnchor
> extends BsPrefixComponent<As> {}

declare class AlertHeading<
  As extends React.ReactType = 'div'
> extends BsPrefixComponent<As> {}

export interface AlertProps extends React.HTMLProps<Alert> {
  bsPrefix?: string;
  variant?:
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

declare class Alert extends React.Component<AlertProps> {
  static Link: typeof AlertLink;
  static Heading: typeof AlertHeading;
}

export default Alert;
