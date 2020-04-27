import classNames from 'classnames';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';
import createWithBsPrefix from './createWithBsPrefix';
import divWithClassName from './divWithClassName';
import CardContext from './CardContext';
import CardImg from './CardImg';
import { BsPrefixComponent } from './helpers';

export class CardTitle<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As> {}

export class CardSubtitle<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As> {}

export class CardBody<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As> {}

export class CardLink<
  As extends React.ElementType = 'a'
> extends BsPrefixComponent<As> {}

export class CardText<
  As extends React.ElementType = 'p'
> extends BsPrefixComponent<As> {}

export class CardHeader<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As> {}

export class CardFooter<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As> {}

export class CardImgOverlay<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As> {}

export interface CardProps {
  bg?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light';
  text?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light'
    | 'white'
    | 'muted';
  border?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light';
  body?: boolean;
}

declare class Card<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As, CardProps> {
  static Img: typeof CardImg;
  static Title: typeof CardTitle;
  static Subtitle: typeof CardSubtitle;
  static Body: typeof CardBody;
  static Link: typeof CardLink;
  static Text: typeof CardText;
  static Header: typeof CardHeader;
  static Footer: typeof CardFooter;
  static ImgOverlay: typeof CardImgOverlay;
}

const DivStyledAsH5 = divWithClassName('h5');
const DivStyledAsH6 = divWithClassName('h6');

const CardBody = createWithBsPrefix('card-body');

const propTypes = {
  /**
   * @default 'card'
   */
  bsPrefix: PropTypes.string,

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

  as: PropTypes.elementType,
};

const defaultProps = {
  body: false,
};

const Card = React.forwardRef(
  (
    {
      bsPrefix,
      className,
      bg,
      text,
      border,
      body,
      children,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      ...props
    },
    ref,
  ) => {
    const prefix = useBootstrapPrefix(bsPrefix, 'card');
    const cardContext = useMemo(
      () => ({
        cardHeaderBsPrefix: `${prefix}-header`,
      }),
      [prefix],
    );

    return (
      <CardContext.Provider value={cardContext}>
        <Component
          ref={ref}
          {...props}
          className={classNames(
            className,
            prefix,
            bg && `bg-${bg}`,
            text && `text-${text}`,
            border && `border-${border}`,
          )}
        >
          {body ? <CardBody>{children}</CardBody> : children}
        </Component>
      </CardContext.Provider>
    );
  },
);

Card.displayName = 'Card';
Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

Card.Img = CardImg;

Card.Title = createWithBsPrefix('card-title', {
  Component: DivStyledAsH5,
});
Card.Subtitle = createWithBsPrefix('card-subtitle', {
  Component: DivStyledAsH6,
});

Card.Body = CardBody;
Card.Link = createWithBsPrefix('card-link', { Component: 'a' });
Card.Text = createWithBsPrefix('card-text', { Component: 'p' });
Card.Header = createWithBsPrefix('card-header');
Card.Footer = createWithBsPrefix('card-footer');
Card.ImgOverlay = createWithBsPrefix('card-img-overlay');

export default Card;
