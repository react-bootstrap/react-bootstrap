import { Placement } from './Overlay';

export interface TooltipProps extends React.ComponentPropsWithoutRef<'div'> {
  bsPrefix?: string;
  id: string;
  placement?: Placement;
  arrowProps?: { ref: any; style: object };
}

declare const Tooltip: React.ForwardRefRenderFunction<
  HTMLDivElement,
  TooltipProps
>;

export default Tooltip;
