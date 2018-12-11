import * as React from 'react';

export type ElementType =
  | React.ComponentType<any>
  | keyof JSX.IntrinsicElements;

export type Omit<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

type PropsOf<Tag extends ElementType> = Tag extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[Tag]
  : Tag extends React.SFC<infer Props>
    ? Props & React.Attributes
    : Tag extends React.ComponentClass<infer Props2>
      ? (Tag extends new (...args: any[]) => infer Instance
          ? Props2 & React.ClassAttributes<Instance>
          : never)
      : never;

export type WithInnerProps<Inner extends ElementType, P> = Omit<
  PropsOf<Inner>,
  P
> &
  P;

interface InferrableComponentProps<TRenderedType extends ElementType> {
  as: TRenderedType;
}

export interface BootstrapProps<TRenderedType extends ElementType>
  extends InferrableComponentProps<TRenderedType> {
  bsPrefix?: string;
}

// declare class BootstrapComponent<
//   TRenderedType extends ElementType,
//   TProps extends BootstrapProps<TRenderedType>,
//   TState = {}
// > extends React.Component<Omit<PropsOf<TRenderedType>, TProps>, TState> {
//   static defaultProps: { as: TRenderedType };
// }

// export { BootstrapComponent };
