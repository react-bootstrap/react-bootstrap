import * as React from 'react';

declare namespace FormGroup {
  export interface FormGroupProps extends React.HTMLProps<FormGroup> {
    bsPrefix?: string;
    // size: string;
    controlId?: string;
    validationState?: 'success' | 'warning' | 'error' | null;
  }
}
declare class FormGroup extends React.Component<FormGroup.FormGroupProps> {}
export = FormGroup;
