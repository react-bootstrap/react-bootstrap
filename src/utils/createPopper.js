import PopperJs from 'popper.js';

export default function createPopper(onUpdate) {
  let popper;

  return {
    destroy: () => popper && popper.destroy(),
    scheduleUpdate: () => popper && popper.scheduleUpdate(),
    update({ element, target, boundary, arrow: arrowEl, ...popperConfig }) {
      this.destroy();

      const {
        modifiers: { arrow, preventOverflow, ...modifiers } = {},
      } = popperConfig;

      popper = new PopperJs(target, element, {
        ...popperConfig,
        modifiers: {
          ...modifiers,
          preventOverflow: {
            ...preventOverflow,
            boundariesElement: boundary || 'scrollParent',
          },
          arrow: {
            // explicit so the default selector isn't used
            enabled: !!arrowEl,
            ...arrow,
            element: arrowEl,
          },
          computeStyle: { enabled: true },
          applyStyle: { enabled: false },
        },
        onCreate: onUpdate,
        onUpdate,
      });
    },
  };
}
