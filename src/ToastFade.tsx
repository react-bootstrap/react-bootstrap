import * as React from 'react';
import Transition, {
  ENTERING,
  EXITING,
} from 'react-transition-group/Transition';
import Fade, { FadeProps } from './Fade';

const fadeStyles = {
  [ENTERING]: 'showing',
  [EXITING]: 'showing show',
};

const ToastFade = React.forwardRef<Transition<any>, FadeProps>((props, ref) => (
  <Fade {...props} ref={ref} transitionClasses={fadeStyles} />
));

ToastFade.displayName = 'ToastFade';

export default ToastFade;
