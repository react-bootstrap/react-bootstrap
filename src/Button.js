import classNames from 'classnames';
import React from 'react';
import elementType from 'react-prop-types/lib/elementType';

import { bsClass, bsSizes, bsStyles, getClassSet, prefix, splitBsProps }
  from './utils/bootstrapUtils';
import { Size, State, Style } from './utils/StyleConfig';

import SafeAnchor from './SafeAnchor';

const propTypes = {
  active: React.PropTypes.bool,
  bsCustomClass: React.PropTypes.string,
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
  renderAnchor(elementProps, className) {
    return (
      <SafeAnchor
        {...elementProps}
        className={classNames(
          className, elementProps.disabled && 'disabled'
        )}
      />
    );
  }

  renderButton({ componentClass, ...elementProps }, className) {
    const Component = componentClass || 'button';

    return (
      <Component
        {...elementProps}
        type={elementProps.type || 'button'}
        className={className}
      />
    );
  }

  render() {
    const { active, block, bsCustomClass, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      ...getClassSet(bsProps),
      active,
      [prefix(bsProps, 'block')]: block,
    };
    const fullClassName = classNames(bsCustomClass, className, classes);

    if (elementProps.href) {
      return this.renderAnchor(elementProps, fullClassName);
    }

    return this.renderButton(elementProps, fullClassName);
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default bsClass('btn',
  bsSizes([Size.LARGE, Size.SMALL, Size.XSMALL],
    bsStyles(
      [...Object.values(State), Style.DEFAULT, Style.PRIMARY, Style.LINK],
      Style.DEFAULT,
      Button
    )
  )
);
