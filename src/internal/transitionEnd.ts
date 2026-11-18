import css from 'dom-helpers/css';
import listen from 'dom-helpers/listen';
import triggerEvent from 'dom-helpers/triggerEvent';

export type Listener = (this: HTMLElement, ev: TransitionEvent) => any;

function parseDuration(node: HTMLElement) {
  const str = css(node, 'transitionDuration') || '';

  const mult = str.indexOf('ms') === -1 ? 1000 : 1;
  return parseFloat(str) * mult;
}

function emulateTransitionEnd(
  element: HTMLElement,
  duration: number,
  padding = 5,
) {
  let called = false;

  const handle = setTimeout(() => {
    if (!called) triggerEvent(element, 'transitionend', true);
  }, duration + padding);

  const remove = listen(element, 'transitionend', (e) => {
    if (e.target === element) {
      called = true;
    }
  });

  return () => {
    clearTimeout(handle);
    remove();
  };
}

export default function transitionEnd(
  element: HTMLElement,
  handler: Listener,
  duration?: number | null,
  padding?: number,
) {
  if (duration == null) duration = parseDuration(element) || 0;
  const removeEmulate = emulateTransitionEnd(element, duration, padding);

  const remove = listen(element, 'transitionend', handler);

  return () => {
    removeEmulate();
    remove();
  };
}
