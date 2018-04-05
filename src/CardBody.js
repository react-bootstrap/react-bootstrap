import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import { createBootstrapComponent } from './ThemeProvider';

class CardBody extends React.Component {
  static propTypes = {
    /**
     * @default 'card-body'
     */
    bsPrefix: PropTypes.string.isRequired,

    componentClass: elementType
  };

  static defaultProps = {
    componentClass: 'div'
  };

  render() {
    const {
      bsPrefix,
      className,
      componentClass: Component,
      ...props
    } = this.props;

    return <Component className={classNames(bsPrefix, className)} {...props} />;
  }
}

export default createBootstrapComponent(CardBody, 'card-body');
