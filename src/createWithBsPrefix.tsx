import classNames from 'classnames';
import camelize from 'dom-helpers/camelize';
import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

const pascalCase = (str) => str[0].toUpperCase() + camelize(str).slice(1);

interface BsPrefixOptions<As extends React.ElementType = 'div'> {
  displayName?: string;
  Component?: As;
  defaultProps?: Partial<React.ComponentProps<As>>;
}

// TODO: emstricten & fix the typing here! `createWithBsPrefix<TElementType>...`
export default function createWithBsPrefix<
  As extends React.ElementType = 'div',
>(
  prefix: string,
  {
    displayName = pascalCase(prefix),
    Component,
    defaultProps,
  }: BsPrefixOptions<As> = {},
): DynamicRefForwardingComponent<As> {
  const BsComponent = React.forwardRef(
    (
      { className, bsPrefix, as: Tag = Component || 'div', ...props }: any,
      ref,
    ) => {
      const componentProps = {
        ...defaultProps,
        ...props,
      };

      const resolvedPrefix = useBootstrapPrefix(bsPrefix, prefix);
      return (
        <Tag
          ref={ref}
          className={classNames(className, resolvedPrefix)}
          {...componentProps}
        />
      );
    },
  );

  BsComponent.displayName = displayName;
  return BsComponent as any;
}
