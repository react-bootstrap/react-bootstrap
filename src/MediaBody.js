import React from 'react';
import elementType from 'react-prop-types/lib/elementType';
import classNames from 'classnames';

class MediaBody extends React.Component {
  static displayName = 'Media.Body';

  static propTypes = {
    /**
     * You can use a custom element for the media body
     */
    componentClass: elementType
  };

  static defaultProps = {
    componentClass: 'div'
  };

  render() {
    const {componentClass: ComponentClass, className, ...props} = this.props;

    return (
      <ComponentClass {...props} className={classNames(className, 'media-body')}/>
    );
  }
}

export default MediaBody;
