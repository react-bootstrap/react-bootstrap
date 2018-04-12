import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import { createBootstrapComponent } from './ThemeProvider';
import createWithBsPrefix from './utils/createWithBsPrefix';
import CardContext from './CardContext';

import CardImg from './CardImg';

const CardBody = createWithBsPrefix('card-body');

class Card extends React.Component {
  static propTypes = {
    /**
     * @default 'card'
     */
    bsPrefix: PropTypes.string.isRequired,

    /**
     * Sets card background
     *
     * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'dark'|'light')}
     */
    bg: PropTypes.string,

    /**
     * Sets card text color
     *
     * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'dark'|'light'|'white'|'muted')}
     */
    text: PropTypes.string,

    /**
     * Sets card border color
     *
     * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'dark'|'light')}
     */
    border: PropTypes.string,

    /**
     * When this prop is set, it creates a Card with a Card.Body inside
     * passing the children directly to it
     */
    body: PropTypes.bool,

    as: elementType
  };

  static defaultProps = {
    as: 'div',
    body: false
  };

  static getDerivedStateFromProps({ bsPrefix }) {
    return {
      cardContext: {
        cardHeaderBsPrefix: `${bsPrefix}-header`
      }
    };
  }

  state = {};

  render() {
    const {
      bsPrefix,
      className,
      as: Component,
      bg,
      text,
      border,
      body,
      children,
      ...props
    } = this.props;

    const classes = classNames(
      className,
      bsPrefix,
      bg && `bg-${bg}`,
      text && `text-${text}`,
      border && `border-${border}`
    );

    return (
      <CardContext.Provider value={this.state.cardContext}>
        <Component className={classes} {...props}>
          {body ? <CardBody>{children}</CardBody> : children}
        </Component>
      </CardContext.Provider>
    );
  }
}

const divWithHeadingClass = headingClass =>
  React.forwardRef((p, ref) => (
    <div {...p} ref={ref} className={classNames(p.className, headingClass)} />
  ));

const DecoratedCard = createBootstrapComponent(Card, 'card');
DecoratedCard.Img = CardImg;
DecoratedCard.Title = createWithBsPrefix('card-title', {
  Component: divWithHeadingClass('h5')
});
DecoratedCard.Subtitle = createWithBsPrefix('card-subtitle', {
  Component: divWithHeadingClass('h6')
});

DecoratedCard.Body = CardBody;
DecoratedCard.Link = createWithBsPrefix('card-link', {
  Component: 'a'
});
DecoratedCard.Text = createWithBsPrefix('card-text', {
  Component: 'p'
});
DecoratedCard.Header = createWithBsPrefix('card-header');
DecoratedCard.Footer = createWithBsPrefix('card-footer');
DecoratedCard.ImgOverlay = createWithBsPrefix('card-img-overlay');

export default DecoratedCard;
