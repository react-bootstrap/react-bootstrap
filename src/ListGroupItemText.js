import React from 'react';
import { bsStyles, bsClass, getClassSet } from './utils/bootstrapUtils';

import { State } from './styleMaps';
import classNames from 'classnames';

class ListGroupItemText extends React.Component {

  render() {
    let { children } = this.props;
    let Component = this.props.componentClass || 'span';

    let classes = getClassSet(this.props);
    let className = classNames(this.props.className, classes);

    return <Component {...this.props} className={className}>{children}</Component>;
  }
}

ListGroupItemText.propTypes = {
  className: React.PropTypes.string,
  componentClass: React.PropTypes.string,
  onClick: React.PropTypes.func,
  eventKey: React.PropTypes.any,
  target: React.PropTypes.string
};

ListGroupItemText.defaultTypes = {
  componentClass: 'span'
};

export default bsStyles(State.values(),
  bsClass('list-group-item-text',
    ListGroupItemText
  )
);
