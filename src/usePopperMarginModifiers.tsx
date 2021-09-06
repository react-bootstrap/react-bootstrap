import { useCallback, useMemo, useRef } from 'react';
import hasClass from 'dom-helpers/hasClass';
import { useBootstrapPrefix } from './ThemeProvider';

interface Margins {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

function getMargins(element: Element): Margins {
  const styles = window.getComputedStyle(element);

  const top = parseFloat(styles.marginTop) || 0;
  const right = parseFloat(styles.marginRight) || 0;
  const bottom = parseFloat(styles.marginBottom) || 0;
  const left = parseFloat(styles.marginLeft) || 0;
  return { top, right, bottom, left };
}

export default function usePopperMarginModifiers(): [
  (overlay: HTMLDivElement) => void,
  Array<Record<string, unknown>>, // TODO: use popper Modifier type?
] {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const margins = useRef<Margins | null>(null);
  const arrowMargins = useRef<Margins | null>(null);

  const popoverClass = useBootstrapPrefix(undefined, 'popover');
  const dropdownMenuClass = useBootstrapPrefix(undefined, 'dropdown-menu');

  const callback = useCallback(
    (overlay: HTMLDivElement) => {
      if (
        !overlay ||
        !(
          hasClass(overlay, popoverClass) ||
          hasClass(overlay, dropdownMenuClass)
        )
      )
        return;

      margins.current = getMargins(overlay);
      overlay.style.margin = '0';
      overlayRef.current = overlay;
    },
    [popoverClass, dropdownMenuClass],
  );

  const offset = useMemo(() => {
    return {
      name: 'offset',
      options: {
        offset: ({ placement }) => {
          if (!margins.current) return [0, 0];
          const { top, left, bottom, right } = margins.current;

          switch (placement.split('-')[0]) {
            case 'top':
              return [0, bottom];
            case 'left':
              return [0, right];
            case 'bottom':
              return [0, top];
            case 'right':
              return [0, left];
            default:
              return [0, 0];
          }
        },
      },
    };
  }, [margins]);

  const arrow = useMemo(() => {
    return {
      name: 'arrow',
      options: {
        padding: () => {
          // The options here are used for Popper 2.8.4 and up.
          // For earlier version, padding is handled in popoverArrowMargins below.
          if (!arrowMargins.current) {
            return 0;
          }

          const { top, right } = arrowMargins.current;
          const padding = top || right;
          return {
            top: padding,
            left: padding,
            right: padding,
            bottom: padding,
          };
        },
      },
    };
  }, [arrowMargins]);

  // Converts popover arrow margin to arrow modifier padding
  const popoverArrowMargins = useMemo(() => {
    return {
      name: 'popoverArrowMargins',
      enabled: true,
      phase: 'main',
      fn: () => undefined,
      requiresIfExists: ['arrow'],
      effect({ state }) {
        if (
          !overlayRef.current ||
          !state.elements.arrow ||
          !hasClass(overlayRef.current, popoverClass)
        ) {
          return undefined;
        }

        if (state.modifiersData['arrow#persistent']) {
          // @popperjs/core <= 2.8.3 uses arrow#persistent to pass padding to arrow modifier.
          const { top, right } = getMargins(state.elements.arrow);
          const padding = top || right;
          state.modifiersData['arrow#persistent'].padding = {
            top: padding,
            left: padding,
            right: padding,
            bottom: padding,
          };
        } else {
          // @popperjs/core >= 2.8.4 gets the padding from the arrow modifier options,
          // so we'll get the margins here, and let the arrow modifier above pass
          // it to popper.
          arrowMargins.current = getMargins(state.elements.arrow);
        }

        state.elements.arrow.style.margin = '0';

        return () => {
          if (state.elements.arrow) state.elements.arrow.style.margin = '';
        };
      },
    };
  }, [popoverClass]);

  return [callback, [offset, arrow, popoverArrowMargins]];
}
