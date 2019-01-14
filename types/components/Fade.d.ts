import * as React from 'react';
import { TransitionCallbacks } from './helpers';

interface FadeProps
  extends TransitionCallbacks,
    React.ClassAttributes<Fade> {
  in?: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  appear?: boolean;
  timeout?: number;
}
declare class Fade extends React.Component<FadeProps> {}

export default Fade;
