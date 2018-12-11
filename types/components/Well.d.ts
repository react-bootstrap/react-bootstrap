import * as React from 'react';
import { Sizes } from 'react-bootstrap';

declare namespace Well {
  export interface WellProps extends React.HTMLProps<Well> {
    size: string;
    variant?: string;
  }
}
declare class Well extends React.Component<Well.WellProps> {}
export = Well;
