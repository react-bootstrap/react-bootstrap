import * as React from 'react';

/**
 * Iterates through children that are typically specified as `props.children`,
 * but only maps over children that are "valid elements".
 *
 * The mapFunction provided index will be normalised to the components mapped,
 * so an invalid component would not increase the index.
 *
 */
function map<P = any>(
  children,
  func: (el: React.ReactElement<P>, index: number) => any,
) {
  let index = 0;

  return React.Children.map(children, (child) =>
    React.isValidElement<P>(child) ? func(child, index++) : child,
  );
}

/**
 * Iterates through children that are "valid elements".
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child with the index reflecting the position relative to "valid components".
 */
function forEach<P = any>(
  children,
  func: (el: React.ReactElement<P>, index: number) => void,
) {
  let index = 0;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement<P>(child)) func(child, index++);
  });
}

/**
 * Finds a child component by type (either a string for an HTML element or a
 * component for a React element) and separates it from the parent component's
 * other children.
 */
function getChildOfType<P = any>(
  children: React.ReactNode | React.ReactNode[],
  type: string | React.JSXElementConstructor<P>,
): {
  matchingChild: React.ReactElement<
    P,
    string | React.JSXElementConstructor<P>
  > | null;
  otherChildren: React.ReactNode[];
} {
  const childrenList = Array.isArray(children)
    ? children
    : React.Children.toArray(children);
  const childIndex = childrenList.findIndex(
    (child) => React.isValidElement<P>(child) && child.type === type,
  );

  return childIndex === -1
    ? { matchingChild: null, otherChildren: childrenList }
    : {
        matchingChild: childrenList[childIndex] as React.ReactElement<P>,
        otherChildren: [
          ...childrenList.slice(0, childIndex),
          ...childrenList.slice(childIndex + 1),
        ],
      };
}

export { map, forEach, getChildOfType };
