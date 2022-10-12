import ReactDOM from 'react-dom';

export default function safeFindDOMNode(
  componentOrElement: React.Component | Element | null | undefined,
) {
  if (componentOrElement && 'setState' in componentOrElement) {
    return ReactDOM.findDOMNode(componentOrElement);
  }
  return (componentOrElement ?? null) as Element | Text | null;
}
