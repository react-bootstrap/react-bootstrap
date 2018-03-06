import classNames from 'classnames';
import React from 'react';

import camelize from 'dom-helpers/util/camelize';
import { bsClass, getClassSet, splitBsProps } from './bootstrapUtils';

const pascalCase = str => str[0].toUpperCase() + camelize(str).slice(1);

export default function createWithBsClass(
  variantName,
  { displayName = pascalCase(variantName) } = {}
) {
  return bsClass(
    variantName,
    class extends React.Component {
      static displayName = displayName;
      render() {
        const { className, ...props } = this.props;
        const [bsProps, elementProps] = splitBsProps(props);

        return (
          <div
            {...elementProps}
            className={classNames(className, getClassSet(bsProps))}
          />
        );
      }
    }
  );
}
