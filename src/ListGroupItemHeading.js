import React from 'react';
import { bsStyles, bsClass, getClassSet } from './utils/bootstrapUtils';

import { State } from './styleMaps';
import classNames from 'classnames';

class ListGroupItemHeading extends React.Component {

  render() {
    let { children } = this.props;
    let Component = this.props.componentClass || 'h4';

    let classes = getClassSet(this.props);
    let className = classNames(this.props.className, classes);

    return <Component {...this.props} className={className}>{children}</Component>;
  }
}

ListGroupItemHeading.propTypes = {
  className: React.PropTypes.string,
  componentClass: React.PropTypes.string,
  onClick: React.PropTypes.func,
  eventKey: React.PropTypes.any,
  target: React.PropTypes.string
};

ListGroupItemHeading.defaultTypes = {
  componentClass: 'h4'
};

export default bsStyles(State.values(),
    bsClass('list-group-item-heading',
    ListGroupItemHeading
  )
);
