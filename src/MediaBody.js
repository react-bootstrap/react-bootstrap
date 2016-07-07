import React from 'react';
import elementType from 'react-prop-types/lib/elementType';
import classNames from 'classnames';

import ensureDomProps from './utils/ensureDomProps';

const MediaBody = React.createClass({
  displayName: 'Media.Body',
  propTypes: {
    /**
     * You can use a custom element for the media body
     */
    componentClass: elementType
  },

  getDefaultProps() {
    return {
      componentClass: 'div'
    };
  },

  render() {
    const {componentClass: ComponentClass, className, ...props} = this.props;
    const domProps = ensureDomProps(props, ComponentClass);
    return (
      <ComponentClass {...domProps} className={classNames(className, 'media-body')}/>
    );
  }
});

export default MediaBody;
