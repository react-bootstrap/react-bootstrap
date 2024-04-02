import React from 'react';

export type IntrinsicElementsKeys = keyof JSX.IntrinsicElements;

export type ReplaceProps<
  Inner extends string | React.ComponentType<any>,
  P
> = Omit<
  React.ComponentPropsWithRef<
    Inner extends IntrinsicElementsKeys | React.JSXElementConstructor<any>
      ? Inner
      : never
  >,
  keyof P
> &
  P;

export interface BsPrefixAndClassNameOnlyProps {
  bsPrefix?: string;
  className?: string;
}

export interface BsCustomPrefixProps {
  bsCustomPrefix?: string;
}

export interface BsPrefixProps<
  As extends string | React.ComponentType<any> =
    | string
    | React.ComponentType<any>
> extends BsPrefixAndClassNameOnlyProps {
  as?: As;
}

export type BsPrefixPropsWithChildren<
  As extends string | React.ComponentType<any> =
    | string
    | React.ComponentType<any>
> = React.PropsWithChildren<BsPrefixProps<As>>;

export interface BsPrefixRefForwardingComponent<
  TInitial extends string | React.ComponentType<any>,
  P = unknown
> {
  <As extends string | React.ComponentType<any> = TInitial>(
    props: React.PropsWithChildren<ReplaceProps<As, BsPrefixProps<As> & P>>,
    context?: any,
  ): React.ReactElement | null;
  propTypes?: any;
  contextTypes?: any;
  defaultProps?: Partial<P>;
  displayName?: string;
}

export class BsPrefixComponent<
  As extends string | React.ComponentType<any>,
  P = unknown
> extends React.Component<ReplaceProps<As, BsPrefixProps<As> & P>> {}

// Need to use this instead of typeof Component to get proper type checking.
export type BsPrefixComponentClass<
  As extends string | React.ComponentType<any>,
  P = unknown
> = React.ComponentClass<ReplaceProps<As, BsPrefixProps<As> & P>>;

export type SelectCallback = (
  eventKey: string | null,
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

export type TransitionComponent = React.ComponentType<
  {
    in?: boolean;
    appear?: boolean;
    children: React.ReactElement;
  } & TransitionCallbacks
>;

export type TransitionType = boolean | TransitionComponent;
