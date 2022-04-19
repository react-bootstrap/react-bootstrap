import { TransitionComponent } from '@restart/ui/types';
import NoopTransition from '@restart/ui/NoopTransition';
import Fade from './Fade';
import { TransitionType } from './helpers';

export default function getTabTransitionComponent(
  transition?: TransitionType,
): TransitionComponent | undefined {
  if (typeof transition === 'boolean') {
    return transition ? Fade : NoopTransition;
  }

  return transition;
}
