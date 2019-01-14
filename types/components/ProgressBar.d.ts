import * as React from 'react';

import { BsPrefixComponent } from './helpers';

interface ProgressBarProps {
  min?: number;
  now?: number;
  max?: number;
  label?: React.ReactNode;
  srOnly?: boolean;
  striped?: boolean;
  animated?: boolean;
  variant?: 'success' | 'danger' | 'warning' | 'info';
}

declare class ProgressBar extends BsPrefixComponent<'div', ProgressBarProps> {}

export default ProgressBar;
