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
 * Finds whether a component's `children` prop includes a React element of the
 * specified type.
 */
function hasChildOfType<P = any>(
  children: React.ReactNode,
  type: string | React.JSXElementConstructor<P>,
): boolean {
  return React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.type === type,
  );
}

export { map, forEach, hasChildOfType };
