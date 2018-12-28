import * as React from 'react';
import FormControlFeedback = require('./FormControlFeedback');
import FormControlStatic = require('./FormControlStatic');

declare namespace FormControl {
  export interface FormControlProps extends React.HTMLProps<FormControl> {
    bsPrefix?: string;
    // size: string;
    componentClass?: React.ReactType;
    id?: string;
    inputRef?: (instance: HTMLInputElement) => void;
    type?: string;
  }
}
declare class FormControl extends React.Component<
  FormControl.FormControlProps
> {
  public static Feedback: typeof FormControlFeedback;
  public static Static: typeof FormControlStatic;
}
export = FormControl;
