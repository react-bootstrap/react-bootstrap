import classNames from 'classnames';
import React from 'react';
import elementType from 'prop-types-extra/lib/elementType';

import {
  bsClass as setBsClass,
  prefix,
  splitBsProps
} from './utils/bootstrapUtils';

const propTypes = {
  componentClass: elementType
};

const defaultProps = {
  componentClass: 'div'
};

class TabContent extends React.Component {
  render() {
    const { componentClass: Component, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    return (
      <Component
        {...elementProps}
        className={classNames(className, prefix(bsProps, 'content'))}
      />
    );
  }
}

TabContent.propTypes = propTypes;
TabContent.defaultProps = defaultProps;

export default setBsClass('tab', TabContent);
