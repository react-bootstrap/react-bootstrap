import * as React from 'react';

export type Omit<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

export type ReplaceProps<Inner extends React.ElementType, P> = Omit<
  React.ComponentPropsWithRef<Inner>,
  P
> &
  P;

export interface BsPrefixProps<As extends React.ElementType> {
  as?: As;
  bsPrefix?: string;
}

export class BsPrefixComponent<
  As extends React.ElementType,
  P = {}
> extends React.Component<ReplaceProps<As, BsPrefixProps<As> & P>> {}

// Need to use this instead of typeof Component to get proper type checking.
export type BsPrefixComponentClass<
  As extends React.ElementType,
  P = {}
> = React.ComponentClass<ReplaceProps<As, BsPrefixProps<As> & P>>;

export type SelectCallback = (
  eventKey: string,
  e: React.SyntheticEvent<unknown>,
) => void;

export interface TransitionCallbacks {
  onEnter?(node: HTMLElement): any;
  onEntered?(node: HTMLElement): any;
  onEntering?(node: HTMLElement): any;
  onExit?(node: HTMLElement): any;
  onExited?(node: HTMLElement): any;
  onExiting?(node: HTMLElement): any;
}
