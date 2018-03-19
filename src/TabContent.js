import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import elementType from 'prop-types-extra/lib/elementType';

import { createBootstrapComponent } from './ThemeProvider';

class TabContent extends React.Component {
  static propTypes = {
    /**
     * @default 'tab-content'
     */
    bsPrefix: PropTypes.string,

    componentClass: elementType
  };

  static defaultProps = {
    componentClass: 'div'
  };

  render() {
    const {
      bsPrefix,
      componentClass: Component,
      className,
      ...props
    } = this.props;

    return <Component {...props} className={classNames(className, bsPrefix)} />;
  }
}

export default createBootstrapComponent(TabContent, 'tab-content');
