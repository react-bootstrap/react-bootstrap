import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { elementType } from 'prop-types-extra';

import { createBootstrapComponent } from './ThemeProvider';

const propTypes = {
  as: elementType,
  /** Make the jumbotron full width, and without rounded corners */
  fluid: PropTypes.bool,
  /** @default 'jumbotron' */
  bsPrefix: PropTypes.string,
};

const defaultProps = {
  as: 'div',
  fluid: false,
};

class Jumbotron extends React.Component {
  render() {
    const { as: Component, className, fluid, bsPrefix, ...props } = this.props;
    const classes = {
      [bsPrefix]: true,
      [`${bsPrefix}-fluid`]: fluid,
    };
    return <Component {...props} className={classNames(className, classes)} />;
  }
}

Jumbotron.propTypes = propTypes;
Jumbotron.defaultProps = defaultProps;

export default createBootstrapComponent(Jumbotron, 'jumbotron');
