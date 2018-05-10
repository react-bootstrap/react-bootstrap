import React from 'react';
import elementType from 'react-prop-types/lib/elementType';
import classNames from 'classnames';

class MediaHeading extends React.Component {
  static displayName = 'Media.Heading';

  static propTypes = {
    /**
     * You can use a custom element for the media heading
     */
    componentClass: elementType
  };

  static defaultProps = {
    componentClass: 'h4'
  };

  render() {
    const {componentClass: ComponentClass, className, ...props} = this.props;

    return (
      <ComponentClass {...props} className={classNames(className, 'media-heading')}/>
    );
  }
}

export default MediaHeading;
