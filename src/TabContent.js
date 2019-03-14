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

  static defaultProps = {
    as: 'div',
  };

  render() {
    const { bsPrefix, as: Component, className, ...props } = this.props;

    return <Component {...props} className={classNames(className, bsPrefix)} />;
  }
}

export default createBootstrapComponent(TabContent, 'tab-content');
