import transitionEnd from 'dom-helpers/transitionEnd';

export default function transitionEndListener(
  element: HTMLElement,
  handler: (e: TransitionEvent) => void,
) {
  const remove = transitionEnd(element, (e) => {
    if (e.target === element) {
      remove();
      handler(e);
    }
  });
}
