import React from 'react';
import classNames from 'classnames';
import elementType from 'react-prop-types/lib/elementType';
import createChainedFunction from './utils/createChainedFunction';

const propTypes = {
  onClick: React.PropTypes.func,
  /**
   * You can use a custom element for this component
   */
  componentClass: elementType,
};

const defaultProps = {
  componentClass: 'a',
  role: 'button'
};

const contextTypes = {
  $bs_panel: React.PropTypes.shape({
    getIds: React.PropTypes.func,
    onToggle: React.PropTypes.func,
    expanded: React.PropTypes.bool,
  })
};


class PanelToggle extends React.Component {

  constructor(...args) {
    super(...args);

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(event) {
    const { onToggle } = this.context.$bs_panel || {};

    event.preventDefault();

    if (onToggle) {
      onToggle(event);
    }
  }

  render() {
    const { onClick, className, componentClass, ...props } = this.props;
    const { expanded, getIds } = this.context.$bs_panel || {};
    const Component = componentClass;

    props.onClick = createChainedFunction(onClick, this.handleToggle);

    props['aria-expanded'] = expanded;
    props.className = classNames(className, !expanded && 'collapsed');

    if (getIds) {
      props['aria-controls'] = getIds().collapseId;
    }

    return (
      <Component {...props} />
    );
  }
}

PanelToggle.propTypes = propTypes;
PanelToggle.defaultProps = defaultProps;
PanelToggle.contextTypes = contextTypes;

export default PanelToggle;
