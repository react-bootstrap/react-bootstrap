import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import { createBootstrapComponent } from './ThemeProvider';

class ModalTitle extends React.Component {
  static propTypes = {
    bsPrefix: PropTypes.string,
    componentClass: elementType
  };

  static defaultProps = {
    componentClass: 'div'
  };

  render() {
    const {
      componentClass: Component,
      bsPrefix,
      className,
      ...props
    } = this.props;

    return <Component {...props} className={classNames(className, bsPrefix)} />;
  }
}

export default createBootstrapComponent(ModalTitle, 'modal-title');
