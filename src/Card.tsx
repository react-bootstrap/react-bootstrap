import classNames from 'classnames';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';
import createWithBsPrefix from './createWithBsPrefix';
import divWithClassName from './divWithClassName';
import CardContext from './CardContext';
import CardImg from './CardImg';
import {
  BsPrefixPropsWithChildren,
  BsPrefixRefForwardingComponent,
} from './helpers';
import { Color, Variant } from './types';

const DivStyledAsH5 = divWithClassName('h5');
const DivStyledAsH6 = divWithClassName('h6');
const CardBody = createWithBsPrefix('card-body');
const CardTitle = createWithBsPrefix('card-title', {
  Component: DivStyledAsH5,
});
const CardSubtitle = createWithBsPrefix('card-subtitle', {
  Component: DivStyledAsH6,
});
const CardLink = createWithBsPrefix('card-link', { Component: 'a' });
const CardText = createWithBsPrefix('card-text', { Component: 'p' });
const CardHeader = createWithBsPrefix('card-header');
const CardFooter = createWithBsPrefix('card-footer');
const CardImgOverlay = createWithBsPrefix('card-img-overlay');

export interface CardProps extends BsPrefixPropsWithChildren {
  bg?: Variant;
  text?: Color;
  border?: Variant;
  body?: boolean;
}

type Card = BsPrefixRefForwardingComponent<'div', CardProps> & {
  Img: typeof CardImg;
  Title: typeof CardTitle;
  Subtitle: typeof CardSubtitle;
  Body: typeof CardBody;
  Link: typeof CardLink;
  Text: typeof CardText;
  Header: typeof CardHeader;
  Footer: typeof CardFooter;
  ImgOverlay: typeof CardImgOverlay;
};

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

const Card: Card = React.forwardRef(
  (
    {
      bsPrefix,
      className,
      bg,
      text,
      border,
      body = false,
      children,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      ...props
    }: CardProps,
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
          {body ? (
            // @ts-ignore
            <CardBody>{children}</CardBody>
          ) : (
            children
          )}
        </Component>
      </CardContext.Provider>
    );
  },
) as unknown as Card;

Card.displayName = 'Card';
Card.propTypes = propTypes;

Card.Img = CardImg;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.Body = CardBody;
Card.Link = CardLink;
Card.Text = CardText;
Card.Header = CardHeader;
Card.Footer = CardFooter;
Card.ImgOverlay = CardImgOverlay;

export default Card;
