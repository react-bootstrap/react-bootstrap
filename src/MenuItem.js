import classnames from 'classnames';
import React from 'react';
import bootstrapUtils, { bsClass } from './utils/bootstrapUtils';
import all from 'react-prop-types/lib/all';

import SafeAnchor from './SafeAnchor';
import createChainedFunction from './utils/createChainedFunction';

class MenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (!this.props.href || this.props.disabled) {
      event.preventDefault();
    }

    if (this.props.disabled) {
      return;
    }

    if (this.props.onSelect) {
      this.props.onSelect(event, this.props.eventKey);
    }
  }

  render() {
    let headerClass = bootstrapUtils.prefix(this.props, 'header');

    if (this.props.divider) {
      return <li role="separator" className="divider" />;
    }

    if (this.props.header) {
      return (
        <li role="heading" className={headerClass}>{this.props.children}</li>
      );
    }

    const {className, style, onClick, ...props} = this.props;

    const classes = {
      disabled: this.props.disabled,
      active: this.props.active
    };

    return (
      <li role="presentation"
        className={classnames(className, classes)}
        style={style}
      >
        <SafeAnchor
          {...props}
          role="menuitem"
          tabIndex="-1"
          onClick={createChainedFunction(onClick, this.handleClick)}
        />
      </li>
    );
  }
}

MenuItem.propTypes = {
  active: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  divider: all(
    React.PropTypes.bool,
    props => {
      if (props.divider && props.children) {
        return new Error('Children will not be rendered for dividers');
      }
    }
  ),
  eventKey: React.PropTypes.any,
  header: React.PropTypes.bool,
  href: React.PropTypes.string,
  target: React.PropTypes.string,
  title: React.PropTypes.string,
  onClick: React.PropTypes.func,
  onKeyDown: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  id: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
};

MenuItem.defaultProps = {
  divider: false,
  disabled: false,
  header: false
};

export default bsClass('dropdown', MenuItem);
