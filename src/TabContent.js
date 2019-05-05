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
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    const { bsPrefix, as: Component = 'div', className, ...props } = this.props;

    return <Component {...props} className={classNames(className, bsPrefix)} />;
  }
}

export default createBootstrapComponent(TabContent, 'tab-content');
