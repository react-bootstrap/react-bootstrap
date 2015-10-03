import React, { PropTypes, cloneElement } from 'react';
import warning from 'react/lib/warning';
import classNames from 'classnames';

class ResponsiveEmbed extends React.Component {
  render() {
    const { bsClass, className, a16by9, a4by3, ...props } = this.props;
    warning(!(!a16by9 && !a4by3), '`a16by9` or `a4by3` attribute must be set.');
    warning(!(a16by9 && a4by3), 'Either `a16by9` or `a4by3` attribute can be set. Not both.');

    const aspectRatio = {
      'embed-responsive-16by9': a16by9,
      'embed-responsive-4by3': a4by3
    };

    return (
      <div className={classNames(bsClass, aspectRatio)}>
        {cloneElement(
          this.props.children,
          {
            ...props,
            className: classNames(className, 'embed-responsive-item')
          }
        )}
      </div>
    );
  }
}

ResponsiveEmbed.defaultProps = {
  bsClass: 'embed-responsive',
  a16by9: false,
  a4by3: false
};

ResponsiveEmbed.propTypes = {
  /**
   * bootstrap className
   * @private
   */
  bsClass: PropTypes.string,
  /**
   * This component accepts only one child element
   */
  children: PropTypes.element.isRequired,
  /**
   * 16by9 aspect ratio
   */
  a16by9: PropTypes.bool,
  /**
   * 4by3 aspect ratio
   */
  a4by3: PropTypes.bool
};

export default ResponsiveEmbed;
