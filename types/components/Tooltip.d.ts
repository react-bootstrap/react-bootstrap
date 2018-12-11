import * as React from 'react';
import { Sizes } from 'react-bootstrap';

declare namespace Tooltip {
  export interface TooltipProps extends React.HTMLProps<Tooltip> {
    // Optional
    arrowOffsetLeft?: number | string;
    arrowOffsetTop?: number | string;
    size: string;
    variant?: string;
    placement?: string;
    positionLeft?: number;
    positionTop?: number;
  }
}
declare class Tooltip extends React.Component<Tooltip.TooltipProps> {}
export = Tooltip;
