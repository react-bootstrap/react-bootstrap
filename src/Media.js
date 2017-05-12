import classNames from 'classnames';
import React from 'react';
import elementType from 'prop-types-extra/lib/elementType';

import MediaBody from './MediaBody';
import MediaHeading from './MediaHeading';
import MediaLeft from './MediaLeft';
import MediaList from './MediaList';
import MediaListItem from './MediaListItem';
import MediaRight from './MediaRight';
import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';

const propTypes = {
  componentClass: elementType,
};

const defaultProps = {
  componentClass: 'div',
};

class Media extends React.Component {
  render() {
    const { componentClass: Component, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    return (
      <Component
        {...elementProps}
        className={classNames(className, classes)}
      />
    );
  }
}

Media.propTypes = propTypes;
Media.defaultProps = defaultProps;

Media.Heading = MediaHeading;
Media.Body = MediaBody;
Media.Left = MediaLeft;
Media.Right = MediaRight;
Media.List = MediaList;
Media.ListItem = MediaListItem;

export default bsClass('media', Media);
