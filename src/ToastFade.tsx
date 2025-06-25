import * as React from 'react';
import { Transition } from 'react-transition-group';
import Fade, { type FadeProps } from './Fade.js';

const fadeStyles = {
  entering: 'showing',
  exiting: 'showing show',
};

const ToastFade = React.forwardRef<Transition<any>, FadeProps>((props, ref) => (
  <Fade {...props} ref={ref} transitionClasses={fadeStyles} />
));

ToastFade.displayName = 'ToastFade';

export default ToastFade;
