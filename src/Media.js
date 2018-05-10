import React from 'react';
import elementType from 'react-prop-types/lib/elementType';
import classNames from 'classnames';

import Heading from './MediaHeading';
import Body from './MediaBody';
import Left from './MediaLeft';
import Right from './MediaRight';
import List from './MediaList';
import ListItem from './MediaListItem';

class Media extends React.Component {
  static displayName = 'Media';

  static propTypes = {
    /**
     * You can use a custom element for the media container
     */
    componentClass: elementType
  };

  static defaultProps = {
    componentClass: 'div'
  };

  render() {
    const {componentClass: ComponentClass, className, ...props} = this.props;

    return (
      <ComponentClass {...props} className={classNames(className, 'media')}/>
    );
  }
}

Media = Object.assign(Media, { Heading, Body, Left, Right, List, ListItem });

export default Media;
