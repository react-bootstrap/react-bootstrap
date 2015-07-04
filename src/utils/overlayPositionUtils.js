import domUtils from './domUtils';

const utils = {

  getContainerDimensions(containerNode) {
    let width, height, scroll;

    if (containerNode.tagName === 'BODY') {
      width = window.innerWidth;
      height = window.innerHeight;
      scroll =
        domUtils.ownerDocument(containerNode).documentElement.scrollTop ||
        containerNode.scrollTop;
    } else {
      width = containerNode.offsetWidth;
      height = containerNode.offsetHeight;
      scroll = containerNode.scrollTop;
    }

    return {width, height, scroll};
  },

  getPosition(target, container) {
    const offset = container.tagName === 'BODY' ?
      domUtils.getOffset(target) : domUtils.getPosition(target, container);

    return {
      ...offset, // eslint-disable-line object-shorthand
      height: target.offsetHeight,
      width: target.offsetWidth
    };
  },

  calcOverlayPosition(placement, overlayNode, target, container, padding) {
    const childOffset = utils.getPosition(target, container);

    const overlayHeight = overlayNode.offsetHeight;
    const overlayWidth = overlayNode.offsetWidth;

    let positionLeft, positionTop, arrowOffsetLeft, arrowOffsetTop;

    if (placement === 'left' || placement === 'right') {
      positionTop = childOffset.top + (childOffset.height - overlayHeight) / 2;

      if (placement === 'left') {
        positionLeft = childOffset.left - overlayWidth;
      } else {
        positionLeft = childOffset.left + childOffset.width;
      }

      const topDelta = getTopDelta(positionTop, overlayHeight, container, padding);

      positionTop += topDelta;
      arrowOffsetTop = 50 * (1 - 2 * topDelta / overlayHeight) + '%';
      arrowOffsetLeft = null;

    } else if (placement === 'top' || placement === 'bottom') {
      positionLeft = childOffset.left + (childOffset.width - overlayWidth) / 2;

      if (placement === 'top') {
        positionTop = childOffset.top - overlayHeight;
      } else {
        positionTop = childOffset.top + childOffset.height;
      }

      const leftDelta = getLeftDelta(positionLeft, overlayWidth, container, padding);
      positionLeft += leftDelta;
      arrowOffsetLeft = 50 * (1 - 2 * leftDelta / overlayWidth) + '%';
      arrowOffsetTop = null;
    } else {
      throw new Error(
        `calcOverlayPosition(): No such placement of "${placement }" found.`
      );
    }

    return { positionLeft, positionTop, arrowOffsetLeft, arrowOffsetTop };
  }
};


function getTopDelta(top, overlayHeight, container, padding) {
  const containerDimensions = utils.getContainerDimensions(container);
  const containerScroll = containerDimensions.scroll;
  const containerHeight = containerDimensions.height;

  const topEdgeOffset = top - padding - containerScroll;
  const bottomEdgeOffset = top + padding - containerScroll + overlayHeight;

  if (topEdgeOffset < 0) {
    return -topEdgeOffset;
  } else if (bottomEdgeOffset > containerHeight) {
    return containerHeight - bottomEdgeOffset;
  } else {
    return 0;
  }
}

function getLeftDelta(left, overlayWidth, container, padding) {
  const containerDimensions = utils.getContainerDimensions(container);
  const containerWidth = containerDimensions.width;

  const leftEdgeOffset = left - padding;
  const rightEdgeOffset = left + padding + overlayWidth;

  if (leftEdgeOffset < 0) {
    return -leftEdgeOffset;
  } else if (rightEdgeOffset > containerWidth) {
    return containerWidth - rightEdgeOffset;
  } else {
    return 0;
  }
}
export default utils;
