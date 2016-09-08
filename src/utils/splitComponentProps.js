export default function splitComponentProps(props, Component) {
  const componentPropTypes = Component.propTypes;

  const parentProps = {};
  const childProps = {};

  Object.entries(props).forEach(([propName, propValue]) => {
    if (componentPropTypes[propName]) {
      parentProps[propName] = propValue;
    } else {
      childProps[propName] = propValue;
    }
  });

  return [parentProps, childProps];
}
