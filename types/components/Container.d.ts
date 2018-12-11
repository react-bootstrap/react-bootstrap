import * as React from 'react';

declare namespace Container {
  export interface ContainerProps extends React.HTMLProps<Container> {
    componentClass?: React.ReactType;
    fluid?: boolean;
    bsPrefix?: string;
  }
}
declare class Container extends React.Component<Container.ContainerProps> {}
export = Container;
