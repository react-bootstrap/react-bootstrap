import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { createBootstrapComponent } from './ThemeProvider';

const propTypes = {
  /**
   * @default 'embed-responsive'
   */
  bsPrefix: PropTypes.string,

  /**
   * This component requires a single child element
   */
  children: PropTypes.element.isRequired,

  /**
   * Set the aspect ration of the embed
   */
  aspectRatio: PropTypes.oneOf(['21by9', '16by9', '4by3', '1by1']),
};

const defaultProps = {
  aspectRatio: '1by1',
};

class ResponsiveEmbed extends React.Component {
  render() {
    const { bsPrefix, className, children, aspectRatio, ...props } = this.props;
    const child = React.Children.only(children);
    return (
      <div
        {...props}
        className={classNames(
          bsPrefix,
          className,
          aspectRatio && `${bsPrefix}-${aspectRatio}`,
        )}
      >
        {React.cloneElement(child, {
          className: classNames(child.props.className, `${bsPrefix}-item`),
        })}
      </div>
    );
  }
}

ResponsiveEmbed.propTypes = propTypes;
ResponsiveEmbed.defaultProps = defaultProps;

export default createBootstrapComponent(ResponsiveEmbed, 'embed-responsive');
