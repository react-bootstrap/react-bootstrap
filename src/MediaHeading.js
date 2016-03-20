import React from 'react';
import elementType from 'react-prop-types/lib/elementType';
import classNames from 'classnames';

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
    const ComponentClass = this.props.componentClass;

    return (
      <ComponentClass {...this.props} className={classNames(this.props.className, 'media-heading')}>
        {this.props.children}
      </ComponentClass>
    );
  }
});

export default MediaHeading;
