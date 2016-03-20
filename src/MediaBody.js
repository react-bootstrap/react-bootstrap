import React from 'react';
import elementType from 'react-prop-types/lib/elementType';
import classNames from 'classnames';

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
    const ComponentClass = this.props.componentClass;

    return (
      <ComponentClass {...this.props} className={classNames(this.props.className, 'media-body')}>
        {this.props.children}
      </ComponentClass>
    );
  }
});

export default MediaBody;
