import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import elementType from 'prop-types-extra/lib/elementType';

import createWithBsPrefix from './utils/createWithBsPrefix';
import { createBootstrapComponent } from './ThemeProvider';

const propTypes = {
  /**
   * @default 'media'
   */
  bsPrefix: PropTypes.string.isRequired,

  componentClass: elementType
};

const defaultProps = {
  componentClass: 'div'
};

class Media extends React.Component {
  render() {
    const {
      bsPrefix,
      className,
      componentClass: Component,
      ...props
    } = this.props;

    return <Component {...props} className={classNames(className, bsPrefix)} />;
  }
}

Media.propTypes = propTypes;
Media.defaultProps = defaultProps;

const DecoratedMedia = createBootstrapComponent(Media, 'media');

DecoratedMedia.Body = createWithBsPrefix('media-body');

export default DecoratedMedia;
