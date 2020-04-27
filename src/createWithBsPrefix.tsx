import classNames from 'classnames';
import camelize from 'dom-helpers/camelize';
import React from 'react';
import { useBootstrapPrefix } from './ThemeProvider';

const pascalCase = (str) => str[0].toUpperCase() + camelize(str).slice(1);

interface BsPrefixOptions {
  displayName?: string;
  Component?: React.ElementType;
  defaultProps?: any; // TODO
}

// TODO: emstricten the typing here! `createWithBsPrefix<TElementType>...`
export default function createWithBsPrefix(
  prefix: string,
  {
    displayName = pascalCase(prefix),
    Component = 'div',
    defaultProps,
  }: BsPrefixOptions = {},
) {
  const BsComponent = React.forwardRef(
    // @ts-ignore
    ({ className, bsPrefix, as: Tag = Component, ...props }, ref) => {
      const resolvedPrefix = useBootstrapPrefix(bsPrefix, prefix);
      return (
        <Tag
          ref={ref}
          className={classNames(className, resolvedPrefix)}
          {...props}
        />
      );
    },
  );
  BsComponent.defaultProps = defaultProps;
  BsComponent.displayName = displayName;
  return BsComponent;
}
