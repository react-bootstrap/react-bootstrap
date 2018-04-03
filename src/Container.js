import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

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
    componentClass: elementType
  };

  static defaultProps = {
    componentClass: 'div',
    fluid: false
  };
  render() {
    const {
      bsPrefix,
      fluid,
      componentClass: Component,
      className,
      ...props
    } = this.props;
    return (
      <Component
        {...props}
        className={classNames(
          className,
          bsPrefix,
          fluid && `${bsPrefix}-fluid`
        )}
      />
    );
  }
}

export default createBootstrapComponent(Container, 'container');
