import { TransitionComponent } from '@restart/ui/types';

export type Omit<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

export type TransitionType = boolean | TransitionComponent;

export function getOverlayDirection(placement: string, isRTL?: boolean) {
  let bsDirection = placement;
  if (placement === 'left') {
    bsDirection = isRTL ? 'end' : 'start';
  } else if (placement === 'right') {
    bsDirection = isRTL ? 'start' : 'end';
  }
  return bsDirection;
}
