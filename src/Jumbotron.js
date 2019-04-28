import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { createBootstrapComponent } from './ThemeProvider';

const defaultProps = {
  fluid: false,
};

class Jumbotron extends React.Component {
  static propTypes = {
    as: PropTypes.elementType,
    /** Make the jumbotron full width, and without rounded corners */
    fluid: PropTypes.bool,
    /** @default 'jumbotron' */
    bsPrefix: PropTypes.string,
  };

  render() {
    const {
      as: Component = 'div',
      className,
      fluid,
      bsPrefix,
      ...props
    } = this.props;
    const classes = {
      [bsPrefix]: true,
      [`${bsPrefix}-fluid`]: fluid,
    };
    return <Component {...props} className={classNames(className, classes)} />;
  }
}

const BootstrapJumbotron = createBootstrapComponent(Jumbotron, 'jumbotron');

BootstrapJumbotron.defaultProps = defaultProps;

export default BootstrapJumbotron;
