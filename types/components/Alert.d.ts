import * as React from 'react';

import SafeAnchor from './SafeAnchor';

import { BsPrefixComponent } from './helpers';

export class AlertLink<
  As extends React.ElementType = typeof SafeAnchor
> extends BsPrefixComponent<As> {}

export class AlertHeading<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As> {}

export interface AlertProps extends React.HTMLProps<HTMLDivElement> {
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
  transition?: React.ElementType;
}

declare const Alert: React.ForwardRefExoticComponent<AlertProps> & {
  Link: typeof AlertLink;
  Heading: typeof AlertHeading;
};

export default Alert;
