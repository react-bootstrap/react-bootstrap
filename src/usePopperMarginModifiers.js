import { useCallback, useRef, useMemo } from 'react';
import hasClass from 'dom-helpers/hasClass';
import offset from '@popperjs/core/lib/modifiers/offset';

function getMargins(element) {
  const styles = getComputedStyle(element);

  const top = parseFloat(styles.marginTop) || 0;
  const right = parseFloat(styles.marginRight) || 0;
  const bottom = parseFloat(styles.marginBottom) || 0;
  const left = parseFloat(styles.marginLeft) || 0;
  return { top, right, bottom, left };
}

export default function usePopperMarginModifiers() {
  const overlayRef = useRef(null);
  const margins = useRef(null);

  return [
    useCallback((overlay) => {
      if (
        !overlay ||
        !(hasClass(overlay, 'popover') || hasClass(overlay, 'dropdown-menu'))
      )
        return;

      margins.current = getMargins(overlay);
      overlay.style.margin = 0;
      overlayRef.current = overlay;
    }, []),
    [
      useMemo(() => {
        return {
          ...offset,
          name: 'bootstrap-margin-offset',
          options: {
            offset: ({ placement }) => {
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
      }, [margins]),
    ],
  ];
}
