import React from 'react';
import elementType from 'react-prop-types/lib/elementType';
import classNames from 'classnames';

import ensureDomProps from './utils/ensureDomProps';

const MediaHeading = React.createClass({
  displayName: 'Media.Heading',
  propTypes: {
    /**
     * You can use a custom element for the media heading
     */
    componentClass: elementType
  },

  getDefaultProps() {
    return {
      componentClass: 'h4'
    };
  },

  render() {
    const {componentClass: ComponentClass, className, ...props} = this.props;
    const domProps = ensureDomProps(props, ComponentClass);
    return (
      <ComponentClass {...domProps} className={classNames(className, 'media-heading')}/>
    );
  }
});

export default MediaHeading;
