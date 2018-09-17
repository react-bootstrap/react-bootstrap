import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';

import { createBootstrapComponent } from './ThemeProvider';

class Container extends React.Component {
  static propTypes = {
    /**
     * @default 'container'
     */
    bsPrefix: PropTypes.string,

    /**
     * Allow the Container to fill all of it's availble horizontal space.
     */
    fluid: PropTypes.bool,
    /**
     * You can use a custom element for this component
     */
    as: elementType,
  };

  static defaultProps = {
    as: 'div',
    fluid: false,
  };

  render() {
    const { bsPrefix, fluid, as: Component, className, ...props } = this.props;
    return (
      <Component
        {...props}
        className={classNames(
          className,
          fluid ? `${bsPrefix}-fluid` : bsPrefix,
        )}
      />
    );
  }
}

export default createBootstrapComponent(Container, 'container');
