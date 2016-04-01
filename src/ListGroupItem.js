import classNames from 'classnames';
import React from 'react';


import OldListGroupItem from './deprecated/ListGroupItem';
import deprecated from 'react-prop-types/lib/deprecated';

import { State } from './styleMaps';
import {
  bsStyles, bsClass, getClassSet,
} from './utils/bootstrapUtils';

class ListGroupItem extends React.Component {

  render() {
    let classes = getClassSet(this.props);

    let { componentClass, header } = this.props;
    const ComponentClass = componentClass || 'span';

    if (header) {
      return <OldListGroupItem {...this.props} />;
    }

    classes.active = this.props.active;
    classes.disabled = this.props.disabled;

    let className = classNames(this.props.className, classes);

    const extendedProps = {
      button: {type: 'button'}
    };

    let componentClassProps = Object.assign({}, this.props, { className }, extendedProps[componentClass]);

    return (
      <ComponentClass {...componentClassProps}>
        {this.props.children}
      </ComponentClass>
    );
  }
}

ListGroupItem.propTypes = {
  className: React.PropTypes.string,
  componentClass: React.PropTypes.string,
  active: React.PropTypes.any,
  disabled: React.PropTypes.any,
  header: deprecated(React.PropTypes.node, 'Use the `ListGroupItemHeading` component'),
  listItem: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  eventKey: React.PropTypes.any,
  href: React.PropTypes.string,
  target: React.PropTypes.string
};

ListGroupItem.defaultTypes = {
  listItem: false
};

export default bsStyles(State.values(),
  bsClass('list-group-item',
    ListGroupItem
  )
);
