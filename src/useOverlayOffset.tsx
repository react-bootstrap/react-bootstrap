import { useMemo, useRef } from 'react';
import { Offset, Options } from '@restart/ui/usePopper';
import { useBootstrapPrefix } from './ThemeProvider.js';
import Popover from './Popover.js';
import Tooltip from './Tooltip.js';

// This is meant for internal use.
// This applies a custom offset to the overlay if it's a popover or tooltip.
export default function useOverlayOffset(
  customOffset?: Offset,
): [React.RefObject<HTMLElement | null>, Options['modifiers']] {
  const overlayRef = useRef<HTMLElement | null>(null);
  const popoverClass = useBootstrapPrefix(undefined, 'popover');
  const tooltipClass = useBootstrapPrefix(undefined, 'tooltip');

  const offset = useMemo(
    () => ({
      name: 'offset',
      options: {
        offset: () => {
          if (customOffset) {
            return customOffset;
          }

          if (overlayRef.current) {
            if (overlayRef.current.classList.contains(popoverClass)) {
              return Popover.POPPER_OFFSET;
            }

            if (overlayRef.current.classList.contains(tooltipClass)) {
              return Tooltip.TOOLTIP_OFFSET;
            }
          }
          return [0, 0];
        },
      },
    }),
    [customOffset, popoverClass, tooltipClass],
  );

  return [overlayRef, [offset]];
}
