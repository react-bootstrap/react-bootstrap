import ValidComponentChildren from './ValidComponentChildren';

let findChild = ValidComponentChildren.find;

export const TAB = 'tab';
export const PANE = 'pane';

export function nextEnabled(children, currentKey, keys, moveNext) {
  let lastIdx = keys.length - 1;
  let stopAt = keys[moveNext ? Math.max(lastIdx, 0) : 0];
  let nextKey = currentKey;

  function getNext() {
    let idx = keys.indexOf(nextKey);
    nextKey = moveNext
      ? keys[Math.min(lastIdx, idx + 1)]
      : keys[Math.max(0, idx - 1)];

    return findChild(children,
      _child => _child.props.eventKey === nextKey);
  }

  let next = getNext();

  while (next.props.eventKey !== stopAt && next.props.disabled) {
    next = getNext();
  }

  return next.props.disabled ? currentKey : next.props.eventKey;
}
