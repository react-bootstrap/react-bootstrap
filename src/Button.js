import classNames from 'classnames';
import React from 'react';
import elementType from 'react-prop-types/lib/elementType';

import { Sizes, State, DEFAULT, PRIMARY, LINK } from './styleMaps';
import { bsStyles, bsSizes, bsClass, getClassSet, omitBsProps, prefix }
  from './utils/bootstrapUtils';

import SafeAnchor from './SafeAnchor';

const propTypes = {
  active: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  block: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  componentClass: elementType,
  href: React.PropTypes.string,
  /**
   * Defines HTML button type attribute
   * @defaultValue 'button'
   */
  type: React.PropTypes.oneOf(['button', 'reset', 'submit']),
};

const defaultProps = {
  active: false,
  block: false,
  disabled: false,
};

class Button extends React.Component {
  renderAnchor(props, className) {
    return (
      <SafeAnchor
        {...omitBsProps(props)}
        className={classNames(className, props.disabled && 'disabled')}
      />
    );
  }

  renderButton({ componentClass, ...props }, className) {
    const Component = componentClass || 'button';

    return (
      <Component
        {...omitBsProps(props)}
        type={props.type || 'button'}
        className={className}
      />
    );
  }

  render() {
    const { active, block, className, ...props } = this.props;

    const classes = {
      ...getClassSet(props),
      active,
      [prefix(props, 'block')]: block,
    };
    const fullClassName = classNames(className, classes);

    if (props.href) {
      return this.renderAnchor(props, fullClassName);
    }

    return this.renderButton(props, fullClassName);
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default bsStyles(
  [...Object.values(State), DEFAULT, PRIMARY, LINK], DEFAULT,
  bsSizes(
    [Sizes.LARGE, Sizes.SMALL, Sizes.XSMALL],
    bsClass('btn', Button)
  )
);
