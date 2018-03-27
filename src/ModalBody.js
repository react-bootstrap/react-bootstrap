import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import { createBootstrapComponent } from './ThemeProvider';

class ModalBody extends React.Component {
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

    const classes = classNames(className, bsPrefix);

    return <Component {...props} className={classNames(classes)} />;
  }
}

export default createBootstrapComponent(ModalBody, 'modal-body');
