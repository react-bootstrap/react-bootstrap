import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { createBootstrapComponent } from './ThemeProvider';

class TabContent extends React.Component {
  static propTypes = {
    /**
     * @default 'tab-content'
     */
    bsPrefix: PropTypes.string,

    as: PropTypes.elementType,
  };

  render() {
    const { bsPrefix, as: Component = 'div', className, ...props } = this.props;

    return <Component {...props} className={classNames(className, bsPrefix)} />;
  }
}

const BootstrapTabContent = createBootstrapComponent(TabContent, 'tab-content');

BootstrapTabContent.defaultProps = {};

export default BootstrapTabContent;
