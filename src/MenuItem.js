import React from 'react';
import classnames from 'classnames';
import all from 'react-prop-types/lib/all';
import SafeAnchor from './SafeAnchor';

export default class MenuItem extends React.Component {
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
    if (this.props.divider) {
      return <li role="separator" className="divider" />;
    }

    if (this.props.header) {
      return (
        <li role="heading" className="dropdown-header">{this.props.children}</li>
      );
    }

    const classes = {
      disabled: this.props.disabled,
      active: this.props.active
    };

    return (
      <li role="presentation"
        className={classnames(this.props.className, classes)}
        style={this.props.style}
      >
        <SafeAnchor
          role="menuitem"
          tabIndex="-1"
          id={this.props.id}
          target={this.props.target}
          title={this.props.title}
          href={this.props.href || ''}
          onKeyDown={this.props.onKeyDown}
          onClick={this.handleClick}>
          {this.props.children}
        </SafeAnchor>
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
  eventKey: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]),
  header: React.PropTypes.bool,
  href: React.PropTypes.string,
  target: React.PropTypes.string,
  title: React.PropTypes.string,
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
