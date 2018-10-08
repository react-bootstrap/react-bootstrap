import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';
import divWithClassName from './utils/divWithClassName';

import { createBootstrapComponent } from './ThemeProvider';

const DivStyledAsH4 = divWithClassName('h4');

class ModalTitle extends React.Component {
  static propTypes = {
    bsPrefix: PropTypes.string,
    as: elementType,
  };

  static defaultProps = {
    as: DivStyledAsH4,
  };

  render() {
    const { as: Component, bsPrefix, className, ...props } = this.props;

    return <Component {...props} className={classNames(className, bsPrefix)} />;
  }
}

export default createBootstrapComponent(ModalTitle, 'modal-title');
