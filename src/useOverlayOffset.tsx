import { useMemo, useRef } from 'react';
import hasClass from 'dom-helpers/hasClass';
import { Options } from 'react-overlays/usePopper';
import { useBootstrapPrefix } from './ThemeProvider';

export default function useOverlayOffset(): [
  React.RefObject<HTMLElement>,
  Options['modifiers'],
] {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const popoverClass = useBootstrapPrefix(undefined, 'popover');

  const offset = useMemo(
    () => ({
      name: 'offset',
      options: {
        offset: () => {
          if (
            overlayRef.current &&
            hasClass(overlayRef.current, popoverClass)
          ) {
            // Default popover offset.
            // https://github.com/twbs/bootstrap/blob/5c32767e0e0dbac2d934bcdee03719a65d3f1187/js/src/popover.js#L28
            return [0, 8];
          }
          return [0, 0];
        },
      },
    }),
    [popoverClass],
  );

  return [overlayRef, [offset]];
}
