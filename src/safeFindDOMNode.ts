import ReactDOM from 'react-dom';

export default function safeFindDOMNode(
  componentOrElement: React.Component | Element | null | undefined,
) {
  if (componentOrElement && 'setState' in componentOrElement) {
    // TODO: Remove in next major.
    // eslint-disable-next-line react/no-find-dom-node
    return ReactDOM.findDOMNode(componentOrElement);
  }
  return (componentOrElement ?? null) as Element | Text | null;
}
