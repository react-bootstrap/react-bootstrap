import transitionEnd from 'dom-helpers/transitionEnd';

export function parseDuration(
  node: HTMLElement,
  property: 'transition-duration' | 'transition-delay',
) {
  const str = getComputedStyle(node).getPropertyValue(property);
  const mult = str.indexOf('ms') === -1 ? 1000 : 1;
  return parseFloat(str) * mult;
}

export default function transitionEndListener(
  element: HTMLElement,
  handler: (e: TransitionEvent) => void,
) {
  const duration = parseDuration(element, 'transition-duration');
  const delay = parseDuration(element, 'transition-delay');
  const remove = transitionEnd(
    element,
    (e) => {
      if (e.target === element) {
        remove();
        handler(e);
      }
    },
    duration + delay,
  );
}
