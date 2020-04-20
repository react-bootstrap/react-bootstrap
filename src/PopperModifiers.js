function getMargins(element) {
  const styles = getComputedStyle(element);

  const top = parseFloat(styles.marginTop) || 0;
  const right = parseFloat(styles.marginRight) || 0;
  const bottom = parseFloat(styles.marginBottom) || 0;
  const left = parseFloat(styles.marginLeft) || 0;
  return { top, right, bottom, left };
}

const NAME = 'popperMarginOffset';

export const popperMarginOffset = {
  name: NAME,
  enabled: true,
  phase: 'beforeRead',
  fn: ({ state, name }) => {
    const { popper: popperRect } = state.rects;
    const { popper, arrow } = state.elements;

    const popperMargins = getMargins(popper);
    const arrowMargins = arrow && getMargins(arrow);

    state.rects.popper = {
      ...popperRect,
      width: popperRect.width + popperMargins.left + popperMargins.right,
      height: popperRect.height + popperMargins.top + popperMargins.bottom,
      y: popperRect.y - popperMargins.top,
      x: popperRect.x - popperMargins.left,
    };

    state.modifiersData[name] = {
      popper: popperMargins,
      arrow: arrowMargins,
    };
  },
};

export const arrowMarginOffset = {
  name: 'arrowMarginOffset',
  enabled: true,
  phase: 'main',
  requires: [NAME],
  requiresIfExists: ['arrow'],
  fn({ state }) {
    if (!state.elements.arrow) return;

    const { arrow: arrowMargin } = state.modifiersData[NAME];

    const offsets = state.modifiersData.arrow;

    if (offsets.x != null) offsets.x -= arrowMargin.left;
    if (offsets.y != null) offsets.y -= arrowMargin.top;
  },
};
