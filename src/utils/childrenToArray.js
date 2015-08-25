import validChildren from './ValidComponentChildren';

export default function childrenAsArray(children) {
  let result = [];

  if (children === undefined) {
    return result;
  }

  validChildren.forEach(children, child => {
    result.push(child);
  });

  return result;
}
