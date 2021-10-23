import css from 'dom-helpers/css';
import transitionEnd from 'dom-helpers/transitionEnd';

function parseDuration(
  node: HTMLElement,
  property: 'transitionDuration' | 'transitionDelay',
) {
  const str = css(node, property) || '';
  const mult = str.indexOf('ms') === -1 ? 1000 : 1;
  return parseFloat(str) * mult;
}

export default function transitionEndListener(
  element: HTMLElement,
  handler: (e: TransitionEvent) => void,
) {
  const duration = parseDuration(element, 'transitionDuration');
  const delay = parseDuration(element, 'transitionDelay');
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
