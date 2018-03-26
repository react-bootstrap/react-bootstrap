import classNames from 'classnames';
import React from 'react';
import elementType from 'prop-types-extra/lib/elementType';

import { createBootstrapComponent } from './ThemeProvider';

class ModalFooter extends React.Component {
  static propTypes = {
    componentClass: elementType
  };

  static defaultProps = {
    componentClass: 'div'
  };

  render() {
    const { componentClass: Component, className, ...props } = this.props;

    const classes = classNames('modal-footer', className);

    return <Component {...props} className={classNames(classes)} />;
  }
}

export default createBootstrapComponent(ModalFooter, 'modal-footer');
