import classNames from 'classnames';
import React, { cloneElement } from 'react';

import Collapse from './Collapse';
import { bsStyles, bsClass, getClassSet, omitBsProps, prefix }
  from './utils/bootstrapUtils';
import { State, Style } from './utils/StyleConfig';

// TODO: Use uncontrollable.

const propTypes = {
  collapsible: React.PropTypes.bool,
  onSelect: React.PropTypes.func,
  header: React.PropTypes.node,
  id: React.PropTypes.oneOfType([
    React.PropTypes.string, React.PropTypes.number,
  ]),
  footer: React.PropTypes.node,
  defaultExpanded: React.PropTypes.bool,
  expanded: React.PropTypes.bool,
  eventKey: React.PropTypes.any,
  headerRole: React.PropTypes.string,
  panelRole: React.PropTypes.string,

  // From Collapse.
  onEnter: React.PropTypes.func,
  onEntering: React.PropTypes.func,
  onEntered: React.PropTypes.func,
  onExit: React.PropTypes.func,
  onExiting: React.PropTypes.func,
  onExited: React.PropTypes.func,
};

const defaultProps = {
  defaultExpanded: false,
};

class Panel extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClickTitle = this.handleClickTitle.bind(this);

    this.state = {
      expanded: this.props.defaultExpanded,
    };
  }

  handleClickTitle(e) {
    // FIXME: What the heck? This API is horrible. This needs to go away!
    e.persist();
    e.selected = true;

    if (this.props.onSelect) {
      this.props.onSelect(this.props.eventKey, e);
    } else {
      e.preventDefault();
    }

    if (e.selected) {
      this.setState({ expanded: !this.state.expanded });
    }
  }

  shouldRenderFill(child) {
    return React.isValidElement(child) && child.props.fill != null;
  }

  renderHeading(collapsible, header, id, role, expanded, props) {
    let title;
    const titleClassName = prefix(props, 'title');

    if (collapsible) {
      if (React.isValidElement(header)) {
        title = cloneElement(header, {
          className: classNames(header.props.className, titleClassName),
          children: this.renderAnchor(header.props.children, role),
        });
      } else {
        title = (
          <h4 role="presentation" className={titleClassName}>
            {this.renderAnchor(header, id, role, expanded)}
          </h4>
        );
      }
    } else {
      if (React.isValidElement(header)) {
        title = cloneElement(header, {
          className: classNames(header.props.className, titleClassName),
        });
      } else {
        title = header;
      }
    }

    return (
      <div className={prefix(props, 'heading')}>
        {title}
      </div>
    );
  }

  renderAnchor(header, id, role, expanded) {
    return (
      <a
        role={role}
        href={id && `#${id}`}
        onClick={this.handleClickTitle}
        aria-controls={id}
        aria-expanded={expanded}
        aria-selected={expanded}
      >
        {header}
      </a>
    );
  }

  renderCollapsibleBody(id, expanded, role, children, props, animationHooks) {
    return (
      <Collapse in={expanded} {...animationHooks}>
        <div
          id={id}
          role={role}
          className={prefix(props, 'collapse')}
          aria-hidden={!expanded}
        >
          {this.renderBody(children, props)}
        </div>
      </Collapse>
    );
  }

  renderBody(rawChildren, props) {
    const children = [];
    let bodyChildren = [];

    const bodyClassName = prefix(props, 'body');

    function maybeAddBody() {
      if (!bodyChildren.length) {
        return;
      }

      // Derive the key from the index here, since we need to make one up.
      children.push(
        <div key={children.length} className={bodyClassName}>
          {bodyChildren}
        </div>
      );

      bodyChildren = [];
    }

    // Convert to array so we can re-use keys.
    React.Children.toArray(rawChildren).forEach(child => {
      if (React.isValidElement(child) && child.props.fill) {
        maybeAddBody();

        // Remove the child's unknown `fill` prop.
        children.push(cloneElement(child, { fill: undefined }));

        return;
      }

      bodyChildren.push(child);
    });

    maybeAddBody();

    return children;
  }

  render() {
    const {
      collapsible,
      header,
      id,
      footer,
      expanded: propsExpanded,
      headerRole,
      panelRole,
      className,
      children,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      ...props,
    } = this.props;

    delete props.defaultExpanded;
    delete props.eventKey;
    delete props.onSelect;

    const expanded = propsExpanded != null ?
      propsExpanded : this.state.expanded;

    const classes = getClassSet(props);

    return (
      <div
        {...omitBsProps(props)}
        className={classNames(className, classes)}
        id={collapsible ? null : id}
      >
        {header && this.renderHeading(
          collapsible, header, id, headerRole, expanded, props
        )}

        {collapsible ?
          this.renderCollapsibleBody(
            id, expanded, panelRole, children, props,
            { onEnter, onEntering, onEntered, onExit, onExiting, onExited }
          ) :
          this.renderBody(children, props)
        }

        {footer && (
          <div className={prefix(props, 'footer')}>
            {footer}
          </div>
        )}
      </div>
    );
  }
}

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;

export default bsClass('panel',
  bsStyles([...Object.values(State), Style.DEFAULT, Style.PRIMARY], Panel)
);
