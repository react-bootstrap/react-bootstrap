import classNames from 'classnames';
import React from 'react';
import warning from 'warning';

import bootstrapUtils, { bsClass } from './utils/bootstrapUtils';

const propTypes = {
  inline: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  /**
   * Only valid if `inline` is not set.
   */
  validationState: React.PropTypes.oneOf(['success', 'warning', 'error']),
};

const defaultProps = {
  inline: false,
  disabled: false,
};

class Radio extends React.Component {
  render() {
    const {
      inline, disabled, validationState, className, style, children, ...props,
    } = this.props;

    delete props.bsClass;

    if (inline) {
      const classes = {
        [bootstrapUtils.prefix(this.props, 'inline')]: true,
        disabled,
      };

      // Use a warning here instead of in propTypes to get better-looking
      // generated documentation.
      warning(
        !validationState,
        '`validationState` is ignored on `<Radio inline>`. To display ' +
        'validation state on an inline radio, set `validationState` on a ' +
        'parent `<FormGroup>` or other element instead.'
      );

      return (
        <label className={classNames(className, classes)} style={style}>
          <input {...props} type="radio" disabled={disabled} />
          {children}
        </label>
      );
    }

    const classes = {
      ...bootstrapUtils.getClassSet(this.props),
      disabled,
    };
    if (validationState) {
      classes[`has-${validationState}`] = true;
    }

    return (
      <div className={classNames(className, classes)} style={style}>
        <label>
          <input {...props} type="radio" disabled={disabled} />
          {children}
        </label>
      </div>
    );
  }
}

Radio.propTypes = propTypes;
Radio.defaultProps = defaultProps;

export default bsClass('radio', Radio);
