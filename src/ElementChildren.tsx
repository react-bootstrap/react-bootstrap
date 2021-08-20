import * as React from 'react';
import { BsComponent } from './helpers';

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
 * Checks that at least one child is of the specified type (either a string for
 * an HTML element or a component for a React element).
 */
function includesType<As extends React.ElementType, P = any>(
  children: React.ReactNode,
  type: string | BsComponent<As, P>,
) {
  if (typeof type !== 'string' && !(type as BsComponent<As, P>).typeName) {
    throw new Error(
      "If 'type' is a component, it must have a defined, non-empty 'typeName' property.",
    );
  }

  const childrenList = React.Children.toArray(children);
  return childrenList.some(
    (child) =>
      React.isValidElement<P>(child) &&
      (child.type === type ||
        (child.type as BsComponent<As, P>)?.typeName ===
          (type as BsComponent<As, P>).typeName),
  );
}

export { map, forEach, includesType };
