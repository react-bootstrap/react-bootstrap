import { TransitionComponent } from '@restart/ui/types';
import NoopTransition from '@restart/ui/NoopTransition';
import Fade from './Fade.js';
import type { TransitionType } from './helpers.js';

export default function getTabTransitionComponent(
  transition?: TransitionType,
): TransitionComponent | undefined {
  if (typeof transition === 'boolean') {
    return transition ? Fade : NoopTransition;
  }

  return transition;
}
