import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';

import { createBootstrapComponent } from './ThemeProvider';
import createWithBsPrefix from './utils/createWithBsPrefix';
import divWithClassName from './utils/divWithClassName';
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

    as: elementType,
  };

  static defaultProps = {
    as: 'div',
    body: false,
  };

  state = {};

  static getDerivedStateFromProps({ bsPrefix }) {
    return {
      cardContext: {
        cardHeaderBsPrefix: `${bsPrefix}-header`,
      },
    };
  }

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
      border && `border-${border}`,
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

const DivStyledAsH5 = divWithClassName('h5');
const DivStyledAsH6 = divWithClassName('h6');

const DecoratedCard = createBootstrapComponent(Card, 'card');
DecoratedCard.Img = CardImg;

DecoratedCard.Title = createWithBsPrefix('card-title', {
  Component: DivStyledAsH5,
});
DecoratedCard.Subtitle = createWithBsPrefix('card-subtitle', {
  Component: DivStyledAsH6,
});

DecoratedCard.Body = CardBody;
DecoratedCard.Link = createWithBsPrefix('card-link', {
  Component: 'a',
});
DecoratedCard.Text = createWithBsPrefix('card-text', {
  Component: 'p',
});
DecoratedCard.Header = createWithBsPrefix('card-header');
DecoratedCard.Footer = createWithBsPrefix('card-footer');
DecoratedCard.ImgOverlay = createWithBsPrefix('card-img-overlay');

export default DecoratedCard;
