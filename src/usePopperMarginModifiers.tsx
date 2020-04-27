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
  object[], // TODO: use popper Modifier type?
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

  const modifier = useMemo(() => {
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
  return [callback, [modifier]];
}
