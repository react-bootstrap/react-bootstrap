import { useCallback, useMemo, useRef } from 'react';
import hasClass from 'dom-helpers/hasClass';

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

  const callback = useCallback((overlay: HTMLDivElement) => {
    if (
      !overlay ||
      !(hasClass(overlay, 'popover') || hasClass(overlay, 'dropdown-menu'))
    )
      return;

    margins.current = getMargins(overlay);
    overlay.style.margin = '0';
    overlayRef.current = overlay;
  }, []);

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

  // Converts popover arrow margin to arrow modifier padding
  const popoverArrowMargins = useMemo(() => {
    return {
      name: 'popoverArrowMargins',
      enabled: true,
      phase: 'main',
      requiresIfExists: ['arrow'],
      effect({ state }) {
        if (
          !overlayRef.current ||
          !state.elements.arrow ||
          !hasClass(overlayRef.current, 'popover') ||
          !state.modifiersData['arrow#persistent']
        ) {
          return undefined;
        }

        const { top, right } = getMargins(state.elements.arrow);
        const padding = top || right;
        state.modifiersData['arrow#persistent'].padding = {
          top: padding,
          left: padding,
          right: padding,
          bottom: padding,
        };
        state.elements.arrow.style.margin = '0';

        return () => {
          if (state.elements.arrow) state.elements.arrow.style.margin = '';
        };
      },
    };
  }, []);

  return [callback, [offset, popoverArrowMargins]];
}
