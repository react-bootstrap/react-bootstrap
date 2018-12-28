import * as React from 'react';

declare namespace Tooltip {
  interface TooltipProps extends React.HTMLProps<Tooltip> {
    id: string;
    bsPrefix?: string;
    placement?:
      | 'auto-start'
      | 'auto'
      | 'auto-end'
      | 'top-start'
      | 'top'
      | 'top-end'
      | 'right-start'
      | 'right'
      | 'right-end'
      | 'bottom-end'
      | 'bottom'
      | 'bottom-start'
      | 'left-end'
      | 'left'
      | 'left-start';
  }
}
declare class Tooltip extends React.Component<Tooltip.TooltipProps> {}
export = Tooltip;
