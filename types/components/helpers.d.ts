import * as React from 'react';

export type Omit<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

export type PropsOf<
  Tag extends React.ReactType
> = Tag extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[Tag]
  : Tag extends React.SFC<infer Props>
  ? Props & React.Attributes
  : Tag extends React.ComponentClass<infer Props2>
  ? (Tag extends new (...args: any[]) => infer Instance
      ? Props2 & React.ClassAttributes<Instance>
      : never)
  : never;

export type ReplaceProps<Inner extends React.ReactType, P> = Omit<
  PropsOf<Inner>,
  P
> &
  P;

export interface BsPrefixProps<As extends React.ReactType> {
  as?: As;
  bsPrefix?: string;
}

export class BsPrefixComponent<
  As extends React.ReactType,
  P = {}
> extends React.Component<ReplaceProps<As, BsPrefixProps<As> & P>> {}

export type SelectCallback = (
  eventKey: any,
  e: React.SyntheticEvent<{}>,
) => void;

export interface TransitionCallbacks {
  onEnter?(node: HTMLElement): any;
  onEntered?(node: HTMLElement): any;
  onEntering?(node: HTMLElement): any;
  onExit?(node: HTMLElement): any;
  onExited?(node: HTMLElement): any;
  onExiting?(node: HTMLElement): any;
}
